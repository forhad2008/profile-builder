import React, { useState } from 'react';
import { PortfolioData } from '../../types/portfolio';
import { PALETTE_CONFIG, FONT_CONFIG, getBorderRadiusClass } from '../../utils/themeHelper';
import { MapPin, Mail, ArrowUpRight, Award, CheckCircle2, Shield, Copy, Check, Quote } from 'lucide-react';

interface Props {
  data: PortfolioData;
}

export const ExecutiveSerifTemplate: React.FC<Props> = ({ data }) => {
  const { personal, socials, skills, projects, experience, education, testimonials, customSections, themeConfig } = data;
  const font = FONT_CONFIG[themeConfig.fontPairing] || FONT_CONFIG.serif;
  const radius = getBorderRadiusClass(themeConfig.borderRadius);
  const isDark = themeConfig.mode !== 'light';
  const [copied, setCopied] = useState(false);

  const bg = isDark ? 'bg-stone-950 text-stone-100' : 'bg-stone-50 text-stone-900';
  const card = isDark ? 'bg-stone-900/60 border-stone-800' : 'bg-white border-stone-200 shadow-xs';
  const subText = isDark ? 'text-stone-400' : 'text-stone-600';
  const goldAccent = isDark ? 'text-amber-300' : 'text-amber-700';

  const handleCopyEmail = () => {
    navigator.clipboard.writeText(personal.email);
    setCopied(true);
    setTimeout(() => setCopied(false), 2500);
  };

  return (
    <div className={`min-h-full ${bg} font-sans selection:bg-amber-700 selection:text-white`}>
      {/* Executive Header */}
      <header className={`border-b ${isDark ? 'border-stone-800' : 'border-stone-200'} px-4 sm:px-6 py-4 sm:py-6`}>
        <div className="max-w-5xl mx-auto flex items-center justify-between gap-3">
          <div className="space-y-0.5">
            <span className={`text-lg sm:text-2xl font-serif tracking-wide font-normal ${goldAccent}`}>
              {personal.name}
            </span>
            <span className="text-[10px] sm:text-[11px] uppercase tracking-widest text-stone-400 block font-mono">
              Executive Dossier
            </span>
          </div>

          <div className="flex items-center gap-2 sm:gap-4 text-xs tracking-wider uppercase">
            <a href="#contact" className={`px-3 sm:px-4 py-1.5 sm:py-2 ${radius} border border-amber-600/40 text-amber-300 hover:bg-amber-600/10 transition-colors font-medium text-[11px] sm:text-xs`}>
              Contact Office
            </a>
          </div>
        </div>
      </header>

      {/* Main Executive Flow */}
      <main className="max-w-5xl mx-auto px-4 sm:px-6 py-8 sm:py-16 space-y-12 sm:space-y-24">
        {/* Hero */}
        <section className="space-y-6 sm:space-y-8">
          <div className="grid grid-cols-1 md:grid-cols-12 gap-6 sm:gap-8 items-center">
            <div className="md:col-span-8 space-y-4 sm:space-y-6">
              {personal.availableForWork && (
                <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-amber-950/40 border border-amber-800/40 text-amber-300 text-xs font-mono">
                  <Shield className="w-3.5 h-3.5" />
                  <span>{personal.statusText || 'Available for Board & Advisory Roles'}</span>
                </div>
              )}

              <h1 className="text-3xl sm:text-5xl lg:text-6xl font-serif leading-tight tracking-wide font-normal">
                {personal.title}
              </h1>

              <p className={`text-base sm:text-lg ${subText} leading-relaxed font-light italic font-serif`}>
                "{personal.tagline}"
              </p>

              <p className={`text-xs sm:text-base ${subText} leading-relaxed`}>
                {personal.bio}
              </p>

              <div className="flex flex-wrap items-center gap-4 sm:gap-6 pt-1 sm:pt-2 text-xs font-mono text-stone-400">
                <span className="flex items-center gap-1.5"><MapPin className="w-3.5 h-3.5 text-amber-500" /> {personal.location}</span>
                <button onClick={handleCopyEmail} className="flex items-center gap-1.5 hover:text-amber-300 cursor-pointer">
                  <Mail className="w-3.5 h-3.5 text-amber-500" />
                  <span>{personal.email}</span>
                  {copied ? <Check className="w-3 h-3 text-emerald-400" /> : <Copy className="w-3 h-3 opacity-60" />}
                </button>
              </div>
            </div>

            {/* Portrait */}
            {personal.avatar && (
              <div className="md:col-span-4 flex justify-center pt-4 md:pt-0">
                <div className="relative p-2 border border-stone-800 rounded-2xl bg-stone-900/40 shadow-2xl">
                  <img
                    src={personal.avatar}
                    alt={personal.name}
                    className="w-40 h-52 sm:w-48 sm:h-64 object-cover rounded-xl filter contrast-105"
                  />
                  <div className="absolute -bottom-3 left-1/2 -translate-x-1/2 px-3 sm:px-4 py-1 rounded-full bg-stone-900 border border-stone-700 text-[10px] sm:text-xs font-mono text-amber-300 whitespace-nowrap shadow-lg">
                    {personal.yearsOfExperience}+ Years Leadership
                  </div>
                </div>
              </div>
            )}
          </div>

          {/* Key Executive Stats */}
          <div className="grid grid-cols-3 gap-2 sm:gap-6 pt-6 sm:pt-10 border-t border-stone-800/80">
            <div>
              <p className={`text-2xl sm:text-4xl font-serif font-bold ${goldAccent}`}>{personal.yearsOfExperience}+</p>
              <p className="text-[9px] sm:text-xs font-mono uppercase tracking-widest text-stone-400 mt-1">Industry Tenure</p>
            </div>
            <div>
              <p className={`text-2xl sm:text-4xl font-serif font-bold ${goldAccent}`}>{personal.completedProjects}+</p>
              <p className="text-[9px] sm:text-xs font-mono uppercase tracking-widest text-stone-400 mt-1">Strategic Deployments</p>
            </div>
            <div>
              <p className={`text-2xl sm:text-4xl font-serif font-bold ${goldAccent}`}>{personal.satisfiedClients}+</p>
              <p className="text-[9px] sm:text-xs font-mono uppercase tracking-widest text-stone-400 mt-1">Enterprise Partners</p>
            </div>
          </div>
        </section>

        {/* Selected Initiatives / Projects */}
        <section className="space-y-6 sm:space-y-8">
          <div className="flex items-baseline justify-between border-b border-stone-800 pb-3 sm:pb-4">
            <h2 className="text-xl sm:text-3xl font-serif tracking-wide">Key Initiatives & Impact</h2>
            <span className="text-[10px] sm:text-xs font-mono text-stone-400">Selected Engagements</span>
          </div>

          <div className="space-y-4 sm:space-y-6">
            {projects.map((p) => (
              <div key={p.id} className={`p-4 sm:p-8 ${radius} ${card} border flex flex-col md:flex-row gap-4 sm:gap-6 justify-between items-start`}>
                <div className="space-y-2.5 sm:space-y-3 max-w-2xl">
                  <div className="flex items-center gap-2 sm:gap-3">
                    <span className="text-[10px] sm:text-xs font-mono uppercase tracking-widest text-amber-400">{p.category}</span>
                    {p.metrics && <span className="text-[10px] sm:text-xs font-mono px-2 py-0.5 rounded bg-amber-950/40 border border-amber-800/40 text-amber-300">{p.metrics}</span>}
                  </div>
                  <h3 className="text-lg sm:text-2xl font-serif font-bold">{p.title}</h3>
                  <p className={`text-xs sm:text-sm ${subText} leading-relaxed`}>{p.description}</p>
                  <div className="flex flex-wrap gap-1.5 sm:gap-2 pt-1 sm:pt-2">
                    {p.tags.map((t) => (
                      <span key={t} className="text-[10px] sm:text-[11px] font-mono px-2.5 py-0.5 rounded-full bg-stone-800 text-stone-300">{t}</span>
                    ))}
                  </div>
                </div>

                {p.liveUrl && (
                  <a href={p.liveUrl} target="_blank" rel="noreferrer" className="shrink-0 px-3.5 sm:px-4 py-1.5 sm:py-2 rounded-full border border-stone-700 hover:border-amber-400 text-xs font-mono flex items-center gap-1.5 transition-colors">
                    Executive Brief <ArrowUpRight className="w-3.5 h-3.5" />
                  </a>
                )}
              </div>
            ))}
          </div>
        </section>

        {/* Executive Experience Timeline */}
        <section className="space-y-6 sm:space-y-8">
          <div className="flex items-baseline justify-between border-b border-stone-800 pb-3 sm:pb-4">
            <h2 className="text-xl sm:text-3xl font-serif tracking-wide">Professional Leadership</h2>
            <span className="text-[10px] sm:text-xs font-mono text-stone-400">Career Trajectory</span>
          </div>

          <div className="space-y-6 sm:space-y-8">
            {experience.map((exp) => (
              <div key={exp.id} className="relative pl-5 sm:pl-6 border-l-2 border-amber-700/40 space-y-1.5 sm:space-y-2">
                <span className="absolute -left-[7px] top-1.5 w-3 h-3 rounded-full bg-amber-500 border-2 border-stone-950"></span>
                <div className="flex flex-wrap items-baseline justify-between gap-1 sm:gap-2">
                  <h3 className="text-base sm:text-xl font-serif font-bold">{exp.role}</h3>
                  <span className="text-[10px] sm:text-xs font-mono text-stone-400">{exp.period}</span>
                </div>
                <p className="text-xs font-mono uppercase tracking-wider text-amber-400">{exp.company} &bull; {exp.location}</p>
                <p className={`text-xs sm:text-sm ${subText} leading-relaxed pt-1`}>{exp.description}</p>
                {exp.achievements && exp.achievements.length > 0 && (
                  <ul className="space-y-1 sm:space-y-1.5 pt-2 text-xs text-stone-400">
                    {exp.achievements.map((ach, i) => (
                      <li key={i} className="flex items-start gap-2">
                        <CheckCircle2 className="w-3.5 h-3.5 text-amber-500 mt-0.5 shrink-0" />
                        <span>{ach}</span>
                      </li>
                    ))}
                  </ul>
                )}
              </div>
            ))}
          </div>
        </section>

        {/* Testimonials if present */}
        {testimonials && testimonials.length > 0 && (
          <section className="space-y-6 sm:space-y-8">
            <div className="flex items-baseline justify-between border-b border-stone-800 pb-3 sm:pb-4">
              <h2 className="text-xl sm:text-3xl font-serif tracking-wide">Endorsements</h2>
              <span className="text-[10px] sm:text-xs font-mono text-stone-400">Board & Executive Peers</span>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 sm:gap-6">
              {testimonials.map((t) => (
                <div key={t.id} className={`p-4 sm:p-6 ${radius} ${card} border space-y-3`}>
                  <Quote className="w-5 h-5 text-amber-500 opacity-60" />
                  <p className={`text-xs sm:text-sm italic ${subText} leading-relaxed`}>"{t.text}"</p>
                  <div className="pt-2 border-t border-stone-800/60">
                    <p className="text-xs font-serif font-bold text-amber-300">{t.clientName}</p>
                    <p className="text-[10px] font-mono text-stone-400">{t.role}, {t.company}</p>
                  </div>
                </div>
              ))}
            </div>
          </section>
        )}

        {/* Executive Inquiries */}
        <footer id="contact" className={`p-6 sm:p-12 ${radius} border border-amber-900/30 bg-stone-900/40 text-center space-y-3 sm:space-y-4`}>
          <h2 className="text-2xl sm:text-4xl font-serif tracking-wide">Direct Executive Inquiries</h2>
          <p className={`text-xs sm:text-sm ${subText} max-w-md mx-auto`}>
            For board candidacies, advisory retainers, or keynote speaking.
          </p>
          <div className="pt-2">
            <button
              onClick={handleCopyEmail}
              className="inline-flex items-center gap-2 px-6 sm:px-8 py-2.5 sm:py-3 rounded-full bg-amber-600 hover:bg-amber-500 text-stone-950 font-bold text-xs sm:text-sm transition-colors cursor-pointer"
            >
              <Mail className="w-4 h-4" />
              <span>{personal.email}</span>
              {copied ? <Check className="w-3.5 h-3.5" /> : <Copy className="w-3.5 h-3.5 opacity-70" />}
            </button>
          </div>
        </footer>
      </main>
    </div>
  );
};

