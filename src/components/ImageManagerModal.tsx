import React, { useState } from 'react';
import { Image, Sliders, RefreshCw, Upload, Check, Sparkles, Folder } from 'lucide-react';
import { HeroSlide } from '../types';

interface ImageManagerModalProps {
  isOpen: boolean;
  onClose: () => void;
  heroSlides: HeroSlide[];
  onUpdateSlide: (updatedSlides: HeroSlide[]) => void;
}

export const ImageManagerModal: React.FC<ImageManagerModalProps> = ({
  isOpen,
  onClose,
  heroSlides,
  onUpdateSlide
}) => {
  const [slides, setSlides] = useState<HeroSlide[]>(heroSlides);
  const [selectedSlideIndex, setSelectedSlideIndex] = useState(0);
  const [showSavedToast, setShowSavedToast] = useState(false);

  if (!isOpen) return null;

  const currentSlide = slides[selectedSlideIndex];

  const handleFieldChange = (field: keyof HeroSlide, value: any) => {
    const newSlides = [...slides];
    newSlides[selectedSlideIndex] = {
      ...newSlides[selectedSlideIndex],
      [field]: value
    };
    setSlides(newSlides);
  };

  const handleSave = () => {
    onUpdateSlide(slides);
    setShowSavedToast(true);
    setTimeout(() => {
      setShowSavedToast(false);
      onClose();
    }, 1200);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-[#0B2838]/60 backdrop-blur-xs animate-in fade-in">
      <div className="relative w-full max-w-3xl bg-white text-[#0B2838] rounded-2xl shadow-2xl border border-[#B3E5FC] overflow-hidden flex flex-col max-h-[90vh]">
        {/* Header */}
        <div className="p-5 bg-[#F8FCFE] flex items-center justify-between border-b border-[#B3E5FC]">
          <div className="flex items-center gap-3">
            <div className="w-9 h-9 rounded-xl bg-[#E1F5FE] text-[#0288D1] border border-[#81D4FA] flex items-center justify-center">
              <Sliders className="w-4 h-4 text-[#0288D1]" />
            </div>
            <div>
              <h3 className="text-base font-bold text-[#0B2838]">Hero Slides & Asset Path Manager</h3>
              <p className="text-xs text-[#355C75] font-mono">
                Manage home banners, folder paths (<code className="text-[#01579B]">images/home/home-1.jpg</code>), and 3D previews
              </p>
            </div>
          </div>
          <button
            onClick={onClose}
            className="w-8 h-8 rounded-xl bg-white hover:bg-[#E1F5FE] flex items-center justify-center text-[#62879F] hover:text-[#0B2838] border border-[#B3E5FC] font-mono text-xs transition-colors"
          >
            ✕
          </button>
        </div>

        {/* Slide Selection Strip */}
        <div className="flex border-b border-[#B3E5FC] bg-[#F8FCFE] p-3 gap-2 overflow-x-auto font-mono">
          {slides.map((s, idx) => (
            <button
              key={s.id}
              onClick={() => setSelectedSlideIndex(idx)}
              className={`flex items-center gap-2 px-3.5 py-1.5 rounded-xl text-xs font-mono transition-all shrink-0 ${
                selectedSlideIndex === idx
                  ? 'bg-[#0288D1] text-white font-bold shadow-xs'
                  : 'bg-white text-[#355C75] hover:bg-[#E1F5FE] border border-[#B3E5FC]'
              }`}
            >
              <Image className="w-3.5 h-3.5" />
              <span>Slide {s.id} ({s.folderReference})</span>
            </button>
          ))}
        </div>

        {/* Form Body */}
        <div className="p-6 overflow-y-auto flex-1 space-y-4 text-xs font-mono bg-white">
          <div className="p-3 bg-[#0B2838] rounded-xl text-white flex items-center gap-4">
            <div className="w-24 h-16 rounded-lg overflow-hidden bg-black/50 border border-white/20 shrink-0">
              <img
                src={currentSlide.imageUrl || `/images/home/home-${currentSlide.id}.jpg`}
                alt={currentSlide.title}
                className="w-full h-full object-cover"
              />
            </div>
            <div className="flex-1 min-w-0">
              <div className="flex items-center gap-2">
                <span className="px-2 py-0.5 rounded bg-[#0288D1] text-[10px] font-bold">ACTIVE ASSET</span>
                <span className="text-xs font-mono text-[#81D4FA] truncate">public/{currentSlide.folderReference}</span>
              </div>
              <p className="text-xs font-semibold text-white/90 truncate mt-1">{currentSlide.title}</p>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label className="block text-[10px] uppercase font-bold text-[#355C75] mb-1">
                Image Folder Reference (Local Path)
              </label>
              <div className="flex items-center gap-2">
                <span className="p-2 rounded-xl bg-[#F8FCFE] border border-[#B3E5FC] text-[#62879F] font-mono text-[11px]">
                  public/
                </span>
                <input
                  type="text"
                  value={currentSlide.folderReference}
                  onChange={(e) => handleFieldChange('folderReference', e.target.value)}
                  className="flex-1 p-2 rounded-xl border border-[#B3E5FC] font-mono text-xs focus:outline-none focus:border-[#0288D1] text-[#0B2838] bg-[#F8FCFE] focus:bg-white"
                  placeholder="images/home/home-1.jpg"
                />
              </div>
              <p className="text-[10px] text-[#62879F] mt-1">
                Convention: <code className="text-[#01579B] font-mono">images/home/home-[number].jpg</code>
              </p>
            </div>

            <div>
              <label className="block text-[10px] uppercase font-bold text-[#355C75] mb-1">
                Associated 3D Model Preset
              </label>
              <select
                value={currentSlide.modelType}
                onChange={(e) => handleFieldChange('modelType', e.target.value)}
                className="w-full p-2 rounded-xl border border-[#B3E5FC] text-xs focus:outline-none focus:border-[#0288D1] text-[#0B2838] bg-[#F8FCFE] focus:bg-white"
              >
                <option value="forceps">Kelly Forceps (MT-HF-001)</option>
                <option value="scissors">Metzenbaum Scissors (MT-SC-004)</option>
                <option value="needle_holder">Mayo-Hegar Needle Holder (MT-NH-012)</option>
                <option value="retractor">Weitlaner Retractor (MT-RT-008)</option>
                <option value="scalpel">Bard-Parker Scalpel (MT-BP-002)</option>
              </select>
            </div>
          </div>

          <div>
            <label className="block text-[10px] uppercase font-bold text-[#355C75] mb-1">Main Heading</label>
            <input
              type="text"
              value={currentSlide.title}
              onChange={(e) => handleFieldChange('title', e.target.value)}
              className="w-full p-2 rounded-xl border border-[#B3E5FC] text-xs focus:outline-none focus:border-[#0288D1] text-[#0B2838] bg-[#F8FCFE] focus:bg-white font-bold"
            />
          </div>

          <div>
            <label className="block text-[10px] uppercase font-bold text-[#355C75] mb-1">Subtitle / Sialkot Tagline</label>
            <input
              type="text"
              value={currentSlide.subtitle}
              onChange={(e) => handleFieldChange('subtitle', e.target.value)}
              className="w-full p-2 rounded-xl border border-[#B3E5FC] text-xs focus:outline-none focus:border-[#0288D1] text-[#0B2838] bg-[#F8FCFE] focus:bg-white"
            />
          </div>

          <div>
            <label className="block text-[10px] uppercase font-bold text-[#355C75] mb-1">Description Paragraph</label>
            <textarea
              rows={2}
              value={currentSlide.description}
              onChange={(e) => handleFieldChange('description', e.target.value)}
              className="w-full p-2 rounded-xl border border-[#B3E5FC] text-xs focus:outline-none focus:border-[#0288D1] text-[#0B2838] bg-[#F8FCFE] focus:bg-white"
            />
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="block text-[10px] uppercase font-bold text-[#355C75] mb-1">Primary CTA Button</label>
              <input
                type="text"
                value={currentSlide.ctaText}
                onChange={(e) => handleFieldChange('ctaText', e.target.value)}
                className="w-full p-2 rounded-xl border border-[#B3E5FC] text-xs bg-[#F8FCFE] focus:bg-white text-[#0B2838]"
              />
            </div>
            <div>
              <label className="block text-[10px] uppercase font-bold text-[#355C75] mb-1">Secondary CTA Button</label>
              <input
                type="text"
                value={currentSlide.secondaryCtaText}
                onChange={(e) => handleFieldChange('secondaryCtaText', e.target.value)}
                className="w-full p-2 rounded-xl border border-[#B3E5FC] text-xs bg-[#F8FCFE] focus:bg-white text-[#0B2838]"
              />
            </div>
          </div>
        </div>

        {/* Footer */}
        <div className="p-4 bg-[#F8FCFE] border-t border-[#B3E5FC] flex items-center justify-between font-mono">
          <div className="flex items-center gap-2">
            {showSavedToast && (
              <span className="text-[#01579B] bg-[#E1F5FE] px-3 py-1 rounded-xl text-xs flex items-center gap-1 border border-[#81D4FA]">
                <Check className="w-3.5 h-3.5 text-[#0288D1]" /> Updated Successfully!
              </span>
            )}
          </div>

          <div className="flex items-center gap-2">
            <button
              onClick={onClose}
              className="px-4 py-2 border border-[#B3E5FC] hover:bg-[#F0F9FF] text-[#355C75] rounded-xl text-xs transition-colors"
            >
              Cancel
            </button>
            <button
              onClick={handleSave}
              className="px-5 py-2 bg-[#0288D1] hover:bg-[#0277BD] text-white rounded-xl font-bold text-xs shadow-md shadow-[#0288D1]/25 transition-colors flex items-center gap-1.5 uppercase tracking-wider"
            >
              <Check className="w-3.5 h-3.5 text-[#B3E5FC]" />
              Apply Changes
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};
