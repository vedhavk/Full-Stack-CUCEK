"use client";

import Link from "next/link";
import Navbar from "@/components/Navbar";
import DashboardSidebar from "@/components/DashboardSidebar";
import WeekCard from "@/components/WeekCard";
import ProgressBar from "@/components/ProgressBar";
import { useApp } from "@/context/AppContext";
import { curriculumData } from "@/lib/curriculumData";
import { Calendar, Bell, ArrowRight, CheckCircle2, Circle } from "lucide-react";

export default function DashboardPage() {
  const { user, isLoading, completedLessonIds, announcements, getOverallProgress } = useApp();

  if (isLoading) {
    return (
      <div className="flex min-h-screen items-center justify-center bg-bg-base">
        <div className="text-sm text-text-secondary">Verifying credentials...</div>
      </div>
    );
  }

  if (!user) return null;

  // Find next incomplete lesson
  const nextLesson = curriculumData
    .flatMap((w) => w.lessons)
    .find((l) => !completedLessonIds.includes(l.id));

  // Find corresponding week for the next lesson
  const nextLessonWeek = nextLesson
    ? curriculumData.find((w) => w.lessons.some((l) => l.id === nextLesson.id))
    : null;

  const totalLessons = curriculumData.reduce((acc, w) => acc + w.lessons.length, 0);
  const completedCount = completedLessonIds.length;
  const progressPercent = getOverallProgress();

  return (
    <div className="flex flex-col min-h-screen bg-bg-base">
      <Navbar />

      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-8 w-full flex-grow">
        <div className="flex flex-col md:flex-row gap-8">
          {/* Sidebar */}
          <DashboardSidebar />

          {/* Main Dashboard Content */}
          <main className="flex-1 space-y-8 page-fade-in">
            {/* Header Greeting */}
            <div>
              <h1 className="font-display text-2xl sm:text-3xl text-text-primary">
                Welcome back, {user.name}
              </h1>
              <p className="text-xs sm:text-sm text-text-secondary mt-1">
                Track your structured learning journey and manage task checkpoints.
              </p>
            </div>

            {/* Quick Overview Summary Row */}
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
              {/* Today's Focus Card */}
              <div className="lg:col-span-2 rounded-card border border-border-custom bg-surface p-5 flex flex-col justify-between shadow-sm">
                <div>
                  <h3 className="text-[10px] font-semibold text-text-secondary tracking-wider uppercase mb-3.5">
                    Today&apos;s Focus Topic
                  </h3>
                  {nextLesson && nextLessonWeek ? (
                    <div>
                      <div className="flex items-center gap-2 mb-2">
                        <span className="text-[10px] font-semibold text-accent-custom uppercase tracking-wider bg-accent-light px-1.5 py-0.5 rounded-badge">
                          Week {nextLessonWeek.id} · Day {nextLesson.day}
                        </span>
                        <span className="text-xs text-text-secondary">
                          {nextLesson.duration} mins
                        </span>
                      </div>
                      <h4 className="font-display text-base sm:text-lg text-text-primary">
                        {nextLesson.title}
                      </h4>
                      <p className="text-xs sm:text-sm text-text-secondary mt-2 line-clamp-2 leading-relaxed">
                        {nextLesson.description}
                      </p>
                    </div>
                  ) : (
                    <div>
                      <div className="flex items-center gap-2 mb-2">
                        <span className="inline-flex items-center gap-1 rounded bg-success-custom/10 px-2 py-0.5 text-[10px] font-semibold uppercase tracking-wider text-success-custom border border-success-custom/20">
                          Completed
                        </span>
                      </div>
                      <h4 className="font-display text-base sm:text-lg text-text-primary">
                        All modules completed
                      </h4>
                      <p className="text-xs sm:text-sm text-text-secondary mt-2 leading-relaxed">
                        Excellent work! You have finished all curriculum days. Navigate to progress to export your verified certificate.
                      </p>
                    </div>
                  )}
                </div>

                <div className="mt-6 border-t border-border-custom/50 pt-4 flex justify-between items-center">
                  {nextLesson && nextLessonWeek ? (
                    <>
                      <Link
                        href={`/week/${nextLessonWeek.id}`}
                        className="text-xs font-semibold text-accent-custom hover:underline inline-flex items-center gap-1.5"
                      >
                        Start Lesson
                        <ArrowRight className="h-3.5 w-3.5" />
                      </Link>
                      <span className="text-xs text-text-secondary">
                        {totalLessons - completedCount} topics remaining
                      </span>
                    </>
                  ) : (
                    <Link
                      href="/progress"
                      className="text-xs font-semibold text-accent-custom hover:underline inline-flex items-center gap-1.5"
                    >
                      Go to Progress
                      <ArrowRight className="h-3.5 w-3.5" />
                    </Link>
                  )}
                </div>
              </div>

              {/* Progress Card */}
              <div className="rounded-card border border-border-custom bg-surface p-5 flex flex-col justify-between shadow-sm">
                <div>
                  <h3 className="text-[10px] font-semibold text-text-secondary tracking-wider uppercase mb-4">
                    Course Completion
                  </h3>
                  <div className="flex items-baseline gap-2 mb-2">
                    <span className="font-display text-4xl text-text-primary">
                      {progressPercent}%
                    </span>
                    <span className="text-xs text-text-secondary">overall</span>
                  </div>
                  <p className="text-xs text-text-secondary leading-relaxed mb-4">
                    Complete all lessons in a section to unlock the corresponding checkpoint assignment.
                  </p>
                </div>
                <div>
                  <ProgressBar completed={completedCount} total={totalLessons} label="Program Lessons" />
                </div>
              </div>
            </div>

            {/* Weeks Cards Grid */}
            <div className="space-y-4">
              <h2 className="font-display text-lg text-text-primary">
                Bootcamp Syllabus Modules
              </h2>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                {curriculumData.map((week) => (
                  <WeekCard key={week.id} week={week} />
                ))}
              </div>
            </div>

            {/* Recent Activity / Announcements Feed */}
            <div className="border border-border-custom bg-surface rounded-card p-5 shadow-sm">
              <div className="flex items-center gap-2 mb-4 border-b border-border-custom/50 pb-3">
                <Bell className="h-4.5 w-4.5 text-accent-custom" />
                <h3 className="font-display text-base text-text-primary">
                  Announcements Feed
                </h3>
              </div>
              <div className="divide-y divide-border-custom/50 space-y-4">
                {announcements.map((ann, idx) => (
                  <div key={ann.id} className={`${idx > 0 ? "pt-4" : ""} first:pt-0`}>
                    <div className="flex justify-between items-start gap-4">
                      <h4 className="text-sm font-medium text-text-primary">
                        {ann.title}
                      </h4>
                      <span className="text-[10px] font-semibold text-text-secondary tracking-wider font-mono">
                        {ann.date}
                      </span>
                    </div>
                    <p className="text-xs text-text-secondary mt-1.5 leading-relaxed">
                      {ann.content}
                    </p>
                  </div>
                ))}
              </div>
            </div>
          </main>
        </div>
      </div>
    </div>
  );
}
