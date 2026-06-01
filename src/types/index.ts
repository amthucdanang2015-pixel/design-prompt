export type Mode = 'all' | 'light' | 'dark';
export type FontType = 'all' | 'sans' | 'serif' | 'mono';

export interface ColorPalette {
  primary: string;
  secondary: string;
  accent: string;
  bg: string;
  text: string;
}

export interface PromptItem {
  id: string;
  index: number;
  title: string;
  subtitle: string;
  mode: 'light' | 'dark';
  type: 'sans' | 'serif' | 'mono';
  colors: ColorPalette;
  tagline: string;
  description: string;
  ctaLabel: string;
  features: string[];
}

export interface Filters {
  mode: Mode;
  type: FontType;
}
