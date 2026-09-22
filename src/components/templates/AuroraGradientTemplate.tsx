import React, { useState } from 'react';
import { PortfolioData } from '../../types/portfolio';
import { PALETTE_CONFIG, FONT_CONFIG, getBorderRadiusClass } from '../../utils/themeHelper';
import { Sparkles, ArrowUpRight, Github, Mail, MapPin, Star, Copy, Check } from 'lucide-react';

interface Props {
  data: PortfolioData;
}

export const AuroraGradientTemplate: React.FC<Props> = ({ data }) => {
  const { personal, socials, skills, projects, experience, education, testimonials, themeConfig } = data;
  const radius = getBorderRadiusClass(themeConfig.borderRadius);
  const [copied, setCopied] = useState(false);

  const handleCopyEmail = () => {
    navigator.clipboard.writeText(personal.email);
    setCopied(true);
    setTimeout(() => setCopied(false), 2500);
  };

  return (
    <div className="min-h-full bg-slate-950 text-slate-100 font-sans relative overflow-hidden selection:bg-fuchsia-500 selection:text-white">
      {/* Aurora Ambient Mesh */}
      <div className="absolute top-0 left-1/4 w-72 sm:w-[500px] h-72 sm:h-[500px] bg-gradient-to-tr from-fuchsia-600/20 via-purple-600/20 to-cyan-500/20 rounded-full blur-3xl pointer-events-none" />
      <div className="absolute top-1/2 right-0 w-72 sm:w-[600px] h-72 sm:h-[600px] bg-gradient-to-br from-cyan-600/20 via-blue-600/20 to-purple-600/20 rounded-full blur-3xl pointer-events-none" />

      {/* Glass Header */}
      <header className="sticky top-2 sm:top-4 z-40 max-w-5xl mx-auto px-3 sm:px-4">
        <div className="backdrop-blur-xl bg-white/5 border border-white/10 p-3 sm:p-4 rounded-2xl flex items-center justify-between shadow-2xl">
          <div className="flex items-center gap-2 sm:gap-3 min-w-0">
            <span className="w-2.5 h-2.5 sm:w-3 sm:h-3 rounded-full bg-gradient-to-tr from-fuchsia-500 to-cyan-400 shrink-0"></span>
            <span className="font-bold text-xs sm:text-sm tracking-tight truncate">{personal.name}</span>
          </div>
          <a href="#contact" className="px-3.5 sm:px-4 py-1.5 rounded-full bg-gradient-to-r from-fuchsia-500 to-cyan-500 text-white font-bold text-xs shadow-lg hover:opacity-90 transition-opacity shrink-0">
            Connect
          </a>
        </div>
      </header>

      {/* Main Content */}
      <main className="max-w-5xl mx-auto px-4 sm:px-6 py-8 sm:py-16 space-y-16 sm:space-y-24 relative z-10">
        {/* Aurora Hero */}
        <section className="text-center space-y-4 sm:space-y-6 pt-4 sm:pt-10">
          {personal.availableForWork && (
            <div className="inline-flex items-center gap-1.5 sm:gap-2 px-3 sm:px-4 py-1 sm:py-1.5 rounded-full bg-white/5 border border-white/15 text-cyan-300 text-[11px] sm:text-xs font-medium backdrop-blur-md">
              <Sparkles className="w-3.5 h-3.5" />
              {personal.statusText || 'Available for creative direction'}
            </div>
          )}

          {personal.avatar && (
            <div className="relative inline-block mx-auto">
              <div className="absolute -inset-1 rounded-full bg-gradient-to-r from-fuchsia-500 via-purple-500 to-cyan-400 blur-md opacity-75"></div>
              <img src={personal.avatar} alt={personal.name} className="relative w-24 h-24 sm:w-36 sm:h-36 rounded-full object-cover border-2 border-white/20 shadow-2xl" />
            </div>
          )}

          <h1 className="text-3xl sm:text-6xl lg:text-7xl font-extrabold tracking-tight bg-gradient-to-r from-white via-fuchsia-100 to-cyan-200 bg-clip-text text-transparent leading-tight">
            {personal.name}
          </h1>

          <p className="text-lg sm:text-2xl font-medium text-cyan-300 max-w-2xl mx-auto">
            {personal.title}
          </p>

          <p className="text-xs sm:text-base text-slate-300 max-w-xl mx-auto leading-relaxed">
            {personal.tagline}
          </p>

          <div className="flex flex-wrap items-center justify-center gap-3 pt-2 sm:pt-4">
            <a href="#contact" className="px-5 sm:px-6 py-2.5 sm:py-3 rounded-full bg-gradient-to-r from-fuchsia-500 to-cyan-500 text-white font-bold text-xs sm:text-sm shadow-xl hover:opacity-90 transition-opacity">
              Start a Project
            </a>
            {personal.resumeUrl && (
              <a href={personal.resumeUrl} target="_blank" rel="noreferrer" className="px-5 sm:px-6 py-2.5 sm:py-3 rounded-full bg-white/5 border border-white/10 hover:bg-white/10 text-xs sm:text-sm font-medium transition-colors">
                View Resume
              </a>
            )}
          </div>
        </section>

        {/* Skills Tags Glow */}
        <section className="space-y-4 sm:space-y-6">
          <h2 className="text-xl sm:text-2xl font-bold tracking-tight text-center">Design & Tech Stacks</h2>
          <div className="flex flex-wrap justify-center gap-2 sm:gap-3">
            {skills.map((s) => (
              <span key={s.id} className="px-3 sm:px-4 py-1.5 sm:py-2 rounded-2xl bg-white/5 border border-white/10 text-xs font-semibold text-slate-200 backdrop-blur-md hover:border-cyan-400/50 hover:bg-white/10 transition-all">
                {s.name} <span className="text-cyan-400 ml-1">({s.level}%)</span>
              </span>
            ))}
          </div>
        </section>

        {/* Projects Cards Frosted */}
        <section className="space-y-6 sm:space-y-8">
          <h2 className="text-2xl sm:text-3xl font-bold tracking-tight text-center">Selected Artworks & Platforms</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 sm:gap-8">
            {projects.map((p) => (
              <div key={p.id} className="backdrop-blur-xl bg-white/5 border border-white/10 rounded-2xl sm:rounded-3xl overflow-hidden hover:border-fuchsia-400/40 transition-all flex flex-col justify-between group shadow-xl">
                {p.imageUrl && (
                  <div className="relative aspect-video overflow-hidden">
                    <img src={p.imageUrl} alt={p.title} className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500" />
                    {p.metrics && (
                      <span className="absolute top-2.5 right-2.5 sm:top-3 sm:right-3 text-[10px] sm:text-xs font-bold px-2.5 py-0.5 sm:px-3 sm:py-1 rounded-full bg-black/60 text-cyan-300 backdrop-blur-md border border-white/10">
                        {p.metrics}
                      </span>
                    )}
                  </div>
                )}
                <div className="p-4 sm:p-6 space-y-2.5 sm:space-y-3 flex-1 flex flex-col justify-between">
                  <div>
                    <span className="text-[11px] sm:text-xs font-semibold text-fuchsia-400 uppercase">{p.category}</span>
                    <h3 className="text-base sm:text-xl font-bold mt-0.5">{p.title}</h3>
                    <p className="text-xs sm:text-sm text-slate-300 mt-1 sm:mt-2 leading-relaxed">{p.description}</p>
                  </div>
                  <div className="flex items-center justify-between pt-3 border-t border-white/10">
                    <div className="flex gap-1.5 flex-wrap">
                      {p.tags.slice(0, 3).map((t) => (
                        <span key={t} className="text-[10px] px-2 py-0.5 rounded-full bg-white/5 text-slate-300">{t}</span>
                      ))}
                    </div>
                    {p.liveUrl && (
                      <a href={p.liveUrl} target="_blank" rel="noreferrer" className="text-xs font-bold text-cyan-300 flex items-center gap-1 hover:underline">
                        Explore <ArrowUpRight className="w-3.5 h-3.5" />
                      </a>
                    )}
                  </div>
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* Footer */}
        <footer id="contact" className="backdrop-blur-xl bg-white/5 border border-white/10 rounded-2xl sm:rounded-3xl p-6 sm:p-12 text-center space-y-3 sm:space-y-4">
          <h2 className="text-2xl sm:text-4xl font-bold bg-gradient-to-r from-fuchsia-200 to-cyan-200 bg-clip-text text-transparent">Let's create the impossible</h2>
          <p className="text-xs sm:text-sm text-slate-300 max-w-md mx-auto">Direct email inquiry & commission requests.</p>
          <div className="pt-2">
            <button
              onClick={handleCopyEmail}
              className="inline-flex items-center gap-2 px-6 sm:px-8 py-2.5 sm:py-3.5 rounded-full bg-gradient-to-r from-fuchsia-500 to-cyan-500 text-white font-bold text-xs sm:text-sm shadow-xl cursor-pointer"
            >
              <Mail className="w-4 h-4" />
              <span>{personal.email}</span>
              {copied ? <Check className="w-3.5 h-3.5 text-cyan-200" /> : <Copy className="w-3.5 h-3.5 opacity-60" />}
            </button>
          </div>
        </footer>
      </main>
    </div>
  );
};

