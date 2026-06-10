"use client";

import React from "react";
import Link from "next/link";
import { useParams, useRouter } from "next/navigation";
import Navbar from "@/components/Navbar";
import DashboardSidebar from "@/components/DashboardSidebar";
import LessonRow from "@/components/LessonRow";
import CheckpointBadge from "@/components/CheckpointBadge";
import { useApp } from "@/context/AppContext";
import { curriculumData } from "@/lib/curriculumData";
import { ArrowLeft, BookOpen, CheckSquare, Award } from "lucide-react";

export default function WeekModulePage() {
  const params = useParams();
  const router = useRouter();
  const { 
    user, 
    isLoading, 
    completedLessonIds, 
    completedCheckpointIds,
    toggleLessonCompletion, 
    toggleCheckpointCompletion,
    isCheckpointUnlocked,
    getWeekProgress 
  } = useApp();

  const weekId = Number(params.id);
  const week = curriculumData.find((w) => w.id === weekId);

  if (isLoading) {
    return (
      <div className="flex min-h-screen items-center justify-center bg-bg-base">
        <div className="text-sm text-text-secondary">Verifying credentials...</div>
      </div>
    );
  }

  if (!user) return null;

  if (!week) {
    // Redirect if week not found
    router.push("/dashboard");
    return null;
  }

  const progress = getWeekProgress(week.id);
  const completedLessonsCount = week.lessons.filter((l) => completedLessonIds.includes(l.id)).length;
  const totalLessonsCount = week.lessons.length;

  return (
    <div className="flex flex-col min-h-screen bg-bg-base">
      <Navbar />

      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-8 w-full flex-grow">
        <div className="flex flex-col md:flex-row gap-8">
          <DashboardSidebar />

          <main className="flex-1 space-y-6 page-fade-in">
            {/* Breadcrumb & Navigation Header */}
            <div className="flex items-center justify-between border-b border-border-custom/50 pb-4">
              <Link
                href="/dashboard"
                className="inline-flex items-center gap-1 text-xs font-semibold text-text-secondary hover:text-text-primary transition-colors"
              >
                <ArrowLeft className="h-3.5 w-3.5" />
                Back to Dashboard
              </Link>
              <span className="text-xs text-text-secondary font-mono">
                Module {week.id} of 4
              </span>
            </div>

            {/* Header Module Detail Card */}
            <div className="border border-border-custom bg-surface rounded-card p-6 flex flex-col sm:flex-row justify-between gap-6 shadow-sm">
              <div className="space-y-2 max-w-xl">
                <span className="text-[10px] font-semibold text-accent-custom uppercase tracking-wider bg-accent-light px-2.5 py-0.5 rounded-badge">
                  Week {week.id} Syllabus
                </span>
                <h1 className="font-display text-2xl text-text-primary mt-1">
                  {week.title}
                </h1>
                <p className="text-sm text-text-secondary leading-relaxed">
                  {week.description}
                </p>
              </div>

              {/* Progress Panel */}
              <div className="shrink-0 flex sm:flex-col items-center justify-between sm:justify-center border-t sm:border-t-0 sm:border-l border-border-custom/60 pt-4 sm:pt-0 sm:pl-6 gap-4">
                <div className="text-center sm:text-right">
                  <span className="text-[10px] font-semibold text-text-secondary uppercase tracking-wider block">
                    Module Progress
                  </span>
                  <span className="font-display text-3xl text-text-primary block mt-1">
                    {progress}%
                  </span>
                </div>
                <div className="text-center sm:text-right">
                  <span className="text-xs text-text-secondary">
                    {completedLessonsCount} of {totalLessonsCount} complete
                  </span>
                </div>
              </div>
            </div>

            {/* Day by Day Lessons List */}
            <div className="space-y-4">
              <h3 className="font-display text-lg text-text-primary">
                Daily Lessons Guide
              </h3>
              <div className="space-y-3">
                {week.lessons.map((lesson) => (
                  <LessonRow
                    key={lesson.id}
                    lesson={lesson}
                    isCompleted={completedLessonIds.includes(lesson.id)}
                    onToggle={() => toggleLessonCompletion(lesson.id)}
                  />
                ))}
              </div>
            </div>

            {/* Week Checkpoints Gating */}
            {week.checkpoints.length > 0 && (
              <div className="border border-border-custom bg-surface rounded-card p-5 space-y-4 mt-8 shadow-sm">
                <div className="border-b border-border-custom/50 pb-3 flex justify-between items-center">
                  <h3 className="font-display text-base text-text-primary">
                    Module Checkpoint Gates
                  </h3>
                  <span className="text-[10px] text-text-secondary font-semibold uppercase tracking-wider">
                    {week.checkpoints.length} Required Milestones
                  </span>
                </div>

                <div className="space-y-4">
                  {week.checkpoints.map((cp) => {
                    const unlocked = isCheckpointUnlocked(cp.id);
                    const completed = completedCheckpointIds.includes(cp.id);

                    // Find remaining lesson count for this checkpoint
                    const remainingLessons = cp.requiredLessonIds.filter(
                      (id) => !completedLessonIds.includes(id)
                    );

                    return (
                      <div
                        key={cp.id}
                        className={`p-4 rounded-card border transition-all duration-200 ${
                          completed
                            ? "border-success-custom/25 bg-success-custom/[0.01]"
                            : unlocked
                              ? "border-accent-custom/20 bg-accent-light/10"
                              : "border-border-custom bg-bg-base/30 opacity-75"
                        }`}
                      >
                        <div className="flex flex-col sm:flex-row justify-between sm:items-start gap-4">
                          <div className="space-y-1.5 flex-1">
                            <div className="flex flex-wrap items-center gap-2">
                              <h4 className="font-display text-sm sm:text-base text-text-primary">
                                {cp.title}
                              </h4>
                              <CheckpointBadge
                                unlocked={unlocked}
                                completed={completed}
                                label="Gate"
                              />
                            </div>
                            <p className="text-xs text-text-secondary leading-relaxed">
                              {cp.description}
                            </p>
                            
                            {/* Project Idea box */}
                            <div className="mt-3 bg-surface p-3 rounded border border-border-custom/60 text-xs">
                              <strong className="font-semibold text-text-primary uppercase tracking-wide text-[9px] block mb-1">
                                Assignment Outline:
                              </strong>
                              <span className="text-text-secondary leading-relaxed">
                                {cp.projectIdea}
                              </span>
                            </div>
                          </div>

                          {/* Trigger button */}
                          <div className="shrink-0 flex sm:flex-col sm:items-end justify-between items-center sm:justify-start gap-2">
                            {unlocked ? (
                              <button
                                onClick={() => toggleCheckpointCompletion(cp.id)}
                                className={`rounded px-3.5 py-1.5 text-xs font-semibold cursor-pointer transition-colors ${
                                  completed
                                    ? "bg-border-custom text-text-primary hover:bg-border-custom/80"
                                    : "bg-accent-custom text-surface hover:bg-accent-custom/90 shadow-sm"
                                }`}
                              >
                                {completed ? "Milestone Complete" : "Claim Milestone"}
                              </button>
                            ) : (
                              <div className="text-right">
                                <span className="text-[10px] text-danger-custom font-semibold uppercase tracking-wider block">
                                  Gate Locked
                                </span>
                                <span className="text-[10px] text-text-secondary mt-1 block">
                                  Complete {remainingLessons.length} remaining lesson{remainingLessons.length > 1 ? "s" : ""} to unlock.
                                </span>
                              </div>
                            )}
                          </div>
                        </div>
                      </div>
                    );
                  })}
                </div>
              </div>
            )}
          </main>
        </div>
      </div>
    </div>
  );
}
