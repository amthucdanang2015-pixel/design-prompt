'use client';

import { useState, useEffect } from 'react';
import { PromptItem } from '@/types';

interface PromptModalProps {
  isOpen: boolean;
  onClose: () => void;
  item: PromptItem;
}

export function generatePromptText(item: PromptItem): string {
  const fontTypeLabel = item.type === 'serif' ? 'Serif' : item.type === 'mono' ? 'Monospace' : 'Sans-serif';
  const modeLabel = item.mode === 'dark' ? 'Dark Mode' : 'Light Mode';

  return `<role>
You are an expert frontend engineer, UI/UX designer, visual design specialist, and typography expert. Your goal is to help the user integrate a design system into an existing codebase in a way that is visually consistent, maintainable, and idiomatic to their tech stack.
</role>

<design-system>
# Design Philosophy: ${item.title} (${fontTypeLabel} - ${modeLabel})

This design style is named "${item.title}". It features a ${item.mode} color scheme with ${item.type} typography.

## Core Design Principles
1. Tagline: "${item.tagline}"
2. Brand Description: "${item.description}"
3. Aesthetic Vibe: Clean, modern, responsive, and visually harmonious.

## Design Token System

### Colors
- Background: \`${item.colors.bg}\`
- Text/Foreground: \`${item.colors.text}\`
- Primary Brand Color: \`${item.colors.primary}\`
- Secondary Accent: \`${item.colors.secondary}\`
- Accent/Highlight: \`${item.colors.accent}\`

### Typography
- Font Style: \`${fontTypeLabel}\`
- Hierarchy: Clean headlines, readable body copy, monospaced metadata where appropriate.

## Component Specifications

### Buttons
- Primary CTA Button:
  - Background: \`linear-gradient(135deg, ${item.colors.primary}, ${item.colors.secondary})\`
  - Text Color: \`#FFFFFF\` (high-contrast match)
  - Label: "${item.ctaLabel}"
  - Hover: subtle scale (e.g. \`scale-[1.02]\`) and opacity fade.

### Features Grid
- Display the following core features using the accent color \`${item.colors.accent}\`:
${item.features.map((f) => `  - ${f}`).join('\n')}

</design-system>`;
}

