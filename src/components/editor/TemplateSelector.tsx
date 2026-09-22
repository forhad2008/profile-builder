import React from 'react';
import { PortfolioData, TemplateId } from '../../types/portfolio';
import { TEMPLATES_CATALOG, INDUSTRY_PRESETS } from '../../data/presets';
import { TemplateRenderer } from '../templates/TemplateRenderer';
import { Check, UserCheck, Eye, Zap } from 'lucide-react';

interface Props {
  selectedTemplate: TemplateId;
  onSelectTemplate: (templateId: TemplateId, autoOpenPreview?: boolean) => void;
  onApplyPreset?: (presetKey: string) => void;
  autoPreview?: boolean;
  onToggleAutoPreview?: (enabled: boolean) => void;
  data?: PortfolioData;
}

export const TemplateSelector: React.FC<Props> = ({
  selectedTemplate,
  onSelectTemplate,
  onApplyPreset,
  autoPreview = true,
  onToggleAutoPreview,
  data,
}) => {
  return (
    <div className="space-y-6">
      <div>
        <div className="flex items-center justify-between">
          <div>
            <h2 className="text-xl font-bold text-white tracking-tight flex items-center gap-2">
              <span>10 Master Templates</span>
            </h2>
            <p className="text-xs text-neutral-400 mt-1">
              Live interactive screenshots of each portfolio layout. Click to auto-preview.
            </p>
          </div>
          <span className="text-xs px-2.5 py-1 rounded-full bg-indigo-500/10 text-indigo-400 border border-indigo-500/20 font-mono">
            10 Live
          </span>
        </div>

        {/* Auto Live Preview Toggle Banner */}
        <div className="mt-3 p-3 rounded-xl bg-gradient-to-r from-indigo-950/40 via-neutral-900 to-purple-950/30 border border-indigo-500/20 flex items-center justify-between">
          <div className="flex items-center gap-2">
            <div className="w-6 h-6 rounded-lg bg-indigo-500/20 text-indigo-300 flex items-center justify-center">
              <Zap className="w-3.5 h-3.5" />
            </div>
            <div>
              <p className="text-xs font-semibold text-white">Auto Live Preview</p>
              <p className="text-[10px] text-neutral-400">Instantly displays preview upon choosing a template</p>
            </div>
          </div>
          {onToggleAutoPreview && (
            <button
              type="button"
              onClick={() => onToggleAutoPreview(!autoPreview)}
              className={`relative inline-flex h-5 w-9 shrink-0 cursor-pointer rounded-full border-2 border-transparent transition-colors duration-200 ease-in-out focus:outline-hidden ${
                autoPreview ? 'bg-indigo-600' : 'bg-neutral-800'
              }`}
              role="switch"
              aria-checked={autoPreview}
              title={autoPreview ? 'Auto Preview is ON' : 'Auto Preview is OFF'}
            >
              <span
                className={`pointer-events-none inline-block h-4 w-4 transform rounded-full bg-white shadow-lg ring-0 transition duration-200 ease-in-out ${
                  autoPreview ? 'translate-x-4' : 'translate-x-0'
                }`}
              />
            </button>
          )}
        </div>
      </div>

      {/* Preset Quick Loader */}
      {onApplyPreset && (
        <div className="p-4 rounded-xl bg-neutral-900/80 border border-neutral-800 space-y-3">
          <div className="flex items-center justify-between">
            <span className="text-xs font-bold text-neutral-300 flex items-center gap-1.5">
              <UserCheck className="w-3.5 h-3.5 text-indigo-400" />
              Quick Industry Demo Profiles
            </span>
            <span className="text-[11px] text-indigo-400 font-mono">1-Click Auto Preview</span>
          </div>
          <div className="flex flex-wrap gap-1.5">
            {Object.entries(INDUSTRY_PRESETS).map(([key, item]) => (
              <button
                key={key}
                type="button"
                onClick={() => onApplyPreset(key)}
                className="text-[11px] px-2.5 py-1.5 rounded-lg bg-neutral-800 hover:bg-neutral-700 text-neutral-300 border border-neutral-700 hover:border-indigo-500/40 transition-all text-left flex items-center gap-1.5 group"
              >
                <span>{item.label.split('&')[0]}</span>
                <Eye className="w-3 h-3 text-neutral-500 group-hover:text-indigo-400" />
              </button>
            ))}
          </div>
        </div>
      )}

      {/* Template Cards Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        {TEMPLATES_CATALOG.map((tpl) => {
          const isSelected = selectedTemplate === tpl.id;
          
          // Generate customized live snapshot data for this specific template card
          const cardData: PortfolioData | undefined = data
            ? {
                ...data,
                themeConfig: {
                  ...data.themeConfig,
                  templateId: tpl.id,
                },
              }
            : undefined;

          return (
            <div
              key={tpl.id}
              onClick={() => onSelectTemplate(tpl.id, true)}
              className={`p-4 rounded-2xl border cursor-pointer transition-all duration-200 flex flex-col justify-between relative overflow-hidden group ${
                isSelected
                  ? 'bg-neutral-900 border-indigo-500 ring-2 ring-indigo-500/30 shadow-lg shadow-indigo-500/10'
                  : 'bg-neutral-900/60 border-neutral-800 hover:border-neutral-700 hover:bg-neutral-900'
              }`}
            >
              {/* Header Badge */}
              <div className="flex items-center justify-between mb-3">
                <span className="text-[10px] uppercase font-mono px-2 py-0.5 rounded bg-neutral-800 text-neutral-400 border border-neutral-700">
                  {tpl.category}
                </span>
                {isSelected ? (
                  <span className="text-[10px] font-bold px-2 py-0.5 rounded-full bg-emerald-500/20 text-emerald-300 border border-emerald-500/30 flex items-center gap-1">
                    <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse"></span>
                    Live Preview Active
                  </span>
                ) : (
                  tpl.badge && (
                    <span className="text-[10px] font-bold px-2 py-0.5 rounded bg-indigo-950 text-indigo-300 border border-indigo-800">
                      {tpl.badge}
                    </span>
                  )
                )}
              </div>

              {/* Real Live Scaled Screenshot Preview Frame */}
              <div className="h-36 rounded-xl relative overflow-hidden mb-3.5 border border-neutral-750/80 bg-neutral-950 shadow-inner group/thumb">
                {cardData ? (
                  <div className="absolute inset-0 overflow-hidden pointer-events-none select-none bg-neutral-950">
                    <div
                      className="w-[960px] h-[520px] origin-top-left absolute top-0 left-0"
                      style={{
                        transform: 'scale(0.33)',
                        transformOrigin: '0 0',
                      }}
                    >
                      <TemplateRenderer data={cardData} />
                    </div>
                  </div>
                ) : (
                  <img
                    src={tpl.previewImage}
                    alt={`${tpl.name} live preview`}
                    referrerPolicy="no-referrer"
                    className="w-full h-full object-cover object-top transition-transform duration-500 group-hover:scale-105"
                    loading="lazy"
                  />
                )}

                {/* Dark Gradient Overlay for Readability and Hover Action */}
                <div className="absolute inset-0 bg-gradient-to-t from-neutral-950/90 via-neutral-950/20 to-black/20 p-2.5 flex flex-col justify-between pointer-events-none">
                  <div className="flex items-center justify-between">
                    <span className="text-[10px] font-mono tracking-wider px-2 py-0.5 rounded-md bg-black/80 backdrop-blur-md text-white border border-white/10 shadow-xs">
                      {tpl.id.toUpperCase()}
                    </span>
                    <div className="opacity-0 group-hover:opacity-100 transition-opacity flex items-center gap-1 text-[10px] bg-indigo-600/90 backdrop-blur-xs px-2 py-0.5 rounded-md text-white font-bold shadow-md">
                      <Eye className="w-3 h-3" />
                      <span>Live Preview</span>
                    </div>
                  </div>
                  <p className="text-xs font-bold text-white leading-tight drop-shadow-md line-clamp-1">{tpl.tagline}</p>
                </div>
              </div>

              {/* Info */}
              <div className="space-y-1.5 flex-1 flex flex-col justify-between">
                <div>
                  <div className="flex items-center justify-between">
                    <h3 className="font-bold text-sm text-white">
                      {tpl.name}
                    </h3>
                    {isSelected ? (
                      <span className="w-5 h-5 rounded-full bg-indigo-500 text-white flex items-center justify-center shrink-0 shadow-sm">
                        <Check className="w-3.5 h-3.5" />
                      </span>
                    ) : (
                      <span className="text-[11px] text-indigo-400 opacity-0 group-hover:opacity-100 font-medium transition-opacity flex items-center gap-0.5">
                        <Eye className="w-3 h-3" />
                        Select
                      </span>
                    )}
                  </div>
                  <p className="text-xs text-neutral-400 mt-1 leading-relaxed line-clamp-2">{tpl.description}</p>
                </div>

                <div className="pt-3 mt-3 border-t border-neutral-800/80 flex items-center justify-between text-[11px] text-neutral-400">
                  <span className="truncate">
                    <span className="text-indigo-400 font-semibold">Best for:</span> {tpl.recommendedFor}
                  </span>
                </div>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};
