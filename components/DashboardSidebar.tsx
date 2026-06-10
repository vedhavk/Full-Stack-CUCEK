"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useApp } from "@/context/AppContext";
import { curriculumData } from "@/lib/curriculumData";
import { BookOpen, BarChart2, CheckCircle2, ChevronRight, Menu, X } from "lucide-react";
import { useState } from "react";

export default function DashboardSidebar() {
  const pathname = usePathname();
  const { getWeekProgress } = useApp();
  const [isOpen, setIsOpen] = useState(false);

  const isActive = (weekId: number) => {
    return pathname === `/week/${weekId}`;
  };

  return (
    <>
      {/* Mobile Toggle Button */}
      <div className="md:hidden flex items-center justify-between border-b border-border-custom bg-surface px-4 py-3 sticky top-16 z-40">
        <span className="text-xs font-semibold text-text-secondary uppercase tracking-wider">
          Course Navigation
        </span>
        <button
          onClick={() => setIsOpen(!isOpen)}
          className="flex items-center gap-1.5 text-xs font-medium text-accent-custom bg-accent-light px-2.5 py-1 rounded cursor-pointer"
        >
          {isOpen ? <X className="h-4 w-4" /> : <Menu className="h-4 w-4" />}
          Menu
        </button>
      </div>

      {/* Sidebar Container */}
      <aside
        className={`fixed md:sticky top-16 md:top-24 z-30 w-64 md:w-60 shrink-0 border-r border-border-custom bg-surface md:bg-transparent transition-all duration-300 ease-in-out h-[calc(100vh-4rem)] md:h-auto overflow-y-auto ${
          isOpen ? "left-0 shadow-lg" : "-left-64 md:left-0"
        }`}
      >
        <div className="p-4 md:p-0 md:pr-4 space-y-6">
          {/* Main Links */}
          <div className="space-y-1">
            <Link
              href="/dashboard"
              className={`flex items-center justify-between px-3 py-2 text-xs font-medium rounded transition-colors ${
                pathname === "/dashboard"
                  ? "bg-accent-custom text-surface"
                  : "text-text-secondary hover:bg-border-custom/30 hover:text-text-primary"
              }`}
            >
              <span>Dashboard Overview</span>
            </Link>
            <Link
              href="/curriculum"
              className={`flex items-center justify-between px-3 py-2 text-xs font-medium rounded transition-colors ${
                pathname === "/curriculum"
                  ? "bg-accent-custom text-surface"
                  : "text-text-secondary hover:bg-border-custom/30 hover:text-text-primary"
              }`}
            >
              <span className="flex items-center gap-2">
                <BookOpen className="h-3.5 w-3.5" />
                Full Roadmap View
              </span>
            </Link>
            <Link
              href="/progress"
              className={`flex items-center justify-between px-3 py-2 text-xs font-medium rounded transition-colors ${
                pathname === "/progress"
                  ? "bg-accent-custom text-surface"
                  : "text-text-secondary hover:bg-border-custom/30 hover:text-text-primary"
              }`}
            >
              <span className="flex items-center gap-2">
                <BarChart2 className="h-3.5 w-3.5" />
                Progress & Certificate
              </span>
            </Link>
          </div>

          {/* Week By Week Modules */}
          <div>
            <h3 className="text-[10px] font-semibold text-text-secondary tracking-widest uppercase mb-3 px-3">
              Weekly Modules
            </h3>
            <ul className="space-y-1">
              {curriculumData.map((week) => {
                const active = isActive(week.id);
                const progress = getWeekProgress(week.id);

                return (
                  <li key={week.id}>
                    <Link
                      href={`/week/${week.id}`}
                      onClick={() => setIsOpen(false)}
                      className={`flex flex-col px-3 py-2.5 rounded transition-all border ${
                        active
                          ? "bg-surface border-accent-custom/40 shadow-sm"
                          : "border-transparent text-text-secondary hover:bg-surface hover:border-border-custom hover:text-text-primary"
                      }`}
                    >
                      <div className="flex justify-between items-center w-full">
                        <span className={`text-[10px] font-semibold tracking-wider ${active ? "text-accent-custom" : "text-text-secondary"}`}>
                          WEEK {week.id}
                        </span>
                        {progress === 100 && (
                          <CheckCircle2 className="h-3 w-3 text-success-custom" />
                        )}
                      </div>
                      <span className="text-xs font-medium text-text-primary mt-1 line-clamp-1">
                        {week.title}
                      </span>
                      {/* Mini progress line */}
                      <div className="w-full bg-border-custom/40 rounded-full h-1 mt-2 overflow-hidden">
                        <div
                          className="bg-accent-custom h-1 rounded-full transition-all"
                          style={{ width: `${progress}%` }}
                        />
                      </div>
                    </Link>
                  </li>
                );
              })}
            </ul>
          </div>
        </div>
      </aside>
    </>
  );
}
