"use client";

interface ProgressBarProps {
  completed: number;
  total: number;
  label?: string;
  showText?: boolean;
}

export default function ProgressBar({
  completed,
  total,
  label,
  showText = true
}: ProgressBarProps) {
  const percentage = total === 0 ? 0 : Math.min(Math.round((completed / total) * 100), 100);

  return (
    <div className="w-full">
      {showText && (
        <div className="flex justify-between items-center mb-1 text-xs font-medium">
          <span className="text-text-secondary">{label || "Completion Progress"}</span>
          <span className="text-accent-custom select-none">
            {completed}/{total} lessons ({percentage}%)
          </span>
        </div>
      )}
      <div className="w-full bg-border-custom/50 rounded-full h-1.5 overflow-hidden">
        <div
          className="bg-accent-custom h-1.5 rounded-full transition-all duration-300 ease-out"
          style={{ width: `${percentage}%` }}
        />
      </div>
    </div>
  );
}
