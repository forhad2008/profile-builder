import React, { useState } from 'react';
import { SkillItem } from '../../types/portfolio';
import { Plus, Trash2, Sliders, Sparkles, Tag } from 'lucide-react';

interface Props {
  skills: SkillItem[];
  onUpdateSkills: (skills: SkillItem[]) => void;
}

const COMMON_SKILL_PRESETS = [
  { name: 'TypeScript', category: 'Frontend', level: 95 },
  { name: 'React 19', category: 'Frontend', level: 95 },
  { name: 'Tailwind CSS', category: 'Frontend', level: 90 },
  { name: 'Node.js', category: 'Backend', level: 90 },
  { name: 'PostgreSQL', category: 'Backend', level: 85 },
  { name: 'Go / Golang', category: 'Backend', level: 80 },
  { name: 'Python & AI', category: 'AI / ML', level: 85 },
  { name: 'Docker & Kubernetes', category: 'DevOps', level: 80 },
  { name: 'Figma UI/UX', category: 'Design', level: 90 },
  { name: 'GraphQL & gRPC', category: 'Backend', level: 85 },
  { name: 'System Design', category: 'Architecture', level: 90 },
];

export const SkillsManager: React.FC<Props> = ({ skills, onUpdateSkills }) => {
  const [newSkillName, setNewSkillName] = useState('');
  const [newSkillCat, setNewSkillCat] = useState('Frontend');
  const [newSkillLevel, setNewSkillLevel] = useState(85);

  const handleAddSkill = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newSkillName.trim()) return;

    const newItem: SkillItem = {
      id: `s_${Date.now()}`,
      name: newSkillName.trim(),
      category: newSkillCat.trim() || 'General',
      level: newSkillLevel,
    };

    onUpdateSkills([...skills, newItem]);
    setNewSkillName('');
  };

  const handleRemoveSkill = (id: string) => {
    onUpdateSkills(skills.filter((s) => s.id !== id));
  };

  const handleUpdateSkill = (id: string, updates: Partial<SkillItem>) => {
    onUpdateSkills(skills.map((s) => (s.id === id ? { ...s, ...updates } : s)));
  };

  const handleAddPreset = (preset: { name: string; category: string; level: number }) => {
    if (skills.some((s) => s.name.toLowerCase() === preset.name.toLowerCase())) return;
    const newItem: SkillItem = {
      id: `s_${Date.now()}_${Math.random().toString(36).substr(2, 4)}`,
      name: preset.name,
      category: preset.category,
      level: preset.level,
    };
    onUpdateSkills([...skills, newItem]);
  };

  return (
    <div className="space-y-8">
      <div>
        <h2 className="text-xl font-bold text-white tracking-tight">Skills & Tech Stack</h2>
        <p className="text-xs text-neutral-400 mt-1">
          Add the programming languages, frameworks, design tools, and capabilities you master.
        </p>
      </div>

      {/* Add New Skill Form */}
      <form onSubmit={handleAddSkill} className="p-5 rounded-2xl bg-neutral-900 border border-neutral-800 space-y-4">
        <span className="text-xs font-bold text-neutral-300 uppercase tracking-wider block">
          Add New Skill
        </span>
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
          <div className="sm:col-span-2">
            <input
              type="text"
              value={newSkillName}
              onChange={(e) => setNewSkillName(e.target.value)}
              placeholder="e.g. Next.js, Rust, Kubernetes..."
              className="w-full px-3.5 py-2 rounded-xl bg-neutral-950 border border-neutral-800 text-xs text-white placeholder:text-neutral-600 focus:outline-hidden focus:border-indigo-500"
            />
          </div>
          <div>
            <input
              type="text"
              value={newSkillCat}
              onChange={(e) => setNewSkillCat(e.target.value)}
              placeholder="Category (e.g. Frontend)"
              className="w-full px-3.5 py-2 rounded-xl bg-neutral-950 border border-neutral-800 text-xs text-white placeholder:text-neutral-600 focus:outline-hidden focus:border-indigo-500"
            />
          </div>
        </div>

        <div className="flex items-center justify-between gap-4 pt-1">
          <div className="flex items-center gap-3 flex-1">
            <span className="text-xs text-neutral-400">Proficiency:</span>
            <input
              type="range"
              min="20"
              max="100"
              value={newSkillLevel}
              onChange={(e) => setNewSkillLevel(parseInt(e.target.value))}
              className="flex-1 accent-indigo-500"
            />
            <span className="text-xs font-mono text-indigo-400 w-10 text-right">{newSkillLevel}%</span>
          </div>

          <button
            type="submit"
            className="px-4 py-2 rounded-xl bg-indigo-600 hover:bg-indigo-500 text-white font-bold text-xs flex items-center gap-1.5 transition-colors shrink-0 shadow-md"
          >
            <Plus className="w-4 h-4" /> Add Skill
          </button>
        </div>
      </form>

      {/* Preset Suggestions */}
      <div className="space-y-2">
        <span className="text-[11px] font-semibold text-neutral-400 flex items-center gap-1">
          <Sparkles className="w-3 h-3 text-indigo-400" /> Popular Skill Presets (Click to add):
        </span>
        <div className="flex flex-wrap gap-1.5">
          {COMMON_SKILL_PRESETS.map((p) => {
            const exists = skills.some((s) => s.name.toLowerCase() === p.name.toLowerCase());
            return (
              <button
                key={p.name}
                type="button"
                disabled={exists}
                onClick={() => handleAddPreset(p)}
                className={`text-[11px] px-2.5 py-1 rounded-lg border transition-all ${
                  exists
                    ? 'bg-neutral-900 border-neutral-800 text-neutral-600 cursor-not-allowed'
                    : 'bg-neutral-800 hover:bg-neutral-700 border-neutral-700 text-neutral-300 hover:text-white hover:border-indigo-500/40'
                }`}
              >
                + {p.name}
              </button>
            );
          })}
        </div>
      </div>

      {/* Active Skills List */}
      <div className="space-y-3">
        <span className="text-xs font-bold text-neutral-300 uppercase tracking-wider block">
          Current Skills ({skills.length})
        </span>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
          {skills.map((skill) => (
            <div
              key={skill.id}
              className="p-3.5 rounded-xl bg-neutral-900 border border-neutral-800 space-y-2.5 hover:border-neutral-700 transition-colors"
            >
              <div className="flex items-center justify-between">
                <input
                  type="text"
                  value={skill.name}
                  onChange={(e) => handleUpdateSkill(skill.id, { name: e.target.value })}
                  className="font-bold text-xs text-white bg-transparent focus:outline-hidden focus:border-b border-indigo-500"
                />
                <button
                  type="button"
                  onClick={() => handleRemoveSkill(skill.id)}
                  className="p-1 rounded text-neutral-500 hover:text-red-400 hover:bg-neutral-800 transition-colors"
                >
                  <Trash2 className="w-3.5 h-3.5" />
                </button>
              </div>

              <div className="flex items-center justify-between text-[11px] text-neutral-400">
                <input
                  type="text"
                  value={skill.category}
                  onChange={(e) => handleUpdateSkill(skill.id, { category: e.target.value })}
                  placeholder="Category"
                  className="bg-transparent text-[11px] text-indigo-400 focus:outline-hidden focus:border-b border-indigo-500"
                />
                <span className="font-mono text-neutral-300">{skill.level}%</span>
              </div>

              <input
                type="range"
                min="20"
                max="100"
                value={skill.level}
                onChange={(e) => handleUpdateSkill(skill.id, { level: parseInt(e.target.value) })}
                className="w-full accent-indigo-500 h-1.5 bg-neutral-800 rounded-lg cursor-pointer"
              />
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};
