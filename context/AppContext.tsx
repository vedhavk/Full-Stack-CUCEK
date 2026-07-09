"use client";

import React, { createContext, useContext, useState, useEffect } from "react";
import { useRouter, usePathname } from "next/navigation";
import { signIn, signOut, useSession } from "next-auth/react";
import { curriculumData } from "@/lib/curriculumData";

interface Announcement {
  id: string;
  date: string;
  title: string;
  content: string;
}

export interface ProjectSubmission {
  weekId: number;
  githubUrl: string;
  liveDemoUrl: string;
  notes: string;
  submittedAt: string;
}

interface AppContextType {
  user: { name: string; email: string; role?: string } | null;
  isLoading: boolean;
  completedLessonIds: string[];
  completedCheckpointIds: string[];
  weekProjects: ProjectSubmission[];
  announcements: Announcement[];
  login: (email: string, password: string) => Promise<{ ok: boolean; error?: string }>;
  register: (email: string, name: string, password: string) => Promise<{ ok: boolean; error?: string }>;
  logout: () => void;
  toggleLessonCompletion: (lessonId: string) => void;
  toggleCheckpointCompletion: (checkpointId: string) => void;
  isCheckpointUnlocked: (checkpointId: string) => boolean;
  getOverallProgress: () => number;
  getWeekProgress: (weekId: number) => number;
  resetProgress: () => void;
  submitWeekProject: (submission: Omit<ProjectSubmission, "submittedAt">) => Promise<void>;
  clearWeekProject: (weekId: number) => void;
  getWeekProject: (weekId: number) => ProjectSubmission | undefined;
}

const AppContext = createContext<AppContextType | undefined>(undefined);

const defaultAnnouncements: Announcement[] = [
  {
    id: "ann-1",
    date: "2026-06-08",
    title: "Bootcamp Launch",
    content: "Welcome to the Full Stack Bootcamp. Begin your Week 1 modules starting with HTML5 Semantic Structure today.",
  },
  {
    id: "ann-2",
    date: "2026-06-09",
    title: "AWS Credentials Reminder",
    content: "For Week 3 deployments, please register for an AWS Free Tier account. Do not deploy production-grade resources that incur costs.",
  },
  {
    id: "ann-3",
    date: "2026-06-10",
    title: "Weekly Office Hours",
    content: "Join our core instructors this Thursday at 17:00 UTC for curriculum troubleshooting and Capstone design reviews.",
  },
];

