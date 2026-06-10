"use client";

import { useState } from "react";
import { Lesson } from "@/lib/curriculumData";
import { CheckCircle2, Clock, ExternalLink, Play, Video, ChevronDown, ChevronUp } from "lucide-react";

interface LessonRowProps {
  lesson: Lesson;
  isCompleted: boolean;
  onToggle: () => void;
}

export default function LessonRow({ lesson, isCompleted, onToggle }: LessonRowProps) {
  const [showVideo, setShowVideo] = useState(false);

  return (
    <div
      className={`flex flex-col p-4 rounded-card border transition-all duration-200 gap-3 ${
        isCompleted
          ? "border-success-custom/30 bg-success-custom/[0.02]"
          : "border-border-custom bg-surface hover:border-text-secondary/30"
      }`}
    >
      <div className="flex items-start gap-3.5 justify-between">
        <div className="flex items-start gap-3.5 flex-1">
          {/* Toggle checkbox */}
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
          <div>
            <div className="flex flex-wrap items-center gap-2 mb-1">
              <span className="text-[10px] font-semibold text-accent-custom uppercase tracking-wider bg-accent-light px-1.5 py-0.5 rounded-badge">
                Day {lesson.day}
              </span>
              <span className="flex items-center gap-1 text-[11px] text-text-secondary">
                <Clock className="h-3 w-3" />
                {lesson.duration} mins
              </span>
            </div>
            <h4
              className={`text-sm font-medium transition-colors ${
                isCompleted ? "text-text-secondary line-through" : "text-text-primary"
              }`}
            >
              {lesson.title}
            </h4>
            <p className="text-xs text-text-secondary mt-1 leading-relaxed max-w-2xl">
              {lesson.description}
            </p>

            {/* Resources and Video Toggle */}
            <div className="flex flex-wrap items-center gap-x-4 gap-y-2 mt-3">
              {lesson.youtubeId && (
                <button
                  onClick={() => setShowVideo(!showVideo)}
                  className="inline-flex items-center gap-1 text-xs text-accent-custom hover:underline transition-all font-semibold cursor-pointer"
                >
                  <Play className="h-3 w-3 fill-accent-custom" />
                  {showVideo ? "Hide Lecture" : "Watch Lecture"}
                  {showVideo ? <ChevronUp className="h-3 w-3" /> : <ChevronDown className="h-3 w-3" />}
                </button>
              )}

              {lesson.resources.length > 0 && (
                <div className="flex flex-wrap items-center gap-2">
                  <span className="text-[10px] font-semibold text-text-secondary uppercase tracking-wider mr-1">
                    Docs:
                  </span>
                  {lesson.resources.map((resource, idx) => (
                    <a
                      key={idx}
                      href={resource.url}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex items-center gap-1 text-xs text-text-secondary hover:text-text-primary hover:underline transition-all"
                    >
                      {resource.name}
                      <ExternalLink className="h-2.5 w-2.5" />
                    </a>
                  ))}
                </div>
              )}
            </div>
          </div>
        </div>
      </div>

      {/* Embedded YouTube Player */}
      {showVideo && lesson.youtubeId && (
        <div className="mt-2 aspect-video w-full max-w-3xl rounded-card overflow-hidden border border-border-custom bg-black page-fade-in self-center sm:self-start">
          <iframe
            className="w-full h-full"
            src={`https://www.youtube.com/embed/${lesson.youtubeId}?rel=0&modestbranding=1`}
            title={lesson.title}
            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
            allowFullScreen
          />
        </div>
      )}
    </div>
  );
}
