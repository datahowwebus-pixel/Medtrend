import React, { useState, useEffect, useCallback, useRef } from 'react';
import { 
  ArrowRight, ShieldCheck, Sparkles, Box, CheckCircle2, 
  ChevronRight, ChevronLeft, Award, Layers, FileText, Globe, ShoppingBag, Eye, Sliders, Folder,
  Play, Pause, RefreshCw, Check, Zap, Flame, Compass, Cpu, Wrench, Camera, Maximize2, X, ZoomIn, Film, RotateCw
} from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';
import { HeroSlide, Product } from '../types';
import { BRAND_CONFIG, SIALKOT_MANUFACTURING_STORY } from '../data/brandData';
import { CATEGORIES_TREE, PRODUCTS } from '../data/productsData';
import { Interactive3DViewer } from '../components/Interactive3DViewer';
import { HierarchicalCategoryExplorer } from '../components/HierarchicalCategoryExplorer';

interface HomePageProps {
  heroSlides: HeroSlide[];
  onNavigate: (tab: string, productId?: string, categorySlug?: string) => void;
  onOpenQuickView: (product: Product) => void;
  onOpenRFQ: (product?: Product) => void;
  onOpenFolderGuide: () => void;
  onOpenImageManager: () => void;
  onOpen3DStudio: (product: Product) => void;
}

