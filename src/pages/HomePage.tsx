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
import { GerMedHeroSlider } from '../components/GerMedHeroSlider';
import { ECOMMERCE_CATALOG_GROUPS } from '../data/ecommerceCatalogData';
import { EcommerceCategorySection } from '../components/EcommerceCategorySection';

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
  const [addedToast, setAddedToast] = useState<string | null>(null);
  const [lightboxImage, setLightboxImage] = useState<string | null>(null);
  const [copiedPromo, setCopiedPromo] = useState(false);

  const handleCopyCoupon = () => {
    navigator.clipboard.writeText('SURGEON15');
    setCopiedPromo(true);
    setTimeout(() => setCopiedPromo(false), 2500);
  };

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


  const handleCardAddToCart = (product: Product, finish = 'Satin Matte', quantity = 1) => {
    if (onAddToCart) {
      onAddToCart(product, finish || product.availableFinishes?.[0] || 'Satin Matte', quantity || 1);
      setAddedToast(`Added ${product.name} to cart!`);
      setTimeout(() => setAddedToast(null), 3000);
      if (onOpenCart) {
        onOpenCart();
      }
    }
  };

  const handleProductAddToCart = (product: Product, e?: React.MouseEvent) => {
    e?.stopPropagation();
    handleCardAddToCart(product);
  };

  const handleQuickBuy = (product: Product, e?: React.MouseEvent) => {
    e?.stopPropagation();
    if (onAddToCart) {
      onAddToCart(product, product.availableFinishes[0] || 'Satin Matte', 1);
    }
    onNavigate('cart-checkout');
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
    <div className="pb-28 bg-[#f8fbfe]">
      
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

      {/* 1. GERMEDUSA-STYLE FULL-SPECTRUM SURGICAL BANNER SLIDER */}
      <GerMedHeroSlider
        heroSlides={heroSlides}
        onNavigate={onNavigate}
        onAddToCart={onAddToCart}
        onOpenCart={onOpenCart}
        onOpenQuickView={onOpenQuickView}
      />

      {/* Subsequent Homepage Sections */}
      <div className="space-y-24 sm:space-y-32 pt-16 sm:pt-20">

      {/* 2. COMPREHENSIVE E-COMMERCE PRODUCTS SHOWCASE (SURGICALMART-STYLE) */}
      <section className="max-w-[1480px] mx-auto px-4 sm:px-8 lg:px-12 xl:px-14">
        
        {/* E-Commerce Top Header & Quick Category Switcher */}
        <div className="bg-white border-2 border-slate-200 rounded-xl p-5 sm:p-6 shadow-xs mb-8 flex flex-col md:flex-row md:items-center justify-between gap-4">
          <div className="flex items-center gap-3.5">
            <div className="w-12 h-12 rounded-xl bg-[#eb5d0b]/10 text-[#eb5d0b] flex items-center justify-center shrink-0">
              <ShoppingBag className="w-6 h-6" />
            </div>
            <div>
              <div className="flex items-center gap-2.5 flex-wrap">
                <h2 className="font-black text-slate-900 text-base sm:text-lg md:text-xl uppercase tracking-wide">
                  MEDTREND® Online Surgical Store
                </h2>
                <span className="px-2.5 py-0.5 rounded-full bg-emerald-100 text-emerald-800 text-xs font-mono font-bold">
                  Up To 45% Direct Savings
                </span>
                <span className="hidden sm:inline-block px-2.5 py-0.5 rounded-full bg-[#195aa7]/10 text-[#195aa7] text-xs font-mono font-bold">
                  Fast Dispatch: USA, EU & GCC
                </span>
              </div>
              <p className="text-xs sm:text-sm text-slate-600 mt-1">
                <strong className="text-[#195aa7] font-semibold">Medtrend Pvt. Ltd.</strong> • Precision You Can Trust. Professionally crafted in Sialkot, Pakistan from German-forged stainless steel. Instant online ordering.
              </p>
            </div>
          </div>

          <div className="flex flex-wrap items-center gap-2">
            <button
              onClick={() => setSelectedProductFilter('all')}
              className={`px-3.5 py-2 rounded-lg text-xs sm:text-sm font-mono font-bold uppercase transition-all ${
                selectedProductFilter === 'all'
                  ? 'bg-[#195aa7] text-white shadow-xs'
                  : 'bg-slate-100 text-slate-700 hover:bg-slate-200'
              }`}
            >
              All Categories
            </button>
            {ECOMMERCE_CATALOG_GROUPS.map((g) => (
              <button
                key={g.id}
                onClick={() => setSelectedProductFilter(g.id)}
                className={`px-3.5 py-2 rounded-lg text-xs sm:text-sm font-mono font-bold uppercase transition-all ${
                  selectedProductFilter === g.id
                    ? 'bg-[#195aa7] text-white shadow-xs'
                    : 'bg-slate-100 text-slate-700 hover:bg-slate-200'
                }`}
              >
                {g.title.split(' ')[0]} ({g.products.length})
              </button>
            ))}
          </div>
        </div>

        {/* Category Sections (DENTAL, SURGICAL, ORTHOPEDIC) */}
        <div className="space-y-2 sm:space-y-4">
          {ECOMMERCE_CATALOG_GROUPS
            .filter((group) => selectedProductFilter === 'all' || selectedProductFilter === group.id)
            .map((group) => (
              <EcommerceCategorySection
                key={group.id}
                group={group}
                onAddToCart={handleCardAddToCart}
                onOpenQuickView={onOpenQuickView}
                onNavigate={onNavigate}
              />
            ))}
        </div>

        {/* Bottom Explorer Action */}
        <div className="mt-8 pt-6 text-center border-t border-slate-200">
          <button
            onClick={() => onNavigate('products')}
            className="inline-flex items-center gap-2.5 px-8 sm:px-10 py-4 rounded-xl bg-[#195aa7] hover:bg-[#134988] text-white font-mono font-bold text-sm sm:text-base uppercase tracking-wider transition-all shadow-md group"
          >
            <span>Explore Full Catalog of {PRODUCTS.length}+ Surgical Instruments</span>
            <ArrowRight className="w-5 h-5 group-hover:translate-x-1.5 transition-transform text-[#eb5d0b]" />
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

      {/* 4. PURE E-COMMERCE: WHY BUY DIRECT FROM US (BENEFITS & GUARANTEES) */}
      <section className="max-w-[1480px] mx-auto px-6 sm:px-10 lg:px-14 xl:px-16">
        <div className="bg-[#f4f8fc] rounded-3xl p-8 sm:p-12 lg:p-16 border-2 border-[#1ab8ec]/40 space-y-12">
          
          <div className="text-center max-w-3xl mx-auto space-y-3">
            <span className="text-xs font-mono font-black uppercase tracking-widest text-[#eb5d0b]">
              Direct E-Commerce Retail
            </span>
            <h2 className="text-3xl sm:text-4xl lg:text-5xl font-black text-[#195aa7] tracking-tight">
              Why Surgeons & Clinics Order Direct from MEDTREND®
            </h2>
            <p className="text-sm sm:text-base text-gray-600 leading-relaxed">
              Skip traditional medical supply markups. Medtrend Pvt. Ltd. delivers professionally crafted surgical instruments from Sialkot, Pakistan directly to operating rooms, clinics, and practitioners in the USA, EU, GCC, and worldwide.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            <div className="bg-white p-7 rounded-2xl border border-gray-200 space-y-3 shadow-sm hover:border-[#1ab8ec] transition-colors">
              <div className="w-12 h-12 rounded-xl bg-[#eb5d0b]/10 text-[#eb5d0b] flex items-center justify-center">
                <Tag className="w-6 h-6" />
              </div>
              <h3 className="text-lg font-bold text-[#195aa7]">Transparent Online Pricing</h3>
              <p className="text-xs sm:text-sm text-gray-600 leading-relaxed">
                Save up to 45% compared to conventional hospital distributors. Instant checkout with zero hidden broker fees.
              </p>
            </div>

            <div className="bg-white p-7 rounded-2xl border border-gray-200 space-y-3 shadow-sm hover:border-[#1ab8ec] transition-colors">
              <div className="w-12 h-12 rounded-xl bg-[#1ab8ec]/20 text-[#195aa7] flex items-center justify-center">
                <Truck className="w-6 h-6" />
              </div>
              <h3 className="text-lg font-bold text-[#195aa7]">USA, EU & GCC Express</h3>
              <p className="text-xs sm:text-sm text-gray-600 leading-relaxed">
                24–48 hour dispatch via tracked DHL/FedEx air courier. Secure sterile packaging guaranteed to arrive undamaged.
              </p>
            </div>

            <div className="bg-white p-7 rounded-2xl border border-gray-200 space-y-3 shadow-sm hover:border-[#1ab8ec] transition-colors">
              <div className="w-12 h-12 rounded-xl bg-[#eb5d0b]/10 text-[#eb5d0b] flex items-center justify-center">
                <ShieldCheck className="w-6 h-6" />
              </div>
              <h3 className="text-lg font-bold text-[#195aa7]">30-Day Risk-Free Trial</h3>
              <p className="text-xs sm:text-sm text-gray-600 leading-relaxed">
                Test the balance, tactile feedback, and grip in your practice. If you are not 100% satisfied, return for a full refund.
              </p>
            </div>

            <div className="bg-white p-7 rounded-2xl border border-gray-200 space-y-3 shadow-sm hover:border-[#1ab8ec] transition-colors">
              <div className="w-12 h-12 rounded-xl bg-[#1ab8ec]/20 text-[#195aa7] flex items-center justify-center">
                <Award className="w-6 h-6" />
              </div>
              <h3 className="text-lg font-bold text-[#195aa7]">Precision You Can Trust</h3>
              <p className="text-xs sm:text-sm text-gray-600 leading-relaxed">
                100% steam autoclavable (134°C). Manufactured to DIN EN ISO 13485:2016 and ASTM F899 standards with a 5-year warranty.
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
    </div>
  );
};
