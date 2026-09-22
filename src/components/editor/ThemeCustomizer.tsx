import React from 'react';
import { ThemeConfig, ColorPalette, FontPairing, ThemeMode } from '../../types/portfolio';
import { PALETTE_CONFIG, FONT_CONFIG } from '../../utils/themeHelper';
import { Palette, Type, Sun, Moon, Layout, Eye, Check } from 'lucide-react';

interface Props {
  themeConfig: ThemeConfig;
  onUpdateTheme: (themeConfig: Partial<ThemeConfig>) => void;
}

const PALETTE_KEYS: ColorPalette[] = [
  'indigo',
  'emerald',
  'rose',
  'amber',
  'violet',
  'cyan',
  'monochrome',
  'coral',
];

const FONT_OPTIONS: { id: FontPairing; label: string; desc: string }[] = [
  { id: 'sans', label: 'Plus Jakarta Sans', desc: 'Clean, modern tech sans-serif' },
  { id: 'serif', label: 'Playfair & Editorial', desc: 'Luxury editorial serif paired with modern sans' },
  { id: 'mono', label: 'Fira Code', desc: 'Developer monospace terminal aesthetic' },
  { id: 'display', label: 'Syne & Space Grotesk', desc: 'Bold creative high-impact display' },
  { id: 'editorial', label: 'Instrument Serif Italic', desc: 'Artisan handcrafted editorial feel' },
];

