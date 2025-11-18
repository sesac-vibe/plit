'use client';

import { useMemo } from 'react';

interface ReadingTextProps {
  children: string[];
  progress: number;
}

const TEXT_READING_RATIO = 0.8;

export const ReadingText = ({ children, progress }: ReadingTextProps) => {
  const lineData = useMemo(() => {
    const lines = children;
    const totalLines = lines.length;
    if (totalLines === 0) return [];

    const textProgress = Math.min(progress / TEXT_READING_RATIO, 100);
    const progressPerLine = 100 / totalLines;

    return lines.map((line, index) => {
      const lineStart = index * progressPerLine;
      const lineEnd = (index + 1) * progressPerLine;

      let lineProgress = 0;
      if (textProgress >= lineEnd) {
        lineProgress = 100;
      } else if (textProgress > lineStart) {
        lineProgress = ((textProgress - lineStart) / progressPerLine) * 100;
      }

      return { text: line, lineProgress };
    });
  }, [children, progress]);

  return (
    <div className="flex flex-col gap-4 items-start">
      {lineData.map((line, index) => {
        const p = line.lineProgress;

        let gradient;
        if (p >= 100) {
          gradient = 'linear-gradient(to right, #000000 0%, #000000 100%)';
        } else if (p <= 0) {
          gradient = 'linear-gradient(to right, #9ca3af 0%, #9ca3af 100%)';
        } else {
          const blackEnd = Math.max(0, p - 10);
          const blueCenter = p;
          const blueToGrayEnd = Math.min(100, p + 5);

          gradient = `linear-gradient(to right,
            #000000 0%,
            #000000 ${blackEnd}%,
            #3b82f6 ${blueCenter}%,
            #9ca3af ${blueToGrayEnd}%,
            #9ca3af 100%)`;
        }

        return (
          <div
            key={index}
            className="text-4xl font-bold whitespace-nowrap transition-all duration-200"
            style={{
              backgroundImage: gradient,
              WebkitBackgroundClip: 'text',
              WebkitTextFillColor: 'transparent',
              backgroundClip: 'text',
            }}
          >
            {line.text}
          </div>
        );
      })}
    </div>
  );
};
