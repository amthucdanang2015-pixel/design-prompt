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

      {/* Product Preview — fake browser */}
      <div
        className="mx-6 rounded-2xl mb-8 relative"
        style={{
          background: `linear-gradient(135deg, ${colors.primary}22, ${colors.secondary}15, ${colors.accent}10)`,
          border: `1px solid ${isDark ? 'rgba(255,255,255,0.08)' : 'rgba(0,0,0,0.06)'}`,
          padding: '24px 20px 20px',
        }}
      >
        {/* Background blobs */}
        <div className="absolute inset-0 flex items-center justify-center gap-4 opacity-15 pointer-events-none overflow-hidden rounded-2xl">
          {[...Array(5)].map((_, i) => (
            <div
              key={i}
              className="rounded-xl flex-shrink-0"
              style={{
                width: `${60 + i * 14}px`,
                height: `${36 + (i % 3) * 14}px`,
                backgroundColor: `${colors.primary}33`,
                border: `1px solid ${colors.primary}44`,
              }}
            />
          ))}
        </div>

        {/* Browser window */}
        <div
          className="relative z-10 w-full max-w-sm mx-auto rounded-xl overflow-hidden"
          style={{
            backgroundColor: isDark ? '#1C1C1E' : '#FFFFFF',
            border: `1px solid ${isDark ? 'rgba(255,255,255,0.10)' : 'rgba(0,0,0,0.10)'}`,
            boxShadow: '0 16px 48px rgba(0,0,0,0.25)',
          }}
        >
          {/* ── Browser chrome: traffic lights + tab bar ── */}
          <div
            style={{
              backgroundColor: isDark ? '#2C2C2E' : '#DEDEDE',
              borderBottom: `1px solid ${isDark ? 'rgba(255,255,255,0.07)' : 'rgba(0,0,0,0.12)'}`,
            }}
          >
            {/* Traffic lights */}
            <div className="flex items-center gap-1.5 px-3 pt-2.5 pb-1">
              <div className="w-2.5 h-2.5 rounded-full" style={{ backgroundColor: '#FF5F57' }} />
              <div className="w-2.5 h-2.5 rounded-full" style={{ backgroundColor: '#FFBD2E' }} />
              <div className="w-2.5 h-2.5 rounded-full" style={{ backgroundColor: '#28C840' }} />
            </div>

            {/* Tab bar */}
            <div className="flex items-end px-2 gap-1">
              {/* Active tab */}
              <div
                className="flex items-center gap-1.5 px-2.5 py-1.5 rounded-t-lg"
                style={{
                  backgroundColor: isDark ? '#1C1C1E' : '#FFFFFF',
                  borderTop: `1px solid ${isDark ? 'rgba(255,255,255,0.10)' : 'rgba(0,0,0,0.10)'}`,
                  borderLeft: `1px solid ${isDark ? 'rgba(255,255,255,0.10)' : 'rgba(0,0,0,0.10)'}`,
                  borderRight: `1px solid ${isDark ? 'rgba(255,255,255,0.10)' : 'rgba(0,0,0,0.10)'}`,
                  maxWidth: '150px',
                }}
              >
                {/* Favicon */}
                <div
                  className="w-3.5 h-3.5 rounded flex-shrink-0 flex items-center justify-center text-white font-bold"
                  style={{
                    backgroundColor: colors.primary,
                    fontSize: '7px',
                    lineHeight: 1,
                  }}
                >
                  {item.title[0]}
                </div>
                <span
                  className="truncate font-medium"
                  style={{
                    fontSize: '10px',
                    color: isDark ? '#F1F5F9' : '#1E293B',
                  }}
                >
                  {item.title}
                </span>
              </div>

              {/* New Tab button */}
              <div
                className="flex items-center gap-1 px-2 py-1.5 rounded-t-lg flex-shrink-0"
                style={{
                  color: isDark ? '#94A3B8' : '#6B7280',
                  opacity: 0.6,
                }}
              >
                <svg width="9" height="9" viewBox="0 0 10 10" fill="none">
                  <path d="M5 1v8M1 5h8" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" />
                </svg>
                <span style={{ fontSize: '10px' }}>New Tab</span>
              </div>
            </div>
          </div>

          {/* Address bar */}
          <div
            className="flex items-center px-2 py-1.5 gap-1.5"
            style={{
              backgroundColor: isDark ? '#1C1C1E' : '#F8FAFC',
              borderBottom: `1px solid ${isDark ? 'rgba(255,255,255,0.06)' : 'rgba(0,0,0,0.06)'}`,
            }}
          >
            <div
              className="flex-1 flex items-center gap-1.5 px-2 py-0.5 rounded"
              style={{
                backgroundColor: isDark ? 'rgba(255,255,255,0.08)' : 'rgba(0,0,0,0.06)',
                color: isDark ? '#94A3B8' : '#64748B',
              }}
            >
              <svg width="8" height="8" viewBox="0 0 12 12" fill="none">
                <circle cx="6" cy="6" r="5" stroke="currentColor" strokeWidth="1" />
                <path
                  d="M1 6h10M6 1c-1.5 1.8-2 3.3-2 5s.5 3.2 2 5M6 1c1.5 1.8 2 3.3 2 5s-.5 3.2-2 5"
                  stroke="currentColor"
                  strokeWidth="1"
                  strokeLinecap="round"
                />
              </svg>
              <span style={{ fontSize: '9px' }} className="truncate">
                {item.title.toLowerCase().replace(/\s+/g, '')}.com
              </span>
            </div>
          </div>

          {/* Page skeleton content */}
          <div className="p-4" style={{ backgroundColor: isDark ? '#1C1C1E' : '#FFFFFF' }}>
            <div
              className="h-2 rounded-full mb-2"
              style={{ backgroundColor: `${colors.primary}55` }}
            />
            <div
              className="h-2 rounded-full w-3/4 mb-4"
              style={{ backgroundColor: `${colors.primary}33` }}
            />
            <div
              className="h-10 rounded-lg mb-3"
              style={{
                background: `linear-gradient(135deg, ${colors.primary}, ${colors.secondary})`,
              }}
            />
            <div className="grid grid-cols-3 gap-1.5">
              {[0.9, 0.6, 0.4].map((op, i) => (
                <div
                  key={i}
                  className="h-1.5 rounded-full"
                  style={{ backgroundColor: colors.primary, opacity: op }}
                />
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
