'use client';

import { PromptItem } from '@/types';
import LandingPreview from './LandingPreview';

interface PreviewBrowserProps {
  item: PromptItem;
}

export default function PreviewBrowser({ item }: PreviewBrowserProps) {
  const fakeUrl = `https://${item.title.toLowerCase()}.app`;

  return (
    <div className="flex flex-col h-full rounded-2xl overflow-hidden shadow-2xl ring-1 ring-black/10">
      {/* Browser chrome */}
      <div className="flex-shrink-0 bg-[#1E1E2E] px-3 py-2.5 flex items-center gap-3">
        {/* Traffic lights */}
        <div className="flex items-center gap-1.5">
          <div className="w-3 h-3 rounded-full bg-[#FF5F57] hover:brightness-110 transition-all cursor-pointer" />
          <div className="w-3 h-3 rounded-full bg-[#FFBD2E] hover:brightness-110 transition-all cursor-pointer" />
          <div className="w-3 h-3 rounded-full bg-[#28C840] hover:brightness-110 transition-all cursor-pointer" />
        </div>

        {/* Nav arrows */}
        <div className="flex items-center gap-1 text-slate-500">
          <button className="w-6 h-6 rounded flex items-center justify-center hover:bg-white/10 transition-colors text-xs">
            ‹
          </button>
          <button className="w-6 h-6 rounded flex items-center justify-center hover:bg-white/10 transition-colors text-xs">
            ›
          </button>
        </div>

        {/* URL bar */}
        <div className="flex-1 flex items-center gap-2 bg-[#0D0D1A] rounded-lg px-3 py-1.5">
          {/* Lock icon */}
          <svg className="w-3 h-3 text-emerald-400 flex-shrink-0" fill="currentColor" viewBox="0 0 16 16">
            <path d="M8 1a3 3 0 0 0-3 3v2H4a1 1 0 0 0-1 1v7a1 1 0 0 0 1 1h8a1 1 0 0 0 1-1V7a1 1 0 0 0-1-1h-1V4a3 3 0 0 0-3-3zm0 1.5A1.5 1.5 0 0 1 9.5 4v2h-3V4A1.5 1.5 0 0 1 8 2.5z"/>
          </svg>
          <span className="text-xs text-slate-300 font-mono truncate">{fakeUrl}</span>
        </div>

        {/* Action icons */}
        <div className="flex items-center gap-1 text-slate-500">
          <button className="w-6 h-6 rounded flex items-center justify-center hover:bg-white/10 transition-colors text-xs">
            ↻
          </button>
          <button className="w-6 h-6 rounded flex items-center justify-center hover:bg-white/10 transition-colors">
            <svg className="w-3 h-3" fill="currentColor" viewBox="0 0 16 16">
              <circle cx="3" cy="8" r="1.5"/>
              <circle cx="8" cy="8" r="1.5"/>
              <circle cx="13" cy="8" r="1.5"/>
            </svg>
          </button>
        </div>
      </div>

      {/* Browser content */}
      <div className="flex-1 overflow-hidden relative">
        <LandingPreview item={item} />
      </div>
    </div>
  );
}
