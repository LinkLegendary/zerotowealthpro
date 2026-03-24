'use client';

import { useState, ReactNode, useEffect, useRef } from 'react';
import Link from 'next/link';

const sizes = [
  { label: 'S', fontSize: '0.9rem', lineHeight: '1.6' },
  { label: 'M', fontSize: '1.05rem', lineHeight: '1.75' },
  { label: 'L', fontSize: '1.2rem', lineHeight: '1.85' },
  { label: 'XL', fontSize: '1.4rem', lineHeight: '2.0' },
];

export default function FontSizeWrapper({
  children,
  title,
  date,
  description,
  plainText,
  readingTime,
   onThemeChange, // 👈 add this
}: {
  children: ReactNode;
  title: string;
  date?: string;
  description?: string;
  plainText?: string;
  readingTime?: number;
  onThemeChange?: (isDark: boolean) => void; // 👈 add this
}) {
  const [sizeIndex, setSizeIndex] = useState(1);
  const [isDark, setIsDark] = useState(false);

  // ── Audio states ──
  const [audioState, setAudioState] = useState<'idle' | 'playing' | 'paused'>(
    'idle'
  );
  const [progress, setProgress] = useState(0);
  const [currentSpeed, setCurrentSpeed] = useState(1);
  const utteranceRef = useRef<SpeechSynthesisUtterance | null>(null);
  const intervalRef = useRef<NodeJS.Timeout | null>(null);
  const wordsRef = useRef<string[]>([]);
  const wordIndexRef = useRef(0);

  const currentSize = sizes[sizeIndex];

  const toggleDark = () => {
  const next = !isDark;
  setIsDark(next);
  onThemeChange?.(next); // 👈 add this
};


  // ── Cleanup on unmount ──
  useEffect(() => {
    return () => {
      window.speechSynthesis.cancel();
      if (intervalRef.current) clearInterval(intervalRef.current);
    };
  }, []);

  // ── Get best available voice ──
  const getBestVoice = () => {
    const voices = window.speechSynthesis.getVoices();
    return (
      voices.find(
        (v) =>
          v.name.includes('Samantha') ||
          v.name.includes('Karen') ||
          v.name.includes('Daniel') ||
          v.name.includes('Google US English') ||
          v.name.includes('Microsoft Aria')
      ) || null
    );
  };

  // ── Start speaking ──
  const startSpeaking = (rate: number, fromWordIndex = 0) => {
    window.speechSynthesis.cancel();
    if (intervalRef.current) clearInterval(intervalRef.current);

    const fullText = `${title}. ${plainText || ''}`;
    wordsRef.current = fullText.trim().split(/\s+/);
    wordIndexRef.current = fromWordIndex;

    const utterance = new SpeechSynthesisUtterance(fullText);
    utterance.rate = rate;
    utterance.pitch = 1;
    utterance.lang = 'en-US';

    const voice = getBestVoice();
    if (voice) utterance.voice = voice;

    utterance.onboundary = (e) => {
      if (e.name === 'word') {
        wordIndexRef.current++;
        const pct = (wordIndexRef.current / wordsRef.current.length) * 100;
        setProgress(Math.min(pct, 100));
      }
    };

    utterance.onend = () => {
      setAudioState('idle');
      setProgress(100);
      if (intervalRef.current) clearInterval(intervalRef.current);
    };

    utterance.onerror = () => {
      setAudioState('idle');
      if (intervalRef.current) clearInterval(intervalRef.current);
    };

    utteranceRef.current = utterance;
    window.speechSynthesis.speak(utterance);
    setAudioState('playing');
  };

  // ── Play ──
  const handlePlay = () => {
    if (audioState === 'paused') {
      window.speechSynthesis.resume();
      setAudioState('playing');
      return;
    }
    setProgress(0);
    wordIndexRef.current = 0;
    startSpeaking(currentSpeed);
  };

  // ── Pause ──
  const handlePause = () => {
    window.speechSynthesis.pause();
    setAudioState('paused');
  };

  // ── Stop ──
  const handleStop = () => {
    window.speechSynthesis.cancel();
    setAudioState('idle');
    setProgress(0);
    wordIndexRef.current = 0;
    if (intervalRef.current) clearInterval(intervalRef.current);
  };

  // ── Restart ──
  const handleRestart = () => {
    handleStop();
    setTimeout(() => startSpeaking(currentSpeed), 100);
  };

  // ── Speed — applies immediately ──
  const handleSpeed = (s: number) => {
    setCurrentSpeed(s);
    if (audioState === 'playing') {
      const fromWord = wordIndexRef.current;
      startSpeaking(s, fromWord);
    }
  };

  return (
    <div
      className={`min-h-screen transition-colors duration-300 ${
        isDark ? 'bg-[#0f0f1a]' : 'bg-gray-50'
      }`}
    >
      {/* ── TOP BANNER ── */}
      <div className="relative w-full overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-br from-[#1F4E78] via-[#2d6a9f] to-[#4472C4]" />
        <div className="absolute -top-10 -right-10 w-60 h-60 bg-white/5 rounded-full blur-2xl" />
        <div className="absolute -bottom-10 -left-10 w-80 h-80 bg-[#4472C4]/20 rounded-full blur-3xl" />

        <div className="relative z-10 max-w-3xl mx-auto px-6 py-10">
          {/* Breadcrumb */}
          <div className="flex items-center gap-2 text-blue-200 text-sm mb-6">
            <Link href="/" className="hover:text-white transition-colors">
              Home
            </Link>
            <span>›</span>
            <Link href="/blog" className="hover:text-white transition-colors">
              Articles
            </Link>
            <span>›</span>
            <span className="text-white/70 truncate max-w-[200px]">
              {title}
            </span>
          </div>

          {/* Title */}
          <h1 className="text-3xl md:text-4xl font-bold text-white leading-tight mb-4 drop-shadow-md">
            {title}
          </h1>

          {/* Description */}
          {description && (
            <p className="text-blue-100 text-lg leading-relaxed mb-6 max-w-2xl">
              {description}
            </p>
          )}

          {/* Meta badges */}
          <div className="flex flex-wrap items-center gap-3 mb-6">
            {date && (
              <span className="flex items-center gap-1.5 bg-white/10 backdrop-blur-sm text-white text-sm px-3 py-1.5 rounded-full border border-white/20">
                📅{' '}
                {new Date(date).toLocaleDateString('en-US', {
                  year: 'numeric',
                  month: 'long',
                  day: 'numeric',
                })}
              </span>
            )}



            <span className="flex items-center gap-1.5 bg-white/10 backdrop-blur-sm text-white text-sm px-3 py-1.5 rounded-full border border-white/20">
  📖 {readingTime ? `${readingTime} min read` : '9 min read'}
</span>




            <span className="flex items-center gap-1.5 bg-[#4472C4]/60 text-white text-sm px-3 py-1.5 rounded-full border border-[#4472C4]/40">
              💰 Debt Strategy
            </span>
          </div>

          {/* AUDIO PLAYER */}
        </div>

        {/* Wave */}
        <div className="relative z-10">
          <svg
            viewBox="0 0 1440 40"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
            className={isDark ? 'text-[#0f0f1a]' : 'text-gray-50'}
          >
            <path
              d="M0 40 C360 0 1080 0 1440 40 L1440 40 L0 40 Z"
              fill="currentColor"
            />
          </svg>
        </div>
      </div>

      {/* ── ARTICLE BODY ── */}
      <div className="max-w-3xl mx-auto px-6 pb-16">
        {/* Reader Controls */}
        <div
          className={`flex items-center gap-3 mb-8 sticky top-4 z-10 backdrop-blur-sm py-2 px-4 rounded-full shadow-md w-fit ml-auto ${isDark ? 'bg-[#16213e]/90 border border-gray-700' : 'bg-white/90 border border-gray-200'}`}
        >
          <span
            className={`text-sm ${isDark ? 'text-gray-400' : 'text-gray-500'}`}
          >
            Size:
          </span>
          {sizes.map((size, index) => (
            <button
              key={size.label}
              onClick={() => setSizeIndex(index)}
              className={`w-8 h-8 rounded-full text-sm font-bold border transition-all ${sizeIndex === index ? 'bg-[#4472C4] text-white border-[#4472C4] scale-110' : isDark ? 'bg-transparent text-gray-400 border-gray-600 hover:border-[#4472C4]' : 'bg-white text-gray-600 border-gray-300 hover:border-[#4472C4]'}`}
            >
              {size.label}
            </button>
          ))}
          <div
            className={`w-px h-5 ${isDark ? 'bg-gray-600' : 'bg-gray-300'}`}
          />
          <button
            onClick={toggleDark}
            className={`flex items-center gap-2 px-3 py-1 rounded-full text-sm font-medium border transition-all ${isDark ? 'bg-[#4472C4] text-white border-[#4472C4]' : 'bg-gray-100 text-gray-600 border-gray-300 hover:border-[#4472C4]'}`}
          >
            {isDark ? '☀️ Day' : '🌙 Night'}
          </button>
        </div>

        {/* MDX Content */}
        <div
          style={
            {
              '--content-size': currentSize.fontSize,
              '--content-line-height': currentSize.lineHeight,
            } as React.CSSProperties
          }
          className={`content-wrapper ${isDark ? 'dark-mode' : ''}`}
        >
          
          
          
          {/* 🔥 THIS FIXES DARK MODE TEXT */}
        <div className="text-gray-800 dark:text-gray-200">
          {children}
        </div>
          
          
          
          
          
        </div>
      </div>
    </div>
  );
}
