"use client";

import { Lock, Unlock, CheckCircle2 } from "lucide-react";

interface CheckpointBadgeProps {
  unlocked: boolean;
  completed: boolean;
  label?: string;
}

export default function CheckpointBadge({
  unlocked,
  completed,
  label = "Checkpoint"
}: CheckpointBadgeProps) {
  if (completed) {
    return (
      <span className="inline-flex items-center gap-1 rounded bg-success-custom/10 px-2 py-0.5 text-[10px] font-semibold tracking-wider uppercase text-success-custom border border-success-custom/20">
        <CheckCircle2 className="h-3 w-3" />
        {label} Complete
      </span>
    );
  }

  if (unlocked) {
    return (
      <span className="inline-flex items-center gap-1 rounded bg-accent-light px-2 py-0.5 text-[10px] font-semibold tracking-wider uppercase text-accent-custom border border-accent-custom/20">
        <Unlock className="h-3 w-3" />
        {label} Unlocked
      </span>
    );
  }

  return (
    <span className="inline-flex items-center gap-1 rounded bg-border-custom/30 px-2 py-0.5 text-[10px] font-semibold tracking-wider uppercase text-text-secondary border border-border-custom">
      <Lock className="h-3 w-3" />
      {label} Locked
    </span>
  );
}
