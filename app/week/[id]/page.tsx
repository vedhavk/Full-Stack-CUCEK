"use client";

import React, { useState } from "react";
import Link from "next/link";
import { useParams, useRouter } from "next/navigation";
import Navbar from "@/components/Navbar";
import DashboardSidebar from "@/components/DashboardSidebar";
import LessonRow from "@/components/LessonRow";
import { useApp } from "@/context/AppContext";
import { curriculumData } from "@/lib/curriculumData";
import { ArrowLeft, BookOpen, CheckSquare, Award, Upload, GitBranch, Globe, FileText, CheckCircle2, Trash2, ExternalLink } from "lucide-react";

export default function WeekModulePage() {
  const params = useParams();
  const router = useRouter();
  const { 
    user, 
    isLoading, 
    completedLessonIds, 
    toggleLessonCompletion, 
    getWeekProgress,
    submitWeekProject,
    clearWeekProject,
    getWeekProject,
  } = useApp();

  // Local form state for the project submission panel
  const [githubUrl, setGithubUrl] = useState("");
  const [liveDemoUrl, setLiveDemoUrl] = useState("");
  const [notes, setNotes] = useState("");
  const [submitting, setSubmitting] = useState(false);

  const weekId = Number(params.id);
  const week = curriculumData.find((w) => w.id === weekId);

  // Existing submission for this week (if any)
  const existingSubmission = getWeekProject(weekId);

  // Whether all lessons are done (project submission unlock condition)
  const allLessonsComplete =
    week?.lessons.every((l) => completedLessonIds.includes(l.id)) ?? false;

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


            {/* ── Week Project Submission ── */}
            <div className={`border rounded-card shadow-sm mt-8 overflow-hidden transition-all duration-200 ${
              existingSubmission
                ? "border-success-custom/30 bg-success-custom/[0.015]"
                : allLessonsComplete
                  ? "border-accent-custom/30 bg-accent-light/10"
                  : "border-border-custom bg-bg-base/30 opacity-70"
            }`}>
              {/* Header */}
              <div className="flex items-center justify-between px-5 py-4 border-b border-border-custom/50">
                <div className="flex items-center gap-2.5">
                  <Upload className="h-4 w-4 text-accent-custom shrink-0" />
                  <div>
                    <h3 className="font-display text-base text-text-primary leading-tight">
                      Week {week.id} Project Submission
                    </h3>
                    <p className="text-[10px] text-text-secondary mt-0.5">
                      {allLessonsComplete
                        ? "Complete all lessons above before submitting your project."
                        : existingSubmission
                          ? `Submitted on ${new Date(existingSubmission.submittedAt).toLocaleDateString("en-GB", { day: "numeric", month: "short", year: "numeric" })}`
                          : "Submit your end-of-week project to record your work."}
                    </p>
                  </div>
                </div>
                {existingSubmission && (
                  <span className="inline-flex items-center gap-1 text-[10px] font-semibold text-success-custom uppercase tracking-wider bg-success-custom/10 px-2 py-0.5 rounded-badge">
                    <CheckCircle2 className="h-3 w-3" /> Submitted
                  </span>
                )}
                {!allLessonsComplete && !existingSubmission && (
                  <span className="text-[10px] font-semibold text-danger-custom uppercase tracking-wider">
                    Finish all lessons to unlock
                  </span>
                )}
              </div>

              <div className="p-5 space-y-5">
                {/* Project Brief & Deliverables */}
                <div className="space-y-3">
                  <div>
                    <h4 className="font-display text-sm text-text-primary">{week.weekProject.title}</h4>
                    <p className="text-xs text-text-secondary leading-relaxed mt-1">{week.weekProject.description}</p>
                  </div>

                  <div className="bg-surface border border-border-custom/60 rounded p-3 space-y-2">
                    <span className="text-[9px] font-semibold text-text-secondary uppercase tracking-wider block">Required Deliverables</span>
                    <ul className="space-y-1.5">
                      {week.weekProject.deliverables.map((item, i) => (
                        <li key={i} className="flex items-start gap-2 text-xs text-text-secondary">
                          <span className="mt-0.5 h-3.5 w-3.5 shrink-0 rounded-full border border-border-custom flex items-center justify-center text-[8px] font-bold text-text-secondary">{i + 1}</span>
                          {item}
                        </li>
                      ))}
                    </ul>
                    <div className="flex gap-3 pt-1">
                      {week.weekProject.githubRequired && (
                        <span className="inline-flex items-center gap-1 text-[9px] font-semibold text-text-secondary uppercase tracking-wider">
                          <GitBranch className="h-2.5 w-2.5" /> GitHub required
                        </span>
                      )}
                      {week.weekProject.liveDemoRequired && (
                        <span className="inline-flex items-center gap-1 text-[9px] font-semibold text-text-secondary uppercase tracking-wider">
                          <Globe className="h-2.5 w-2.5" /> Live demo required
                        </span>
                      )}
                    </div>
                  </div>
                </div>

                {/* If already submitted — show the stored submission */}
                {existingSubmission ? (
                  <div className="space-y-3">
                    <div className="grid sm:grid-cols-2 gap-3">
                      <div className="bg-surface border border-border-custom/60 rounded p-3 space-y-1">
                        <span className="text-[9px] font-semibold text-text-secondary uppercase tracking-wider flex items-center gap-1">
                          <GitBranch className="h-2.5 w-2.5" /> GitHub Repository
                        </span>
                        {existingSubmission.githubUrl ? (
                          <a
                            href={existingSubmission.githubUrl}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="text-xs text-accent-custom hover:underline flex items-center gap-1 break-all"
                          >
                            {existingSubmission.githubUrl}
                            <ExternalLink className="h-2.5 w-2.5 shrink-0" />
                          </a>
                        ) : (
                          <span className="text-xs text-text-secondary italic">Not provided</span>
                        )}
                      </div>
                      <div className="bg-surface border border-border-custom/60 rounded p-3 space-y-1">
                        <span className="text-[9px] font-semibold text-text-secondary uppercase tracking-wider flex items-center gap-1">
                          <Globe className="h-2.5 w-2.5" /> Live Demo
                        </span>
                        {existingSubmission.liveDemoUrl ? (
                          <a
                            href={existingSubmission.liveDemoUrl}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="text-xs text-accent-custom hover:underline flex items-center gap-1 break-all"
                          >
                            {existingSubmission.liveDemoUrl}
                            <ExternalLink className="h-2.5 w-2.5 shrink-0" />
                          </a>
                        ) : (
                          <span className="text-xs text-text-secondary italic">Not provided</span>
                        )}
                      </div>
                    </div>
                    {existingSubmission.notes && (
                      <div className="bg-surface border border-border-custom/60 rounded p-3 space-y-1">
                        <span className="text-[9px] font-semibold text-text-secondary uppercase tracking-wider flex items-center gap-1">
                          <FileText className="h-2.5 w-2.5" /> Notes
                        </span>
                        <p className="text-xs text-text-secondary leading-relaxed whitespace-pre-wrap">{existingSubmission.notes}</p>
                      </div>
                    )}
                    <div className="flex justify-end pt-1">
                      <button
                        onClick={() => clearWeekProject(week.id)}
                        className="inline-flex items-center gap-1.5 text-xs text-danger-custom font-semibold hover:underline cursor-pointer"
                      >
                        <Trash2 className="h-3 w-3" /> Remove submission
                      </button>
                    </div>
                  </div>
                ) : (
                  /* Submission form */
                  <form
                    onSubmit={(e) => {
                      e.preventDefault();
                      if (!githubUrl.trim() && !liveDemoUrl.trim()) return;
                      setSubmitting(true);
                      submitWeekProject({
                        weekId: week.id,
                        githubUrl: githubUrl.trim(),
                        liveDemoUrl: liveDemoUrl.trim(),
                        notes: notes.trim(),
                      });
                      setGithubUrl("");
                      setLiveDemoUrl("");
                      setNotes("");
                      setSubmitting(false);
                    }}
                    className="space-y-3"
                  >
                    <div className="grid sm:grid-cols-2 gap-3">
                      <div className="space-y-1.5">
                        <label htmlFor={`github-url-w${week.id}`} className="text-[10px] font-semibold text-text-secondary uppercase tracking-wider flex items-center gap-1">
                          <GitBranch className="h-3 w-3" /> GitHub Repository URL
                          {week.weekProject.githubRequired && <span className="text-danger-custom">*</span>}
                        </label>
                        <input
                          id={`github-url-w${week.id}`}
                          type="url"
                          value={githubUrl}
                          onChange={(e) => setGithubUrl(e.target.value)}
                          placeholder="https://github.com/your-username/project"
                          disabled={!allLessonsComplete}
                          required={week.weekProject.githubRequired}
                          className="w-full rounded-input border border-border-custom bg-surface px-3 py-2 text-xs text-text-primary placeholder:text-text-secondary/50 focus:outline-none focus:border-accent-custom/60 focus:ring-1 focus:ring-accent-custom/20 disabled:opacity-40 disabled:cursor-not-allowed transition-colors"
                        />
                      </div>
                      <div className="space-y-1.5">
                        <label htmlFor={`demo-url-w${week.id}`} className="text-[10px] font-semibold text-text-secondary uppercase tracking-wider flex items-center gap-1">
                          <Globe className="h-3 w-3" /> Live Demo URL
                          {week.weekProject.liveDemoRequired && <span className="text-danger-custom">*</span>}
                        </label>
                        <input
                          id={`demo-url-w${week.id}`}
                          type="url"
                          value={liveDemoUrl}
                          onChange={(e) => setLiveDemoUrl(e.target.value)}
                          placeholder="https://your-project.vercel.app"
                          disabled={!allLessonsComplete}
                          required={week.weekProject.liveDemoRequired}
                          className="w-full rounded-input border border-border-custom bg-surface px-3 py-2 text-xs text-text-primary placeholder:text-text-secondary/50 focus:outline-none focus:border-accent-custom/60 focus:ring-1 focus:ring-accent-custom/20 disabled:opacity-40 disabled:cursor-not-allowed transition-colors"
                        />
                      </div>
                    </div>

                    <div className="space-y-1.5">
                      <label htmlFor={`notes-w${week.id}`} className="text-[10px] font-semibold text-text-secondary uppercase tracking-wider flex items-center gap-1">
                        <FileText className="h-3 w-3" /> Notes / What you built
                      </label>
                      <textarea
                        id={`notes-w${week.id}`}
                        value={notes}
                        onChange={(e) => setNotes(e.target.value)}
                        rows={3}
                        placeholder="Briefly describe what you built, any challenges you faced, and what you learned."
                        disabled={!allLessonsComplete}
                        className="w-full rounded-input border border-border-custom bg-surface px-3 py-2 text-xs text-text-primary placeholder:text-text-secondary/50 focus:outline-none focus:border-accent-custom/60 focus:ring-1 focus:ring-accent-custom/20 disabled:opacity-40 disabled:cursor-not-allowed resize-none transition-colors"
                      />
                    </div>

                    <div className="flex justify-end">
                      <button
                        type="submit"
                        disabled={!allLessonsComplete || submitting || (!githubUrl.trim() && !liveDemoUrl.trim())}
                        className="inline-flex items-center gap-2 rounded px-4 py-2 text-xs font-semibold bg-accent-custom text-surface hover:bg-accent-custom/90 disabled:opacity-40 disabled:cursor-not-allowed cursor-pointer transition-colors shadow-sm"
                      >
                        <Upload className="h-3.5 w-3.5" />
                        {submitting ? "Submitting..." : "Submit Project"}
                      </button>
                    </div>
                  </form>
                )}
              </div>
            </div>
          </main>
        </div>
      </div>
    </div>
  );
}
