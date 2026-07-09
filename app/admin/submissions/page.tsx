"use client";

import { useEffect, useState } from "react";
import { useApp } from "@/context/AppContext";
import { useRouter } from "next/navigation";
import { Download, Users, RefreshCw, ExternalLink, Shield } from "lucide-react";

interface Submission {
  id: string;
  weekId: number;
  githubUrl: string;
  liveDemoUrl: string;
  notes: string;
  submittedAt: string;
  user: { name: string; email: string };
}

export default function AdminSubmissionsPage() {
  const { user, isLoading } = useApp();
  const router = useRouter();
  const [submissions, setSubmissions] = useState<Submission[]>([]);
  const [fetching, setFetching] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    if (isLoading) return;
    if (!user) { router.push("/login"); return; }
    if (user.role !== "admin") { router.push("/dashboard"); return; }
    loadSubmissions();
  }, [user, isLoading]);

  async function loadSubmissions() {
    setFetching(true);
    setError("");
    try {
      const res = await fetch("/api/submissions");
      if (!res.ok) throw new Error("Failed to fetch submissions");
      const data = await res.json();
      setSubmissions(data.submissions ?? []);
    } catch {
      setError("Could not load submissions. Are you signed in as admin?");
    } finally {
      setFetching(false);
    }
  }

  function downloadCSV() {
    window.open("/api/submissions?format=csv", "_blank");
  }

  if (isLoading || fetching) {
    return (
      <div className="flex min-h-screen items-center justify-center bg-bg-base">
        <div className="text-sm text-text-secondary animate-pulse">Loading submissions…</div>
      </div>
    );
  }

  const grouped: Record<number, Submission[]> = {};
  for (const s of submissions) {
    if (!grouped[s.weekId]) grouped[s.weekId] = [];
    grouped[s.weekId].push(s);
  }

  return (
    <div className="min-h-screen bg-bg-base">
      {/* Header */}
      <div className="border-b border-border-custom bg-surface/80 backdrop-blur-md sticky top-0 z-10">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 h-16 flex items-center justify-between">
          <div className="flex items-center gap-2.5">
            <Shield className="h-5 w-5 text-accent-custom" />
            <span className="font-display text-lg text-text-primary">Admin — Project Submissions</span>
            <span className="text-[10px] font-semibold uppercase tracking-widest bg-accent-light text-accent-custom px-2 py-0.5 rounded-badge">
              {submissions.length} total
            </span>
          </div>
          <div className="flex items-center gap-3">
            <button
              onClick={loadSubmissions}
              className="inline-flex items-center gap-1.5 text-xs font-semibold text-text-secondary hover:text-text-primary border border-border-custom rounded px-3 py-1.5 hover:bg-bg-base transition-all cursor-pointer"
            >
              <RefreshCw className="h-3.5 w-3.5" /> Refresh
            </button>
            <button
              onClick={downloadCSV}
              className="inline-flex items-center gap-1.5 text-xs font-semibold bg-accent-custom text-surface rounded px-3 py-1.5 hover:bg-accent-custom/90 transition-all shadow-sm cursor-pointer"
            >
              <Download className="h-3.5 w-3.5" /> Download Excel (CSV)
            </button>
          </div>
        </div>
      </div>

      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-8 space-y-8">
        {error && (
          <div className="rounded border border-danger-custom/20 bg-danger-custom/5 p-4 text-sm text-danger-custom">
            {error}
          </div>
        )}

        {submissions.length === 0 && !error ? (
          <div className="flex flex-col items-center justify-center py-20 text-text-secondary/50 gap-3">
            <Users className="h-10 w-10" />
            <p className="text-sm">No submissions yet.</p>
          </div>
        ) : (
          [1, 2, 3, 4].map((weekId) => {
            const weekSubs = grouped[weekId] ?? [];
            return (
              <div key={weekId} className="bg-surface border border-border-custom rounded-card shadow-sm overflow-hidden">
                <div className="flex items-center justify-between px-5 py-3 border-b border-border-custom/60 bg-bg-base/30">
                  <h2 className="font-display text-base text-text-primary">Week {weekId}</h2>
                  <span className="text-[10px] font-semibold uppercase tracking-widest text-text-secondary">
                    {weekSubs.length} submission{weekSubs.length !== 1 ? "s" : ""}
                  </span>
                </div>

                {weekSubs.length === 0 ? (
                  <p className="px-5 py-4 text-xs text-text-secondary/60 italic">No submissions for this week yet.</p>
                ) : (
                  <div className="overflow-x-auto">
                    <table className="w-full text-sm">
                      <thead>
                        <tr className="border-b border-border-custom/40">
                          {["Student", "Email", "GitHub URL", "Live Demo", "Notes", "Submitted"].map((h) => (
                            <th key={h} className="text-left px-4 py-2.5 text-[10px] font-semibold uppercase tracking-widest text-text-secondary/70">
                              {h}
                            </th>
                          ))}
                        </tr>
                      </thead>
                      <tbody>
                        {weekSubs.map((s, i) => (
                          <tr key={s.id} className={`border-b border-border-custom/20 ${i % 2 === 0 ? "" : "bg-bg-base/20"}`}>
                            <td className="px-4 py-3 font-medium text-text-primary whitespace-nowrap">{s.user.name}</td>
                            <td className="px-4 py-3 text-text-secondary text-xs">{s.user.email}</td>
                            <td className="px-4 py-3">
                              {s.githubUrl ? (
                                <a href={s.githubUrl} target="_blank" rel="noopener noreferrer" className="inline-flex items-center gap-1 text-xs text-accent-custom hover:underline">
                                  View Repo <ExternalLink className="h-3 w-3" />
                                </a>
                              ) : <span className="text-text-secondary/40 text-xs">—</span>}
                            </td>
                            <td className="px-4 py-3">
                              {s.liveDemoUrl ? (
                                <a href={s.liveDemoUrl} target="_blank" rel="noopener noreferrer" className="inline-flex items-center gap-1 text-xs text-accent-custom hover:underline">
                                  Open Demo <ExternalLink className="h-3 w-3" />
                                </a>
                              ) : <span className="text-text-secondary/40 text-xs">—</span>}
                            </td>
                            <td className="px-4 py-3 text-xs text-text-secondary max-w-[200px] truncate" title={s.notes}>{s.notes || "—"}</td>
                            <td className="px-4 py-3 text-xs text-text-secondary whitespace-nowrap">
                              {new Date(s.submittedAt).toLocaleDateString("en-IN", { day: "2-digit", month: "short", year: "numeric" })}
                            </td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  </div>
                )}
              </div>
            );
          })
        )}
      </div>
    </div>
  );
}
