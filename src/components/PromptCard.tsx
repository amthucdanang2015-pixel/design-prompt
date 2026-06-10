'use client';

import { PromptItem } from '@/types';

interface PromptCardProps {
  item: PromptItem;
  isActive: boolean;
  onClick: () => void;
  favicon: string;
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

export default function PromptCard({ item, isActive, onClick, favicon }: PromptCardProps) {
  return (
    <button
      onClick={onClick}
      className={`w-full text-left px-3 py-2.5 rounded-xl flex items-center gap-3 transition-all duration-200 group ${isActive
        ? 'bg-white/[0.09] ring-1 ring-white/15 shadow-lg shadow-black/20'
        : 'ring-1 ring-transparent hover:bg-white/[0.045] hover:ring-white/[0.06]'
        }`}
      style={isActive ? { boxShadow: `0 14px 34px ${item.colors.primary}20` } : undefined}
    >
      {/* Color swatch / thumbnail */}
      <div
        style={{
          backgroundColor: ` ${["coss", "tripadvisor"].includes(item.id) ? "#fff" : ""}`,
        }}
      >
        <img src={favicon} alt={item.title} width={40} height={40} />
      </div>

      {/* Text */}
      <div className="flex-1 min-w-0">
        <div className="flex items-center gap-1.5 mb-0.5">
          <span
            className={`text-[14px] font-semibold truncate leading-none ${isActive ? 'text-white' : 'text-slate-300 group-hover:text-white'
              }`}
          >
            {item.title}
          </span>
          <span className={`text-[10px] px-1.5 py-0.5 rounded-full font-semibold leading-none ${modeColors[item.mode]}`}>
            {item.mode}
          </span>
        </div>
        <div className="flex items-center gap-1.5">
          <span className={`text-[10px] px-1.5 py-0.5 rounded-full font-semibold leading-none ${typeColors[item.type]}`}>
            {item.type}
          </span>
          <span className="text-[11px] text-slate-500 truncate leading-none">{item.subtitle}</span>
        </div>
      </div>

      {/* Index */}
      <span
        className={`text-[11px] font-mono flex-shrink-0 tabular-nums ${isActive ? 'text-violet-300' : 'text-slate-600'
          }`}
      >
        {String(item.index).padStart(2, '0')}
      </span>
    </button>
  );
}
