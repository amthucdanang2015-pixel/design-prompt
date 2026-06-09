'use client';

import { Mode, FontType, Filters } from '@/types';

interface FilterBarProps {
  filters: Filters;
  onChange: (filters: Filters) => void;
}

const SunIcon = () => (
  <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="h-3 w-3">
    <circle cx="12" cy="12" r="4" />
    <path d="M12 2v2" /><path d="M12 20v2" />
    <path d="m4.93 4.93 1.41 1.41" /><path d="m17.66 17.66 1.41 1.41" />
    <path d="M2 12h2" /><path d="M20 12h2" />
    <path d="m6.34 17.66-1.41 1.41" /><path d="m19.07 4.93-1.41 1.41" />
  </svg>
);

const MoonIcon = () => (
  <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="h-3 w-3">
    <path d="M12 3a6 6 0 0 0 9 9 9 9 0 1 1-9-9Z" />
  </svg>
);

const modeOptions: { label: string; value: Mode; icon?: React.ReactNode }[] = [
  { label: 'All', value: 'all' },
  { label: 'Light', value: 'light', icon: <SunIcon /> },
  { label: 'Dark', value: 'dark', icon: <MoonIcon /> },
];

const typeOptions: { label: string; value: FontType }[] = [
  { label: 'All', value: 'all' },
  { label: 'Sans', value: 'sans' },
  { label: 'Serif', value: 'serif' },
  { label: 'Mono', value: 'mono' },
];

export default function FilterBar({ filters, onChange }: FilterBarProps) {
  return (
    <div className="relative z-10 flex flex-wrap items-center gap-x-4 gap-y-2 border-b border-white/[0.07] px-3 py-2.5 sm:px-4 sm:py-3 bg-black/[0.08]">
      {/* Mode */}
      <div className="flex items-center gap-1.5">
        <span className="font-semibold text-[10px] text-white/35 uppercase">Mode</span>
        <div className="flex gap-0.5 rounded-lg bg-white/[0.035] p-0.5 ring-1 ring-white/[0.04]">
          {modeOptions.map((opt) => (
            <button
              key={opt.value}
              type="button"
              onClick={() => onChange({ ...filters, mode: opt.value })}
              className={`flex items-center gap-1 rounded-md px-2 py-1 font-semibold text-[11px] transition-all ${
                filters.mode === opt.value
                  ? 'bg-white/15 text-white shadow-sm shadow-black/20'
                  : 'text-white/50 hover:bg-white/5 hover:text-white/70'
              }`}
            >
              {opt.icon}
              {opt.label}
            </button>
          ))}
        </div>
      </div>

      {/* Type */}
      <div className="flex items-center gap-1.5">
        <span className="font-semibold text-[10px] text-white/35 uppercase">Type</span>
        <div className="flex gap-0.5 rounded-lg bg-white/[0.035] p-0.5 ring-1 ring-white/[0.04]">
          {typeOptions.map((opt) => (
            <button
              key={opt.value}
              type="button"
              onClick={() => onChange({ ...filters, type: opt.value })}
              className={`flex items-center gap-1 rounded-md px-2 py-1 font-semibold text-[11px] transition-all ${
                filters.type === opt.value
                  ? 'bg-white/15 text-white shadow-sm shadow-black/20'
                  : 'text-white/50 hover:bg-white/5 hover:text-white/70'
              }`}
            >
              {opt.label}
            </button>
          ))}
        </div>
      </div>
    </div>
  );
}
