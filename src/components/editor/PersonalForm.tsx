import React, { useState } from 'react';
import { PersonalInfo, SocialLinks } from '../../types/portfolio';
import { User, Mail, MapPin, Phone, Globe, Briefcase, Sparkles, Wand2, Image as ImageIcon } from 'lucide-react';
import { ImageUploadField } from './ImageUploadField';

interface Props {
  personal: PersonalInfo;
  socials: SocialLinks;
  onUpdatePersonal: (fields: Partial<PersonalInfo>) => void;
  onUpdateSocials: (fields: Partial<SocialLinks>) => void;
  onOpenAiHelper?: (field: 'bio' | 'tagline') => void;
}

const AVATAR_PRESETS = [
  'https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=500&auto=format&fit=crop&q=80',
  'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=500&auto=format&fit=crop&q=80',
  'https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?w=500&auto=format&fit=crop&q=80',
  'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=500&auto=format&fit=crop&q=80',
  'https://images.unsplash.com/photo-1580489944761-15a19d654956?w=500&auto=format&fit=crop&q=80',
  'https://images.unsplash.com/photo-1519085360753-af0119f7cbe7?w=500&auto=format&fit=crop&q=80',
  'https://images.unsplash.com/photo-1517841905240-472988babdf9?w=500&auto=format&fit=crop&q=80',
];