export default function PromptModal({ isOpen, onClose, item }: PromptModalProps) {
  const [copied, setCopied] = useState(false);
  const promptText = generatePromptText(item);

  useEffect(() => {
    if (!isOpen) return;
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') onClose();
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [isOpen, onClose]);

  const handleCopy = async () => {
    try {
      await navigator.clipboard.writeText(promptText);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch (err) {
      // Fallback copy
      const textarea = document.createElement('textarea');
      textarea.value = promptText;
      document.body.appendChild(textarea);
      textarea.select();
      document.execCommand('copy');
      document.body.removeChild(textarea);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    }
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-[999] flex items-center justify-center p-4">
      {/* Backdrop */}
      <button
        aria-label="Close prompt panel"
        className="absolute inset-0 bg-black/80 backdrop-blur-md cursor-default border-none w-full h-full"
        onClick={onClose}
        type="button"
      />

      {/* Modal Dialog */}
      <div
        className="relative z-10 flex max-h-[85vh] w-[min(95vw,800px)] flex-col overflow-hidden rounded-2xl border border-white/10"
        style={{
          backgroundColor: '#0a0a0a',
          boxShadow: `
            0 0 0 1px rgba(255,255,255,0.05),
            0 25px 50px -12px rgba(0,0,0,0.8),
            0 0 100px -20px rgba(139,92,246,0.3)
          `,
        }}
      >
        {/* Glow backdrop overlay */}
        <div className="pointer-events-none absolute inset-0 overflow-hidden">
          <div
            className="-top-1/2 -right-1/2 absolute h-full w-full rounded-full opacity-20 blur-[100px]"
            style={{
              background: 'radial-gradient(circle, rgba(139,92,246,0.4) 0%, transparent 70%)',
            }}
          />
        </div>

        {/* Modal Header */}
        <div className="relative shrink-0 border-b border-white/[0.06] px-6 py-5 sm:px-8 sm:py-6">
          <button
            aria-label="Close"
            className="absolute top-5 right-5 flex h-9 w-9 items-center justify-center rounded-lg text-white/40 transition-all hover:bg-white/5 hover:text-white border-none cursor-pointer"
            onClick={onClose}
            type="button"
          >
            <svg className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
              <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
            </svg>
          </button>
          <div className="pr-12">
            <h2 className="mb-2 font-bold text-xl sm:text-2xl text-white tracking-tight font-sans">
              {item.title} Prompt Style
            </h2>
            <p className="text-white/60 text-xs sm:text-sm leading-relaxed max-w-[90%]">
              Copy this system instructions prompt to recreate the {item.title} style in other AI development sessions.
            </p>
          </div>
        </div>

        {/* Modal Body */}
        <div className="relative flex-1 overflow-y-auto p-5 sm:p-6 min-h-0">
          <div className="mb-4 flex flex-wrap items-center gap-3">
            <div className="flex items-center gap-2 rounded-lg border border-white/10 bg-white/5 px-2.5 py-1 text-xs">
              <span className="text-white/70">
                {item.mode === 'dark' ? '🌙 Dark Mode' : '☀️ Light Mode'}
              </span>
            </div>
            <div className="flex items-center gap-2 rounded-lg border border-white/10 bg-white/5 px-2.5 py-1 text-xs">
              <span className="text-white/70 capitalize">
                🔤 {item.type} typography
              </span>
            </div>
            <div className="ml-auto text-white/30 text-xs font-mono">
              {promptText.length.toLocaleString()} chars
            </div>
          </div>

          {/* Code Viewer */}
          <div className="overflow-hidden rounded-xl border border-white/[0.06] bg-[#111111] flex flex-col h-[35vh] sm:h-[40vh]">
            {/* Window Topbar */}
            <div className="flex items-center justify-between border-b border-white/[0.06] bg-white/[0.02] px-4 py-2.5">
              <div className="flex items-center gap-2">
                <svg className="h-4 w-4 text-white/30" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                  <path strokeLinecap="round" strokeLinejoin="round" d="M19.5 14.25v-2.625a3.375 3.375 0 00-3.375-3.375h-1.5A1.125 1.125 0 0113.5 7.125v-1.5a3.375 3.375 0 00-3.375-3.375H8.25m0 12.75h7.5m-7.5 3H12M10.5 2.25H5.625c-.621 0-1.125.504-1.125 1.125v17.25c0 .621.504 1.125 1.125 1.125h12.75c.621 0 1.125-.504 1.125-1.125V11.25a9 9 0 00-9-9z" />
                </svg>
                <span className="font-mono text-white/40 text-[11px]">prompt.xml</span>
              </div>
              <div className="flex items-center gap-1.5">
                <div className="h-2.5 w-2.5 rounded-full bg-white/10" />
                <div className="h-2.5 w-2.5 rounded-full bg-white/10" />
                <div className="h-2.5 w-2.5 rounded-full bg-white/10" />
              </div>
            </div>
            {/* Scrollable Pre */}
            <div className="flex-1 overflow-auto p-4">
              <pre className="font-mono text-[12px] text-white/80 leading-relaxed whitespace-pre-wrap select-all">
                {promptText}
              </pre>
            </div>
          </div>
        </div>

        {/* Modal Footer */}
        <div className="relative flex shrink-0 items-center justify-between border-t border-white/[0.06] bg-white/[0.02] px-6 py-4">
          <p className="text-white/30 text-xs hidden sm:block">
            Press <kbd className="rounded border border-white/10 bg-white/5 px-1.5 py-0.5 font-mono text-[10px] text-white/50">Esc</kbd> to close
          </p>
          <button
            className={`flex items-center gap-2 rounded-lg px-5 py-2.5 font-medium text-sm transition-all duration-200 cursor-pointer border-none ml-auto ${
              copied
                ? 'bg-emerald-600 text-white'
                : 'bg-gradient-to-r from-violet-600 to-fuchsia-600 text-white hover:scale-105 hover:brightness-110 shadow-lg shadow-violet-900/20'
            }`}
            onClick={handleCopy}
            type="button"
          >
            {copied ? (
              <>
                <svg className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5}>
                  <path strokeLinecap="round" strokeLinejoin="round" d="M4.5 12.75l6 6 9-13.5" />
                </svg>
                <span>Copied!</span>
              </>
            ) : (
              <>
                <svg className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                  <path strokeLinecap="round" strokeLinejoin="round" d="M15.75 17.25v3.375c0 .621-.504 1.125-1.125 1.125h-9.75a1.125 1.125 0 01-1.125-1.125V7.875c0-.621.504-1.125 1.125-1.125H5.4m1.5 2.25h7.4m-7.4 3h7.4m-7.4 3h5.25m4-10.5a3 3 0 11-6 0 3 3 0 016 0z" />
                </svg>
                <span>Copy Prompt</span>
              </>
            )}
          </button>
        </div>
      </div>
    </div>
  );
}
