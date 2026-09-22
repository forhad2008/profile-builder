import React, { useState, useRef } from 'react';
import { UploadCloud, Image as ImageIcon, Link, X, Check, Sparkles, FolderOpen, RefreshCw, AlertCircle } from 'lucide-react';
import { processLocalImageFile } from '../../utils/imageHelper';

interface Props {
  label: string;
  value: string;
  onChange: (value: string) => void;
  presets?: string[];
  aspectRatio?: 'square' | 'video' | 'portrait';
  maxDimension?: number;
  helpText?: string;
}

export const ImageUploadField: React.FC<Props> = ({
  label,
  value,
  onChange,
  presets = [],
  aspectRatio = 'square',
  maxDimension = 1000,
  helpText,
}) => {
  const [activeMode, setActiveMode] = useState<'upload' | 'url' | 'presets'>('upload');
  const [isDragging, setIsDragging] = useState(false);
  const [isProcessing, setIsProcessing] = useState(false);
  const [errorMessage, setErrorMessage] = useState<string | null>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleFileChange = async (files: FileList | null) => {
    if (!files || files.length === 0) return;
    const file = files[0];
    
    if (!file.type.startsWith('image/')) {
      setErrorMessage('Please select a valid image file (JPG, PNG, WebP, etc.).');
      return;
    }

    setErrorMessage(null);
    setIsProcessing(true);

    try {
      const dataUrl = await processLocalImageFile(file, {
        maxWidth: maxDimension,
        maxHeight: maxDimension,
        quality: 0.9,
      });
      onChange(dataUrl);
    } catch (err: any) {
      setErrorMessage(err?.message || 'Failed to process local image file.');
    } finally {
      setIsProcessing(false);
      if (fileInputRef.current) {
        fileInputRef.current.value = '';
      }
    }
  };

  const handleDragOver = (e: React.DragEvent) => {
    e.preventDefault();
    e.stopPropagation();
    setIsDragging(true);
  };

  const handleDragLeave = (e: React.DragEvent) => {
    e.preventDefault();
    e.stopPropagation();
    setIsDragging(false);
  };

  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault();
    e.stopPropagation();
    setIsDragging(false);
    if (e.dataTransfer.files && e.dataTransfer.files.length > 0) {
      handleFileChange(e.dataTransfer.files);
    }
  };

  const aspectClass =
    aspectRatio === 'square'
      ? 'w-20 h-20 rounded-2xl'
      : aspectRatio === 'portrait'
      ? 'w-20 h-28 rounded-2xl'
      : 'w-28 h-16 rounded-xl';

  return (
    <div className="space-y-3">
      <div className="flex items-center justify-between">
        <label className="text-xs font-semibold text-neutral-300 flex items-center gap-1.5">
          <ImageIcon className="w-3.5 h-3.5 text-indigo-400" />
          <span>{label}</span>
        </label>
        {helpText && <span className="text-[11px] text-neutral-500">{helpText}</span>}
      </div>

      {/* Main Image Box & Controls */}
      <div className="p-4 rounded-2xl bg-neutral-900/90 border border-neutral-800 space-y-4">
        {/* Preview & Current State */}
        <div className="flex flex-col sm:flex-row items-center gap-4">
          <div className="relative group shrink-0">
            {value ? (
              <div className="relative">
                <img
                  src={value}
                  alt="Preview"
                  className={`${aspectClass} object-cover border-2 border-indigo-500/50 shadow-md bg-neutral-950`}
                />
                <button
                  type="button"
                  onClick={() => onChange('')}
                  title="Remove photo"
                  className="absolute -top-2 -right-2 w-6 h-6 rounded-full bg-red-600 hover:bg-red-500 text-white flex items-center justify-center shadow-lg transition-transform hover:scale-110 cursor-pointer"
                >
                  <X className="w-3.5 h-3.5" />
                </button>
              </div>
            ) : (
              <div
                className={`${aspectClass} bg-neutral-950 border-2 border-dashed border-neutral-700 flex flex-col items-center justify-center text-neutral-500`}
              >
                <ImageIcon className="w-6 h-6 opacity-60" />
                <span className="text-[9px] uppercase tracking-wider font-mono mt-1 text-neutral-500">
                  No Image
                </span>
              </div>
            )}
          </div>

          {/* Mode Switchers */}
          <div className="w-full space-y-3">
            <div className="flex items-center gap-1 p-1 rounded-xl bg-neutral-950 border border-neutral-800 text-xs w-full max-w-xs">
              <button
                type="button"
                onClick={() => setActiveMode('upload')}
                className={`flex-1 py-1.5 px-2.5 rounded-lg font-medium flex items-center justify-center gap-1.5 transition-all cursor-pointer ${
                  activeMode === 'upload'
                    ? 'bg-indigo-600 text-white shadow-xs'
                    : 'text-neutral-400 hover:text-white'
                }`}
              >
                <FolderOpen className="w-3.5 h-3.5" />
                <span>Upload File</span>
              </button>
              <button
                type="button"
                onClick={() => setActiveMode('url')}
                className={`flex-1 py-1.5 px-2.5 rounded-lg font-medium flex items-center justify-center gap-1.5 transition-all cursor-pointer ${
                  activeMode === 'url'
                    ? 'bg-indigo-600 text-white shadow-xs'
                    : 'text-neutral-400 hover:text-white'
                }`}
              >
                <Link className="w-3.5 h-3.5" />
                <span>Image URL</span>
              </button>
              {presets.length > 0 && (
                <button
                  type="button"
                  onClick={() => setActiveMode('presets')}
                  className={`flex-1 py-1.5 px-2.5 rounded-lg font-medium flex items-center justify-center gap-1.5 transition-all cursor-pointer ${
                    activeMode === 'presets'
                      ? 'bg-indigo-600 text-white shadow-xs'
                      : 'text-neutral-400 hover:text-white'
                  }`}
                >
                  <Sparkles className="w-3.5 h-3.5" />
                  <span>Presets</span>
                </button>
              )}
            </div>

            {/* Mode: Upload From Local Gallery / Device */}
            {activeMode === 'upload' && (
              <div
                onDragOver={handleDragOver}
                onDragLeave={handleDragLeave}
                onDrop={handleDrop}
                onClick={() => fileInputRef.current?.click()}
                className={`border-2 border-dashed rounded-xl p-3.5 sm:p-4 text-center cursor-pointer transition-all ${
                  isDragging
                    ? 'border-indigo-400 bg-indigo-500/10'
                    : 'border-neutral-700 hover:border-indigo-500/60 bg-neutral-950/60 hover:bg-neutral-950'
                }`}
              >
                <input
                  ref={fileInputRef}
                  type="file"
                  accept="image/*"
                  onChange={(e) => handleFileChange(e.target.files)}
                  className="hidden"
                />
                <div className="flex flex-col items-center justify-center gap-1.5">
                  <div className="w-9 h-9 rounded-full bg-indigo-500/10 text-indigo-400 flex items-center justify-center">
                    {isProcessing ? (
                      <RefreshCw className="w-4 h-4 animate-spin" />
                    ) : (
                      <UploadCloud className="w-4 h-4" />
                    )}
                  </div>
                  <p className="text-xs font-semibold text-white">
                    {isProcessing ? 'Optimizing photo...' : 'Choose photo from gallery or drag & drop'}
                  </p>
                  <p className="text-[11px] text-neutral-400">
                    PNG, JPG, WebP, GIF &bull; Auto-optimized for instant fast rendering
                  </p>
                </div>
              </div>
            )}

            {/* Mode: Direct URL */}
            {activeMode === 'url' && (
              <div className="space-y-1.5">
                <input
                  type="url"
                  value={value}
                  onChange={(e) => onChange(e.target.value)}
                  placeholder="https://images.unsplash.com/..."
                  className="w-full px-3 py-2 rounded-xl bg-neutral-950 border border-neutral-800 text-xs text-white placeholder:text-neutral-600 focus:outline-hidden focus:border-indigo-500 font-mono"
                />
                <p className="text-[10px] text-neutral-500">
                  Paste any public web image address or CDN asset link.
                </p>
              </div>
            )}

            {/* Mode: Preset Gallery */}
            {activeMode === 'presets' && presets.length > 0 && (
              <div className="space-y-1.5">
                <div className="flex items-center gap-2 overflow-x-auto pb-1.5 pt-0.5">
                  {presets.map((presetUrl, idx) => {
                    const isSelected = value === presetUrl;
                    return (
                      <button
                        key={idx}
                        type="button"
                        onClick={() => onChange(presetUrl)}
                        className={`relative shrink-0 w-11 h-11 rounded-xl overflow-hidden border-2 transition-all cursor-pointer ${
                          isSelected
                            ? 'border-indigo-500 scale-105 shadow-md shadow-indigo-500/20'
                            : 'border-neutral-700 hover:border-neutral-500 opacity-80 hover:opacity-100'
                        }`}
                      >
                        <img
                          src={presetUrl}
                          alt={`Preset ${idx + 1}`}
                          className="w-full h-full object-cover"
                        />
                        {isSelected && (
                          <div className="absolute inset-0 bg-indigo-600/50 flex items-center justify-center">
                            <Check className="w-3.5 h-3.5 text-white" />
                          </div>
                        )}
                      </button>
                    );
                  })}
                </div>
                <p className="text-[10px] text-neutral-500">
                  Click any curated professional studio portrait or background.
                </p>
              </div>
            )}
          </div>
        </div>

        {/* Error message */}
        {errorMessage && (
          <div className="flex items-center gap-2 p-2.5 rounded-xl bg-red-500/10 border border-red-500/30 text-red-400 text-xs">
            <AlertCircle className="w-4 h-4 shrink-0" />
            <span>{errorMessage}</span>
          </div>
        )}
      </div>
    </div>
  );
};
