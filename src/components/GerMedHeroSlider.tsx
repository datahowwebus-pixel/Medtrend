import React, { useState, useEffect, useCallback, useRef } from 'react';
import { 
  ChevronLeft, ChevronRight, ShoppingBag, Pause, Play, 
  Volume2, VolumeX, CheckCircle2, ArrowRight, ShieldCheck, 
  Sparkles, Wrench, Layers, Award, FileText, Check,
  Flame, Factory, Microscope, Cog, Shield, Thermometer, Zap
} from 'lucide-react';
import { HeroSlide, Product } from '../types';
import { PRODUCTS } from '../data/productsData';

interface GerMedHeroSliderProps {
  heroSlides?: HeroSlide[];
  onNavigate: (tab: string, productId?: string, categorySlug?: string) => void;
  onAddToCart?: (product: Product, finish: string, quantity: number) => void;
  onOpenCart?: () => void;
  onOpenQuickView?: (product: Product) => void;
}

interface SlideData {
  id: string;
  tabNumber: string;
  tabLabel: string;
  tabSubtitle: string;
  tagline: string;
  headlinePart1: string;
  headlineAccent: string;
  headlinePart2: string;
  subheadline: string;
  description: string;
  specs: string[];
  videoSrc: string;
  posterSrc: string;
  primaryCtaText: string;
  primaryCtaTab: string;
  secondaryCtaText: string;
  secondaryCtaTab: string;
  accentColor: string; // e.g. '#1ab8ec' or '#eb5d0b'
  featuredProductCode: string;
  featuredProductName: string;
  featuredProductPrice: number;
  featuredProductBadge: string;
}

const SLIDES: SlideData[] = [
  {
    id: 'direct-store',
    tabNumber: '01',
    tabLabel: 'Direct Online Store',
    tabSubtitle: 'Precision You Can Trust',
    tagline: 'MEDTREND® • CRAFTED IN SIALKOT, PAKISTAN • GERMAN-GRADE STAINLESS STEEL',
    headlinePart1: 'Precision You Can Trust:',
    headlineAccent: 'CRAFTED FOR PRECISION',
    headlinePart2: 'Built for Care.',
    subheadline: 'Direct Online Ordering • Hand-Forged in Sialkot, Pakistan • Fast Express Shipping to USA, EU & GCC',
    description: 'Medtrend Pvt. Ltd. delivers professionally crafted surgical and medical instruments manufactured with high-quality German-forged stainless steel. Buy direct online with transparent pricing, instant cart checkout, and zero distributor markups.',
    specs: ['German AISI 420 Steel', '134°C Steam Autoclavable', 'ASTM F899 Metallurgy', '24-48h Express Dispatch'],
    videoSrc: '/3dslide1.mp4',
    posterSrc: '/images/home/home-1.jpg',
    primaryCtaText: 'Shop All Instruments',
    primaryCtaTab: 'products',
    secondaryCtaText: 'Inspect in 360° Lab',
    secondaryCtaTab: 'showcase-3d',
    accentColor: '#1ab8ec',
    featuredProductCode: 'MT-HF-002',
    featuredProductName: 'Kelly Hemostatic Forceps 14cm',
    featuredProductPrice: 48.00,
    featuredProductBadge: 'Online Bestseller'
  },
  {
    id: 'engineering-precision',
    tabNumber: '02',
    tabLabel: 'Precision & Durability',
    tabSubtitle: 'TC Gold & Titanium',
    tagline: 'PRECISION IN EVERY INSTRUMENT • TUNGSTEN CARBIDE & GRADE 5 TITANIUM',
    headlinePart1: 'Engineering Surgical',
    headlineAccent: 'PRECISION & DURABILITY',
    headlinePart2: 'For Critical Procedures.',
    subheadline: 'Rockwell HRC 68 TC Gold Inlays • Fatigue-Free Ergonomics • Direct Online Purchase',
    description: 'Engineered for surgeons and clinicians who demand flawless tactile feedback. Gold-ring TC Metzenbaum scissors, precision needle holders, and ultra-fine titanium micro forceps ready for direct delivery.',
    specs: ['Rockwell HRC 68 TC Inlays', 'Precision Micro-Serrations', 'Gold-Plated Ring Handles', 'Direct Factory Retail'],
    videoSrc: '/MT-HF-002-loop.mp4',
    posterSrc: '/images/home/home-2.jpg',
    primaryCtaText: 'Shop TC Gold Series',
    primaryCtaTab: 'products',
    secondaryCtaText: '360° Quality Inspection',
    secondaryCtaTab: 'showcase-3d',
    accentColor: '#eb5d0b',
    featuredProductCode: 'MT-SC-004',
    featuredProductName: 'Metzenbaum TC Dissecting Scissors 18cm',
    featuredProductPrice: 68.00,
    featuredProductBadge: 'TC Gold Precision'
  },
  {
    id: 'global-supply',
    tabNumber: '03',
    tabLabel: 'Global Supply',
    tabSubtitle: 'From Sialkot to the World',
    tagline: 'GLOBAL SUPPLY & TRUST • SERVING USA, EUROPEAN UNION, GCC & WORLDWIDE',
    headlinePart1: 'From Sialkot to the World:',
    headlineAccent: 'GLOBAL CONFIDENCE',
    headlinePart2: 'In Every Instrument.',
    subheadline: 'Trusted by Surgeons & Clinics Across USA, European Union, GCC & Worldwide',
    description: 'Medtrend Pvt. Ltd. connects Sialkot’s world-renowned surgical manufacturing directly to international healthcare practices. Enjoy transparent online pricing, express courier dispatch, and complete regulatory compliance.',
    specs: ['Priority Express to USA, EU, GCC', 'Sterile Shockproof Packaging', 'Real-Time Tracked Shipping', 'Direct Online Ordering'],
    videoSrc: '/3dslide2.mp4',
    posterSrc: '/images/home/home-3.jpg',
    primaryCtaText: 'Browse Full Catalog',
    primaryCtaTab: 'products',
    secondaryCtaText: 'Track My Order',
    secondaryCtaTab: 'order-tracking',
    accentColor: '#38bdf8',
    featuredProductCode: 'MT-TF-005',
    featuredProductName: 'Ultra-Fine Titanium Forceps 12cm',
    featuredProductPrice: 42.00,
    featuredProductBadge: 'Grade 5 Titanium'
  },
  {
    id: 'lifetime-guarantee',
    tabNumber: '04',
    tabLabel: 'Quality & Guarantee',
    tabSubtitle: '5-Year Warranty',
    tagline: 'QUALITY, RELIABILITY & CRAFTSMANSHIP • ISO 13485 & CE COMPLIANT',
    headlinePart1: '5-Year Warranty &',
    headlineAccent: '30-DAY RISK-FREE TRIAL',
    headlinePart2: 'Against Defect & Fatigue.',
    subheadline: '100% Autoclavable at 134°C • Triple-Stage Passivated per ASTM A967',
    description: 'Every MEDTREND® instrument undergoes 40x optical microscope inspection, Rockwell hardness testing, and nitric acid passivation. Guaranteed against corrosion, pitting, and joint fatigue.',
    specs: ['ASTM F899 Metallurgy', '134°C Autoclave Safe', '5-Year Durability Warranty', '30-Day Money-Back Guarantee'],
    videoSrc: '/MT-HF-001-loop.mp4',
    posterSrc: '/surgical1.jpg',
    primaryCtaText: 'Order Instruments Online',
    primaryCtaTab: 'products',
    secondaryCtaText: 'View Quality Certifications',
    secondaryCtaTab: 'quality-certifications',
    accentColor: '#fbbf24',
    featuredProductCode: 'MT-NH-012',
    featuredProductName: 'Crile-Wood TC Needle Holder 15cm',
    featuredProductPrice: 54.00,
    featuredProductBadge: 'Lifetime Suture Grip'
  }
];

