import type { Metadata } from 'next';
import './globals.css';

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
    <html lang="en" className="h-full">
      <body className="h-full antialiased">{children}</body>
    </html>
  );
}
