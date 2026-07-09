import { NextRequest, NextResponse } from "next/server";
import { getServerSession } from "next-auth";
import { authOptions } from "@/app/api/auth/[...nextauth]/route";
import { prisma } from "@/lib/prisma";

// POST /api/submissions — save a project submission
export async function POST(req: NextRequest) {
  const session = await getServerSession(authOptions);
  if (!session?.user) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  const userId = (session.user as { id?: string }).id;
  if (!userId) {
    return NextResponse.json({ error: "Invalid session" }, { status: 401 });
  }

  try {
    const { weekId, githubUrl, liveDemoUrl, notes } = await req.json();

    if (!weekId || !githubUrl) {
      return NextResponse.json(
        { error: "weekId and githubUrl are required." },
        { status: 400 }
      );
    }

    const submission = await prisma.projectSubmission.upsert({
      where: { userId_weekId: { userId, weekId: Number(weekId) } },
      update: { githubUrl, liveDemoUrl: liveDemoUrl ?? "", notes: notes ?? "" },
      create: {
        userId,
        weekId: Number(weekId),
        githubUrl,
        liveDemoUrl: liveDemoUrl ?? "",
        notes: notes ?? "",
      },
    });

    return NextResponse.json({ submission }, { status: 200 });
  } catch (err) {
    console.error("Submission error:", err);
    return NextResponse.json({ error: "Internal server error." }, { status: 500 });
  }
}

// GET /api/submissions — admin: fetch all submissions
export async function GET(req: NextRequest) {
  const session = await getServerSession(authOptions);
  const role = (session?.user as { role?: string })?.role;

  if (!session?.user || role !== "admin") {
    return NextResponse.json({ error: "Forbidden" }, { status: 403 });
  }

  try {
    const submissions = await prisma.projectSubmission.findMany({
      include: { user: { select: { name: true, email: true } } },
      orderBy: [{ weekId: "asc" }, { submittedAt: "asc" }],
    });

    const { searchParams } = new URL(req.url);
    if (searchParams.get("format") === "csv") {
      const header = "Name,Email,Week,GitHub URL,Live Demo URL,Notes,Submitted At\n";
      const rows = submissions.map((s) =>
        [
          `"${s.user.name.replace(/"/g, '""')}"`,
          `"${s.user.email}"`,
          `Week ${s.weekId}`,
          `"${s.githubUrl}"`,
          `"${s.liveDemoUrl}"`,
          `"${s.notes.replace(/"/g, '""').replace(/\n/g, " ")}"`,
          `"${new Date(s.submittedAt).toISOString()}"`,
        ].join(",")
      );
      const csv = header + rows.join("\n");

      return new NextResponse(csv, {
        status: 200,
        headers: {
          "Content-Type": "text/csv",
          "Content-Disposition": `attachment; filename="submissions-${Date.now()}.csv"`,
        },
      });
    }

    return NextResponse.json({ submissions });
  } catch (err) {
    console.error("Fetch submissions error:", err);
    return NextResponse.json({ error: "Internal server error." }, { status: 500 });
  }
}