export const ThemeCustomizer: React.FC<Props> = ({ themeConfig, onUpdateTheme }) => {
  const toggleSection = (sectionKey: keyof ThemeConfig['showSections']) => {
    onUpdateTheme({
      showSections: {
        ...themeConfig.showSections,
        [sectionKey]: !themeConfig.showSections[sectionKey],
      },
    });
  };

  return (
    <div className="space-y-8">
      <div>
        <h2 className="text-xl font-bold text-white tracking-tight">Theme & Visual Styling</h2>
        <p className="text-xs text-neutral-400 mt-1">
          Customize accent color palettes, typography pairings, corner radius, and section visibility.
        </p>
      </div>

      {/* Light / Dark Mode Switch */}
      <div className="p-4 rounded-2xl bg-neutral-900 border border-neutral-800 flex items-center justify-between">
        <div>
          <span className="text-xs font-bold text-neutral-200 block">Theme Color Mode</span>
          <span className="text-[11px] text-neutral-400">Select dark obsidian or clean high-contrast light</span>
        </div>
        <div className="flex items-center gap-1.5 p-1 rounded-xl bg-neutral-950 border border-neutral-800">
          <button
            type="button"
            onClick={() => onUpdateTheme({ mode: 'dark' })}
            className={`px-3 py-1.5 rounded-lg text-xs font-bold flex items-center gap-1.5 transition-all ${
              themeConfig.mode === 'dark' ? 'bg-indigo-600 text-white shadow-sm' : 'text-neutral-400 hover:text-white'
            }`}
          >
            <Moon className="w-3.5 h-3.5" /> Dark Mode
          </button>
          <button
            type="button"
            onClick={() => onUpdateTheme({ mode: 'light' })}
            className={`px-3 py-1.5 rounded-lg text-xs font-bold flex items-center gap-1.5 transition-all ${
              themeConfig.mode === 'light' ? 'bg-indigo-600 text-white shadow-sm' : 'text-neutral-400 hover:text-white'
            }`}
          >
            <Sun className="w-3.5 h-3.5" /> Light Mode
          </button>
        </div>
      </div>

      {/* Color Palettes Swatches */}
      <div className="p-5 rounded-2xl bg-neutral-900 border border-neutral-800 space-y-3">
        <label className="text-xs font-bold text-neutral-300 uppercase tracking-wider block flex items-center gap-2">
          <Palette className="w-4 h-4 text-indigo-400" /> Accent Color Palette
        </label>
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
          {PALETTE_KEYS.map((pal) => {
            const conf = PALETTE_CONFIG[pal];
            const isSelected = themeConfig.colorPalette === pal;
            return (
              <button
                key={pal}
                type="button"
                onClick={() => onUpdateTheme({ colorPalette: pal })}
                className={`p-3 rounded-xl border text-left transition-all flex items-center justify-between ${
                  isSelected
                    ? 'bg-neutral-950 border-indigo-500 ring-2 ring-indigo-500/30 shadow-md'
                    : 'bg-neutral-950/60 border-neutral-800 hover:border-neutral-700'
                }`}
              >
                <div className="flex items-center gap-2.5">
                  <span
                    className="w-4 h-4 rounded-full shadow-sm shrink-0"
                    style={{ backgroundColor: conf.accentHex }}
                  />
                  <span className="text-xs font-bold text-white capitalize">{pal}</span>
                </div>
                {isSelected && <Check className="w-3.5 h-3.5 text-indigo-400" />}
              </button>
            );
          })}
        </div>
      </div>

      {/* Font Pairings */}
      <div className="p-5 rounded-2xl bg-neutral-900 border border-neutral-800 space-y-3">
        <label className="text-xs font-bold text-neutral-300 uppercase tracking-wider block flex items-center gap-2">
          <Type className="w-4 h-4 text-indigo-400" /> Typography System
        </label>
        <div className="space-y-2">
          {FONT_OPTIONS.map((f) => {
            const isSelected = themeConfig.fontPairing === f.id;
            return (
              <button
                key={f.id}
                type="button"
                onClick={() => onUpdateTheme({ fontPairing: f.id })}
                className={`w-full p-3 rounded-xl border text-left transition-all flex items-center justify-between ${
                  isSelected
                    ? 'bg-neutral-950 border-indigo-500 ring-2 ring-indigo-500/30'
                    : 'bg-neutral-950/60 border-neutral-800 hover:border-neutral-700'
                }`}
              >
                <div>
                  <p className="text-xs font-bold text-white">{f.label}</p>
                  <p className="text-[11px] text-neutral-400 mt-0.5">{f.desc}</p>
                </div>
                {isSelected && <Check className="w-4 h-4 text-indigo-400" />}
              </button>
            );
          })}
        </div>
      </div>

      {/* Border Radius & Geometry */}
      <div className="p-5 rounded-2xl bg-neutral-900 border border-neutral-800 space-y-3">
        <label className="text-xs font-bold text-neutral-300 uppercase tracking-wider block">
          Corner Geometry (Border Radius)
        </label>
        <div className="grid grid-cols-4 gap-2">
          {[
            { id: 'none', label: 'Square' },
            { id: 'sm', label: 'Subtle' },
            { id: 'md', label: 'Modern (12px)' },
            { id: 'full', label: 'Pill / Soft' },
          ].map((r) => (
            <button
              key={r.id}
              type="button"
              onClick={() => onUpdateTheme({ borderRadius: r.id as any })}
              className={`p-2.5 rounded-xl border text-xs font-bold text-center transition-all ${
                themeConfig.borderRadius === r.id
                  ? 'bg-indigo-600 border-indigo-500 text-white'
                  : 'bg-neutral-950 border-neutral-800 text-neutral-400 hover:text-white'
              }`}
            >
              {r.label}
            </button>
          ))}
        </div>
      </div>

      {/* Section Visibility Toggles */}
      <div className="p-5 rounded-2xl bg-neutral-900 border border-neutral-800 space-y-3">
        <label className="text-xs font-bold text-neutral-300 uppercase tracking-wider block flex items-center gap-2">
          <Eye className="w-4 h-4 text-indigo-400" /> Section Visibility Controls
        </label>
        <div className="grid grid-cols-2 sm:grid-cols-3 gap-2">
          {Object.entries(themeConfig.showSections).map(([secKey, isVisible]) => (
            <button
              key={secKey}
              type="button"
              onClick={() => toggleSection(secKey as any)}
              className={`p-2.5 rounded-xl border text-xs font-bold flex items-center justify-between transition-all ${
                isVisible
                  ? 'bg-neutral-950 border-neutral-700 text-white'
                  : 'bg-neutral-950/40 border-neutral-900 text-neutral-600'
              }`}
            >
              <span className="capitalize">{secKey}</span>
              <span
                className={`w-2 h-2 rounded-full ${isVisible ? 'bg-emerald-400' : 'bg-neutral-700'}`}
              />
            </button>
          ))}
        </div>
      </div>
    </div>
  );
};
