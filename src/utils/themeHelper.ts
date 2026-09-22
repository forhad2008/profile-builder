import { ColorPalette, FontPairing } from '../types/portfolio';

export interface ThemeColors {
  primary: string;
  primaryHover: string;
  primaryLight: string;
  primaryBorder: string;
  glow: string;
  accentText: string;
  badgeBg: string;
  badgeBorder: string;
  gradient: string;
  ring: string;
  accentHex: string;
}

export const PALETTE_CONFIG: Record<ColorPalette, ThemeColors> = {
  indigo: {
    primary: 'bg-indigo-600 text-white hover:bg-indigo-500',
    primaryHover: 'hover:bg-indigo-500',
    primaryLight: 'bg-indigo-500/10 text-indigo-400 border-indigo-500/20',
    primaryBorder: 'border-indigo-500/30',
    glow: 'shadow-indigo-500/20',
    accentText: 'text-indigo-400',
    badgeBg: 'bg-indigo-950/60 text-indigo-300 border-indigo-800/50',
    badgeBorder: 'border-indigo-500/40',
    gradient: 'from-indigo-500 to-purple-600',
    ring: 'focus:ring-indigo-500',
    accentHex: '#6366f1',
  },
  emerald: {
    primary: 'bg-emerald-600 text-white hover:bg-emerald-500',
    primaryHover: 'hover:bg-emerald-500',
    primaryLight: 'bg-emerald-500/10 text-emerald-400 border-emerald-500/20',
    primaryBorder: 'border-emerald-500/30',
    glow: 'shadow-emerald-500/20',
    accentText: 'text-emerald-400',
    badgeBg: 'bg-emerald-950/60 text-emerald-300 border-emerald-800/50',
    badgeBorder: 'border-emerald-500/40',
    gradient: 'from-emerald-500 to-teal-600',
    ring: 'focus:ring-emerald-500',
    accentHex: '#10b981',
  },
  rose: {
    primary: 'bg-rose-600 text-white hover:bg-rose-500',
    primaryHover: 'hover:bg-rose-500',
    primaryLight: 'bg-rose-500/10 text-rose-400 border-rose-500/20',
    primaryBorder: 'border-rose-500/30',
    glow: 'shadow-rose-500/20',
    accentText: 'text-rose-400',
    badgeBg: 'bg-rose-950/60 text-rose-300 border-rose-800/50',
    badgeBorder: 'border-rose-500/40',
    gradient: 'from-rose-500 to-pink-600',
    ring: 'focus:ring-rose-500',
    accentHex: '#f43f5e',
  },
  amber: {
    primary: 'bg-amber-600 text-white hover:bg-amber-500',
    primaryHover: 'hover:bg-amber-500',
    primaryLight: 'bg-amber-500/10 text-amber-400 border-amber-500/20',
    primaryBorder: 'border-amber-500/30',
    glow: 'shadow-amber-500/20',
    accentText: 'text-amber-400',
    badgeBg: 'bg-amber-950/60 text-amber-300 border-amber-800/50',
    badgeBorder: 'border-amber-500/40',
    gradient: 'from-amber-500 to-orange-600',
    ring: 'focus:ring-amber-500',
    accentHex: '#f59e0b',
  },
  violet: {
    primary: 'bg-violet-600 text-white hover:bg-violet-500',
    primaryHover: 'hover:bg-violet-500',
    primaryLight: 'bg-violet-500/10 text-violet-400 border-violet-500/20',
    primaryBorder: 'border-violet-500/30',
    glow: 'shadow-violet-500/20',
    accentText: 'text-violet-400',
    badgeBg: 'bg-violet-950/60 text-violet-300 border-violet-800/50',
    badgeBorder: 'border-violet-500/40',
    gradient: 'from-violet-500 to-fuchsia-600',
    ring: 'focus:ring-violet-500',
    accentHex: '#8b5cf6',
  },
  cyan: {
    primary: 'bg-cyan-600 text-white hover:bg-cyan-500',
    primaryHover: 'hover:bg-cyan-500',
    primaryLight: 'bg-cyan-500/10 text-cyan-400 border-cyan-500/20',
    primaryBorder: 'border-cyan-500/30',
    glow: 'shadow-cyan-500/20',
    accentText: 'text-cyan-400',
    badgeBg: 'bg-cyan-950/60 text-cyan-300 border-cyan-800/50',
    badgeBorder: 'border-cyan-500/40',
    gradient: 'from-cyan-500 to-blue-600',
    ring: 'focus:ring-cyan-500',
    accentHex: '#06b6d4',
  },
  monochrome: {
    primary: 'bg-neutral-100 text-neutral-950 hover:bg-white',
    primaryHover: 'hover:bg-neutral-200',
    primaryLight: 'bg-neutral-800/80 text-neutral-200 border-neutral-700',
    primaryBorder: 'border-neutral-700',
    glow: 'shadow-neutral-500/10',
    accentText: 'text-neutral-200',
    badgeBg: 'bg-neutral-900 text-neutral-300 border-neutral-800',
    badgeBorder: 'border-neutral-700',
    gradient: 'from-neutral-200 to-neutral-400',
    ring: 'focus:ring-neutral-400',
    accentHex: '#e5e5e5',
  },
  coral: {
    primary: 'bg-orange-600 text-white hover:bg-orange-500',
    primaryHover: 'hover:bg-orange-500',
    primaryLight: 'bg-orange-500/10 text-orange-400 border-orange-500/20',
    primaryBorder: 'border-orange-500/30',
    glow: 'shadow-orange-500/20',
    accentText: 'text-orange-400',
    badgeBg: 'bg-orange-950/60 text-orange-300 border-orange-800/50',
    badgeBorder: 'border-orange-500/40',
    gradient: 'from-orange-500 to-rose-600',
    ring: 'focus:ring-orange-500',
    accentHex: '#ea580c',
  },
};

export const FONT_CONFIG: Record<FontPairing, { headingClass: string; bodyClass: string; label: string }> = {
  sans: {
    headingClass: 'font-sans-clean font-bold tracking-tight',
    bodyClass: 'font-sans-clean',
    label: 'Plus Jakarta Sans (Modern Clean)',
  },
  serif: {
    headingClass: 'font-heading-editorial font-normal tracking-wide',
    bodyClass: 'font-sans-clean',
    label: 'Playfair & Modern Sans (Editorial Luxury)',
  },
  mono: {
    headingClass: 'font-tech-code font-semibold tracking-tight',
    bodyClass: 'font-tech-code',
    label: 'Fira Code (Developer / Terminal)',
  },
  display: {
    headingClass: 'font-display-modern font-bold tracking-tight',
    bodyClass: 'font-sans-clean',
    label: 'Syne & Space Grotesk (Creative Display)',
  },
  editorial: {
    headingClass: 'font-heading-editorial italic font-normal tracking-wide',
    bodyClass: 'font-sans-clean',
    label: 'Instrument Serif Italic (Artisan)',
  },
};

export function getBorderRadiusClass(radius: string): string {
  switch (radius) {
    case 'none':
      return 'rounded-none';
    case 'sm':
      return 'rounded-sm';
    case 'md':
      return 'rounded-xl';
    case 'lg':
      return 'rounded-2xl';
    case 'full':
      return 'rounded-3xl';
    default:
      return 'rounded-xl';
  }
}