export function AppProvider({ children }: { children: React.ReactNode }) {
  const router = useRouter();
  const pathname = usePathname();
  const { data: session, status } = useSession();

  const isLoading = status === "loading";
  const user = session?.user
    ? {
        name: session.user.name ?? "",
        email: session.user.email ?? "",
        role: (session.user as { role?: string }).role,
      }
    : null;

  const [completedLessonIds, setCompletedLessonIds] = useState<string[]>([]);
  const [completedCheckpointIds, setCompletedCheckpointIds] = useState<string[]>([]);
  const [weekProjects, setWeekProjects] = useState<ProjectSubmission[]>([]);
  const [announcements] = useState<Announcement[]>(defaultAnnouncements);

  // Load progress from localStorage on mount
  useEffect(() => {
    try {
      const storedLessons = localStorage.getItem("bootcamp_lessons");
      const storedCheckpoints = localStorage.getItem("bootcamp_checkpoints");
      const storedProjects = localStorage.getItem("bootcamp_week_projects");
      if (storedLessons) setCompletedLessonIds(JSON.parse(storedLessons));
      if (storedCheckpoints) setCompletedCheckpointIds(JSON.parse(storedCheckpoints));
      if (storedProjects) setWeekProjects(JSON.parse(storedProjects));
    } catch (e) {
      console.error("Error reading from localStorage:", e);
    }
  }, []);

  // Route protection
  useEffect(() => {
    if (isLoading) return;
    const isProtectedRoute =
      pathname.startsWith("/dashboard") ||
      pathname.startsWith("/curriculum") ||
      pathname.startsWith("/week") ||
      pathname.startsWith("/progress");
    const isAuthRoute = pathname === "/login" || pathname === "/register";

    if (!user && isProtectedRoute) {
      router.push("/login");
    } else if (user && isAuthRoute) {
      router.push("/dashboard");
    }
  }, [user, pathname, isLoading, router]);

  // ── Authentication ──────────────────────────────────────────────────────────

  const login = async (email: string, password: string) => {
    const result = await signIn("credentials", {
      redirect: false,
      email: email.toLowerCase(),
      password,
    });
    if (result?.ok) {
      router.push("/dashboard");
      return { ok: true };
    }
    return { ok: false, error: "Invalid email or password." };
  };

  const register = async (email: string, name: string, password: string) => {
    const res = await fetch("/api/auth/register", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ name, email, password }),
    });
    const data = await res.json();
    if (!res.ok) return { ok: false, error: data.error ?? "Registration failed." };

    // Auto sign-in after registration
    const result = await signIn("credentials", {
      redirect: false,
      email: email.toLowerCase(),
      password,
    });
    if (result?.ok) {
      router.push("/dashboard");
      return { ok: true };
    }
    return { ok: false, error: "Account created. Please sign in." };
  };

  const logout = () => {
    signOut({ callbackUrl: "/" });
  };

  // ── Lesson / Checkpoint progress ────────────────────────────────────────────

  const toggleLessonCompletion = (lessonId: string) => {
    setCompletedLessonIds((prev) => {
      const isCompleted = prev.includes(lessonId);
      const next = isCompleted ? prev.filter((id) => id !== lessonId) : [...prev, lessonId];
      localStorage.setItem("bootcamp_lessons", JSON.stringify(next));

      if (isCompleted) {
        setCompletedCheckpointIds((cpPrev) => {
          const filtered = cpPrev.filter((cpId) => {
            const cp = curriculumData.flatMap((w) => w.checkpoints).find((c) => c.id === cpId);
            if (!cp) return true;
            return !cp.requiredLessonIds.includes(lessonId);
          });
          localStorage.setItem("bootcamp_checkpoints", JSON.stringify(filtered));
          return filtered;
        });
      }
      return next;
    });
  };

  const isCheckpointUnlocked = (checkpointId: string): boolean => {
    const checkpoint = curriculumData
      .flatMap((w) => w.checkpoints)
      .find((cp) => cp.id === checkpointId);
    if (!checkpoint) return false;
    return checkpoint.requiredLessonIds.every((id) => completedLessonIds.includes(id));
  };

  const toggleCheckpointCompletion = (checkpointId: string) => {
    if (!isCheckpointUnlocked(checkpointId)) return;
    setCompletedCheckpointIds((prev) => {
      const next = prev.includes(checkpointId)
        ? prev.filter((id) => id !== checkpointId)
        : [...prev, checkpointId];
      localStorage.setItem("bootcamp_checkpoints", JSON.stringify(next));
      return next;
    });
  };

  const getOverallProgress = (): number => {
    const totalLessons = curriculumData.reduce((acc, w) => acc + w.lessons.length, 0);
    if (totalLessons === 0) return 0;
    return Math.min(Math.round((completedLessonIds.length / totalLessons) * 100), 100);
  };

  const getWeekProgress = (weekId: number): number => {
    const week = curriculumData.find((w) => w.id === weekId);
    if (!week || week.lessons.length === 0) return 0;
    const weekLessonIds = week.lessons.map((l) => l.id);
    const completedWeekLessons = completedLessonIds.filter((id) => weekLessonIds.includes(id));
    return Math.min(Math.round((completedWeekLessons.length / week.lessons.length) * 100), 100);
  };

  const resetProgress = () => {
    setCompletedLessonIds([]);
    setCompletedCheckpointIds([]);
    setWeekProjects([]);
    localStorage.removeItem("bootcamp_lessons");
    localStorage.removeItem("bootcamp_checkpoints");
    localStorage.removeItem("bootcamp_week_projects");
  };

  // ── Project submissions ─────────────────────────────────────────────────────

  const submitWeekProject = async (submission: Omit<ProjectSubmission, "submittedAt">) => {
    // Persist locally immediately so UI responds fast
    const withDate = { ...submission, submittedAt: new Date().toISOString() };
    setWeekProjects((prev) => {
      const next = [...prev.filter((p) => p.weekId !== submission.weekId), withDate];
      localStorage.setItem("bootcamp_week_projects", JSON.stringify(next));
      return next;
    });

    // Also persist to the database
    try {
      await fetch("/api/submissions", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(submission),
      });
    } catch (e) {
      console.error("Failed to sync submission to server:", e);
    }
  };

  const clearWeekProject = (weekId: number) => {
    setWeekProjects((prev) => {
      const next = prev.filter((p) => p.weekId !== weekId);
      localStorage.setItem("bootcamp_week_projects", JSON.stringify(next));
      return next;
    });
  };

  const getWeekProject = (weekId: number): ProjectSubmission | undefined =>
    weekProjects.find((p) => p.weekId === weekId);

  return (
    <AppContext.Provider
      value={{
        user,
        isLoading,
        completedLessonIds,
        completedCheckpointIds,
        weekProjects,
        announcements,
        login,
        register,
        logout,
        toggleLessonCompletion,
        toggleCheckpointCompletion,
        isCheckpointUnlocked,
        getOverallProgress,
        getWeekProgress,
        resetProgress,
        submitWeekProject,
        clearWeekProject,
        getWeekProject,
      }}
    >
      {children}
    </AppContext.Provider>
  );
}

export function useApp() {
  const context = useContext(AppContext);
  if (context === undefined) {
    throw new Error("useApp must be used within an AppProvider");
  }
  return context;
}