const TRUST_ITEMS = [
  {
    id: 'brand-promise',
    icon: ShieldCheck,
    iconColor: '#1ab8ec',
    iconBg: 'rgba(26, 184, 236, 0.15)',
    iconBorder: 'rgba(26, 184, 236, 0.3)',
    title: 'PRECISION YOU CAN TRUST',
    desc: 'Crafted in Sialkot, Pakistan • German stainless steel',
    tag: 'MEDTREND®',
    targetTab: 'about'
  },
  {
    id: 'direct-store',
    icon: ShoppingBag,
    iconColor: '#eb5d0b',
    iconBg: 'rgba(235, 93, 11, 0.15)',
    iconBorder: 'rgba(235, 93, 11, 0.3)',
    title: 'DIRECT ONLINE STORE',
    desc: 'Save up to 45% • Instant cart checkout & transparent pricing',
    tag: 'BUY DIRECT',
    targetTab: 'products'
  },
  {
    id: 'dispatch',
    icon: Layers,
    iconColor: '#1ab8ec',
    iconBg: 'rgba(26, 184, 236, 0.15)',
    iconBorder: 'rgba(26, 184, 236, 0.3)',
    title: 'USA, EU & GCC DISPATCH',
    desc: 'Priority tracked courier shipping via DHL & FedEx worldwide',
    tag: 'AIR EXPRESS',
    targetTab: 'order-tracking'
  },
  {
    id: 'warranty',
    icon: Award,
    iconColor: '#fbbf24',
    iconBg: 'rgba(251, 191, 36, 0.15)',
    iconBorder: 'rgba(251, 191, 36, 0.3)',
    title: '5-YEAR WARRANTY',
    desc: '100% German AISI 420 steel • Lifetime defect guarantee',
    tag: 'DEFECT PROOF',
    targetTab: 'quality-certifications'
  },
  {
    id: 'certifications',
    icon: CheckCircle2,
    iconColor: '#10b981',
    iconBg: 'rgba(16, 185, 129, 0.15)',
    iconBorder: 'rgba(16, 185, 129, 0.3)',
    title: 'ISO 13485 CERTIFIED',
    desc: 'Audited cleanroom QA, CE compliant & 134°C autoclavable',
    tag: 'HOSPITAL GRADE',
    targetTab: 'quality-certifications'
  },
  {
    id: 'risk-free',
    icon: Sparkles,
    iconColor: '#c084fc',
    iconBg: 'rgba(192, 132, 252, 0.15)',
    iconBorder: 'rgba(192, 132, 252, 0.3)',
    title: '30-DAY RISK-FREE TRIAL',
    desc: 'Test balance & grip in your clinic • 100% money-back guarantee',
    tag: 'RISK FREE',
    targetTab: 'products'
  }
];

