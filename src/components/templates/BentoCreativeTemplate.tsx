import React, { useState } from 'react';
import { PortfolioData } from '../../types/portfolio';
import { PALETTE_CONFIG, FONT_CONFIG, getBorderRadiusClass } from '../../utils/themeHelper';
import { Sparkles, ArrowUpRight, Github, Mail, MapPin, Layers, Award, Star, Compass, HeartHandshake, Copy, Check } from 'lucide-react';

interface Props {
  data: PortfolioData;
}

export const BentoCreativeTemplate: React.FC<Props> = ({ data }) => {
  const { personal, socials, skills, projects, experience, education, testimonials, customSections, themeConfig } = data;
  const palette = PALETTE_CONFIG[themeConfig.colorPalette] || PALETTE_CONFIG.violet;
  const font = FONT_CONFIG[themeConfig.fontPairing] || FONT_CONFIG.display;
  const radius = getBorderRadiusClass(themeConfig.borderRadius);
  const isDark = themeConfig.mode !== 'light';

  const [copied, setCopied] = useState(false);

  const handleCopyEmail = () => {
    navigator.clipboard.writeText(personal.email);
    setCopied(true);
    setTimeout(() => setCopied(false), 2500);
  };

  const bg = isDark ? 'bg-neutral-950 text-neutral-100' : 'bg-neutral-100 text-neutral-900';
  const bentoCard = isDark ? 'bg-neutral-900/80 border-neutral-800 hover:border-neutral-700' : 'bg-white border-neutral-200/90 shadow-xs hover:border-neutral-300';
  const subText = isDark ? 'text-neutral-400' : 'text-neutral-600';

  return (
    <div className={`min-h-full ${bg} ${font.bodyClass} p-3 sm:p-6 lg:p-8 space-y-4 sm:space-y-6 transition-colors duration-300 selection:bg-violet-500 selection:text-white`}>
      {/* Top Floating Navbar */}
      <nav className={`max-w-6xl mx-auto p-3 sm:p-4 ${radius} ${bentoCard} border flex items-center justify-between backdrop-blur-md sticky top-2 sm:top-4 z-40`}>
        <div className="flex items-center gap-2.5 min-w-0">
          <div className="w-7 h-7 sm:w-8 sm:h-8 rounded-full bg-gradient-to-tr from-violet-500 to-fuchsia-500 flex items-center justify-center text-white font-bold text-xs shadow-md shrink-0">
            {personal.name.slice(0, 1)}
          </div>
          <div className="truncate">
            <span className={`font-bold text-xs sm:text-sm truncate block ${font.headingClass}`}>{personal.name}</span>
            <span className="text-[10px] text-violet-400 font-medium block leading-none">Bento Studio</span>
          </div>
        </div>

        <div className="flex items-center gap-2 sm:gap-3 text-xs font-semibold shrink-0">
          {personal.availableForWork && (
            <span className="hidden sm:inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-emerald-500/10 text-emerald-400 border border-emerald-500/20 text-xs">
              <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse"></span> Open to Roles
            </span>
          )}
          <a href="#contact" className={`px-3 sm:px-4 py-1.5 sm:py-2 ${radius} ${palette.primary} text-xs font-bold transition-transform hover:scale-105 shadow-xs`}>
            Let's Talk
          </a>
        </div>
      </nav>

      {/* Bento Grid Layout */}
      <main className="max-w-6xl mx-auto grid grid-cols-1 md:grid-cols-12 gap-3 sm:gap-5">
        
        {/* Bento Hero Card */}
        <div className={`md:col-span-8 p-5 sm:p-8 lg:p-10 ${radius} ${bentoCard} border flex flex-col justify-between relative overflow-hidden group`}>
          <div className="absolute top-0 right-0 w-80 h-80 bg-violet-500/10 rounded-full blur-3xl pointer-events-none" />
          
          <div className="space-y-3 sm:space-y-4 relative z-10">
            <span className={`inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-[11px] sm:text-xs font-bold ${palette.badgeBg}`}>
              <Sparkles className="w-3.5 h-3.5" /> Product & Experience Designer
            </span>
            <h1 className={`text-2xl sm:text-4xl lg:text-5xl font-black tracking-tight leading-[1.15] ${font.headingClass}`}>
              Crafting <span className="bg-gradient-to-r from-violet-400 to-fuchsia-400 bg-clip-text text-transparent">memorable products</span> & digital universes.
            </h1>
            <p className={`text-xs sm:text-base ${subText} max-w-xl leading-relaxed font-sans`}>
              {personal.tagline}
            </p>
          </div>

          <div className="flex flex-wrap items-center gap-2.5 sm:gap-3 pt-6 relative z-10">
            <a href="#contact" className={`px-4 sm:px-5 py-2 sm:py-2.5 ${radius} ${palette.primary} font-bold text-xs flex items-center gap-1.5 shadow-lg`}>
              Hire Me <ArrowUpRight className="w-3.5 h-3.5" />
            </a>
            {personal.resumeUrl && (
              <a href={personal.resumeUrl} target="_blank" rel="noreferrer" className={`px-3.5 sm:px-4 py-2 sm:py-2.5 ${radius} border border-neutral-700/60 hover:bg-neutral-800 text-xs font-semibold transition-colors`}>
                Resume
              </a>
            )}
            <div className={`flex items-center gap-1.5 text-xs ${subText} ml-auto font-medium`}>
              <MapPin className="w-3.5 h-3.5 text-violet-400" /> {personal.location}
            </div>
          </div>
        </div>

        {/* Bento Avatar & Status Card */}
        <div className={`md:col-span-4 p-5 sm:p-6 ${radius} ${bentoCard} border flex flex-col items-center justify-between text-center relative group`}>
          {personal.avatar && (
            <div className="relative">
              <img
                src={personal.avatar}
                alt={personal.name}
                className={`w-24 h-24 sm:w-36 sm:h-36 rounded-full object-cover border-4 ${isDark ? 'border-neutral-800' : 'border-white'} shadow-2xl group-hover:scale-105 transition-transform duration-300`}
              />
              <span className="absolute bottom-1 right-1 w-4 h-4 sm:w-5 sm:h-5 rounded-full bg-emerald-500 border-2 border-neutral-900"></span>
            </div>
          )}
          <div className="mt-3 space-y-0.5">
            <h3 className={`font-bold text-base sm:text-lg ${font.headingClass}`}>{personal.name}</h3>
            <p className={`text-xs ${subText}`}>{personal.title}</p>
          </div>
          <div className={`w-full grid grid-cols-2 gap-2 mt-3 pt-3 border-t ${isDark ? 'border-neutral-800' : 'border-neutral-200'}`}>
            <div className="p-2 rounded-xl bg-neutral-800/40">
              <span className="text-lg sm:text-xl font-extrabold text-violet-400">{personal.yearsOfExperience}+</span>
              <p className="text-[10px] text-neutral-400 uppercase">Years</p>
            </div>
            <div className="p-2 rounded-xl bg-neutral-800/40">
              <span className="text-lg sm:text-xl font-extrabold text-violet-400">{personal.completedProjects}+</span>
              <p className="text-[10px] text-neutral-400 uppercase">Projects</p>
            </div>
          </div>
        </div>

        {/* Bento Skills Matrix */}
        <div className={`md:col-span-6 p-5 sm:p-6 ${radius} ${bentoCard} border space-y-3 sm:space-y-4`}>
          <div className="flex items-center justify-between">
            <h2 className={`font-bold text-sm sm:text-base ${font.headingClass} flex items-center gap-2`}>
              <Layers className="w-4 h-4 text-violet-400" /> Toolkit & Skills
            </h2>
            <span className="text-[10px] sm:text-xs text-neutral-500 font-mono">Expertise</span>
          </div>

          <div className="flex flex-wrap gap-1.5 sm:gap-2">
            {skills.map((s) => (
              <span key={s.id} className={`px-2.5 sm:px-3 py-1 sm:py-1.5 ${radius} text-xs font-semibold ${isDark ? 'bg-neutral-800/90 text-neutral-200 border border-neutral-700/60' : 'bg-neutral-100 text-neutral-800 border border-neutral-300'} flex items-center gap-1.5 hover:scale-105 transition-transform`}>
                <span className="w-1.5 h-1.5 rounded-full bg-violet-400"></span>
                {s.name}
              </span>
            ))}
          </div>
        </div>

        {/* Bento About Bio */}
        <div className={`md:col-span-6 p-5 sm:p-6 ${radius} ${bentoCard} border flex flex-col justify-between space-y-3`}>
          <div>
            <h2 className={`font-bold text-sm sm:text-base ${font.headingClass} flex items-center gap-2 mb-1.5`}>
              <Compass className="w-4 h-4 text-violet-400" /> Story & Vision
            </h2>
            <p className={`text-xs sm:text-sm ${subText} leading-relaxed font-sans`}>
              {personal.bio}
            </p>
          </div>
          <div className="flex items-center gap-3 pt-2 text-xs font-medium text-violet-400">
            <span className="flex items-center gap-1"><HeartHandshake className="w-3.5 h-3.5" /> {personal.satisfiedClients}+ Clients</span>
            <span>&bull;</span>
            <span>Worldwide Remote</span>
          </div>
        </div>

        {/* Bento Projects Showcase */}
        {projects.map((p, idx) => (
          <div
            key={p.id}
            className={`${idx === 0 ? 'md:col-span-8' : 'md:col-span-4'} p-4 sm:p-6 ${radius} ${bentoCard} border flex flex-col justify-between overflow-hidden group`}
          >
            {p.imageUrl && (
              <div className="relative aspect-video rounded-xl overflow-hidden mb-3 border border-neutral-700/40">
                <img src={p.imageUrl} alt={p.title} className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500" />
                {p.metrics && (
                  <span className="absolute top-2 right-2 text-[10px] font-bold px-2 py-0.5 rounded-full bg-black/80 text-white backdrop-blur-md">
                    {p.metrics}
                  </span>
                )}
              </div>
            )}

            <div className="space-y-1.5">
              <span className="text-[10px] font-bold uppercase tracking-wider text-violet-400">{p.category}</span>
              <h3 className={`text-base sm:text-lg font-bold ${font.headingClass}`}>{p.title}</h3>
              <p className={`text-xs ${subText} line-clamp-2 leading-relaxed`}>{p.description}</p>
            </div>

            <div className="flex items-center justify-between pt-3 mt-2 border-t border-neutral-800">
              <div className="flex gap-1 flex-wrap">
                {p.tags.slice(0, 3).map((t) => (
                  <span key={t} className="text-[10px] px-1.5 py-0.5 rounded bg-neutral-800 text-neutral-400">{t}</span>
                ))}
              </div>
              {p.liveUrl && (
                <a href={p.liveUrl} target="_blank" rel="noreferrer" className="text-xs font-bold text-violet-400 hover:text-violet-300 flex items-center gap-1">
                  View <ArrowUpRight className="w-3.5 h-3.5" />
                </a>
              )}
            </div>
          </div>
        ))}

        {/* Bento Testimonial / Recommendation */}
        {testimonials.length > 0 && (
          <div className={`md:col-span-12 p-5 sm:p-8 ${radius} ${bentoCard} border space-y-3 sm:space-y-4`}>
            <div className="flex items-center gap-2">
              <Star className="w-4 h-4 fill-amber-400 text-amber-400" />
              <h3 className={`font-bold text-sm sm:text-base ${font.headingClass}`}>Client Words</h3>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-3 sm:gap-4">
              {testimonials.map((t) => (
                <div key={t.id} className="p-3.5 sm:p-4 rounded-xl bg-neutral-800/30 border border-neutral-700/40 space-y-2.5">
                  <p className={`text-xs italic ${subText} leading-relaxed`}>"{t.text}"</p>
                  <div className="flex items-center gap-2.5">
                    {t.avatar && <img src={t.avatar} alt={t.clientName} className="w-7 h-7 rounded-full object-cover" />}
                    <div>
                      <p className="text-xs font-bold">{t.clientName}</p>
                      <p className="text-[10px] text-neutral-400">{t.role}, {t.company}</p>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Bento Footer CTA */}
        <div id="contact" className={`md:col-span-12 p-6 sm:p-12 ${radius} ${bentoCard} border text-center space-y-3 sm:space-y-4 bg-gradient-to-br from-violet-950/40 via-neutral-900 to-neutral-950`}>
          <h2 className={`text-2xl sm:text-3xl font-extrabold ${font.headingClass}`}>Ready to collaborate?</h2>
          <p className={`text-xs sm:text-sm ${subText} max-w-md mx-auto`}>
            Drop a message and let's craft something unforgettable together.
          </p>
          <div className="pt-2">
            <button
              onClick={handleCopyEmail}
              className={`inline-flex items-center gap-2 px-6 sm:px-8 py-2.5 sm:py-3.5 ${radius} ${palette.primary} font-bold text-xs sm:text-sm shadow-xl hover:scale-105 transition-transform cursor-pointer`}
            >
              <Mail className="w-4 h-4" />
              <span>{personal.email}</span>
              {copied ? <Check className="w-3.5 h-3.5 text-emerald-300" /> : <Copy className="w-3.5 h-3.5 opacity-60" />}
            </button>
          </div>
          <div className="flex justify-center gap-4 sm:gap-6 text-xs text-neutral-400 pt-3">
            {socials.github && <a href={socials.github} target="_blank" rel="noreferrer" className="hover:text-white">GitHub</a>}
            {socials.linkedin && <a href={socials.linkedin} target="_blank" rel="noreferrer" className="hover:text-white">LinkedIn</a>}
            {socials.twitter && <a href={socials.twitter} target="_blank" rel="noreferrer" className="hover:text-white">Twitter</a>}
          </div>
        </div>

      </main>
    </div>
  );
};

