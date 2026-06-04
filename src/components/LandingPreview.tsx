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
      className={`w-full h-full overflow-auto ${isDark ? 'scrollbar-dark' : 'scrollbar-light'}`}
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
      {/* Product Preview */}
      <div
        className="mx-6 h-48 rounded-2xl mb-8 flex items-center justify-center overflow-hidden relative" style={{
          background: `linear-gradient(
      135deg,
      ${colors.primary}22,
      ${colors.secondary}15,
      ${colors.accent}10
    )`,
          border: `1px solid ${isDark
            ? 'rgba(255,255,255,0.08)'
            : 'rgba(0,0,0,0.06)'
            }`,
        }}
      >
        {/* Background decoration */}
        <div className="absolute inset-0 flex items-center justify-center gap-3 opacity-30">
          {[...Array(5)].map((_, i) => (
            <div
              key={i}
              className="rounded-xl"
              style={{
                width: `${48 + i * 10}px`,
                height: `${28 + (i % 3) * 10}px`,
                backgroundColor: `${colors.primary}22`,
                border: `1px solid ${colors.primary}33`,
              }}
            />
          ))}
        </div>

        {/* Fake browser */}
        <div
          className="mx-6 h-48 rounded-2xl mb-8 flex items-center justify-center overflow-hidden relative"
          style={{
            background: `linear-gradient(
      135deg,
      ${colors.primary}22,
      ${colors.secondary}15,
      ${colors.accent}10
    )`,
            border: `1px solid ${isDark
              ? 'rgba(255,255,255,0.08)'
              : 'rgba(0,0,0,0.06)'
              }`,
          }}
        >
          <div className="absolute inset-0 flex items-center justify-center gap-3 opacity-30">
            {[...Array(5)].map((_, i) => (
              <div
                key={i}
                className="rounded-xl"
                style={{
                  width: `${48 + i * 10}px`,
                  height: `${28 + (i % 3) * 10}px`,
                  backgroundColor: `${colors.primary}22`,
                  border: `1px solid ${colors.primary}33`,
                }}
              />
            ))}
          </div>

          <div className="absolute top-4 left-1/2 -translate-x-1/2 z-10">
            <span
              className="text-[11px] font-semibold uppercase tracking-[0.18em]"
              style={{ color: colors.primary }}
            >
              PRODUCT PREVIEW
            </span>
          </div>

          <div
            className="relative z-10 w-[280px] rounded-xl overflow-hidden"
            style={{
              backgroundColor: isDark ? '#0F172A' : '#FFFFFF',
              border: `1px solid ${isDark
                ? 'rgba(255,255,255,0.08)'
                : 'rgba(0,0,0,0.06)'
                }`,
              boxShadow: '0 20px 40px rgba(0,0,0,0.15)',
            }}
          >
            <div
              className="flex items-center gap-1.5 px-3 py-2 border-b"
              style={{
                borderColor: isDark
                  ? 'rgba(255,255,255,0.08)'
                  : 'rgba(0,0,0,0.06)',
              }}
            >
              <div className="w-2 h-2 rounded-full bg-red-400" />
              <div className="w-2 h-2 rounded-full bg-yellow-400" />
              <div className="w-2 h-2 rounded-full bg-green-400" />
            </div>

            <div className="p-4">
              <div
                className="h-2 rounded-full mb-2"
                style={{ backgroundColor: `${colors.primary}55` }}
              />

              <div
                className="h-2 rounded-full w-4/5 mb-4"
                style={{ backgroundColor: `${colors.primary}33` }}
              />

              <div
                className="h-12 rounded-lg"
                style={{
                  background: `linear-gradient(
            135deg,
            ${colors.primary},
            ${colors.secondary}
          )`,
                }}
              />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