// Medtrend Direct Manufacturer Technical Specialties & Capabilities (Compact Ticker)
const MFG_CAPABILITIES = [
  {
    id: 'sialkot-forge',
    icon: Factory,
    title: 'Sialkot Craftsmanship',
    subtitle: 'Direct Sialkot, Pakistan Forge',
    badge: 'SIALKOT ORIGIN',
    color: '#eb5d0b',
    bgColor: '#fff7ed',
    borderColor: '#fed7aa',
    targetTab: 'about'
  },
  {
    id: 'german-steel',
    icon: Shield,
    title: 'German-Forged Steel',
    subtitle: 'ASTM F899 Surgical Grade',
    badge: 'AISI 420',
    color: '#195aa7',
    bgColor: '#eff6ff',
    borderColor: '#bfdbfe',
    targetTab: 'quality-certifications'
  },
  {
    id: 'cnc-milling',
    icon: Cog,
    title: 'Engineering Precision',
    subtitle: '±0.01mm Micro Tolerances',
    badge: '5-AXIS CNC',
    color: '#1ab8ec',
    bgColor: '#f0f9ff',
    borderColor: '#bae6fd',
    targetTab: 'products'
  },
  {
    id: 'tc-inlays',
    icon: Sparkles,
    title: 'Rockwell HRC 68 TC',
    subtitle: 'Tungsten Carbide Inlays',
    badge: 'HRC 68 TC',
    color: '#eb5d0b',
    bgColor: '#fff7ed',
    borderColor: '#fed7aa',
    targetTab: 'products'
  },
  {
    id: 'optical-qa',
    icon: Microscope,
    title: '40x Optical QA Pass',
    subtitle: 'Microscope Precision Inspected',
    badge: 'ZERO DEFECT',
    color: '#195aa7',
    bgColor: '#eff6ff',
    borderColor: '#bfdbfe',
    targetTab: 'quality-certifications'
  },
  {
    id: 'hot-drop',
    icon: Flame,
    title: 'Precision Drop Forging',
    subtitle: 'Zero Internal Micro-Voids',
    badge: 'HOT FORGED',
    color: '#eb5d0b',
    bgColor: '#fff7ed',
    borderColor: '#fed7aa',
    targetTab: 'about'
  },
  {
    id: 'autoclave-passivation',
    icon: Thermometer,
    title: '134°C Steam Autoclave',
    subtitle: 'ASTM A967 Nitric Passivated',
    badge: 'STERILE READY',
    color: '#195aa7',
    bgColor: '#eff6ff',
    borderColor: '#bfdbfe',
    targetTab: 'quality-certifications'
  },
  {
    id: 'global-express',
    icon: Zap,
    title: 'USA, EU & GCC Delivery',
    subtitle: 'Fast 24–48h Tracked Dispatch',
    badge: 'AIR EXPRESS',
    color: '#eb5d0b',
    bgColor: '#fff7ed',
    borderColor: '#fed7aa',
    targetTab: 'order-tracking'
  }
];

