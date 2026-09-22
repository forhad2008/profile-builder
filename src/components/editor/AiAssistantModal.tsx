import React, { useState } from 'react';
import { Sparkles, X, Copy, Check, Wand2, RefreshCw } from 'lucide-react';

interface Props {
  isOpen: boolean;
  onClose: () => void;
  targetField: string;
  currentValue?: string;
  onApply: (generatedText: string) => void;
  userName?: string;
  userRole?: string;
}

export const AiAssistantModal: React.FC<Props> = ({
  isOpen,
  onClose,
  targetField,
  currentValue = '',
  onApply,
  userName = 'Alex',
  userRole = 'Software Architect',
}) => {
  const [tone, setTone] = useState<'authoritative' | 'casual' | 'creative' | 'concise'>('authoritative');
  const [promptInput, setPromptInput] = useState('');
  const [isGenerating, setIsGenerating] = useState(false);
  const [generatedResult, setGeneratedResult] = useState('');
  const [copied, setCopied] = useState(false);

  if (!isOpen) return null;

  const handleGenerate = () => {
    setIsGenerating(true);
    setTimeout(() => {
      let output = '';
      if (targetField === 'bio') {
        if (tone === 'authoritative') {
          output = `Staff-level ${userRole} with deep expertise leading cross-functional engineering initiatives and scaling resilient distributed architectures. Track record of mentoring high-performing teams, cutting system latency by over 40%, and turning ambitious product roadmaps into dependable, high-throughput reality.`;
        } else if (tone === 'creative') {
          output = `Obsessed with the intersection of elegant code, thoughtful design systems, and seamless user experiences. I craft tactile digital products where performance and visual delight coexist harmoniously.`;
        } else if (tone === 'concise') {
          output = `Full-stack architect building mission-critical cloud applications and accessible web products. Passionate about developer tooling, performance engineering, and clean code.`;
        } else {
          output = `Hey there! I'm a builder and ${userRole} who loves turning complex engineering problems into simple, delightful web platforms. Always shipping and collaborating with curious minds.`;
        }
      } else if (targetField === 'tagline') {
        if (tone === 'creative') {
          output = `Transforming complex workflows into effortless, tactile digital experiences.`;
        } else if (tone === 'concise') {
          output = `Building resilient cloud systems & delightful web applications.`;
        } else {
          output = `Architecting high-throughput distributed systems and mission-critical web platforms.`;
        }
      } else {
        // Project or achievements
        output = `Engineered an ultra-low latency real-time synchronization framework handling 2M+ concurrent websocket events. Optimized query latency from 120ms to 14ms while reducing compute overhead by 35%.`;
      }

      setGeneratedResult(output);
      setIsGenerating(false);
    }, 600);
  };

  const handleCopy = () => {
    navigator.clipboard.writeText(generatedResult);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div className="fixed inset-0 z-50 bg-black/80 backdrop-blur-md flex items-center justify-center p-4">
      <div className="bg-neutral-900 border border-neutral-800 rounded-3xl max-w-xl w-full p-6 sm:p-8 space-y-6 relative shadow-2xl">
        <button
          onClick={onClose}
          className="absolute top-5 right-5 p-2 rounded-full bg-neutral-800 text-neutral-400 hover:text-white transition-colors"
        >
          <X className="w-5 h-5" />
        </button>

        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-2xl bg-indigo-500/20 border border-indigo-500/30 flex items-center justify-center text-indigo-400">
            <Sparkles className="w-5 h-5" />
          </div>
          <div>
            <h3 className="font-bold text-lg text-white">AI Portfolio Copywriter</h3>
            <p className="text-xs text-neutral-400">
              Generating optimized text for <span className="text-indigo-400 font-mono capitalize">{targetField}</span>
            </p>
          </div>
        </div>

        {/* Tone Selector */}
        <div className="space-y-2">
          <label className="text-xs font-semibold text-neutral-300">Choose Desired Tone</label>
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-2">
            {[
              { id: 'authoritative', label: 'Executive' },
              { id: 'creative', label: 'Creative' },
              { id: 'concise', label: 'Concise' },
              { id: 'casual', label: 'Casual' },
            ].map((t) => (
              <button
                key={t.id}
                type="button"
                onClick={() => setTone(t.id as any)}
                className={`p-2 rounded-xl text-xs font-bold border transition-all ${
                  tone === t.id
                    ? 'bg-indigo-600 border-indigo-500 text-white'
                    : 'bg-neutral-950 border-neutral-800 text-neutral-400 hover:text-white'
                }`}
              >
                {t.label}
              </button>
            ))}
          </div>
        </div>

        {/* Custom Instructions */}
        <div className="space-y-1.5">
          <label className="text-xs font-semibold text-neutral-300">Custom Keywords or Context (Optional)</label>
          <input
            type="text"
            value={promptInput}
            onChange={(e) => setPromptInput(e.target.value)}
            placeholder="e.g. emphasize my 8 years of React/AWS experience and startup leadership..."
            className="w-full px-3.5 py-2 rounded-xl bg-neutral-950 border border-neutral-800 text-xs text-white focus:outline-hidden focus:border-indigo-500"
          />
        </div>

        {/* Action Button */}
        <button
          type="button"
          onClick={handleGenerate}
          disabled={isGenerating}
          className="w-full py-3 rounded-xl bg-indigo-600 hover:bg-indigo-500 text-white font-bold text-xs uppercase tracking-wider flex items-center justify-center gap-2 shadow-lg transition-all"
        >
          {isGenerating ? (
            <>
              <RefreshCw className="w-4 h-4 animate-spin" /> Crafting Portfolio Copy...
            </>
          ) : (
            <>
              <Wand2 className="w-4 h-4" /> Generate Professional Copy
            </>
          )}
        </button>

        {/* Output Box */}
        {generatedResult && (
          <div className="p-4 rounded-2xl bg-neutral-950 border border-neutral-800 space-y-3">
            <div className="flex items-center justify-between">
              <span className="text-xs font-bold text-indigo-400 font-mono">Suggested Copy</span>
              <button
                type="button"
                onClick={handleCopy}
                className="text-xs text-neutral-400 hover:text-white flex items-center gap-1 font-mono"
              >
                {copied ? <Check className="w-3.5 h-3.5 text-emerald-400" /> : <Copy className="w-3.5 h-3.5" />}
                {copied ? 'Copied' : 'Copy'}
              </button>
            </div>
            <p className="text-xs sm:text-sm text-neutral-200 leading-relaxed font-sans">{generatedResult}</p>
            <div className="flex justify-end gap-2 pt-2">
              <button
                type="button"
                onClick={() => {
                  onApply(generatedResult);
                  onClose();
                }}
                className="px-4 py-2 rounded-xl bg-emerald-600 hover:bg-emerald-500 text-white text-xs font-bold shadow-md transition-colors"
              >
                Insert Directly into Portfolio
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};
