'use client';

import { useState, useEffect } from 'react';
import { PromptItem } from '@/types';
import { prompts } from '@/data/prompts';
import Sidebar from '@/components/Sidebar';
import PreviewBrowser from '@/components/PreviewBrowser';
import PromptModal from '@/components/PromptModal';
import { useLocalStorage } from '@/hooks/useLocalStorage';

export default function Home() {
  const [selectedId, setSelectedId] = useLocalStorage<string>('selected-prompt-id', prompts[0].id);
  const [animating, setAnimating] = useState(false);
  const [displayedItem, setDisplayedItem] = useState<PromptItem>(prompts[0]);
  const [isPromptOpen, setIsPromptOpen] = useState(false);
  // Mobile master/detail: 'list' = sidebar visible, 'detail' = preview visible
  const [mobileView, setMobileView] = useState<'list' | 'detail'>('list');

  // Resolve the displayed item from selectedId
  useEffect(() => {
    const found = prompts.find((p) => p.id === selectedId);
    if (found && found.id !== displayedItem.id) {
      setAnimating(true);
      const timeout = setTimeout(() => {
        setDisplayedItem(found);
        setAnimating(false);
      }, 180);
      return () => clearTimeout(timeout);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [selectedId]);

  const handleSelect = (id: string) => {
    setSelectedId(id);
    setMobileView('detail');
  };

  const handlePrev = () => {
    const currentIndex = prompts.findIndex((p) => p.id === selectedId);
    const prevIndex = (currentIndex - 1 + prompts.length) % prompts.length;
    setSelectedId(prompts[prevIndex].id);
  };

  const handleNext = () => {
    const currentIndex = prompts.findIndex((p) => p.id === selectedId);
    const nextIndex = (currentIndex + 1) % prompts.length;
    setSelectedId(prompts[nextIndex].id);
  };

  return (
    <div className="flex h-screen w-screen overflow-hidden bg-[#080812]">
      {/* Left sidebar — full width on mobile when mobileView === 'list', hidden otherwise */}
      <div
        className={`
          flex-shrink-0 h-full
          ${mobileView === 'list' ? 'flex' : 'hidden'}
          w-full
          md:flex md:w-[260px] xl:w-[320px]
        `}
      >
        <Sidebar items={prompts} selectedId={selectedId} onSelect={handleSelect} />
      </div>

      {/* Right preview panel — full width on mobile when mobileView === 'detail', hidden otherwise */}
      <main
        className={`
          flex-col min-w-0 min-h-0 overflow-hidden
          ${mobileView === 'detail' ? 'flex' : 'hidden'}
          w-full
          md:flex md:flex-1
        `}
      >
        {/* Header bar */}
        <div className="flex-shrink-0 flex items-center justify-between px-4 sm:px-6 py-3 border-b border-white/5 bg-[#0B0B18]">
          <div className="flex items-center gap-3 min-w-0 flex-1 mr-4">
            {/* Mobile back button */}
            <button
              onClick={() => setMobileView('list')}
              className="md:hidden flex-shrink-0 w-8 h-8 rounded-lg border border-white/10 text-slate-400 hover:text-white hover:bg-white/5 flex items-center justify-center transition-all"
              aria-label="Back to list"
            >
              <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                <path strokeLinecap="round" strokeLinejoin="round" d="M15.75 19.5L8.25 12l7.5-7.5" />
              </svg>
            </button>

            {/* Thumbnail */}
            <div
              className="w-9 h-9 rounded-xl flex-shrink-0 flex items-center justify-center shadow-lg"
              style={{
                background: `linear-gradient(135deg, ${displayedItem.colors.primary}, ${displayedItem.colors.secondary})`,
                border: `2px solid ${displayedItem.colors.accent}44`
              }}
            >
              <span className="text-white text-xs font-bold font-mono">
                {displayedItem.title[0]}
              </span>
            </div>
            {/* Text details */}
            <div className="min-w-0 flex-1">
              <div className="flex items-center gap-2 flex-wrap">
                <h2 className="text-sm font-semibold text-white truncate max-w-[120px] sm:max-w-none">
                  {displayedItem.title}
                </h2>
                {/* Badges */}
                <span
                  className={`text-[9px] px-1.5 py-0.5 rounded-md font-medium ${displayedItem.mode === 'dark'
                    ? 'bg-violet-400/15 text-violet-300'
                    : 'bg-amber-400/15 text-amber-300'
                    }`}
                >
                  {displayedItem.mode === 'dark' ? '🌙 Dark' : '☀️ Light'}
                </span>
                <span className="text-[9px] px-1.5 py-0.5 rounded-md font-medium bg-white/5 text-slate-400 capitalize">
                  {displayedItem.type}
                </span>
                <span className="text-[9px] font-mono text-slate-600 hidden sm:inline">
                  #{String(displayedItem.index).padStart(2, '0')}
                </span>
              </div>
              <p className="text-[10px] text-slate-400 truncate mt-0.5 hidden md:block">
                {displayedItem.description}
              </p>
            </div>
          </div>

          {/* Right Header Buttons */}
          <div className="flex items-center gap-2 flex-shrink-0">
            {/* Navigation buttons */}
            <button
              onClick={handlePrev}
              className="w-8 h-8 rounded-lg border border-white/10 text-slate-400 hover:text-white hover:bg-white/5 flex items-center justify-center transition-all cursor-pointer"
              title="Previous Style"
            >
              <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                <path strokeLinecap="round" strokeLinejoin="round" d="M15.75 19.5L8.25 12l7.5-7.5" />
              </svg>
            </button>
            <button
              onClick={handleNext}
              className="w-8 h-8 rounded-lg border border-white/10 text-slate-400 hover:text-white hover:bg-white/5 flex items-center justify-center transition-all cursor-pointer"
              title="Next Style"
            >
              <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                <path strokeLinecap="round" strokeLinejoin="round" d="M8.25 4.5l7.5 7.5-7.5 7.5" />
              </svg>
            </button>

            {/* Divider */}
            <div className="mx-1 h-5 w-px bg-white/10 hidden sm:block" />

            {/* Get Prompt button */}
            <button
              onClick={() => setIsPromptOpen(true)}
              className="flex items-center gap-1.5 rounded-lg border border-white/10 bg-white/5 px-3 py-1.5 font-medium text-xs text-slate-300 hover:bg-white/10 hover:text-white transition-all cursor-pointer"
            >
              <svg className="w-3.5 h-3.5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                <path strokeLinecap="round" strokeLinejoin="round" d="M19.5 14.25v-2.625a3.375 3.375 0 00-3.375-3.375h-1.5A1.125 1.125 0 0113.5 7.125v-1.5a3.375 3.375 0 00-3.375-3.375H8.25m0 12.75h7.5m-7.5 3H12M10.5 2.25H5.625c-.621 0-1.125.504-1.125 1.125v17.25c0 .621.504 1.125 1.125 1.125h12.75c.621 0 1.125-.504 1.125-1.125V11.25a9 9 0 00-9-9z" />
              </svg>
              <span className="hidden sm:inline">Get Prompt</span>
            </button>

            {/* Open button */}
            <a
              href={`/${displayedItem.id}`}
              target="_self"
              rel="noopener noreferrer"
              className="flex items-center gap-1.5 rounded-lg px-3 py-1.5 font-medium text-xs transition-all hover:scale-[1.05] shadow-lg"
              style={{
                background: `linear-gradient(135deg, ${displayedItem.colors.primary}, ${displayedItem.colors.secondary})`,
                color: '#FFFFFF',
                boxShadow: `0 4px 12px ${displayedItem.colors.primary}44`
              }}
            >
              <span>Open</span>
              <svg className="w-3 h-3" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                <path strokeLinecap="round" strokeLinejoin="round" d="M13 7h5m0 0v5m0-5L10 17" />
              </svg>
            </a>
          </div>
        </div>

        {/* Preview area */}
        <div className="flex-1 p-4 sm:p-6 overflow-hidden">
          <div
            className={`h-full transition-all duration-200 ease-out ${animating ? 'opacity-0 scale-[0.99] translate-y-1' : 'opacity-100 scale-100 translate-y-0'
              }`}
          >
            <PreviewBrowser item={displayedItem} />
          </div>
        </div>
      </main>

      {/* Prompt Preview & Copy Modal */}
      <PromptModal
        isOpen={isPromptOpen}
        onClose={() => setIsPromptOpen(false)}
        item={displayedItem}
      />
    </div>
  );
}
