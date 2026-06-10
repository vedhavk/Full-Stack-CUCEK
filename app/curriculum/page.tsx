"use client";

import React, { useState } from "react";
import Navbar from "@/components/Navbar";
import DashboardSidebar from "@/components/DashboardSidebar";
import CheckpointBadge from "@/components/CheckpointBadge";
import LessonRow from "@/components/LessonRow";
import { useApp } from "@/context/AppContext";
import { curriculumData, Week, Lesson } from "@/lib/curriculumData";
import { ChevronDown, ChevronUp, CheckCircle2, Award, Clock } from "lucide-react";

export default function CurriculumPage() {
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

  const [expandedWeekId, setExpandedWeekId] = useState<number | null>(1);

  if (isLoading) {
    return (
      <div className="flex min-h-screen items-center justify-center bg-bg-base">
        <div className="text-sm text-text-secondary">Verifying credentials...</div>
      </div>
    );
  }

  if (!user) return null;

  const toggleWeekExpand = (id: number) => {
    setExpandedWeekId(expandedWeekId === id ? null : id);
  };

  return (
    <div className="flex flex-col min-h-screen bg-bg-base">
      <Navbar />

      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-8 w-full flex-grow">
        <div className="flex flex-col md:flex-row gap-8">
          <DashboardSidebar />

          <main className="flex-grow space-y-6 page-fade-in">
            {/* Header */}
            <div>
              <h1 className="font-display text-2xl sm:text-3xl text-text-primary">
                Curriculum Roadmap
              </h1>
              <p className="text-xs sm:text-sm text-text-secondary mt-1">
                Explore the full 4-week structured progression. Expand each week to view individual day topics and claim checkpoints.
              </p>
            </div>

            {/* Accordion Weeks List */}
            <div className="space-y-4">
              {curriculumData.map((week) => {
                const isExpanded = expandedWeekId === week.id;
                const progress = getWeekProgress(week.id);
                
                // Count checkpoints
                const weekCheckpoints = week.checkpoints;
                const completedCheckpointsCount = weekCheckpoints.filter((cp) => 
                  completedCheckpointIds.includes(cp.id)
                ).length;

                return (
                  <div
                    key={week.id}
                    className="border border-border-custom bg-surface rounded-card overflow-hidden transition-all duration-200"
                  >
                    {/* Header trigger */}
                    <button
                      onClick={() => toggleWeekExpand(week.id)}
                      className="w-full flex items-center justify-between p-5 text-left hover:bg-bg-base/30 transition-colors cursor-pointer"
                    >
                      <div className="flex-grow space-y-1 pr-4">
                        <div className="flex flex-wrap items-center gap-2">
                          <span className="text-[9px] font-semibold text-accent-custom uppercase tracking-wider bg-accent-light px-2 py-0.5 rounded-badge">
                            Week {week.id}
                          </span>
                          {progress === 100 && (
                            <span className="inline-flex items-center gap-1 text-[10px] font-semibold text-success-custom uppercase">
                              <CheckCircle2 className="h-3.5 w-3.5" />
                              Week Complete
                            </span>
                          )}
                        </div>
                        <h3 className="font-display text-base sm:text-lg text-text-primary mt-1">
                          {week.title}
                        </h3>
                        <p className="text-xs text-text-secondary line-clamp-1">
                          {week.description}
                        </p>
                      </div>

                      {/* Right info */}
                      <div className="flex items-center gap-4 shrink-0">
                        <div className="hidden sm:flex flex-col items-end text-xs text-text-secondary font-mono">
                          <span>{progress}% complete</span>
                          <span>{completedCheckpointsCount}/{weekCheckpoints.length} checkpoints</span>
                        </div>
                        {isExpanded ? (
                          <ChevronUp className="h-4.5 w-4.5 text-text-secondary" />
                        ) : (
                          <ChevronDown className="h-4.5 w-4.5 text-text-secondary" />
                        )}
                      </div>
                    </button>

                    {/* Collapsible Content */}
                    {isExpanded && (
                      <div className="border-t border-border-custom bg-bg-base/20 p-5 space-y-6 page-fade-in">
                        {/* Daily Lessons List */}
                        <div className="space-y-3">
                          <h4 className="text-[10px] font-semibold text-text-secondary tracking-widest uppercase mb-1">
                            Daily Lesson Guides
                          </h4>
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

                        {/* Checkpoint Challenges Card */}
                        {weekCheckpoints.length > 0 && (
                          <div className="border-t border-border-custom/50 pt-5 space-y-4">
                            <h4 className="text-[10px] font-semibold text-text-secondary tracking-widest uppercase">
                              Section Checkpoint Challenges
                            </h4>
                            <div className="grid grid-cols-1 gap-4">
                              {weekCheckpoints.map((cp) => {
                                const unlocked = isCheckpointUnlocked(cp.id);
                                const completed = completedCheckpointIds.includes(cp.id);
                                
                                return (
                                  <div
                                    key={cp.id}
                                    className={`p-4 rounded-card border transition-all duration-200 ${
                                      completed 
                                        ? "border-success-custom/20 bg-success-custom/[0.01]" 
                                        : unlocked 
                                          ? "border-accent-custom/20 bg-accent-light/10" 
                                          : "border-border-custom bg-surface opacity-80"
                                    }`}
                                  >
                                    <div className="flex flex-col sm:flex-row sm:items-start justify-between gap-4">
                                      <div className="space-y-1">
                                        <div className="flex items-center gap-2">
                                          <h5 className="font-display text-sm sm:text-base text-text-primary">
                                            {cp.title}
                                          </h5>
                                          <CheckpointBadge
                                            unlocked={unlocked}
                                            completed={completed}
                                            label="Gate"
                                          />
                                        </div>
                                        <p className="text-xs text-text-secondary leading-relaxed mt-1">
                                          {cp.description}
                                        </p>
                                        
                                        {/* Project Idea box */}
                                        <div className="mt-3 bg-surface p-3 rounded border border-border-custom/80 text-xs">
                                          <span className="font-semibold text-text-primary uppercase tracking-wide text-[10px] block mb-1">
                                            Recommended Project Assignment:
                                          </span>
                                          <span className="text-text-secondary leading-relaxed">
                                            {cp.projectIdea}
                                          </span>
                                        </div>
                                      </div>

                                      {/* Claim/Toggle Button */}
                                      <div className="shrink-0 flex sm:flex-col sm:items-end justify-between items-center sm:justify-start gap-2">
                                        {unlocked && (
                                          <button
                                            onClick={() => toggleCheckpointCompletion(cp.id)}
                                            className={`rounded px-3 py-1.5 text-xs font-semibold cursor-pointer transition-all ${
                                              completed
                                                ? "bg-border-custom text-text-primary hover:bg-border-custom/80"
                                                : "bg-accent-custom text-surface hover:bg-accent-custom/90 shadow-sm"
                                            }`}
                                          >
                                            {completed ? "Completed" : "Claim Milestone"}
                                          </button>
                                        )}
                                        {!unlocked && (
                                          <span className="text-[10px] text-text-secondary font-medium select-none italic text-right">
                                            Complete all previous lessons in this section to unlock.
                                          </span>
                                        )}
                                      </div>
                                    </div>
                                  </div>
                                );
                              })}
                            </div>
                          </div>
                        )}
                      </div>
                    )}
                  </div>
                );
              })}
            </div>
          </main>
        </div>
      </div>
    </div>
  );
}
