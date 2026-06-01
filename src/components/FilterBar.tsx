'use client';

import { Mode, FontType, Filters } from '@/types';

interface FilterBarProps {
  filters: Filters;
  onChange: (filters: Filters) => void;
}

const modeOptions: { label: string; value: Mode }[] = [
  { label: 'All', value: 'all' },
  { label: 'Light', value: 'light' },
  { label: 'Dark', value: 'dark' },
];

const typeOptions: { label: string; value: FontType }[] = [
  { label: 'All', value: 'all' },
  { label: 'Sans', value: 'sans' },
  { label: 'Serif', value: 'serif' },
  { label: 'Mono', value: 'mono' },
];

export default function FilterBar({ filters, onChange }: FilterBarProps) {
  return (
    <div className="px-4 py-3 space-y-3 border-b border-white/5">
      {/* Mode filter */}
      <div>
        <p className="text-[10px] font-semibold uppercase tracking-widest text-slate-500 mb-1.5">
          Mode
        </p>
        <div className="flex gap-1">
          {modeOptions.map((opt) => (
            <button
              key={opt.value}
              onClick={() => onChange({ ...filters, mode: opt.value })}
              className={`flex-1 text-xs py-1 rounded-md font-medium transition-all duration-150 ${
                filters.mode === opt.value
                  ? 'bg-violet-600 text-white shadow-sm shadow-violet-900'
                  : 'text-slate-400 hover:text-slate-200 hover:bg-white/5'
              }`}
            >
              {opt.label}
            </button>
          ))}
        </div>
      </div>

      {/* Type filter */}
      <div>
        <p className="text-[10px] font-semibold uppercase tracking-widest text-slate-500 mb-1.5">
          Type
        </p>
        <div className="flex gap-1">
          {typeOptions.map((opt) => (
            <button
              key={opt.value}
              onClick={() => onChange({ ...filters, type: opt.value })}
              className={`flex-1 text-xs py-1 rounded-md font-medium transition-all duration-150 ${
                filters.type === opt.value
                  ? 'bg-violet-600 text-white shadow-sm shadow-violet-900'
                  : 'text-slate-400 hover:text-slate-200 hover:bg-white/5'
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
