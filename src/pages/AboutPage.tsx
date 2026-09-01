import React from 'react';
import { 
  Building, ShieldCheck, Award, Globe, Users, 
  Sparkles, CheckCircle2, ChevronRight, Sliders, Folder, FileText
} from 'lucide-react';
import { BRAND_CONFIG, SIALKOT_MANUFACTURING_STORY } from '../data/brandData';

interface AboutPageProps {
  onOpenRFQ: () => void;
  onOpenFolderGuide: () => void;
  onNavigateToProducts: () => void;
}

export const AboutPage: React.FC<AboutPageProps> = ({
  onOpenRFQ,
  onOpenFolderGuide,
  onNavigateToProducts
}) => {
  const aboutImages = [
    {
      ref: 'images/about/about-1.jpg',
      title: 'Precision Hot Drop-Forging Forge',
      desc: 'High-tonnage forging presses creating uniform crystalline density in German DIN stainless steel ingots.',
      imgUrl: 'https://images.unsplash.com/photo-1581091226825-a6a2a5aee158?auto=format&fit=crop&w=800&q=80'
    },
    {
      ref: 'images/about/about-2.jpg',
      title: 'CNC Micro-Milling & Jaw Profiling',
      desc: 'Micron-level computer-controlled milling machines carving serrations and interlocking box locks.',
      imgUrl: 'https://images.unsplash.com/photo-1581092160607-ee22621dd758?auto=format&fit=crop&w=800&q=80'
    },
    {
      ref: 'images/about/about-3.jpg',
      title: 'Ultrasonic Cleanroom & Passivation',
      desc: 'ASTM A967 chemical nitric bath forming a chromium-oxide barrier that prevents autoclave rust.',
      imgUrl: 'https://images.unsplash.com/photo-1584017911766-d451b3d0e843?auto=format&fit=crop&w=800&q=80'
    }
  ];

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-16 pb-24 text-[#0B2838] bg-[#F8FCFE]">
      {/* Header */}
      <div className="bg-white text-[#0B2838] rounded-2xl p-8 lg:p-12 border border-[#B3E5FC] space-y-4 shadow-sm">
        <div className="flex items-center gap-2 text-xs font-mono text-[#0288D1]">
          <Folder className="w-3.5 h-3.5 text-[#0288D1]" />
          <span>Folder Source: public/images/about/</span>
        </div>

        <h1 className="text-3xl sm:text-4xl lg:text-5xl font-black tracking-tight text-[#0B2838] max-w-3xl font-sans">
          Sialkot Craftsmanship Meets German Precision Engineering
        </h1>

        <p className="text-xs sm:text-sm text-[#355C75] max-w-2xl leading-relaxed">
          {BRAND_CONFIG.positioningStatement}
        </p>
      </div>

      {/* About Image Gallery Mapping */}
      <div className="space-y-6">
        <div className="flex items-center justify-between">
          <div>
            <h2 className="text-lg font-bold text-[#0B2838] uppercase tracking-wider">Manufacturing Infrastructure & Heritage</h2>
            <p className="text-xs text-[#355C75] font-mono">
              Mapped to <code className="font-mono text-[#01579B] bg-[#E1F5FE] px-1.5 py-0.5 rounded border border-[#81D4FA]">public/images/about/about-1.jpg, about-2.jpg, about-3.jpg</code>
            </p>
          </div>
          <button
            onClick={onOpenFolderGuide}
            className="text-xs font-mono font-semibold text-[#0288D1] hover:underline flex items-center gap-1"
          >
            Folder Guide →
          </button>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {aboutImages.map((item, idx) => (
            <div
              key={idx}
              className="bg-white rounded-2xl border border-[#B3E5FC] overflow-hidden hover:shadow-md transition-all flex flex-col justify-between"
            >
              <div>
                <div className="relative aspect-video bg-[#F4FAFD] overflow-hidden">
                  <img src={item.imgUrl} alt={item.title} className="w-full h-full object-cover opacity-90 hover:opacity-100 transition-opacity" />
                  <div className="absolute bottom-2 left-2 px-2 py-0.5 rounded-lg bg-white/90 text-[10px] font-mono text-[#01579B] backdrop-blur-xs border border-[#B3E5FC]">
                    {item.ref}
                  </div>
                </div>

                <div className="p-5 space-y-2">
                  <h3 className="text-sm font-bold text-[#0B2838]">{item.title}</h3>
                  <p className="text-xs text-[#355C75] leading-relaxed">{item.desc}</p>
                </div>
              </div>

              <div className="p-5 pt-0 text-[11px] text-[#62879F] font-mono border-t border-[#B3E5FC]/60 mt-2">
                Stage 0{idx + 1} • Sialkot Industrial Zone
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Brand Pillars & Values */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {BRAND_CONFIG.pillars.map((pil, idx) => (
          <div key={idx} className="p-6 rounded-2xl bg-white border border-[#B3E5FC] space-y-2 shadow-xs">
            <span className="w-8 h-8 rounded-xl bg-[#0288D1] text-white flex items-center justify-center font-bold text-xs font-mono">
              0{idx + 1}
            </span>
            <h3 className="text-sm font-bold text-[#0B2838] pt-1">{pil.title}</h3>
            <p className="text-xs text-[#355C75] leading-relaxed">{pil.desc}</p>
          </div>
        ))}
      </div>

      {/* Callout */}
      <div className="p-8 rounded-2xl bg-white text-[#0B2838] border border-[#B3E5FC] shadow-sm flex flex-col md:flex-row items-center justify-between gap-6">
        <div className="space-y-1">
          <h3 className="text-xl font-bold font-sans">Schedule an On-Site Factory Tour or Video Audit</h3>
          <p className="text-xs text-[#355C75]">
            We welcome international hospital procurement teams and distributor inspectors to our Sialkot manufacturing plant.
          </p>
        </div>
        <button
          onClick={onOpenRFQ}
          className="px-6 py-3 rounded-xl bg-[#0288D1] hover:bg-[#0277BD] text-white font-bold text-xs shrink-0 transition-colors uppercase tracking-wider shadow-md shadow-[#0288D1]/25"
        >
          Contact Export Directorate
        </button>
      </div>
    </div>
  );
};
