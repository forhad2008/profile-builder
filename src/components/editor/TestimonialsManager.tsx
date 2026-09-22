import React from 'react';
import { TestimonialItem } from '../../types/portfolio';
import { Plus, Trash2, Star, User } from 'lucide-react';
import { ImageUploadField } from './ImageUploadField';

interface Props {
  testimonials: TestimonialItem[];
  onUpdateTestimonials: (testimonials: TestimonialItem[]) => void;
}

const TESTIMONIAL_AVATARS = [
  'https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=200&auto=format&fit=crop&q=80',
  'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=200&auto=format&fit=crop&q=80',
  'https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?w=200&auto=format&fit=crop&q=80',
  'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=200&auto=format&fit=crop&q=80',
  'https://images.unsplash.com/photo-1580489944761-15a19d654956?w=200&auto=format&fit=crop&q=80',
];

export const TestimonialsManager: React.FC<Props> = ({ testimonials, onUpdateTestimonials }) => {
  const handleAdd = () => {
    const newItem: TestimonialItem = {
      id: `t_${Date.now()}`,
      clientName: 'Jane Cooper',
      role: 'Head of Engineering',
      company: 'Vanguard Global',
      avatar: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=200&auto=format&fit=crop&q=80',
      text: 'Working together was a breath of fresh air. Extraordinary attention to craft, speed, and dependable delivery.',
      rating: 5,
      projectRef: 'Cloud Architecture',
    };
    onUpdateTestimonials([...testimonials, newItem]);
  };

  const handleUpdate = (id: string, updates: Partial<TestimonialItem>) => {
    onUpdateTestimonials(testimonials.map((t) => (t.id === id ? { ...t, ...updates } : t)));
  };

  const handleRemove = (id: string) => {
    onUpdateTestimonials(testimonials.filter((t) => t.id !== id));
  };

  return (
    <div className="space-y-8">
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-xl font-bold text-white tracking-tight">Testimonials & Reviews</h2>
          <p className="text-xs text-neutral-400 mt-1">
            Build social proof with quotes and recommendations from leaders, managers, and clients.
          </p>
        </div>
        <button
          type="button"
          onClick={handleAdd}
          className="px-4 py-2 rounded-xl bg-indigo-600 hover:bg-indigo-500 text-white font-bold text-xs flex items-center gap-1.5 shadow-md transition-colors"
        >
          <Plus className="w-4 h-4" /> Add Review
        </button>
      </div>

      <div className="space-y-6">
        {testimonials.map((item) => (
          <div key={item.id} className="p-5 rounded-2xl bg-neutral-900 border border-neutral-800 space-y-4">
            <div className="flex items-start justify-between gap-4">
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 w-full">
                <div>
                  <label className="text-[11px] text-neutral-400">Client / Recommender Name</label>
                  <input
                    type="text"
                    value={item.clientName}
                    onChange={(e) => handleUpdate(item.id, { clientName: e.target.value })}
                    className="w-full px-3 py-1.5 rounded-lg bg-neutral-950 border border-neutral-800 text-xs text-white focus:outline-hidden focus:border-indigo-500"
                  />
                </div>
                <div>
                  <label className="text-[11px] text-neutral-400">Role / Designation</label>
                  <input
                    type="text"
                    value={item.role}
                    onChange={(e) => handleUpdate(item.id, { role: e.target.value })}
                    className="w-full px-3 py-1.5 rounded-lg bg-neutral-950 border border-neutral-800 text-xs text-white focus:outline-hidden focus:border-indigo-500"
                  />
                </div>
                <div>
                  <label className="text-[11px] text-neutral-400">Company / Organization</label>
                  <input
                    type="text"
                    value={item.company}
                    onChange={(e) => handleUpdate(item.id, { company: e.target.value })}
                    className="w-full px-3 py-1.5 rounded-lg bg-neutral-950 border border-neutral-800 text-xs text-white focus:outline-hidden focus:border-indigo-500"
                  />
                </div>
              </div>
              <button
                type="button"
                onClick={() => handleRemove(item.id)}
                className="p-1.5 text-neutral-500 hover:text-red-400 transition-colors shrink-0"
              >
                <Trash2 className="w-4 h-4" />
              </button>
            </div>

            <div>
              <label className="text-[11px] text-neutral-400">Recommendation Quote</label>
              <textarea
                rows={3}
                value={item.text}
                onChange={(e) => handleUpdate(item.id, { text: e.target.value })}
                className="w-full px-3 py-1.5 rounded-lg bg-neutral-950 border border-neutral-800 text-xs text-white focus:outline-hidden focus:border-indigo-500 leading-relaxed"
              />
            </div>

            <ImageUploadField
              label="Client Avatar / Photo"
              value={item.avatar}
              onChange={(url) => handleUpdate(item.id, { avatar: url })}
              presets={TESTIMONIAL_AVATARS}
              aspectRatio="square"
              maxDimension={400}
              helpText="Upload from gallery or select a preset avatar"
            />
          </div>
        ))}
      </div>
    </div>
  );
};

