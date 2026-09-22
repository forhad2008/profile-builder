import React, { useState } from 'react';
import { ExperienceItem, EducationItem } from '../../types/portfolio';
import { Plus, Trash2, Briefcase, GraduationCap, CheckCircle2 } from 'lucide-react';

interface Props {
  experience: ExperienceItem[];
  education: EducationItem[];
  onUpdateExperience: (exp: ExperienceItem[]) => void;
  onUpdateEducation: (edu: EducationItem[]) => void;
}

export const ExperienceManager: React.FC<Props> = ({
  experience,
  education,
  onUpdateExperience,
  onUpdateEducation,
}) => {
  const [activeTab, setActiveTab] = useState<'work' | 'education'>('work');

  const handleAddExperience = () => {
    const newItem: ExperienceItem = {
      id: `exp_${Date.now()}`,
      role: 'Senior Engineer / Specialist',
      company: 'Tech Innovations Inc.',
      location: 'San Francisco, CA & Remote',
      period: `${new Date().getFullYear() - 1} — Present`,
      current: true,
      description: 'Led technical architecture, cross-team engineering execution, and shipped key core initiatives.',
      achievements: [
        'Improved platform throughput by 40% while reducing cloud costs.',
        'Mentored junior engineers and designed reusable core modules.',
      ],
      technologies: ['TypeScript', 'Node.js', 'PostgreSQL', 'Docker'],
    };
    onUpdateExperience([newItem, ...experience]);
  };

  const handleAddEducation = () => {
    const newItem: EducationItem = {
      id: `edu_${Date.now()}`,
      degree: 'B.S. in Computer Science',
      field: 'Software Engineering & Systems',
      institution: 'State University of Technology',
      location: 'California, USA',
      period: '2016 — 2020',
      description: 'Graduated with Honors. Focused on algorithms and human-computer interfaces.',
      gpa: '3.9 / 4.0',
    };
    onUpdateEducation([...education, newItem]);
  };

  const updateExp = (id: string, updates: Partial<ExperienceItem>) => {
    onUpdateExperience(experience.map((e) => (e.id === id ? { ...e, ...updates } : e)));
  };

  const removeExp = (id: string) => {
    onUpdateExperience(experience.filter((e) => e.id !== id));
  };

  const updateEdu = (id: string, updates: Partial<EducationItem>) => {
    onUpdateEducation(education.map((e) => (e.id === id ? { ...e, ...updates } : e)));
  };

  const removeEdu = (id: string) => {
    onUpdateEducation(education.filter((e) => e.id !== id));
  };

  return (
    <div className="space-y-8">
      <div>
        <h2 className="text-xl font-bold text-white tracking-tight">Career & Education Timeline</h2>
        <p className="text-xs text-neutral-400 mt-1">
          Add your employment history, leadership achievements, and academic credentials.
        </p>
      </div>

      {/* Tabs */}
      <div className="flex items-center gap-2 p-1 rounded-xl bg-neutral-900 border border-neutral-800 w-fit">
        <button
          type="button"
          onClick={() => setActiveTab('work')}
          className={`px-4 py-1.5 rounded-lg text-xs font-bold transition-all flex items-center gap-2 ${
            activeTab === 'work' ? 'bg-indigo-600 text-white shadow-sm' : 'text-neutral-400 hover:text-white'
          }`}
        >
          <Briefcase className="w-3.5 h-3.5" /> Work Experience ({experience.length})
        </button>
        <button
          type="button"
          onClick={() => setActiveTab('education')}
          className={`px-4 py-1.5 rounded-lg text-xs font-bold transition-all flex items-center gap-2 ${
            activeTab === 'education' ? 'bg-indigo-600 text-white shadow-sm' : 'text-neutral-400 hover:text-white'
          }`}
        >
          <GraduationCap className="w-3.5 h-3.5" /> Education & Degrees ({education.length})
        </button>
      </div>

      {/* Work Experience Tab */}
      {activeTab === 'work' && (
        <div className="space-y-6">
          <div className="flex justify-end">
            <button
              type="button"
              onClick={handleAddExperience}
              className="px-4 py-2 rounded-xl bg-indigo-600 hover:bg-indigo-500 text-white font-bold text-xs flex items-center gap-1.5 shadow-md transition-colors"
            >
              <Plus className="w-4 h-4" /> Add Role / Experience
            </button>
          </div>

          <div className="space-y-4">
            {experience.map((exp) => (
              <div key={exp.id} className="p-5 rounded-2xl bg-neutral-900 border border-neutral-800 space-y-4">
                <div className="flex items-start justify-between gap-4">
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 w-full">
                    <div>
                      <label className="text-[11px] text-neutral-400">Job Title / Role</label>
                      <input
                        type="text"
                        value={exp.role}
                        onChange={(e) => updateExp(exp.id, { role: e.target.value })}
                        className="w-full px-3 py-1.5 rounded-lg bg-neutral-950 border border-neutral-800 text-xs text-white focus:outline-hidden focus:border-indigo-500"
                      />
                    </div>
                    <div>
                      <label className="text-[11px] text-neutral-400">Company Name</label>
                      <input
                        type="text"
                        value={exp.company}
                        onChange={(e) => updateExp(exp.id, { company: e.target.value })}
                        className="w-full px-3 py-1.5 rounded-lg bg-neutral-950 border border-neutral-800 text-xs text-white focus:outline-hidden focus:border-indigo-500"
                      />
                    </div>
                  </div>
                  <button
                    type="button"
                    onClick={() => removeExp(exp.id)}
                    className="p-1.5 text-neutral-500 hover:text-red-400 transition-colors shrink-0"
                  >
                    <Trash2 className="w-4 h-4" />
                  </button>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                  <div>
                    <label className="text-[11px] text-neutral-400">Duration / Period</label>
                    <input
                      type="text"
                      value={exp.period}
                      onChange={(e) => updateExp(exp.id, { period: e.target.value })}
                      placeholder="2022 — Present"
                      className="w-full px-3 py-1.5 rounded-lg bg-neutral-950 border border-neutral-800 text-xs text-white focus:outline-hidden focus:border-indigo-500"
                    />
                  </div>
                  <div>
                    <label className="text-[11px] text-neutral-400">Location</label>
                    <input
                      type="text"
                      value={exp.location}
                      onChange={(e) => updateExp(exp.id, { location: e.target.value })}
                      placeholder="New York, NY"
                      className="w-full px-3 py-1.5 rounded-lg bg-neutral-950 border border-neutral-800 text-xs text-white focus:outline-hidden focus:border-indigo-500"
                    />
                  </div>
                </div>

                <div>
                  <label className="text-[11px] text-neutral-400">Role Summary</label>
                  <textarea
                    rows={2}
                    value={exp.description}
                    onChange={(e) => updateExp(exp.id, { description: e.target.value })}
                    className="w-full px-3 py-1.5 rounded-lg bg-neutral-950 border border-neutral-800 text-xs text-white focus:outline-hidden focus:border-indigo-500 leading-relaxed"
                  />
                </div>

                <div>
                  <label className="text-[11px] text-neutral-400">Key Achievements (one per line)</label>
                  <textarea
                    rows={2}
                    value={exp.achievements?.join('\n') || ''}
                    onChange={(e) =>
                      updateExp(exp.id, {
                        achievements: e.target.value.split('\n').filter(Boolean),
                      })
                    }
                    placeholder="Reduced latency by 30%&#10;Scaled system to 2M users"
                    className="w-full px-3 py-1.5 rounded-lg bg-neutral-950 border border-neutral-800 text-xs text-white focus:outline-hidden focus:border-indigo-500 font-mono"
                  />
                </div>

                <div>
                  <label className="text-[11px] text-neutral-400">Tech Stack (comma separated)</label>
                  <input
                    type="text"
                    value={exp.technologies?.join(', ') || ''}
                    onChange={(e) =>
                      updateExp(exp.id, {
                        technologies: e.target.value.split(',').map((t) => t.trim()).filter(Boolean),
                      })
                    }
                    placeholder="React, TypeScript, AWS, Docker"
                    className="w-full px-3 py-1.5 rounded-lg bg-neutral-950 border border-neutral-800 text-xs text-white focus:outline-hidden focus:border-indigo-500"
                  />
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Education Tab */}
      {activeTab === 'education' && (
        <div className="space-y-6">
          <div className="flex justify-end">
            <button
              type="button"
              onClick={handleAddEducation}
              className="px-4 py-2 rounded-xl bg-indigo-600 hover:bg-indigo-500 text-white font-bold text-xs flex items-center gap-1.5 shadow-md transition-colors"
            >
              <Plus className="w-4 h-4" /> Add Degree / Certification
            </button>
          </div>

          <div className="space-y-4">
            {education.map((edu) => (
              <div key={edu.id} className="p-5 rounded-2xl bg-neutral-900 border border-neutral-800 space-y-3">
                <div className="flex items-start justify-between gap-4">
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 w-full">
                    <div>
                      <label className="text-[11px] text-neutral-400">Degree & Major</label>
                      <input
                        type="text"
                        value={edu.degree}
                        onChange={(e) => updateEdu(edu.id, { degree: e.target.value })}
                        className="w-full px-3 py-1.5 rounded-lg bg-neutral-950 border border-neutral-800 text-xs text-white focus:outline-hidden focus:border-indigo-500"
                      />
                    </div>
                    <div>
                      <label className="text-[11px] text-neutral-400">University / Institution</label>
                      <input
                        type="text"
                        value={edu.institution}
                        onChange={(e) => updateEdu(edu.id, { institution: e.target.value })}
                        className="w-full px-3 py-1.5 rounded-lg bg-neutral-950 border border-neutral-800 text-xs text-white focus:outline-hidden focus:border-indigo-500"
                      />
                    </div>
                  </div>
                  <button
                    type="button"
                    onClick={() => removeEdu(edu.id)}
                    className="p-1.5 text-neutral-500 hover:text-red-400 transition-colors shrink-0"
                  >
                    <Trash2 className="w-4 h-4" />
                  </button>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                  <div>
                    <label className="text-[11px] text-neutral-400">Period / Years</label>
                    <input
                      type="text"
                      value={edu.period}
                      onChange={(e) => updateEdu(edu.id, { period: e.target.value })}
                      placeholder="2016 — 2020"
                      className="w-full px-3 py-1.5 rounded-lg bg-neutral-950 border border-neutral-800 text-xs text-white focus:outline-hidden focus:border-indigo-500"
                    />
                  </div>
                  <div>
                    <label className="text-[11px] text-neutral-400">Location</label>
                    <input
                      type="text"
                      value={edu.location}
                      onChange={(e) => updateEdu(edu.id, { location: e.target.value })}
                      placeholder="Berkeley, CA"
                      className="w-full px-3 py-1.5 rounded-lg bg-neutral-950 border border-neutral-800 text-xs text-white focus:outline-hidden focus:border-indigo-500"
                    />
                  </div>
                  <div>
                    <label className="text-[11px] text-neutral-400">GPA / Honors</label>
                    <input
                      type="text"
                      value={edu.gpa || ''}
                      onChange={(e) => updateEdu(edu.id, { gpa: e.target.value })}
                      placeholder="3.9 / 4.0"
                      className="w-full px-3 py-1.5 rounded-lg bg-neutral-950 border border-neutral-800 text-xs text-white focus:outline-hidden focus:border-indigo-500"
                    />
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
};
