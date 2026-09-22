import React, { useState } from 'react';
import { PortfolioData } from '../../types/portfolio';
import { Sparkles, ArrowUpRight, Github, Mail, MapPin, Zap, Flame, Rocket, Copy, Check } from 'lucide-react';

interface Props {
  data: PortfolioData;
}

export const BrutalistIndieTemplate: React.FC<Props> = ({ data }) => {
  const { personal, socials, skills, projects, experience, testimonials, themeConfig } = data;
  const [copied, setCopied] = useState(false);

  const handleCopyEmail = () => {
    navigator.clipboard.writeText(personal.email);
    setCopied(true);
    setTimeout(() => setCopied(false), 2500);
  };

  return (
    <div className="min-h-full bg-yellow-300 text-black font-mono p-3 sm:p-6 lg:p-8 space-y-8 sm:space-y-12 selection:bg-black selection:text-yellow-300">
      {/* Neo-brutalist Header Bar */}
      <header className="max-w-5xl mx-auto bg-white border-3 sm:border-4 border-black p-3 sm:p-4 shadow-[4px_4px_0px_0px_rgba(0,0,0,1)] sm:shadow-[6px_6px_0px_0px_rgba(0,0,0,1)] flex items-center justify-between gap-2">
        <div className="flex items-center gap-2 font-black text-sm sm:text-lg uppercase min-w-0">
          <span className="w-3.5 h-3.5 sm:w-4 sm:h-4 bg-black shrink-0"></span>
          <span className="truncate">{personal.name}</span>
          <span className="text-[10px] sm:text-xs bg-lime-300 px-2 py-0.5 border-2 border-black ml-1 hidden sm:inline-block">
            BUILDER // INDIE
          </span>
        </div>
        <a
          href="#contact"
          className="bg-pink-400 hover:bg-pink-300 border-2 border-black px-3 sm:px-4 py-1.5 font-bold text-xs uppercase shadow-[2px_2px_0px_0px_rgba(0,0,0,1)] sm:shadow-[3px_3px_0px_0px_rgba(0,0,0,1)] active:translate-x-0.5 active:translate-y-0.5 active:shadow-none transition-all shrink-0"
        >
          Work With Me
        </a>
      </header>

      {/* Main Container */}
      <main className="max-w-5xl mx-auto space-y-8 sm:space-y-12">
        {/* Hero Card */}
        <section className="bg-white border-3 sm:border-4 border-black p-4 sm:p-8 lg:p-10 shadow-[5px_5px_0px_0px_rgba(0,0,0,1)] sm:shadow-[8px_8px_0px_0px_rgba(0,0,0,1)] space-y-5 sm:space-y-6">
          <div className="flex flex-col md:flex-row items-center gap-6 sm:gap-8 justify-between">
            <div className="space-y-3 sm:space-y-4 max-w-xl">
              {personal.availableForWork && (
                <div className="inline-block bg-lime-300 border-2 border-black px-2.5 py-1 text-[11px] sm:text-xs font-black uppercase shadow-[2px_2px_0px_0px_rgba(0,0,0,1)] sm:shadow-[3px_3px_0px_0px_rgba(0,0,0,1)]">
                  ⚡ {personal.statusText || 'SHIPPING & OPEN FOR PROJECTS'}
                </div>
              )}
              <h1 className="text-3xl sm:text-5xl lg:text-6xl font-black uppercase tracking-tight leading-tight">
                {personal.name}
              </h1>
              <div>
                <p className="text-base sm:text-xl font-bold bg-cyan-200 border-2 border-black p-1.5 sm:p-2 inline-block shadow-[2px_2px_0px_0px_rgba(0,0,0,1)] sm:shadow-[3px_3px_0px_0px_rgba(0,0,0,1)]">
                  {personal.title}
                </p>
              </div>
              <p className="text-xs sm:text-sm font-medium leading-relaxed font-sans">
                {personal.tagline}
              </p>
              <p className="text-xs sm:text-sm text-neutral-800 leading-relaxed font-sans">
                {personal.bio}
              </p>

              <div className="flex flex-wrap gap-2.5 sm:gap-3 pt-2 sm:pt-4">
                <a
                  href="#contact"
                  className="bg-lime-400 hover:bg-lime-300 border-2 sm:border-3 border-black px-4 sm:px-6 py-2 sm:py-3 font-black text-xs sm:text-sm uppercase shadow-[3px_3px_0px_0px_rgba(0,0,0,1)] sm:shadow-[4px_4px_0px_0px_rgba(0,0,0,1)] flex items-center gap-1.5 active:translate-x-0.5 active:translate-y-0.5 active:shadow-none"
                >
                  <Zap className="w-4 h-4 fill-current" /> Hire Me Now
                </a>
                {personal.resumeUrl && (
                  <a
                    href={personal.resumeUrl}
                    target="_blank"
                    rel="noreferrer"
                    className="bg-white border-2 sm:border-3 border-black px-4 sm:px-5 py-2 sm:py-3 font-bold text-xs uppercase shadow-[3px_3px_0px_0px_rgba(0,0,0,1)] sm:shadow-[4px_4px_0px_0px_rgba(0,0,0,1)] hover:bg-neutral-100"
                  >
                    Resume PDF
                  </a>
                )}
              </div>
            </div>

            {personal.avatar && (
              <div className="shrink-0 relative">
                <img
                  src={personal.avatar}
                  alt={personal.name}
                  className="w-36 h-36 sm:w-52 sm:h-52 object-cover border-3 sm:border-4 border-black shadow-[4px_4px_0px_0px_rgba(0,0,0,1)] sm:shadow-[6px_6px_0px_0px_rgba(0,0,0,1)] bg-cyan-300"
                />
                <div className="absolute -bottom-2.5 -right-2.5 bg-pink-400 border-2 sm:border-3 border-black px-2.5 py-1 font-black text-[11px] sm:text-xs uppercase shadow-[2px_2px_0px_0px_rgba(0,0,0,1)] sm:shadow-[3px_3px_0px_0px_rgba(0,0,0,1)]">
                  {personal.yearsOfExperience}+ YRS EXP
                </div>
              </div>
            )}
          </div>

          {/* Quick Brutalist Stats */}
          <div className="grid grid-cols-3 gap-2 sm:gap-4 pt-4 sm:pt-6 border-t-3 sm:border-t-4 border-black">
            <div className="bg-cyan-200 border-2 border-black p-2 sm:p-3 text-center shadow-[2px_2px_0px_0px_rgba(0,0,0,1)] sm:shadow-[3px_3px_0px_0px_rgba(0,0,0,1)]">
              <span className="text-xl sm:text-3xl font-black">{personal.yearsOfExperience}+</span>
              <p className="text-[9px] sm:text-[10px] uppercase font-bold">Years Building</p>
            </div>
            <div className="bg-lime-200 border-2 border-black p-2 sm:p-3 text-center shadow-[2px_2px_0px_0px_rgba(0,0,0,1)] sm:shadow-[3px_3px_0px_0px_rgba(0,0,0,1)]">
              <span className="text-xl sm:text-3xl font-black">{personal.completedProjects}+</span>
              <p className="text-[9px] sm:text-[10px] uppercase font-bold">Projects Built</p>
            </div>
            <div className="bg-pink-200 border-2 border-black p-2 sm:p-3 text-center shadow-[2px_2px_0px_0px_rgba(0,0,0,1)] sm:shadow-[3px_3px_0px_0px_rgba(0,0,0,1)]">
              <span className="text-xl sm:text-3xl font-black">{personal.satisfiedClients}+</span>
              <p className="text-[9px] sm:text-[10px] uppercase font-bold">Happy Clients</p>
            </div>
          </div>
        </section>

        {/* Skills Stack */}
        <section className="bg-white border-3 sm:border-4 border-black p-4 sm:p-8 shadow-[5px_5px_0px_0px_rgba(0,0,0,1)] sm:shadow-[8px_8px_0px_0px_rgba(0,0,0,1)] space-y-3 sm:space-y-4">
          <h2 className="text-xl sm:text-2xl font-black uppercase flex items-center gap-2">
            <Flame className="w-5 h-5 text-orange-500 fill-current" /> Tech Weapons
          </h2>
          <div className="flex flex-wrap gap-2">
            {skills.map((s, i) => {
              const bgColors = ['bg-pink-300', 'bg-cyan-300', 'bg-lime-300', 'bg-orange-300', 'bg-purple-300'];
              const chosen = bgColors[i % bgColors.length];
              return (
                <div key={s.id} className={`${chosen} border-2 border-black px-2.5 sm:px-3.5 py-1 sm:py-1.5 font-bold text-xs uppercase shadow-[2px_2px_0px_0px_rgba(0,0,0,1)] sm:shadow-[3px_3px_0px_0px_rgba(0,0,0,1)] flex items-center gap-1.5`}>
                  <span>{s.name}</span>
                  <span className="bg-black text-white px-1.5 py-0.2 text-[10px]">{s.level}%</span>
                </div>
              );
            })}
          </div>
        </section>

        {/* Projects */}
        <section className="space-y-4 sm:space-y-6">
          <h2 className="text-xl sm:text-3xl font-black uppercase bg-white border-3 sm:border-4 border-black p-2.5 sm:p-3 inline-block shadow-[4px_4px_0px_0px_rgba(0,0,0,1)] sm:shadow-[6px_6px_0px_0px_rgba(0,0,0,1)]">
            🚀 Featured Projects
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 sm:gap-8">
            {projects.map((p) => (
              <div key={p.id} className="bg-white border-3 sm:border-4 border-black shadow-[5px_5px_0px_0px_rgba(0,0,0,1)] sm:shadow-[8px_8px_0px_0px_rgba(0,0,0,1)] flex flex-col justify-between overflow-hidden">
                {p.imageUrl && (
                  <div className="border-b-3 sm:border-b-4 border-black relative">
                    <img src={p.imageUrl} alt={p.title} className="w-full h-44 sm:h-48 object-cover" />
                    {p.metrics && (
                      <span className="absolute top-2.5 right-2.5 sm:top-3 sm:right-3 bg-yellow-300 border-2 border-black font-black text-xs px-2 py-0.5 sm:py-1 shadow-[2px_2px_0px_0px_rgba(0,0,0,1)]">
                        {p.metrics}
                      </span>
                    )}
                  </div>
                )}
                <div className="p-4 sm:p-6 space-y-2.5 sm:space-y-3 flex-1 flex flex-col justify-between">
                  <div>
                    <span className="text-[10px] sm:text-[11px] font-black uppercase bg-lime-300 border border-black px-2 py-0.5">
                      {p.category}
                    </span>
                    <h3 className="text-lg sm:text-xl font-black uppercase mt-1.5">{p.title}</h3>
                    <p className="text-xs font-sans text-neutral-800 mt-1.5 leading-relaxed">{p.description}</p>
                    <div className="flex flex-wrap gap-1.5 mt-3">
                      {p.tags.map((t) => (
                        <span key={t} className="text-[10px] font-bold bg-neutral-100 border border-black px-2 py-0.5">
                          {t}
                        </span>
                      ))}
                    </div>
                  </div>

                  <div className="flex items-center gap-2.5 sm:gap-3 pt-3 sm:pt-4 border-t-2 border-black mt-3">
                    {p.liveUrl && (
                      <a href={p.liveUrl} target="_blank" rel="noreferrer" className="bg-black text-white px-3 py-1.5 text-xs font-bold uppercase flex items-center gap-1 hover:bg-neutral-800">
                        Live Demo <ArrowUpRight className="w-3.5 h-3.5" />
                      </a>
                    )}
                    {p.githubUrl && (
                      <a href={p.githubUrl} target="_blank" rel="noreferrer" className="border-2 border-black px-3 py-1 text-xs font-bold uppercase hover:bg-neutral-100">
                        GitHub
                      </a>
                    )}
                  </div>
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* Contact Footer */}
        <footer id="contact" className="bg-white border-3 sm:border-4 border-black p-6 sm:p-12 shadow-[5px_5px_0px_0px_rgba(0,0,0,1)] sm:shadow-[8px_8px_0px_0px_rgba(0,0,0,1)] text-center space-y-3 sm:space-y-4">
          <h2 className="text-2xl sm:text-4xl font-black uppercase">Let's Make Magic Happen</h2>
          <p className="text-xs sm:text-sm font-sans max-w-md mx-auto">
            Got an idea, product to build, or consulting inquiry? Hit my inbox.
          </p>
          <div className="pt-2">
            <button
              onClick={handleCopyEmail}
              className="inline-flex items-center gap-2 bg-pink-400 hover:bg-pink-300 border-3 sm:border-4 border-black px-6 sm:px-8 py-2.5 sm:py-3.5 font-black text-sm sm:text-base uppercase shadow-[4px_4px_0px_0px_rgba(0,0,0,1)] sm:shadow-[5px_5px_0px_0px_rgba(0,0,0,1)] active:translate-x-1 active:translate-y-1 active:shadow-none cursor-pointer"
            >
              <Mail className="w-4 h-4" />
              <span>{personal.email}</span>
              {copied ? <Check className="w-4 h-4" /> : <Copy className="w-4 h-4 opacity-70" />}
            </button>
          </div>
        </footer>
      </main>
    </div>
  );
};

