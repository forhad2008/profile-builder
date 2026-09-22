import React, { useState, useEffect, useRef } from 'react';
import { PortfolioData, DeviceViewport, TemplateId, ThemeConfig } from './types/portfolio';
import { INITIAL_PORTFOLIO_DATA, INDUSTRY_PRESETS } from './data/presets';
import { EditorSidebar, EditorTab } from './components/editor/EditorSidebar';
import { TemplateSelector } from './components/editor/TemplateSelector';
import { PersonalForm } from './components/editor/PersonalForm';
import { SkillsManager } from './components/editor/SkillsManager';
import { ProjectsManager } from './components/editor/ProjectsManager';
import { ExperienceManager } from './components/editor/ExperienceManager';
import { TestimonialsManager } from './components/editor/TestimonialsManager';
import { ThemeCustomizer } from './components/editor/ThemeCustomizer';
import { AiAssistantModal } from './components/editor/AiAssistantModal';
import { PreviewToolbar } from './components/preview/PreviewToolbar';
import { DevicePreviewFrame } from './components/preview/DevicePreviewFrame';
import { generateStandaloneHtml } from './utils/exportHtml';
import {
  X,
  PanelLeftClose,
  PanelLeftOpen,
  Check,
  Sparkles,
  Layers,
  User,
  Cpu,
  FolderGit2,
  Briefcase,
  Star,
  Palette,
  Eye,
  Edit3,
  Download,
  Upload,
  RotateCcw,
  Printer,
  Moon,
  Sun,
  LayoutTemplate,
} from 'lucide-react';

const STORAGE_KEY = 'portfoliocraft_studio_v2';

const MOBILE_TABS: { id: EditorTab; label: string; icon: React.FC<{ className?: string }> }[] = [
  { id: 'templates', label: 'Templates', icon: LayoutTemplate },
  { id: 'personal', label: 'Profile', icon: User },
  { id: 'skills', label: 'Skills', icon: Cpu },
  { id: 'projects', label: 'Projects', icon: FolderGit2 },
  { id: 'experience', label: 'Experience', icon: Briefcase },
  { id: 'testimonials', label: 'Reviews', icon: Star },
  { id: 'theme', label: 'Theme', icon: Palette },
];

