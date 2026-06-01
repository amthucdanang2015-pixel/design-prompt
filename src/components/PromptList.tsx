'use client';

import { PromptItem, Filters } from '@/types';
import PromptCard from './PromptCard';

interface PromptListProps {
  items: PromptItem[];
  filters: Filters;
  selectedId: string;
  onSelect: (id: string) => void;
}

export default function PromptList({ items, filters, selectedId, onSelect }: PromptListProps) {
  const filtered = items.filter((item) => {
    const modeMatch = filters.mode === 'all' || item.mode === filters.mode;
    const typeMatch = filters.type === 'all' || item.type === filters.type;
    return modeMatch && typeMatch;
  });

  return (
    <div className="flex-1 overflow-y-auto px-2 py-2 space-y-1 scrollbar-thin">
      {filtered.length === 0 ? (
        <div className="flex flex-col items-center justify-center h-32 text-slate-500 text-sm">
          <span className="text-2xl mb-2">🔍</span>
          <p>No prompts match filters</p>
        </div>
      ) : (
        filtered.map((item) => (
          <PromptCard
            key={item.id}
            item={item}
            isActive={item.id === selectedId}
            onClick={() => onSelect(item.id)}
          />
        ))
      )}
    </div>
  );
}
