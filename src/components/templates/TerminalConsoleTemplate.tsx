import React, { useState } from 'react';
import { PortfolioData } from '../../types/portfolio';
import { Terminal, CornerDownLeft, Shield, Github, ArrowUpRight, Copy, Check, Sparkles } from 'lucide-react';

interface Props {
  data: PortfolioData;
}

export const TerminalConsoleTemplate: React.FC<Props> = ({ data }) => {
  const { personal, socials, skills, projects, experience, testimonials } = data;
  const [cliInput, setCliInput] = useState('');
  const [commandLogs, setCommandLogs] = useState<string[]>([
    '$ systemctl status developer.service',
    '> developer.service is active (running) - ready for queries'
  ]);
  const [copied, setCopied] = useState(false);

  const runCommandText = (cmdText: string) => {
    const cmd = cmdText.trim().toLowerCase();
    if (!cmd) return;

    let res = '';
    if (cmd === 'help') {
      res = 'Available commands: about, skills, projects, exp, contact, clear';
    } else if (cmd === 'about') {
      res = `${personal.name} - ${personal.title} - ${personal.bio}`;
    } else if (cmd === 'skills') {
      res = skills.map((s) => `${s.name} (${s.level}%)`).join(', ');
    } else if (cmd === 'projects') {
      res = projects.map((p) => `[${p.title}]: ${p.description}`).join(' | ');
    } else if (cmd === 'exp') {
      res = experience.map((e) => `${e.role} at ${e.company} (${e.period})`).join(' -> ');
    } else if (cmd === 'contact') {
      res = `Email: ${personal.email} | Location: ${personal.location}`;
    } else if (cmd === 'clear') {
      setCommandLogs([]);
      setCliInput('');
      return;
    } else {
      res = `command not found: "${cmd}". Tap quick chips below or type "help".`;
    }

    setCommandLogs((prev) => [...prev, `$ ${cmdText}`, `> ${res}`]);
    setCliInput('');
  };

  const handleCommand = (e: React.FormEvent) => {
    e.preventDefault();
    runCommandText(cliInput);
  };

  const handleCopyEmail = () => {
    navigator.clipboard.writeText(personal.email);
    setCopied(true);
    setTimeout(() => setCopied(false), 2500);
  };

  const quickCommands = ['skills', 'projects', 'exp', 'about', 'contact', 'clear'];

  return (
    <div className="min-h-full bg-black text-emerald-400 font-mono p-3 sm:p-6 lg:p-8 space-y-6 selection:bg-emerald-500 selection:text-black">
      {/* Terminal Window Frame */}
      <div className="max-w-5xl mx-auto border-2 border-emerald-500/40 rounded-xl overflow-hidden bg-neutral-950 shadow-[0_0_35px_rgba(16,185,129,0.12)]">
        {/* Terminal Titlebar */}
        <div className="bg-neutral-900/90 border-b border-emerald-500/30 px-3 sm:px-4 py-2.5 flex items-center justify-between">
          <div className="flex items-center gap-2">
            <span className="w-2.5 h-2.5 rounded-full bg-red-500/80"></span>
            <span className="w-2.5 h-2.5 rounded-full bg-yellow-500/80"></span>
            <span className="w-2.5 h-2.5 rounded-full bg-emerald-500/80"></span>
            <span className="text-[11px] sm:text-xs text-neutral-400 ml-1.5 truncate">guest@{personal.name.toLowerCase().replace(/\s+/g, '-')}:~</span>
          </div>
          <span className="text-[9px] sm:text-[10px] text-emerald-500/70 font-mono">BASH 5.2 &bull; UTF-8</span>
        </div>

        {/* Terminal Body */}
        <div className="p-4 sm:p-8 lg:p-10 space-y-8 sm:space-y-12">
          {/* Boot banner */}
          <div className="space-y-1 text-xs">
            <p className="text-emerald-500 flex items-center gap-1.5">
              <span className="w-2 h-2 rounded-full bg-emerald-400 animate-ping"></span>
              INIT SYSTEM // OS KERNEL LOADED 100%
            </p>
            <p className="text-neutral-500 text-[11px]">Type 'help' in terminal or tap quick chips below.</p>
          </div>

          {/* Hero Section */}
          <section className="space-y-4 sm:space-y-6">
            <div className="flex flex-col sm:flex-row gap-4 sm:gap-6 items-start justify-between">
              <div className="space-y-2.5">
                <p className="text-[11px] text-emerald-500">$ cat /etc/profile.json</p>
                <h1 className="text-2xl sm:text-4xl lg:text-5xl font-black tracking-tight text-white leading-tight">
                  {personal.name}
                </h1>
                <p className="text-emerald-400 text-sm sm:text-lg font-bold">
                  // {personal.title}
                </p>
                <p className="text-xs sm:text-sm text-neutral-300 leading-relaxed font-sans max-w-xl">
                  {personal.bio}
                </p>
                <p className="text-[11px] text-neutral-400 font-mono">
                  LOCATION: {personal.location} | EXP: {personal.yearsOfExperience} YRS | STATUS: {personal.statusText}
                </p>
              </div>

              {personal.avatar && (
                <div className="shrink-0 p-1 border border-emerald-500/40 bg-neutral-900 rounded-lg self-center sm:self-auto">
                  <img src={personal.avatar} alt={personal.name} className="w-28 h-28 sm:w-36 sm:h-36 object-cover rounded-md filter grayscale" />
                </div>
              )}
            </div>

            {/* Quick Actions */}
            <div className="flex flex-wrap gap-2.5 pt-1">
              <button
                onClick={handleCopyEmail}
                className="px-3.5 sm:px-4 py-2 bg-emerald-500 text-black font-bold text-xs hover:bg-emerald-400 transition-colors flex items-center gap-1.5 cursor-pointer rounded"
              >
                <span>$ sendmail {personal.email}</span>
                {copied ? <Check className="w-3.5 h-3.5" /> : <Copy className="w-3.5 h-3.5" />}
              </button>
              {personal.resumeUrl && (
                <a href={personal.resumeUrl} target="_blank" rel="noreferrer" className="px-3.5 sm:px-4 py-2 border border-emerald-500/40 text-emerald-300 text-xs hover:bg-emerald-500/10 rounded">
                  $ cat resume.pdf
                </a>
              )}
            </div>
          </section>

          {/* Interactive Shell Input with Mobile Quick Chips */}
          <section className="p-3.5 sm:p-4 bg-black border border-emerald-500/30 rounded-lg space-y-3">
            <div className="flex items-center justify-between text-[11px] text-neutral-500 border-b border-neutral-900 pb-1.5">
              <span>INTERACTIVE PROMPT</span>
              <span className="text-emerald-500/80">READY</span>
            </div>

            <div className="space-y-1.5 text-xs max-h-48 overflow-y-auto pr-1">
              {commandLogs.map((log, i) => (
                <p key={i} className={log.startsWith('$') ? 'text-white' : 'text-emerald-400/90 leading-relaxed'}>{log}</p>
              ))}
            </div>

            {/* Mobile Touch Command Chips */}
            <div className="flex items-center gap-1.5 flex-wrap pt-1">
              <span className="text-[10px] text-neutral-500 mr-1">Quick:</span>
              {quickCommands.map((qc) => (
                <button
                  key={qc}
                  onClick={() => runCommandText(qc)}
                  className="px-2 py-0.5 rounded bg-neutral-900 border border-emerald-500/20 text-emerald-400 text-[10px] hover:bg-emerald-500/20 active:scale-95 transition-all cursor-pointer"
                >
                  {qc}
                </button>
              ))}
            </div>

            <form onSubmit={handleCommand} className="flex items-center gap-2 text-xs pt-1">
              <span className="text-emerald-400 font-bold">$</span>
              <input
                type="text"
                value={cliInput}
                onChange={(e) => setCliInput(e.target.value)}
                placeholder="type 'skills', 'projects', 'exp'..."
                className="flex-1 bg-transparent text-white focus:outline-hidden font-mono text-xs placeholder:text-neutral-600"
              />
              <button type="submit" className="text-emerald-400 hover:text-white p-1">
                <CornerDownLeft className="w-3.5 h-3.5" />
              </button>
            </form>
          </section>

          {/* Skills / Modules */}
          <section className="space-y-3 sm:space-y-4">
            <p className="text-xs text-neutral-400">$ ls -la /usr/local/skills/</p>
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-2.5 sm:gap-3">
              {skills.map((s) => (
                <div key={s.id} className="p-3 border border-emerald-500/20 bg-neutral-900/50 rounded-lg">
                  <span className="text-[10px] text-neutral-500 block">pkg: {s.category}</span>
                  <span className="font-bold text-xs text-white block mt-0.5">{s.name}</span>
                  <div className="w-full bg-neutral-800 h-1.5 rounded mt-2 overflow-hidden">
                    <div className="bg-emerald-500 h-full" style={{ width: `${s.level}%` }}></div>
                  </div>
                </div>
              ))}
            </div>
          </section>

          {/* Projects */}
          <section className="space-y-3 sm:space-y-4">
            <p className="text-xs text-neutral-400">$ git log --projects -n 4</p>
            <div className="space-y-3">
              {projects.map((p) => (
                <div key={p.id} className="p-3.5 sm:p-4 border border-emerald-500/20 bg-neutral-900/40 rounded-lg space-y-2">
                  <div className="flex flex-wrap items-center justify-between gap-2">
                    <h3 className="font-bold text-xs sm:text-sm text-white">commit &bull; {p.title}</h3>
                    {p.metrics && <span className="text-[10px] px-2 py-0.5 border border-emerald-500/30 text-emerald-300 rounded">{p.metrics}</span>}
                  </div>
                  <p className="text-xs text-neutral-400 font-sans leading-relaxed">{p.description}</p>
                  <div className="flex items-center gap-3 pt-1 text-xs">
                    {p.liveUrl && (
                      <a href={p.liveUrl} target="_blank" rel="noreferrer" className="text-emerald-400 hover:underline flex items-center gap-1">
                        curl_live &rarr;
                      </a>
                    )}
                    {p.githubUrl && (
                      <a href={p.githubUrl} target="_blank" rel="noreferrer" className="text-neutral-400 hover:text-white">
                        git_clone
                      </a>
                    )}
                  </div>
                </div>
              ))}
            </div>
          </section>

          {/* Experience */}
          <section className="space-y-3 sm:space-y-4">
            <p className="text-xs text-neutral-400">$ history | grep "employment"</p>
            <div className="space-y-2.5">
              {experience.map((exp) => (
                <div key={exp.id} className="p-3.5 sm:p-4 border-l-2 border-emerald-500/50 bg-neutral-900/30 pl-3.5 space-y-1 rounded-r-lg">
                  <div className="flex flex-col sm:flex-row sm:justify-between sm:items-baseline gap-0.5">
                    <span className="font-bold text-xs text-white">{exp.role} @ {exp.company}</span>
                    <span className="text-[10px] text-neutral-500">{exp.period}</span>
                  </div>
                  <p className="text-xs text-neutral-400 font-sans leading-relaxed">{exp.description}</p>
                </div>
              ))}
            </div>
          </section>

          {/* Footer */}
          <footer className="pt-4 sm:pt-6 border-t border-emerald-500/20 text-center text-xs text-neutral-500">
            <p>$ echo "Process finished with exit code 0"</p>
          </footer>
        </div>
      </div>
    </div>
  );
};