export const HomePage: React.FC<HomePageProps> = ({
  heroSlides,
  onNavigate,
  onOpenQuickView,
  onOpenRFQ,
  onOpenFolderGuide,
  onOpenImageManager,
  onOpen3DStudio
}) => {
  const [currentSlideIndex, setCurrentSlideIndex] = useState(0);
  const [isPaused, setIsPaused] = useState(false);
  const [lightboxImage, setLightboxImage] = useState<string | null>(null);

  // Showcase Video Player State (Supports both Horizontal & Portrait)
  const [activeVideoId, setActiveVideoId] = useState<string>('video1');
  const [videoPlaying, setVideoPlaying] = useState(true);
  const [videoPlaybackRate, setVideoPlaybackRate] = useState<number>(1.0);
  const [fullscreenVideoSrc, setFullscreenVideoSrc] = useState<string | null>(null);
  const videoElementRef = useRef<HTMLVideoElement | null>(null);

  const showcaseVideos = [
    {
      id: 'video1',
      title: 'Curved Hemostatic Forceps (Kelly)',
      subtitle: 'AISI 420 Martensitic Steel • Dark Studio 360°',
      code: 'MT-HF-002',
      src: '/3dslide1.mp4',
      orientation: 'horizontal' as const,
      aspectBadge: '16:9 Landscape HD',
      theme: 'dark',
      specs: ['Box-Lock Hinge', 'Transverse Serrations', '3-Step Ratchet Lock', 'Non-Glare Satin']
    },
    {
      id: 'video2',
      title: 'Precision Tissue & Dressing Tweezers',
      subtitle: 'Surgical Spring Steel • Clean Studio Podium 360°',
      code: 'MT-TF-005',
      src: '/3dslide2.mp4',
      orientation: 'horizontal' as const,
      aspectBadge: '16:9 Landscape HD',
      theme: 'light',
      specs: ['Fluted Grip Flanges', 'Atraumatic Tips', 'Calibrated Spring Tension', 'Direct Factory Sialkot']
    },
    {
      id: 'video3',
      title: 'Metzenbaum TC Dissecting Scissors',
      subtitle: 'Tungsten Carbide Inlays • 360° Vertical Orbit',
      code: 'MT-SC-004',
      src: '/MT-HF-002-loop.mp4',
      orientation: 'portrait' as const,
      aspectBadge: '9:16 Portrait Studio',
      theme: 'light',
      specs: ['Gold Shank Rings', 'Micro-Beveled Blades', 'Frictionless Pivot Pin', 'Laser Serial Markings']
    },
    {
      id: 'video4',
      title: 'Scalpel Handle #3 with Knurled Grip',
      subtitle: 'AISI 316 Stainless • Vertical Inspection Loop',
      code: 'MT-SH-003',
      src: '/MT-HF-001-loop.mp4',
      orientation: 'portrait' as const,
      aspectBadge: '9:16 Portrait Studio',
      theme: 'light',
      specs: ['Diamond Knurled Shaft', 'Standard Fitment #10-15', 'Metric Graduation', 'Autoclavable 134°C']
    }
  ];

  const currentVideo = showcaseVideos.find(v => v.id === activeVideoId) || showcaseVideos[0];

  useEffect(() => {
    if (videoElementRef.current) {
      videoElementRef.current.playbackRate = videoPlaybackRate;
      if (videoPlaying) {
        videoElementRef.current.play().catch(() => {});
      } else {
        videoElementRef.current.pause();
      }
    }
  }, [activeVideoId, videoPlaying, videoPlaybackRate]);

  const totalSlides = heroSlides.length > 0 ? heroSlides.length : 3;
  const slide = heroSlides[currentSlideIndex] || heroSlides[0];
  const slideImageUrl = slide.imageUrl || `/images/home/home-${slide.id}.jpg`;

  // Auto-play timer for hero slides (6.5 seconds per slide)
  const nextSlide = useCallback(() => {
    setCurrentSlideIndex((prev) => (prev + 1) % totalSlides);
    setActiveModelOverride(null);
  }, [totalSlides]);

  const prevSlide = useCallback(() => {
    setCurrentSlideIndex((prev) => (prev - 1 + totalSlides) % totalSlides);
    setActiveModelOverride(null);
  }, [totalSlides]);

  useEffect(() => {
    if (isPaused || lightboxImage) return;
    const interval = setInterval(() => {
      nextSlide();
    }, 6500);
    return () => clearInterval(interval);
  }, [isPaused, nextSlide, lightboxImage]);

  const bestSellers = PRODUCTS.slice(0, 8);

  return (
    <div className="space-y-16 sm:space-y-24 pb-20 bg-white text-[#0B2838]">
      {/* 1. CINEMATIC FULL-SCALE WIDESCREEN HERO BANNER SECTION */}
      <section 
        onMouseEnter={() => setIsPaused(true)}
        onMouseLeave={() => setIsPaused(false)}
        className="relative overflow-hidden bg-[#071722] border-b border-[#B3E5FC]/30"
      >
        {/* Full-Scale Banner Container */}
        <div className="relative w-full min-h-[540px] sm:min-h-[600px] lg:min-h-[680px] flex flex-col justify-between overflow-hidden">
          
          {/* Background Real Image */}
          <div className="absolute inset-0 z-0">
            <AnimatePresence mode="wait">
              <motion.div
                key={slideImageUrl}
                initial={{ opacity: 0, scale: 1.06 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0 }}
                transition={{ duration: 0.65, ease: 'easeOut' }}
                className="absolute inset-0 w-full h-full"
              >
                <img
                  src={slideImageUrl}
                  alt={slide.title}
                  className="w-full h-full object-cover object-center filter brightness-[0.82] contrast-[1.08]"
                />
              </motion.div>
            </AnimatePresence>

            {/* Multi-layered cinematic gradients to ensure pristine legibility */}
            <div className="absolute inset-0 bg-gradient-to-r from-[#071722]/95 via-[#071722]/75 to-transparent sm:w-3/4 lg:w-3/5 pointer-events-none" />
            <div className="absolute inset-0 bg-gradient-to-t from-[#071722] via-transparent to-[#071722]/40 pointer-events-none" />
            <div className="absolute inset-0 bg-[radial-gradient(#29B6F6_1px,transparent_1px)] [background-size:36px_36px] opacity-10 pointer-events-none" />
          </div>

          {/* Top Floating Utility Bar (Slide Indicator, Asset Reference, Zoom & Play/Pause Controls) */}
          <div className="relative z-20 max-w-7xl w-full mx-auto px-4 sm:px-6 lg:px-8 pt-5 sm:pt-7 flex flex-wrap items-center justify-between gap-3">
            <div className="flex items-center gap-2.5">
              <span className="px-3.5 py-1 rounded-full text-xs font-mono font-bold bg-[#0288D1] text-white shadow-md flex items-center gap-1.5">
                <span className="w-2 h-2 rounded-full bg-white animate-pulse" />
                FEATURED INSTRUMENT 0{currentSlideIndex + 1} / 0{totalSlides}
              </span>
              <span className="px-3 py-1 rounded-full text-xs font-mono font-semibold bg-black/50 backdrop-blur-md text-[#81D4FA] border border-white/15 hidden sm:inline-flex items-center gap-1.5">
                <Globe className="w-3.5 h-3.5 text-[#29B6F6]" />
                Sialkot Surgical Metallurgy & Export
              </span>
            </div>

            {/* Quick Mode & Asset Controls */}
            <div className="flex items-center gap-2">
              {/* Fullscreen Zoom Button */}
              <button
                onClick={() => setLightboxImage(slideImageUrl)}
                className="px-3 py-1.5 rounded-xl bg-black/60 hover:bg-black/80 backdrop-blur-md text-white border border-white/15 text-xs font-mono font-bold transition-all flex items-center gap-1.5 shadow-xs"
                title="View Full Resolution"
              >
                <Maximize2 className="w-3.5 h-3.5 text-[#81D4FA]" />
                <span className="hidden sm:inline">Zoom</span>
              </button>

              {/* Pause / Play */}
              <button
                onClick={() => setIsPaused(!isPaused)}
                className="p-2 rounded-xl bg-black/60 hover:bg-black/80 backdrop-blur-md text-white border border-white/15 transition-all shadow-xs"
                title={isPaused ? 'Resume Rotation' : 'Pause Rotation'}
              >
                {isPaused ? <Play className="w-3.5 h-3.5 text-[#81D4FA]" /> : <Pause className="w-3.5 h-3.5" />}
              </button>
            </div>
          </div>

          {/* Center Main Content: Large Headline & Specifications Card */}
          <div className="relative z-20 max-w-7xl w-full mx-auto px-4 sm:px-6 lg:px-8 py-8 sm:py-12 my-auto">
            <div className="max-w-2xl lg:max-w-3xl space-y-6">
              <AnimatePresence mode="wait">
                <motion.div
                  key={currentSlideIndex}
                  initial={{ opacity: 0, x: -25 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: 20 }}
                  transition={{ duration: 0.45, ease: 'easeOut' }}
                  className="space-y-5"
                >
                  {/* Category & Badge */}
                  <div className="flex flex-wrap items-center gap-2">
                    <span className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full text-xs font-mono font-bold bg-[#0288D1]/30 backdrop-blur-md text-[#81D4FA] border border-[#29B6F6]/40 shadow-xs">
                      <Award className="w-3.5 h-3.5 text-[#29B6F6]" />
                      {slide.badge}
                    </span>
                    <span className="px-3 py-1 rounded-full text-xs font-mono text-white/80 bg-white/10 backdrop-blur-xs border border-white/10">
                      {slide.categoryTag}
                    </span>
                  </div>

                  {/* Big Titles */}
                  <div className="space-y-2">
                    <h1 className="text-3xl sm:text-5xl lg:text-6xl font-black tracking-tight leading-[1.08] text-white drop-shadow-md">
                      {slide.title}
                    </h1>
                    <p className="text-lg sm:text-2xl font-bold text-[#81D4FA] drop-shadow-xs">
                      {slide.subtitle}
                    </p>
                  </div>

                  {/* Description */}
                  <p className="text-sm sm:text-base text-gray-200 leading-relaxed max-w-2xl font-normal drop-shadow-xs">
                    {slide.description}
                  </p>

                  {/* Feature Checklist Highlights */}
                  {slide.highlights && slide.highlights.length > 0 && (
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5 pt-1">
                      {slide.highlights.map((h, i) => (
                        <div 
                          key={i} 
                          className="flex items-center gap-2.5 text-xs font-mono text-white bg-black/40 backdrop-blur-md px-3.5 py-2 rounded-xl border border-white/15 shadow-sm"
                        >
                          <CheckCircle2 className="w-4 h-4 text-[#29B6F6] shrink-0" />
                          <span>{h}</span>
                        </div>
                      ))}
                    </div>
                  )}

                  {/* Specs Quick Metrics Strip */}
                  {slide.specsSummary && slide.specsSummary.length > 0 && (
                    <div className="grid grid-cols-3 gap-3 p-3.5 rounded-2xl bg-black/50 backdrop-blur-md border border-white/15 max-w-xl">
                      {slide.specsSummary.map((spec, i) => (
                        <div key={i} className="text-center font-mono">
                          <p className="text-[10px] uppercase font-bold text-[#81D4FA]">{spec.label}</p>
                          <p className="text-xs sm:text-sm font-extrabold text-white mt-0.5">{spec.value}</p>
                        </div>
                      ))}
                    </div>
                  )}

                  {/* Large CTA Action Buttons */}
                  <div className="flex flex-wrap items-center gap-3 pt-2">
                    <button
                      id="hero-btn-shop"
                      onClick={() => {
                        if (slide.ctaLink === '/products') onNavigate('products');
                        else if (slide.ctaLink === '/showcase-3d') onNavigate('showcase-3d');
                        else if (slide.ctaLink === '/b2b-wholesale') onNavigate('b2b-wholesale');
                        else onNavigate('products');
                      }}
                      className="px-7 py-4 bg-[#0288D1] hover:bg-[#0277BD] text-white font-extrabold rounded-2xl text-xs sm:text-sm shadow-xl shadow-[#0288D1]/40 transition-all transform hover:-translate-y-0.5 flex items-center gap-2.5 font-mono uppercase tracking-wider"
                    >
                      <ShoppingBag className="w-4 h-4 text-white" />
                      {slide.ctaText}
                    </button>

                    <button
                      id="hero-btn-rfq"
                      onClick={() => {
                        if (slide.secondaryCtaLink === '/b2b-wholesale') onOpenRFQ();
                        else if (slide.secondaryCtaLink === '/catalog-datasheets') onNavigate('catalog-datasheets');
                        else if (slide.secondaryCtaLink === '/brand-guidelines') onNavigate('brand-guidelines');
                        else onOpenRFQ();
                      }}
                      className="px-7 py-4 bg-white/10 hover:bg-white/20 backdrop-blur-md text-white font-extrabold rounded-2xl text-xs sm:text-sm border border-white/25 shadow-lg transition-all transform hover:-translate-y-0.5 flex items-center gap-2.5 font-mono uppercase tracking-wider"
                    >
                      <FileText className="w-4 h-4 text-[#81D4FA]" />
                      {slide.secondaryCtaText}
                    </button>

                    <button
                      onClick={() => onNavigate('showcase-3d')}
                      className="px-5 py-4 bg-black/40 hover:bg-black/60 backdrop-blur-md text-[#81D4FA] hover:text-white rounded-2xl font-mono text-xs sm:text-sm font-bold transition-all flex items-center gap-2 border border-white/15"
                    >
                      <Sparkles className="w-4 h-4 text-[#29B6F6]" />
                      <span>3D CAD Lab</span>
                    </button>
                  </div>
                </motion.div>
              </AnimatePresence>
            </div>
          </div>

          {/* Large Floating Prev/Next Navigation Arrows */}
          <button
            onClick={prevSlide}
            className="absolute left-3 sm:left-6 top-1/2 -translate-y-1/2 z-30 w-12 h-12 sm:w-14 sm:h-14 rounded-2xl bg-black/40 hover:bg-[#0288D1] backdrop-blur-md text-white border border-white/20 flex items-center justify-center transition-all shadow-xl hover:scale-105"
            title="Previous Instrument"
          >
            <ChevronLeft className="w-7 h-7 sm:w-8 sm:h-8" />
          </button>

          <button
            onClick={nextSlide}
            className="absolute right-3 sm:right-6 top-1/2 -translate-y-1/2 z-30 w-12 h-12 sm:w-14 sm:h-14 rounded-2xl bg-black/40 hover:bg-[#0288D1] backdrop-blur-md text-white border border-white/20 flex items-center justify-center transition-all shadow-xl hover:scale-105"
            title="Next Instrument"
          >
            <ChevronRight className="w-7 h-7 sm:w-8 sm:h-8" />
          </button>

          {/* Bottom Panoramic 3-Slide Selection Strip with Big Thumbnails */}
          <div className="relative z-20 w-full bg-gradient-to-t from-black/80 via-black/50 to-transparent pt-4 pb-6 border-t border-white/10">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
              <div className="grid grid-cols-1 md:grid-cols-3 gap-3 sm:gap-4">
                {heroSlides.map((s, idx) => {
                  const isActive = currentSlideIndex === idx;
                  const thumbUrl = s.imageUrl || `/images/home/home-${s.id}.jpg`;
                  const seriesLabel = s.id === 1 ? 'SURGICAL STEEL' : s.id === 2 ? 'TC CARBIDE' : 'OEM & WHOLESALE';
                  return (
                    <button
                      key={s.id}
                      onClick={() => {
                        setCurrentSlideIndex(idx);
                        setActiveModelOverride(null);
                      }}
                      className={`text-left p-3 rounded-2xl border transition-all relative overflow-hidden flex gap-3.5 items-center justify-between backdrop-blur-md ${
                        isActive
                          ? 'bg-black/75 border-[#29B6F6] ring-2 ring-[#29B6F6]/40 shadow-2xl scale-[1.02]'
                          : 'bg-black/40 hover:bg-black/60 border-white/15 hover:border-white/30 shadow-md'
                      }`}
                    >
                      {/* Active Countdown Timer Bar */}
                      {isActive && (
                        <div className="absolute top-0 left-0 right-0 h-1 bg-white/20">
                          <motion.div 
                            initial={{ width: '0%' }}
                            animate={{ width: isPaused ? '50%' : '100%' }}
                            transition={{ duration: isPaused ? 0 : 6.5, ease: 'linear' }}
                            className="h-full bg-[#29B6F6]"
                          />
                        </div>
                      )}

                      {/* Panoramic Thumbnail Image */}
                      <div className="relative w-24 h-16 sm:w-28 sm:h-16 rounded-xl overflow-hidden border border-white/20 shrink-0 bg-black/60">
                        <img
                          src={thumbUrl}
                          alt={s.title}
                          className="w-full h-full object-cover filter contrast-[1.05]"
                        />
                        <div className="absolute top-1 left-1 px-1.5 py-0.5 rounded bg-black/80 text-[#81D4FA] font-mono text-[9px] font-bold">
                          0{s.id}
                        </div>
                      </div>

                      {/* Slide Information */}
                      <div className="flex-1 min-w-0">
                        <div className="flex items-center gap-2 mb-0.5 font-mono">
                          <span className={`text-[10px] font-bold px-2 py-0.5 rounded-md ${
                            isActive ? 'bg-[#0288D1] text-white' : 'bg-white/10 text-[#81D4FA]'
                          }`}>
                            {seriesLabel}
                          </span>
                          <span className="text-[10px] text-gray-300 font-mono truncate">
                            {s.categoryTag}
                          </span>
                        </div>

                        <h4 className="text-xs sm:text-sm font-bold text-white truncate">
                          {s.title}
                        </h4>
                        <p className="text-[11px] text-[#81D4FA] truncate">
                          {s.subtitle}
                        </p>
                      </div>
                    </button>
                  );
                })}
              </div>
            </div>
          </div>

        </div>
      </section>

      {/* 4K FULLSCREEN LIGHTBOX MODAL */}
      {lightboxImage && (
        <div 
          className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-[#0B2838]/90 backdrop-blur-md animate-in fade-in"
          onClick={() => setLightboxImage(null)}
        >
          <div 
            className="relative max-w-5xl w-full max-h-[90vh] bg-[#071722] rounded-3xl overflow-hidden border-2 border-[#81D4FA] shadow-2xl flex flex-col"
            onClick={(e) => e.stopPropagation()}
          >
            {/* Lightbox Header */}
            <div className="p-4 bg-[#0B2838] border-b border-[#355C75] flex items-center justify-between text-white">
              <div className="flex items-center gap-3">
                <div className="w-9 h-9 rounded-xl bg-[#0288D1] flex items-center justify-center font-bold font-mono text-sm">
                  0{slide.id}
                </div>
                <div>
                  <h3 className="text-base font-bold">{slide.title}</h3>
                  <p className="text-xs font-mono text-[#81D4FA]">
                    File: <code className="text-white font-bold">{slide.folderReference}</code> • Sialkot Master Capture
                  </p>
                </div>
              </div>
              <button
                onClick={() => setLightboxImage(null)}
                className="w-9 h-9 rounded-xl bg-white/10 hover:bg-white/20 flex items-center justify-center text-white transition-colors"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            {/* Lightbox Image Preview */}
            <div className="p-4 flex-1 flex items-center justify-center bg-black/40 overflow-auto">
              <img
                src={lightboxImage}
                alt="High Resolution Surgical Instruments"
                className="max-h-[70vh] w-auto object-contain rounded-xl shadow-2xl"
              />
            </div>

            {/* Lightbox Footer with Specs */}
            <div className="p-4 bg-[#0B2838] border-t border-[#355C75] flex flex-wrap items-center justify-between gap-3 text-xs font-mono text-white">
              <div className="flex items-center gap-3">
                <span className="text-[#81D4FA]">AISI 420 Surgical Stainless Steel</span>
                <span>•</span>
                <span className="text-[#81D4FA]">ASTM A967 Ultrasonic Passivated</span>
                <span>•</span>
                <span className="text-[#81D4FA]">Fiber Laser MEDTREND® Etched</span>
              </div>
              <div className="flex items-center gap-2">
                <button
                  onClick={() => {
                    setLightboxImage(null);
                    onNavigate('products');
                  }}
                  className="px-4 py-2 bg-[#0288D1] hover:bg-[#0277BD] text-white font-bold rounded-xl"
                >
                  Shop Catalog
                </button>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* 4K FULLSCREEN VIDEO MODAL */}
      {fullscreenVideoSrc && (
        <div className="fixed inset-0 z-50 bg-black/90 backdrop-blur-md flex items-center justify-center p-4 sm:p-6 animate-fadeIn">
          <div className="relative max-w-5xl w-full bg-[#071722] rounded-3xl border border-[#0288D1] shadow-2xl overflow-hidden flex flex-col max-h-[92vh]">
            {/* Header */}
            <div className="p-4 bg-[#0B2838] border-b border-[#355C75] flex items-center justify-between">
              <div className="flex items-center gap-2">
                <span className="px-2.5 py-1 rounded bg-[#0288D1] text-white font-mono text-xs font-bold">4K 60FPS</span>
                <h3 className="text-white font-bold text-sm sm:text-base font-mono">
                  {currentVideo.title} — 360° Studio Orbit
                </h3>
              </div>
              <button
                onClick={() => setFullscreenVideoSrc(null)}
                className="w-9 h-9 rounded-xl bg-white/10 hover:bg-white/20 flex items-center justify-center text-white transition-colors"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            {/* Video Body with Orientation Awareness */}
            <div className="p-4 sm:p-6 flex-1 flex items-center justify-center bg-black/70 overflow-hidden">
              <video
                src={fullscreenVideoSrc}
                autoPlay
                loop
                controls
                className={`${
                  currentVideo.orientation === 'portrait'
                    ? 'max-h-[70vh] w-auto aspect-[9/16] rounded-2xl shadow-2xl border border-white/20'
                    : 'max-h-[70vh] max-w-full rounded-2xl shadow-2xl'
                } object-contain`}
              />
            </div>

            {/* Modal Footer */}
            <div className="p-4 bg-[#0B2838] border-t border-[#355C75] flex flex-wrap items-center justify-between gap-3 text-xs font-mono text-white">
              <div className="flex items-center gap-3">
                <span className="text-[#81D4FA]">{currentVideo.code}</span>
                <span>•</span>
                <span className="text-[#81D4FA]">{currentVideo.aspectBadge}</span>
                <span>•</span>
                <span className="text-white/80">{currentVideo.subtitle}</span>
              </div>
              <button
                onClick={() => {
                  setFullscreenVideoSrc(null);
                  onNavigate('showcase-3d');
                }}
                className="px-4 py-2 bg-[#0288D1] hover:bg-[#0277BD] text-white font-bold rounded-xl flex items-center gap-1.5"
              >
                <Box className="w-4 h-4" />
                <span>Open 3D CAD Lab</span>
              </button>
            </div>
          </div>
        </div>
      )}

      {/* 2. DUAL BRANDING PATHWAY (Stacked Vertically on Left) & 3D SURGICAL VIDEO SHOWCASE (Right) */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-stretch">
          
          {/* Left Column: Stacked Cards (Oper Nechy) */}
          <div className="lg:col-span-6 flex flex-col justify-between gap-6">
            {/* 1. B2B Wholesale Card */}
            <div className="p-7 sm:p-8 rounded-3xl bg-white text-[#0B2838] border border-[#B3E5FC] relative overflow-hidden group shadow-sm hover:border-[#0288D1] hover:shadow-md transition-all flex flex-col justify-between flex-1">
              <div>
                <div className="flex items-center justify-between gap-2">
                  <span className="text-[10px] font-mono font-bold uppercase tracking-[0.15em] text-[#01579B] bg-[#E1F5FE] px-3.5 py-1 rounded-full border border-[#81D4FA]">
                    Hospitals • Importers • Distributors
                  </span>
                  <span className="text-xs font-mono text-[#0288D1] font-bold">B2B Wholesale</span>
                </div>
                <h3 className="text-2xl sm:text-3xl font-extrabold text-[#0B2838] mt-3 tracking-tight">
                  B2B Wholesale & OEM Supply
                </h3>
                <p className="text-xs sm:text-sm text-[#355C75] mt-2.5 leading-relaxed">
                  Tiered institutional pricing, custom laser logo etching, private label surgical packaging, and export compliance documentation for USA, EU & GCC.
                </p>
              </div>

              <div className="mt-6 pt-4 border-t border-[#E1F5FE] flex flex-wrap items-center gap-3">
                <button
                  onClick={() => onOpenRFQ()}
                  className="px-5 py-3 rounded-xl bg-[#0288D1] hover:bg-[#0277BD] text-white font-bold text-xs shadow-md shadow-[#0288D1]/25 transition-all flex items-center gap-2 font-mono uppercase tracking-wider"
                >
                  <FileText className="w-4 h-4 text-[#B3E5FC]" />
                  Request Institutional Quote
                </button>
                <button
                  onClick={() => onNavigate('b2b-wholesale')}
                  className="px-4 py-3 rounded-xl border border-[#B3E5FC] hover:bg-[#E1F5FE] text-[#0B2838] text-xs font-mono font-bold transition-colors"
                >
                  OEM Portal →
                </button>
              </div>
            </div>

            {/* 2. B2C Direct Online Store Card */}
            <div className="p-7 sm:p-8 rounded-3xl bg-white border border-[#B3E5FC] relative overflow-hidden group hover:border-[#0288D1] hover:shadow-md transition-all shadow-sm flex flex-col justify-between flex-1">
              <div>
                <div className="flex items-center justify-between gap-2">
                  <span className="text-[10px] font-mono font-bold uppercase tracking-[0.15em] text-[#01579B] bg-[#E1F5FE] px-3.5 py-1 rounded-full border border-[#81D4FA]">
                    Surgeons • Clinics • Retail
                  </span>
                  <span className="text-xs font-mono text-[#0288D1] font-bold">Direct Store</span>
                </div>
                <h3 className="text-2xl sm:text-3xl font-extrabold text-[#0B2838] mt-3 tracking-tight">
                  Direct Online Store
                </h3>
                <p className="text-xs sm:text-sm text-[#355C75] mt-2.5 leading-relaxed">
                  Purchase individual instruments with instant DHL/FedEx worldwide tracked shipping, 14-day return policy, and complete material certification.
                </p>
              </div>

              <div className="mt-6 pt-4 border-t border-[#E1F5FE] flex flex-wrap items-center gap-3">
                <button
                  onClick={() => onNavigate('products')}
                  className="px-5 py-3 rounded-xl bg-[#0288D1] hover:bg-[#0277BD] text-white font-bold text-xs shadow-md shadow-[#0288D1]/25 transition-all flex items-center gap-2 font-mono uppercase tracking-wider"
                >
                  <ShoppingBag className="w-4 h-4 text-[#B3E5FC]" />
                  Browse Online Catalog
                </button>
                <button
                  onClick={() => onNavigate('order-tracking')}
                  className="px-4 py-3 rounded-xl border border-[#B3E5FC] hover:bg-[#E1F5FE] text-[#0B2838] text-xs font-mono font-bold transition-colors"
                >
                  Track Existing Order →
                </button>
              </div>
            </div>
          </div>

          {/* Right Column: 4-Channel 360° Surgical Video Matrix (All 4 Videos Visible Together) */}
          <div className="lg:col-span-6 flex flex-col">
            <div className="relative rounded-3xl bg-[#071722] border-2 border-[#B3E5FC] shadow-xl overflow-hidden flex flex-col justify-between h-full min-h-[520px] sm:min-h-[580px]">
              
              {/* Header: Matrix Title & 3D CAD Link */}
              <div className="p-3.5 sm:p-4 bg-[#0B2838]/95 backdrop-blur-md border-b border-white/10 flex items-center justify-between gap-2">
                <div className="flex items-center gap-2">
                  <span className="w-2.5 h-2.5 rounded-full bg-[#0288D1] animate-pulse" />
                  <h4 className="text-xs sm:text-sm font-bold text-white font-mono tracking-tight flex items-center gap-1.5">
                    <span>4-CHANNEL 360° SURGICAL VIDEO MATRIX</span>
                    <span className="hidden sm:inline-block text-[10px] bg-[#0288D1] text-white px-2 py-0.5 rounded font-bold">4 LIVE ORBITS</span>
                  </h4>
                </div>

                <button
                  onClick={() => onNavigate('showcase-3d')}
                  className="px-3 py-1.5 rounded-xl bg-[#0288D1] hover:bg-[#0277BD] text-white text-[11px] font-mono font-bold transition-all shadow-sm flex items-center gap-1.5 shrink-0"
                >
                  <Box className="w-3.5 h-3.5" />
                  <span>3D CAD Lab →</span>
                </button>
              </div>

              {/* 2x2 Live Video Grid (All 4 Videos Displayed in Front Simultaneously) */}
              <div className="p-3 sm:p-4 grid grid-cols-1 sm:grid-cols-2 gap-3 sm:gap-3.5 flex-1 bg-gradient-to-b from-[#051119] to-[#0B2838]">
                {showcaseVideos.map((v) => (
                  <div
                    key={v.id}
                    className="relative rounded-2xl bg-black/60 border border-white/15 overflow-hidden flex flex-col justify-between group hover:border-[#29B6F6] hover:ring-2 hover:ring-[#0288D1]/30 transition-all shadow-md"
                  >
                    {/* Top Tile Badge */}
                    <div className="absolute top-2 left-2 right-2 flex items-center justify-between z-20 pointer-events-none">
                      <span className="px-2 py-0.5 rounded-md bg-black/80 backdrop-blur-xs text-[#81D4FA] font-mono text-[9px] font-bold border border-white/10">
                        {v.code}
                      </span>
                      <span className="px-2 py-0.5 rounded-md bg-[#0288D1]/80 text-white font-mono text-[9px] font-bold">
                        {v.aspectBadge.split(' ')[0]}
                      </span>
                    </div>

                    {/* Video Container Stage */}
                    <div className="relative w-full h-36 sm:h-44 bg-black flex items-center justify-center overflow-hidden">
                      {/* Ambient blur for portrait */}
                      {v.orientation === 'portrait' && (
                        <div className="absolute inset-0 opacity-25 blur-lg scale-125 pointer-events-none">
                          <video
                            src={v.src}
                            autoPlay
                            loop
                            muted
                            playsInline
                            className="w-full h-full object-cover"
                          />
                        </div>
                      )}

                      <video
                        src={v.src}
                        autoPlay
                        loop
                        muted
                        playsInline
                        className={`${
                          v.orientation === 'portrait'
                            ? 'h-full max-h-[140px] sm:max-h-[170px] w-auto aspect-[9/16] object-contain rounded-lg shadow-lg'
                            : 'w-full h-full object-cover object-center filter contrast-[1.05]'
                        } transition-transform duration-500 group-hover:scale-105`}
                      />

                      {/* Hover Overlay with Fullscreen Button */}
                      <button
                        onClick={() => {
                          setActiveVideoId(v.id);
                          setFullscreenVideoSrc(v.src);
                        }}
                        className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center gap-1.5 text-white font-mono text-xs font-bold z-20"
                        title="Click to view full 4K inspection"
                      >
                        <span className="px-3 py-1.5 rounded-xl bg-[#0288D1] shadow-lg flex items-center gap-1.5">
                          <Maximize2 className="w-3.5 h-3.5" />
                          <span>4K Zoom</span>
                        </span>
                      </button>
                    </div>

                    {/* Bottom Tile Info Strip */}
                    <div className="p-2.5 bg-[#071722]/95 border-t border-white/10 z-10">
                      <div className="flex items-center justify-between gap-1">
                        <p className="text-xs font-bold text-white truncate font-mono">
                          {v.title}
                        </p>
                        <button
                          onClick={() => {
                            setActiveVideoId(v.id);
                            setFullscreenVideoSrc(v.src);
                          }}
                          className="text-[#81D4FA] hover:text-white p-1 transition-colors shrink-0"
                          title="Expand"
                        >
                          <Maximize2 className="w-3 h-3" />
                        </button>
                      </div>
                      <p className="text-[10px] font-mono text-[#81D4FA] truncate mt-0.5">
                        {v.specs[0]} • {v.specs[1]}
                      </p>
                    </div>
                  </div>
                ))}
              </div>

              {/* Bottom Matrix Footer Banner */}
              <div className="px-4 py-3 bg-[#0B2838] border-t border-white/10 flex items-center justify-between text-xs font-mono text-white/90">
                <span className="text-[#81D4FA] text-[11px] flex items-center gap-1.5">
                  <Sparkles className="w-3.5 h-3.5 text-[#29B6F6]" />
                  Continuous 360° Real Surgical Video Rotation
                </span>
                <span className="text-[10px] text-gray-400">Click any video for 4K Zoom</span>
              </div>

            </div>
          </div>

        </div>
      </section>

      {/* 3. 3D & 2-10S VIDEO LOOPS SECTION */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="p-8 lg:p-12 rounded-3xl bg-white border border-[#B3E5FC] shadow-sm relative overflow-hidden">
          <div className="max-w-2xl mb-8 space-y-2">
            <div className="flex items-center gap-2 text-[#0288D1] text-xs font-bold uppercase tracking-[0.15em] font-mono">
              <Sparkles className="w-4 h-4 text-[#29B6F6]" />
              <span>3D Precision & 360° Inspection</span>
            </div>
            <h2 className="text-2xl sm:text-3xl font-extrabold tracking-tight text-[#0B2838]">
              Next-Generation Surgical Instrument Inspection
            </h2>
            <p className="text-xs sm:text-sm text-[#355C75] leading-relaxed">
              Explore continuous 360-degree loops. Inspect jaw serrations, box-lock hinges, and tungsten carbide gold inserts with realistic lighting and x-ray CAD wireframes.
            </p>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-start">
            <div className="lg:col-span-7 xl:col-span-8">
              <Interactive3DViewer
                modelType="forceps"
                productName="Halsted Mosquito Forceps (MT-HF-001)"
                productCode="MT-HF-001"
                initialFinish="German Satin"
                videoLoopUrl="/3dslide1.mp4"
                heightClass="h-96 lg:h-[460px]"
              />
            </div>

            <div className="lg:col-span-5 xl:col-span-4 space-y-3 flex flex-col justify-between h-full">
              {/* Interactive Features */}
              <div className="p-4 sm:p-5 rounded-2xl bg-[#F4FAFD] border border-[#B3E5FC] space-y-2.5">
                <div className="flex items-center justify-between">
                  <h4 className="text-xs font-bold uppercase tracking-[0.15em] text-[#01579B] font-mono flex items-center gap-1.5">
                    <Sparkles className="w-3.5 h-3.5 text-[#0288D1]" />
                    Interactive Features
                  </h4>
                  <span className="text-[10px] font-mono px-2 py-0.5 rounded-full bg-[#E1F5FE] text-[#0288D1] font-semibold border border-[#B3E5FC]">
                    360° LIVE
                  </span>
                </div>
                <ul className="space-y-1.5 text-xs text-[#355C75]">
                  <li className="flex items-start gap-2">
                    <CheckCircle2 className="w-4 h-4 text-[#0288D1] shrink-0 mt-0.5" />
                    <span><strong className="text-[#0B2838]">10s & 2s Orbital Loops:</strong> Auto-rotation with manual angle scrubbing.</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <CheckCircle2 className="w-4 h-4 text-[#0288D1] shrink-0 mt-0.5" />
                    <span><strong className="text-[#0B2838]">Live Finish Switcher:</strong> German Satin, High Mirror, Ti-Gold & Black.</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <CheckCircle2 className="w-4 h-4 text-[#0288D1] shrink-0 mt-0.5" />
                    <span><strong className="text-[#0B2838]">Real-time Laser Marking:</strong> Instant shank laser engraving simulation.</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <CheckCircle2 className="w-4 h-4 text-[#0288D1] shrink-0 mt-0.5" />
                    <span><strong className="text-[#0B2838]">Exploded CAD View:</strong> Examine internal box lock & pivot tolerances.</span>
                  </li>
                </ul>
              </div>

              {/* Engineering Specs & Metrology */}
              <div className="p-4 sm:p-5 rounded-2xl bg-white border border-[#B3E5FC] shadow-xs space-y-2.5">
                <h4 className="text-xs font-bold uppercase tracking-[0.15em] text-[#01579B] font-mono flex items-center gap-1.5">
                  <ShieldCheck className="w-3.5 h-3.5 text-[#0288D1]" />
                  Manufacturing Metrology
                </h4>
                <div className="grid grid-cols-2 gap-2 text-xs">
                  <div className="p-2 rounded-xl bg-[#F4FAFD] border border-[#E1F5FE]">
                    <div className="text-[10px] uppercase font-mono text-[#355C75]">Steel Grade</div>
                    <div className="font-bold text-[#0B2838] mt-0.5 text-xs">AISI 420 / 440C</div>
                  </div>
                  <div className="p-2 rounded-xl bg-[#F4FAFD] border border-[#E1F5FE]">
                    <div className="text-[10px] uppercase font-mono text-[#355C75]">Hardness</div>
                    <div className="font-bold text-[#0B2838] mt-0.5 text-xs">54 – 58 HRC</div>
                  </div>
                  <div className="p-2 rounded-xl bg-[#F4FAFD] border border-[#E1F5FE]">
                    <div className="text-[10px] uppercase font-mono text-[#355C75]">Machining</div>
                    <div className="font-bold text-[#0B2838] mt-0.5 text-xs">±0.02mm CNC</div>
                  </div>
                  <div className="p-2 rounded-xl bg-[#F4FAFD] border border-[#E1F5FE]">
                    <div className="text-[10px] uppercase font-mono text-[#355C75]">Compliance</div>
                    <div className="font-bold text-[#0B2838] mt-0.5 text-xs">ISO 13485 / CE</div>
                  </div>
                </div>
              </div>

              {/* Quality & Batch Testing Protocol */}
              <div className="p-4 sm:p-5 rounded-2xl bg-white border border-[#B3E5FC] shadow-xs space-y-2.5">
                <div className="flex items-center justify-between">
                  <h4 className="text-xs font-bold uppercase tracking-[0.15em] text-[#01579B] font-mono flex items-center gap-1.5">
                    <Award className="w-3.5 h-3.5 text-[#0288D1]" />
                    Quality & Inspection Guarantee
                  </h4>
                  <span className="text-[10px] font-mono px-2 py-0.5 rounded-full bg-[#E8F5E9] text-[#2E7D32] font-semibold border border-[#C8E6C9]">
                    100% QA PASS
                  </span>
                </div>
                <div className="space-y-1.5 text-xs text-[#355C75]">
                  <div className="flex items-center gap-2">
                    <span className="w-1.5 h-1.5 rounded-full bg-[#0288D1]"></span>
                    <span><strong>Boil & Autoclave Test:</strong> ASTM F1089 rust & corrosion-free pass.</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <span className="w-1.5 h-1.5 rounded-full bg-[#0288D1]"></span>
                    <span><strong>Passivation Protocol:</strong> Chemical passivation for max surgical life.</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <span className="w-1.5 h-1.5 rounded-full bg-[#0288D1]"></span>
                    <span><strong>Factory Lead Time:</strong> 15–20 days custom OEM batch shipment.</span>
                  </div>
                </div>
              </div>

              {/* OEM Action Banner */}
              <div className="p-4 sm:p-5 rounded-2xl bg-[#E1F5FE] border border-[#81D4FA] space-y-2.5">
                <div className="space-y-1">
                  <div className="text-[11px] font-bold uppercase tracking-wider text-[#01579B] font-mono">
                    Custom OEM & Private Label
                  </div>
                  <p className="text-xs text-[#355C75]">
                    Custom lengths, tungsten inserts, or specialized brand markings to your drawings.
                  </p>
                </div>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 pt-0.5">
                  <button
                    onClick={() => onNavigate('showcase-3d')}
                    className="w-full py-2.5 px-3 rounded-xl bg-[#0288D1] hover:bg-[#0277BD] text-white font-bold text-xs shadow-md shadow-[#0288D1]/20 transition-all flex items-center justify-center gap-1.5 font-mono uppercase tracking-wider text-center"
                  >
                    <Sparkles className="w-3.5 h-3.5 text-[#B3E5FC] shrink-0" />
                    <span>3D CAD Lab</span>
                  </button>
                  <button
                    onClick={() => onOpenRFQ()}
                    className="w-full py-2.5 px-3 rounded-xl bg-white hover:bg-[#F4FAFD] text-[#01579B] border border-[#81D4FA] font-bold text-xs transition-all flex items-center justify-center gap-1.5 font-mono uppercase tracking-wider text-center"
                  >
                    <FileText className="w-3.5 h-3.5 text-[#0288D1] shrink-0" />
                    <span>Get B2B Quote</span>
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* 4. HIERARCHICAL CATEGORY & PRODUCT EXPLORER */}
      <HierarchicalCategoryExplorer 
        onNavigate={onNavigate}
        onOpenQuickView={onOpenQuickView}
        onOpenRFQ={onOpenRFQ}
        onOpen3DStudio={onOpen3DStudio}
      />

      {/* 5. BEST-SELLING PRODUCTS SHOWCASE */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-8">
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-4 border-b border-[#B3E5FC] pb-4">
          <div>
            <span className="text-[#0288D1] text-xs font-bold uppercase tracking-[0.15em] font-mono">
              Top Hospital & Clinic Deployments
            </span>
            <h2 className="text-2xl sm:text-3xl font-extrabold text-[#0B2838] tracking-tight mt-1">
              Best-Selling Surgical Instruments
            </h2>
          </div>

          <button
            onClick={() => onNavigate('products')}
            className="text-xs font-mono font-bold text-[#0288D1] hover:underline flex items-center gap-1 uppercase tracking-wider"
          >
            All Products →
          </button>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {bestSellers.map((prod) => (
            <div
              key={prod.id}
              className="bg-white rounded-2xl border border-[#B3E5FC] overflow-hidden hover:border-[#0288D1] shadow-sm transition-all flex flex-col justify-between group"
            >
              <div>
                {/* Image Container with Badges */}
                <div className="relative aspect-square bg-[#F4FAFD] p-6 flex items-center justify-center overflow-hidden border-b border-[#B3E5FC]/60">
                  <img
                    src={prod.images[0]}
                    alt={prod.name}
                    className="w-full h-full object-contain group-hover:scale-105 transition-transform duration-300"
                  />

                  <div className="absolute top-3 left-3 flex flex-col gap-1">
                    <span className="px-2 py-0.5 rounded text-[9px] font-mono font-bold bg-white text-[#01579B] border border-[#81D4FA] shadow-xs">
                      {prod.code}
                    </span>
                    {prod.isBestSeller && (
                      <span className="px-2 py-0.5 rounded text-[9px] font-mono font-bold bg-[#0288D1] text-white shadow-xs">
                        BEST SELLER
                      </span>
                    )}
                  </div>

                  {/* 3D Model floating quick badge */}
                  {prod.has3DModel && (
                    <button
                      onClick={() => onOpen3DStudio(prod)}
                      className="absolute bottom-3 right-3 p-2 rounded-xl bg-white hover:bg-[#0288D1] text-[#0288D1] hover:text-white border border-[#81D4FA] transition-colors shadow-sm"
                      title="Inspect in 3D"
                    >
                      <Sparkles className="w-3.5 h-3.5" />
                    </button>
                  )}
                </div>

                {/* Info */}
                <div className="p-5 space-y-2">
                  <div className="text-[10px] font-bold uppercase tracking-[0.15em] text-[#62879F] font-mono">
                    {prod.subCategory}
                  </div>
                  <h3
                    onClick={() => onNavigate('product-detail', prod.id)}
                    className="text-sm font-bold text-[#0B2838] hover:text-[#0288D1] cursor-pointer line-clamp-2 transition-colors"
                  >
                    {prod.name}
                  </h3>
                  <div className="text-[11px] text-[#355C75] font-mono">
                    {prod.material} • {prod.size}
                  </div>
                </div>
              </div>

              {/* Footer Actions & Specifications */}
              <div className="p-5 pt-0 space-y-3">
                <div className="flex items-center justify-between border-t border-[#B3E5FC]/60 pt-3 text-[10px] font-mono">
                  <span className="text-[#355C75] flex items-center gap-1.5 font-medium">
                    <span className="w-1.5 h-1.5 rounded-full bg-emerald-500" />
                    Direct Factory Supply
                  </span>
                  <span className="text-[#0288D1] font-semibold bg-[#E1F5FE] px-2 py-0.5 rounded border border-[#81D4FA]">
                    OEM / Custom
                  </span>
                </div>

                <div className="grid grid-cols-2 gap-2 font-mono">
                  <button
                    onClick={() => onOpenQuickView(prod)}
                    className="w-full py-2 bg-white hover:bg-[#F0F9FF] text-[#0B2838] rounded-xl text-xs transition-colors flex items-center justify-center gap-1 border border-[#B3E5FC] font-semibold"
                  >
                    <Eye className="w-3.5 h-3.5 text-[#0288D1]" /> Quick View
                  </button>
                  <button
                    onClick={() => onOpenRFQ(prod)}
                    className="w-full py-2 bg-[#0288D1] hover:bg-[#0277BD] text-white font-bold rounded-xl text-xs transition-colors flex items-center justify-center gap-1 shadow-xs"
                  >
                    <FileText className="w-3.5 h-3.5 text-[#B3E5FC]" /> B2B Quote
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* 6. SIALKOT MANUFACTURING STORY & QUALITY PILLARS */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="bg-gradient-to-br from-[#01579B] to-[#0288D1] text-white rounded-3xl p-8 lg:p-12 border border-[#81D4FA] grid grid-cols-1 lg:grid-cols-12 gap-8 items-center shadow-xl">
          <div className="lg:col-span-7 space-y-5">
            <span className="text-[10px] font-mono font-bold uppercase tracking-[0.15em] text-[#B3E5FC] bg-[#0277BD] px-3 py-1 rounded-full border border-[#81D4FA]">
              Sialkot Heritage • German Metallurgy
            </span>
            <h2 className="text-2xl sm:text-3xl lg:text-4xl font-extrabold tracking-tight text-white">
              {SIALKOT_MANUFACTURING_STORY.heading}
            </h2>
            <div className="space-y-3 text-xs sm:text-sm text-[#E1F5FE] leading-relaxed">
              {SIALKOT_MANUFACTURING_STORY.paragraphs.map((p, idx) => (
                <p key={idx}>{p}</p>
              ))}
            </div>

            {/* Key stats */}
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 pt-4">
              {SIALKOT_MANUFACTURING_STORY.stats.map((st, i) => (
                <div key={i} className="p-3.5 rounded-2xl bg-[#0277BD]/80 border border-[#81D4FA]/50 backdrop-blur-xs">
                  <div className="text-lg sm:text-xl font-black text-[#B3E5FC] font-mono">{st.value}</div>
                  <div className="text-[10px] text-[#E1F5FE] font-mono">{st.label}</div>
                </div>
              ))}
            </div>
          </div>

          <div className="lg:col-span-5 space-y-4">
            <div className="p-6 rounded-2xl bg-white text-[#0B2838] border border-[#81D4FA] space-y-4 shadow-md">
              <h3 className="text-xs font-bold text-[#0288D1] uppercase tracking-[0.15em] flex items-center gap-2 font-mono">
                <Award className="w-4 h-4 text-[#0288D1]" />
                7-Stage Quality Protocol
              </h3>

              <div className="space-y-2.5 text-xs text-[#355C75] font-mono">
                {[
                  '1. German DIN Standard Spectrometric Ingot Check',
                  '2. Hot Drop-Forging in Precision Hardened Steel Dies',
                  '3. CNC Micro-Milling with ±0.02mm Tolerances',
                  '4. Vacuum Heat Treatment to Rockwell HRC 48-52',
                  '5. ASTM A967 Nitric Ultrasonic Chemical Passivation',
                  '6. High-Precision Fiber-Laser Marking & Traceability',
                  '7. Microscope Hand-Tensioning & Cutting Inspection'
                ].map((step, idx) => (
                  <div key={idx} className="flex items-center gap-2">
                    <span className="w-2 h-2 rounded-full bg-[#0288D1] shrink-0" />
                    <span>{step}</span>
                  </div>
                ))}
              </div>

              <div className="pt-2">
                <button
                  onClick={() => onNavigate('quality-certifications')}
                  className="w-full py-2.5 bg-[#E1F5FE] hover:bg-[#B3E5FC] text-[#01579B] rounded-xl text-xs font-mono font-bold transition-colors flex items-center justify-center gap-1.5 border border-[#81D4FA]"
                >
                  Explore Quality Assurance & Docs →
                </button>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* 7. BOTTOM RFQ CALLOUT */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="p-8 sm:p-12 rounded-3xl bg-[#E1F5FE] text-[#0B2838] shadow-sm flex flex-col md:flex-row items-center justify-between gap-6 border border-[#81D4FA]">
          <div className="space-y-2 max-w-xl">
            <h3 className="text-2xl sm:text-3xl font-extrabold tracking-tight text-[#0B2838]">
              Ready to Partner with MEDTREND®?
            </h3>
            <p className="text-xs sm:text-sm text-[#355C75] leading-relaxed">
              Whether you need 1 replacement scissor or 50,000 custom-etched hospital forceps with CIF export to USA, EU, or GCC, our engineering desk is ready.
            </p>
          </div>

          <div className="flex flex-wrap items-center gap-3 shrink-0 font-mono">
            <button
              onClick={() => onOpenRFQ()}
              className="px-6 py-3.5 bg-[#0288D1] hover:bg-[#0277BD] text-white font-bold rounded-xl text-xs sm:text-sm shadow-md shadow-[#0288D1]/25 transition-colors flex items-center gap-2 uppercase tracking-wider"
            >
              <FileText className="w-4 h-4 text-[#B3E5FC]" />
              Request B2B Quotation
            </button>
            <button
              onClick={() => onNavigate('catalog-datasheets')}
              className="px-5 py-3.5 bg-white hover:bg-[#F4FAFD] text-[#0B2838] font-semibold rounded-xl text-xs sm:text-sm border border-[#B3E5FC] transition-colors"
            >
              Download PDF Catalog
            </button>
          </div>
        </div>
      </section>
    </div>
  );
};
