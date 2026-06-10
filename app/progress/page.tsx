"use client";

import React, { useState, useEffect } from "react";
import Navbar from "@/components/Navbar";
import DashboardSidebar from "@/components/DashboardSidebar";
import ProgressBar from "@/components/ProgressBar";
import { useApp } from "@/context/AppContext";
import { curriculumData } from "@/lib/curriculumData";
import { Award, CheckSquare, ShieldCheck, Download, Printer, ExternalLink, Calendar } from "lucide-react";

export default function ProgressPage() {
  const { 
    user, 
    isLoading, 
    completedLessonIds, 
    completedCheckpointIds, 
    getOverallProgress, 
    isCheckpointUnlocked,
    toggleCheckpointCompletion 
  } = useApp();

  const [currentDate, setCurrentDate] = useState("");

  useEffect(() => {
    // Client-side date generation to avoid hydration mismatch
    const date = new Date();
    const formatted = date.toLocaleDateString("en-US", {
      year: "numeric",
      month: "long",
      day: "numeric",
    });
    setCurrentDate(formatted);
  }, []);

  if (isLoading) {
    return (
      <div className="flex min-h-screen items-center justify-center bg-bg-base">
        <div className="text-sm text-text-secondary">Verifying credentials...</div>
      </div>
    );
  }

  if (!user) return null;

  // Aggregate all checkpoints
  const allCheckpoints = curriculumData.flatMap((w) => 
    w.checkpoints.map((cp) => ({
      ...cp,
      weekId: w.id,
      weekTitle: w.title
    }))
  );

  const completedCheckpoints = allCheckpoints.filter((cp) => 
    completedCheckpointIds.includes(cp.id)
  );

  const totalCheckpointsCount = allCheckpoints.length;
  const completedCheckpointsCount = completedCheckpoints.length;
  const isEligibleForCertificate = completedCheckpointsCount === totalCheckpointsCount && getOverallProgress() === 100;
  
  const handlePrint = () => {
    window.print();
  };

  return (
    <div className="flex flex-col min-h-screen bg-bg-base print:bg-white">
      {/* Hide navbar on print */}
      <div className="print:hidden">
        <Navbar />
      </div>

      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-8 w-full flex-grow print:py-0 print:px-0">
        <div className="flex flex-col md:flex-row gap-8 print:block">
          {/* Hide sidebar on print */}
          <div className="print:hidden">
            <DashboardSidebar />
          </div>

          <main className="flex-grow space-y-8 print:space-y-0 page-fade-in print:block">
            {/* Header - Hide on print */}
            <div className="print:hidden">
              <h1 className="font-display text-2xl sm:text-3xl text-text-primary">
                Learning Progress
              </h1>
              <p className="text-xs sm:text-sm text-text-secondary mt-1">
                View your completed checklist. Complete all daily topics and milestone checkpoints to receive your certificate.
              </p>
            </div>

            {/* Stats Overview card - Hide on print */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 print:hidden">
              <div className="border border-border-custom bg-surface rounded-card p-5 shadow-sm space-y-4">
                <h3 className="text-[10px] font-semibold text-text-secondary tracking-wider uppercase">
                  Checkpoints Board
                </h3>
                <div className="flex items-baseline gap-2">
                  <span className="font-display text-3xl text-text-primary">
                    {completedCheckpointsCount} / {totalCheckpointsCount}
                  </span>
                  <span className="text-xs text-text-secondary">Milestones reached</span>
                </div>
                <div className="w-full bg-border-custom/50 rounded-full h-1.5 overflow-hidden">
                  <div
                    className="bg-accent-custom h-1.5 rounded-full transition-all duration-300"
                    style={{ width: `${(completedCheckpointsCount / totalCheckpointsCount) * 100}%` }}
                  />
                </div>
              </div>

              <div className="border border-border-custom bg-surface rounded-card p-5 shadow-sm space-y-4">
                <h3 className="text-[10px] font-semibold text-text-secondary tracking-wider uppercase">
                  Overall Completion Percentage
                </h3>
                <div className="flex items-baseline gap-2">
                  <span className="font-display text-3xl text-text-primary">
                    {getOverallProgress()}%
                  </span>
                  <span className="text-xs text-text-secondary">Topics mastered</span>
                </div>
                <div>
                  <ProgressBar completed={completedLessonIds.length} total={curriculumData.reduce((acc, w) => acc + w.lessons.length, 0)} showText={false} />
                </div>
              </div>
            </div>

            {/* Checkpoint Checklist Section - Hide on print */}
            <div className="border border-border-custom bg-surface rounded-card p-5 shadow-sm print:hidden">
              <h2 className="font-display text-lg text-text-primary mb-4 border-b border-border-custom/50 pb-3">
                Milestone Verification Checklist
              </h2>
              
              <div className="divide-y divide-border-custom/50 space-y-4">
                {curriculumData.map((week) => {
                  return (
                    <div key={week.id} className="pt-4 first:pt-0">
                      <div className="mb-3">
                        <span className="text-[9px] font-semibold text-text-secondary uppercase tracking-widest block">
                          WEEK {week.id}
                        </span>
                        <h4 className="text-xs font-semibold text-text-primary">
                          {week.title}
                        </h4>
                      </div>

                      <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                        {week.checkpoints.map((cp) => {
                          const unlocked = isCheckpointUnlocked(cp.id);
                          const completed = completedCheckpointIds.includes(cp.id);

                          return (
                            <div
                              key={cp.id}
                              className={`flex items-start justify-between p-3 rounded border text-xs gap-3 ${
                                completed 
                                  ? "border-success-custom/25 bg-success-custom/[0.01]" 
                                  : "border-border-custom bg-bg-base/30"
                              }`}
                            >
                              <div className="space-y-1">
                                <span className="font-medium text-text-primary block">
                                  {cp.title}
                                </span>
                                <span className="text-[10px] text-text-secondary block">
                                  {completed ? "Completed" : unlocked ? "Ready to Claim" : "Locked"}
                                </span>
                              </div>

                              <button
                                disabled={!unlocked}
                                onClick={() => toggleCheckpointCompletion(cp.id)}
                                className={`h-4.5 w-4.5 rounded border flex items-center justify-center shrink-0 transition-colors ${
                                  completed
                                    ? "border-success-custom bg-success-custom text-surface"
                                    : unlocked
                                      ? "border-accent-custom bg-surface hover:border-accent-custom hover:bg-accent-light text-transparent cursor-pointer"
                                      : "border-border-custom bg-border-custom/20 text-transparent cursor-not-allowed"
                                }`}
                              >
                                {completed && (
                                  <svg className="h-3 w-3 stroke-[3]" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                    <path strokeLinecap="round" strokeLinejoin="round" d="M4.5 12.75l6 6 9-13.5" />
                                  </svg>
                                )}
                              </button>
                            </div>
                          );
                        })}
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>

            {/* Certificate Section */}
            <div className="space-y-4">
              <h2 className="font-display text-lg text-text-primary print:hidden">
                Verifiable Program Certificate
              </h2>

              {!isEligibleForCertificate ? (
                /* locked preview - Hide on print */
                <div className="border border-border-custom bg-surface rounded-card p-8 text-center shadow-sm print:hidden">
                  <div className="mx-auto h-12 w-12 rounded bg-border-custom/50 flex items-center justify-center text-text-secondary mb-4">
                    <Award className="h-6 w-6" />
                  </div>
                  <h3 className="font-display text-base text-text-primary">
                    Certificate Locked
                  </h3>
                  <p className="text-xs sm:text-sm text-text-secondary mt-2 max-w-md mx-auto leading-relaxed">
                    Complete all 23 daily lessons and claim all 10 module checkpoints to generate your graduation certificate.
                  </p>
                  <div className="mt-4 text-xs font-mono text-accent-custom bg-accent-light/50 inline-block px-3 py-1 rounded">
                    Remaining: {totalCheckpointsCount - completedCheckpointsCount} checkpoints
                  </div>
                </div>
              ) : (
                /* fully unlocked printing layout */
                <div className="space-y-6">
                  {/* Actions buttons - Hide on print */}
                  <div className="flex justify-end gap-3 print:hidden">
                    <button
                      onClick={handlePrint}
                      className="inline-flex items-center gap-2 rounded border border-border-custom bg-surface px-4 py-2 text-xs font-medium text-text-primary hover:bg-bg-base transition-colors cursor-pointer"
                    >
                      <Printer className="h-4 w-4" />
                      Print Certificate
                    </button>
                  </div>

                  {/* Certificate graphic */}
                  <div className="border-4 border-double border-accent-custom/40 bg-surface rounded-card p-8 sm:p-12 shadow-md relative overflow-hidden select-none max-w-3xl mx-auto flex flex-col items-center text-center space-y-6 print:border-4 print:shadow-none print:my-0">
                    {/* Sage Accent Border Ribbon */}
                    <div className="absolute top-0 left-0 right-0 h-2 bg-accent-custom" />

                    <div className="space-y-1.5">
                      <span className="text-[10px] font-semibold text-accent-custom uppercase tracking-[0.25em] font-mono block">
                        Certificate of Completion
                      </span>
                      <div className="h-0.5 w-16 bg-border-custom mx-auto mt-2" />
                    </div>

                    <p className="text-[11px] sm:text-xs text-text-secondary uppercase tracking-wider font-mono">
                      This is to officially certify that
                    </p>

                    <h2 className="font-display text-3xl sm:text-4xl text-text-primary tracking-tight py-2 border-b border-border-custom/50 px-4 min-w-[200px]">
                      {user.name}
                    </h2>

                    <p className="text-xs text-text-secondary max-w-md leading-relaxed">
                      has successfully completed all requirements, daily topic checklists, and milestones for the intensive
                    </p>

                    <div className="space-y-1">
                      <h3 className="font-display text-lg sm:text-xl text-accent-custom">
                        4-Week Full Stack Software Engineering Program
                      </h3>
                      <span className="text-[10px] text-text-secondary uppercase tracking-widest font-mono">
                        A Syllabus derived from roadmap.sh
                      </span>
                    </div>

                    <div className="grid grid-cols-2 gap-12 w-full pt-8 text-xs text-text-secondary font-mono">
                      <div className="space-y-1 border-t border-border-custom/60 pt-3">
                        <span className="block text-[9px] uppercase tracking-wider text-text-secondary">Date Issued</span>
                        <span className="text-text-primary font-medium">{currentDate}</span>
                      </div>
                      <div className="space-y-1 border-t border-border-custom/60 pt-3">
                        <span className="block text-[9px] uppercase tracking-wider text-text-secondary">Verification ID</span>
                        <span className="text-text-primary font-medium">FSB-2026-{(user.name.slice(0,3) + "-" + completedLessonIds.length + completedCheckpointIds.length).toUpperCase()}</span>
                      </div>
                    </div>

                    {/* Seal Graphics */}
                    <div className="pt-4">
                      <div className="h-14 w-14 rounded-full border border-accent-custom/40 flex items-center justify-center text-accent-custom bg-accent-light/40">
                        <Award className="h-7 w-7" />
                      </div>
                    </div>
                  </div>
                </div>
              )}
            </div>
          </main>
        </div>
      </div>
    </div>
  );
}
