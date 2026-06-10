'use client';

import { PromptItem } from '@/types';
import LandingPreview from './LandingPreview';

interface PreviewBrowserProps {
  item: PromptItem;
}

export default function PreviewBrowser({ item }: PreviewBrowserProps) {
  const { colors, url } = item;
  const fakeUrl = `https://designprompt-umber.vercel.app/${item.id}.html`;

  return (
    <div className="flex flex-col h-full overflow-hidden rounded-[22px] shadow-2xl shadow-black/45 ring-1 ring-white/[0.08] bg-[#11111a]">
      {/* Browser chrome */}
      <div className="flex-shrink-0 bg-[#171724]">
        {/* Top row - Tabs */}
        <div className="flex items-end px-3 pt-2">
          {/* Traffic lights */}
          <div className="flex items-center gap-1.5 mr-4 mb-2">
            <div className="w-3 h-3 rounded-full bg-[#FF5F57] ring-1 ring-black/20" />
            <div className="w-3 h-3 rounded-full bg-[#FFBD2E] ring-1 ring-black/20" />
            <div className="w-3 h-3 rounded-full bg-[#28C840] ring-1 ring-black/20" />
          </div>

          {/* Tabs */}
          <div className="flex items-end gap-1 flex-1">
            <div
              className="flex w-[190px] items-center gap-2 rounded-t-[18px] bg-[#0f0f15] px-4 py-2"
              style={{
                borderTop: `2px solid ${colors.primary}`,
              }}
            >
              <div
                className="w-3.5 h-3.5 rounded flex items-center justify-center text-white font-bold"
                style={{
                  backgroundColor: colors.primary,
                  fontSize: '7px',
                }}
              >
                <img src={item.favicon} alt={item.title} className="w-3.5 h-3.5 rounded" />
              </div>
              <span className="max-w-[120px] truncate text-xs text-white/80">
                {item.title}
              </span>
            </div>
            <div className="flex items-center gap-2 rounded-t-[18px] bg-white/5 px-4 py-2 opacity-50">
              <div className="h-3 w-3 rounded-sm bg-white/20" />

              <span className="text-xs text-white/40">
                New Tab
              </span>
            </div>
          </div>
        </div>

        {/* Bottom row - Navigation + URL */}
        <div className="flex items-center gap-3 px-3 py-2 border-t border-white/5">
          {/* Nav arrows */}
          <div className="flex items-center gap-1 text-slate-500">
            <button className="w-6 h-6 flex items-center justify-center">
              ‹
            </button>
            <button className="w-6 h-6 flex items-center justify-center">
              ›
            </button>
          </div>

          {/* URL bar */}
          <div className="flex-1 flex items-center gap-2 bg-[#0b0b12] rounded-lg px-3 py-1.5 ring-1 ring-white/[0.06]">
            <svg className="w-3 h-3 text-emerald-400 flex-shrink-0" fill="currentColor" viewBox="0 0 16 16">
              <path d="M8 1a3 3 0 0 0-3 3v2H4a1 1 0 0 0-1 1v7a1 1 0 0 0 1 1h8a1 1 0 0 0 1-1V7a1 1 0 0 0-1-1h-1V4a3 3 0 0 0-3-3zm0 1.5A1.5 1.5 0 0 1 9.5 4v2h-3V4A1.5 1.5 0 0 1 8 2.5z" />
            </svg>
            <span className="text-xs text-slate-300 font-mono truncate">{fakeUrl}</span>
          </div>

          {/* Right actions */}
          <div className="flex items-center gap-1 text-slate-500">
            ...
          </div>
        </div>
      </div>

      {/* Browser content */}
      <div className="flex-1 overflow-hidden relative">
        {url ? (
          <iframe
            src={url}
            className="w-full h-full border-0"
            sandbox="allow-scripts allow-same-origin allow-popups allow-forms"
          />
        ) : (
          <LandingPreview item={item} />
        )}
      </div>
    </div>
  );
}
