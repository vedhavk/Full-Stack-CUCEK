"use client";

import { CheckCircle2, Circle } from "lucide-react";

interface TimelineStep {
  week: number;
  title: string;
  topics: string[];
}

const steps: TimelineStep[] = [
  {
    week: 1,
    title: "Frontend Foundations",
    topics: ["HTML/CSS/JS", "npm & Git", "React & Tailwind"]
  },
  {
    week: 2,
    title: "Backend Basics",
    topics: ["Node & REST APIs", "JWT Auth", "Postgres & Redis"]
  },
  {
    week: 3,
    title: "DevOps & Deployment",
    topics: ["AWS EC2/VPC/S3", "GitHub Actions", "Monit Supervision"]
  },
  {
    week: 4,
    title: "Automation & Infra",
    topics: ["Ansible Playbooks", "Terraform IaC", "Capstone Project"]
  }
];

export default function Timeline() {
  return (
    <div className="w-full py-8">
      {/* Desktop view: Horizontal timeline */}
      <div className="hidden md:grid grid-cols-4 gap-4 relative">
        {/* Horizontal Connector Line */}
        <div className="absolute top-[21px] left-[12.5%] right-[12.5%] h-0.5 bg-border-custom z-0" />

        {steps.map((step, idx) => (
          <div key={idx} className="flex flex-col items-center text-center relative z-10">
            {/* Dot node */}
            <div className="h-11 w-11 rounded-full bg-surface border-2 border-accent-custom flex items-center justify-center text-accent-custom font-semibold shadow-sm mb-4">
              {step.week}
            </div>

            {/* Labels */}
            <h4 className="font-display text-sm text-text-primary mb-1">
              {step.title}
            </h4>
            <div className="flex flex-col gap-0.5 mt-1">
              {step.topics.map((topic, tIdx) => (
                <span key={tIdx} className="text-xs text-text-secondary">
                  {topic}
                </span>
              ))}
            </div>
          </div>
        ))}
      </div>

      {/* Mobile view: Vertical timeline */}
      <div className="md:hidden flex flex-col space-y-8 relative pl-6 before:absolute before:left-[17px] before:top-2 before:bottom-2 before:w-0.5 before:bg-border-custom">
        {steps.map((step, idx) => (
          <div key={idx} className="flex flex-col relative z-10">
            {/* Dot node absolute positioned */}
            <div className="absolute -left-9 h-9 w-9 rounded-full bg-surface border-2 border-accent-custom flex items-center justify-center text-accent-custom text-xs font-semibold shadow-sm">
              {step.week}
            </div>

            {/* Labels */}
            <div>
              <span className="text-[10px] font-semibold text-accent-custom uppercase tracking-wider bg-accent-light px-2 py-0.5 rounded-badge">
                Week {step.week}
              </span>
              <h4 className="font-display text-base text-text-primary mt-1 mb-2">
                {step.title}
              </h4>
              <ul className="space-y-1">
                {step.topics.map((topic, tIdx) => (
                  <li key={tIdx} className="text-xs text-text-secondary flex items-center gap-1.5">
                    <span className="h-1 w-1 rounded-full bg-accent-custom" />
                    {topic}
                  </li>
                ))}
              </ul>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
