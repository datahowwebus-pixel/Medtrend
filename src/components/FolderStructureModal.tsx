import React, { useState } from 'react';
import { Folder, FileCode, Image, ChevronRight, ChevronDown, Copy, Check, Info, Sparkles, Layers, RefreshCw } from 'lucide-react';
import { BRAND_CONFIG } from '../data/brandData';
import { CATEGORIES_TREE, PRODUCTS } from '../data/productsData';

interface FolderStructureModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export const FolderStructureModal: React.FC<FolderStructureModalProps> = ({ isOpen, onClose }) => {
  const [copiedPath, setCopiedPath] = useState<string | null>(null);
  const [activeTab, setActiveTab] = useState<'hierarchy' | 'guide' | 'rules'>('hierarchy');
  const [expandedFolders, setExpandedFolders] = useState<Record<string, boolean>>({
    'public': true,
    'images': true,
    'home': true,
    'about': true,
    'products': true,
    'our-products': true,
    'general-surgery': true,
    'dental-instruments': false,
    '3d-models': true
  });

  if (!isOpen) return null;

  const toggleFolder = (key: string) => {
    setExpandedFolders(prev => ({ ...prev, [key]: !prev[key] }));
  };

  const copyToClipboard = (text: string) => {
    navigator.clipboard.writeText(text);
    setCopiedPath(text);
    setTimeout(() => setCopiedPath(null), 2000);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-[#0B2838]/60 backdrop-blur-xs animate-in fade-in">
      <div className="relative w-full max-w-4xl max-h-[90vh] bg-white text-[#0B2838] rounded-2xl shadow-2xl border border-[#B3E5FC] overflow-hidden flex flex-col">
        {/* Header */}
        <div className="flex items-center justify-between p-6 bg-[#F8FCFE] border-b border-[#B3E5FC]">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-[#E1F5FE] border border-[#81D4FA] flex items-center justify-center text-[#0288D1]">
              <Folder className="w-5 h-5 text-[#0288D1]" />
            </div>
            <div>
              <div className="flex items-center gap-2">
                <h3 className="text-base font-bold text-[#0B2838]">Organized Asset & Folder System</h3>
                <span className="px-2.5 py-0.5 text-[10px] font-mono font-bold bg-[#E1F5FE] text-[#01579B] rounded-md border border-[#81D4FA] uppercase">
                  Folder-Driven Catalog
                </span>
              </div>
              <p className="text-xs text-[#355C75]">
                Automatic mapping of Home slides, About galleries, and "Our Products" main & sub-categories.
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

        {/* Navigation Tabs */}
        <div className="flex border-b border-[#B3E5FC] bg-[#F8FCFE] px-6">
          <button
            onClick={() => setActiveTab('hierarchy')}
            className={`py-3 px-4 text-xs font-mono border-b-2 transition-all flex items-center gap-2 font-bold ${
              activeTab === 'hierarchy'
                ? 'border-[#0288D1] text-[#0288D1] bg-white'
                : 'border-transparent text-[#355C75] hover:text-[#0B2838]'
            }`}
          >
            <Layers className="w-4 h-4" />
            Folder Architecture
          </button>
          <button
            onClick={() => setActiveTab('guide')}
            className={`py-3 px-4 text-xs font-mono border-b-2 transition-all flex items-center gap-2 font-bold ${
              activeTab === 'guide'
                ? 'border-[#0288D1] text-[#0288D1] bg-white'
                : 'border-transparent text-[#355C75] hover:text-[#0B2838]'
            }`}
          >
            <Info className="w-4 h-4" />
            Slide & Category Guide
          </button>
          <button
            onClick={() => setActiveTab('rules')}
            className={`py-3 px-4 text-xs font-mono border-b-2 transition-all flex items-center gap-2 font-bold ${
              activeTab === 'rules'
                ? 'border-[#0288D1] text-[#0288D1] bg-white'
                : 'border-transparent text-[#355C75] hover:text-[#0B2838]'
            }`}
          >
            <Sparkles className="w-4 h-4" />
            Compression & Media Rules
          </button>
        </div>

        {/* Modal Body */}
        <div className="p-6 overflow-y-auto flex-1 space-y-6 bg-white">
          {activeTab === 'hierarchy' && (
            <div className="space-y-4 font-mono text-xs">
              <div className="p-4 rounded-xl bg-[#E1F5FE] border border-[#81D4FA] text-xs flex items-start gap-3">
                <Info className="w-4 h-4 text-[#0288D1] shrink-0 mt-0.5" />
                <div>
                  <p className="font-bold text-[#01579B] mb-1">Strict Folder-to-Website Rule:</p>
                  <p className="text-[#355C75]">
                    Placing any folder inside <code className="px-1.5 py-0.5 rounded bg-white border border-[#B3E5FC] text-[#01579B] font-bold">Our Products/</code> creates a <strong>Main Category</strong>. Any subfolder inside that becomes a <strong>Sub-Category</strong>, and image files inside become individual product items!
                  </p>
                </div>
              </div>

              {/* Visual Interactive Tree */}
              <div className="bg-[#F8FCFE] rounded-xl p-5 text-[#0B2838] font-mono text-xs overflow-x-auto shadow-inner border border-[#B3E5FC]">
                {/* public/ */}
                <div className="space-y-2">
                  <div className="flex items-center gap-2 text-[#0288D1] font-bold">
                    <Folder className="w-4 h-4" />
                    <span>public/</span>
                  </div>

                  {/* images/ */}
                  <div className="pl-5 space-y-2 border-l border-[#B3E5FC]">
                    <div className="flex items-center gap-2 text-[#0B2838] font-bold">
                      <Folder className="w-4 h-4 text-[#0288D1]" />
                      <span>images/</span>
                      <span className="text-[10px] text-[#62879F] font-normal">// Master image repository</span>
                    </div>

                    {/* home/ */}
                    <div className="pl-5 space-y-1.5 border-l border-[#B3E5FC]">
                      <div 
                        onClick={() => toggleFolder('home')}
                        className="flex items-center gap-2 text-[#0B2838] cursor-pointer hover:text-[#0288D1]"
                      >
                        {expandedFolders['home'] ? <ChevronDown className="w-3.5 h-3.5 text-[#0288D1]" /> : <ChevronRight className="w-3.5 h-3.5 text-[#0288D1]" />}
                        <Folder className="w-4 h-4 text-[#62879F]" />
                        <span className="font-bold">home/</span>
                        <span className="text-[10px] text-[#62879F]">// Hero slider banners</span>
                      </div>
                      {expandedFolders['home'] && (
                        <div className="pl-6 space-y-1 text-[#355C75] text-[11px]">
                          <div className="flex items-center justify-between group">
                            <span className="flex items-center gap-2 text-[#0B2838]">
                              <Image className="w-3.5 h-3.5 text-[#0288D1]" /> home-1.jpg
                            </span>
                            <button 
                              onClick={() => copyToClipboard('public/images/home/home-1.jpg')}
                              className="opacity-0 group-hover:opacity-100 text-[10px] text-[#0288D1] hover:underline font-bold"
                            >
                              Copy path
                            </button>
                          </div>
                          <div className="flex items-center justify-between group">
                            <span className="flex items-center gap-2 text-[#0B2838]">
                              <Image className="w-3.5 h-3.5 text-[#0288D1]" /> home-2.jpg
                            </span>
                            <button 
                              onClick={() => copyToClipboard('public/images/home/home-2.jpg')}
                              className="opacity-0 group-hover:opacity-100 text-[10px] text-[#0288D1] hover:underline font-bold"
                            >
                              Copy path
                            </button>
                          </div>
                          <div className="flex items-center justify-between group">
                            <span className="flex items-center gap-2 text-[#0B2838]">
                              <Image className="w-3.5 h-3.5 text-[#0288D1]" /> home-3.jpg
                            </span>
                            <button 
                              onClick={() => copyToClipboard('public/images/home/home-3.jpg')}
                              className="opacity-0 group-hover:opacity-100 text-[10px] text-[#0288D1] hover:underline font-bold"
                            >
                              Copy path
                            </button>
                          </div>
                        </div>
                      )}

                      {/* about/ */}
                      <div 
                        onClick={() => toggleFolder('about')}
                        className="flex items-center gap-2 text-[#0B2838] cursor-pointer hover:text-[#0288D1] mt-2"
                      >
                        {expandedFolders['about'] ? <ChevronDown className="w-3.5 h-3.5 text-[#0288D1]" /> : <ChevronRight className="w-3.5 h-3.5 text-[#0288D1]" />}
                        <Folder className="w-4 h-4 text-[#62879F]" />
                        <span className="font-bold">about/</span>
                        <span className="text-[10px] text-[#62879F]">// Factory & metallurgy</span>
                      </div>
                      {expandedFolders['about'] && (
                        <div className="pl-6 space-y-1 text-[#355C75] text-[11px]">
                          <div className="flex items-center gap-2 text-[#0B2838]"><Image className="w-3.5 h-3.5 text-[#0288D1]" /> about-1.jpg <span className="text-[#62879F]">// Heritage Forge</span></div>
                          <div className="flex items-center gap-2 text-[#0B2838]"><Image className="w-3.5 h-3.5 text-[#0288D1]" /> about-2.jpg <span className="text-[#62879F]">// CNC Milling</span></div>
                          <div className="flex items-center gap-2 text-[#0B2838]"><Image className="w-3.5 h-3.5 text-[#0288D1]" /> about-3.jpg <span className="text-[#62879F]">// QA Inspection</span></div>
                        </div>
                      )}

                      {/* products / Our Products */}
                      <div 
                        onClick={() => toggleFolder('our-products')}
                        className="flex items-center gap-2 text-[#01579B] cursor-pointer hover:text-[#0288D1] mt-3"
                      >
                        {expandedFolders['our-products'] ? <ChevronDown className="w-3.5 h-3.5 text-[#0288D1]" /> : <ChevronRight className="w-3.5 h-3.5 text-[#0288D1]" />}
                        <Folder className="w-4 h-4 text-[#0288D1]" />
                        <span className="font-bold">products/Our Products/</span>
                        <span className="text-[9px] text-[#01579B] font-mono bg-[#E1F5FE] px-1.5 py-0.5 rounded border border-[#81D4FA]">[CATALOG ROOT]</span>
                      </div>

                      {expandedFolders['our-products'] && (
                        <div className="pl-6 space-y-3 mt-2 border-l border-[#B3E5FC]">
                          {CATEGORIES_TREE.map((cat) => (
                            <div key={cat.slug} className="space-y-1">
                              <div className="flex items-center gap-2 text-[#0B2838] font-semibold">
                                <Folder className="w-3.5 h-3.5 text-[#0288D1]" />
                                <span>{cat.name}/</span>
                                <span className="text-[9px] text-[#62879F] font-normal uppercase">Main Category</span>
                              </div>
                              <div className="pl-5 space-y-1 border-l border-[#B3E5FC]">
                                {cat.subCategories.map((sub) => (
                                  <div key={sub.slug} className="text-[#355C75] text-[11px] flex items-center justify-between group py-0.5">
                                    <span className="flex items-center gap-1.5 text-[#0B2838]">
                                      <Folder className="w-3 h-3 text-[#62879F]" /> {sub.name}/
                                      <span className="text-[9px] text-[#62879F]">({sub.itemCount} SKUs)</span>
                                    </span>
                                    <button
                                      onClick={() => copyToClipboard(`public/images/products/Our Products/${cat.name}/${sub.name}/`)}
                                      className="opacity-0 group-hover:opacity-100 text-[10px] text-[#0288D1] hover:underline font-bold"
                                    >
                                      Copy path
                                    </button>
                                  </div>
                                ))}
                              </div>
                            </div>
                          ))}
                        </div>
                      )}

                      {/* 3d-models / Loops */}
                      <div 
                        onClick={() => toggleFolder('3d-models')}
                        className="flex items-center gap-2 text-[#01579B] cursor-pointer hover:text-[#0288D1] mt-3"
                      >
                        {expandedFolders['3d-models'] ? <ChevronDown className="w-3.5 h-3.5 text-[#0288D1]" /> : <ChevronRight className="w-3.5 h-3.5 text-[#0288D1]" />}
                        <Folder className="w-4 h-4 text-[#0288D1]" />
                        <span className="font-bold">3d-models/</span>
                        <span className="text-[10px] text-[#62879F]">// 2-10 second 3D video loops & GLB CAD meshes</span>
                      </div>
                      {expandedFolders['3d-models'] && (
                        <div className="pl-6 space-y-1 text-[#355C75] text-[11px]">
                          <div className="flex items-center gap-2 text-[#0B2838]"><FileCode className="w-3.5 h-3.5 text-[#0288D1]" /> MT-HF-001-loop.mp4</div>
                          <div className="flex items-center gap-2 text-[#0B2838]"><FileCode className="w-3.5 h-3.5 text-[#0288D1]" /> MT-HF-002-loop.mp4</div>
                          <div className="flex items-center gap-2 text-[#0B2838]"><FileCode className="w-3.5 h-3.5 text-[#0288D1]" /> forceps-cad-assembly.glb</div>
                        </div>
                      )}
                    </div>
                  </div>
                </div>
              </div>

              {copiedPath && (
                <div className="p-3 bg-[#E1F5FE] text-[#01579B] border border-[#81D4FA] rounded-xl text-xs flex items-center gap-2">
                  <Check className="w-4 h-4 text-[#0288D1]" />
                  <span>Copied path: <strong>{copiedPath}</strong> to clipboard!</span>
                </div>
              )}
            </div>
          )}

          {activeTab === 'guide' && (
            <div className="space-y-6 font-mono text-xs">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="p-4 rounded-xl bg-[#F8FCFE] border border-[#B3E5FC] space-y-2">
                  <h4 className="text-xs font-bold text-[#0B2838] uppercase tracking-wider flex items-center gap-2">
                    <span className="w-5 h-5 rounded-full bg-[#E1F5FE] text-[#01579B] text-xs flex items-center justify-center font-bold">1</span>
                    Changing Hero Slides (home-1, home-2...)
                  </h4>
                  <p className="text-xs text-[#355C75] leading-relaxed">
                    To change home banners, save your graphics inside:
                    <br />
                    <code className="px-2 py-0.5 bg-white border border-[#B3E5FC] rounded-md text-[#01579B] font-mono text-[10px] block mt-1">
                      public/images/home/home-1.jpg
                    </code>
                    <code className="px-2 py-0.5 bg-white border border-[#B3E5FC] rounded-md text-[#01579B] font-mono text-[10px] block mt-1">
                      public/images/home/home-2.jpg
                    </code>
                  </p>
                  <p className="text-[10px] text-[#62879F]">
                    The slider on the homepage detects these filenames in sequence automatically.
                  </p>
                </div>

                <div className="p-4 rounded-xl bg-[#F8FCFE] border border-[#B3E5FC] space-y-2">
                  <h4 className="text-xs font-bold text-[#0B2838] uppercase tracking-wider flex items-center gap-2">
                    <span className="w-5 h-5 rounded-full bg-[#E1F5FE] text-[#01579B] text-xs flex items-center justify-center font-bold">2</span>
                    Adding Main & Sub-Categories
                  </h4>
                  <p className="text-xs text-[#355C75] leading-relaxed">
                    Simply create a folder under <strong>Our Products</strong>.
                    <br />
                    <code className="px-2 py-0.5 bg-white border border-[#B3E5FC] rounded-md text-[#01579B] font-mono text-[10px] block mt-1">
                      Our Products/Cardiovascular/Vascular Clamps/
                    </code>
                  </p>
                  <p className="text-[10px] text-[#62879F]">
                    The navigation menu and filters automatically recognize the directory name as the category title.
                  </p>
                </div>
              </div>

              <div className="p-4 rounded-xl bg-[#F8FCFE] border border-[#B3E5FC] space-y-3">
                <h4 className="text-xs font-bold uppercase tracking-wider text-[#01579B] flex items-center gap-2">
                  <RefreshCw className="w-4 h-4 text-[#0288D1]" />
                  Instant File Renaming Template
                </h4>
                <div className="grid grid-cols-1 sm:grid-cols-3 gap-2 text-xs font-mono">
                  <div className="p-2.5 rounded-lg bg-white border border-[#B3E5FC]">
                    <p className="text-[#62879F] text-[9px] uppercase">Product Code</p>
                    <p className="text-[#0288D1] font-bold">MT-[PREFIX]-[001].jpg</p>
                  </div>
                  <div className="p-2.5 rounded-lg bg-white border border-[#B3E5FC]">
                    <p className="text-[#62879F] text-[9px] uppercase">Multiple Angles</p>
                    <p className="text-[#0B2838] font-bold">MT-HF-001_angle1.jpg</p>
                  </div>
                  <div className="p-2.5 rounded-lg bg-white border border-[#B3E5FC]">
                    <p className="text-[#62879F] text-[9px] uppercase">Packaging View</p>
                    <p className="text-[#0B2838] font-bold">MT-HF-001_package.jpg</p>
                  </div>
                </div>
              </div>
            </div>
          )}

          {activeTab === 'rules' && (
            <div className="space-y-4 font-mono text-xs">
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <div className="p-5 rounded-2xl border border-[#B3E5FC] bg-[#F8FCFE]">
                  <div className="text-[#0288D1] font-bold text-xs uppercase tracking-wider mb-1">Hero Images</div>
                  <div className="text-2xl font-black text-[#0B2838] mb-1 font-mono">1920 × 1080</div>
                  <p className="text-xs text-[#355C75] mb-2">WebP format / Max 250 KB</p>
                  <div className="text-[10px] text-[#355C75] bg-white p-2.5 rounded-xl border border-[#B3E5FC]">
                    Recommended 80% lossy WebP or progressive JPEG for instant viewport render.
                  </div>
                </div>

                <div className="p-5 rounded-2xl border border-[#B3E5FC] bg-[#F8FCFE]">
                  <div className="text-[#0288D1] font-bold text-xs uppercase tracking-wider mb-1">Product Images</div>
                  <div className="text-2xl font-black text-[#0B2838] mb-1 font-mono">1000 × 1000</div>
                  <p className="text-xs text-[#355C75] mb-2">Square 1:1 / Max 120 KB</p>
                  <div className="text-[10px] text-[#355C75] bg-white p-2.5 rounded-xl border border-[#B3E5FC]">
                    Clean centered background with crisp shadow per international catalog specifications.
                  </div>
                </div>

                <div className="p-5 rounded-2xl border border-[#B3E5FC] bg-[#F8FCFE]">
                  <div className="text-[#0288D1] font-bold text-xs uppercase tracking-wider mb-1">3D / Video Loops</div>
                  <div className="text-2xl font-black text-[#0B2838] mb-1 font-mono">1080p 60fps</div>
                  <p className="text-xs text-[#355C75] mb-2">2s to 10s MP4/WebM Loop</p>
                  <div className="text-[10px] text-[#355C75] bg-white p-2.5 rounded-xl border border-[#B3E5FC]">
                    Seamless continuous 360° turntable without audio track for silent autoplay.
                  </div>
                </div>
              </div>
            </div>
          )}
        </div>

        {/* Footer */}
        <div className="p-4 bg-[#F8FCFE] border-t border-[#B3E5FC] flex items-center justify-between text-xs text-[#355C75] font-mono">
          <span>Medtrend Precision Instruments Asset Architecture v2.4</span>
          <button
            onClick={onClose}
            className="px-4 py-2 bg-[#0288D1] hover:bg-[#0277BD] text-white font-bold rounded-xl font-mono text-xs transition-colors uppercase tracking-wider shadow-md shadow-[#0288D1]/25"
          >
            Done
          </button>
        </div>
      </div>
    </div>
  );
};
