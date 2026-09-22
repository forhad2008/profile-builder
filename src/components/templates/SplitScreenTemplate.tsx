import React, { useState } from 'react';
import { PortfolioData } from '../../types/portfolio';
import { PALETTE_CONFIG, FONT_CONFIG, getBorderRadiusClass } from '../../utils/themeHelper';
import { Github, Mail, MapPin, ArrowUpRight, CheckCircle2, Star, Award, Copy, Check } from 'lucide-react';

interface Props {
  data: PortfolioData;
}

export const SplitScreenTemplate: React.FC<Props> = ({ data }) => {
  const { personal, socials, skills, projects, experience, education, testimonials, themeConfig } = data;
  const palette = PALETTE_CONFIG[themeConfig.colorPalette] || PALETTE_CONFIG.indigo;
  const radius = getBorderRadiusClass(themeConfig.borderRadius);
  const isDark = themeConfig.mode !== 'light';
  const [copied, setCopied] = useState(false);

  const bg = isDark ? 'bg-slate-950 text-slate-100' : 'bg-slate-50 text-slate-900';
  const card = isDark ? 'bg-slate-900/70 border-slate-800' : 'bg-white border-slate-200 shadow-xs';
  const subText = isDark ? 'text-slate-400' : 'text-slate-600';

  const handleCopyEmail = () => {
    navigator.clipboard.writeText(personal.email);
    setCopied(true);
    setTimeout(() => setCopied(false), 2500);
  };

  return (
    <div className={`min-h-full ${bg} font-sans selection:bg-indigo-500 selection:text-white`}>
      <div className="max-w-7xl mx-auto lg:flex lg:justify-between lg:gap-8 px-4 sm:px-8 lg:px-10 py-6 sm:py-10 lg:py-16">
        
        {/* Left Sticky Column */}
        <aside className="lg:w-5/12 lg:sticky lg:top-16 lg:h-[calc(100vh-8rem)] flex flex-col justify-between py-2 sm:py-6 space-y-6 sm:space-y-8">
          <div className="space-y-4 sm:space-y-6">
            {personal.avatar && (
              <img
                src={personal.avatar}
                alt={personal.name}
                className={`w-20 h-20 sm:w-28 sm:h-28 rounded-2xl object-cover border-2 ${isDark ? 'border-slate-800' : 'border-slate-200'} shadow-lg`}
              />
            )}

            <div>
              <h1 className="text-2xl sm:text-4xl lg:text-5xl font-extrabold tracking-tight">
                {personal.name}
              </h1>
              <h2 className={`text-base sm:text-xl font-semibold ${palette.accentText} mt-1.5`}>
                {personal.title}
              </h2>
              <p className={`text-xs sm:text-sm ${subText} mt-2 sm:mt-3 leading-relaxed`}>
                {personal.tagline}
              </p>
            </div>

            {/* Quick Navigation Anchor Links (hidden on mobile, visible on desktop) */}
            <nav className="hidden lg:flex flex-col space-y-2 text-xs font-bold uppercase tracking-wider">
              <a href="#about" className={`${subText} hover:text-current transition-colors`}>// 01. About</a>
              <a href="#projects" className={`${subText} hover:text-current transition-colors`}>// 02. Projects</a>
              <a href="#skills" className={`${subText} hover:text-current transition-colors`}>// 03. Skills</a>
              <a href="#experience" className={`${subText} hover:text-current transition-colors`}>// 04. Experience</a>
              <a href="#contact" className={`${subText} hover:text-current transition-colors`}>// 05. Contact</a>
            </nav>
          </div>

          <div className="space-y-3 pt-2">
            <div className={`flex items-center gap-2 text-xs ${subText}`}>
              <MapPin className="w-3.5 h-3.5 text-indigo-400" /> {personal.location}
            </div>
            <div className="flex items-center gap-3 text-slate-400">
              {socials.github && <a href={socials.github} target="_blank" rel="noreferrer" className="hover:text-white"><Github className="w-4 h-4" /></a>}
              <button onClick={handleCopyEmail} className="hover:text-white flex items-center gap-1 text-xs cursor-pointer">
                <Mail className="w-4 h-4" />
                <span className="text-[11px] font-mono">{personal.email}</span>
                {copied ? <Check className="w-3 h-3 text-emerald-400" /> : <Copy className="w-3 h-3 opacity-60" />}
              </button>
            </div>
          </div>
        </aside>

        {/* Right Scrollable Story Feed */}
        <main className="lg:w-7/12 space-y-12 sm:space-y-20 pt-8 lg:pt-6">
          {/* About */}
          <section id="about" className="space-y-3 sm:space-y-4">
            <h3 className="text-xs font-mono uppercase tracking-widest text-indigo-400">About Me</h3>
            <p className={`text-xs sm:text-base ${subText} leading-relaxed`}>
              {personal.bio}
            </p>
          </section>

          {/* Projects */}
          <section id="projects" className="space-y-4 sm:space-y-6">
            <h3 className="text-xs font-mono uppercase tracking-widest text-indigo-400">Selected Work</h3>
            <div className="space-y-4 sm:space-y-6">
              {projects.map((p) => (
                <div key={p.id} className={`p-4 sm:p-6 ${radius} ${card} border space-y-3 sm:space-y-4 hover:border-indigo-500/40 transition-all group`}>
                  {p.imageUrl && (
                    <div className="aspect-video rounded-xl overflow-hidden">
                      <img src={p.imageUrl} alt={p.title} className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500" />
                    </div>
                  )}
                  <div className="flex justify-between items-start">
                    <div>
                      <span className="text-[10px] font-mono text-indigo-400 uppercase">{p.category}</span>
                      <h4 className="text-base sm:text-lg font-bold mt-0.5">{p.title}</h4>
                    </div>
                    {p.liveUrl && (
                      <a href={p.liveUrl} target="_blank" rel="noreferrer" className="text-xs font-bold text-indigo-400 flex items-center gap-1 hover:underline">
                        Live <ArrowUpRight className="w-3.5 h-3.5" />
                      </a>
                    )}
                  </div>
                  <p className={`text-xs sm:text-sm ${subText}`}>{p.description}</p>
                  <div className="flex flex-wrap gap-1.5 pt-1">
                    {p.tags.map((t) => (
                      <span key={t} className="text-[10px] px-2 py-0.5 rounded bg-slate-800 text-slate-300">{t}</span>
                    ))}
                  </div>
                </div>
              ))}
            </div>
          </section>

          {/* Skills */}
          <section id="skills" className="space-y-3 sm:space-y-4">
            <h3 className="text-xs font-mono uppercase tracking-widest text-indigo-400">Skills</h3>
            <div className="flex flex-wrap gap-1.5 sm:gap-2">
              {skills.map((s) => (
                <span key={s.id} className={`px-2.5 sm:px-3 py-1 sm:py-1.5 ${radius} text-xs font-semibold ${card} border`}>
                  {s.name} ({s.level}%)
                </span>
              ))}
            </div>
          </section>

          {/* Experience */}
          <section id="experience" className="space-y-4 sm:space-y-6">
            <h3 className="text-xs font-mono uppercase tracking-widest text-indigo-400">Experience</h3>
            <div className="space-y-4 sm:space-y-6">
              {experience.map((exp) => (
                <div key={exp.id} className="space-y-1.5 border-l-2 border-indigo-500/30 pl-3.5 sm:pl-4">
                  <div className="flex flex-col sm:flex-row sm:justify-between sm:items-baseline">
                    <h4 className="font-bold text-sm sm:text-base">{exp.role}</h4>
                    <span className="text-[10px] sm:text-xs font-mono text-slate-500">{exp.period}</span>
                  </div>
                  <p className="text-xs text-indigo-400">{exp.company}</p>
                  <p className={`text-xs sm:text-sm ${subText}`}>{exp.description}</p>
                </div>
              ))}
            </div>
          </section>

          {/* Contact */}
          <section id="contact" className={`p-6 sm:p-8 ${radius} ${card} border text-center space-y-3 sm:space-y-4`}>
            <h3 className="text-xl sm:text-2xl font-bold">Let's talk opportunities</h3>
            <button
              onClick={handleCopyEmail}
              className={`inline-flex items-center gap-2 px-6 py-2.5 sm:py-3 ${radius} ${palette.primary} font-bold text-xs uppercase tracking-wider cursor-pointer`}
            >
              <Mail className="w-3.5 h-3.5" />
              <span>{personal.email}</span>
              {copied ? <Check className="w-3.5 h-3.5" /> : <Copy className="w-3.5 h-3.5 opacity-70" />}
            </button>
          </section>
        </main>
      </div>
    </div>
  );
};

