import React from 'react';
import { DeviceViewport } from '../../types/portfolio';
import {
  Monitor,
  Laptop,
  Tablet,
  Smartphone,
  Maximize2,
  Download,
  Upload,
  Printer,
  Share2,
  Moon,
  Sun,
  Code2,
  Sparkles,
} from 'lucide-react';

interface Props {
  device: DeviceViewport;
  onChangeDevice: (device: DeviceViewport) => void;
  isFullscreen: boolean;
  onToggleFullscreen: () => void;
  isDarkMode: boolean;
  onToggleDarkMode: () => void;
  onExportHtml: () => void;
  onExportJson: () => void;
  onImportJson: () => void;
  onPrintResume: () => void;
  zoom: number;
  onChangeZoom: (zoom: number) => void;
}

export const PreviewToolbar: React.FC<Props> = ({
  device,
  onChangeDevice,
  isFullscreen,
  onToggleFullscreen,
  isDarkMode,
  onToggleDarkMode,
  onExportHtml,
  onExportJson,
  onImportJson,
  onPrintResume,
  zoom,
  onChangeZoom,
}) => {
  return (
    <div className="h-14 bg-neutral-900 border-b border-neutral-800 px-4 flex items-center justify-between gap-2 shrink-0 z-30">
      {/* Device Viewport Buttons */}
      <div className="flex items-center gap-1 bg-neutral-950 p-1 rounded-xl border border-neutral-800">
        <button
          type="button"
          onClick={() => onChangeDevice('desktop')}
          title="Desktop Monitor View (100% Fluid)"
          className={`p-1.5 rounded-lg text-xs font-semibold flex items-center gap-1.5 transition-all ${
            device === 'desktop' ? 'bg-indigo-600 text-white shadow-xs' : 'text-neutral-400 hover:text-white'
          }`}
        >
          <Monitor className="w-4 h-4" />
          <span className="hidden md:inline text-[11px]">Desktop</span>
        </button>

        <button
          type="button"
          onClick={() => onChangeDevice('laptop')}
          title="Laptop View (1024px)"
          className={`p-1.5 rounded-lg text-xs font-semibold flex items-center gap-1.5 transition-all ${
            device === 'laptop' ? 'bg-indigo-600 text-white shadow-xs' : 'text-neutral-400 hover:text-white'
          }`}
        >
          <Laptop className="w-4 h-4" />
          <span className="hidden md:inline text-[11px]">Laptop</span>
        </button>

        <button
          type="button"
          onClick={() => onChangeDevice('tablet')}
          title="Tablet View (768px)"
          className={`p-1.5 rounded-lg text-xs font-semibold flex items-center gap-1.5 transition-all ${
            device === 'tablet' ? 'bg-indigo-600 text-white shadow-xs' : 'text-neutral-400 hover:text-white'
          }`}
        >
          <Tablet className="w-4 h-4" />
          <span className="hidden md:inline text-[11px]">Tab</span>
        </button>

        <button
          type="button"
          onClick={() => onChangeDevice('mobile')}
          title="Mobile iPhone View (390px)"
          className={`p-1.5 rounded-lg text-xs font-semibold flex items-center gap-1.5 transition-all ${
            device === 'mobile' ? 'bg-indigo-600 text-white shadow-xs' : 'text-neutral-400 hover:text-white'
          }`}
        >
          <Smartphone className="w-4 h-4" />
          <span className="hidden md:inline text-[11px]">Mobile</span>
        </button>
      </div>

      {/* Center Zoom / Size Indicator */}
      <div className="hidden lg:flex items-center gap-2 text-xs font-mono text-neutral-400">
        <span>Zoom:</span>
        {[75, 90, 100].map((z) => (
          <button
            key={z}
            onClick={() => onChangeZoom(z)}
            className={`px-2 py-0.5 rounded text-[10px] ${
              zoom === z ? 'bg-neutral-800 text-white font-bold' : 'text-neutral-500 hover:text-neutral-300'
            }`}
          >
            {z}%
          </button>
        ))}
      </div>

      {/* Right Action Tools */}
      <div className="flex items-center gap-2">
        {/* Quick Dark/Light Toggle */}
        <button
          type="button"
          onClick={onToggleDarkMode}
          title="Toggle Portfolio Dark/Light mode"
          className="p-2 rounded-xl bg-neutral-950 border border-neutral-800 text-neutral-400 hover:text-white transition-colors"
        >
          {isDarkMode ? <Sun className="w-4 h-4" /> : <Moon className="w-4 h-4" />}
        </button>

        {/* Print / PDF Mode */}
        <button
          type="button"
          onClick={onPrintResume}
          title="Print / Save as PDF Resume"
          className="p-2 rounded-xl bg-neutral-950 border border-neutral-800 text-neutral-400 hover:text-white transition-colors hidden sm:inline-flex"
        >
          <Printer className="w-4 h-4" />
        </button>

        {/* Export HTML standalone */}
        <button
          type="button"
          onClick={onExportHtml}
          title="Download Standalone HTML Portfolio (Single File)"
          className="px-3 py-1.5 rounded-xl bg-emerald-600 hover:bg-emerald-500 text-white font-bold text-xs flex items-center gap-1.5 shadow-md transition-all"
        >
          <Download className="w-3.5 h-3.5" />
          <span className="hidden sm:inline">Download HTML</span>
        </button>

        {/* Fullscreen Preview */}
        <button
          type="button"
          onClick={onToggleFullscreen}
          title="Fullscreen Live Preview"
          className={`p-2 rounded-xl border transition-all ${
            isFullscreen
              ? 'bg-indigo-600 text-white border-indigo-500'
              : 'bg-neutral-950 border-neutral-800 text-neutral-400 hover:text-white'
          }`}
        >
          <Maximize2 className="w-4 h-4" />
        </button>
      </div>
    </div>
  );
};