export default function App() {
  const [data, setData] = useState<PortfolioData>(() => {
    try {
      const saved = localStorage.getItem(STORAGE_KEY);
      if (saved) {
        return JSON.parse(saved);
      }
    } catch (e) {
      console.error('Failed to load portfolio from localStorage', e);
    }
    return INITIAL_PORTFOLIO_DATA;
  });

  const [activeTab, setActiveTab] = useState<EditorTab>('templates');
  const [device, setDevice] = useState<DeviceViewport>('desktop');
  const [isFullscreen, setIsFullscreen] = useState(false);
  const [isSidebarOpen, setIsSidebarOpen] = useState(true);
  const [mobileMode, setMobileMode] = useState<'edit' | 'preview'>('edit');
  const [zoom, setZoom] = useState(100);
  const [toastMessage, setToastMessage] = useState<string | null>(null);
  const [autoLivePreview, setAutoLivePreview] = useState<boolean>(() => {
    try {
      const saved = localStorage.getItem('portfoliocraft_autopreview');
      return saved !== null ? JSON.parse(saved) : true;
    } catch {
      return true;
    }
  });
  const [lastSelectedTemplate, setLastSelectedTemplate] = useState<string | null>(null);

  // AI Assistant Modal State
  const [aiModalOpen, setAiModalOpen] = useState(false);
  const [aiTargetField, setAiTargetField] = useState<'bio' | 'tagline' | 'project'>('bio');
  const [aiTargetProjectId, setAiTargetProjectId] = useState<string | null>(null);

  const fileInputRef = useRef<HTMLInputElement>(null);

  // Save changes to localStorage
  useEffect(() => {
    try {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(data));
    } catch (e) {
      console.error('Failed to save to localStorage', e);
    }
  }, [data]);

  const showToast = (msg: string) => {
    setToastMessage(msg);
    setTimeout(() => setToastMessage(null), 3000);
  };

  // State Update Helpers
  const handleUpdatePersonal = (fields: Partial<PortfolioData['personal']>) => {
    setData((prev) => ({
      ...prev,
      personal: { ...prev.personal, ...fields },
    }));
  };

  const handleUpdateSocials = (fields: Partial<PortfolioData['socials']>) => {
    setData((prev) => ({
      ...prev,
      socials: { ...prev.socials, ...fields },
    }));
  };

  const handleUpdateSkills = (skills: PortfolioData['skills']) => {
    setData((prev) => ({ ...prev, skills }));
  };

  const handleUpdateProjects = (projects: PortfolioData['projects']) => {
    setData((prev) => ({ ...prev, projects }));
  };

  const handleUpdateExperience = (experience: PortfolioData['experience']) => {
    setData((prev) => ({ ...prev, experience }));
  };

  const handleUpdateEducation = (education: PortfolioData['education']) => {
    setData((prev) => ({ ...prev, education }));
  };

  const handleUpdateTestimonials = (testimonials: PortfolioData['testimonials']) => {
    setData((prev) => ({ ...prev, testimonials }));
  };

  const handleUpdateTheme = (themeUpdates: Partial<ThemeConfig>) => {
    setData((prev) => ({
      ...prev,
      themeConfig: { ...prev.themeConfig, ...themeUpdates },
    }));
  };

  const handleSelectTemplate = (templateId: TemplateId, autoOpenPreview = true) => {
    setData((prev) => ({
      ...prev,
      themeConfig: { ...prev.themeConfig, templateId },
    }));
    setLastSelectedTemplate(templateId);
    showToast(`Live Preview: ${templateId.toUpperCase()} template`);
    if (autoLivePreview && autoOpenPreview && window.innerWidth < 1024) {
      setMobileMode('preview');
    }
  };

  const handleApplyPreset = (presetKey: string) => {
    const preset = INDUSTRY_PRESETS[presetKey];
    if (!preset) return;

    const chosenTemplate = (preset.templateId as TemplateId) || data.themeConfig.templateId;
    setData((prev) => ({
      ...prev,
      ...preset.data,
      personal: {
        ...prev.personal,
        ...(preset.data.personal || {}),
      },
      themeConfig: {
        ...prev.themeConfig,
        templateId: chosenTemplate,
      },
    }));
    setLastSelectedTemplate(chosenTemplate);
    showToast(`Loaded "${preset.label}" demo with live preview!`);
    if (autoLivePreview && window.innerWidth < 1024) {
      setMobileMode('preview');
    }
  };

  const handleToggleAutoPreview = (enabled: boolean) => {
    setAutoLivePreview(enabled);
    try {
      localStorage.setItem('portfoliocraft_autopreview', JSON.stringify(enabled));
    } catch {
      // ignore
    }
    showToast(enabled ? 'Auto Live Preview is ON' : 'Auto Live Preview is OFF');
  };

  const handleResetData = () => {
    if (window.confirm('Reset all portfolio fields back to the initial sample profile?')) {
      setData(INITIAL_PORTFOLIO_DATA);
      showToast('Reset to default portfolio state');
    }
  };

  // Export Standalone HTML
  const handleExportHtml = () => {
    const htmlString = generateStandaloneHtml(data);
    const blob = new Blob([htmlString], { type: 'text/html;charset=utf-8' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `${data.personal.name.toLowerCase().replace(/\s+/g, '-')}-portfolio.html`;
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    URL.revokeObjectURL(url);
    showToast('Downloaded standalone single-file portfolio HTML!');
  };

  // Export JSON
  const handleExportJson = () => {
    const jsonString = JSON.stringify(data, null, 2);
    const blob = new Blob([jsonString], { type: 'application/json' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `portfolio-backup-${Date.now()}.json`;
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    URL.revokeObjectURL(url);
    showToast('Portfolio JSON backup downloaded!');
  };

  // Import JSON
  const handleImportJson = () => {
    fileInputRef.current?.click();
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    const reader = new FileReader();
    reader.onload = (event) => {
      try {
        const parsed = JSON.parse(event.target?.result as string);
        if (parsed && parsed.personal && parsed.themeConfig) {
          setData(parsed);
          showToast('Portfolio successfully restored from JSON!');
        } else {
          alert('Invalid portfolio file format.');
        }
      } catch (err) {
        alert('Could not parse JSON file.');
      }
    };
    reader.readAsText(file);
    e.target.value = '';
  };

  // Print / PDF resume mode
  const handlePrintResume = () => {
    window.print();
  };

  // AI Modal openers
  const openAiForField = (field: 'bio' | 'tagline') => {
    setAiTargetField(field);
    setAiTargetProjectId(null);
    setAiModalOpen(true);
  };

  const openAiForProject = (projId: string) => {
    setAiTargetField('project');
    setAiTargetProjectId(projId);
    setAiModalOpen(true);
  };

  const handleApplyAiText = (text: string) => {
    if (aiTargetField === 'bio') {
      handleUpdatePersonal({ bio: text });
    } else if (aiTargetField === 'tagline') {
      handleUpdatePersonal({ tagline: text });
    } else if (aiTargetField === 'project' && aiTargetProjectId) {
      handleUpdateProjects(
        data.projects.map((p) => (p.id === aiTargetProjectId ? { ...p, description: text } : p))
      );
    }
    showToast('AI copy applied to portfolio!');
  };

  const renderActiveEditorForm = () => {
    switch (activeTab) {
      case 'templates':
        return (
          <TemplateSelector
            selectedTemplate={data.themeConfig.templateId}
            onSelectTemplate={handleSelectTemplate}
            onApplyPreset={handleApplyPreset}
            autoPreview={autoLivePreview}
            onToggleAutoPreview={handleToggleAutoPreview}
          />
        );
      case 'personal':
        return (
          <PersonalForm
            personal={data.personal}
            socials={data.socials}
            onUpdatePersonal={handleUpdatePersonal}
            onUpdateSocials={handleUpdateSocials}
            onOpenAiHelper={openAiForField}
          />
        );
      case 'skills':
        return (
          <SkillsManager
            skills={data.skills}
            onUpdateSkills={handleUpdateSkills}
          />
        );
      case 'projects':
        return (
          <ProjectsManager
            projects={data.projects}
            onUpdateProjects={handleUpdateProjects}
            onOpenAiHelper={openAiForProject}
          />
        );
      case 'experience':
        return (
          <ExperienceManager
            experience={data.experience}
            education={data.education}
            onUpdateExperience={handleUpdateExperience}
            onUpdateEducation={handleUpdateEducation}
          />
        );
      case 'testimonials':
        return (
          <TestimonialsManager
            testimonials={data.testimonials}
            onUpdateTestimonials={handleUpdateTestimonials}
          />
        );
      case 'theme':
        return (
          <ThemeCustomizer
            themeConfig={data.themeConfig}
            onUpdateTheme={handleUpdateTheme}
          />
        );
      default:
        return null;
    }
  };

  return (
    <div className="h-screen w-screen flex flex-col bg-neutral-950 text-neutral-100 overflow-hidden font-sans select-none">
      {/* Hidden File Input for JSON restore */}
      <input
        type="file"
        ref={fileInputRef}
        onChange={handleFileChange}
        accept=".json"
        className="hidden"
      />

      {/* Top Application Studio Header */}
      {!isFullscreen && (
        <header className="h-14 bg-neutral-900 border-b border-neutral-800 px-3 sm:px-5 flex items-center justify-between shrink-0 z-30">
          <div className="flex items-center gap-3">
            <div className="w-8 h-8 rounded-xl bg-gradient-to-tr from-indigo-500 via-purple-500 to-pink-500 flex items-center justify-center text-white shadow-md">
              <Sparkles className="w-4 h-4" />
            </div>
            <div>
              <div className="flex items-center gap-2">
                <span className="font-extrabold text-sm sm:text-base text-white tracking-tight leading-none">
                  PortfolioCraft
                </span>
                <span className="text-[10px] font-mono px-2 py-0.5 rounded-md bg-indigo-500/20 text-indigo-300 border border-indigo-500/30 hidden sm:inline-block">
                  PRO STUDIO
                </span>
              </div>
              <p className="text-[10px] text-neutral-400 font-medium tracking-tight mt-0.5">
                Collected by <span className="text-neutral-200 font-semibold">Abdullah Forhad</span>
              </p>
            </div>
          </div>

          {/* Active Template Pill & Mobile Mode Switcher */}
          <div className="flex items-center gap-2 sm:gap-3">
            {/* Mobile View Switcher (Visible on < lg screens) */}
            <div className="flex lg:hidden items-center bg-neutral-950 p-1 rounded-xl border border-neutral-800">
              <button
                type="button"
                onClick={() => setMobileMode('edit')}
                className={`px-3 py-1 rounded-lg text-xs font-bold flex items-center gap-1.5 transition-all ${
                  mobileMode === 'edit'
                    ? 'bg-indigo-600 text-white shadow-xs'
                    : 'text-neutral-400 hover:text-white'
                }`}
              >
                <Edit3 className="w-3.5 h-3.5" />
                <span>Editor</span>
              </button>
              <button
                type="button"
                onClick={() => setMobileMode('preview')}
                className={`px-3 py-1 rounded-lg text-xs font-bold flex items-center gap-1.5 transition-all ${
                  mobileMode === 'preview'
                    ? 'bg-indigo-600 text-white shadow-xs'
                    : 'text-neutral-400 hover:text-white'
                }`}
              >
                <Eye className="w-3.5 h-3.5" />
                <span>Preview</span>
              </button>
            </div>

            {/* Template Quick Switcher Pill (Desktop) */}
            <button
              type="button"
              onClick={() => {
                setActiveTab('templates');
                setMobileMode('edit');
              }}
              className="hidden md:flex items-center gap-2 px-3 py-1.5 rounded-xl bg-neutral-950 hover:bg-neutral-800 border border-neutral-800 text-xs font-semibold text-neutral-300 transition-colors"
            >
              <span className="text-neutral-500">Template:</span>
              <span className="text-indigo-400 font-bold uppercase">{data.themeConfig.templateId}</span>
            </button>

            {/* AI Assistant Quick Trigger */}
            <button
              type="button"
              onClick={() => openAiForField('bio')}
              className="px-3 py-1.5 rounded-xl bg-gradient-to-r from-indigo-600 to-violet-600 hover:from-indigo-500 hover:to-violet-500 text-white text-xs font-bold flex items-center gap-1.5 shadow-sm transition-all"
            >
              <Sparkles className="w-3.5 h-3.5 text-amber-300" />
              <span className="hidden sm:inline">AI Copywriter</span>
            </button>
          </div>
        </header>
      )}

      {/* Main Workspace Layout */}
      <div className="flex-1 flex overflow-hidden relative">
        {/* ================= DESKTOP & LARGE TABLET VIEW (>= 1024px) ================= */}
        <div className="hidden lg:flex w-full h-full">
          {/* Leftmost Navigation Sidebar (Hidden in Fullscreen) */}
          {!isFullscreen && isSidebarOpen && (
            <EditorSidebar
              activeTab={activeTab}
              onSelectTab={setActiveTab}
              onResetData={handleResetData}
              onExportJson={handleExportJson}
              onImportJson={handleImportJson}
            />
          )}

          {/* Center Editor Settings Panel (Hidden in Fullscreen) */}
          {!isFullscreen && isSidebarOpen && (
            <div className="w-80 xl:w-96 bg-neutral-900/60 border-r border-neutral-800 flex flex-col justify-between shrink-0 overflow-hidden">
              {/* Editor Panel Header */}
              <div className="h-12 px-5 border-b border-neutral-800 flex items-center justify-between shrink-0 bg-neutral-900/40">
                <span className="text-xs font-bold uppercase tracking-wider text-neutral-300 font-mono flex items-center gap-2">
                  <span className="w-2 h-2 rounded-full bg-indigo-500"></span>
                  Editor &bull; {activeTab}
                </span>
                <button
                  type="button"
                  onClick={() => setIsSidebarOpen(false)}
                  className="p-1.5 rounded-lg text-neutral-400 hover:text-white hover:bg-neutral-800 transition-colors"
                  title="Collapse Editor Panel"
                >
                  <PanelLeftClose className="w-4 h-4" />
                </button>
              </div>

              {/* Scrollable Form Content */}
              <div className="flex-1 overflow-y-auto p-5 space-y-6 custom-scrollbar">
                {renderActiveEditorForm()}
              </div>
            </div>
          )}

          {/* Right Live Device Preview Area */}
          <div className="flex-1 flex flex-col overflow-hidden bg-neutral-950 relative">
            {/* Collapse/Expand Floating Button if sidebar is closed */}
            {!isFullscreen && !isSidebarOpen && (
              <button
                type="button"
                onClick={() => setIsSidebarOpen(true)}
                className="absolute top-3 left-3 z-40 p-2 rounded-xl bg-neutral-900 border border-neutral-700 text-white shadow-xl hover:bg-neutral-800 transition-colors flex items-center gap-2 text-xs font-bold"
              >
                <PanelLeftOpen className="w-4 h-4 text-indigo-400" />
                <span>Open Customizer</span>
              </button>
            )}

            {/* Top Preview Toolbar */}
            <PreviewToolbar
              device={device}
              onChangeDevice={setDevice}
              isFullscreen={isFullscreen}
              onToggleFullscreen={() => setIsFullscreen(!isFullscreen)}
              isDarkMode={data.themeConfig.mode === 'dark'}
              onToggleDarkMode={() =>
                handleUpdateTheme({
                  mode: data.themeConfig.mode === 'dark' ? 'light' : 'dark',
                })
              }
              onExportHtml={handleExportHtml}
              onExportJson={handleExportJson}
              onImportJson={handleImportJson}
              onPrintResume={handlePrintResume}
              zoom={zoom}
              onChangeZoom={setZoom}
            />

            {/* Device Canvas Frame */}
            <div className="flex-1 overflow-hidden relative">
              <DevicePreviewFrame device={device} data={data} zoom={zoom} />
            </div>
          </div>
        </div>

        {/* ================= MOBILE & SMALL TABLET VIEW (< 1024px) ================= */}
        <div className="flex lg:hidden w-full h-full flex-col overflow-hidden">
          {mobileMode === 'edit' ? (
            <div className="flex-1 flex flex-col overflow-hidden bg-neutral-900">
              {/* Horizontal Scrollable Tabs */}
              <div className="flex items-center gap-1.5 p-2 bg-neutral-950 border-b border-neutral-800 overflow-x-auto shrink-0 no-scrollbar">
                {MOBILE_TABS.map((tab) => {
                  const Icon = tab.icon;
                  const isActive = activeTab === tab.id;
                  return (
                    <button
                      key={tab.id}
                      type="button"
                      onClick={() => setActiveTab(tab.id)}
                      className={`px-3 py-1.5 rounded-xl text-xs font-semibold shrink-0 flex items-center gap-1.5 transition-all ${
                        isActive
                          ? 'bg-indigo-600 text-white shadow-sm'
                          : 'bg-neutral-900 text-neutral-400 hover:text-white'
                      }`}
                    >
                      <Icon className="w-3.5 h-3.5" />
                      <span>{tab.label}</span>
                    </button>
                  );
                })}
              </div>

              {/* Mobile Editor Form Body */}
              <div className="flex-1 overflow-y-auto p-4 space-y-6 custom-scrollbar pb-24">
                {renderActiveEditorForm()}
              </div>

              {/* Mobile Floating Action Bar */}
              <div className="fixed bottom-4 left-4 right-4 z-30 flex items-center gap-2 p-2 bg-neutral-950/95 backdrop-blur-md rounded-2xl border border-neutral-800 shadow-2xl">
                <button
                  type="button"
                  onClick={() => setMobileMode('preview')}
                  className="flex-1 py-3 px-4 rounded-xl bg-indigo-600 hover:bg-indigo-500 text-white font-bold text-xs flex items-center justify-center gap-2 shadow-lg transition-transform active:scale-95"
                >
                  <Eye className="w-4 h-4" />
                  <span>Preview Portfolio Live</span>
                </button>
                <button
                  type="button"
                  onClick={handleExportHtml}
                  className="p-3 rounded-xl bg-emerald-600 hover:bg-emerald-500 text-white font-bold text-xs flex items-center justify-center transition-colors"
                  title="Download HTML"
                >
                  <Download className="w-4 h-4" />
                </button>
              </div>
            </div>
          ) : (
            <div className="flex-1 flex flex-col overflow-hidden bg-neutral-950">
              {/* Mobile Preview Toolbar */}
              <PreviewToolbar
                device={device}
                onChangeDevice={setDevice}
                isFullscreen={isFullscreen}
                onToggleFullscreen={() => setIsFullscreen(!isFullscreen)}
                isDarkMode={data.themeConfig.mode === 'dark'}
                onToggleDarkMode={() =>
                  handleUpdateTheme({
                    mode: data.themeConfig.mode === 'dark' ? 'light' : 'dark',
                  })
                }
                onExportHtml={handleExportHtml}
                onExportJson={handleExportJson}
                onImportJson={handleImportJson}
                onPrintResume={handlePrintResume}
                zoom={zoom}
                onChangeZoom={setZoom}
              />

              {/* Mobile Canvas View */}
              <div className="flex-1 overflow-hidden relative">
                <DevicePreviewFrame device={device} data={data} zoom={zoom} />

                {/* Floating Back to Editor / Templates Chip */}
                <button
                  type="button"
                  onClick={() => {
                    setMobileMode('edit');
                    setActiveTab('templates');
                  }}
                  className="fixed bottom-4 left-4 z-40 px-4 py-2.5 rounded-2xl bg-neutral-900/90 backdrop-blur-md border border-indigo-500/40 text-white shadow-2xl flex items-center gap-2 text-xs font-bold hover:bg-neutral-800 transition-all active:scale-95"
                >
                  <LayoutTemplate className="w-4 h-4 text-indigo-400" />
                  <span>← Change Template / Edit</span>
                </button>
              </div>
            </div>
          )}
        </div>
      </div>

      {/* AI Assistant Modal */}
      <AiAssistantModal
        isOpen={aiModalOpen}
        onClose={() => setAiModalOpen(false)}
        targetField={aiTargetField}
        onApply={handleApplyAiText}
        userName={data.personal.name}
        userRole={data.personal.title}
      />

      {/* Toast Notification */}
      {toastMessage && (
        <div className="fixed bottom-6 right-6 z-50 bg-neutral-900 border border-indigo-500/50 text-white px-4 py-2.5 rounded-2xl shadow-2xl flex items-center gap-2.5 text-xs font-bold animate-in fade-in duration-200">
          <Check className="w-4 h-4 text-emerald-400" />
          <span>{toastMessage}</span>
        </div>
      )}
    </div>
  );
}

