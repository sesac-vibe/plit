'use client';

import { useState, useEffect, useRef, useCallback } from 'react';
import { Howl } from 'howler';
import { Controls } from '@/components/Controls';
import { ProgressBar } from '@/components/ProgressBar';
import { slides, totalSlides } from '@/components/slides';

export default function Home() {
  const [current, setCurrent] = useState(0);
  const [progress, setProgress] = useState(0);
  const [isPlaying, setIsPlaying] = useState(true);
  const [howl, setHowl] = useState<Howl | null>(null);
  const rafIdRef = useRef<number | null>(null);
  const progressRef = useRef(0);
  const startTimeRef = useRef(0);
  const audioStartedRef = useRef(false);

  const currentSlide = slides[current];
  const CurrentSlideComponent = currentSlide.Component;

  useEffect(() => {
    progressRef.current = 0;
    audioStartedRef.current = false;
    setProgress(0);

    if (rafIdRef.current !== null) {
      cancelAnimationFrame(rafIdRef.current);
      rafIdRef.current = null;
    }

    const sound = new Howl({
      src: [currentSlide.audioFile],
      html5: true,
      onload: () => {
        console.log('Audio loaded:', currentSlide.audioFile);
      },
      onplay: () => {
        console.log('Audio playing');
        setIsPlaying(true);
        if (!audioStartedRef.current) {
          audioStartedRef.current = true;
          startTimeRef.current = Date.now();
          startAnimation(sound.duration());
        }
      },
      onpause: () => {
        console.log('Audio paused');
        setIsPlaying(false);
        if (rafIdRef.current !== null) {
          cancelAnimationFrame(rafIdRef.current);
          rafIdRef.current = null;
        }
      },
      onend: () => {
        console.log('Audio ended');
        if (rafIdRef.current !== null) {
          cancelAnimationFrame(rafIdRef.current);
          rafIdRef.current = null;
        }
        if (current < totalSlides - 1) {
          setCurrent((prev) => prev + 1);
        } else {
          setIsPlaying(false);
        }
      },
      onerror: (id, error) => {
        console.error('Audio error:', error);
      },
    });

    setHowl(sound);
    sound.play();

    return () => {
      sound.unload();
      if (rafIdRef.current !== null) {
        cancelAnimationFrame(rafIdRef.current);
        rafIdRef.current = null;
      }
    };
  }, [current]);

  const startAnimation = (duration: number) => {
    if (duration === 0) return;

    const animate = () => {
      const elapsed = Date.now() - startTimeRef.current;
      const newProgress = Math.min((elapsed / (duration * 1000)) * 100, 100);

      progressRef.current = newProgress;
      setProgress(newProgress);

      if (newProgress < 100) {
        rafIdRef.current = requestAnimationFrame(animate);
      }
    };

    rafIdRef.current = requestAnimationFrame(animate);
  };

  const handlePlayPause = useCallback(() => {
    if (!howl) return;

    if (isPlaying) {
      howl.pause();
    } else {
      startTimeRef.current = Date.now() - (progressRef.current / 100) * (howl.duration() * 1000);
      howl.play();
      startAnimation(howl.duration());
    }
  }, [howl, isPlaying]);

  const handlePrev = useCallback(() => {
    if (current > 0) {
      if (howl) {
        howl.stop();
      }
      setCurrent(current - 1);
      setProgress(0);
    }
  }, [current, howl]);

  const handleNext = useCallback(() => {
    if (current < totalSlides - 1) {
      if (howl) {
        howl.stop();
      }
      setCurrent(current + 1);
      setProgress(0);
    }
  }, [current, howl]);

  useEffect(() => {
    const handleKey = (e: KeyboardEvent) => {
      if (e.key === 'ArrowLeft') {
        handlePrev();
      } else if (e.key === 'ArrowRight') {
        handleNext();
      } else if (e.key === ' ') {
        e.preventDefault();
        handlePlayPause();
      }
    };

    window.addEventListener('keydown', handleKey);
    return () => window.removeEventListener('keydown', handleKey);
  }, [handlePrev, handleNext, handlePlayPause]);

  if (!currentSlide) {
    return null;
  }

  return (
    <div className="fixed inset-0 w-full h-full bg-white overflow-hidden">
      <ProgressBar
        current={current}
        progress={progress}
        totalSegments={totalSlides}
      />

      <div className="w-full h-full flex items-center justify-center">
        <div className="text-center">
          <CurrentSlideComponent progress={progress} />
        </div>
      </div>

      <div
        className="absolute bottom-0 left-0 right-0 h-80 pointer-events-none"
        style={{
          background: 'radial-gradient(ellipse 120% 100% at center bottom, rgba(147, 197, 253, 0.25) 0%, rgba(147, 197, 253, 0.1) 50%, transparent 80%)'
        }}
      />

      <Controls
        isPlaying={isPlaying}
        onPlayPause={handlePlayPause}
        onPrev={handlePrev}
        onNext={handleNext}
        canGoPrev={current > 0}
        canGoNext={current < totalSlides - 1}
      />
    </div>
  );
}
