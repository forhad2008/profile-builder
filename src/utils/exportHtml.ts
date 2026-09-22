import { PortfolioData } from '../types/portfolio';
import { PALETTE_CONFIG } from './themeHelper';

export function generateStandaloneHtml(data: PortfolioData): string {
  const { personal, socials, skills, projects, experience, education, testimonials, customSections, themeConfig } = data;
  const palette = PALETTE_CONFIG[themeConfig.colorPalette] || PALETTE_CONFIG.indigo;
  const isDark = themeConfig.mode !== 'light';

  const bgClass = isDark ? '#09090b' : '#fafafa';
  const textClass = isDark ? '#f4f4f5' : '#18181b';
  const mutedText = isDark ? '#a1a1aa' : '#71717a';
  const cardBg = isDark ? '#18181b' : '#ffffff';
  const cardBorder = isDark ? '#27272a' : '#e4e4e7';
  const accentColor = palette.accentHex;

  return `<!DOCTYPE html>
<html lang="en" class="${isDark ? 'dark' : ''}">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>${personal.name} | ${personal.title}</title>
  <meta name="description" content="${personal.tagline}">
  <!-- Fonts -->
  <link rel="preconnect" href="https://fonts.googleapis.com">
  <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
  <link href="https://fonts.googleapis.com/css2?family=Plus+Jakarta+Sans:wght@300;400;500;600;700;800&family=Playfair+Display:ital,wght@0,600;1,400&family=Fira+Code:wght@400;500&display=swap" rel="stylesheet">
  <script src="https://cdn.tailwindcss.com"></script>
  <style>
    body {
      font-family: 'Plus Jakarta Sans', system-ui, sans-serif;
      background-color: ${bgClass};
      color: ${textClass};
    }
    .accent-bg { background-color: ${accentColor}; }
    .accent-text { color: ${accentColor}; }
    .accent-border { border-color: ${accentColor}; }
    .card-style {
      background-color: ${cardBg};
      border: 1px solid ${cardBorder};
      border-radius: 1rem;
    }
  </style>
</head>
<body class="min-h-screen antialiased selection:bg-indigo-500 selection:text-white">
  
  <!-- Navigation -->
  <nav class="sticky top-0 z-50 backdrop-blur-md bg-opacity-80 border-b border-zinc-800/40 px-6 py-4 flex items-center justify-between max-w-6xl mx-auto">
    <a href="#" class="font-bold text-lg tracking-tight flex items-center gap-2">
      <span class="w-2.5 h-2.5 rounded-full accent-bg"></span>
      ${personal.name}
    </a>
    <div class="flex items-center gap-4 text-sm font-medium">
      <a href="#about" class="hover:opacity-75 transition-opacity">About</a>
      <a href="#skills" class="hover:opacity-75 transition-opacity">Skills</a>
      <a href="#projects" class="hover:opacity-75 transition-opacity">Projects</a>
      <a href="#experience" class="hover:opacity-75 transition-opacity">Experience</a>
      <a href="#contact" class="px-4 py-2 rounded-full accent-bg text-white hover:opacity-90 transition-opacity">Contact</a>
    </div>
  </nav>

  <!-- Hero Section -->
  <header id="about" class="max-w-4xl mx-auto px-6 pt-20 pb-16 text-center">
    ${personal.avatar ? `
      <img src="${personal.avatar}" alt="${personal.name}" class="w-28 h-28 rounded-full mx-auto object-cover border-2 accent-border shadow-xl mb-6">
    ` : ''}
    ${personal.availableForWork ? `
      <div class="inline-flex items-center gap-2 px-3 py-1 rounded-full text-xs font-medium bg-emerald-500/10 text-emerald-400 border border-emerald-500/20 mb-6">
        <span class="w-2 h-2 rounded-full bg-emerald-400 animate-pulse"></span>
        ${personal.statusText || 'Available for projects'}
      </div>
    ` : ''}
    <h1 class="text-4xl sm:text-6xl font-extrabold tracking-tight mb-4">
      Hi, I'm <span class="accent-text">${personal.name}</span>
    </h1>
    <p class="text-xl sm:text-2xl font-medium text-zinc-400 mb-6 max-w-2xl mx-auto leading-relaxed">
      ${personal.title}
    </p>
    <p class="text-base text-zinc-400 max-w-xl mx-auto leading-relaxed mb-8">
      ${personal.tagline}
    </p>

    <div class="flex flex-wrap items-center justify-center gap-4">
      <a href="#contact" class="px-6 py-3 rounded-full accent-bg text-white font-semibold shadow-lg hover:opacity-95 transition-all">
        Get In Touch
      </a>
      ${personal.resumeUrl ? `
        <a href="${personal.resumeUrl}" target="_blank" class="px-6 py-3 rounded-full border border-zinc-700 hover:bg-zinc-800 transition-colors font-medium">
          View Resume
        </a>
      ` : ''}
    </div>

    <!-- Quick Stats -->
    <div class="grid grid-cols-3 gap-4 max-w-lg mx-auto mt-14 pt-10 border-t border-zinc-800/60">
      <div>
        <p class="text-3xl font-extrabold accent-text">${personal.yearsOfExperience}+</p>
        <p class="text-xs text-zinc-400 mt-1 uppercase tracking-wider">Years Exp.</p>
      </div>
      <div>
        <p class="text-3xl font-extrabold accent-text">${personal.completedProjects}+</p>
        <p class="text-xs text-zinc-400 mt-1 uppercase tracking-wider">Projects</p>
      </div>
      <div>
        <p class="text-3xl font-extrabold accent-text">${personal.satisfiedClients}+</p>
        <p class="text-xs text-zinc-400 mt-1 uppercase tracking-wider">Clients</p>
      </div>
    </div>
  </header>

  <!-- Skills Section -->
  <section id="skills" class="max-w-5xl mx-auto px-6 py-16">
    <div class="text-center mb-12">
      <h2 class="text-3xl font-bold tracking-tight">Core Competencies</h2>
      <p class="text-sm text-zinc-400 mt-2">Technologies and tools I specialize in</p>
    </div>
    <div class="grid grid-cols-2 sm:grid-cols-4 gap-4">
      ${skills.map(skill => `
        <div class="card-style p-4 flex flex-col justify-between hover:scale-[1.02] transition-transform">
          <div>
            <span class="text-xs font-semibold uppercase tracking-wider text-zinc-400">${skill.category}</span>
            <h3 class="font-bold text-base mt-1">${skill.name}</h3>
          </div>
          <div class="mt-4">
            <div class="w-full bg-zinc-800 h-1.5 rounded-full overflow-hidden">
              <div class="accent-bg h-full rounded-full" style="width: ${skill.level}%"></div>
            </div>
            <span class="text-[11px] text-zinc-400 mt-1 block text-right">${skill.level}%</span>
          </div>
        </div>
      `).join('')}
    </div>
  </section>

  <!-- Projects Section -->
  <section id="projects" class="max-w-5xl mx-auto px-6 py-16">
    <div class="text-center mb-12">
      <h2 class="text-3xl font-bold tracking-tight">Featured Projects</h2>
      <p class="text-sm text-zinc-400 mt-2">Selected works, open-source tools, and platforms</p>
    </div>
    <div class="grid grid-cols-1 md:grid-cols-2 gap-8">
      ${projects.map(project => `
        <div class="card-style overflow-hidden flex flex-col hover:border-zinc-500 transition-colors">
          ${project.imageUrl ? `
            <img src="${project.imageUrl}" alt="${project.title}" class="w-full h-52 object-cover">
          ` : ''}
          <div class="p-6 flex-1 flex flex-col justify-between">
            <div>
              <div class="flex items-center justify-between gap-2 mb-2">
                <span class="text-xs font-medium px-2.5 py-0.5 rounded-full bg-zinc-800 text-zinc-300">${project.category}</span>
                ${project.metrics ? `<span class="text-xs font-semibold accent-text">${project.metrics}</span>` : ''}
              </div>
              <h3 class="text-xl font-bold mb-2">${project.title}</h3>
              <p class="text-sm text-zinc-400 leading-relaxed mb-4">${project.description}</p>
              
              <div class="flex flex-wrap gap-1.5 mb-6">
                ${project.tags.map(tag => `
                  <span class="text-[11px] px-2 py-0.5 rounded bg-zinc-800/80 text-zinc-400 border border-zinc-700/50">${tag}</span>
                `).join('')}
              </div>
            </div>

            <div class="flex items-center gap-4 pt-4 border-t border-zinc-800">
              ${project.liveUrl ? `
                <a href="${project.liveUrl}" target="_blank" class="text-sm font-semibold accent-text hover:underline">Live Demo &rarr;</a>
              ` : ''}
              ${project.githubUrl ? `
                <a href="${project.githubUrl}" target="_blank" class="text-sm font-medium text-zinc-400 hover:text-white">Source Code</a>
              ` : ''}
            </div>
          </div>
        </div>
      `).join('')}
    </div>
  </section>

  <!-- Experience Timeline -->
  <section id="experience" class="max-w-4xl mx-auto px-6 py-16">
    <div class="text-center mb-12">
      <h2 class="text-3xl font-bold tracking-tight">Work History</h2>
      <p class="text-sm text-zinc-400 mt-2">Professional career & milestones</p>
    </div>
    <div class="space-y-6">
      ${experience.map(item => `
        <div class="card-style p-6">
          <div class="flex flex-wrap items-baseline justify-between gap-2 mb-2">
            <div>
              <h3 class="text-lg font-bold">${item.role}</h3>
              <p class="text-sm font-medium text-zinc-400">${item.company} &bull; ${item.location}</p>
            </div>
            <span class="text-xs font-semibold px-2.5 py-1 rounded-full bg-zinc-800 text-zinc-300">${item.period}</span>
          </div>
          <p class="text-sm text-zinc-400 mt-3 mb-4 leading-relaxed">${item.description}</p>
          ${item.achievements && item.achievements.length > 0 ? `
            <ul class="space-y-1.5 text-xs text-zinc-400 list-disc list-inside">
              ${item.achievements.map(ach => `<li>${ach}</li>`).join('')}
            </ul>
          ` : ''}
          <div class="flex flex-wrap gap-1.5 mt-4 pt-4 border-t border-zinc-800/60">
            ${item.technologies.map(tech => `
              <span class="text-[10px] px-2 py-0.5 rounded bg-zinc-800 text-zinc-400">${tech}</span>
            `).join('')}
          </div>
        </div>
      `).join('')}
    </div>
  </section>

  <!-- Testimonials Section -->
  ${testimonials.length > 0 ? `
    <section class="max-w-5xl mx-auto px-6 py-16">
      <div class="text-center mb-12">
        <h2 class="text-3xl font-bold tracking-tight">What People Say</h2>
        <p class="text-sm text-zinc-400 mt-2">Recommendations from leaders and collaborators</p>
      </div>
      <div class="grid grid-cols-1 md:grid-cols-2 gap-6">
        ${testimonials.map(t => `
          <div class="card-style p-6 flex flex-col justify-between">
            <p class="text-sm text-zinc-300 italic mb-6 leading-relaxed">"${t.text}"</p>
            <div class="flex items-center gap-3">
              ${t.avatar ? `<img src="${t.avatar}" class="w-10 h-10 rounded-full object-cover">` : ''}
              <div>
                <p class="text-sm font-bold">${t.clientName}</p>
                <p class="text-xs text-zinc-400">${t.role}, ${t.company}</p>
              </div>
            </div>
          </div>
        `).join('')}
      </div>
    </section>
  ` : ''}

  <!-- Contact & Footer -->
  <footer id="contact" class="border-t border-zinc-800/60 py-16 px-6 text-center max-w-4xl mx-auto">
    <h2 class="text-3xl font-bold tracking-tight mb-4">Let's Connect</h2>
    <p class="text-zinc-400 max-w-md mx-auto mb-8">
      Open for new opportunities, collaborations, consulting, and interesting discussions.
    </p>
    <a href="mailto:${personal.email}" class="inline-block px-8 py-4 rounded-full accent-bg text-white font-bold shadow-lg hover:opacity-90 transition-all text-base mb-10">
      ${personal.email}
    </a>

    <div class="flex items-center justify-center gap-6 text-sm text-zinc-400 mb-8">
      ${socials.github ? `<a href="${socials.github}" target="_blank" class="hover:text-white transition-colors">GitHub</a>` : ''}
      ${socials.linkedin ? `<a href="${socials.linkedin}" target="_blank" class="hover:text-white transition-colors">LinkedIn</a>` : ''}
      ${socials.twitter ? `<a href="${socials.twitter}" target="_blank" class="hover:text-white transition-colors">Twitter</a>` : ''}
      ${socials.dribbble ? `<a href="${socials.dribbble}" target="_blank" class="hover:text-white transition-colors">Dribbble</a>` : ''}
      ${socials.website ? `<a href="${socials.website}" target="_blank" class="hover:text-white transition-colors">Website</a>` : ''}
    </div>

    <p class="text-xs text-zinc-500">
      &copy; ${new Date().getFullYear()} ${personal.name}. Crafted with PortfolioCraft Studio.
    </p>
  </footer>

</body>
</html>`;
}
