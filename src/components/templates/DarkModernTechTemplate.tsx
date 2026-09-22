import React, { useState } from 'react';
import { PortfolioData } from '../../types/portfolio';
import { PALETTE_CONFIG, FONT_CONFIG, getBorderRadiusClass } from '../../utils/themeHelper';
import { Terminal, Cpu, Sparkles, ExternalLink, Github, Mail, MapPin, CheckCircle2, ArrowUpRight, ShieldCheck, Zap, Copy, Check } from 'lucide-react';

interface Props {
  data: PortfolioData;
}

export const DarkModernTechTemplate: React.FC<Props> = ({ data }) => {
  const { personal, socials, skills, projects, experience, education, testimonials, customSections, themeConfig } = data;
  const palette = PALETTE_CONFIG[themeConfig.colorPalette] || PALETTE_CONFIG.cyan;
  const font = FONT_CONFIG[themeConfig.fontPairing] || FONT_CONFIG.mono;
  const radius = getBorderRadiusClass(themeConfig.borderRadius);

  const [copied, setCopied] = useState(false);

  const handleCopyEmail = () => {
    navigator.clipboard.writeText(personal.email);
    setCopied(true);
    setTimeout(() => setCopied(false), 2500);
  };

  return (
    <div className={`min-h-full bg-slate-950 text-slate-100 ${font.bodyClass} relative overflow-hidden selection:bg-cyan-500 selection:text-black`}>
      {/* Background Cyber Grid */}
      <div className="absolute inset-0 bg-[linear-gradient(to_right,#1e293b15_1px,transparent_1px),linear-gradient(to_bottom,#1e293b15_1px,transparent_1px)] bg-[size:3rem_3rem] sm:bg-[size:4rem_4rem] [mask-image:radial-gradient(ellipse_60%_50%_at_50%_0%,#000_70%,transparent_100%)] pointer-events-none" />

      {/* Cyber Ambient Glows */}
      <div className="absolute top-0 left-1/4 w-72 sm:w-96 h-72 sm:h-96 bg-cyan-500/10 rounded-full blur-3xl pointer-events-none" />
      <div className="absolute top-1/3 right-5 sm:right-10 w-72 sm:w-96 h-72 sm:h-96 bg-indigo-500/10 rounded-full blur-3xl pointer-events-none" />

      {/* Navigation */}
      <header className="sticky top-0 z-30 backdrop-blur-xl bg-slate-950/85 border-b border-slate-800/80 px-4 sm:px-6 py-3.5">
        <div className="max-w-6xl mx-auto flex items-center justify-between gap-3">
          <div className="flex items-center gap-2.5 min-w-0">
            <div className="flex items-center justify-center w-7 h-7 sm:w-8 sm:h-8 rounded-lg bg-cyan-500/10 border border-cyan-500/30 text-cyan-400 shrink-0">
              <Terminal className="w-3.5 h-3.5 sm:w-4 sm:h-4" />
            </div>
            <div className="truncate">
              <span className="font-mono font-bold text-xs sm:text-sm text-slate-100 tracking-wider truncate block">~/ {personal.name}</span>
              <span className="text-[9px] sm:text-[10px] text-cyan-400 font-mono flex items-center gap-1">
                <span className="w-1.5 h-1.5 rounded-full bg-cyan-400 animate-pulse"></span> status: ONLINE
              </span>
            </div>
          </div>

          <nav className="flex items-center gap-2 sm:gap-4 text-xs font-mono shrink-0">
            <div className="hidden sm:flex items-center gap-3 text-[11px]">
              {themeConfig.showSections.about && <a href="#about" className="text-slate-400 hover:text-cyan-300 transition-colors">./about</a>}
              {themeConfig.showSections.skills && <a href="#skills" className="text-slate-400 hover:text-cyan-300 transition-colors">./stack</a>}
              {themeConfig.showSections.projects && <a href="#projects" className="text-slate-400 hover:text-cyan-300 transition-colors">./builds</a>}
              {themeConfig.showSections.experience && <a href="#experience" className="text-slate-400 hover:text-cyan-300 transition-colors">./history</a>}
            </div>
            {themeConfig.showSections.contact && (
              <a href="#contact" className={`px-2.5 sm:px-3.5 py-1 sm:py-1.5 ${radius} bg-cyan-500/10 text-cyan-300 border border-cyan-500/30 hover:bg-cyan-500/20 text-[11px] sm:text-xs transition-all`}>
                $ ping_me
              </a>
            )}
          </nav>
        </div>
      </header>

      {/* Main Content */}
      <main className="max-w-6xl mx-auto px-4 sm:px-6 py-8 sm:py-16 space-y-16 sm:space-y-24 relative z-10">
        {/* Hero Section */}
        {themeConfig.showSections.hero && (
          <section id="about" className="space-y-6 sm:space-y-8">
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 sm:gap-8 items-center">
              <div className="lg:col-span-8 space-y-4 sm:space-y-6">
                {personal.availableForWork && (
                  <div className={`inline-flex items-center gap-2 px-3 py-1 ${radius} bg-slate-900 border border-cyan-500/40 text-cyan-400 text-[11px] sm:text-xs font-mono shadow-[0_0_15px_rgba(6,182,212,0.15)]`}>
                    <span className="w-2 h-2 rounded-full bg-cyan-400 animate-ping"></span>
                    <Cpu className="w-3.5 h-3.5" />
                    {personal.statusText || 'Accepting New Contracts'}
                  </div>
                )}

                <h1 className={`text-3xl sm:text-5xl lg:text-6xl font-black tracking-tight text-white ${font.headingClass} leading-[1.1]`}>
                  {personal.name}
                </h1>
                
                <div className="flex items-center gap-2 text-base sm:text-xl font-mono text-cyan-400">
                  <span>&gt;</span>
                  <p className="typing-text">{personal.title}</p>
                </div>

                <p className="text-sm sm:text-base text-slate-300 leading-relaxed font-sans max-w-2xl">
                  {personal.tagline}
                </p>

                <p className="text-xs sm:text-sm text-slate-400 leading-relaxed font-sans max-w-2xl">
                  {personal.bio}
                </p>

                <div className="flex flex-wrap items-center gap-3 sm:gap-4 text-xs font-mono text-slate-400 pt-1">
                  <span className="flex items-center gap-1.5"><MapPin className="w-3.5 h-3.5 text-cyan-400" /> {personal.location}</span>
                  <button
                    onClick={handleCopyEmail}
                    className="flex items-center gap-1.5 hover:text-cyan-300 transition-colors cursor-pointer"
                  >
                    <Mail className="w-3.5 h-3.5 text-cyan-400" />
                    <span>{personal.email}</span>
                    {copied ? <Check className="w-3 h-3 text-emerald-400" /> : <Copy className="w-3 h-3 opacity-50" />}
                  </button>
                </div>

                {/* CTAs */}
                <div className="flex flex-wrap items-center gap-3 pt-2">
                  <a href="#contact" className={`px-5 sm:px-6 py-2.5 sm:py-3 ${radius} bg-gradient-to-r from-cyan-500 to-blue-600 text-black font-mono font-bold text-xs sm:text-sm hover:opacity-90 shadow-[0_0_20px_rgba(6,182,212,0.3)] flex items-center gap-2 transition-all`}>
                    <Zap className="w-4 h-4 fill-current" /> Initialize Contact
                  </a>
                  {personal.resumeUrl && (
                    <a href={personal.resumeUrl} target="_blank" rel="noreferrer" className={`px-4 sm:px-5 py-2.5 sm:py-3 ${radius} bg-slate-900 border border-slate-700 text-slate-200 font-mono text-xs hover:border-cyan-500/50 transition-colors flex items-center gap-2`}>
                      <ShieldCheck className="w-4 h-4 text-cyan-400" /> View Credentials
                    </a>
                  )}
                </div>
              </div>

              {/* Avatar + Terminal Card */}
              <div className="lg:col-span-4 max-w-sm mx-auto w-full lg:max-w-none">
                <div className={`p-4 bg-slate-900/90 border border-slate-800 ${radius} shadow-2xl backdrop-blur-md relative group hover:border-cyan-500/40 transition-colors`}>
                  <div className="flex items-center justify-between border-b border-slate-800 pb-2.5 mb-3 text-xs font-mono text-slate-400">
                    <span className="flex items-center gap-1.5"><span className="w-2 h-2 rounded-full bg-red-500"></span><span className="w-2 h-2 rounded-full bg-yellow-500"></span><span className="w-2 h-2 rounded-full bg-emerald-500"></span> system_profile.sh</span>
                    <span className="text-cyan-400">v4.8</span>
                  </div>
                  {personal.avatar && (
                    <img
                      src={personal.avatar}
                      alt={personal.name}
                      className={`w-full aspect-square object-cover ${radius} border border-slate-700/60 mb-3 filter grayscale contrast-125 group-hover:grayscale-0 transition-all duration-500`}
                    />
                  )}
                  <div className="space-y-1 text-xs font-mono text-slate-300">
                    <p><span className="text-cyan-400">EXP_LEVEL:</span> {personal.yearsOfExperience} YRS</p>
                    <p><span className="text-cyan-400">SHIPPED_BUILDS:</span> {personal.completedProjects}</p>
                    <p><span className="text-cyan-400">CLIENTS_SATISFIED:</span> {personal.satisfiedClients}</p>
                  </div>
                </div>
              </div>
            </div>
          </section>
        )}

        {/* Skills Section */}
        {themeConfig.showSections.skills && skills.length > 0 && (
          <section id="skills" className="space-y-4 sm:space-y-6">
            <div className="flex items-center justify-between border-b border-slate-800 pb-2.5">
              <h2 className="text-lg sm:text-2xl font-mono font-bold text-white flex items-center gap-2">
                <Cpu className="w-4 h-4 sm:w-5 sm:h-5 text-cyan-400" /> SYSTEM_CAPABILITIES
              </h2>
              <span className="text-[10px] sm:text-xs font-mono text-cyan-400">// {skills.length} modules</span>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3 sm:gap-4">
              {skills.map((skill) => (
                <div key={skill.id} className={`p-3.5 sm:p-4 bg-slate-900/60 border border-slate-800/80 ${radius} hover:border-cyan-500/40 hover:bg-slate-900 transition-all group`}>
                  <div className="flex justify-between items-start mb-1.5">
                    <span className="text-[10px] font-mono text-cyan-400/80 uppercase">[{skill.category}]</span>
                    <span className="text-xs font-mono text-slate-400 group-hover:text-cyan-400">{skill.level}%</span>
                  </div>
                  <h3 className="font-mono font-bold text-xs sm:text-sm text-slate-200">{skill.name}</h3>
                  <div className="w-full bg-slate-800 h-1.5 rounded-full overflow-hidden mt-2.5">
                    <div className="h-full bg-gradient-to-r from-cyan-500 to-indigo-500" style={{ width: `${skill.level}%` }}></div>
                  </div>
                </div>
              ))}
            </div>
          </section>
        )}

        {/* Projects Section */}
        {themeConfig.showSections.projects && projects.length > 0 && (
          <section id="projects" className="space-y-4 sm:space-y-6">
            <div className="flex items-center justify-between border-b border-slate-800 pb-2.5">
              <h2 className="text-lg sm:text-2xl font-mono font-bold text-white flex items-center gap-2">
                <Sparkles className="w-4 h-4 sm:w-5 sm:h-5 text-cyan-400" /> DEPLOYED_PROJECTS
              </h2>
              <span className="text-[10px] sm:text-xs font-mono text-slate-400">// production releases</span>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 sm:gap-6">
              {projects.map((p) => (
                <div key={p.id} className={`bg-slate-900/50 border border-slate-800/90 ${radius} overflow-hidden hover:border-cyan-500/50 transition-all flex flex-col justify-between group`}>
                  {p.imageUrl && (
                    <div className="relative aspect-video overflow-hidden border-b border-slate-800">
                      <img src={p.imageUrl} alt={p.title} className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500" />
                      {p.metrics && (
                        <span className="absolute top-2.5 right-2.5 text-[10px] sm:text-xs font-mono px-2 py-0.5 bg-slate-950/90 border border-cyan-500/40 text-cyan-300 rounded">
                          {p.metrics}
                        </span>
                      )}
                    </div>
                  )}

                  <div className="p-4 sm:p-6 flex-1 flex flex-col justify-between space-y-3">
                    <div>
                      <div className="flex items-center justify-between text-xs font-mono text-cyan-400 mb-1">
                        <span className="text-[11px]">// {p.category}</span>
                        {p.year && <span className="text-slate-500 text-[10px]">{p.year}</span>}
                      </div>
                      <h3 className="text-base sm:text-lg font-bold font-mono text-white group-hover:text-cyan-300 transition-colors">{p.title}</h3>
                      <p className="text-xs sm:text-sm text-slate-400 font-sans mt-1.5 leading-relaxed">{p.description}</p>

                      <div className="flex flex-wrap gap-1.5 mt-3">
                        {p.tags.map((tag) => (
                          <span key={tag} className="text-[10px] font-mono px-2 py-0.5 rounded bg-slate-800/80 border border-slate-700/50 text-slate-300">
                            #{tag}
                          </span>
                        ))}
                      </div>
                    </div>

                    <div className="flex items-center gap-3 pt-3 border-t border-slate-800/80">
                      {p.liveUrl && (
                        <a href={p.liveUrl} target="_blank" rel="noreferrer" className="text-xs font-mono font-bold text-cyan-400 hover:text-cyan-300 flex items-center gap-1.5">
                          EXECUTE_DEMO <ArrowUpRight className="w-3.5 h-3.5" />
                        </a>
                      )}
                      {p.githubUrl && (
                        <a href={p.githubUrl} target="_blank" rel="noreferrer" className="text-xs font-mono text-slate-400 hover:text-white flex items-center gap-1.5">
                          <Github className="w-3.5 h-3.5" /> REPO
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
            <div className="flex items-center justify-between border-b border-slate-800 pb-2.5">
              <h2 className="text-lg sm:text-2xl font-mono font-bold text-white">CHRONOLOGY_LOGS</h2>
              <span className="text-[10px] sm:text-xs font-mono text-slate-400">// career milestones</span>
            </div>

            <div className="space-y-3 sm:space-y-4">
              {experience.map((exp) => (
                <div key={exp.id} className={`p-4 sm:p-6 bg-slate-900/40 border border-slate-800/80 ${radius} hover:border-slate-700 transition-all space-y-2.5`}>
                  <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-1">
                    <div>
                      <h3 className="font-mono font-bold text-sm sm:text-base text-white">{exp.role}</h3>
                      <p className="text-xs sm:text-sm font-mono text-cyan-400">{exp.company} &bull; {exp.location}</p>
                    </div>
                    <span className="text-[11px] font-mono px-2.5 py-0.5 rounded bg-slate-800 border border-slate-700 text-slate-300 self-start sm:self-auto">
                      {exp.period}
                    </span>
                  </div>
                  <p className="text-xs sm:text-sm text-slate-400 font-sans leading-relaxed">{exp.description}</p>
                  {exp.achievements && exp.achievements.length > 0 && (
                    <ul className="space-y-1 text-xs text-slate-400 font-sans">
                      {exp.achievements.map((ach, idx) => (
                        <li key={idx} className="flex items-start gap-2">
                          <CheckCircle2 className="w-3.5 h-3.5 text-cyan-400 mt-0.5 shrink-0" />
                          <span>{ach}</span>
                        </li>
                      ))}
                    </ul>
                  )}
                  <div className="flex flex-wrap gap-1.5 pt-1.5">
                    {exp.technologies.map((t) => (
                      <span key={t} className="text-[10px] font-mono px-2 py-0.5 rounded bg-cyan-950/40 border border-cyan-900/50 text-cyan-300">
                        {t}
                      </span>
                    ))}
                  </div>
                </div>
              ))}
            </div>
          </section>
        )}

        {/* Contact Section */}
        {themeConfig.showSections.contact && (
          <footer id="contact" className={`p-6 sm:p-8 bg-slate-900/60 border border-cyan-500/20 ${radius} text-center space-y-4 sm:space-y-6 relative overflow-hidden`}>
            <div className="max-w-xl mx-auto space-y-2.5">
              <h2 className="text-xl sm:text-3xl font-mono font-bold text-white">$ send_message</h2>
              <p className="text-xs sm:text-sm text-slate-400 font-sans">
                Open to cloud architecture consulting, contract builds, and advisory.
              </p>
              <div className="pt-2">
                <a href={`mailto:${personal.email}`} className={`inline-block px-6 sm:px-8 py-2.5 sm:py-3.5 ${radius} bg-cyan-500 text-black font-mono font-bold text-xs sm:text-sm hover:bg-cyan-400 transition-colors shadow-[0_0_25px_rgba(6,182,212,0.4)]`}>
                  {personal.email}
                </a>
              </div>
            </div>

            <div className="flex items-center justify-center gap-4 sm:gap-6 text-xs font-mono text-slate-400 pt-2">
              {socials.github && <a href={socials.github} target="_blank" rel="noreferrer" className="hover:text-cyan-400">github</a>}
              {socials.linkedin && <a href={socials.linkedin} target="_blank" rel="noreferrer" className="hover:text-cyan-400">linkedin</a>}
              {socials.twitter && <a href={socials.twitter} target="_blank" rel="noreferrer" className="hover:text-cyan-400">twitter/x</a>}
            </div>

            <p className="text-[10px] font-mono text-slate-600">
              TERMINAL PROTOCOL &bull; END TRANSMISSION
            </p>
          </footer>
        )}
      </main>
    </div>
  );
};

