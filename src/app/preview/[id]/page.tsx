'use client';

import { useState, useEffect, useCallback } from 'react';
import Link from 'next/link';
import { useParams, useRouter } from 'next/navigation';
import { prompts } from '@/data/prompts';
import LandingPreview from '@/components/LandingPreview';
import PromptModal from '@/components/PromptModal';

export default function PreviewPage() {
  const { id } = useParams() as { id: string };
  const router = useRouter();

  const initialIndex = prompts.findIndex((p) => p.id === id);
  const [currentIndex, setCurrentIndex] = useState(initialIndex >= 0 ? initialIndex : 0);
  const [isPromptOpen, setIsPromptOpen] = useState(false);
  const [showStylePicker, setShowStylePicker] = useState(false);
  const [animating, setAnimating] = useState(false);
  const [fadeIn, setFadeIn] = useState(true);

  const item = prompts[currentIndex];

  // Sync URL when currentIndex changes
  useEffect(() => {
    if (item) {
      router.replace(`/preview/${item.id}`, { scroll: false });
    }
  }, [item, router]);

  // Animate transition
  const goToIndex = useCallback((newIndex: number) => {
    if (newIndex === currentIndex) return;
    setAnimating(true);
    setFadeIn(false);
    setTimeout(() => {
      setCurrentIndex(newIndex);
      setFadeIn(true);
      setAnimating(false);
    }, 200);
  }, [currentIndex]);

  const handlePrev = useCallback(() => {
    goToIndex((currentIndex - 1 + prompts.length) % prompts.length);
  }, [currentIndex, goToIndex]);

  const handleNext = useCallback(() => {
    goToIndex((currentIndex + 1) % prompts.length);
  }, [currentIndex, goToIndex]);

  // Keyboard navigation
  useEffect(() => {
    const handler = (e: KeyboardEvent) => {
      if (isPromptOpen || showStylePicker) return;
      if (e.key === 'ArrowLeft') handlePrev();
      if (e.key === 'ArrowRight') handleNext();
    };
    window.addEventListener('keydown', handler);
    return () => window.removeEventListener('keydown', handler);
  }, [handlePrev, handleNext, isPromptOpen, showStylePicker]);

  if (!item) {
    return (
      <div className="flex h-screen w-screen items-center justify-center bg-[#080812] text-white font-sans">
        <div className="text-center">
          <h1 className="text-xl font-bold mb-2">Style Not Found</h1>
          <p className="text-slate-400 text-sm">The preview ID &quot;{id}&quot; is invalid or does not exist.</p>
          <Link href="/" className="mt-4 inline-block text-violet-400 hover:underline text-sm">← Back to explorer</Link>
        </div>
      </div>
    );
  }

  return (
    <div className="relative w-screen h-screen overflow-hidden flex flex-col">
      {/* Dynamic Landing Page Preview with fade animation */}
      <div
        className="flex-1 overflow-auto transition-all duration-200"
        style={{ opacity: fadeIn && !animating ? 1 : 0, transform: fadeIn && !animating ? 'scale(1)' : 'scale(0.995)' }}
      >
        {item.url ? (
          <iframe
            src={item.url}
            title={`${item.title} static preview`}
            className="h-full w-full border-0"
            sandbox="allow-same-origin"
          />
        ) : (
          <LandingPreview item={item} />
        )}
      </div>

      {/* Style Picker Overlay */}
      {showStylePicker && (
        <>
          {/* Backdrop */}
          <div
            className="fixed inset-0 z-30 bg-black/60 backdrop-blur-sm"
            onClick={() => setShowStylePicker(false)}
          />
          {/* Picker Panel */}
          <div className="fixed bottom-24 left-1/2 -translate-x-1/2 z-40 w-[min(90vw,600px)] bg-[#111]/95 backdrop-blur-xl border border-white/10 rounded-2xl shadow-2xl p-4">
            <div className="flex items-center justify-between mb-3">
              <h3 className="text-sm font-semibold text-white">Choose Style</h3>
              <button
                onClick={() => setShowStylePicker(false)}
                className="text-white/40 hover:text-white transition-colors cursor-pointer border-none bg-transparent"
              >
                <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                  <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
                </svg>
              </button>
            </div>
            <div className="grid grid-cols-2 sm:grid-cols-3 gap-2 max-h-[50vh] overflow-y-auto pr-1">
              {prompts.map((p, idx) => (
                <button
                  key={p.id}
                  onClick={() => {
                    goToIndex(idx);
                    setShowStylePicker(false);
                  }}
                  className={`flex items-center gap-2.5 px-3 py-2.5 rounded-xl border text-left transition-all cursor-pointer text-xs font-medium ${idx === currentIndex
                    ? 'border-white/30 bg-white/10 text-white'
                    : 'border-white/[0.06] bg-white/[0.02] text-white/70 hover:bg-white/8 hover:text-white hover:border-white/15'
                    }`}
                >
                  {/* Color swatch */}
                  <div
                    className="w-5 h-5 rounded-md flex-shrink-0"
                    style={{ background: `linear-gradient(135deg, ${p.colors.primary}, ${p.colors.secondary})` }}
                  />
                  <div className="min-w-0">
                    <div className="truncate font-semibold text-[11px]">{p.title}</div>
                    <div className="text-[9px] text-white/40 truncate capitalize">{p.mode} · {p.type}</div>
                  </div>
                  {idx === currentIndex && (
                    <svg className="w-3 h-3 ml-auto flex-shrink-0 text-white/60" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5}>
                      <path strokeLinecap="round" strokeLinejoin="round" d="M4.5 12.75l6 6 9-13.5" />
                    </svg>
                  )}
                </button>
              ))}
            </div>
          </div>
        </>
      )}

      {/* Floating Bottom Nav Bar */}
      <div
        className="fixed bottom-6 left-1/2 -translate-x-1/2 z-[40] flex items-center gap-3 bg-[#121212]/90 backdrop-blur-md border border-white/10 px-4 py-2.5 rounded-2xl shadow-2xl text-sm font-sans"
        style={{
          boxShadow: `0 0 0 1px rgba(255,255,255,0.05), 0 16px 48px rgba(0,0,0,0.6)`,
        }}
      >
        {/* Back to list */}
        <button
          onClick={() => (router.replace(`/`, { scroll: false }))}
          className="flex h-9 items-center rounded-xl px-2.5 text-white/90 transition-all duration-200 hover:bg-white/[0.08] sm:h-10 sm:px-3 cursor-pointer bg-transparent"
          title="Previous style (←)"
        >
          <span className="font-bold text-[14px] tracking-tight sm:text-[15px]">
            design
            <span className="transition-colors duration-300 text-white">/</span>
            prompts
          </span>
        </button>

        {/* Divider */}
        <div className="h-4 w-px bg-white/10" />

        {/* Prev / Style indicator / Next */}
        <div className="flex items-center gap-2">
          {/* Prev */}
          <button
            onClick={handlePrev}
            className="w-7 h-7 rounded-lg border border-white/10 text-white/50 hover:text-white hover:bg-white/8 flex items-center justify-center transition-all cursor-pointer bg-transparent"
            title="Previous style (←)"
          >
            <svg className="w-3.5 h-3.5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5}>
              <path strokeLinecap="round" strokeLinejoin="round" d="M15.75 19.5L8.25 12l7.5-7.5" />
            </svg>
          </button>

          {/* Active Style */}
          <button
            onClick={() => setShowStylePicker((v) => !v)}
            className="flex items-center gap-2 px-2 py-1 rounded-lg hover:bg-white/8 transition-all cursor-pointer bg-transparent border-none"
            title="Choose style"
          >
            <span
              className="w-2.5 h-2.5 rounded-full shrink-0 animate-pulse"
              style={{ backgroundColor: item.colors.primary, boxShadow: `0 0 8px ${item.colors.primary}` }}
            />
            <span className="text-white/90 font-semibold text-xs">{item.title}</span>
            <span className="text-white/30 text-[10px] font-mono hidden sm:inline">
              {String(item.index).padStart(2, '0')}/{String(prompts.length).padStart(2, '0')}
            </span>
            <svg className="w-3 h-3 text-white/30" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
              <path strokeLinecap="round" strokeLinejoin="round" d="M19.5 8.25l-7.5 7.5-7.5-7.5" />
            </svg>
          </button>

          {/* Next */}
          <button
            onClick={handleNext}
            className="w-7 h-7 rounded-lg border border-white/10 text-white/50 hover:text-white hover:bg-white/8 flex items-center justify-center transition-all cursor-pointer bg-transparent"
            title="Next style (→)"
          >
            <svg className="w-3.5 h-3.5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5}>
              <path strokeLinecap="round" strokeLinejoin="round" d="M8.25 4.5l7.5 7.5-7.5 7.5" />
            </svg>
          </button>
        </div>

        {/* Divider */}
        <div className="h-4 w-px bg-white/10" />

        {/* Get Prompt Button */}
        <button
          onClick={() => setIsPromptOpen(true)}
          className="flex items-center gap-1.5 text-white/60 hover:text-white transition-colors cursor-pointer border border-white/10 bg-white/5 hover:bg-white/10 py-1.5 px-3 rounded-lg text-xs font-medium"
        >
          <svg className="w-3.5 h-3.5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
            <path strokeLinecap="round" strokeLinejoin="round" d="M19.5 14.25v-2.625a3.375 3.375 0 00-3.375-3.375h-1.5A1.125 1.125 0 0113.5 7.125v-1.5a3.375 3.375 0 00-3.375-3.375H8.25m0 12.75h7.5m-7.5 3H12M10.5 2.25H5.625c-.621 0-1.125.504-1.125 1.125v17.25c0 .621.504 1.125 1.125 1.125h12.75c.621 0 1.125-.504 1.125-1.125V11.25a9 9 0 00-9-9z" />
          </svg>
          <span className="hidden sm:inline">Get Prompt</span>
        </button>
      </div>

      {/* Prompt Modal */}
      <PromptModal
        isOpen={isPromptOpen}
        onClose={() => setIsPromptOpen(false)}
        item={item}
      />
    </div >
  );
}
