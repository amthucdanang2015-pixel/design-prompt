'use client';

import { useState, useEffect } from 'react';
import { PromptItem } from '@/types';
import { prompts } from '@/data/prompts';
import Sidebar from '@/components/Sidebar';
import PreviewBrowser from '@/components/PreviewBrowser';
import { useLocalStorage } from '@/hooks/useLocalStorage';

export default function Home() {
  const [selectedId, setSelectedId] = useLocalStorage<string>('selected-prompt-id', prompts[0].id);
  const [animating, setAnimating] = useState(false);
  const [displayedItem, setDisplayedItem] = useState<PromptItem>(prompts[0]);

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

  return (
    <div className="flex h-screen w-screen overflow-hidden bg-[#080812]">
      {/* Left sidebar */}
      <Sidebar items={prompts} selectedId={selectedId} onSelect={setSelectedId} />

      {/* Right preview panel */}
      <main className="flex-1 flex flex-col min-w-0 h-full overflow-hidden">
        {/* Header bar */}
        <div className="flex-shrink-0 flex items-center justify-between px-6 py-3 border-b border-white/5 bg-[#0B0B18]">
          <div className="flex items-center gap-3 md:ml-0 ml-12">
            <div className="hidden sm:flex items-center gap-2 text-xs text-slate-500">
              <span>Preview</span>
              <span className="text-slate-700">/</span>
              <span
                className="font-semibold"
                style={{ color: displayedItem.colors.primary }}
              >
                {displayedItem.title}
              </span>
            </div>
          </div>
          <div className="flex items-center gap-2">
            {/* Mode badge */}
            <span
              className={`text-[10px] px-2 py-0.5 rounded-full font-medium ${
                displayedItem.mode === 'dark'
                  ? 'bg-violet-400/15 text-violet-300'
                  : 'bg-amber-400/15 text-amber-300'
              }`}
            >
              {displayedItem.mode === 'dark' ? '🌙 Dark' : '☀️ Light'}
            </span>
            <span className="text-[10px] px-2 py-0.5 rounded-full font-medium bg-white/5 text-slate-400 capitalize">
              {displayedItem.type}
            </span>
            <span className="text-[10px] font-mono text-slate-600">
              #{String(displayedItem.index).padStart(2, '0')}
            </span>
          </div>
        </div>

        {/* Preview area */}
        <div className="flex-1 p-4 sm:p-6 overflow-hidden">
          <div
            className={`h-full transition-all duration-200 ease-out ${
              animating ? 'opacity-0 scale-[0.99] translate-y-1' : 'opacity-100 scale-100 translate-y-0'
            }`}
          >
            <PreviewBrowser item={displayedItem} />
          </div>
        </div>
      </main>
    </div>
  );
}
