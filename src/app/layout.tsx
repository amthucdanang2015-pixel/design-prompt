import type { Metadata } from 'next';
import localFont from 'next/font/local';
import './globals.css';

const interTight = localFont({
  src: '../../assets/fonts/inter_tight.woff2',
  variable: '--font-inter-tight',
  display: 'swap',
});

const jetBrains = localFont({
  src: '../../assets/fonts/jet_brain.woff2',
  variable: '--font-jet-brain',
  display: 'swap',
});

export const metadata: Metadata = {
  title: 'PromptUI — Design Explorer',
  description:
    'Explore curated UI design prompts with live landing page previews. Filter by mode and font type.',
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className={`${interTight.variable} ${jetBrains.variable} h-full`}>
      <body className="h-full antialiased">{children}</body>
    </html>
  );
}
