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
  const [mobileOpen, setMobileOpen] = useState(false);

  const visibleCount = items.filter((item) => {
    const modeMatch = filters.mode === 'all' || item.mode === filters.mode;
    const typeMatch = filters.type === 'all' || item.type === filters.type;
    return modeMatch && typeMatch;
  }).length;

  const sidebarContent = (
    <div className="flex flex-col h-full bg-[#0F0F1A] border-r border-white/5">
      {/* Logo / Title */}
      <div className="flex items-center justify-between px-4 py-4 border-b border-white/5">
        <div className="flex items-center gap-2.5">
          <div className="w-8 h-8 rounded-xl bg-gradient-to-br from-violet-500 to-indigo-600 flex items-center justify-center shadow-lg shadow-violet-900/40">
            <svg className="w-4 h-4 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5}>
              <path strokeLinecap="round" strokeLinejoin="round" d="M9.53 16.122a3 3 0 0 0-5.78 1.128 2.25 2.25 0 0 1-2.4 2.245 4.5 4.5 0 0 0 8.4-2.245c0-.399-.078-.78-.22-1.128Zm0 0a15.998 15.998 0 0 0 3.388-1.62m-5.043-.025a15.994 15.994 0 0 1 1.622-3.395m3.42 3.42a15.995 15.995 0 0 0 4.764-4.648l3.876-5.814a1.151 1.151 0 0 0-1.597-1.597L14.146 6.32a15.996 15.996 0 0 0-4.649 4.763m3.42 3.42a6.776 6.776 0 0 0-3.42-3.42" />
            </svg>
          </div>
          <div>
            <h1 className="text-sm font-bold text-white leading-none">PromptUI</h1>
            <p className="text-[10px] text-slate-500 leading-none mt-0.5">Design Explorer</p>
          </div>
        </div>
        <span className="text-[10px] font-mono bg-white/5 text-slate-400 px-2 py-0.5 rounded-full">
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
        onSelect={(id) => {
          onSelect(id);
          setMobileOpen(false);
        }}
      />

      {/* Footer */}
      <div className="px-4 py-3 border-t border-white/5 flex items-center gap-2">
        <div className="w-6 h-6 rounded-full bg-gradient-to-br from-violet-400 to-pink-400 flex-shrink-0" />
        <div className="flex-1 min-w-0">
          <p className="text-xs text-slate-300 font-medium truncate">Design Explorer</p>
          <p className="text-[10px] text-slate-600 truncate">v1.0.0</p>
        </div>
      </div>
    </div>
  );

  return (
    <>
      {/* Mobile hamburger */}
      <button
        onClick={() => setMobileOpen(true)}
        className="md:hidden fixed top-4 left-4 z-50 w-9 h-9 bg-[#0F0F1A] border border-white/10 rounded-lg flex items-center justify-center text-slate-300 shadow-lg"
        aria-label="Open sidebar"
      >
        <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
          <path strokeLinecap="round" strokeLinejoin="round" d="M3.75 6.75h16.5M3.75 12h16.5m-16.5 5.25h16.5" />
        </svg>
      </button>

      {/* Mobile drawer backdrop */}
      {mobileOpen && (
        <div
          className="md:hidden fixed inset-0 z-40 bg-black/60 backdrop-blur-sm"
          onClick={() => setMobileOpen(false)}
        />
      )}

      {/* Mobile drawer */}
      <div
        className={`md:hidden fixed top-0 left-0 h-full w-72 z-50 transform transition-transform duration-300 ease-in-out ${
          mobileOpen ? 'translate-x-0' : '-translate-x-full'
        }`}
      >
        <button
          onClick={() => setMobileOpen(false)}
          className="absolute top-4 right-4 w-7 h-7 bg-white/10 rounded-lg flex items-center justify-center text-slate-300 text-sm z-10"
          aria-label="Close sidebar"
        >
          ✕
        </button>
        {sidebarContent}
      </div>

      {/* Desktop sidebar: 320px on xl, 260px on md */}
      <div className="hidden md:flex flex-col w-[260px] xl:w-[320px] flex-shrink-0 h-full">
        {sidebarContent}
      </div>
    </>
  );
}
