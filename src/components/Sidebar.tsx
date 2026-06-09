'use client';

import { useState } from 'react';
import { PromptItem, Filters } from '@/types';
import FilterBar from './FilterBar';
import PromptList from './PromptList';

interface SidebarProps {
  items: PromptItem[];
  selectedId: string;
  onSelect: (id: string) => void;
}

export default function Sidebar({ items, selectedId, onSelect }: SidebarProps) {
  const [filters, setFilters] = useState<Filters>({ mode: 'all', type: 'all' });

  const visibleCount = items.filter((item) => {
    const modeMatch = filters.mode === 'all' || item.mode === filters.mode;
    const typeMatch = filters.type === 'all' || item.type === filters.type;
    return modeMatch && typeMatch;
  }).length;

  return (
    <div className="relative flex flex-col w-full h-full border-r border-white/[0.07] bg-[#0b0b13]/92 backdrop-blur-xl">
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-x-0 top-0 h-44 opacity-70"
        style={{
          background: 'linear-gradient(180deg, rgba(124, 58, 237, 0.16), transparent)',
        }}
      />
      {/* Logo / Title */}
      <div className="relative z-10 flex items-center justify-between px-4 pt-5 pb-4 border-b border-white/[0.07]">
        <div className="flex items-center gap-2.5">
          <div className="w-9 h-9 rounded-xl bg-gradient-to-br from-violet-500 via-fuchsia-500 to-cyan-400 flex items-center justify-center shadow-lg shadow-violet-950/50 ring-1 ring-white/15">
            <svg className="w-4 h-4 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5}>
              <path strokeLinecap="round" strokeLinejoin="round" d="M9.53 16.122a3 3 0 0 0-5.78 1.128 2.25 2.25 0 0 1-2.4 2.245 4.5 4.5 0 0 0 8.4-2.245c0-.399-.078-.78-.22-1.128Zm0 0a15.998 15.998 0 0 0 3.388-1.62m-5.043-.025a15.994 15.994 0 0 1 1.622-3.395m3.42 3.42a15.995 15.995 0 0 0 4.764-4.648l3.876-5.814a1.151 1.151 0 0 0-1.597-1.597L14.146 6.32a15.996 15.996 0 0 0-4.649 4.763m3.42 3.42a6.776 6.776 0 0 0-3.42-3.42" />
            </svg>
          </div>
          <div>
            <h1 className="text-[15px] font-bold text-white leading-none">PromptUI</h1>
            <p className="text-[11px] text-slate-500 leading-none mt-1">Design Explorer</p>
          </div>
        </div>
        <span className="text-[10px] font-mono bg-white/[0.06] text-slate-300 px-2 py-1 rounded-full ring-1 ring-white/[0.06]">
          {visibleCount}/{items.length}
        </span>
      </div>

      {/* Filters */}
      <FilterBar filters={filters} onChange={setFilters} />

      {/* Prompt list */}
      <PromptList
        items={items}
        filters={filters}
        selectedId={selectedId}
        onSelect={onSelect}
      />

      {/* Footer */}
      <div className="relative z-10 px-4 py-3 border-t border-white/[0.07] flex items-center gap-2 bg-black/10">
        <div className="w-6 h-6 rounded-lg bg-gradient-to-br from-violet-400 to-cyan-300 flex-shrink-0 ring-1 ring-white/10" />
        <div className="flex-1 min-w-0">
          <p className="text-xs text-slate-300 font-semibold truncate">Design Explorer</p>
          <p className="text-[10px] text-slate-600 truncate">v1.0.0</p>
        </div>
      </div>
    </div>
  );
}
