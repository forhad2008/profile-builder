import React from 'react';
import {
  LayoutTemplate,
  User,
  Cpu,
  FolderGit2,
  Briefcase,
  Star,
  Palette,
  Sparkles,
  RotateCcw,
  Download,
  Upload,
} from 'lucide-react';

export type EditorTab =
  | 'templates'
  | 'personal'
  | 'skills'
  | 'projects'
  | 'experience'
  | 'testimonials'
  | 'theme';

interface Props {
  activeTab: EditorTab;
  onSelectTab: (tab: EditorTab) => void;
  onResetData: () => void;
  onExportJson: () => void;
  onImportJson: () => void;
}

const TABS: { id: EditorTab; label: string; icon: React.FC<{ className?: string }>; count?: number }[] = [
  { id: 'templates', label: 'Templates', icon: LayoutTemplate },
  { id: 'personal', label: 'Profile & Bio', icon: User },
  { id: 'skills', label: 'Skills & Stack', icon: Cpu },
  { id: 'projects', label: 'Projects & Work', icon: FolderGit2 },
  { id: 'experience', label: 'Experience & Edu', icon: Briefcase },
  { id: 'testimonials', label: 'Testimonials', icon: Star },
  { id: 'theme', label: 'Theme & Styling', icon: Palette },
];

export const EditorSidebar: React.FC<Props> = ({
  activeTab,
  onSelectTab,
  onResetData,
  onExportJson,
  onImportJson,
}) => {
  return (
    <aside className="w-64 bg-neutral-900 border-r border-neutral-800 flex flex-col justify-between shrink-0 select-none">
      {/* Brand Header */}
      <div className="p-4 border-b border-neutral-800 flex items-center justify-between">
        <div className="flex items-center gap-2.5">
          <div className="w-8 h-8 rounded-xl bg-gradient-to-tr from-indigo-600 to-violet-500 flex items-center justify-center text-white shadow-md">
            <Sparkles className="w-4 h-4" />
          </div>
          <div>
            <h1 className="font-extrabold text-sm text-white tracking-tight leading-none">PortfolioCraft</h1>
            <span className="text-[10px] font-mono text-indigo-400 block">STUDIO PRO</span>
            <p className="text-[9px] text-neutral-400 tracking-tight mt-0.5">Collected by <span className="text-neutral-300 font-semibold">Abdullah Forhad</span></p>
          </div>
        </div>
      </div>

      {/* Navigation Tabs */}
      <nav className="p-3 space-y-1 overflow-y-auto flex-1">
        {TABS.map((tab) => {
          const Icon = tab.icon;
          const isActive = activeTab === tab.id;
          return (
            <button
              key={tab.id}
              type="button"
              onClick={() => onSelectTab(tab.id)}
              className={`w-full px-3 py-2.5 rounded-xl text-xs font-semibold flex items-center gap-3 transition-all ${
                isActive
                  ? 'bg-indigo-600 text-white shadow-md shadow-indigo-600/20'
                  : 'text-neutral-400 hover:text-white hover:bg-neutral-850'
              }`}
            >
              <Icon className={`w-4 h-4 ${isActive ? 'text-white' : 'text-neutral-400'}`} />
              <span className="flex-1 text-left">{tab.label}</span>
            </button>
          );
        })}
      </nav>

      {/* Bottom Utilities */}
      <div className="p-3 border-t border-neutral-800 space-y-1">
        <div className="grid grid-cols-2 gap-1.5 pb-2">
          <button
            type="button"
            onClick={onExportJson}
            title="Export Portfolio Data as JSON"
            className="p-2 rounded-xl bg-neutral-950 hover:bg-neutral-800 border border-neutral-800 text-[11px] font-semibold text-neutral-300 flex items-center justify-center gap-1.5 transition-colors"
          >
            <Download className="w-3.5 h-3.5 text-indigo-400" /> Backup
          </button>
          <button
            type="button"
            onClick={onImportJson}
            title="Import Portfolio Data JSON"
            className="p-2 rounded-xl bg-neutral-950 hover:bg-neutral-800 border border-neutral-800 text-[11px] font-semibold text-neutral-300 flex items-center justify-center gap-1.5 transition-colors"
          >
            <Upload className="w-3.5 h-3.5 text-indigo-400" /> Restore
          </button>
        </div>

        <button
          type="button"
          onClick={onResetData}
          className="w-full px-3 py-1.5 rounded-xl hover:bg-red-500/10 text-[11px] font-semibold text-neutral-500 hover:text-red-400 flex items-center justify-center gap-2 transition-colors"
        >
          <RotateCcw className="w-3.5 h-3.5" /> Reset Default Sample
        </button>
      </div>
    </aside>
  );
};
