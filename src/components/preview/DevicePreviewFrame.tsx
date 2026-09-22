import React, { useRef, useEffect, useState } from 'react';
import { DeviceViewport, PortfolioData } from '../../types/portfolio';
import { TemplateRenderer } from '../templates/TemplateRenderer';

interface Props {
  device: DeviceViewport;
  data: PortfolioData;
  zoom?: number;
}

export const DevicePreviewFrame: React.FC<Props> = ({ device, data, zoom = 100 }) => {
  const containerRef = useRef<HTMLDivElement>(null);
  const [containerWidth, setContainerWidth] = useState(1200);

  useEffect(() => {
    if (!containerRef.current) return;
    const observer = new ResizeObserver((entries) => {
      for (const entry of entries) {
        setContainerWidth(entry.contentRect.width);
      }
    });
    observer.observe(containerRef.current);
    return () => observer.disconnect();
  }, []);

  const manualZoom = zoom / 100;

  if (device === 'desktop') {
    return (
      <div ref={containerRef} className="w-full h-full overflow-y-auto bg-neutral-950 flex justify-center custom-scrollbar">
        <div
          className="w-full min-h-full transition-all duration-300"
          style={{
            transform: manualZoom !== 1 ? `scale(${manualZoom})` : undefined,
            transformOrigin: 'top center',
          }}
        >
          <TemplateRenderer data={data} />
        </div>
      </div>
    );
  }

  if (device === 'laptop') {
    const targetWidth = 1024;
    const availableWidth = Math.max(containerWidth - 32, 320);
    const autoScale = availableWidth < targetWidth ? availableWidth / targetWidth : 1;
    const effectiveScale = autoScale * manualZoom;

    return (
      <div
        ref={containerRef}
        className="w-full h-full overflow-y-auto bg-neutral-950/90 p-4 sm:p-8 flex flex-col items-center justify-start custom-scrollbar"
      >
        <div
          className="w-[1024px] bg-neutral-900 rounded-2xl border-4 border-neutral-750 shadow-[0_20px_60px_rgba(0,0,0,0.8)] overflow-hidden flex flex-col transition-all duration-300 my-auto shrink-0 ring-1 ring-white/10"
          style={{
            transform: effectiveScale !== 1 ? `scale(${effectiveScale})` : undefined,
            transformOrigin: 'top center',
            marginBottom: effectiveScale < 1 ? `-${(1 - effectiveScale) * 700}px` : undefined,
          }}
        >
          {/* Laptop Top Bezel */}
          <div className="h-7 bg-neutral-850 border-b border-neutral-700/80 flex items-center justify-between px-4 select-none">
            <div className="flex items-center gap-1.5">
              <span className="w-3 h-3 rounded-full bg-rose-500/80 hover:opacity-100 transition-opacity"></span>
              <span className="w-3 h-3 rounded-full bg-amber-500/80 hover:opacity-100 transition-opacity"></span>
              <span className="w-3 h-3 rounded-full bg-emerald-500/80 hover:opacity-100 transition-opacity"></span>
            </div>
            <div className="flex items-center gap-2 text-[11px] font-mono text-neutral-400 bg-neutral-950/60 px-4 py-0.5 rounded-md border border-neutral-800">
              <span className="w-1.5 h-1.5 rounded-full bg-emerald-400"></span>
              <span>https://{data.personal.name.toLowerCase().replace(/\s+/g, '')}.portfolio.live</span>
            </div>
            <span className="text-[10px] font-mono text-neutral-500">1024 × 660</span>
          </div>

          {/* Screen Content */}
          <div className="h-[660px] overflow-y-auto bg-neutral-950 custom-scrollbar">
            <TemplateRenderer data={data} />
          </div>
        </div>
      </div>
    );
  }

  if (device === 'tablet') {
    const targetWidth = 768;
    const availableWidth = Math.max(containerWidth - 32, 320);
    const autoScale = availableWidth < targetWidth ? availableWidth / targetWidth : 1;
    const effectiveScale = autoScale * manualZoom;

    return (
      <div
        ref={containerRef}
        className="w-full h-full overflow-y-auto bg-neutral-950/90 p-4 sm:p-8 flex flex-col items-center justify-start custom-scrollbar"
      >
        <div
          className="w-[768px] bg-neutral-900 rounded-[32px] border-[10px] border-neutral-800 shadow-[0_20px_60px_rgba(0,0,0,0.85)] overflow-hidden flex flex-col transition-all duration-300 my-auto shrink-0 ring-1 ring-white/10"
          style={{
            transform: effectiveScale !== 1 ? `scale(${effectiveScale})` : undefined,
            transformOrigin: 'top center',
            marginBottom: effectiveScale < 1 ? `-${(1 - effectiveScale) * 800}px` : undefined,
          }}
        >
          {/* Tablet Top Camera */}
          <div className="h-6 bg-neutral-900 flex items-center justify-center select-none">
            <span className="w-2.5 h-2.5 rounded-full bg-neutral-800 border border-neutral-700"></span>
          </div>

          {/* Screen Content */}
          <div className="h-[760px] overflow-y-auto bg-neutral-950 custom-scrollbar">
            <TemplateRenderer data={data} />
          </div>

          {/* Tablet Home Bar */}
          <div className="h-5 bg-neutral-900 flex items-center justify-center select-none">
            <span className="w-32 h-1 rounded-full bg-neutral-700"></span>
          </div>
        </div>
      </div>
    );
  }

  // Mobile iPhone 16 Pro Style View
  const targetWidth = 390;
  const availableWidth = Math.max(containerWidth - 24, 300);
  const autoScale = availableWidth < targetWidth ? availableWidth / targetWidth : 1;
  const effectiveScale = autoScale * manualZoom;

  return (
    <div
      ref={containerRef}
      className="w-full h-full overflow-y-auto bg-neutral-950/90 p-3 sm:p-8 flex flex-col items-center justify-start custom-scrollbar"
    >
      <div
        className="w-[390px] bg-neutral-900 rounded-[48px] border-[10px] border-neutral-800 shadow-[0_25px_70px_rgba(0,0,0,0.9)] overflow-hidden flex flex-col relative transition-all duration-300 my-auto shrink-0 ring-1 ring-white/15"
        style={{
          transform: effectiveScale !== 1 ? `scale(${effectiveScale})` : undefined,
          transformOrigin: 'top center',
          marginBottom: effectiveScale < 1 ? `-${(1 - effectiveScale) * 780}px` : undefined,
        }}
      >
        {/* Dynamic Island Header */}
        <div className="h-11 bg-neutral-950 flex items-center justify-between px-7 pt-2 select-none border-b border-neutral-900">
          <span className="text-[12px] font-semibold text-neutral-200">9:41</span>
          <div className="w-24 h-5 rounded-full bg-black border border-neutral-800/80 flex items-center justify-between px-2">
            <span className="w-1.5 h-1.5 rounded-full bg-indigo-500 animate-pulse"></span>
            <span className="w-2 h-2 rounded-full bg-neutral-800"></span>
          </div>
          <div className="flex items-center gap-1.5 text-[10px] font-mono text-neutral-300">
            <span>5G</span>
            <div className="w-4 h-2 rounded-xs border border-neutral-400 p-0.5 flex items-center">
              <div className="w-full h-full bg-emerald-400 rounded-2xs"></div>
            </div>
          </div>
        </div>

        {/* Screen Content */}
        <div className="h-[720px] overflow-y-auto bg-neutral-950 custom-scrollbar">
          <TemplateRenderer data={data} />
        </div>

        {/* Mobile Home Indicator */}
        <div className="h-6 bg-neutral-950 flex items-center justify-center select-none pb-1 border-t border-neutral-900">
          <span className="w-32 h-1 rounded-full bg-neutral-600"></span>
        </div>
      </div>
    </div>
  );
};

