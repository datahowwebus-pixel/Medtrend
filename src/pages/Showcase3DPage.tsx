import React, { useState } from 'react';
import { 
  Sparkles, RotateCw, Play, Pause, Layers, Zap, 
  Download, Eye, ShieldCheck, Box, ChevronRight, Sliders, CheckCircle2, Film,
  Upload, Camera, FileCode, FolderTree, Image as ImageIcon, HelpCircle, Check, ArrowRight
} from 'lucide-react';
import { Interactive3DViewer } from '../components/Interactive3DViewer';
import { Product } from '../types';
import { PRODUCTS } from '../data/productsData';

interface Showcase3DPageProps {
  initialProduct?: Product | null;
  onOpenRFQ: (product?: Product) => void;
  onOpenDataSheet: (product: Product) => void;
  onNavigateToDetail: (productId: string) => void;
}

export const Showcase3DPage: React.FC<Showcase3DPageProps> = ({
  initialProduct,
  onOpenRFQ,
  onOpenDataSheet,
  onNavigateToDetail
}) => {
  const [selectedProduct, setSelectedProduct] = useState<Product>(
    initialProduct || PRODUCTS.find(p => p.has3DModel) || PRODUCTS[0]
  );
  const [activeGuideTab, setActiveGuideTab] = useState<'photos' | 'cad' | 'loops' | 'folders'>('photos');

  const modelOptions = PRODUCTS.filter(p => p.has3DModel);

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-10 pb-24 text-[#0B2838] bg-white">
      {/* 1. HERO HEADER */}
      <div className="bg-gradient-to-br from-[#01579B] via-[#0288D1] to-[#29B6F6] text-white rounded-3xl p-8 lg:p-10 border border-[#81D4FA] shadow-xl relative overflow-hidden">
        {/* Subtle decorative grid */}
        <div className="absolute inset-0 bg-[radial-gradient(#ffffff_1px,transparent_1px)] [background-size:28px_28px] opacity-20 pointer-events-none" />

        <div className="max-w-3xl space-y-3 relative z-10">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full text-xs font-mono font-semibold bg-white/15 text-white border border-white/30 shadow-xs backdrop-blur-xs">
            <Sparkles className="w-3.5 h-3.5 text-[#B3E5FC]" />
            <span>Interactive 3D Turntables & High-Precision CAD Lab</span>
          </div>

          <h1 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold tracking-tight leading-tight">
            Precision 3D Inspection & CAD Laboratory
          </h1>

          <p className="text-xs sm:text-sm text-[#E1F5FE] leading-relaxed">
            Experience our surgical instruments with real-time 360° inspection, realistic German Satin and Tungsten Carbide Gold finishes, x-ray exploded assemblies, and OEM fiber-laser etching previews.
          </p>
        </div>
      </div>

      {/* 2. REAL 3D ASSET & IMAGE SPECIFICATION GUIDE */}
      <div className="rounded-3xl bg-white border border-[#B3E5FC] p-6 sm:p-8 shadow-sm space-y-6">
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 border-b border-[#B3E5FC] pb-5">
          <div className="space-y-1">
            <div className="flex items-center gap-2 text-[#0288D1] text-xs font-bold uppercase tracking-[0.15em] font-mono">
              <Camera className="w-4 h-4 text-[#0288D1]" />
              <span>Real 3D Image & Asset Specification Guide</span>
            </div>
            <h2 className="text-xl sm:text-2xl font-bold text-[#0B2838]">
              How to Prepare & Provide Real 3D Renders and Photography
            </h2>
            <p className="text-xs sm:text-sm text-[#355C75]">
              Follow these technical parameters so we can plug in your real 3D assets, multi-angle clinical photography, or 360° turntable frames seamlessly into the website.
            </p>
          </div>

          {/* Guide Tab Switcher */}
          <div className="flex flex-wrap gap-1.5 p-1 bg-[#E1F5FE] rounded-2xl font-mono text-xs border border-[#81D4FA]">
            <button
              onClick={() => setActiveGuideTab('photos')}
              className={`px-3 py-1.5 rounded-xl font-bold transition-all flex items-center gap-1.5 ${
                activeGuideTab === 'photos'
                  ? 'bg-[#0288D1] text-white shadow-xs'
                  : 'text-[#355C75] hover:text-[#0B2838]'
              }`}
            >
              <Camera className="w-3.5 h-3.5" /> 1. Macro Photos
            </button>
            <button
              onClick={() => setActiveGuideTab('cad')}
              className={`px-3 py-1.5 rounded-xl font-bold transition-all flex items-center gap-1.5 ${
                activeGuideTab === 'cad'
                  ? 'bg-[#0288D1] text-white shadow-xs'
                  : 'text-[#355C75] hover:text-[#0B2838]'
              }`}
            >
              <FileCode className="w-3.5 h-3.5" /> 2. 3D CAD (.GLB)
            </button>
            <button
              onClick={() => setActiveGuideTab('loops')}
              className={`px-3 py-1.5 rounded-xl font-bold transition-all flex items-center gap-1.5 ${
                activeGuideTab === 'loops'
                  ? 'bg-[#0288D1] text-white shadow-xs'
                  : 'text-[#355C75] hover:text-[#0B2838]'
              }`}
            >
              <Film className="w-3.5 h-3.5" /> 3. Video Loops
            </button>
            <button
              onClick={() => setActiveGuideTab('folders')}
              className={`px-3 py-1.5 rounded-xl font-bold transition-all flex items-center gap-1.5 ${
                activeGuideTab === 'folders'
                  ? 'bg-[#0288D1] text-white shadow-xs'
                  : 'text-[#355C75] hover:text-[#0B2838]'
              }`}
            >
              <FolderTree className="w-3.5 h-3.5" /> 4. Folder Paths
            </button>
          </div>
        </div>

        {/* Tab 1: Studio Photo Angles */}
        {activeGuideTab === 'photos' && (
          <div className="grid grid-cols-1 md:grid-cols-3 gap-5 text-xs text-[#355C75]">
            <div className="p-5 rounded-2xl bg-[#F4FAFD] border border-[#B3E5FC] space-y-3">
              <h4 className="font-bold text-[#0B2838] flex items-center gap-2 font-mono text-sm">
                <span className="w-6 h-6 rounded-full bg-[#0288D1] text-white flex items-center justify-center font-black text-xs">A</span>
                8-Angle 360° Turntable Sequence
              </h4>
              <p className="leading-relaxed">
                Provide rendered images at 8 key angles: <strong className="text-[#0B2838]">0° (Front), 45° (Isometric Right), 90° (Profile), 135°, 180° (Back), 225°, 270°, 315°</strong>.
              </p>
              <div className="font-mono text-[11px] bg-white p-2.5 rounded-xl border border-[#B3E5FC] text-[#0B2838]">
                Naming: <code>[SKU]-angle-01.png</code> to <code>[SKU]-angle-08.png</code>
              </div>
            </div>

            <div className="p-5 rounded-2xl bg-[#F4FAFD] border border-[#B3E5FC] space-y-3">
              <h4 className="font-bold text-[#0B2838] flex items-center gap-2 font-mono text-sm">
                <span className="w-6 h-6 rounded-full bg-[#0288D1] text-white flex items-center justify-center font-black text-xs">B</span>
                Format & Background Specs
              </h4>
              <ul className="space-y-1.5 list-disc list-inside">
                <li><strong className="text-[#0B2838]">Resolution:</strong> 2048 x 2048 px (Square 1:1)</li>
                <li><strong className="text-[#0B2838]">Format:</strong> PNG with Transparent Background (Alpha Channel) or WebP</li>
                <li><strong className="text-[#0B2838]">Lighting:</strong> Softbox studio diffusion, no harsh glare on surgical steel</li>
              </ul>
            </div>

            <div className="p-5 rounded-2xl bg-[#F4FAFD] border border-[#B3E5FC] space-y-3">
              <h4 className="font-bold text-[#0B2838] flex items-center gap-2 font-mono text-sm">
                <span className="w-6 h-6 rounded-full bg-[#0288D1] text-white flex items-center justify-center font-black text-xs">C</span>
                Macro Detail Zoom Shots
              </h4>
              <p className="leading-relaxed">
                Include 2 close-up shots per instrument:
              </p>
              <ul className="space-y-1 list-disc list-inside">
                <li><strong className="text-[#0B2838]">Jaw Serrations & TC Insert</strong></li>
                <li><strong className="text-[#0B2838]">Box-Lock Hinge & Ratchet Teeth</strong></li>
              </ul>
            </div>
          </div>
        )}

        {/* Tab 2: 3D CAD .GLB / .GLTF */}
        {activeGuideTab === 'cad' && (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-5 text-xs text-[#355C75]">
            <div className="p-5 rounded-2xl bg-[#F4FAFD] border border-[#B3E5FC] space-y-3">
              <h4 className="font-bold text-[#0B2838] font-mono text-sm">
                Target 3D File Specifications
              </h4>
              <ul className="space-y-2">
                <li className="flex items-start gap-2">
                  <Check className="w-4 h-4 text-[#0288D1] shrink-0 mt-0.5" />
                  <span><strong className="text-[#0B2838]">glTF 2.0 Binary (.glb):</strong> Self-contained with embedded textures and materials.</span>
                </li>
                <li className="flex items-start gap-2">
                  <Check className="w-4 h-4 text-[#0288D1] shrink-0 mt-0.5" />
                  <span><strong className="text-[#0B2838]">Polygon Budget:</strong> 15,000 to 50,000 triangles per instrument (optimally decimated for web 60 FPS).</span>
                </li>
                <li className="flex items-start gap-2">
                  <Check className="w-4 h-4 text-[#0288D1] shrink-0 mt-0.5" />
                  <span><strong className="text-[#0B2838]">PBR Material Channels:</strong> BaseColor (Albedo), Metallic-Roughness Map, Normal Map, Ambient Occlusion.</span>
                </li>
              </ul>
            </div>

            <div className="p-5 rounded-2xl bg-[#F4FAFD] border border-[#B3E5FC] space-y-3">
              <h4 className="font-bold text-[#0B2838] font-mono text-sm">
                How to Provide Files
              </h4>
              <p className="leading-relaxed">
                Save your <code>.glb</code> models under <code className="text-[#01579B] font-bold">public/images/3d-models/</code> with matching SKU names:
              </p>
              <div className="font-mono text-[11px] bg-white p-2.5 rounded-xl border border-[#B3E5FC] space-y-1 text-[#0B2838]">
                <div>public/images/3d-models/MT-HF-001.glb</div>
                <div>public/images/3d-models/MT-SC-004.glb</div>
                <div>public/images/3d-models/MT-NH-012.glb</div>
              </div>
            </div>
          </div>
        )}

        {/* Tab 3: Video Loops */}
        {activeGuideTab === 'loops' && (
          <div className="space-y-4">
            {/* Quick Answer Banner */}
            <div className="p-4 rounded-2xl bg-[#E1F5FE] border border-[#81D4FA] text-xs flex items-start gap-3 text-[#0B2838]">
              <Sparkles className="w-5 h-5 text-[#0288D1] shrink-0 mt-0.5" />
              <div className="space-y-1">
                <p className="font-bold text-[#0B2838] text-sm">
                  Why 2-3 Second Video Loops Are The Best & Most Realistic Solution:
                </p>
                <p className="leading-relaxed text-[#355C75]">
                  Single PNG/JPG photos are flat 2D and cannot turn into 3D automatically. However, <strong>providing a 2-3 second continuous rotating video is 100x better, easier, and looks 100% photorealistic!</strong> You capture the true German stainless steel finish, satin/mirror shine, and tungsten carbide gold coating exactly as they look in real life.
                </p>
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-5 text-xs text-[#355C75]">
              <div className="p-5 rounded-2xl bg-[#F4FAFD] border border-[#B3E5FC] space-y-3">
                <h4 className="font-bold text-[#0B2838] font-mono text-sm flex items-center gap-2">
                  <Film className="w-4 h-4 text-[#0288D1]" /> 2-3 Second Video Loop
                </h4>
                <p className="leading-relaxed">
                  Place the instrument on a <strong>motorized rotating turntable / rotating stand</strong> with a clean white backdrop. Record 1 full 360° rotation (2 to 3 seconds).
                </p>
                <div className="font-mono text-[11px] text-[#01579B] bg-white p-2.5 rounded-xl border border-[#81D4FA]">
                  ✓ 100% Real Stainless Steel Reflections<br />
                  ✓ Fast loading on all mobile phones<br />
                  ✓ Can be scrubbed with mouse drag
                </div>
              </div>

              <div className="p-5 rounded-2xl bg-[#F4FAFD] border border-[#B3E5FC] space-y-3">
                <h4 className="font-bold text-[#0B2838] font-mono text-sm">
                  How to Record in Sialkot Studio
                </h4>
                <ul className="space-y-2">
                  <li className="flex items-start gap-2">
                    <Check className="w-4 h-4 text-[#0288D1] shrink-0 mt-0.5" />
                    <span><strong>Turntable Stand:</strong> Motorized revolving display base (available for ~$15-20).</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <Check className="w-4 h-4 text-[#0288D1] shrink-0 mt-0.5" />
                    <span><strong>Lighting:</strong> Soft dual diffused LED lights (prevents harsh glare on steel).</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <Check className="w-4 h-4 text-[#0288D1] shrink-0 mt-0.5" />
                    <span><strong>Phone Camera:</strong> 4K or 1080p @ 60 FPS on a tripod.</span>
                  </li>
                </ul>
              </div>

              <div className="p-5 rounded-2xl bg-[#F4FAFD] border border-[#B3E5FC] space-y-3">
                <h4 className="font-bold text-[#0B2838] font-mono text-sm">
                  File Format & Directory
                </h4>
                <ul className="space-y-1.5 list-disc list-inside">
                  <li><strong className="text-[#0B2838]">Format:</strong> MP4 (H.264) or WebM (VP9)</li>
                  <li><strong className="text-[#0B2838]">Framerate:</strong> 60 FPS (Ultra Smooth)</li>
                  <li><strong className="text-[#0B2838]">Save Path:</strong> <code>public/images/3d-models/[SKU]-loop.mp4</code></li>
                </ul>
                <div className="font-mono text-[11px] bg-white p-2 rounded-xl border border-[#B3E5FC] text-[#62879F]">
                  e.g. <code>public/images/3d-models/MT-HF-001-loop.mp4</code>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* Tab 4: Directory Map */}
        {activeGuideTab === 'folders' && (
          <div className="p-5 rounded-2xl bg-[#F4FAFD] border border-[#B3E5FC] space-y-4 text-xs font-mono">
            <h4 className="font-bold text-[#0B2838] text-sm">
              Folder & Directory Architecture Map
            </h4>
            <div className="p-4 bg-white rounded-2xl border border-[#B3E5FC] space-y-2 text-[#0B2838]">
              <div>📁 <strong>public/images/home/</strong> &nbsp;→ (Hero slide images: <code>home-1.jpg, home-2.jpg, home-3.jpg</code>)</div>
              <div>📁 <strong>public/images/products/Our Products/</strong> &nbsp;→ (Main categories & sub-categories product photos)</div>
              <div className="pl-4 text-[#62879F]">└── 📁 General Surgery/Forceps & Clamps/MT-HF-001.jpg</div>
              <div className="pl-4 text-[#62879F]">└── 📁 General Surgery/Surgical Scissors/MT-SC-004.jpg</div>
              <div>📁 <strong>public/images/3d-models/</strong> &nbsp;→ (3D .glb models, video loops, and turntable frames)</div>
              <div className="pl-4 text-[#62879F]">└── <code>MT-HF-001-loop.mp4</code>, <code>MT-HF-002-loop.mp4</code></div>
            </div>
          </div>
        )}
      </div>

      {/* 3. MAIN 3D STUDIO & LIVE TURNTABLE INSPECTION */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
        {/* Left 4 Cols: Instrument Switcher & Loop Presets */}
        <div className="lg:col-span-4 space-y-6">
          {/* Instrument Selector */}
          <div className="p-6 rounded-2xl bg-white border border-[#B3E5FC] space-y-3 font-mono shadow-sm">
            <h3 className="text-xs font-bold uppercase tracking-wider text-[#0B2838] flex items-center justify-between">
              <span>Select Instrument:</span>
              <span className="text-[11px] text-[#0288D1] font-bold">{modelOptions.length} CAD Meshes</span>
            </h3>

            <div className="space-y-2 max-h-96 overflow-y-auto pr-1">
              {modelOptions.map((prod) => (
                <button
                  key={prod.id}
                  onClick={() => setSelectedProduct(prod)}
                  className={`w-full p-3 rounded-xl border text-left transition-all flex items-center justify-between gap-3 ${
                    selectedProduct.id === prod.id
                      ? 'bg-[#E1F5FE] text-[#01579B] border-[#0288D1] font-bold shadow-xs'
                      : 'bg-white hover:bg-[#F4FAFD] text-[#0B2838] border-[#B3E5FC]'
                  }`}
                >
                  <div className="flex items-center gap-2.5">
                    <div className={`w-8 h-8 rounded-lg flex items-center justify-center font-mono font-bold text-xs shrink-0 ${
                      selectedProduct.id === prod.id ? 'bg-[#0288D1] text-white' : 'bg-[#E1F5FE] text-[#0288D1]'
                    }`}>
                      3D
                    </div>
                    <div>
                      <span className="font-mono text-[10px] text-[#0288D1] font-bold block">{prod.code}</span>
                      <span className="text-xs font-bold line-clamp-1 font-sans">{prod.name}</span>
                    </div>
                  </div>
                  <ChevronRight className="w-4 h-4 opacity-70 shrink-0 text-[#62879F]" />
                </button>
              ))}
            </div>
          </div>

          {/* Quick Specifications */}
          <div className="p-6 rounded-2xl bg-white border border-[#B3E5FC] space-y-4 font-mono shadow-sm">
            <h3 className="text-xs font-bold uppercase tracking-wider text-[#0B2838] flex items-center gap-1.5">
              <Film className="w-4 h-4 text-[#0288D1]" />
              <span>3D Orbit Specifications</span>
            </h3>

            <div className="space-y-2.5 text-xs text-[#355C75]">
              <div className="p-3 rounded-xl bg-[#F4FAFD] border border-[#B3E5FC] flex justify-between">
                <span>2s Fast Loop:</span>
                <span className="text-[#0288D1] font-bold">180°/s Quick Showcase</span>
              </div>
              <div className="p-3 rounded-xl bg-[#F4FAFD] border border-[#B3E5FC] flex justify-between">
                <span>10s Smooth Loop:</span>
                <span className="text-[#0288D1] font-bold">36°/s 4K Medical Orbit</span>
              </div>
              <div className="p-3 rounded-xl bg-[#F4FAFD] border border-[#B3E5FC] flex justify-between">
                <span>Render Resolution:</span>
                <span className="text-[#0B2838] font-bold">Full HD / 60 FPS</span>
              </div>
            </div>

            <div className="pt-2 border-t border-[#B3E5FC] flex flex-col gap-2">
              <button
                onClick={() => onOpenRFQ(selectedProduct)}
                className="w-full py-3 bg-[#0288D1] hover:bg-[#0277BD] text-white font-mono rounded-xl text-xs font-bold transition-colors uppercase tracking-wider shadow-md shadow-[#0288D1]/25"
              >
                Request Quote for this Model
              </button>
              <button
                onClick={() => onOpenDataSheet(selectedProduct)}
                className="w-full py-2.5 border border-[#B3E5FC] hover:bg-[#F0F9FF] text-[#0B2838] rounded-xl text-xs font-mono transition-colors"
              >
                Download Technical Spec Sheet
              </button>
            </div>
          </div>
        </div>

        {/* Right 8 Cols: Main 3D Canvas Studio */}
        <div className="lg:col-span-8 space-y-6">
          <Interactive3DViewer
            modelType={selectedProduct.model3DType || 'forceps'}
            productName={selectedProduct.name}
            productCode={selectedProduct.code}
            initialFinish={selectedProduct.finish}
            heightClass="h-[520px] sm:h-[600px]"
            showCustomMarking={true}
            videoLoopUrl={selectedProduct.videoLoopUrl}
          />

          {/* Active Product Quick Info Bar */}
          <div className="p-6 rounded-2xl bg-white border border-[#B3E5FC] flex flex-col sm:flex-row items-center justify-between gap-4 font-mono shadow-sm">
            <div className="space-y-1 text-center sm:text-left">
              <div className="flex items-center justify-center sm:justify-start gap-2">
                <span className="text-xs font-bold text-[#01579B] bg-[#E1F5FE] px-2.5 py-0.5 rounded-lg border border-[#81D4FA]">
                  {selectedProduct.code}
                </span>
                <span className="text-xs text-[#355C75]">{selectedProduct.category}</span>
              </div>
              <h3 className="text-base font-bold text-[#0B2838] font-sans">{selectedProduct.name}</h3>
              <p className="text-xs text-[#355C75]">
                {selectedProduct.material} • {selectedProduct.hardness} • {selectedProduct.size}
              </p>
            </div>

            <div className="flex items-center gap-3 shrink-0">
              <div className="text-right">
                <div className="text-[10px] text-[#62879F] uppercase">Single Unit:</div>
                <div className="text-xl font-extrabold text-[#0288D1]">${selectedProduct.price.toFixed(2)}</div>
              </div>
              <button
                onClick={() => onNavigateToDetail(selectedProduct.id)}
                className="px-4 py-2.5 rounded-xl bg-[#0288D1] text-white hover:bg-[#0277BD] font-mono font-bold text-xs transition-colors shadow-sm"
              >
                Full Product Page
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
