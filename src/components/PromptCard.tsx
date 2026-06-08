'use client';

import { PromptItem } from '@/types';

interface PromptCardProps {
  item: PromptItem;
  isActive: boolean;
  onClick: () => void;
}

const fontTypeIcon: Record<string, string> = {
  sans: 'Aa',
  serif: 'Ff',
  mono: '</>',
};

const modeColors: Record<string, string> = {
  light: 'bg-amber-400/20 text-amber-300',
  dark: 'bg-violet-400/20 text-violet-300',
};

const typeColors: Record<string, string> = {
  sans: 'bg-sky-400/20 text-sky-300',
  serif: 'bg-rose-400/20 text-rose-300',
  mono: 'bg-emerald-400/20 text-emerald-300',
};

export default function PromptCard({ item, isActive, onClick }: PromptCardProps) {
  return (
    <button
      onClick={onClick}
      className={`w-full text-left px-3 py-2.5 rounded-xl flex items-center gap-3 transition-all duration-200 group ${isActive
        ? 'bg-white/10 ring-1 ring-white/15 shadow-lg'
        : 'hover:bg-white/5'
        }`}
    >
      {/* Color swatch / thumbnail */}
      <div
        className="w-10 h-10 rounded-lg flex-shrink-0 flex items-center justify-center text-sm font-bold shadow-md transition-transform duration-200 group-hover:scale-105"
        style={{ backgroundColor: item.colors.primary, color: '#fff' }}
      >
        {fontTypeIcon[item.type]}
      </div>

      {/* Text */}
      <div className="flex-1 min-w-0">
        <div className="flex items-center gap-1.5 mb-0.5">
          <span
            className={`text-sm font-semibold truncate ${isActive ? 'text-white' : 'text-slate-300 group-hover:text-white'
              }`}
          >
            {item.title}
          </span>
          <span className={`text-[10px] px-1.5 py-0.5 rounded-full font-medium ${modeColors[item.mode]}`}>
            {item.mode}
          </span>
        </div>
        <div className="flex items-center gap-1.5">
          <span className={`text-[10px] px-1.5 py-0.5 rounded-full font-medium ${typeColors[item.type]}`}>
            {item.type}
          </span>
          <span className="text-[11px] text-slate-500 truncate">{item.subtitle}</span>
        </div>
      </div>

      {/* Index */}
      <span
        className={`text-xs font-mono flex-shrink-0 tabular-nums ${isActive ? 'text-violet-400' : 'text-slate-600'
          }`}
      >
        {String(item.index).padStart(2, '0')}
      </span>
    </button>
  );
}