export const GerMedHeroSlider: React.FC<GerMedHeroSliderProps> = ({
  onNavigate,
  onAddToCart,
  onOpenCart,
  onOpenQuickView
}) => {
  const [currentSlideIndex, setCurrentSlideIndex] = useState(0);
  const [isPlaying, setIsPlaying] = useState(true);
  const [isMuted, setIsMuted] = useState(true);
  const [isHovered, setIsHovered] = useState(false);
  const [progress, setProgress] = useState(0);
  const [addedToast, setAddedToast] = useState<string | null>(null);
  const [isMarqueePaused, setIsMarqueePaused] = useState(false);
  const [isCompactMarqueePaused, setIsCompactMarqueePaused] = useState(false);

  const videoRef = useRef<HTMLVideoElement | null>(null);
  const progressIntervalRef = useRef<NodeJS.Timeout | null>(null);

  const SLIDE_DURATION_MS = 7000;
  const currentSlide = SLIDES[currentSlideIndex];

  // Look up featured product object
  const featuredProduct = PRODUCTS.find(p => p.code === currentSlide.featuredProductCode) || PRODUCTS[0];

  // Auto-play progress bar timer
  const nextSlide = useCallback(() => {
    setCurrentSlideIndex((prev) => (prev + 1) % SLIDES.length);
    setProgress(0);
  }, []);

  const prevSlide = useCallback(() => {
    setCurrentSlideIndex((prev) => (prev - 1 + SLIDES.length) % SLIDES.length);
    setProgress(0);
  }, []);

  const goToSlide = (index: number) => {
    setCurrentSlideIndex(index);
    setProgress(0);
  };

  useEffect(() => {
    if (!isPlaying || isHovered) {
      if (progressIntervalRef.current) clearInterval(progressIntervalRef.current);
      return;
    }

    const stepMs = 50;
    const increment = (stepMs / SLIDE_DURATION_MS) * 100;

    progressIntervalRef.current = setInterval(() => {
      setProgress((prev) => {
        if (prev >= 100) {
          nextSlide();
          return 0;
        }
        return prev + increment;
      });
    }, stepMs);

    return () => {
      if (progressIntervalRef.current) clearInterval(progressIntervalRef.current);
    };
  }, [isPlaying, isHovered, nextSlide]);

  // Video playback management
  useEffect(() => {
    if (videoRef.current) {
      videoRef.current.currentTime = 0;
      if (isPlaying) {
        videoRef.current.play().catch(() => {
          // Autoplay policy fallback: mute and retry
          if (videoRef.current) {
            videoRef.current.muted = true;
            setIsMuted(true);
            videoRef.current.play().catch(() => {});
          }
        });
      } else {
        videoRef.current.pause();
      }
    }
  }, [currentSlideIndex, isPlaying]);

  const togglePlayPause = () => {
    setIsPlaying(!isPlaying);
  };

  const toggleMute = () => {
    if (videoRef.current) {
      videoRef.current.muted = !isMuted;
      setIsMuted(!isMuted);
    }
  };

  const handleQuickAdd = (e: React.MouseEvent) => {
    e.stopPropagation();
    if (onAddToCart && featuredProduct) {
      onAddToCart(featuredProduct, featuredProduct.availableFinishes[0] || 'Satin Matte', 1);
      setAddedToast(`Added ${featuredProduct.name} to cart!`);
      setTimeout(() => setAddedToast(null), 2500);
      if (onOpenCart) {
        onOpenCart();
      }
    }
  };

  return (
    <section 
      className="relative w-full overflow-hidden bg-[#030914] text-white select-none border-b-2 border-[#1ab8ec]/25"
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      aria-label="Flagship Surgical Instrument Showcase"
    >
      {/* Toast Notification */}
      {addedToast && (
        <div className="fixed top-24 right-6 z-50 bg-[#07172b] text-white px-5 py-3.5 rounded-2xl shadow-2xl border-2 border-[#1ab8ec] flex items-center gap-3 animate-in slide-in-from-top-4 font-mono text-xs">
          <div className="w-7 h-7 rounded-full bg-[#1ab8ec] flex items-center justify-center text-white shrink-0 font-bold">
            <Check className="w-4 h-4" />
          </div>
          <div>
            <p className="font-bold text-sm text-white">{addedToast}</p>
            <button 
              onClick={() => onNavigate('cart-checkout')} 
              className="text-[#1ab8ec] hover:underline font-semibold text-xs"
            >
              View Cart & Checkout →
            </button>
          </div>
        </div>
      )}

      {/* 1. FULL-BLEED CINEMATIC BACKGROUND VIDEO */}
      <div className="absolute inset-0 w-full h-full pointer-events-none overflow-hidden">
        <video
          ref={videoRef}
          key={currentSlide.videoSrc}
          src={currentSlide.videoSrc}
          poster={currentSlide.posterSrc}
          autoPlay
          loop
          muted={isMuted}
          playsInline
          className="absolute inset-0 w-full h-full object-cover object-center scale-[1.02] filter brightness-105 contrast-110 transition-opacity duration-700"
        />

        {/* Multi-tier Optical Medical Gradients for 100% Crisp Text Readability */}
        {/* Deep Left Vignette: Dense at left for typography, smoothly transparent at right to reveal 3D instruments */}
        <div className="absolute inset-0 bg-gradient-to-r from-[#030914] via-[#030914]/85 sm:via-[#030914]/75 md:via-[#030914]/65 lg:via-[#030914]/40 to-[#030914]/15" />
        
        {/* Top and Bottom Atmosphere Shadows */}
        <div className="absolute inset-0 bg-gradient-to-t from-[#030914] via-transparent to-[#030914]/70" />

        {/* Ambient Surgical Lighting Flares */}
        <div 
          className="absolute top-1/4 -left-32 w-[550px] h-[550px] rounded-full blur-[140px] opacity-25 pointer-events-none transition-colors duration-1000"
          style={{ backgroundColor: currentSlide.accentColor }}
        />
        <div className="absolute bottom-10 right-1/4 w-[450px] h-[450px] bg-[#1ab8ec]/10 rounded-full blur-[120px] pointer-events-none" />

        {/* Architectural Surgical Graticule Lines (Subtle) */}
        <div className="absolute inset-0 opacity-[0.035] bg-[radial-gradient(#1ab8ec_1px,transparent_1px)] [background-size:28px_28px]" />
      </div>

      {/* 2. HERO FOREGROUND CONTENT WRAPPER */}
      <div className="relative z-10 max-w-[1520px] mx-auto px-5 sm:px-8 lg:px-12 xl:px-16 pt-10 sm:pt-14 lg:pt-16 pb-8 sm:pb-12 flex flex-col justify-between min-h-[640px] sm:min-h-[700px] lg:min-h-[760px] xl:min-h-[800px]">
        
        {/* Top Status Capsule Bar */}
        <div className="flex flex-wrap items-center justify-between gap-3 text-xs font-mono">
          <div className="inline-flex items-center gap-2.5 px-3.5 py-1.5 rounded-full bg-white/[0.07] border border-white/15 backdrop-blur-md text-white/90">
            <span className="w-2 h-2 rounded-full bg-[#1ab8ec] animate-pulse" />
            <span className="text-[#1ab8ec] font-bold">GERMED-STYLE FORGE PORTAL</span>
            <span className="text-white/40 hidden sm:inline">•</span>
            <span className="text-white/80 hidden sm:inline">CE Class I/IIa & ISO 13485 Certified</span>
          </div>

          <div className="flex items-center gap-2 sm:gap-3">
            {/* Promo Code Badge */}
            <div className="hidden md:flex items-center gap-2 px-3 py-1 rounded-full bg-[#eb5d0b]/15 border border-[#eb5d0b]/30 text-white text-xs">
              <span className="text-[#eb5d0b] font-bold">SURGEON15</span>
              <span className="text-white/70">15% Off First Direct Order</span>
            </div>

            {/* Video Play/Pause & Audio Toggle Controls */}
            <div className="flex items-center gap-1 bg-black/40 border border-white/10 rounded-full p-1 backdrop-blur-md">
              <button
                onClick={togglePlayPause}
                title={isPlaying ? 'Pause Background Video' : 'Play Background Video'}
                className="w-7 h-7 rounded-full flex items-center justify-center text-white/80 hover:text-white hover:bg-white/10 transition-colors"
                aria-label={isPlaying ? 'Pause video' : 'Play video'}
              >
                {isPlaying ? <Pause className="w-3.5 h-3.5" /> : <Play className="w-3.5 h-3.5 ml-0.5" />}
              </button>
              <button
                onClick={toggleMute}
                title={isMuted ? 'Unmute Audio' : 'Mute Audio'}
                className="w-7 h-7 rounded-full flex items-center justify-center text-white/80 hover:text-white hover:bg-white/10 transition-colors"
                aria-label={isMuted ? 'Unmute audio' : 'Mute audio'}
              >
                {isMuted ? <VolumeX className="w-3.5 h-3.5" /> : <Volume2 className="w-3.5 h-3.5" />}
              </button>
            </div>
          </div>
        </div>

        {/* Center Main Stage Content */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-center my-auto py-6 sm:py-10">
          
          {/* Left Column: Bold Authoritative Medical Copy (Span 8) */}
          <div className="lg:col-span-8 space-y-6 max-w-3xl">
            
            {/* Tagline Badge */}
            <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-white/[0.08] border border-white/15 backdrop-blur-md text-[11px] sm:text-xs font-mono font-bold tracking-wider uppercase text-white/90">
              <Sparkles className="w-3.5 h-3.5 text-[#1ab8ec]" />
              <span>{currentSlide.tagline}</span>
            </div>

            {/* Main Headline */}
            <h1 className="text-3xl sm:text-5xl lg:text-6xl xl:text-7xl font-black text-white tracking-tight leading-[1.08] drop-shadow-md">
              <span>{currentSlide.headlinePart1} </span>
              <span 
                className="text-transparent bg-clip-text bg-gradient-to-r"
                style={{
                  backgroundImage: `linear-gradient(to right, ${currentSlide.accentColor}, #ffffff)`
                }}
              >
                {currentSlide.headlineAccent}
              </span>{' '}
              <span>{currentSlide.headlinePart2}</span>
            </h1>

            {/* Subheadline */}
            <p className="text-base sm:text-lg font-semibold text-[#1ab8ec] tracking-wide">
              {currentSlide.subheadline}
            </p>

            {/* Narrative Description */}
            <p className="text-sm sm:text-base lg:text-lg text-gray-200/90 leading-relaxed font-normal max-w-2xl">
              {currentSlide.description}
            </p>

            {/* 4 Metallurgy & Reliability Spec Badges */}
            <div className="flex flex-wrap items-center gap-2.5 pt-1">
              {currentSlide.specs.map((spec, i) => (
                <div 
                  key={i}
                  className="inline-flex items-center gap-1.5 px-3.5 py-2 rounded-lg bg-black/40 border border-white/15 text-xs sm:text-sm font-mono text-white/95 backdrop-blur-md"
                >
                  <CheckCircle2 className="w-4 h-4 text-[#1ab8ec] shrink-0" />
                  <span>{spec}</span>
                </div>
              ))}
            </div>

            {/* Action Buttons */}
            <div className="flex flex-wrap items-center gap-4 pt-4">
              <button
                onClick={() => onNavigate(currentSlide.primaryCtaTab)}
                className="px-7 sm:px-9 py-4 rounded-xl bg-gradient-to-r from-[#1ab8ec] to-[#195aa7] hover:from-[#159ecc] hover:to-[#124b8f] text-white font-mono font-black text-sm sm:text-base uppercase tracking-wider transition-all shadow-xl shadow-[#1ab8ec]/25 flex items-center gap-2.5 active:scale-95 group"
              >
                <span>{currentSlide.primaryCtaText}</span>
                <ArrowRight className="w-4 h-4 transition-transform group-hover:translate-x-1" />
              </button>

              <button
                onClick={() => onNavigate(currentSlide.secondaryCtaTab)}
                className="px-6 sm:px-8 py-4 rounded-xl bg-white/[0.08] hover:bg-white/[0.15] border-2 border-white/20 hover:border-white/40 text-white font-mono font-bold text-sm sm:text-base uppercase tracking-wider backdrop-blur-md transition-all flex items-center gap-2 active:scale-95"
              >
                <FileText className="w-4 h-4 text-[#1ab8ec]" />
                <span>{currentSlide.secondaryCtaText}</span>
              </button>
            </div>

          </div>

          {/* Right Column: Floating Featured Instrument Quick-Card (Span 4) */}
          <div className="lg:col-span-4 flex justify-end">
            <div className="w-full max-w-sm rounded-2xl bg-[#071322]/80 border-2 border-white/15 p-5 backdrop-blur-xl shadow-2xl space-y-4 hover:border-[#1ab8ec]/50 transition-all">
              
              <div className="flex items-center justify-between">
                <span className="text-[10px] font-mono uppercase tracking-widest text-[#1ab8ec] font-bold">
                  LIVE VIDEO SHOWCASE
                </span>
                <span className="px-2.5 py-0.5 rounded-full bg-[#eb5d0b] text-white text-[10px] font-mono font-bold uppercase">
                  {currentSlide.featuredProductBadge}
                </span>
              </div>

              <div>
                <div className="text-xs font-mono text-white/50">{currentSlide.featuredProductCode}</div>
                <h3 className="text-base sm:text-lg font-bold text-white tracking-tight leading-tight mt-0.5">
                  {currentSlide.featuredProductName}
                </h3>
              </div>

              <div className="flex items-baseline justify-between pt-1 border-t border-white/10">
                <div>
                  <span className="text-xs text-white/50 block">Direct Forge Price</span>
                  <div className="flex items-baseline gap-2">
                    <span className="text-2xl font-black text-white font-mono">
                      ${currentSlide.featuredProductPrice.toFixed(2)}
                    </span>
                    <span className="text-xs text-white/40 line-through font-mono">
                      ${(currentSlide.featuredProductPrice * 1.35).toFixed(2)}
                    </span>
                  </div>
                </div>
                <span className="text-[11px] font-mono text-[#1ab8ec] font-bold">
                  Save 35% Direct
                </span>
              </div>

              <div className="grid grid-cols-2 gap-2 pt-1">
                <button
                  onClick={handleQuickAdd}
                  className="w-full py-2.5 px-3 rounded-lg bg-[#eb5d0b] hover:bg-[#d65106] text-white font-mono font-bold text-xs uppercase tracking-wider transition-all flex items-center justify-center gap-1.5 shadow-md active:scale-95"
                >
                  <ShoppingBag className="w-3.5 h-3.5" />
                  <span>Add to Cart</span>
                </button>

                <button
                  onClick={() => {
                    if (onOpenQuickView && featuredProduct) {
                      onOpenQuickView(featuredProduct);
                    } else {
                      onNavigate('products', featuredProduct.id);
                    }
                  }}
                  className="w-full py-2.5 px-3 rounded-lg bg-white/10 hover:bg-white/20 text-white font-mono font-bold text-xs uppercase tracking-wider transition-all flex items-center justify-center gap-1"
                >
                  <span>Quick Spec</span>
                  <ArrowRight className="w-3.5 h-3.5 text-[#1ab8ec]" />
                </button>
              </div>

              <div className="text-[10px] font-mono text-white/40 text-center flex items-center justify-center gap-2">
                <span>• In Stock</span>
                <span>• Ships in 24h</span>
                <span>• Autoclavable 134°C</span>
              </div>

            </div>
          </div>

        </div>

        {/* 3. BOTTOM CINEMATIC SLIDE SWITCHER TABS & CONTROLS */}
        <div className="space-y-4 pt-4 border-t border-white/10">
          
          <div className="flex items-center justify-between gap-4">
            
            {/* 4 Interactive Slide Tabs with Integrated Progress Bar */}
            <div className="grid grid-cols-2 lg:grid-cols-4 gap-2 sm:gap-4 flex-1">
              {SLIDES.map((slide, idx) => {
                const isActive = idx === currentSlideIndex;
                return (
                  <button
                    key={slide.id}
                    onClick={() => goToSlide(idx)}
                    className={`text-left p-3 sm:p-4 rounded-xl transition-all relative overflow-hidden border ${
                      isActive 
                        ? 'bg-[#07172b]/90 border-[#1ab8ec] shadow-lg shadow-[#1ab8ec]/20' 
                        : 'bg-black/30 hover:bg-black/50 border-white/10 text-white/70 hover:text-white'
                    }`}
                  >
                    {/* Animated Progress Line inside Active Tab */}
                    {isActive && (
                      <div 
                        className="absolute bottom-0 left-0 h-1 bg-[#1ab8ec] transition-all duration-75"
                        style={{ width: `${progress}%` }}
                      />
                    )}

                    <div className="flex items-center justify-between mb-1">
                      <span className={`text-xs font-mono font-bold ${isActive ? 'text-[#1ab8ec]' : 'text-white/50'}`}>
                        {slide.tabNumber}
                      </span>
                      {isActive && (
                        <span className="w-2 h-2 rounded-full bg-[#1ab8ec] animate-ping" />
                      )}
                    </div>

                    <div className="font-bold text-sm sm:text-base text-white truncate">
                      {slide.tabLabel}
                    </div>
                    <div className="text-xs sm:text-[13px] text-white/60 truncate hidden sm:block">
                      {slide.tabSubtitle}
                    </div>
                  </button>
                );
              })}
            </div>

            {/* Navigation Arrows */}
            <div className="hidden sm:flex items-center gap-2 shrink-0">
              <button
                onClick={prevSlide}
                className="w-11 h-11 rounded-full bg-black/40 hover:bg-[#1ab8ec] border border-white/20 hover:border-[#1ab8ec] text-white flex items-center justify-center transition-all active:scale-95 shadow-lg backdrop-blur-md"
                aria-label="Previous Slide"
              >
                <ChevronLeft className="w-5 h-5" />
              </button>

              <button
                onClick={nextSlide}
                className="w-11 h-11 rounded-full bg-black/40 hover:bg-[#1ab8ec] border border-white/20 hover:border-[#1ab8ec] text-white flex items-center justify-center transition-all active:scale-95 shadow-lg backdrop-blur-md"
                aria-label="Next Slide"
              >
                <ChevronRight className="w-5 h-5" />
              </button>
            </div>

          </div>

        </div>

      </div>

      {/* 4. CONTINUOUS RIGHT-TO-LEFT SURGICAL TRUST MARQUEE TICKER */}
      <div 
        className="relative z-10 bg-[#02060d] border-t border-white/10 overflow-hidden py-3.5 sm:py-4 select-none"
        aria-label="Quality and Manufacturing Guarantees Ticker"
      >
        {/* Left & Right Smooth Optical Gradient Vignettes for Seamless Fade */}
        <div className="pointer-events-none absolute left-0 top-0 bottom-0 w-16 sm:w-28 lg:w-40 z-20 bg-gradient-to-r from-[#02060d] via-[#02060d]/80 to-transparent" />
        <div className="pointer-events-none absolute right-0 top-0 bottom-0 w-16 sm:w-28 lg:w-40 z-20 bg-gradient-to-l from-[#02060d] via-[#02060d]/80 to-transparent" />

        {/* Marquee Row Container */}
        <div className="flex items-center w-full">
          
          {/* Infinite Rolling Track (Right to Left) */}
          <div 
            className={`animate-marquee-infinite flex items-center gap-4 sm:gap-6 ${isMarqueePaused ? 'marquee-paused' : ''}`}
            onMouseEnter={() => setIsMarqueePaused(true)}
            onMouseLeave={() => setIsMarqueePaused(false)}
          >
            {/* Duplicated items to create seamless infinite loop from right to left */}
            {[...TRUST_ITEMS, ...TRUST_ITEMS].map((item, idx) => {
              const Icon = item.icon;
              return (
                <div
                  key={`${item.id}-${idx}`}
                  onClick={() => onNavigate(item.targetTab)}
                  className="flex items-center gap-3.5 px-4 sm:px-5 py-2.5 rounded-xl bg-white/[0.04] hover:bg-white/[0.09] border border-white/10 hover:border-[#1ab8ec]/60 transition-all cursor-pointer shrink-0 min-w-[320px] sm:min-w-[360px] group"
                  title={`Click to view details: ${item.title}`}
                >
                  <div 
                    className="w-10 h-10 rounded-xl flex items-center justify-center shrink-0 transition-transform group-hover:scale-105 shadow-md"
                    style={{
                      backgroundColor: item.iconBg,
                      border: `1px solid ${item.iconBorder}`,
                      color: item.iconColor
                    }}
                  >
                    <Icon className="w-5 h-5" />
                  </div>

                  <div className="space-y-0.5 min-w-0 flex-1">
                    <div className="flex items-center justify-between gap-2">
                      <h4 className="font-bold text-white uppercase font-mono tracking-wider text-xs sm:text-sm truncate group-hover:text-[#1ab8ec] transition-colors">
                        {item.title}
                      </h4>
                      <span className="text-[10px] sm:text-xs font-mono font-bold px-2 py-0.5 rounded bg-white/10 text-white/80 group-hover:text-white uppercase shrink-0">
                        {item.tag}
                      </span>
                    </div>
                    <p className="text-white/80 text-xs sm:text-[13px] leading-tight truncate">
                      {item.desc}
                    </p>
                  </div>
                </div>
              );
            })}
          </div>

        </div>

        {/* Floating Pause/Play Status Indicator (Discreet) */}
        <div className="absolute right-4 sm:right-6 top-1/2 -translate-y-1/2 z-30 hidden xl:flex items-center gap-2 bg-black/80 border border-white/15 px-3 py-1 rounded-full text-xs font-mono text-white/80 backdrop-blur-md shadow-lg">
          <button
            onClick={() => setIsMarqueePaused(!isMarqueePaused)}
            className="flex items-center gap-1.5 hover:text-[#1ab8ec] transition-colors"
            title={isMarqueePaused ? 'Resume scrolling ticker' : 'Pause scrolling ticker'}
          >
            {isMarqueePaused ? (
              <>
                <Play className="w-3.5 h-3.5 text-[#1ab8ec]" />
                <span className="text-white/90">Resume Ticker</span>
              </>
            ) : (
              <>
                <span className="w-2 h-2 rounded-full bg-[#10b981] animate-pulse" />
                <span className="text-white/70">Hover to Pause</span>
              </>
            )}
          </button>
        </div>
      </div>

      {/* 5. SECOND COMPACT SLIDE (HALF-WIDTH ITEMS) - WHITE BACKGROUND WITH MEDTREND BLUE & ORANGE COLORS */}
      <div 
        className="relative z-10 bg-white border-t border-b border-blue-100 shadow-xs overflow-hidden py-2.5 sm:py-3 select-none"
        aria-label="Medtrend Manufacturer Technical Capabilities Ticker"
      >
        {/* Left & Right Smooth Optical White Gradient Vignettes */}
        <div className="pointer-events-none absolute left-0 top-0 bottom-0 w-16 sm:w-28 lg:w-40 z-20 bg-gradient-to-r from-white via-white/90 to-transparent" />
        <div className="pointer-events-none absolute right-0 top-0 bottom-0 w-16 sm:w-28 lg:w-40 z-20 bg-gradient-to-l from-white via-white/90 to-transparent" />

        {/* Marquee Row Container */}
        <div className="flex items-center w-full">
          
          {/* Leading Technical Tag on large screens */}
          <div className="hidden lg:flex items-center gap-2 pl-4 sm:pl-6 pr-3.5 py-1 border-r border-blue-100 text-xs font-mono uppercase shrink-0 z-30 bg-white">
            <span className="w-2.5 h-2.5 rounded-full bg-[#eb5d0b] animate-ping" />
            <span className="px-2.5 py-0.5 rounded bg-[#eb5d0b] text-white font-black text-[10px] tracking-wider">
              MEDTREND FORGE
            </span>
            <span className="text-[#195aa7] font-extrabold tracking-wider">
              TECH SPECS
            </span>
          </div>

          {/* Infinite Rolling Track - Right to Left with half-width compact cards */}
          <div 
            className={`animate-marquee-infinite-compact flex items-center gap-3 sm:gap-4 ${isCompactMarqueePaused ? 'marquee-compact-paused' : ''}`}
            onMouseEnter={() => setIsCompactMarqueePaused(true)}
            onMouseLeave={() => setIsCompactMarqueePaused(false)}
          >
            {/* Duplicated items to create seamless infinite loop from right to left */}
            {[...MFG_CAPABILITIES, ...MFG_CAPABILITIES].map((item, idx) => {
              const Icon = item.icon;
              return (
                <div
                  key={`mfg-${item.id}-${idx}`}
                  onClick={() => onNavigate(item.targetTab)}
                  className="flex items-center gap-2.5 px-3.5 sm:px-4 py-2 rounded-lg bg-slate-50 hover:bg-white border border-blue-100 hover:border-[#eb5d0b]/70 hover:shadow-md transition-all cursor-pointer shrink-0 min-w-[190px] sm:min-w-[230px] max-w-[280px] group"
                  title={`Medtrend Capability: ${item.title} - ${item.subtitle}`}
                >
                  <div 
                    className="w-8 h-8 rounded-lg flex items-center justify-center shrink-0 transition-transform group-hover:scale-110 shadow-xs"
                    style={{
                      backgroundColor: item.bgColor,
                      border: `1px solid ${item.borderColor}`,
                      color: item.color
                    }}
                  >
                    <Icon className="w-4 h-4" />
                  </div>

                  <div className="min-w-0 flex-1">
                    <div className="flex items-center justify-between gap-1.5">
                      <h5 className="font-bold text-[#195aa7] group-hover:text-[#eb5d0b] uppercase font-mono tracking-wider text-xs sm:text-[13px] truncate transition-colors">
                        {item.title}
                      </h5>
                      <span 
                        className="text-[10px] font-mono font-bold px-1.5 py-0.5 rounded uppercase shrink-0 transition-colors"
                        style={{
                          backgroundColor: item.bgColor,
                          color: item.color,
                          border: `1px solid ${item.borderColor}`
                        }}
                      >
                        {item.badge}
                      </span>
                    </div>
                    <p className="text-[#195aa7]/80 group-hover:text-slate-800 text-xs font-sans truncate leading-tight mt-0.5 font-medium">
                      {item.subtitle}
                    </p>
                  </div>
                </div>
              );
            })}
          </div>

        </div>
      </div>

    </section>
  );
};
