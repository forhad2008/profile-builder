import React, { useState } from 'react';
import { PortfolioData, ProjectItem } from '../../types/portfolio';
import { PALETTE_CONFIG, FONT_CONFIG, getBorderRadiusClass } from '../../utils/themeHelper';
import { Sparkles, ArrowUpRight, Github, Mail, MapPin, Eye, X, Filter, Copy, Check } from 'lucide-react';

interface Props {
  data: PortfolioData;
}

export const Showcase3DVisualTemplate: React.FC<Props> = ({ data }) => {
  const { personal, socials, skills, projects, experience, testimonials, themeConfig } = data;
  const radius = getBorderRadiusClass(themeConfig.borderRadius);
  const [selectedCategory, setSelectedCategory] = useState<string>('All');
  const [activeModalProject, setActiveModalProject] = useState<ProjectItem | null>(null);
  const [copied, setCopied] = useState(false);

  const categories = ['All', ...Array.from(new Set(projects.map((p) => p.category)))];
  const filteredProjects = selectedCategory === 'All' ? projects : projects.filter((p) => p.category === selectedCategory);

  const handleCopyEmail = () => {
    navigator.clipboard.writeText(personal.email);
    setCopied(true);
    setTimeout(() => setCopied(false), 2500);
  };

  return (
    <div className="min-h-full bg-neutral-950 text-neutral-100 font-sans selection:bg-rose-500 selection:text-white">
      {/* Visual Header */}
      <header className="sticky top-0 z-30 backdrop-blur-md bg-neutral-950/85 border-b border-neutral-800 px-4 sm:px-6 py-3.5 sm:py-4">
        <div className="max-w-7xl mx-auto flex items-center justify-between gap-3">
          <div className="flex items-center gap-2.5 min-w-0">
            <span className="w-3 h-3 rounded-full bg-rose-500 shadow-[0_0_10px_rgba(244,63,94,0.6)] shrink-0"></span>
            <span className="font-extrabold text-sm sm:text-base tracking-tight font-display-modern uppercase truncate">{personal.name}</span>
            <span className="hidden sm:inline-block text-[10px] uppercase font-mono px-2 py-0.5 rounded bg-neutral-900 border border-neutral-800 text-neutral-400">Visual Studio</span>
          </div>

          <a href="#contact" className={`px-3.5 sm:px-4 py-1.5 sm:py-2 ${radius} bg-rose-600 hover:bg-rose-500 text-white font-bold text-[11px] sm:text-xs uppercase tracking-wider transition-all shrink-0`}>
            Book Project
          </a>
        </div>
      </header>

      {/* Main Showcase */}
      <main className="max-w-7xl mx-auto px-4 sm:px-6 py-8 sm:py-16 space-y-12 sm:space-y-20">
        {/* Visual Hero */}
        <section className="text-center space-y-4 sm:space-y-6 max-w-4xl mx-auto">
          {personal.avatar && (
            <img
              src={personal.avatar}
              alt={personal.name}
              className="w-24 h-24 sm:w-36 sm:h-36 rounded-full mx-auto object-cover border-4 border-neutral-800 shadow-2xl"
            />
          )}

          <h1 className="text-3xl sm:text-6xl lg:text-7xl font-extrabold tracking-tight font-display-modern leading-[1.1]">
            {personal.title}
          </h1>

          <p className="text-sm sm:text-lg text-neutral-300 font-light leading-relaxed max-w-2xl mx-auto">
            {personal.tagline}
          </p>

          <div className="flex flex-wrap items-center justify-center gap-2 sm:gap-4 text-xs font-mono text-neutral-400 pt-1">
            <span>{personal.location}</span>
            <span>&bull;</span>
            <span className="text-rose-400">{personal.completedProjects}+ Projects</span>
            <span>&bull;</span>
            <span>{personal.yearsOfExperience}+ Years Experience</span>
          </div>
        </section>

        {/* Category Filter Pills (Horizontal scrolling on mobile) */}
        <div className="flex items-center justify-start sm:justify-center overflow-x-auto pb-2 gap-1.5 sm:gap-2">
          {categories.map((cat) => (
            <button
              key={cat}
              onClick={() => setSelectedCategory(cat)}
              className={`px-3.5 sm:px-4 py-1.5 sm:py-2 rounded-full text-xs font-bold whitespace-nowrap transition-all cursor-pointer ${
                selectedCategory === cat
                  ? 'bg-rose-600 text-white shadow-lg'
                  : 'bg-neutral-900 text-neutral-400 border border-neutral-800 hover:text-white'
              }`}
            >
              {cat}
            </button>
          ))}
        </div>

        {/* Large Media Gallery Grid */}
        <section className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6">
          {filteredProjects.map((p) => (
            <div
              key={p.id}
              onClick={() => setActiveModalProject(p)}
              className={`group relative aspect-4/3 rounded-2xl overflow-hidden bg-neutral-900 border border-neutral-800 cursor-pointer shadow-xl hover:border-rose-500/50 transition-all`}
            >
              {p.imageUrl && (
                <img
                  src={p.imageUrl}
                  alt={p.title}
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700"
                />
              )}
              {/* Overlay */}
              <div className="absolute inset-0 bg-gradient-to-t from-black/95 via-black/40 to-transparent p-4 sm:p-6 flex flex-col justify-end opacity-95 group-hover:opacity-100 transition-opacity">
                <span className="text-[10px] font-mono text-rose-400 uppercase tracking-wider">{p.category}</span>
                <h3 className="text-base sm:text-xl font-bold text-white mt-0.5 group-hover:text-rose-200 transition-colors flex items-center justify-between">
                  <span>{p.title}</span>
                  <ArrowUpRight className="w-4 h-4 opacity-75 group-hover:opacity-100 transition-opacity" />
                </h3>
                <p className="text-xs text-neutral-300 line-clamp-2 mt-1">{p.description}</p>
              </div>
            </div>
          ))}
        </section>

        {/* Skills Banner */}
        <section className="p-5 sm:p-8 rounded-2xl sm:rounded-3xl bg-neutral-900/60 border border-neutral-800 text-center space-y-4 sm:space-y-6">
          <h2 className="text-xl sm:text-2xl font-bold font-display-modern">Creative Disciplines</h2>
          <div className="flex flex-wrap justify-center gap-1.5 sm:gap-2 max-w-3xl mx-auto">
            {skills.map((s) => (
              <span key={s.id} className="px-3 py-1 sm:px-3.5 sm:py-1.5 rounded-full bg-neutral-800 text-xs font-semibold text-neutral-200 border border-neutral-700">
                {s.name} ({s.level}%)
              </span>
            ))}
          </div>
        </section>

        {/* Contact Footer */}
        <footer id="contact" className="text-center space-y-3 sm:space-y-4 pt-8 sm:pt-10 border-t border-neutral-800">
          <h2 className="text-2xl sm:text-3xl font-extrabold font-display-modern">Start a Visual Collaboration</h2>
          <p className="text-xs sm:text-sm text-neutral-400 max-w-md mx-auto">
            Available for art direction, visual design, 3D campaigns, and brand partnerships.
          </p>
          <div className="pt-2">
            <button
              onClick={handleCopyEmail}
              className="inline-flex items-center gap-2 px-6 sm:px-8 py-2.5 sm:py-3.5 rounded-full bg-rose-600 hover:bg-rose-500 text-white font-bold text-xs sm:text-sm shadow-xl cursor-pointer"
            >
              <Mail className="w-4 h-4" />
              <span>{personal.email}</span>
              {copied ? <Check className="w-3.5 h-3.5 text-rose-200" /> : <Copy className="w-3.5 h-3.5 opacity-60" />}
            </button>
          </div>
        </footer>
      </main>

      {/* Project Modal Details */}
      {activeModalProject && (
        <div className="fixed inset-0 z-50 bg-black/80 backdrop-blur-md flex items-center justify-center p-3 sm:p-4 overflow-y-auto">
          <div className="bg-neutral-900 border border-neutral-800 rounded-2xl sm:rounded-3xl max-w-2xl w-full p-4 sm:p-8 space-y-4 sm:space-y-6 relative overflow-hidden shadow-2xl my-auto">
            <button
              onClick={() => setActiveModalProject(null)}
              className="absolute top-3 right-3 sm:top-4 sm:right-4 p-2 rounded-full bg-neutral-800 text-neutral-400 hover:text-white cursor-pointer z-10"
            >
              <X className="w-5 h-5" />
            </button>

            {activeModalProject.imageUrl && (
              <div className="aspect-video rounded-xl sm:rounded-2xl overflow-hidden border border-neutral-800">
                <img src={activeModalProject.imageUrl} alt={activeModalProject.title} className="w-full h-full object-cover" />
              </div>
            )}

            <div className="space-y-2">
              <span className="text-xs font-mono uppercase text-rose-400">{activeModalProject.category}</span>
              <h3 className="text-xl sm:text-2xl font-bold font-display-modern">{activeModalProject.title}</h3>
              <p className="text-xs sm:text-sm text-neutral-300 leading-relaxed">{activeModalProject.description}</p>
              
              <div className="flex flex-wrap gap-1.5 pt-1">
                {activeModalProject.tags.map((t) => (
                  <span key={t} className="text-xs px-2.5 py-1 rounded bg-neutral-800 text-neutral-300">
                    {t}
                  </span>
                ))}
              </div>
            </div>

            <div className="flex items-center gap-3 pt-3 border-t border-neutral-800">
              {activeModalProject.liveUrl && (
                <a href={activeModalProject.liveUrl} target="_blank" rel="noreferrer" className="px-4 sm:px-5 py-2 sm:py-2.5 rounded-full bg-rose-600 text-white font-bold text-xs flex items-center gap-1.5">
                  View Live <ArrowUpRight className="w-3.5 h-3.5" />
                </a>
              )}
              {activeModalProject.githubUrl && (
                <a href={activeModalProject.githubUrl} target="_blank" rel="noreferrer" className="px-4 sm:px-5 py-2 sm:py-2.5 rounded-full border border-neutral-700 text-neutral-300 font-bold text-xs">
                  Source Link
                </a>
              )}
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

