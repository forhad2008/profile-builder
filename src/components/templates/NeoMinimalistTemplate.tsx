import React, { useState } from 'react';
import { PortfolioData } from '../../types/portfolio';
import { PALETTE_CONFIG, FONT_CONFIG, getBorderRadiusClass } from '../../utils/themeHelper';
import { ExternalLink, Github, Mail, MapPin, Briefcase, GraduationCap, Award, Star, ArrowUpRight, CheckCircle2, Copy, Check } from 'lucide-react';

interface Props {
  data: PortfolioData;
}

export const NeoMinimalistTemplate: React.FC<Props> = ({ data }) => {
  const { personal, socials, skills, projects, experience, education, testimonials, customSections, themeConfig } = data;
  const palette = PALETTE_CONFIG[themeConfig.colorPalette] || PALETTE_CONFIG.indigo;
  const font = FONT_CONFIG[themeConfig.fontPairing] || FONT_CONFIG.sans;
  const radius = getBorderRadiusClass(themeConfig.borderRadius);
  const isDark = themeConfig.mode !== 'light';

  const [copied, setCopied] = useState(false);

  const handleCopyEmail = () => {
    navigator.clipboard.writeText(personal.email);
    setCopied(true);
    setTimeout(() => setCopied(false), 2500);
  };

  const bgClass = isDark ? 'bg-zinc-950 text-zinc-100' : 'bg-zinc-50 text-zinc-900';
  const cardBg = isDark ? 'bg-zinc-900/70 border-zinc-800/80 hover:border-zinc-700/90' : 'bg-white border-zinc-200/90 hover:border-zinc-300 shadow-xs';
  const subText = isDark ? 'text-zinc-400' : 'text-zinc-600';
  const borderLine = isDark ? 'border-zinc-800/80' : 'border-zinc-200';

  return (
    <div className={`min-h-full ${bgClass} ${font.bodyClass} transition-colors duration-300 selection:bg-indigo-500 selection:text-white`}>
      {/* Top Header */}
      <header className={`sticky top-0 z-30 backdrop-blur-md ${isDark ? 'bg-zinc-950/85' : 'bg-white/85'} border-b ${borderLine} px-4 sm:px-6 py-3.5`}>
        <div className="max-w-5xl mx-auto flex items-center justify-between gap-3">
          <div className="flex items-center gap-2.5 min-w-0">
            <div className={`w-2.5 h-2.5 rounded-full shrink-0 ${palette.primary.split(' ')[0]}`}></div>
            <span className={`font-bold tracking-tight text-sm sm:text-base truncate ${font.headingClass}`}>{personal.name}</span>
            <span className={`text-[10px] px-2 py-0.5 rounded-full ${isDark ? 'bg-zinc-800 text-zinc-300' : 'bg-zinc-200 text-zinc-700'} hidden md:inline-block font-mono`}>
              {personal.title.split('&')[0] || personal.title}
            </span>
          </div>

          <nav className="flex items-center gap-2 sm:gap-4 text-xs font-medium uppercase tracking-wider shrink-0">
            <div className="hidden sm:flex items-center gap-4">
              {themeConfig.showSections.about && <a href="#about" className={`${subText} hover:text-current transition-colors text-[11px]`}>About</a>}
              {themeConfig.showSections.skills && <a href="#skills" className={`${subText} hover:text-current transition-colors text-[11px]`}>Skills</a>}
              {themeConfig.showSections.projects && <a href="#projects" className={`${subText} hover:text-current transition-colors text-[11px]`}>Work</a>}
              {themeConfig.showSections.experience && <a href="#experience" className={`${subText} hover:text-current transition-colors text-[11px]`}>Timeline</a>}
            </div>

            {themeConfig.showSections.contact && (
              <a
                href="#contact"
                className={`px-3 py-1.5 ${radius} ${palette.primary} text-[11px] sm:text-xs font-bold uppercase tracking-wider transition-opacity shadow-xs`}
              >
                Get in Touch
              </a>
            )}
          </nav>
        </div>
      </header>

      {/* Main Container */}
      <main className="max-w-5xl mx-auto px-4 sm:px-6 py-8 sm:py-16 space-y-14 sm:space-y-20">
        {/* Hero Section */}
        {themeConfig.showSections.hero && (
          <section id="about" className="space-y-6 sm:space-y-8">
            <div className="flex flex-col-reverse sm:flex-row items-start sm:items-center gap-6 sm:gap-8 justify-between">
              <div className="space-y-3 sm:space-y-4 max-w-2xl flex-1">
                {personal.availableForWork && (
                  <div className={`inline-flex items-center gap-2 px-3 py-1 ${radius} text-[11px] sm:text-xs font-semibold ${isDark ? 'bg-emerald-950/60 text-emerald-300 border border-emerald-800/50' : 'bg-emerald-50 text-emerald-700 border border-emerald-200'}`}>
                    <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse"></span>
                    {personal.statusText || 'Available for projects'}
                  </div>
                )}

                <h1 className={`text-3xl sm:text-5xl lg:text-6xl font-extrabold tracking-tight leading-[1.1] ${font.headingClass}`}>
                  {personal.name}
                </h1>

                <p className={`text-base sm:text-xl font-semibold ${palette.accentText}`}>
                  {personal.title}
                </p>

                <p className={`text-sm sm:text-base ${subText} leading-relaxed font-normal`}>
                  {personal.tagline}
                </p>

                <p className={`text-xs sm:text-sm ${subText} leading-relaxed`}>
                  {personal.bio}
                </p>

                {/* Location & Quick Meta */}
                <div className={`flex flex-wrap items-center gap-3 sm:gap-4 text-xs ${subText} pt-1`}>
                  <span className="flex items-center gap-1.5"><MapPin className="w-3.5 h-3.5 text-indigo-400" /> {personal.location}</span>
                  <button
                    onClick={handleCopyEmail}
                    className="flex items-center gap-1.5 hover:text-indigo-400 transition-colors cursor-pointer"
                    title="Click to copy email"
                  >
                    <Mail className="w-3.5 h-3.5 text-indigo-400" />
                    <span>{personal.email}</span>
                    {copied ? <Check className="w-3 h-3 text-emerald-400" /> : <Copy className="w-3 h-3 opacity-50" />}
                  </button>
                </div>

                {/* CTAs */}
                <div className="flex flex-wrap items-center gap-2.5 sm:gap-3 pt-3">
                  <a href="#contact" className={`px-4 sm:px-5 py-2 sm:py-2.5 ${radius} ${palette.primary} font-bold text-xs sm:text-sm shadow-md transition-all flex items-center gap-1.5`}>
                    Get in touch <ArrowUpRight className="w-3.5 h-3.5" />
                  </a>
                  {personal.resumeUrl && (
                    <a href={personal.resumeUrl} target="_blank" rel="noreferrer" className={`px-4 sm:px-5 py-2 sm:py-2.5 ${radius} border ${borderLine} hover:bg-zinc-500/10 font-semibold text-xs sm:text-sm transition-colors flex items-center gap-1.5`}>
                      Resume PDF
                    </a>
                  )}
                </div>
              </div>

              {/* Avatar Photo */}
              {personal.avatar && (
                <div className="relative shrink-0 mx-auto sm:mx-0">
                  <div className={`w-28 h-28 sm:w-44 sm:h-44 rounded-2xl overflow-hidden border-2 ${borderLine} shadow-xl relative group`}>
                    <img
                      src={personal.avatar}
                      alt={personal.name}
                      className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                    />
                  </div>
                  <div className={`absolute -bottom-2.5 -right-2 px-2.5 py-0.5 sm:px-3 sm:py-1 ${radius} ${isDark ? 'bg-zinc-800' : 'bg-white'} border ${borderLine} text-[10px] sm:text-[11px] font-mono shadow-md whitespace-nowrap`}>
                    {personal.yearsOfExperience}+ Years Exp
                  </div>
                </div>
              )}
            </div>

            {/* Metrics Bar */}
            <div className={`grid grid-cols-3 gap-2 sm:gap-4 p-4 sm:p-6 ${radius} border ${cardBg}`}>
              <div className="text-center sm:text-left">
                <span className={`text-xl sm:text-3xl font-extrabold ${font.headingClass} ${palette.accentText}`}>{personal.yearsOfExperience}+</span>
                <p className={`text-[10px] sm:text-xs ${subText} uppercase tracking-wider mt-0.5`}>Years Craft</p>
              </div>
              <div className="text-center sm:text-left border-x border-zinc-700/30 px-2 sm:px-4">
                <span className={`text-xl sm:text-3xl font-extrabold ${font.headingClass} ${palette.accentText}`}>{personal.completedProjects}+</span>
                <p className={`text-[10px] sm:text-xs ${subText} uppercase tracking-wider mt-0.5`}>Shipped</p>
              </div>
              <div className="text-center sm:text-left">
                <span className={`text-xl sm:text-3xl font-extrabold ${font.headingClass} ${palette.accentText}`}>{personal.satisfiedClients}+</span>
                <p className={`text-[10px] sm:text-xs ${subText} uppercase tracking-wider mt-0.5`}>Partners</p>
              </div>
            </div>
          </section>
        )}

        {/* Skills Section */}
        {themeConfig.showSections.skills && skills.length > 0 && (
          <section id="skills" className="space-y-4 sm:space-y-6">
            <div className="flex items-baseline justify-between border-b pb-2.5 border-zinc-700/40">
              <h2 className={`text-xl sm:text-2xl font-bold tracking-tight ${font.headingClass}`}>Skills & Expertise</h2>
              <span className={`text-[11px] font-mono ${subText}`}>{skills.length} Technical Skills</span>
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3 sm:gap-4">
              {skills.map((skill) => (
                <div key={skill.id} className={`p-3.5 sm:p-4 border ${cardBg} ${radius} flex flex-col justify-between transition-all`}>
                  <div>
                    <span className={`text-[10px] font-mono uppercase tracking-wider ${subText}`}>{skill.category}</span>
                    <h3 className="font-semibold text-xs sm:text-sm mt-0.5">{skill.name}</h3>
                  </div>
                  <div className="mt-2.5">
                    <div className="w-full bg-zinc-700/20 h-1.5 rounded-full overflow-hidden">
                      <div className={`h-full rounded-full ${palette.primary.split(' ')[0]}`} style={{ width: `${skill.level}%` }}></div>
                    </div>
                    <div className="flex justify-between items-center text-[10px] font-mono mt-1 text-zinc-400">
                      <span>Proficiency</span>
                      <span>{skill.level}%</span>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </section>
        )}

        {/* Featured Projects */}
        {themeConfig.showSections.projects && projects.length > 0 && (
          <section id="projects" className="space-y-4 sm:space-y-6">
            <div className="flex items-baseline justify-between border-b pb-2.5 border-zinc-700/40">
              <h2 className={`text-xl sm:text-2xl font-bold tracking-tight ${font.headingClass}`}>Selected Projects</h2>
              <span className={`text-[11px] font-mono ${subText}`}>Featured Works</span>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 sm:gap-6">
              {projects.map((p) => (
                <div key={p.id} className={`border ${cardBg} ${radius} overflow-hidden flex flex-col justify-between group transition-all`}>
                  {p.imageUrl && (
                    <div className="relative aspect-video overflow-hidden border-b border-zinc-700/30">
                      <img
                        src={p.imageUrl}
                        alt={p.title}
                        className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                      />
                      {p.metrics && (
                        <span className={`absolute top-2.5 right-2.5 text-[10px] sm:text-[11px] font-mono font-bold px-2 py-0.5 ${radius} bg-black/75 backdrop-blur-sm text-white border border-white/10`}>
                          {p.metrics}
                        </span>
                      )}
                    </div>
                  )}
                  <div className="p-4 sm:p-6 space-y-3 flex-1 flex flex-col justify-between">
                    <div>
                      <div className="flex items-center justify-between text-xs mb-1">
                        <span className={`font-mono text-[11px] ${palette.accentText}`}>{p.category}</span>
                        {p.year && <span className={`font-mono text-[10px] ${subText}`}>{p.year}</span>}
                      </div>
                      <h3 className={`text-base sm:text-lg font-bold ${font.headingClass}`}>{p.title}</h3>
                      <p className={`text-xs sm:text-sm ${subText} mt-1 leading-relaxed`}>{p.description}</p>
                      
                      <div className="flex flex-wrap gap-1.5 mt-3">
                        {p.tags.map((tag) => (
                          <span key={tag} className={`text-[10px] font-mono px-2 py-0.5 rounded ${isDark ? 'bg-zinc-800 text-zinc-300' : 'bg-zinc-100 text-zinc-700'}`}>
                            {tag}
                          </span>
                        ))}
                      </div>
                    </div>

                    <div className="flex items-center gap-3 pt-3 border-t border-zinc-700/30 mt-3">
                      {p.liveUrl && (
                        <a href={p.liveUrl} target="_blank" rel="noreferrer" className={`text-xs font-semibold ${palette.accentText} hover:underline flex items-center gap-1`}>
                          Live Preview <ArrowUpRight className="w-3.5 h-3.5" />
                        </a>
                      )}
                      {p.githubUrl && (
                        <a href={p.githubUrl} target="_blank" rel="noreferrer" className={`text-xs ${subText} hover:text-current flex items-center gap-1`}>
                          <Github className="w-3.5 h-3.5" /> Code
                        </a>
                      )}
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </section>
        )}

        {/* Experience Section */}
        {themeConfig.showSections.experience && experience.length > 0 && (
          <section id="experience" className="space-y-4 sm:space-y-6">
            <div className="flex items-baseline justify-between border-b pb-2.5 border-zinc-700/40">
              <h2 className={`text-xl sm:text-2xl font-bold tracking-tight ${font.headingClass}`}>Career & Experience</h2>
              <span className={`text-[11px] font-mono ${subText}`}>Timeline</span>
            </div>
            <div className="space-y-3 sm:space-y-4">
              {experience.map((exp) => (
                <div key={exp.id} className={`p-4 sm:p-6 border ${cardBg} ${radius} space-y-2.5`}>
                  <div className="flex flex-col sm:flex-row sm:items-baseline justify-between gap-1">
                    <div>
                      <h3 className="font-bold text-sm sm:text-base">{exp.role}</h3>
                      <p className={`text-xs sm:text-sm font-medium ${palette.accentText}`}>{exp.company} &bull; {exp.location}</p>
                    </div>
                    <span className={`text-[11px] font-mono px-2 py-0.5 rounded-full self-start sm:self-auto ${isDark ? 'bg-zinc-800 text-zinc-300' : 'bg-zinc-100 text-zinc-700'}`}>
                      {exp.period}
                    </span>
                  </div>
                  <p className={`text-xs sm:text-sm ${subText} leading-relaxed`}>{exp.description}</p>
                  {exp.achievements && exp.achievements.length > 0 && (
                    <ul className="space-y-1 text-xs text-zinc-400">
                      {exp.achievements.map((ach, idx) => (
                        <li key={idx} className="flex items-start gap-2">
                          <CheckCircle2 className={`w-3.5 h-3.5 mt-0.5 shrink-0 ${palette.accentText}`} />
                          <span className={subText}>{ach}</span>
                        </li>
                      ))}
                    </ul>
                  )}
                  <div className="flex flex-wrap gap-1.5 pt-1.5">
                    {exp.technologies.map((t) => (
                      <span key={t} className="text-[10px] font-mono px-2 py-0.5 rounded bg-zinc-700/20 text-zinc-400">
                        {t}
                      </span>
                    ))}
                  </div>
                </div>
              ))}
            </div>
          </section>
        )}

        {/* Education & Testimonials */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 sm:gap-8">
          {themeConfig.showSections.education && education.length > 0 && (
            <section className="space-y-3 sm:space-y-4">
              <h2 className={`text-lg sm:text-xl font-bold tracking-tight ${font.headingClass}`}>Education</h2>
              <div className="space-y-3">
                {education.map((edu) => (
                  <div key={edu.id} className={`p-4 sm:p-5 border ${cardBg} ${radius}`}>
                    <h3 className="font-bold text-xs sm:text-sm">{edu.degree}</h3>
                    <p className={`text-xs ${palette.accentText}`}>{edu.institution} &bull; {edu.location}</p>
                    <p className={`text-[10px] font-mono ${subText} mt-1`}>{edu.period} {edu.gpa && `| GPA ${edu.gpa}`}</p>
                    {edu.description && <p className={`text-xs ${subText} mt-2`}>{edu.description}</p>}
                  </div>
                ))}
              </div>
            </section>
          )}

          {themeConfig.showSections.testimonials && testimonials.length > 0 && (
            <section className="space-y-3 sm:space-y-4">
              <h2 className={`text-lg sm:text-xl font-bold tracking-tight ${font.headingClass}`}>Testimonials</h2>
              <div className="space-y-3">
                {testimonials.map((t) => (
                  <div key={t.id} className={`p-4 sm:p-5 border ${cardBg} ${radius} space-y-2.5`}>
                    <p className={`text-xs italic ${subText} leading-relaxed`}>"{t.text}"</p>
                    <div className="flex items-center gap-2.5 pt-1.5">
                      {t.avatar && <img src={t.avatar} alt={t.clientName} className="w-7 h-7 rounded-full object-cover" />}
                      <div>
                        <p className="text-xs font-bold">{t.clientName}</p>
                        <p className={`text-[10px] ${subText}`}>{t.role}, {t.company}</p>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </section>
          )}
        </div>

        {/* Custom Section */}
        {themeConfig.showSections.custom && customSections.map((sec) => (
          <section key={sec.id} className="space-y-3 sm:space-y-4">
            <h2 className={`text-xl sm:text-2xl font-bold tracking-tight ${font.headingClass}`}>{sec.title}</h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 sm:gap-4">
              {sec.items.map((it) => (
                <div key={it.id} className={`p-4 sm:p-5 border ${cardBg} ${radius}`}>
                  <div className="flex justify-between items-start">
                    <h3 className="font-bold text-xs sm:text-sm">{it.title}</h3>
                    {it.badge && <span className={`text-[10px] font-mono px-2 py-0.5 rounded ${palette.badgeBg}`}>{it.badge}</span>}
                  </div>
                  {it.subtitle && <p className={`text-xs ${palette.accentText} mt-0.5`}>{it.subtitle}</p>}
                  {it.description && <p className={`text-xs ${subText} mt-1.5`}>{it.description}</p>}
                </div>
              ))}
            </div>
          </section>
        ))}

        {/* Contact Footer */}
        {themeConfig.showSections.contact && (
          <footer id="contact" className={`pt-8 sm:pt-12 border-t ${borderLine} space-y-5 text-center`}>
            <div className="max-w-md mx-auto space-y-2.5 px-2">
              <h2 className={`text-2xl sm:text-3xl font-bold tracking-tight ${font.headingClass}`}>Let's build something together</h2>
              <p className={`text-xs sm:text-sm ${subText}`}>
                Have an inquiry or project proposal? Reach out directly via email.
              </p>
              <div className="pt-2">
                <a
                  href={`mailto:${personal.email}`}
                  className={`inline-flex items-center gap-2 px-5 sm:px-6 py-2.5 sm:py-3 ${radius} ${palette.primary} font-bold text-xs sm:text-sm shadow-md transition-transform hover:scale-105`}
                >
                  <Mail className="w-4 h-4" />
                  <span>{personal.email}</span>
                </a>
              </div>
            </div>

            <div className="flex items-center justify-center gap-4 sm:gap-6 text-xs text-zinc-400 pt-3">
              {socials.github && <a href={socials.github} target="_blank" rel="noreferrer" className="hover:text-current">GitHub</a>}
              {socials.linkedin && <a href={socials.linkedin} target="_blank" rel="noreferrer" className="hover:text-current">LinkedIn</a>}
              {socials.twitter && <a href={socials.twitter} target="_blank" rel="noreferrer" className="hover:text-current">Twitter/X</a>}
              {socials.dribbble && <a href={socials.dribbble} target="_blank" rel="noreferrer" className="hover:text-current">Dribbble</a>}
            </div>

            <p className="text-[10px] sm:text-[11px] font-mono text-zinc-500 pt-2">
              &copy; {new Date().getFullYear()} {personal.name}. All rights reserved.
            </p>
          </footer>
        )}
      </main>
    </div>
  );
};

