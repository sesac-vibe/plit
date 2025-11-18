'use client';

interface ProgressBarProps {
  current: number;
  progress: number;
  totalSegments: number;
}

export function ProgressBar({ current, progress, totalSegments }: ProgressBarProps) {
  return (
    <div className="pt-6 px-16">
      <div className="flex gap-1">
        {Array.from({ length: totalSegments }).map((_, index) => (
          <div key={index} className="flex-1 h-0.5 bg-gray-200 rounded-full overflow-hidden relative">
            <div
              className="h-full rounded-full bg-blue-400 transition-all duration-100 ease-linear absolute inset-0"
              style={{
                width: index < current ? '100%' : index === current ? `${progress}%` : '0%',
              }}
            />
          </div>
        ))}
      </div>
    </div>
  );
}
