import React, { useState, useEffect, useCallback, useRef } from 'react';
import { 
  ArrowRight, ShieldCheck, Sparkles, Box, CheckCircle2, 
  ChevronRight, ChevronLeft, Award, Layers, Globe, ShoppingBag, Eye, 
  Play, Pause, RefreshCw, Check, Zap, Flame, Compass, Cpu, Wrench, Camera, 
  Maximize2, X, ZoomIn, Film, RotateCw, Phone, Mail, Filter, Star, Truck, Lock, Tag, Copy
} from 'lucide-react';
import { HeroSlide, Product } from '../types';
import { CATEGORIES_TREE, PRODUCTS } from '../data/productsData';
import { useCompany } from '../context/CompanyContext';

interface HomePageProps {
  heroSlides: HeroSlide[];
  onNavigate: (tab: string, productId?: string, categorySlug?: string) => void;
  onOpenQuickView: (product: Product) => void;
  onOpenFolderGuide: () => void;
  onOpenImageManager: () => void;
  onOpen3DStudio: (product: Product) => void;
  onAddToCart?: (product: Product, finish: string, quantity: number) => void;
  onOpenCart?: () => void;
}

export const HomePage: React.FC<HomePageProps> = ({
  heroSlides,
  onNavigate,
  onOpenQuickView,
  onOpenFolderGuide,
  onOpenImageManager,
  onOpen3DStudio,
  onAddToCart,
  onOpenCart
}) => {
  const { company } = useCompany();
  const [currentSlideIndex, setCurrentSlideIndex] = useState(0);
  const [isPaused, setIsPaused] = useState(false);
  const [lightboxImage, setLightboxImage] = useState<string | null>(null);
  const [addedToast, setAddedToast] = useState<string | null>(null);
  const [copiedPromo, setCopiedPromo] = useState(false);

  // Home Page Instant Product Filter (Right below hero)
  const [selectedProductFilter, setSelectedProductFilter] = useState<string>('all');

  // Showcase Video Player State (Duckworth & Kent 360° Inspection Loops)
  const [activeVideoId, setActiveVideoId] = useState<string>('video1');
  const [videoPlaying, setVideoPlaying] = useState(true);
  const [videoPlaybackRate, setVideoPlaybackRate] = useState<number>(1.0);
  const [fullscreenVideoSrc, setFullscreenVideoSrc] = useState<string | null>(null);
  const videoElementRef = useRef<HTMLVideoElement | null>(null);

  const showcaseVideos = [
    {
      id: 'video1',
      title: 'Curved Hemostatic Forceps (Kelly)',
      subtitle: 'AISI 420 Martensitic Steel • 360° Clinical Inspection',
      code: 'MT-HF-002',
      src: '/3dslide1.mp4',
      orientation: 'horizontal' as const,
      aspectBadge: '16:9 Landscape 4K',
      theme: 'dark',
      specs: ['Box-Lock Hinge', 'Transverse Serrations', '3-Step Ratchet Lock', 'Non-Glare Satin Finish']
    },
    {
      id: 'video2',
      title: 'Precision Tissue & Dressing Tweezers',
      subtitle: 'Surgical Spring Steel • Atraumatic Micro Tips 360°',
      code: 'MT-TF-005',
      src: '/3dslide2.mp4',
      orientation: 'horizontal' as const,
      aspectBadge: '16:9 Landscape 4K',
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
      specs: ['Gold Ring Handles', 'Micro-Beveled TC Inserts', 'Frictionless Pivot Pin', 'Laser Serial Barcode']
    },
    {
      id: 'video4',
      title: 'Titanium Scalpel Handle #3 with Knurled Grip',
      subtitle: 'Ti-6Al-4V Grade 5 Titanium • Ultra-Light 360° Loop',
      code: 'MT-SH-003',
      src: '/MT-HF-001-loop.mp4',
      orientation: 'portrait' as const,
      aspectBadge: '9:16 Portrait Studio',
      theme: 'light',
      specs: ['Cross-Hatched Tactile Knurling', 'Standard Fitment #10-15', 'Zero Magnetism', 'Autoclavable 134°C']
    }
  ];

  const currentVideo = showcaseVideos.find(v => v.id === activeVideoId) || showcaseVideos[0];

  // Hero Interactive Stage State (2026 International Medical Standard)
  const [heroActiveTab, setHeroActiveTab] = useState<number>(0);
  const [heroMediaType, setHeroMediaType] = useState<'video' | 'photo'>('video');
  const [heroVideoPlaying, setHeroVideoPlaying] = useState(true);
  const [heroPlaybackSpeed, setHeroPlaybackSpeed] = useState<number>(1.0);
  const [activeHotspot, setActiveHotspot] = useState<number | null>(null);
  const [selectedHeroFinish, setSelectedHeroFinish] = useState<string>('Satin Matte');
  const heroVideoRef = useRef<HTMLVideoElement | null>(null);

  const heroFeaturedItems = [
    {
      id: 'forceps',
      code: 'MT-HF-002',
      name: 'Kelly Hemostatic Forceps 14cm',
      category: 'General Surgery & Vascular',
      material: 'German AISI 420 Martensitic Steel',
      hardness: 'HRC 52-54',
      size: '14 cm (5.5 in)',
      price: 48.00,
      originalPrice: 65.00,
      badge: 'OR Bestseller',
      videoSrc: '/3dslide1.mp4',
      imageSrc: '/images/home/home-1.jpg',
      finishes: ['Satin Matte', 'Mirror Polish', 'Black Ceramic'],
      specs: ['Box-Lock Hinge', 'Transverse Serrations', '3-Step Ratchet', '134°C Autoclavable'],
      hotspots: [
        { title: 'Transverse Micro-Serrations', desc: 'Cross-serrated jaws ensure non-crushing vascular hemostasis', x: 28, y: 35 },
        { title: 'Box-Lock Pivot Hinge', desc: 'Eliminates blade deflection and chatter under 50N clamping load', x: 50, y: 48 },
        { title: 'Calibrated Ratchet Lock', desc: 'Tactile 3-step locking index for reliable single-hand manipulation', x: 80, y: 65 }
      ]
    },
    {
      id: 'scissors',
      code: 'MT-SC-004',
      name: 'Metzenbaum TC Dissecting Scissors 18cm',
      category: 'Tungsten Carbide Inlays',
      material: 'Tungsten Carbide Inlay + AISI 420 Steel',
      hardness: 'HRC 68 (TC Inlay)',
      size: '18 cm (7.0 in)',
      price: 68.00,
      originalPrice: 89.00,
      badge: 'Gold Handle TC Precision',
      videoSrc: '/MT-HF-002-loop.mp4',
      imageSrc: '/images/home/home-2.jpg',
      finishes: ['Tungsten Carbide Gold', 'Satin Matte'],
      specs: ['Gold-Plated Rings', 'Micro-Beveled Edge', 'Frictionless Pivot', 'Razor Dissection'],
      hotspots: [
        { title: 'Tungsten Carbide Inlay', desc: 'Ultra-hardened micro-welded TC inserts deliver 5x longer edge retention', x: 32, y: 32 },
        { title: 'Micro-Beveled Blade', desc: 'Beveled cutting geometry designed for fluid atraumatic tissue separation', x: 48, y: 45 },
        { title: 'Gold-Ring Handle', desc: 'Global medical indicator signifying genuine Tungsten Carbide craftsmanship', x: 78, y: 72 }
      ]
    },
    {
      id: 'tweezers',
      code: 'MT-TF-005',
      name: 'Ultra-Fine Tissue & Dressing Forceps',
      category: 'Titanium & Microsurgery',
      material: 'Ti-6Al-4V Grade 5 Titanium',
      hardness: 'HRC 44 (Spring Calibrated)',
      size: '12 cm (4.75 in)',
      price: 42.00,
      originalPrice: 56.00,
      badge: '0.2mm Micro-Tips',
      videoSrc: '/3dslide2.mp4',
      imageSrc: '/images/home/home-3.jpg',
      finishes: ['Blue Titanium', 'Satin Matte'],
      specs: ['0.2mm Atraumatic Tips', 'Tactile Fluting', 'Paramagnetic MRI Safe', 'Ultra-Lightweight'],
      hotspots: [
        { title: '0.2mm Atraumatic Tips', desc: 'Microscopically ground needle-fine jaws for delicate ophthalmic tissue manipulation', x: 22, y: 34 },
        { title: 'Tactile Fluting', desc: 'Ergonomic fluted ribs prevent glove slippage during long surgical sessions', x: 52, y: 52 },
        { title: 'Paramagnetic Titanium', desc: '100% MRI-safe, zero magnetic interference, and total resistance to saline corrosion', x: 80, y: 62 }
      ]
    }
  ];

  const currentHeroItem = heroFeaturedItems[heroActiveTab] || heroFeaturedItems[0];
  const currentHeroProduct = PRODUCTS.find(p => p.code === currentHeroItem.code) || PRODUCTS[0];

  useEffect(() => {
    if (heroVideoRef.current) {
      heroVideoRef.current.playbackRate = heroPlaybackSpeed;
      if (heroVideoPlaying) {
        heroVideoRef.current.play().catch(() => {});
      } else {
        heroVideoRef.current.pause();
      }
    }
  }, [heroActiveTab, heroMediaType, heroVideoPlaying, heroPlaybackSpeed]);

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

  // Auto-play timer for hero slides
  const nextSlide = useCallback(() => {
    setCurrentSlideIndex((prev) => (prev + 1) % totalSlides);
  }, [totalSlides]);

  const prevSlide = useCallback(() => {
    setCurrentSlideIndex((prev) => (prev - 1 + totalSlides) % totalSlides);
  }, [totalSlides]);

  useEffect(() => {
    if (isPaused || lightboxImage) return;
    const interval = setInterval(() => {
      nextSlide();
    }, 6500);
    return () => clearInterval(interval);
  }, [isPaused, lightboxImage, nextSlide]);

  const handleProductAddToCart = (product: Product, e?: React.MouseEvent) => {
    e?.stopPropagation();
    if (onAddToCart) {
      onAddToCart(product, product.availableFinishes[0] || 'Satin Matte', 1);
      setAddedToast(`Added ${product.name} to cart!`);
      setTimeout(() => setAddedToast(null), 3000);
      if (onOpenCart) {
        onOpenCart();
      }
    }
  };

  const handleQuickBuy = (product: Product, e?: React.MouseEvent) => {
    e?.stopPropagation();
    if (onAddToCart) {
      onAddToCart(product, product.availableFinishes[0] || 'Satin Matte', 1);
    }
    onNavigate('cart-checkout');
  };

  const handleCopyCoupon = () => {
    navigator.clipboard.writeText('SURGEON15');
    setCopiedPromo(true);
    setTimeout(() => setCopiedPromo(false), 2500);
  };

  // Filtered Products for the Instant Homepage Showcase (Right below hero)
  const filteredProducts = PRODUCTS.filter((p) => {
    if (selectedProductFilter === 'all') return true;
    if (selectedProductFilter === 'general') return p.category.toLowerCase().includes('general') || p.category.toLowerCase().includes('forcep');
    if (selectedProductFilter === 'micro-titanium') return p.material.toLowerCase().includes('titanium') || p.category.toLowerCase().includes('ophthalmic') || p.isTitanium;
    if (selectedProductFilter === 'scissors') return p.category.toLowerCase().includes('scissor') || p.name.toLowerCase().includes('scissor');
    if (selectedProductFilter === 'orthopedic') return p.category.toLowerCase().includes('orthopedic') || p.category.toLowerCase().includes('retractor');
    if (selectedProductFilter === 'dental') return p.category.toLowerCase().includes('dental') || p.category.toLowerCase().includes('oral');
    if (selectedProductFilter === 'tc') return p.finish.toLowerCase().includes('tungsten') || p.name.includes('TC');
    return true;
  });

  const productFilterTabs = [
    { id: 'all', label: 'All Instruments', count: PRODUCTS.length },
    { id: 'general', label: 'General Surgery & Forceps', count: PRODUCTS.filter(p => p.category.toLowerCase().includes('general') || p.category.toLowerCase().includes('forcep')).length },
    { id: 'micro-titanium', label: 'Titanium & Ophthalmic', count: PRODUCTS.filter(p => p.material.toLowerCase().includes('titanium') || p.category.toLowerCase().includes('ophthalmic') || p.isTitanium).length },
    { id: 'scissors', label: 'Micro & Dissecting Scissors', count: PRODUCTS.filter(p => p.category.toLowerCase().includes('scissor') || p.name.toLowerCase().includes('scissor')).length },
    { id: 'tc', label: 'Tungsten Carbide (TC)', count: PRODUCTS.filter(p => p.finish.toLowerCase().includes('tungsten') || p.name.includes('TC')).length },
    { id: 'orthopedic', label: 'Orthopedic & Retractors', count: PRODUCTS.filter(p => p.category.toLowerCase().includes('orthopedic') || p.category.toLowerCase().includes('retractor')).length },
  ];

  return (
    <div className="space-y-24 sm:space-y-32 pb-28 bg-[#f8fbfe]">
      
      {/* Toast Notification for Adding to Cart */}
      {addedToast && (
        <div className="fixed bottom-6 right-6 z-50 bg-[#195aa7] text-white px-5 py-3.5 rounded-2xl shadow-2xl border-2 border-[#1ab8ec] flex items-center gap-3 animate-in slide-in-from-bottom-5 font-mono text-xs">
          <div className="w-7 h-7 rounded-full bg-[#eb5d0b] flex items-center justify-center text-white shrink-0">
            <Check className="w-4 h-4" />
          </div>
          <div>
            <p className="font-bold">{addedToast}</p>
            <button 
              onClick={() => onNavigate('cart-checkout')} 
              className="text-[#1ab8ec] hover:underline font-bold text-[11px]"
            >
              View Cart & Checkout →
            </button>
          </div>
        </div>
      )}

      {/* 1. HERO SECTION: 2026 International Medical Device Interactive Showcase */}
      <section className="relative bg-[#06111f] text-white pt-8 sm:pt-12 lg:pt-14 pb-20 sm:pb-24 lg:pb-28 px-6 sm:px-10 lg:px-14 xl:px-16 overflow-hidden border-b-2 border-[#1ab8ec]/30">
        {/* Cinematic Ambient Lighting Glows (Apple Pro / Medical Cleanroom Stage) */}
        <div className="absolute top-0 right-1/4 w-[700px] h-[500px] bg-[#1ab8ec]/15 rounded-full blur-[140px] pointer-events-none" />
        <div className="absolute bottom-0 left-1/10 w-[550px] h-[400px] bg-[#eb5d0b]/10 rounded-full blur-[120px] pointer-events-none" />
        
        {/* Fine Architectural Cleanroom Graticule Grid */}
        <div className="absolute inset-0 opacity-[0.035] bg-[radial-gradient(#1ab8ec_1px,transparent_1px)] [background-size:24px_24px] pointer-events-none" />
        <div className="absolute top-4 left-6 text-[10px] font-mono text-white/20 tracking-widest hidden xl:block">
          REF: MEDTREND-MDR-2026 • ASTM F899-20 • CE CLASS I/IIA
        </div>
        <div className="absolute top-4 right-6 text-[10px] font-mono text-white/20 tracking-widest hidden xl:block">
          FORGE: SIALKOT, PK • 134°C STEAM AUTOCLAVE COMPLIANT
        </div>

        <div className="max-w-[1480px] mx-auto relative z-10 space-y-10">
          
          {/* Top Clinical Spec Bar (Capsule Glass Design) */}
          <div className="flex flex-wrap items-center justify-between gap-4 p-3 sm:px-6 rounded-full bg-white/[0.04] border border-white/10 backdrop-blur-md text-xs">
            <div className="flex items-center gap-3 sm:gap-4 flex-wrap">
              <span className="px-3.5 py-1 rounded-full bg-emerald-500/20 text-emerald-400 border border-emerald-500/30 font-mono font-bold text-[11px] uppercase tracking-wider flex items-center gap-2">
                <span className="w-2 h-2 rounded-full bg-emerald-400 animate-ping" />
                DIRECT FORGE ACCESS
              </span>
              <span className="text-white/80 font-medium hidden sm:inline">
                Worldwide Express Shipping • Guaranteed Sialkot Master Metallurgy
              </span>
            </div>
            
            <div className="flex items-center gap-4 text-[#1ab8ec] font-mono text-xs">
              <span className="flex items-center gap-1.5">
                <Truck className="w-3.5 h-3.5 text-[#eb5d0b]" />
                <span className="text-white/90">24-48h DHL Dispatch</span>
              </span>
              <span className="text-white/30 hidden sm:inline">•</span>
              <span className="text-white/90 font-bold hidden sm:inline">100% Autoclavable (134°C Steam)</span>
            </div>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-14 items-center">
            
            {/* Left Column: Command & Value Proposition */}
            <div className="lg:col-span-6 space-y-7">
              <div className="space-y-4">
                <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-xl bg-[#1ab8ec]/15 border border-[#1ab8ec]/35 text-[#1ab8ec] text-xs font-mono font-bold uppercase tracking-wider">
                  <Sparkles className="w-3.5 h-3.5 text-[#eb5d0b]" />
                  <span>German Forged Stainless Steel & Grade-5 Titanium</span>
                </div>
                
                <h1 className="text-4xl sm:text-5xl xl:text-6xl font-black tracking-tight text-white leading-[1.08] font-sans">
                  Surgical Mastery. <br />
                  <span className="bg-gradient-to-r from-[#1ab8ec] via-[#60d5fa] to-[#ffffff] bg-clip-text text-transparent">
                    Direct To Your OR.
                  </span>
                </h1>

                <p className="text-base sm:text-lg text-white/80 leading-relaxed max-w-xl font-sans pt-1">
                  Order precision German-grade surgical instruments online directly from our master Sialkot forge. Save up to 45% with direct clinic supply and zero middleman markups.
                </p>
              </div>

              {/* 3 High-Tech Precision Specification Chips */}
              <div className="flex flex-wrap gap-2.5 pt-1">
                <div className="flex items-center gap-2 px-3.5 py-2 rounded-xl bg-white/[0.05] border border-white/10 text-xs font-mono text-white/90">
                  <ShieldCheck className="w-4 h-4 text-[#1ab8ec]" />
                  <span>HRC 54±2 Rockwell Hardness</span>
                </div>
                <div className="flex items-center gap-2 px-3.5 py-2 rounded-xl bg-white/[0.05] border border-white/10 text-xs font-mono text-white/90">
                  <CheckCircle2 className="w-4 h-4 text-emerald-400" />
                  <span>0.18mm Micro-Jaw Precision</span>
                </div>
                <div className="flex items-center gap-2 px-3.5 py-2 rounded-xl bg-white/[0.05] border border-white/10 text-xs font-mono text-white/90">
                  <Layers className="w-4 h-4 text-[#eb5d0b]" />
                  <span>Passivated ASTM F899</span>
                </div>
              </div>

              {/* Main Call to Action Buttons */}
              <div className="flex flex-wrap items-center gap-4 pt-2">
                <button
                  onClick={() => onNavigate('products')}
                  className="px-8 py-4 rounded-2xl bg-[#eb5d0b] hover:bg-[#d65106] text-white font-mono font-bold text-sm uppercase tracking-wider shadow-xl shadow-[#eb5d0b]/30 flex items-center gap-3 transition-all hover:scale-105 active:scale-95"
                >
                  <ShoppingBag className="w-5 h-5" />
                  <span>Shop All Instruments</span>
                </button>

                <button
                  onClick={() => onNavigate('showcase-3d')}
                  className="px-7 py-4 rounded-2xl bg-white/[0.06] hover:bg-white/[0.12] text-white font-mono font-bold text-sm uppercase tracking-wider border border-[#1ab8ec]/50 hover:border-[#1ab8ec] flex items-center gap-2.5 transition-all hover:scale-105"
                >
                  <RotateCw className="w-5 h-5 text-[#1ab8ec]" />
                  <span>360° Inspection Lab</span>
                </button>
              </div>

              {/* Surgeon VIP Coupon Banner */}
              <div className="p-3.5 rounded-2xl bg-gradient-to-r from-[#1ab8ec]/10 via-[#195aa7]/20 to-transparent border border-[#1ab8ec]/30 flex items-center justify-between gap-4 max-w-xl">
                <div className="flex items-center gap-2.5">
                  <Tag className="w-4 h-4 text-[#eb5d0b]" />
                  <span className="text-xs text-white/90">
                    Clinic Welcome Offer: Use code <strong className="text-white font-mono bg-[#1ab8ec]/30 px-1.5 py-0.5 rounded">SURGEON15</strong> for 15% off
                  </span>
                </div>
                <button
                  onClick={handleCopyCoupon}
                  className="shrink-0 px-3 py-1 rounded-lg bg-[#eb5d0b] hover:bg-[#d65106] text-white text-[11px] font-mono font-bold uppercase transition-colors flex items-center gap-1.5"
                >
                  {copiedPromo ? <Check className="w-3 h-3" /> : <Copy className="w-3 h-3" />}
                  <span>{copiedPromo ? 'Copied' : 'Copy'}</span>
                </button>
              </div>

              {/* Trust Indicators */}
              <div className="grid grid-cols-3 gap-6 pt-5 border-t border-white/10">
                <div className="space-y-1">
                  <div className="font-mono font-black text-[#1ab8ec] text-lg sm:text-2xl">750+ SKUs</div>
                  <div className="text-white/70 text-xs">In Stock & Ready</div>
                </div>
                <div className="space-y-1">
                  <div className="font-mono font-black text-[#eb5d0b] text-lg sm:text-2xl">Free Delivery</div>
                  <div className="text-white/70 text-xs">On Orders $150+</div>
                </div>
                <div className="space-y-1">
                  <div className="font-mono font-black text-emerald-400 text-lg sm:text-2xl">30-Day Returns</div>
                  <div className="text-white/70 text-xs">Risk-Free Clinic Trial</div>
                </div>
              </div>

            </div>

            {/* Right Column: Interactive Clinical Showcase Stage (2026 International Standard) */}
            <div className="lg:col-span-6">
              <div className="relative rounded-3xl overflow-hidden bg-gradient-to-b from-white/[0.09] to-white/[0.02] border border-white/15 shadow-2xl p-4 sm:p-5 backdrop-blur-xl">
                
                {/* Stage Header: 3 Flagship Instrument Tabs & View Switcher */}
                <div className="space-y-3 mb-4">
                  
                  {/* Top Level: Instrument Selector Tabs */}
                  <div className="flex items-center justify-between gap-2 overflow-x-auto pb-1 scrollbar-none">
                    <div className="flex items-center gap-2">
                      {heroFeaturedItems.map((item, idx) => (
                        <button
                          key={item.id}
                          onClick={() => {
                            setHeroActiveTab(idx);
                            setActiveHotspot(null);
                            setSelectedHeroFinish(item.finishes[0]);
                          }}
                          className={`px-3 py-2 rounded-xl text-xs font-mono font-bold transition-all flex items-center gap-2 whitespace-nowrap ${
                            heroActiveTab === idx
                              ? 'bg-[#195aa7] text-white border border-[#1ab8ec] shadow-md'
                              : 'bg-white/[0.05] text-white/70 hover:text-white hover:bg-white/[0.1] border border-transparent'
                          }`}
                        >
                          <span className={`w-2 h-2 rounded-full ${heroActiveTab === idx ? 'bg-[#eb5d0b]' : 'bg-white/40'}`} />
                          <span>{item.name.split(' ')[0]}</span>
                          <span className="text-[#1ab8ec] font-mono text-[11px]">${item.price}</span>
                        </button>
                      ))}
                    </div>

                    {/* View Mode Toggle: 360 Video vs Ultra-HD Macro Photo */}
                    <div className="flex items-center bg-black/40 rounded-xl p-1 border border-white/10 shrink-0">
                      <button
                        onClick={() => setHeroMediaType('video')}
                        className={`px-2.5 py-1 rounded-lg text-[11px] font-mono font-bold transition-colors flex items-center gap-1.5 ${
                          heroMediaType === 'video'
                            ? 'bg-[#1ab8ec] text-[#06111f]'
                            : 'text-white/70 hover:text-white'
                        }`}
                        title="360° Inspection Video Loop"
                      >
                        <Film className="w-3.5 h-3.5" />
                        <span>360° Loop</span>
                      </button>
                      <button
                        onClick={() => setHeroMediaType('photo')}
                        className={`px-2.5 py-1 rounded-lg text-[11px] font-mono font-bold transition-colors flex items-center gap-1.5 ${
                          heroMediaType === 'photo'
                            ? 'bg-[#1ab8ec] text-[#06111f]'
                            : 'text-white/70 hover:text-white'
                        }`}
                        title="High-Resolution Macro Photo with Hotspots"
                      >
                        <Camera className="w-3.5 h-3.5" />
                        <span>Macro Hotspots</span>
                      </button>
                    </div>
                  </div>
                </div>

                {/* Main Media Showcase Window */}
                <div className="relative aspect-[16/10] sm:aspect-[16/10] rounded-2xl overflow-hidden bg-gradient-to-b from-[#0e2138] to-[#050e18] border border-white/10 flex items-center justify-center group">
                  
                  {/* Mode 1: 360° 4K Video Loop */}
                  {heroMediaType === 'video' ? (
                    <div className="relative w-full h-full flex items-center justify-center">
                      <video
                        ref={heroVideoRef}
                        src={currentHeroItem.videoSrc}
                        autoPlay
                        loop
                        muted
                        playsInline
                        className="w-full h-full object-cover"
                      />
                      <div className="absolute inset-0 bg-gradient-to-t from-[#06111f]/80 via-transparent to-black/20 pointer-events-none" />

                      {/* Video Status Overlay */}
                      <div className="absolute top-3 left-3 flex items-center gap-2">
                        <span className="px-2.5 py-1 rounded-lg bg-black/60 backdrop-blur-md border border-white/15 text-white text-[11px] font-mono font-bold flex items-center gap-1.5">
                          <span className="w-2 h-2 rounded-full bg-cyan-400 animate-pulse" />
                          360° Clinical Inspection
                        </span>
                      </div>

                      {/* Video Player Controls (Overlay Bottom-Right) */}
                      <div className="absolute bottom-3 right-3 flex items-center gap-2 z-10">
                        <button
                          onClick={() => setHeroPlaybackSpeed((prev) => (prev === 1.0 ? 0.5 : 1.0))}
                          className="px-2.5 py-1 rounded-lg bg-black/60 hover:bg-black/80 backdrop-blur-md border border-white/20 text-white text-[10px] font-mono font-bold"
                          title="Toggle Playback Speed"
                        >
                          {heroPlaybackSpeed}x Speed
                        </button>
                        <button
                          onClick={() => setHeroVideoPlaying(!heroVideoPlaying)}
                          className="p-1.5 rounded-lg bg-black/60 hover:bg-[#eb5d0b] backdrop-blur-md border border-white/20 text-white transition-colors"
                          title={heroVideoPlaying ? 'Pause Video' : 'Play Video'}
                        >
                          {heroVideoPlaying ? <Pause className="w-3.5 h-3.5" /> : <Play className="w-3.5 h-3.5" />}
                        </button>
                      </div>
                    </div>
                  ) : (
                    /* Mode 2: Ultra-HD Macro Photo with Interactive Clinical Hotspots */
                    <div className="relative w-full h-full">
                      <img
                        src={currentHeroItem.imageSrc}
                        alt={currentHeroItem.name}
                        className="w-full h-full object-cover"
                        onError={(e) => {
                          (e.target as HTMLImageElement).src = '/surgical1.jpg';
                        }}
                      />
                      <div className="absolute inset-0 bg-gradient-to-t from-[#06111f]/80 via-transparent to-black/30 pointer-events-none" />

                      {/* Interactive Hotspot Pins */}
                      {currentHeroItem.hotspots.map((spot, sIdx) => (
                        <div
                          key={sIdx}
                          style={{ left: `${spot.x}%`, top: `${spot.y}%` }}
                          className="absolute -translate-x-1/2 -translate-y-1/2 z-20"
                        >
                          <button
                            onClick={() => setActiveHotspot(activeHotspot === sIdx ? null : sIdx)}
                            className="relative group/pin focus:outline-none"
                          >
                            <span className="absolute -inset-2 rounded-full bg-[#1ab8ec]/40 animate-ping" />
                            <span className="relative flex items-center justify-center w-6 h-6 rounded-full bg-[#195aa7] border-2 border-white text-white font-mono text-[10px] font-black shadow-lg">
                              {sIdx + 1}
                            </span>
                          </button>

                          {/* Hotspot Floating Card */}
                          {activeHotspot === sIdx && (
                            <div className="absolute bottom-8 left-1/2 -translate-x-1/2 w-64 p-3 rounded-xl bg-black/90 backdrop-blur-md border border-[#1ab8ec] text-white shadow-2xl z-30 animate-in fade-in zoom-in-95 font-sans">
                              <div className="flex items-center justify-between pb-1 border-b border-white/10 mb-1.5">
                                <span className="text-xs font-bold text-[#1ab8ec]">{spot.title}</span>
                                <button
                                  onClick={(e) => {
                                    e.stopPropagation();
                                    setActiveHotspot(null);
                                  }}
                                  className="text-white/60 hover:text-white"
                                >
                                  <X className="w-3.5 h-3.5" />
                                </button>
                              </div>
                              <p className="text-[11px] text-white/80 leading-snug">{spot.desc}</p>
                            </div>
                          )}
                        </div>
                      ))}

                      {/* Photo Enlarge Button */}
                      <button
                        onClick={() => setLightboxImage(currentHeroItem.imageSrc)}
                        className="absolute bottom-3 right-3 p-2 rounded-xl bg-black/60 hover:bg-[#eb5d0b] backdrop-blur-md border border-white/20 text-white transition-colors"
                        title="Enlarge Macro Image"
                      >
                        <ZoomIn className="w-4 h-4" />
                      </button>
                    </div>
                  )}
                </div>

                {/* In-Stage Direct E-Commerce Card (Live Buy & Finish Selection) */}
                <div className="mt-4 p-4 rounded-2xl bg-white/[0.04] border border-white/10 space-y-3.5">
                  <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2">
                    <div>
                      <div className="flex items-center gap-2">
                        <span className="px-2 py-0.5 rounded bg-[#eb5d0b] text-white text-[10px] font-mono font-black uppercase">
                          {currentHeroItem.code}
                        </span>
                        <span className="text-xs font-mono text-[#1ab8ec] font-medium">{currentHeroItem.hardness}</span>
                      </div>
                      <h3 className="text-base sm:text-lg font-black tracking-tight text-white mt-1">
                        {currentHeroItem.name}
                      </h3>
                      <p className="text-[11px] text-white/60 font-mono">
                        {currentHeroItem.material} • {currentHeroItem.size}
                      </p>
                    </div>

                    {/* Price & Savings */}
                    <div className="text-right shrink-0">
                      <div className="flex items-baseline justify-end gap-2">
                        <span className="text-2xl font-black font-mono text-white">${currentHeroItem.price.toFixed(2)}</span>
                        <span className="text-xs font-mono text-white/40 line-through">${currentHeroItem.originalPrice.toFixed(2)}</span>
                      </div>
                      <span className="text-[10px] font-mono font-bold text-emerald-400 bg-emerald-500/10 px-2 py-0.5 rounded">
                        Save ${(currentHeroItem.originalPrice - currentHeroItem.price).toFixed(2)} (Direct Forge)
                      </span>
                    </div>
                  </div>

                  {/* Surface Finish Selector Chips */}
                  <div className="flex items-center justify-between gap-3 pt-2 border-t border-white/10">
                    <div className="flex items-center gap-2">
                      <span className="text-[11px] font-mono text-white/60">Finish:</span>
                      <div className="flex items-center gap-1.5 flex-wrap">
                        {currentHeroItem.finishes.map((finish) => (
                          <button
                            key={finish}
                            onClick={() => setSelectedHeroFinish(finish)}
                            className={`px-2.5 py-1 rounded-lg text-[11px] font-mono font-bold transition-all ${
                              selectedHeroFinish === finish
                                ? 'bg-[#1ab8ec] text-[#06111f] font-black shadow-xs'
                                : 'bg-white/[0.05] text-white/70 hover:bg-white/[0.1] border border-white/10'
                            }`}
                          >
                            {finish}
                          </button>
                        ))}
                      </div>
                    </div>

                    {/* Instant Add to Cart Button */}
                    <div className="flex items-center gap-2">
                      <button
                        onClick={() => {
                          if (onAddToCart) {
                            onAddToCart(currentHeroProduct, selectedHeroFinish, 1);
                            setAddedToast(`Added ${currentHeroItem.name} to cart!`);
                            setTimeout(() => setAddedToast(null), 3000);
                            if (onOpenCart) onOpenCart();
                          }
                        }}
                        className="px-4 py-2 rounded-xl bg-[#1ab8ec] hover:bg-[#149fcb] text-[#06111f] font-mono font-bold text-xs uppercase tracking-wider flex items-center gap-1.5 transition-all shadow-md active:scale-95"
                      >
                        <ShoppingBag className="w-3.5 h-3.5" />
                        <span>Add To Cart</span>
                      </button>

                      <button
                        onClick={() => {
                          if (onAddToCart) {
                            onAddToCart(currentHeroProduct, selectedHeroFinish, 1);
                          }
                          onNavigate('cart-checkout');
                        }}
                        className="px-4 py-2 rounded-xl bg-[#eb5d0b] hover:bg-[#d65106] text-white font-mono font-bold text-xs uppercase tracking-wider flex items-center gap-1.5 transition-all shadow-md active:scale-95"
                      >
                        <span>Buy Now</span>
                      </button>
                    </div>
                  </div>

                </div>

              </div>
            </div>

          </div>

        </div>
      </section>

      {/* 2. IMMEDIATE PRODUCTS CATALOGUE WITH ADD-TO-CART & QUICK BUY */}
      <section className="max-w-[1480px] mx-auto px-6 sm:px-10 lg:px-14 xl:px-16">
        
        {/* Section Header: Open, Spacious, High-Contrast */}
        <div className="flex flex-col lg:flex-row lg:items-end justify-between gap-6 pb-8 border-b-2 border-gray-200">
          <div className="space-y-3 max-w-3xl">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-md bg-[#eb5d0b]/10 text-[#eb5d0b] text-xs font-mono font-black uppercase tracking-wider">
              <ShoppingBag className="w-4 h-4" />
              <span>Direct Online Ordering • 24h Express Dispatch</span>
            </div>
            <h2 className="text-3xl sm:text-4xl lg:text-5xl font-black text-[#195aa7] tracking-tight">
              Featured Surgical Instruments
            </h2>
            <p className="text-sm sm:text-base text-gray-600 leading-relaxed">
              Order directly with full transparency, live online pricing, and guaranteed German steel metallurgy. Click "Add to Cart" for immediate express checkout.
            </p>
          </div>

          <div className="flex items-center gap-4 shrink-0">
            <button
              onClick={() => onNavigate('products')}
              className="px-6 py-3 rounded-xl bg-[#195aa7] hover:bg-[#12437e] text-white text-xs font-mono font-bold uppercase tracking-wider flex items-center gap-2 transition-all shadow-md group"
            >
              <span>View All {PRODUCTS.length} Instruments</span>
              <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
            </button>
          </div>
        </div>

        {/* Category Filter Tabs (Spacious, Breathable, Instant Switch) */}
        <div className="flex items-center gap-2.5 overflow-x-auto py-6 scrollbar-none">
          {productFilterTabs.map((tab) => (
            <button
              key={tab.id}
              onClick={() => setSelectedProductFilter(tab.id)}
              className={`px-5 py-2.5 rounded-xl text-xs sm:text-sm font-bold uppercase tracking-wider whitespace-nowrap transition-all flex items-center gap-2.5 ${
                selectedProductFilter === tab.id
                  ? 'bg-[#195aa7] text-white shadow-md font-black'
                  : 'bg-white text-[#195aa7] hover:bg-[#1ab8ec]/10 border border-gray-200 hover:border-[#1ab8ec]'
              }`}
            >
              <span>{tab.label}</span>
              <span className={`text-[10px] font-mono font-black px-2 py-0.5 rounded-full ${
                selectedProductFilter === tab.id
                  ? 'bg-[#eb5d0b] text-white'
                  : 'bg-gray-100 text-gray-600'
              }`}>
                {tab.count}
              </span>
            </button>
          ))}
        </div>

        {/* Spacious Product Grid with E-Commerce Buttons */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8 pt-4">
          {filteredProducts.slice(0, 8).map((product) => {
            const originalPrice = Math.round(product.price * 1.25);
            return (
              <div
                key={product.id}
                className="bg-white rounded-3xl p-6 sm:p-7 border border-slate-200/90 hover:border-[#1ab8ec] shadow-sm hover:shadow-2xl transition-all flex flex-col justify-between group relative"
              >
                <div>
                  {/* Image Container with Badges */}
                  <div className="relative aspect-square rounded-2xl bg-[#f8fbfe] p-6 flex items-center justify-center overflow-hidden mb-6 border border-slate-100 group-hover:bg-white transition-colors">
                    <img
                      src={product.images[0]}
                      alt={product.name}
                      className="w-full h-full object-contain group-hover:scale-105 transition-transform duration-500"
                      onError={(e) => {
                        (e.target as HTMLImageElement).src = '/surgical1.jpg';
                      }}
                    />
                    
                    {/* Top Left SKU Code Badge */}
                    <span className="absolute top-4 left-4 px-3 py-1 rounded-lg bg-[#195aa7] text-white font-mono text-xs font-black shadow-sm">
                      {product.code}
                    </span>

                    {/* 360 Turntable Indicator */}
                    {product.videoLoopUrl && (
                      <button
                        onClick={(e) => {
                          e.stopPropagation();
                          onOpen3DStudio(product);
                        }}
                        className="absolute bottom-4 right-4 px-2.5 py-1 rounded-lg bg-[#1ab8ec] hover:bg-[#149ec9] text-[#195aa7] font-mono text-[11px] font-bold flex items-center gap-1.5 shadow-md transition-all hover:scale-105"
                        title="Inspect in 360°"
                      >
                        <RotateCw className="w-3.5 h-3.5 animate-spin-slow" />
                        <span>360° Orbit</span>
                      </button>
                    )}

                    <div className="absolute top-4 right-4 flex flex-col items-end gap-1.5">
                      <span className="px-2.5 py-0.5 rounded-md bg-emerald-100 text-emerald-800 font-mono text-[10px] font-bold">
                        In Stock
                      </span>
                      {product.finish.toLowerCase().includes('tungsten') && (
                        <span className="px-2 py-0.5 rounded-md bg-amber-100 text-amber-900 font-mono text-[10px] font-bold">
                          TC Gold
                        </span>
                      )}
                    </div>
                  </div>

                  {/* Product Meta */}
                  <div className="space-y-2">
                    <div className="flex items-center justify-between">
                      <span className="text-xs font-mono font-bold text-[#1ab8ec] uppercase tracking-wider">
                        {product.category}
                      </span>
                      <div className="flex items-center text-amber-500 text-xs gap-1">
                        <span>★</span>
                        <span className="font-mono text-gray-700 text-[11px]">{product.rating}</span>
                      </div>
                    </div>
                    
                    <h3 
                      onClick={() => onNavigate('product-detail', product.id)}
                      className="text-base sm:text-lg font-black text-[#195aa7] group-hover:text-[#eb5d0b] transition-colors cursor-pointer line-clamp-2 leading-snug"
                    >
                      {product.name}
                    </h3>

                    <p className="text-xs sm:text-sm text-gray-500 line-clamp-2 leading-relaxed pt-1">
                      {product.shortDesc}
                    </p>
                  </div>
                </div>

                {/* Price & Pure E-Commerce Action CTAs */}
                <div className="pt-6 mt-6 border-t border-slate-100 space-y-3">
                  <div className="flex items-baseline justify-between">
                    <div>
                      <div className="flex items-baseline gap-2">
                        <span className="text-xl sm:text-2xl font-black text-[#195aa7] font-mono">
                          ${product.price.toFixed(2)}
                        </span>
                        <span className="text-xs text-gray-400 line-through font-mono">
                          ${originalPrice}.00
                        </span>
                      </div>
                      <span className="text-[10px] uppercase font-bold text-emerald-600 tracking-wider">Save 20% Online</span>
                    </div>

                    <button
                      onClick={() => onOpenQuickView(product)}
                      className="p-2.5 rounded-xl bg-[#f4f8fc] hover:bg-[#1ab8ec]/20 text-[#195aa7] transition-all"
                      title="Quick Specs & Zoom"
                    >
                      <Eye className="w-4 h-4" />
                    </button>
                  </div>

                  {/* Dual E-Commerce Buttons: Add to Cart & Buy Now */}
                  <div className="grid grid-cols-2 gap-2 font-mono">
                    <button
                      onClick={(e) => handleProductAddToCart(product, e)}
                      className="w-full py-3 rounded-xl bg-[#195aa7] hover:bg-[#12437e] text-white font-bold text-xs uppercase tracking-wider transition-all flex items-center justify-center gap-1.5 shadow-sm active:scale-95"
                    >
                      <ShoppingBag className="w-3.5 h-3.5" />
                      <span>Add to Cart</span>
                    </button>

                    <button
                      onClick={(e) => handleQuickBuy(product, e)}
                      className="w-full py-3 rounded-xl bg-[#eb5d0b] hover:bg-[#d65106] text-white font-bold text-xs uppercase tracking-wider transition-all flex items-center justify-center gap-1.5 shadow-md shadow-[#eb5d0b]/30 active:scale-95"
                    >
                      <span>Buy Now</span>
                    </button>
                  </div>
                </div>

              </div>
            );
          })}
        </div>

        {/* Bottom Explorer Action */}
        <div className="mt-12 text-center">
          <button
            onClick={() => onNavigate('products')}
            className="inline-flex items-center gap-3 px-8 py-4 rounded-2xl bg-white hover:bg-[#f4f8fc] text-[#195aa7] border-2 border-[#195aa7]/20 hover:border-[#195aa7] font-mono font-bold text-sm uppercase tracking-wider transition-all shadow-sm group"
          >
            <span>Shop Full Catalog of {PRODUCTS.length}+ Surgical Tools</span>
            <ArrowRight className="w-4 h-4 group-hover:translate-x-1.5 transition-transform text-[#eb5d0b]" />
          </button>
        </div>

      </section>

      {/* 3. DUCKWORTH & KENT 360° INTERACTIVE TURNTABLE INSPECTION LAB */}
      <section className="max-w-[1480px] mx-auto px-6 sm:px-10 lg:px-14 xl:px-16">
        <div className="bg-gradient-to-br from-[#195aa7] via-[#144988] to-[#0d2e57] rounded-3xl p-8 sm:p-12 lg:p-16 border-4 border-[#1ab8ec] text-white shadow-2xl overflow-hidden relative">
          
          <div className="flex flex-wrap items-center justify-between gap-6 mb-10 pb-8 border-b border-white/20">
            <div>
              <div className="flex items-center gap-3 mb-2.5">
                <span className="px-3.5 py-1 rounded-md bg-[#eb5d0b] text-white text-xs font-mono font-black uppercase tracking-wider">
                  Interactive 360° Lab
                </span>
                <span className="text-xs sm:text-sm font-mono text-[#1ab8ec] font-bold">Clinical Turntable Examination</span>
              </div>
              <h2 className="text-3xl sm:text-4xl font-black text-white tracking-tight">
                Inspect Instruments In 360° Before Buying
              </h2>
              <p className="text-sm sm:text-base text-white/80 max-w-3xl mt-2 leading-relaxed">
                Examine box-lock hinges, tungsten carbide bonded inlays, and atraumatic tip alignments in ultra-high resolution before completing your online order.
              </p>
            </div>

            <div className="flex items-center gap-3">
              <button
                onClick={() => onNavigate('showcase-3d')}
                className="px-6 py-3.5 rounded-xl bg-[#eb5d0b] hover:bg-[#d65106] text-white font-mono font-bold text-xs sm:text-sm uppercase tracking-wider transition-all shadow-lg hover:scale-105"
              >
                Launch Full 3D Studio
              </button>
            </div>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-center">
            
            {/* Video Player Display */}
            <div className="lg:col-span-8">
              <div className="relative rounded-3xl overflow-hidden bg-black/85 border-2 border-[#1ab8ec]/60 shadow-2xl flex items-center justify-center aspect-16/9">
                <video
                  ref={videoElementRef}
                  src={currentVideo.src}
                  loop
                  muted
                  playsInline
                  autoPlay
                  className="w-full h-full object-contain"
                />

                {/* Overlay Controls */}
                <div className="absolute top-5 left-5 flex items-center gap-3">
                  <span className="px-3 py-1.5 rounded-lg bg-black/80 backdrop-blur-md text-xs font-mono font-bold text-[#1ab8ec] border border-[#1ab8ec]/50">
                    {currentVideo.code}
                  </span>
                  <span className="px-3 py-1.5 rounded-lg bg-[#eb5d0b] text-xs font-mono font-black text-white">
                    {currentVideo.aspectBadge}
                  </span>
                </div>

                <div className="absolute bottom-5 left-5 right-5 p-4 rounded-2xl bg-black/75 backdrop-blur-md border border-white/20 flex items-center justify-between">
                  <div>
                    <h4 className="text-base font-bold text-white">{currentVideo.title}</h4>
                    <p className="text-xs text-[#1ab8ec] font-mono mt-0.5">{currentVideo.subtitle}</p>
                  </div>

                  <div className="flex items-center gap-3">
                    <button
                      onClick={() => setVideoPlaying(!videoPlaying)}
                      className="p-2.5 rounded-xl bg-white/20 hover:bg-[#eb5d0b] text-white transition-colors"
                    >
                      {videoPlaying ? <Pause className="w-5 h-5" /> : <Play className="w-5 h-5" />}
                    </button>
                    <button
                      onClick={() => setVideoPlaybackRate(prev => prev === 1 ? 0.5 : prev === 0.5 ? 2.0 : 1)}
                      className="px-3 py-2 rounded-xl bg-white/20 hover:bg-[#1ab8ec] text-white font-mono text-xs font-bold transition-colors"
                    >
                      {videoPlaybackRate}x
                    </button>
                    <button
                      onClick={() => setFullscreenVideoSrc(currentVideo.src)}
                      className="p-2.5 rounded-xl bg-white/20 hover:bg-[#1ab8ec] text-white transition-colors"
                    >
                      <Maximize2 className="w-5 h-5" />
                    </button>
                  </div>
                </div>
              </div>
            </div>

            {/* Video Selector & Technical Specifications */}
            <div className="lg:col-span-4 space-y-6">
              <div className="space-y-3">
                <span className="text-xs font-mono font-bold uppercase tracking-widest text-[#1ab8ec]">
                  Select Showcase Instrument
                </span>
                
                <div className="space-y-3">
                  {showcaseVideos.map((vid) => (
                    <button
                      key={vid.id}
                      onClick={() => setActiveVideoId(vid.id)}
                      className={`w-full text-left p-4 rounded-2xl border-2 transition-all flex items-center justify-between ${
                        activeVideoId === vid.id
                          ? 'bg-white text-[#195aa7] border-[#eb5d0b] shadow-xl font-bold scale-[1.02]'
                          : 'bg-white/10 text-white/85 border-white/15 hover:bg-white/15'
                      }`}
                    >
                      <div>
                        <div className="flex items-center gap-2.5">
                          <span className={`text-xs font-mono font-black ${activeVideoId === vid.id ? 'text-[#eb5d0b]' : 'text-[#1ab8ec]'}`}>
                            {vid.code}
                          </span>
                          <span className="text-sm font-bold line-clamp-1">{vid.title}</span>
                        </div>
                        <p className={`text-xs line-clamp-1 mt-1 ${activeVideoId === vid.id ? 'text-gray-600' : 'text-white/60'}`}>
                          {vid.subtitle}
                        </p>
                      </div>
                      <RotateCw className={`w-5 h-5 shrink-0 ml-2 ${activeVideoId === vid.id ? 'text-[#eb5d0b] animate-spin-slow' : 'text-white/40'}`} />
                    </button>
                  ))}
                </div>
              </div>

              {/* Active Instrument Metallurgy Specs Card */}
              <div className="p-5 rounded-2xl bg-white/10 border border-[#1ab8ec]/30 space-y-3">
                <div className="flex items-center justify-between text-xs font-mono">
                  <span className="text-[#1ab8ec] font-bold">Metallurgy & Quality:</span>
                  <span className="text-white font-bold">ASTM F899 Compliant</span>
                </div>
                <ul className="space-y-1.5 text-xs text-white/80">
                  {currentVideo.specs.map((s, i) => (
                    <li key={i} className="flex items-center gap-2.5">
                      <Check className="w-4 h-4 text-[#eb5d0b] shrink-0" />
                      <span>{s}</span>
                    </li>
                  ))}
                </ul>
              </div>

            </div>

          </div>

        </div>
      </section>

      {/* 4. CLINICAL SPECIALTIES MATRIX */}
      <section className="max-w-[1480px] mx-auto px-6 sm:px-10 lg:px-14 xl:px-16">
        <div className="text-center max-w-3xl mx-auto mb-12 space-y-3">
          <span className="text-xs font-mono font-black uppercase tracking-widest text-[#eb5d0b]">
            Shop By Department
          </span>
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-black text-[#195aa7] tracking-tight">
            Browse Surgical Specialty Aisles
          </h2>
          <p className="text-sm sm:text-base text-gray-600 leading-relaxed">
            Direct online ordering for general surgery, ophthalmic microsurgery, cardiovascular, orthopedic, and dental procedures.
          </p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8">
          {CATEGORIES_TREE.map((cat) => (
            <div
              key={cat.slug}
              onClick={() => onNavigate('products', undefined, cat.slug)}
              className="bg-white rounded-3xl p-7 border border-slate-200/90 hover:border-[#eb5d0b] shadow-sm hover:shadow-xl transition-all cursor-pointer group flex flex-col justify-between"
            >
              <div>
                <div className="w-14 h-14 rounded-2xl bg-[#195aa7]/10 group-hover:bg-[#eb5d0b] flex items-center justify-center text-[#195aa7] group-hover:text-white transition-colors mb-5">
                  <Box className="w-7 h-7" />
                </div>
                
                <h3 className="text-lg font-black text-[#195aa7] group-hover:text-[#eb5d0b] transition-colors mb-2">
                  {cat.name}
                </h3>
                
                <p className="text-xs sm:text-sm text-gray-500 line-clamp-2 mb-4 leading-relaxed">
                  {cat.description}
                </p>
              </div>

              <div>
                <div className="flex flex-wrap gap-1.5 mb-4">
                  {cat.subCategories.slice(0, 3).map((sub) => (
                    <span key={sub.slug} className="text-[11px] px-2.5 py-1 rounded-md bg-[#f4f8fc] text-[#195aa7] font-medium">
                      {sub.name}
                    </span>
                  ))}
                </div>

                <div className="pt-4 border-t border-gray-100 flex items-center justify-between text-xs sm:text-sm font-bold text-[#195aa7] group-hover:text-[#eb5d0b]">
                  <span>Shop Category</span>
                  <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                </div>
              </div>
            </div>
          ))}

          {/* Special Titanium & Micro-Surgery Card */}
          <div
            onClick={() => onNavigate('showcase-3d')}
            className="bg-gradient-to-br from-[#195aa7] to-[#12437e] text-white rounded-3xl p-7 border-2 border-[#1ab8ec] shadow-xl hover:shadow-2xl transition-all cursor-pointer group flex flex-col justify-between"
          >
            <div>
              <div className="w-14 h-14 rounded-2xl bg-[#eb5d0b] flex items-center justify-center text-white mb-5">
                <RotateCw className="w-7 h-7 animate-spin-slow" />
              </div>
              
              <div className="flex items-center gap-2 mb-2">
                <span className="text-[10px] font-mono font-black uppercase px-2.5 py-0.5 rounded bg-[#1ab8ec] text-[#195aa7]">
                  Duckworth & Kent Series
                </span>
              </div>
              
              <h3 className="text-xl font-black text-white group-hover:text-[#1ab8ec] transition-colors mb-2">
                Titanium & Micro-Inspection
              </h3>
              
              <p className="text-xs sm:text-sm text-white/80 line-clamp-2 mb-4 leading-relaxed">
                Precision 360° interactive turntable videos of ophthalmic & micro forceps, scissors, and needle holders.
              </p>
            </div>

            <div className="pt-4 border-t border-white/20 flex items-center justify-between text-xs sm:text-sm font-bold text-[#1ab8ec] group-hover:text-white">
              <span>Launch 360° Lab</span>
              <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
            </div>
          </div>
        </div>
      </section>

      {/* 5. PURE E-COMMERCE: WHY BUY DIRECT FROM US (BENEFITS & GUARANTEES) */}
      <section className="max-w-[1480px] mx-auto px-6 sm:px-10 lg:px-14 xl:px-16">
        <div className="bg-[#f4f8fc] rounded-3xl p-8 sm:p-12 lg:p-16 border-2 border-[#1ab8ec]/40 space-y-12">
          
          <div className="text-center max-w-3xl mx-auto space-y-3">
            <span className="text-xs font-mono font-black uppercase tracking-widest text-[#eb5d0b]">
              Direct-To-Clinic E-Commerce
            </span>
            <h2 className="text-3xl sm:text-4xl lg:text-5xl font-black text-[#195aa7] tracking-tight">
              Why Surgeons & Clinics Order Direct
            </h2>
            <p className="text-sm sm:text-base text-gray-600 leading-relaxed">
              Skip traditional surgical supply middlemen. Get hand-forged German stainless steel instruments delivered directly to your operating room with ironclad guarantees.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            <div className="bg-white p-7 rounded-2xl border border-gray-200 space-y-3 shadow-sm hover:border-[#1ab8ec] transition-colors">
              <div className="w-12 h-12 rounded-xl bg-[#eb5d0b]/10 text-[#eb5d0b] flex items-center justify-center">
                <Tag className="w-6 h-6" />
              </div>
              <h3 className="text-lg font-bold text-[#195aa7]">Factory-Direct Savings</h3>
              <p className="text-xs sm:text-sm text-gray-600 leading-relaxed">
                Save up to 45% compared to conventional hospital distributors. Transparent online pricing on every SKU.
              </p>
            </div>

            <div className="bg-white p-7 rounded-2xl border border-gray-200 space-y-3 shadow-sm hover:border-[#1ab8ec] transition-colors">
              <div className="w-12 h-12 rounded-xl bg-[#1ab8ec]/20 text-[#195aa7] flex items-center justify-center">
                <Truck className="w-6 h-6" />
              </div>
              <h3 className="text-lg font-bold text-[#195aa7]">24-48h Global Dispatch</h3>
              <p className="text-xs sm:text-sm text-gray-600 leading-relaxed">
                Every in-stock order is packed in sterile shockproof foam and shipped via DHL/FedEx with real-time tracking.
              </p>
            </div>

            <div className="bg-white p-7 rounded-2xl border border-gray-200 space-y-3 shadow-sm hover:border-[#1ab8ec] transition-colors">
              <div className="w-12 h-12 rounded-xl bg-[#eb5d0b]/10 text-[#eb5d0b] flex items-center justify-center">
                <ShieldCheck className="w-6 h-6" />
              </div>
              <h3 className="text-lg font-bold text-[#195aa7]">30-Day Risk-Free Trial</h3>
              <p className="text-xs sm:text-sm text-gray-600 leading-relaxed">
                Test the balance and grip in your clinic. If you're not 100% satisfied, return it for a complete refund.
              </p>
            </div>

            <div className="bg-white p-7 rounded-2xl border border-gray-200 space-y-3 shadow-sm hover:border-[#1ab8ec] transition-colors">
              <div className="w-12 h-12 rounded-xl bg-[#1ab8ec]/20 text-[#195aa7] flex items-center justify-center">
                <Award className="w-6 h-6" />
              </div>
              <h3 className="text-lg font-bold text-[#195aa7]">100% Autoclavable (134°C)</h3>
              <p className="text-xs sm:text-sm text-gray-600 leading-relaxed">
                Conforms to DIN EN ISO 13485:2016 and ASTM F899 standards with zero corrosion across 200+ autoclave cycles.
              </p>
            </div>
          </div>

        </div>
      </section>

      {/* 6. VERIFIED CLINIC REVIEWS & SURGEON TESTIMONIALS */}
      <section className="max-w-[1480px] mx-auto px-6 sm:px-10 lg:px-14 xl:px-16">
        <div className="text-center max-w-3xl mx-auto mb-12 space-y-3">
          <span className="text-xs font-mono font-black uppercase tracking-widest text-[#eb5d0b]">
            Verified Online Orders
          </span>
          <h2 className="text-3xl sm:text-4xl font-black text-[#195aa7] tracking-tight">
            Surgeon & Practitioner Reviews
          </h2>
          <p className="text-sm sm:text-base text-gray-600 leading-relaxed">
            Over 2,400 surgeons and specialized clinics order instruments online from our platform every month.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          <div className="bg-white p-8 rounded-3xl border border-gray-200 shadow-sm space-y-4">
            <div className="flex text-amber-500 text-sm gap-1">
              {'★★★★★'}
            </div>
            <p className="text-sm text-gray-700 italic leading-relaxed">
              "The tungsten carbide Metzenbaum scissors cut with incredible micro-precision. The gold-ring finish is immaculate and they arrived via DHL in London within 3 days."
            </p>
            <div className="pt-4 border-t border-gray-100 flex items-center justify-between">
              <div>
                <h4 className="font-bold text-[#195aa7] text-sm">Dr. Marcus Vance</h4>
                <p className="text-xs text-gray-500">St. Mary Clinic, London</p>
              </div>
              <span className="text-[11px] font-mono text-emerald-600 font-bold bg-emerald-50 px-2 py-0.5 rounded">Verified Buyer</span>
            </div>
          </div>

          <div className="bg-white p-8 rounded-3xl border border-gray-200 shadow-sm space-y-4">
            <div className="flex text-amber-500 text-sm gap-1">
              {'★★★★★'}
            </div>
            <p className="text-sm text-gray-700 italic leading-relaxed">
              "Their titanium ophthalmic forceps rival Duckworth & Kent in tip alignment and lightness, but at a fraction of the cost. The 360° inspection lab made ordering online risk-free."
            </p>
            <div className="pt-4 border-t border-gray-100 flex items-center justify-between">
              <div>
                <h4 className="font-bold text-[#195aa7] text-sm">Dr. Elena Rostova</h4>
                <p className="text-xs text-gray-500">Zurich Eye & Microsurgery</p>
              </div>
              <span className="text-[11px] font-mono text-emerald-600 font-bold bg-emerald-50 px-2 py-0.5 rounded">Verified Buyer</span>
            </div>
          </div>

          <div className="bg-white p-8 rounded-3xl border border-gray-200 shadow-sm space-y-4">
            <div className="flex text-amber-500 text-sm gap-1">
              {'★★★★★'}
            </div>
            <p className="text-sm text-gray-700 italic leading-relaxed">
              "We re-equipped our entire outpatient clinic with Kelly forceps and needle holders. Passing autoclave steam sterilization at 134°C with zero discoloration. Highly recommended!"
            </p>
            <div className="pt-4 border-t border-gray-100 flex items-center justify-between">
              <div>
                <h4 className="font-bold text-[#195aa7] text-sm">Dr. Tariq Mahmood</h4>
                <p className="text-xs text-gray-500">Allied Health Group, Dubai</p>
              </div>
              <span className="text-[11px] font-mono text-emerald-600 font-bold bg-emerald-50 px-2 py-0.5 rounded">Verified Buyer</span>
            </div>
          </div>
        </div>
      </section>

      {/* 7. E-COMMERCE PROMO BANNER: 15% OFF COUPON */}
      <section className="max-w-[1480px] mx-auto px-6 sm:px-10 lg:px-14 xl:px-16">
        <div className="bg-gradient-to-r from-[#195aa7] via-[#144988] to-[#195aa7] rounded-3xl p-8 sm:p-12 lg:p-14 border-4 border-[#eb5d0b] text-white shadow-2xl flex flex-wrap items-center justify-between gap-8">
          <div className="space-y-3 max-w-2xl">
            <span className="text-xs font-mono font-black uppercase tracking-widest text-[#1ab8ec]">
              Surgeon VIP Welcome Privilege
            </span>
            <h3 className="text-2xl sm:text-4xl font-black text-white tracking-tight">
              Get 15% Off Your First Online Order
            </h3>
            <p className="text-sm sm:text-base text-white/85 leading-relaxed">
              Apply coupon code at checkout for instant savings across all surgical forceps, scissors, titanium tools, and sterilization trays.
            </p>
          </div>

          <div className="flex flex-wrap items-center gap-4">
            <div className="flex items-center bg-black/40 border-2 border-dashed border-[#1ab8ec] rounded-2xl px-5 py-3 font-mono">
              <span className="text-lg font-black text-white tracking-widest mr-3">SURGEON15</span>
              <button
                onClick={handleCopyCoupon}
                className="text-xs px-3 py-1 rounded-lg bg-[#1ab8ec] hover:bg-white text-[#195aa7] font-bold uppercase transition-all flex items-center gap-1"
              >
                {copiedPromo ? <Check className="w-3.5 h-3.5" /> : <Copy className="w-3.5 h-3.5" />}
                <span>{copiedPromo ? 'Copied!' : 'Copy Code'}</span>
              </button>
            </div>

            <button
              onClick={() => onNavigate('products')}
              className="px-8 py-4 rounded-2xl bg-[#eb5d0b] hover:bg-[#d65106] text-white font-mono font-bold text-xs sm:text-sm uppercase tracking-wider transition-all shadow-xl shadow-[#eb5d0b]/30 flex items-center gap-2.5"
            >
              <ShoppingBag className="w-5 h-5" />
              <span>Shop With 15% Off</span>
            </button>
          </div>
        </div>
      </section>

      {/* Lightbox Modal for Full Image Zoom */}
      {lightboxImage && (
        <div className="fixed inset-0 z-50 bg-black/90 flex items-center justify-center p-4">
          <button
            onClick={() => setLightboxImage(null)}
            className="absolute top-6 right-6 p-3 rounded-full bg-white/10 hover:bg-[#eb5d0b] text-white transition-colors"
          >
            <X className="w-6 h-6" />
          </button>
          <img
            src={lightboxImage}
            alt="Enlarged Instrument View"
            className="max-w-full max-h-[90vh] object-contain rounded-2xl shadow-2xl"
          />
        </div>
      )}

      {/* Fullscreen Video Modal */}
      {fullscreenVideoSrc && (
        <div className="fixed inset-0 z-50 bg-black/95 flex items-center justify-center p-4">
          <button
            onClick={() => setFullscreenVideoSrc(null)}
            className="absolute top-6 right-6 p-3 rounded-full bg-white/10 hover:bg-[#eb5d0b] text-white transition-colors"
          >
            <X className="w-6 h-6" />
          </button>
          <video
            src={fullscreenVideoSrc}
            controls
            autoPlay
            loop
            className="max-w-full max-h-[85vh] rounded-2xl shadow-2xl"
          />
        </div>
      )}

    </div>
  );
};
