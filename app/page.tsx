"use client";

import Link from "next/link";
import Navbar from "@/components/Navbar";
import Timeline from "@/components/Timeline";
import { useApp } from "@/context/AppContext";
import { ArrowRight, Code, Server, Settings, Calendar, ShieldCheck, Star } from "lucide-react";

export default function Home() {
  const { user } = useApp();

  return (
    <div className="flex flex-col min-h-screen bg-bg-base">
      <Navbar />

      <main className="flex-grow">
        {/* Hero Section */}
        <section className="mx-auto max-w-7xl px-4 pt-20 pb-16 sm:px-6 lg:px-8 text-center sm:text-left">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
            <div className="lg:col-span-7 space-y-6">
              <span className="inline-flex items-center gap-1.5 rounded bg-accent-light px-3 py-1 text-xs font-semibold uppercase tracking-wider text-accent-custom border border-accent-custom/25">
                <Calendar className="h-3.5 w-3.5" />
                Next cohort begins July 1, 2026
              </span>
              <h1 className="font-display text-4xl sm:text-5xl lg:text-6xl tracking-tight text-text-primary leading-[1.1]">
                A rigorous path to engineering excellence
              </h1>
              <p className="text-base sm:text-lg text-text-secondary max-w-2xl leading-relaxed">
                An intensive, structured 4-week full stack bootcamp derived from the roadmap.sh curriculum. 
                Build production-grade frontend structures, secure backend APIs, deploy architectures, and automate infrastructure.
              </p>
              <div className="flex flex-col sm:flex-row gap-3 pt-2 justify-center sm:justify-start">
                <Link
                  href={user ? "/dashboard" : "/register"}
                  className="inline-flex items-center justify-center rounded bg-accent-custom px-6 py-3 text-sm font-semibold text-surface hover:bg-accent-custom/90 transition-colors shadow-sm gap-2"
                >
                  {user ? "Go to Dashboard" : "Apply Now"}
                  <ArrowRight className="h-4 w-4" />
                </Link>
                <Link
                  href="#curriculum-timeline"
                  className="inline-flex items-center justify-center rounded border border-border-custom bg-surface px-6 py-3 text-sm font-semibold text-text-primary hover:bg-bg-base transition-colors"
                >
                  View Curriculum
                </Link>
              </div>
            </div>
            
            {/* Minimal Stat cards / Graphic */}
            <div className="lg:col-span-5 border border-border-custom bg-surface rounded-card p-6 shadow-sm">
              <h3 className="font-display text-lg text-text-primary border-b border-border-custom/60 pb-3 mb-4">
                Program Deliverables
              </h3>
              <ul className="space-y-4 text-sm text-text-secondary">
                <li className="flex items-start gap-3">
                  <ShieldCheck className="h-5 w-5 text-accent-custom shrink-0 mt-0.5" />
                  <div>
                    <strong className="text-text-primary font-medium block">Structured Timeline</strong>
                    4 intensive modules, 23 granular lessons, and 10 milestone checkpoints.
                  </div>
                </li>
                <li className="flex items-start gap-3">
                  <ShieldCheck className="h-5 w-5 text-accent-custom shrink-0 mt-0.5" />
                  <div>
                    <strong className="text-text-primary font-medium block">Practical Milestones</strong>
                    Hands-on project checkpoints enforcing clean, tested system integrations.
                  </div>
                </li>
                <li className="flex items-start gap-3">
                  <ShieldCheck className="h-5 w-5 text-accent-custom shrink-0 mt-0.5" />
                  <div>
                    <strong className="text-text-primary font-medium block">Verification & Certificate</strong>
                    Verify completed checkpoints to export your personal completion certificate.
                  </div>
                </li>
              </ul>
            </div>
          </div>
        </section>

        {/* What You'll Learn Section */}
        <section className="bg-surface border-y border-border-custom py-16 sm:py-24">
          <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
            <div className="text-center max-w-3xl mx-auto mb-16">
              <h2 className="font-display text-3xl text-text-primary tracking-tight">
                Curriculum Core Tracks
              </h2>
              <p className="text-sm sm:text-base text-text-secondary mt-3 leading-relaxed">
                Our syllabus follows the roadmap.sh standards, dividing essential full-stack capabilities into three core professional competencies.
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              {/* Frontend Card */}
              <div className="rounded-card border border-border-custom bg-bg-base/40 p-6 flex flex-col justify-between">
                <div>
                  <div className="h-10 w-10 rounded bg-accent-light flex items-center justify-center text-accent-custom mb-5">
                    <Code className="h-5 w-5" />
                  </div>
                  <h3 className="font-display text-lg text-text-primary mb-3">
                    01. Frontend Foundations
                  </h3>
                  <p className="text-xs sm:text-sm text-text-secondary leading-relaxed">
                    Build accessible, semantic markup structures, style responsive screen layouts using modern CSS grids, and design dynamic, stateful SPA interfaces in React and Tailwind.
                  </p>
                </div>
                <div className="mt-6 border-t border-border-custom/50 pt-4">
                  <span className="text-[10px] font-semibold text-accent-custom uppercase tracking-wider block">
                    Key Topics
                  </span>
                  <p className="text-xs text-text-secondary mt-1.5">
                    HTML5, Responsive CSS, ES6 JavaScript, npm, Git/GitHub, React Components, Tailwind CSS.
                  </p>
                </div>
              </div>

              {/* Backend Card */}
              <div className="rounded-card border border-border-custom bg-bg-base/40 p-6 flex flex-col justify-between">
                <div>
                  <div className="h-10 w-10 rounded bg-accent-light flex items-center justify-center text-accent-custom mb-5">
                    <Server className="h-5 w-5" />
                  </div>
                  <h3 className="font-display text-lg text-text-primary mb-3">
                    02. Backend Basics
                  </h3>
                  <p className="text-xs sm:text-sm text-text-secondary leading-relaxed">
                    Construct structured JSON-based API architectures. Implement secure JWT authentication filters, set up cache layers, query relational databases, and write bash automations.
                  </p>
                </div>
                <div className="mt-6 border-t border-border-custom/50 pt-4">
                  <span className="text-[10px] font-semibold text-accent-custom uppercase tracking-wider block">
                    Key Topics
                  </span>
                  <p className="text-xs text-text-secondary mt-1.5">
                    Node.js, Express APIs, JWT Sessions, Redis Cache, PostgreSQL SQL, Linux/Bash Scripting.
                  </p>
                </div>
              </div>

              {/* DevOps Card */}
              <div className="rounded-card border border-border-custom bg-bg-base/40 p-6 flex flex-col justify-between">
                <div>
                  <div className="h-10 w-10 rounded bg-accent-light flex items-center justify-center text-accent-custom mb-5">
                    <Settings className="h-5 w-5" />
                  </div>
                  <h3 className="font-display text-lg text-text-primary mb-3">
                    03. DevOps & Infrastructure
                  </h3>
                  <p className="text-xs sm:text-sm text-text-secondary leading-relaxed">
                    Provision servers on AWS, deploy domain routes, create automated pipeline actions, monitor systems, and write declarative code to manage your infrastructure assets.
                  </p>
                </div>
                <div className="mt-6 border-t border-border-custom/50 pt-4">
                  <span className="text-[10px] font-semibold text-accent-custom uppercase tracking-wider block">
                    Key Topics
                  </span>
                  <p className="text-xs text-text-secondary mt-1.5">
                    AWS (EC2, VPC, S3), GitHub Actions CI/CD, Monit monitoring, Ansible, Terraform IaC.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Timeline Strip Section */}
        <section id="curriculum-timeline" className="mx-auto max-w-7xl px-4 py-16 sm:py-24 sm:px-6 lg:px-8">
          <div className="text-center max-w-3xl mx-auto mb-16">
            <h2 className="font-display text-3xl text-text-primary tracking-tight">
              A Four-Week Curriculum Timeline
            </h2>
            <p className="text-sm sm:text-base text-text-secondary mt-3 leading-relaxed">
              Step through our structured progression. Complete daily lessons to unlock project checkpoints.
            </p>
          </div>

          <div className="border border-border-custom bg-surface rounded-card p-6 sm:p-10 shadow-sm">
            <Timeline />
          </div>
        </section>

        {/* Instructors Section */}
        <section className="bg-surface border-t border-border-custom py-16 sm:py-24">
          <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
            <div className="text-center max-w-3xl mx-auto mb-16">
              <h2 className="font-display text-3xl text-text-primary tracking-tight">
                Academic Framework
              </h2>
              <p className="text-sm sm:text-base text-text-secondary mt-3 leading-relaxed">
                Guided by experienced engineers and curriculum designers committed to teaching production standards.
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-4xl mx-auto">
              <div className="border border-border-custom rounded-card p-6 flex flex-col justify-between">
                <div>
                  <p className="text-sm text-text-secondary italic leading-relaxed">
                    &quot;Our curriculum strips away decorative frameworks and focuses on first principles. Students learn not just how to deploy, but how to monitor, scale, and automate securely.&quot;
                  </p>
                </div>
                <div className="flex items-center gap-3.5 mt-6 border-t border-border-custom/50 pt-4">
                  <div className="h-10 w-10 rounded-full bg-accent-custom/20 text-accent-custom flex items-center justify-center font-bold text-sm">
                    MK
                  </div>
                  <div>
                    <h4 className="text-sm font-medium text-text-primary">Marcus Kaelen</h4>
                    <span className="text-xs text-text-secondary">Director of Curriculum, Former Staff Engineer</span>
                  </div>
                </div>
              </div>

              <div className="border border-border-custom rounded-card p-6 flex flex-col justify-between">
                <div>
                  <p className="text-sm text-text-secondary italic leading-relaxed">
                    &quot;The transition from frontend structures directly to CI/CD actions and infrastructure provisioning is designed to emulate the daily lifecycle of senior full-stack consultants.&quot;
                  </p>
                </div>
                <div className="flex items-center gap-3.5 mt-6 border-t border-border-custom/50 pt-4">
                  <div className="h-10 w-10 rounded-full bg-accent-custom/20 text-accent-custom flex items-center justify-center font-bold text-sm">
                    EL
                  </div>
                  <div>
                    <h4 className="text-sm font-medium text-text-primary">Elena Rostova</h4>
                    <span className="text-xs text-text-secondary">Infrastructure Coordinator, DevOps Specialist</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>
      </main>

      {/* Footer */}
      <footer className="bg-bg-base border-t border-border-custom py-12">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col sm:flex-row justify-between items-center gap-6">
            <div className="font-display text-lg text-text-primary">
              Full Stack Bootcamp
            </div>
            <div className="flex gap-6 text-xs text-text-secondary">
              <Link href="/login" className="hover:text-text-primary transition-colors">Sign In</Link>
              <Link href="/register" className="hover:text-text-primary transition-colors">Register</Link>
              <a href="https://roadmap.sh" target="_blank" rel="noopener noreferrer" className="hover:text-text-primary transition-colors">roadmap.sh</a>
            </div>
            <div className="text-[11px] text-text-secondary select-none">
              &copy; 2026 Full Stack Bootcamp. All rights reserved.
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
}
