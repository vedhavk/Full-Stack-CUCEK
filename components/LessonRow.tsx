"use client";

import { useState } from "react";
import { Lesson } from "@/lib/curriculumData";
import {
  CheckCircle2,
  Clock,
  ExternalLink,
  Play,
  ChevronDown,
  ChevronUp,
  FileText,
  BookOpen,
} from "lucide-react";

interface LessonRowProps {
  lesson: Lesson;
  isCompleted: boolean;
  onToggle: () => void;
}

export default function LessonRow({ lesson, isCompleted, onToggle }: LessonRowProps) {
  // Track which video index is open (-1 = none)
  const [openVideoIndex, setOpenVideoIndex] = useState<number>(-1);

  const hasVideos = lesson.videos && lesson.videos.length > 0;
  const hasTranscripts = lesson.transcripts && lesson.transcripts.length > 0;
  const multiPart = (lesson.videos?.length ?? 0) > 1;

  function toggleVideo(index: number) {
    setOpenVideoIndex((prev) => (prev === index ? -1 : index));
  }

  return (
    <div
      className={`flex flex-col p-4 rounded-card border transition-all duration-200 gap-3 ${
        isCompleted
          ? "border-success-custom/30 bg-success-custom/[0.02]"
          : "border-border-custom bg-surface hover:border-text-secondary/30"
      }`}
    >
      <div className="flex items-start gap-3.5">
        {/* Completion checkbox */}
        <button
          onClick={onToggle}
          className="mt-1 flex-shrink-0 cursor-pointer focus:outline-none"
          aria-label={isCompleted ? "Mark lesson incomplete" : "Mark lesson complete"}
        >
          <div
            className={`h-5 w-5 rounded border flex items-center justify-center transition-all duration-200 ${
              isCompleted
                ? "border-success-custom bg-success-custom text-surface"
                : "border-border-custom bg-surface hover:border-accent-custom"
            }`}
          >
            {isCompleted && <CheckCircle2 className="h-4 w-4 stroke-[3]" />}
          </div>
        </button>

        {/* Content */}
        <div className="flex-1">
          {/* Meta row */}
          <div className="flex flex-wrap items-center gap-2 mb-1">
            <span className="text-[10px] font-semibold text-accent-custom uppercase tracking-wider bg-accent-light px-1.5 py-0.5 rounded-badge">
              Day {lesson.day}
            </span>
            <span className="flex items-center gap-1 text-[11px] text-text-secondary">
              <Clock className="h-3 w-3" />
              {lesson.duration} mins
            </span>
            {multiPart && (
              <span className="text-[10px] font-semibold text-text-secondary/60 uppercase tracking-wider bg-border-custom/60 px-1.5 py-0.5 rounded-badge">
                {lesson.videos!.length} parts
              </span>
            )}
          </div>

          {/* Title */}
          <h4
            className={`text-sm font-medium transition-colors ${
              isCompleted ? "text-text-secondary line-through" : "text-text-primary"
            }`}
          >
            {lesson.title}
          </h4>

          {/* Description */}
          <p className="text-xs text-text-secondary mt-1 leading-relaxed max-w-2xl">
            {lesson.description}
          </p>

          {/* Action row */}
          <div className="flex flex-wrap items-center gap-x-4 gap-y-2 mt-3">

            {/* ── Video buttons ── */}
            {hasVideos && lesson.videos!.map((video, idx) => {
              const isOpen = openVideoIndex === idx;
              const buttonLabel = multiPart
                ? (video.label ?? `Part ${idx + 1}`)
                : "Watch Lecture";
              // Find the matching transcript for this part (by index when multi-part)
              const matchingTranscript = hasTranscripts
                ? (multiPart ? lesson.transcripts![idx] : lesson.transcripts![0])
                : undefined;

              return (
                <span key={video.id} className="inline-flex items-center gap-2">
                  {/* Watch / hide toggle */}
                  <button
                    onClick={() => toggleVideo(idx)}
                    className="inline-flex items-center gap-1 text-xs text-accent-custom hover:underline transition-all font-semibold cursor-pointer"
                  >
                    <Play className="h-3 w-3 fill-accent-custom" />
                    {isOpen ? `Hide ${buttonLabel}` : buttonLabel}
                    {isOpen ? <ChevronUp className="h-3 w-3" /> : <ChevronDown className="h-3 w-3" />}
                  </button>

                  {/* Transcript link paired with this video */}
                  {matchingTranscript?.url ? (
                    <a
                      href={matchingTranscript.url}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex items-center gap-1 text-xs text-text-secondary hover:text-text-primary hover:underline transition-all font-semibold"
                      title={matchingTranscript.label ?? "Download transcript PDF"}
                    >
                      <FileText className="h-3 w-3" />
                      {matchingTranscript.label ?? "Transcript PDF"}
                      <ExternalLink className="h-2.5 w-2.5" />
                    </a>
                  ) : (
                    /* No transcript yet for this part */
                    <span
                      className="inline-flex items-center gap-1 text-xs text-text-secondary/40 cursor-not-allowed select-none"
                      title="Transcript not yet available"
                    >
                      <FileText className="h-3 w-3" />
                      {multiPart
                        ? (video.label ? `${video.label} Transcript` : `Part ${idx + 1} Transcript`)
                        : "Transcript PDF"}
                      <span className="text-[9px] font-semibold uppercase tracking-wide bg-border-custom/60 text-text-secondary/60 px-1 py-0.5 rounded-badge leading-none">
                        Soon
                      </span>
                    </span>
                  )}
                </span>
              );
            })}

            {/* No videos at all — show placeholder */}
            {!hasVideos && (
              <span className="inline-flex items-center gap-1 text-xs text-text-secondary/40 cursor-not-allowed select-none">
                <Play className="h-3 w-3" />
                Lecture coming soon
                <span className="text-[9px] font-semibold uppercase tracking-wide bg-border-custom/60 text-text-secondary/60 px-1 py-0.5 rounded-badge leading-none">
                  Soon
                </span>
              </span>
            )}

            {/* ── Doc resources (highlighted) ── */}
            {lesson.resources.length > 0 && (
              <div className="inline-flex flex-wrap items-center gap-1.5 bg-accent-light border border-accent-custom/20 rounded px-2.5 py-1.5">
                <span className="inline-flex items-center gap-1 text-[9px] font-bold text-accent-custom uppercase tracking-widest mr-0.5 shrink-0">
                  <BookOpen className="h-2.5 w-2.5" />
                  Docs
                </span>
                {lesson.resources.map((resource, idx) => (
                  <a
                    key={idx}
                    href={resource.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-1 text-[11px] font-semibold text-accent-custom bg-surface border border-accent-custom/25 rounded-badge px-2 py-0.5 hover:bg-accent-custom hover:text-surface hover:border-accent-custom transition-all duration-150"
                  >
                    {resource.name}
                    <ExternalLink className="h-2.5 w-2.5 shrink-0" />
                  </a>
                ))}
              </div>
            )}
          </div>
        </div>
      </div>

      {/* ── Embedded YouTube players (one visible at a time) ── */}
      {hasVideos && lesson.videos!.map((video, idx) =>
        openVideoIndex === idx ? (
          <div
            key={video.id}
            className="mt-2 rounded-card overflow-hidden border border-border-custom bg-black page-fade-in"
          >
            {multiPart && (
              <div className="px-3 py-1.5 bg-bg-base border-b border-border-custom/60 flex items-center gap-2">
                <span className="text-[10px] font-semibold text-text-secondary uppercase tracking-wider">
                  {video.label ?? `Part ${idx + 1}`}
                </span>
              </div>
            )}
            <div className="aspect-video w-full max-w-3xl">
              <iframe
                className="w-full h-full"
                src={video.id.startsWith("PL") ? `https://www.youtube.com/embed/videoseries?list=${video.id}&rel=0&modestbranding=1` : `https://www.youtube.com/embed/${video.id}?rel=0&modestbranding=1`}
                title={`${lesson.title}${multiPart ? ` — ${video.label ?? `Part ${idx + 1}`}` : ""}`}
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
                allowFullScreen
              />
            </div>
          </div>
        ) : null
      )}
    </div>
  );
}
