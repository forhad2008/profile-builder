import React, { useState } from 'react';
import { ProjectItem } from '../../types/portfolio';
import { Plus, Trash2, ExternalLink, Github, Sparkles, Image as ImageIcon, Star } from 'lucide-react';
import { ImageUploadField } from './ImageUploadField';

interface Props {
  projects: ProjectItem[];
  onUpdateProjects: (projects: ProjectItem[]) => void;
  onOpenAiHelper?: (projectId: string) => void;
}

const PROJECT_IMAGE_PRESETS = [
  'https://images.unsplash.com/photo-1551288049-bebda4e38f71?w=800&auto=format&fit=crop&q=80',
  'https://images.unsplash.com/photo-1507238691740-187a5b1d37b8?w=800&auto=format&fit=crop&q=80',
  'https://images.unsplash.com/photo-1460925895917-afdab827c52f?w=800&auto=format&fit=crop&q=80',
  'https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?w=800&auto=format&fit=crop&q=80',
  'https://images.unsplash.com/photo-1558655146-d09347e92766?w=800&auto=format&fit=crop&q=80',
  'https://images.unsplash.com/photo-1526374965328-7f61d4dc18c5?w=800&auto=format&fit=crop&q=80',
];

export const ProjectsManager: React.FC<Props> = ({
  projects,
  onUpdateProjects,
  onOpenAiHelper,
}) => {
  const [editingId, setEditingId] = useState<string | null>(projects[0]?.id || null);

  const handleAddProject = () => {
    const newProj: ProjectItem = {
      id: `p_${Date.now()}`,
      title: 'New Featured Project',
      tagline: 'Short one-line impactful pitch of this platform.',
      description: 'Comprehensive overview of the engineering, architectural challenges, and outcome achieved.',
      category: 'Web App',
      tags: ['React', 'TypeScript', 'Tailwind'],
      imageUrl: PROJECT_IMAGE_PRESETS[Math.floor(Math.random() * PROJECT_IMAGE_PRESETS.length)],
      liveUrl: 'https://example.com',
      githubUrl: 'https://github.com',
      featured: true,
      metrics: '10k+ Active Users',
      year: new Date().getFullYear().toString(),
    };
    onUpdateProjects([newProj, ...projects]);
    setEditingId(newProj.id);
  };

  const handleRemoveProject = (id: string) => {
    onUpdateProjects(projects.filter((p) => p.id !== id));
    if (editingId === id) setEditingId(null);
  };

  const handleUpdate = (id: string, updates: Partial<ProjectItem>) => {
    onUpdateProjects(projects.map((p) => (p.id === id ? { ...p, ...updates } : p)));
  };

  return (
    <div className="space-y-8">
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-xl font-bold text-white tracking-tight">Projects & Case Studies</h2>
          <p className="text-xs text-neutral-400 mt-1">
            Highlight your best applications, design systems, and client deliverables.
          </p>
        </div>
        <button
          type="button"
          onClick={handleAddProject}
          className="px-4 py-2 rounded-xl bg-indigo-600 hover:bg-indigo-500 text-white font-bold text-xs flex items-center gap-1.5 shadow-md transition-colors"
        >
          <Plus className="w-4 h-4" /> Add Project
        </button>
      </div>

      {/* Projects List and Detail Editor */}
      <div className="space-y-6">
        {projects.map((proj) => {
          const isEditing = editingId === proj.id;
          return (
            <div
              key={proj.id}
              className={`rounded-2xl border transition-all ${
                isEditing
                  ? 'bg-neutral-900 border-indigo-500/50 shadow-xl'
                  : 'bg-neutral-900/60 border-neutral-800 hover:border-neutral-700'
              }`}
            >
              {/* Card Header */}
              <div
                onClick={() => setEditingId(isEditing ? null : proj.id)}
                className="p-4 flex items-center justify-between cursor-pointer"
              >
                <div className="flex items-center gap-3">
                  {proj.imageUrl && (
                    <img
                      src={proj.imageUrl}
                      alt={proj.title}
                      className="w-12 h-12 rounded-xl object-cover border border-neutral-700 shrink-0"
                    />
                  )}
                  <div>
                    <div className="flex items-center gap-2">
                      <h3 className="font-bold text-sm text-white">{proj.title}</h3>
                      {proj.featured && (
                        <span className="text-[10px] px-1.5 py-0.5 rounded bg-amber-500/20 text-amber-300 border border-amber-500/30">
                          Featured
                        </span>
                      )}
                    </div>
                    <p className="text-xs text-neutral-400 mt-0.5 font-mono">{proj.category} &bull; {proj.year}</p>
                  </div>
                </div>

                <div className="flex items-center gap-2">
                  <button
                    type="button"
                    onClick={(e) => {
                      e.stopPropagation();
                      handleRemoveProject(proj.id);
                    }}
                    className="p-1.5 text-neutral-500 hover:text-red-400 transition-colors"
                  >
                    <Trash2 className="w-4 h-4" />
                  </button>
                  <span className="text-xs text-indigo-400 font-semibold px-2 py-1 rounded bg-indigo-500/10">
                    {isEditing ? 'Collapse' : 'Edit'}
                  </span>
                </div>
              </div>

              {/* Collapsible Edit Form */}
              {isEditing && (
                <div className="p-6 border-t border-neutral-800 space-y-4">
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div className="space-y-1">
                      <label className="text-xs font-semibold text-neutral-300">Project Title</label>
                      <input
                        type="text"
                        value={proj.title}
                        onChange={(e) => handleUpdate(proj.id, { title: e.target.value })}
                        className="w-full px-3 py-2 rounded-xl bg-neutral-950 border border-neutral-800 text-xs text-white focus:outline-hidden focus:border-indigo-500"
                      />
                    </div>
                    <div className="space-y-1">
                      <label className="text-xs font-semibold text-neutral-300">Category</label>
                      <input
                        type="text"
                        value={proj.category}
                        onChange={(e) => handleUpdate(proj.id, { category: e.target.value })}
                        className="w-full px-3 py-2 rounded-xl bg-neutral-950 border border-neutral-800 text-xs text-white focus:outline-hidden focus:border-indigo-500"
                      />
                    </div>
                  </div>

                  <div className="space-y-1">
                    <label className="text-xs font-semibold text-neutral-300">Short Tagline / Catchphrase</label>
                    <input
                      type="text"
                      value={proj.tagline}
                      onChange={(e) => handleUpdate(proj.id, { tagline: e.target.value })}
                      className="w-full px-3 py-2 rounded-xl bg-neutral-950 border border-neutral-800 text-xs text-white focus:outline-hidden focus:border-indigo-500"
                    />
                  </div>

                  <div className="space-y-1">
                    <div className="flex items-center justify-between">
                      <label className="text-xs font-semibold text-neutral-300">Detailed Description</label>
                      {onOpenAiHelper && (
                        <button
                          type="button"
                          onClick={() => onOpenAiHelper(proj.id)}
                          className="text-[11px] text-indigo-400 hover:text-indigo-300 flex items-center gap-1"
                        >
                          <Sparkles className="w-3 h-3" /> AI Enhance
                        </button>
                      )}
                    </div>
                    <textarea
                      rows={3}
                      value={proj.description}
                      onChange={(e) => handleUpdate(proj.id, { description: e.target.value })}
                      className="w-full px-3 py-2 rounded-xl bg-neutral-950 border border-neutral-800 text-xs text-white focus:outline-hidden focus:border-indigo-500 leading-relaxed"
                    />
                  </div>

                  {/* Image Cover URL and Presets */}
                  <ImageUploadField
                    label="Project Cover Image"
                    value={proj.imageUrl}
                    onChange={(url) => handleUpdate(proj.id, { imageUrl: url })}
                    presets={PROJECT_IMAGE_PRESETS}
                    aspectRatio="video"
                    maxDimension={1200}
                    helpText="Upload screenshot or artwork from gallery"
                  />

                  {/* Links & Metrics */}
                  <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                    <div className="space-y-1">
                      <label className="text-xs font-semibold text-neutral-300">Live Demo URL</label>
                      <input
                        type="text"
                        value={proj.liveUrl || ''}
                        onChange={(e) => handleUpdate(proj.id, { liveUrl: e.target.value })}
                        placeholder="https://..."
                        className="w-full px-3 py-2 rounded-xl bg-neutral-950 border border-neutral-800 text-xs text-white focus:outline-hidden focus:border-indigo-500"
                      />
                    </div>
                    <div className="space-y-1">
                      <label className="text-xs font-semibold text-neutral-300">GitHub / Code URL</label>
                      <input
                        type="text"
                        value={proj.githubUrl || ''}
                        onChange={(e) => handleUpdate(proj.id, { githubUrl: e.target.value })}
                        placeholder="https://github.com/..."
                        className="w-full px-3 py-2 rounded-xl bg-neutral-950 border border-neutral-800 text-xs text-white focus:outline-hidden focus:border-indigo-500"
                      />
                    </div>
                    <div className="space-y-1">
                      <label className="text-xs font-semibold text-neutral-300">Key Metric Badge</label>
                      <input
                        type="text"
                        value={proj.metrics || ''}
                        onChange={(e) => handleUpdate(proj.id, { metrics: e.target.value })}
                        placeholder="e.g. 10k Stars / 14ms Latency"
                        className="w-full px-3 py-2 rounded-xl bg-neutral-950 border border-neutral-800 text-xs text-white focus:outline-hidden focus:border-indigo-500"
                      />
                    </div>
                  </div>

                  {/* Tags */}
                  <div className="space-y-1">
                    <label className="text-xs font-semibold text-neutral-300">Tags (comma separated)</label>
                    <input
                      type="text"
                      value={proj.tags.join(', ')}
                      onChange={(e) =>
                        handleUpdate(proj.id, {
                          tags: e.target.value.split(',').map((t) => t.trim()).filter(Boolean),
                        })
                      }
                      placeholder="React, TypeScript, Tailwind, Docker"
                      className="w-full px-3 py-2 rounded-xl bg-neutral-950 border border-neutral-800 text-xs text-white focus:outline-hidden focus:border-indigo-500"
                    />
                  </div>
                </div>
              )}
            </div>
          );
        })}
      </div>
    </div>
  );
};
