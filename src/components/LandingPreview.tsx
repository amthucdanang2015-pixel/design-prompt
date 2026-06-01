'use client';

import { PromptItem } from '@/types';

interface LandingPreviewProps {
  item: PromptItem;
}

const fontFamilyMap: Record<string, string> = {
  sans: "'Inter', system-ui, sans-serif",
  serif: "'Georgia', 'Times New Roman', serif",
  mono: "'Fira Code', 'Courier New', monospace",
};

export default function LandingPreview({ item }: LandingPreviewProps) {
  const { colors, tagline, description, ctaLabel, features, mode } = item;
  const fontFamily = fontFamilyMap[item.type];
  const isDark = mode === 'dark';

  return (
    <div
      className="w-full h-full overflow-auto"
      style={{ backgroundColor: colors.bg, fontFamily, color: colors.text }}
    >
      {/* Nav */}
      <nav
        className="flex items-center justify-between px-8 py-4 border-b"
        style={{
          borderColor: isDark ? 'rgba(255,255,255,0.08)' : 'rgba(0,0,0,0.08)',
          backgroundColor: isDark ? 'rgba(255,255,255,0.03)' : 'rgba(0,0,0,0.02)',
        }}
      >
        <div className="flex items-center gap-2">
          <div
            className="w-7 h-7 rounded-lg flex items-center justify-center text-xs font-bold text-white"
            style={{ backgroundColor: colors.primary }}
          >
            {item.title[0]}
          </div>
          <span className="font-semibold text-sm" style={{ color: colors.text }}>
            {item.title}
          </span>
        </div>
        <div className="hidden sm:flex items-center gap-6 text-xs" style={{ color: isDark ? '#94A3B8' : '#64748B' }}>
          <span className="hover:opacity-80 cursor-pointer transition-opacity">Features</span>
          <span className="hover:opacity-80 cursor-pointer transition-opacity">Pricing</span>
          <span className="hover:opacity-80 cursor-pointer transition-opacity">Docs</span>
        </div>
        <button
          className="text-xs px-4 py-1.5 rounded-lg font-semibold text-white transition-opacity hover:opacity-90"
          style={{ backgroundColor: colors.primary }}
        >
          {ctaLabel}
        </button>
      </nav>

      {/* Hero */}
      <div className="flex flex-col items-center text-center px-6 pt-12 pb-10">
        {/* Badge */}
        <div
          className="inline-flex items-center gap-1.5 text-xs font-medium px-3 py-1 rounded-full mb-6"
          style={{
            backgroundColor: `${colors.primary}22`,
            color: colors.primary,
            border: `1px solid ${colors.primary}44`,
          }}
        >
          <span
            className="w-1.5 h-1.5 rounded-full animate-pulse"
            style={{ backgroundColor: colors.primary }}
          />
          New — Just launched
        </div>

        {/* Headline */}
        <h1
          className="text-3xl sm:text-4xl font-bold leading-tight mb-4 max-w-lg"
          style={{ color: colors.text }}
        >
          {tagline}
        </h1>

        {/* Description */}
        <p
          className="text-sm leading-relaxed max-w-md mb-8"
          style={{ color: isDark ? '#94A3B8' : '#64748B' }}
        >
          {description}
        </p>

        {/* CTA */}
        <div className="flex flex-col sm:flex-row items-center gap-3">
          <button
            className="px-6 py-2.5 rounded-xl text-sm font-semibold text-white shadow-lg transition-all hover:opacity-90 hover:scale-[1.02]"
            style={{
              background: `linear-gradient(135deg, ${colors.primary}, ${colors.secondary})`,
              boxShadow: `0 8px 24px ${colors.primary}44`,
            }}
          >
            {ctaLabel}
          </button>
          <button
            className="px-6 py-2.5 rounded-xl text-sm font-semibold transition-all hover:opacity-80"
            style={{
              color: colors.text,
              border: `1px solid ${isDark ? 'rgba(255,255,255,0.15)' : 'rgba(0,0,0,0.12)'}`,
              backgroundColor: isDark ? 'rgba(255,255,255,0.04)' : 'rgba(0,0,0,0.03)',
            }}
          >
            See how it works →
          </button>
        </div>
      </div>

      {/* Features */}
      <div
        className="mx-6 rounded-2xl p-6 grid grid-cols-3 gap-4 mb-8"
        style={{
          backgroundColor: isDark ? 'rgba(255,255,255,0.04)' : 'rgba(0,0,0,0.03)',
          border: `1px solid ${isDark ? 'rgba(255,255,255,0.08)' : 'rgba(0,0,0,0.06)'}`,
        }}
      >
        {features.map((feature, i) => (
          <div key={i} className="flex flex-col items-center text-center gap-1.5">
            <div
              className="w-8 h-8 rounded-lg flex items-center justify-center text-base"
              style={{ backgroundColor: `${colors.accent}22` }}
            >
              {['✦', '◈', '⬡'][i % 3]}
            </div>
            <p className="text-xs font-medium leading-snug" style={{ color: isDark ? '#CBD5E1' : '#475569' }}>
              {feature}
            </p>
          </div>
        ))}
      </div>

      {/* Fake screenshot / gradient block */}
      <div
        className="mx-6 h-28 rounded-xl mb-6 flex items-center justify-center overflow-hidden relative"
        style={{
          background: `linear-gradient(135deg, ${colors.primary}33, ${colors.secondary}22, ${colors.accent}11)`,
          border: `1px solid ${isDark ? 'rgba(255,255,255,0.06)' : 'rgba(0,0,0,0.05)'}`,
        }}
      >
        <div className="absolute inset-0 flex items-center justify-center gap-2 opacity-30">
          {[...Array(5)].map((_, i) => (
            <div
              key={i}
              className="rounded-md"
              style={{
                width: `${40 + i * 12}px`,
                height: `${24 + (i % 3) * 8}px`,
                backgroundColor: colors.primary,
                opacity: 0.4 + i * 0.1,
              }}
            />
          ))}
        </div>
        <p className="text-xs font-medium z-10" style={{ color: colors.primary }}>
          Product Preview
        </p>
      </div>
    </div>
  );
}
