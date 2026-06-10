"use client";

import Link from "next/link";
import { Week } from "@/lib/curriculumData";
import { useApp } from "@/context/AppContext";
import CheckpointBadge from "./CheckpointBadge";
import { ArrowRight, BookOpen, CheckSquare } from "lucide-react";

interface WeekCardProps {
  week: Week;
}

export default function WeekCard({ week }: WeekCardProps) {
  const { getWeekProgress, completedLessonIds, completedCheckpointIds, isCheckpointUnlocked } = useApp();

  const progress = getWeekProgress(week.id);
  const weekLessonIds = week.lessons.map((l) => l.id);
  const completedLessonsCount = week.lessons.filter((l) => completedLessonIds.includes(l.id)).length;
  const totalLessonsCount = week.lessons.length;

  // Progress Ring logic
  const radius = 24;
  const circumference = 2 * Math.PI * radius;
  const strokeDashoffset = circumference - (progress / 100) * circumference;

  // Determine checkpoint badges
  const checkpointsStatus = week.checkpoints.map((cp) => {
    const isCompleted = completedCheckpointIds.includes(cp.id);
    const unlocked = isCheckpointUnlocked(cp.id);
    return { id: cp.id, title: cp.title, unlocked, completed: isCompleted };
  });

  return (
    <div className="rounded-card border border-border-custom bg-surface p-5 shadow-sm hover:shadow-md transition-all duration-200 flex flex-col justify-between">
      <div>
        <div className="flex justify-between items-start mb-4">
          <div>
            <span className="text-[10px] font-semibold tracking-widest text-accent-custom uppercase bg-accent-light px-2 py-0.5 rounded-badge">
              Week {week.id}
            </span>
            <h3 className="font-display text-lg text-text-primary mt-2">
              {week.title}
            </h3>
          </div>

          {/* Progress Ring */}
          <div className="relative flex items-center justify-center">
            <svg className="w-14 h-14 transform -rotate-90">
              <circle
                cx="28"
                cy="28"
                r={radius}
                className="stroke-border-custom fill-none"
                strokeWidth="3.5"
              />
              <circle
                cx="28"
                cy="28"
                r={radius}
                className="stroke-accent-custom fill-none transition-all duration-300 ease-out"
                strokeWidth="3.5"
                strokeDasharray={circumference}
                strokeDashoffset={strokeDashoffset}
                strokeLinecap="round"
              />
            </svg>
            <span className="absolute text-xs font-semibold text-text-primary">
              {progress}%
            </span>
          </div>
        </div>

        <p className="text-sm text-text-secondary line-clamp-2 mb-4 leading-relaxed">
          {week.description}
        </p>

        {/* Stats */}
        <div className="flex items-center gap-4 text-xs text-text-secondary mb-5">
          <span className="flex items-center gap-1.5">
            <BookOpen className="h-3.5 w-3.5 text-text-secondary" />
            {totalLessonsCount} Lessons
          </span>
          <span className="flex items-center gap-1.5">
            <CheckSquare className="h-3.5 w-3.5 text-text-secondary" />
            {completedLessonsCount} Done
          </span>
        </div>

        {/* Checkpoint Statuses */}
        {checkpointsStatus.length > 0 && (
          <div className="border-t border-border-custom/60 pt-4 mt-2 space-y-2">
            <h4 className="text-[10px] font-semibold text-text-secondary tracking-wider uppercase mb-2">
              Section Checkpoints
            </h4>
            <div className="flex flex-wrap gap-1.5">
              {checkpointsStatus.map((cp) => (
                <CheckpointBadge
                  key={cp.id}
                  unlocked={cp.unlocked}
                  completed={cp.completed}
                  label={cp.title}
                />
              ))}
            </div>
          </div>
        )}
      </div>

      <div className="mt-6">
        <Link
          href={`/week/${week.id}`}
          className="w-full inline-flex items-center justify-center rounded px-4 py-2 text-sm font-medium text-text-primary hover:text-accent-custom bg-bg-base border border-border-custom hover:border-accent-custom transition-all duration-200 gap-1.5"
        >
          View Lessons
          <ArrowRight className="h-4 w-4" />
        </Link>
      </div>
    </div>
  );
}
