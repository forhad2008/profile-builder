import React, { useState } from 'react';
import { PortfolioData } from '../../types/portfolio';
import { PALETTE_CONFIG, FONT_CONFIG, getBorderRadiusClass } from '../../utils/themeHelper';
import { MapPin, Mail, ArrowUpRight, Compass, Feather, Copy, Check } from 'lucide-react';

interface Props {
  data: PortfolioData;
}

export const ArtisanEarthTemplate: React.FC<Props> = ({ data }) => {
  const { personal, socials, skills, projects, experience, testimonials, themeConfig } = data;
  const radius = getBorderRadiusClass(themeConfig.borderRadius);
  const isDark = themeConfig.mode !== 'light';
  const [copied, setCopied] = useState(false);

  const bg = isDark ? 'bg-[#1a1715] text-[#ede8e1]' : 'bg-[#f7f4ed] text-[#2c2621]';
  const card = isDark ? 'bg-[#231f1c] border-[#38322c]' : 'bg-[#fffdfa] border-[#e8e1d5] shadow-xs';
  const subText = isDark ? 'text-[#a89f91]' : 'text-[#73685a]';
  const clayAccent = isDark ? 'text-[#e07a5f]' : 'text-[#c85a32]';
  const clayBtn = 'bg-[#c85a32] text-[#fffdfa] hover:bg-[#b04d28]';

  const handleCopyEmail = () => {
    navigator.clipboard.writeText(personal.email);
    setCopied(true);
    setTimeout(() => setCopied(false), 2500);
  };

  return (
    <div className={`min-h-full ${bg} font-sans py-5 sm:py-8 px-3 sm:px-8 space-y-10 sm:space-y-16 selection:bg-[#c85a32] selection:text-white`}>
      {/* Top Brand Bar */}
      <header className="max-w-5xl mx-auto flex items-center justify-between border-b pb-3.5 sm:pb-4 border-[#38322c]/40">
        <div className="flex items-center gap-2">
          <Feather className={`w-4 h-4 ${clayAccent}`} />
          <span className="font-heading-editorial italic text-lg sm:text-xl tracking-wide">{personal.name}</span>
        </div>
        <a href="#contact" className={`px-3.5 sm:px-4 py-1.5 ${radius} ${clayBtn} text-xs font-semibold tracking-wider transition-all`}>
          Inquire
        </a>
      </header>

      {/* Main Artisan Body */}
      <main className="max-w-5xl mx-auto space-y-12 sm:space-y-20">
        {/* Hero Section */}
        <section className="space-y-6 sm:space-y-8">
          <div className="grid grid-cols-1 md:grid-cols-12 gap-6 sm:gap-8 items-center">
            <div className="md:col-span-8 space-y-3.5 sm:space-y-5">
              {personal.availableForWork && (
                <span className={`inline-block px-3 py-1 ${radius} text-[11px] sm:text-xs font-serif italic ${isDark ? 'bg-[#2f2723] text-[#e07a5f]' : 'bg-[#faede8] text-[#c85a32]'}`}>
                  &bull; {personal.statusText || 'Currently taking select commissions'}
                </span>
              )}
              <h1 className="text-3xl sm:text-5xl lg:text-6xl font-heading-editorial font-normal leading-[1.1] tracking-wide">
                {personal.title}
              </h1>
              <p className={`text-base sm:text-xl font-heading-editorial italic ${subText} leading-relaxed`}>
                "{personal.tagline}"
              </p>
              <p className={`text-xs sm:text-base ${subText} leading-relaxed max-w-2xl`}>
                {personal.bio}
              </p>

              <div className="flex flex-wrap items-center gap-3 pt-1 sm:pt-2">
                <a href="#contact" className={`px-5 sm:px-6 py-2.5 sm:py-3 ${radius} ${clayBtn} text-xs font-semibold tracking-wider uppercase flex items-center gap-2`}>
                  Begin Dialogue <ArrowUpRight className="w-4 h-4" />
                </a>
              </div>
            </div>

            {personal.avatar && (
              <div className="md:col-span-4 flex justify-center">
                <div className={`p-3 ${card} border ${radius} shadow-lg rotate-1 hover:rotate-0 transition-transform`}>
                  <img src={personal.avatar} alt={personal.name} className={`w-36 h-48 sm:w-48 sm:h-60 object-cover ${radius}`} />
                  <p className="text-[11px] font-mono text-center mt-2 opacity-60">Studio Profile</p>
                </div>
              </div>
            )}
          </div>
        </section>

        {/* Craft Projects */}
        <section className="space-y-6 sm:space-y-8">
          <div className="border-b pb-2.5 sm:pb-3 border-[#38322c]/40 flex justify-between items-baseline">
            <h2 className="text-xl sm:text-3xl font-heading-editorial">Curated Works</h2>
            <span className="text-xs font-serif italic opacity-70">Physical & Digital</span>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 sm:gap-8">
            {projects.map((p) => (
              <div key={p.id} className={`${card} border ${radius} overflow-hidden p-4 sm:p-6 space-y-3 sm:space-y-4 flex flex-col justify-between`}>
                {p.imageUrl && (
                  <div className={`aspect-video overflow-hidden ${radius} border border-[#38322c]/20`}>
                    <img src={p.imageUrl} alt={p.title} className="w-full h-full object-cover hover:scale-105 transition-transform duration-700" />
                  </div>
                )}
                <div className="space-y-1.5 sm:space-y-2">
                  <span className={`text-[10px] sm:text-xs font-mono uppercase tracking-widest ${clayAccent}`}>{p.category}</span>
                  <h3 className="text-lg sm:text-xl font-heading-editorial font-bold">{p.title}</h3>
                  <p className={`text-xs sm:text-sm ${subText} leading-relaxed`}>{p.description}</p>
                </div>
                {p.liveUrl && (
                  <div className="pt-1 sm:pt-2">
                    <a href={p.liveUrl} target="_blank" rel="noreferrer" className={`text-xs font-semibold ${clayAccent} flex items-center gap-1 hover:underline`}>
                      Explore Case Study &rarr;
                    </a>
                  </div>
                )}
              </div>
            ))}
          </div>
        </section>

        {/* Skills / Mediums */}
        <section className="space-y-4 sm:space-y-6">
          <h2 className="text-xl sm:text-2xl font-heading-editorial">Disciplines & Mediums</h2>
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-2.5 sm:gap-3">
            {skills.map((s) => (
              <div key={s.id} className={`p-3 sm:p-4 ${card} border ${radius}`}>
                <span className="text-[10px] uppercase font-mono opacity-60">{s.category}</span>
                <p className="font-bold text-xs sm:text-sm mt-0.5">{s.name}</p>
              </div>
            ))}
          </div>
        </section>

        {/* Footer */}
        <footer id="contact" className={`p-6 sm:p-12 ${card} border ${radius} text-center space-y-3 sm:space-y-4`}>
          <h2 className="text-2xl sm:text-3xl font-heading-editorial">Inquiries & Commissions</h2>
          <p className={`text-xs sm:text-sm ${subText} max-w-md mx-auto`}>
            Reaching out is always welcome. For consultations or creative collaborations:
          </p>
          <div className="pt-2">
            <button
              onClick={handleCopyEmail}
              className={`inline-flex items-center gap-2 px-6 sm:px-8 py-2.5 sm:py-3 ${radius} ${clayBtn} font-semibold text-xs tracking-wider uppercase cursor-pointer`}
            >
              <Mail className="w-3.5 h-3.5" />
              <span>{personal.email}</span>
              {copied ? <Check className="w-3.5 h-3.5" /> : <Copy className="w-3.5 h-3.5 opacity-70" />}
            </button>
          </div>
        </footer>
      </main>
    </div>
  );
};