export const PersonalForm: React.FC<Props> = ({
  personal,
  socials,
  onUpdatePersonal,
  onUpdateSocials,
  onOpenAiHelper,
}) => {
  return (
    <div className="space-y-8">
      <div>
        <h2 className="text-xl font-bold text-white tracking-tight">Personal & Bio Info</h2>
        <p className="text-xs text-neutral-400 mt-1">
          Provide your identity, executive title, mission statement, and core profile assets.
        </p>
      </div>

      {/* Avatar & Photo Section */}
      <ImageUploadField
        label="Profile Photo / Portrait"
        value={personal.avatar}
        onChange={(url) => onUpdatePersonal({ avatar: url })}
        presets={AVATAR_PRESETS}
        aspectRatio="square"
        maxDimension={800}
        helpText="Upload from phone gallery, laptop disk, or pick a preset"
      />

      {/* Basic Credentials */}
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        <div className="space-y-1.5">
          <label className="text-xs font-semibold text-neutral-300">Full Name</label>
          <input
            type="text"
            value={personal.name}
            onChange={(e) => onUpdatePersonal({ name: e.target.value })}
            placeholder="e.g. Alex Rivera"
            className="w-full px-3.5 py-2.5 rounded-xl bg-neutral-900 border border-neutral-800 text-sm text-white focus:outline-hidden focus:border-indigo-500"
          />
        </div>

        <div className="space-y-1.5">
          <label className="text-xs font-semibold text-neutral-300">Professional Title / Headline</label>
          <input
            type="text"
            value={personal.title}
            onChange={(e) => onUpdatePersonal({ title: e.target.value })}
            placeholder="e.g. Senior Cloud Architect & Full-Stack Lead"
            className="w-full px-3.5 py-2.5 rounded-xl bg-neutral-900 border border-neutral-800 text-sm text-white focus:outline-hidden focus:border-indigo-500"
          />
        </div>
      </div>

      {/* Tagline / Elevator Pitch */}
      <div className="space-y-1.5">
        <div className="flex items-center justify-between">
          <label className="text-xs font-semibold text-neutral-300">Short Tagline / Pitch</label>
          {onOpenAiHelper && (
            <button
              type="button"
              onClick={() => onOpenAiHelper('tagline')}
              className="text-[11px] text-indigo-400 hover:text-indigo-300 flex items-center gap-1"
            >
              <Sparkles className="w-3 h-3" /> AI Polish
            </button>
          )}
        </div>
        <input
          type="text"
          value={personal.tagline}
          onChange={(e) => onUpdatePersonal({ tagline: e.target.value })}
          placeholder="e.g. Crafting resilient distributed systems and blazing fast web apps."
          className="w-full px-3.5 py-2.5 rounded-xl bg-neutral-900 border border-neutral-800 text-sm text-white focus:outline-hidden focus:border-indigo-500"
        />
      </div>

      {/* Bio / About Story */}
      <div className="space-y-1.5">
        <div className="flex items-center justify-between">
          <label className="text-xs font-semibold text-neutral-300">About Bio</label>
          {onOpenAiHelper && (
            <button
              type="button"
              onClick={() => onOpenAiHelper('bio')}
              className="text-[11px] text-indigo-400 hover:text-indigo-300 flex items-center gap-1"
            >
              <Wand2 className="w-3 h-3" /> AI Generate / Polish
            </button>
          )}
        </div>
        <textarea
          rows={4}
          value={personal.bio}
          onChange={(e) => onUpdatePersonal({ bio: e.target.value })}
          placeholder="Tell your professional narrative, past achievements, and what drives your work..."
          className="w-full px-3.5 py-2.5 rounded-xl bg-neutral-900 border border-neutral-800 text-sm text-white focus:outline-hidden focus:border-indigo-500 leading-relaxed"
        />
      </div>

      {/* Availability Status */}
      <div className="p-4 rounded-xl bg-neutral-900/80 border border-neutral-800 space-y-3">
        <div className="flex items-center justify-between">
          <div>
            <label className="text-xs font-bold text-neutral-200">Open for Work / Freelance / Contracts</label>
            <p className="text-[11px] text-neutral-400">Shows a green indicator badge on your portfolio</p>
          </div>
          <button
            type="button"
            onClick={() => onUpdatePersonal({ availableForWork: !personal.availableForWork })}
            className={`w-11 h-6 rounded-full transition-colors relative ${personal.availableForWork ? 'bg-emerald-500' : 'bg-neutral-700'}`}
          >
            <span
              className={`block w-4 h-4 rounded-full bg-white transition-transform ${personal.availableForWork ? 'translate-x-6' : 'translate-x-1'}`}
            />
          </button>
        </div>
        {personal.availableForWork && (
          <input
            type="text"
            value={personal.statusText}
            onChange={(e) => onUpdatePersonal({ statusText: e.target.value })}
            placeholder="e.g. Available for Q1 Select Advisory & Builds"
            className="w-full px-3 py-1.5 rounded-lg bg-neutral-950 border border-neutral-800 text-xs text-white focus:outline-hidden focus:border-emerald-500"
          />
        )}
      </div>

      {/* Metrics / Key Numbers */}
      <div className="p-4 rounded-xl bg-neutral-900/80 border border-neutral-800 space-y-3">
        <label className="text-xs font-bold text-neutral-300 uppercase tracking-wider block">
          Key Statistics & Experience
        </label>
        <div className="grid grid-cols-3 gap-3">
          <div>
            <label className="text-[11px] text-neutral-400 block mb-1">Years Exp</label>
            <input
              type="number"
              value={personal.yearsOfExperience}
              onChange={(e) => onUpdatePersonal({ yearsOfExperience: parseInt(e.target.value) || 0 })}
              className="w-full px-3 py-2 rounded-lg bg-neutral-950 border border-neutral-800 text-sm font-bold text-white focus:outline-hidden focus:border-indigo-500"
            />
          </div>
          <div>
            <label className="text-[11px] text-neutral-400 block mb-1">Projects</label>
            <input
              type="number"
              value={personal.completedProjects}
              onChange={(e) => onUpdatePersonal({ completedProjects: parseInt(e.target.value) || 0 })}
              className="w-full px-3 py-2 rounded-lg bg-neutral-950 border border-neutral-800 text-sm font-bold text-white focus:outline-hidden focus:border-indigo-500"
            />
          </div>
          <div>
            <label className="text-[11px] text-neutral-400 block mb-1">Clients / Partners</label>
            <input
              type="number"
              value={personal.satisfiedClients}
              onChange={(e) => onUpdatePersonal({ satisfiedClients: parseInt(e.target.value) || 0 })}
              className="w-full px-3 py-2 rounded-lg bg-neutral-950 border border-neutral-800 text-sm font-bold text-white focus:outline-hidden focus:border-indigo-500"
            />
          </div>
        </div>
      </div>

      {/* Contact & Socials */}
      <div className="space-y-4">
        <label className="text-xs font-bold text-neutral-300 uppercase tracking-wider block">
          Contact & Social Channels
        </label>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
          <div className="space-y-1">
            <span className="text-[11px] text-neutral-400">Email Address</span>
            <input
              type="email"
              value={personal.email}
              onChange={(e) => onUpdatePersonal({ email: e.target.value })}
              placeholder="alex@craftstudio.dev"
              className="w-full px-3 py-2 rounded-lg bg-neutral-900 border border-neutral-800 text-xs text-white focus:outline-hidden focus:border-indigo-500"
            />
          </div>
          <div className="space-y-1">
            <span className="text-[11px] text-neutral-400">Location</span>
            <input
              type="text"
              value={personal.location}
              onChange={(e) => onUpdatePersonal({ location: e.target.value })}
              placeholder="San Francisco, CA"
              className="w-full px-3 py-2 rounded-lg bg-neutral-900 border border-neutral-800 text-xs text-white focus:outline-hidden focus:border-indigo-500"
            />
          </div>
          <div className="space-y-1">
            <span className="text-[11px] text-neutral-400">GitHub Profile URL</span>
            <input
              type="text"
              value={socials.github || ''}
              onChange={(e) => onUpdateSocials({ github: e.target.value })}
              placeholder="https://github.com/..."
              className="w-full px-3 py-2 rounded-lg bg-neutral-900 border border-neutral-800 text-xs text-white focus:outline-hidden focus:border-indigo-500"
            />
          </div>
          <div className="space-y-1">
            <span className="text-[11px] text-neutral-400">LinkedIn Profile URL</span>
            <input
              type="text"
              value={socials.linkedin || ''}
              onChange={(e) => onUpdateSocials({ linkedin: e.target.value })}
              placeholder="https://linkedin.com/in/..."
              className="w-full px-3 py-2 rounded-lg bg-neutral-900 border border-neutral-800 text-xs text-white focus:outline-hidden focus:border-indigo-500"
            />
          </div>
          <div className="space-y-1">
            <span className="text-[11px] text-neutral-400">Twitter / X URL</span>
            <input
              type="text"
              value={socials.twitter || ''}
              onChange={(e) => onUpdateSocials({ twitter: e.target.value })}
              placeholder="https://x.com/..."
              className="w-full px-3 py-2 rounded-lg bg-neutral-900 border border-neutral-800 text-xs text-white focus:outline-hidden focus:border-indigo-500"
            />
          </div>
          <div className="space-y-1">
            <span className="text-[11px] text-neutral-400">Resume Link (PDF)</span>
            <input
              type="text"
              value={personal.resumeUrl || ''}
              onChange={(e) => onUpdatePersonal({ resumeUrl: e.target.value })}
              placeholder="https://example.com/resume.pdf"
              className="w-full px-3 py-2 rounded-lg bg-neutral-900 border border-neutral-800 text-xs text-white focus:outline-hidden focus:border-indigo-500"
            />
          </div>
        </div>
      </div>
    </div>
  );
};
