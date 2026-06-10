"use client";

import React, { createContext, useContext, useState, useEffect } from "react";
import { useRouter, usePathname } from "next/navigation";
import { curriculumData, Week, Lesson, Checkpoint } from "@/lib/curriculumData";

interface User {
  name: string;
  email: string;
}

interface Announcement {
  id: string;
  date: string;
  title: string;
  content: string;
}

interface AppContextType {
  user: User | null;
  isLoading: boolean;
  completedLessonIds: string[];
  completedCheckpointIds: string[];
  announcements: Announcement[];
  login: (email: string, name?: string) => Promise<boolean>;
  register: (email: string, name: string) => Promise<boolean>;
  logout: () => void;
  toggleLessonCompletion: (lessonId: string) => void;
  toggleCheckpointCompletion: (checkpointId: string) => void;
  isCheckpointUnlocked: (checkpointId: string) => boolean;
  getOverallProgress: () => number; // returns 0-100 percentage
  getWeekProgress: (weekId: number) => number; // returns 0-100 percentage
  resetProgress: () => void;
}

const AppContext = createContext<AppContextType | undefined>(undefined);

const defaultAnnouncements: Announcement[] = [
  {
    id: "ann-1",
    date: "2026-06-08",
    title: "Bootcamp Launch",
    content: "Welcome to the Full Stack Bootcamp. Begin your Week 1 modules starting with HTML5 Semantic Structure today."
  },
  {
    id: "ann-2",
    date: "2026-06-09",
    title: "AWS Credentials Reminder",
    content: "For Week 3 deployments, please register for an AWS Free Tier account. Do not deploy production-grade resources that incur costs."
  },
  {
    id: "ann-3",
    date: "2026-06-10",
    title: "Weekly Office Hours",
    content: "Join our core instructors this Thursday at 17:00 UTC for curriculum troubleshooting and Capstone design reviews."
  }
];

export function AppProvider({ children }: { children: React.ReactNode }) {
  const router = useRouter();
  const pathname = usePathname();
  const [user, setUser] = useState<User | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [completedLessonIds, setCompletedLessonIds] = useState<string[]>([]);
  const [completedCheckpointIds, setCompletedCheckpointIds] = useState<string[]>([]);
  const [announcements] = useState<Announcement[]>(defaultAnnouncements);

  // Load state from localStorage on mount
  useEffect(() => {
    try {
      const storedUser = localStorage.getItem("bootcamp_user");
      const storedLessons = localStorage.getItem("bootcamp_lessons");
      const storedCheckpoints = localStorage.getItem("bootcamp_checkpoints");

      if (storedUser) {
        setUser(JSON.parse(storedUser));
      }
      if (storedLessons) {
        setCompletedLessonIds(JSON.parse(storedLessons));
      }
      if (storedCheckpoints) {
        setCompletedCheckpointIds(JSON.parse(storedCheckpoints));
      }
    } catch (e) {
      console.error("Error reading from localStorage:", e);
    } finally {
      setIsLoading(false);
    }
  }, []);

  // Handle route protection for client-side navigation
  useEffect(() => {
    if (isLoading) return;

    const isProtectedRoute = pathname.startsWith("/dashboard") || 
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

  const login = async (email: string, name?: string): Promise<boolean> => {
    // Basic mock authentication login
    const computedName = name || email.split("@")[0];
    const loggedUser = { email, name: computedName.charAt(0).toUpperCase() + computedName.slice(1) };
    setUser(loggedUser);
    localStorage.setItem("bootcamp_user", JSON.stringify(loggedUser));
    router.push("/dashboard");
    return true;
  };

  const register = async (email: string, name: string): Promise<boolean> => {
    // Basic mock authentication register
    const loggedUser = { email, name };
    setUser(loggedUser);
    localStorage.setItem("bootcamp_user", JSON.stringify(loggedUser));
    router.push("/dashboard");
    return true;
  };

  const logout = () => {
    setUser(null);
    localStorage.removeItem("bootcamp_user");
    // Preserve progress even on logout, so they don't lose work, or optionally clear.
    router.push("/");
  };

  const toggleLessonCompletion = (lessonId: string) => {
    setCompletedLessonIds((prev) => {
      const isCompleted = prev.includes(lessonId);
      const next = isCompleted ? prev.filter((id) => id !== lessonId) : [...prev, lessonId];
      localStorage.setItem("bootcamp_lessons", JSON.stringify(next));

      // Automatically lock/unlock checkpoints based on lesson completion
      // If a lesson is unchecked, we should revoke checkpoints that require it
      if (isCompleted) {
        setCompletedCheckpointIds((cpPrev) => {
          const filtered = cpPrev.filter((cpId) => {
            const cp = curriculumData
              .flatMap((w) => w.checkpoints)
              .find((c) => c.id === cpId);
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
      const isCompleted = prev.includes(checkpointId);
      const next = isCompleted
        ? prev.filter((id) => id !== checkpointId)
        : [...prev, checkpointId];
      localStorage.setItem("bootcamp_checkpoints", JSON.stringify(next));
      return next;
    });
  };

  const getOverallProgress = (): number => {
    const totalLessons = curriculumData.reduce((acc, w) => acc + w.lessons.length, 0);
    if (totalLessons === 0) return 0;
    const completedCount = completedLessonIds.length;
    return Math.min(Math.round((completedCount / totalLessons) * 100), 100);
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
    localStorage.removeItem("bootcamp_lessons");
    localStorage.removeItem("bootcamp_checkpoints");
  };

  return (
    <AppContext.Provider
      value={{
        user,
        isLoading,
        completedLessonIds,
        completedCheckpointIds,
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
