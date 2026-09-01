import React, { useState, useEffect, useRef } from 'react';
import { 
  RotateCw, Play, Pause, Layers, Sparkles, 
  Maximize2, Minimize2, Eye, ShieldCheck, Download, RefreshCw, ZoomIn, ZoomOut, Zap,
  Film, Sliders, Check
} from 'lucide-react';

interface Interactive3DViewerProps {
  modelType?: 'forceps' | 'scissors' | 'needle_holder' | 'retractor' | 'scalpel' | 'bone_rongeur';
  productName?: string;
  productCode?: string;
  initialFinish?: string;
  heightClass?: string;
  showCustomMarking?: boolean;
  videoLoopUrl?: string;
}

export const Interactive3DViewer: React.FC<Interactive3DViewerProps> = ({
  modelType = 'forceps',
  productName = 'Halsted Mosquito Forceps (MT-HF-001)',
  productCode = 'MT-HF-001',
  initialFinish = 'German Satin',
  heightClass = 'h-[520px] md:h-[600px]',
  showCustomMarking = true,
  videoLoopUrl = '/3dslide1.mp4'
}) => {
  const [viewMode, setViewMode] = useState<'video' | 'cad'>('video');
  const [activeVideoUrl, setActiveVideoUrl] = useState<string>(videoLoopUrl || '/3dslide1.mp4');
  const [stageHeight, setStageHeight] = useState<'standard' | 'tall' | 'compact'>('standard');
  const [isFullScreen, setIsFullScreen] = useState(false);
  const [rotation, setRotation] = useState({ x: 15, y: 35, z: 0 });
  const [isDragging, setIsDragging] = useState(false);
  const [dragStart, setDragStart] = useState({ x: 0, y: 0 });
  const [isAutoRotating, setIsAutoRotating] = useState(true);
  const [rotationSpeed, setRotationSpeed] = useState<'2s-turbo' | '10s-smooth' | 'pause'>('10s-smooth');
  const [zoom, setZoom] = useState(1);
  const [finish, setFinish] = useState<string>(initialFinish);
  const [isWireframe, setIsWireframe] = useState(false);
  const [isExploded, setIsExploded] = useState(false);
  const [activeHotspot, setActiveHotspot] = useState<string | null>(null);
  const [laserMarkingText, setLaserMarkingText] = useState('MEDTREND® SIALKOT');
  const [loopTime, setLoopTime] = useState(0);
  const [videoPlayState, setVideoPlayState] = useState(true);
  const [videoDuration, setVideoDuration] = useState(3.0);
  const [videoCurrentTime, setVideoCurrentTime] = useState(0);

  const canvasRef = useRef<HTMLCanvasElement | null>(null);
  const videoRef = useRef<HTMLVideoElement | null>(null);
  const fullScreenVideoRef = useRef<HTMLVideoElement | null>(null);

  // Sync prop changes immediately
  useEffect(() => {
    if (videoLoopUrl) {
      setActiveVideoUrl(videoLoopUrl);
    }
  }, [videoLoopUrl, productCode]);

  // Sync video play state
  useEffect(() => {
    const currentVideo = isFullScreen ? fullScreenVideoRef.current : videoRef.current;
    if (currentVideo) {
      if (videoPlayState) {
        currentVideo.play().catch(() => {});
      } else {
        currentVideo.pause();
      }
    }
  }, [videoPlayState, viewMode, activeVideoUrl, isFullScreen]);

  // Video playback rate based on speed preset
  useEffect(() => {
    const currentVideo = isFullScreen ? fullScreenVideoRef.current : videoRef.current;
    if (currentVideo) {
      if (rotationSpeed === '2s-turbo') {
        currentVideo.playbackRate = 1.5;
      } else {
        currentVideo.playbackRate = 1.0;
      }
    }
  }, [rotationSpeed, isFullScreen]);

  // Video time update listener
  const handleTimeUpdate = (e: React.SyntheticEvent<HTMLVideoElement>) => {
    const target = e.currentTarget;
    setVideoCurrentTime(target.currentTime);
    if (target.duration) {
      setVideoDuration(target.duration);
    }
  };

  // Video Scrubbing / Dragging
  const handleVideoMouseDown = (e: React.MouseEvent) => {
    setIsDragging(true);
    setDragStart({ x: e.clientX, y: e.clientY });
    const currentVideo = isFullScreen ? fullScreenVideoRef.current : videoRef.current;
    if (currentVideo) {
      currentVideo.pause();
      setVideoPlayState(false);
    }
  };

  const handleVideoMouseMove = (e: React.MouseEvent) => {
    if (!isDragging) return;
    const deltaX = e.clientX - dragStart.x;
    setDragStart({ x: e.clientX, y: e.clientY });

    const currentVideo = isFullScreen ? fullScreenVideoRef.current : videoRef.current;
    if (currentVideo && currentVideo.duration) {
      const sensitivity = 0.005;
      let nextTime = currentVideo.currentTime + deltaX * sensitivity;
      if (nextTime < 0) nextTime = currentVideo.duration + nextTime;
      if (nextTime > currentVideo.duration) nextTime = nextTime % currentVideo.duration;
      currentVideo.currentTime = nextTime;
      setVideoCurrentTime(nextTime);
    }
  };

  const handleVideoMouseUp = () => {
    setIsDragging(false);
  };

  // Auto rotation loop for CAD mesh
  useEffect(() => {
    if (!isAutoRotating || viewMode === 'video') return;

    const interval = setInterval(() => {
      setRotation(prev => ({
        ...prev,
        y: (prev.y + (rotationSpeed === '2s-turbo' ? 3.6 : 0.72)) % 360
      }));
      setLoopTime(t => (t + 0.05) % (rotationSpeed === '2s-turbo' ? 2 : 10));
    }, 20);

    return () => clearInterval(interval);
  }, [isAutoRotating, rotationSpeed, viewMode]);

  // Mouse Dragging for CAD
  const handleMouseDown = (e: React.MouseEvent) => {
    setIsDragging(true);
    setDragStart({ x: e.clientX, y: e.clientY });
    setIsAutoRotating(false);
  };

  const handleMouseMove = (e: React.MouseEvent) => {
    if (!isDragging) return;
    const deltaX = e.clientX - dragStart.x;
    const deltaY = e.clientY - dragStart.y;

    setRotation(prev => ({
      ...prev,
      y: (prev.y + deltaX * 0.8) % 360,
      x: Math.max(-60, Math.min(60, prev.x - deltaY * 0.5))
    }));

    setDragStart({ x: e.clientX, y: e.clientY });
  };

  const handleMouseUp = () => {
    setIsDragging(false);
  };

  // Finish Color Config
  const finishStyles: Record<string, { stroke: string; fill: string; highlight: string; shadow: string }> = {
    'Satin Matte': {
      stroke: '#334155',
      fill: 'linear-gradient(135deg, #e2e8f0 0%, #cbd5e1 50%, #94a3b8 100%)',
      highlight: '#f8fafc',
      shadow: '#64748b'
    },
    'Mirror Polish': {
      stroke: '#0f172a',
      fill: 'linear-gradient(135deg, #ffffff 0%, #cbd5e1 30%, #ffffff 70%, #94a3b8 100%)',
      highlight: '#ffffff',
      shadow: '#475569'
    },
    'Tungsten Carbide Gold': {
      stroke: '#78350f',
      fill: 'linear-gradient(135deg, #fef08a 0%, #facc15 40%, #ca8a04 100%)',
      highlight: '#fef9c3',
      shadow: '#a16207'
    },
    'Blue Titanium': {
      stroke: '#0369a1',
      fill: 'linear-gradient(135deg, #7dd3fc 0%, #0284c7 50%, #0369a1 100%)',
      highlight: '#e0f2fe',
      shadow: '#075985'
    },
    'Black Ceramic': {
      stroke: '#020617',
      fill: 'linear-gradient(135deg, #334155 0%, #1e293b 50%, #0f172a 100%)',
      highlight: '#64748b',
      shadow: '#020617'
    }
  };

  const styleConfig = finishStyles[finish] || finishStyles['Satin Matte'];

  // Render 3D CAD Mesh onto canvas
  useEffect(() => {
    if (viewMode !== 'cad') return;
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    const width = (canvas.width = canvas.parentElement?.clientWidth || 600);
    const height = (canvas.height = canvas.parentElement?.clientHeight || 450);

    ctx.clearRect(0, 0, width, height);

    ctx.save();
    ctx.translate(width / 2, height / 2);
    ctx.scale(zoom, zoom);

    const radY = (rotation.y * Math.PI) / 180;
    const radX = (rotation.x * Math.PI) / 180;

    ctx.save();
    ctx.transform(
      Math.cos(radY),
      Math.sin(radX) * Math.sin(radY),
      0,
      Math.cos(radX),
      0,
      0
    );

    // Instrument geometry drawing
    const explodedGap = isExploded ? 28 : 0;

    // Gradient definition for metallic shimmer
    const grad = ctx.createLinearGradient(-100, -150, 100, 150);
    if (finish === 'Tungsten Carbide Gold') {
      grad.addColorStop(0, '#fef08a');
      grad.addColorStop(0.3, '#facc15');
      grad.addColorStop(0.7, '#ca8a04');
      grad.addColorStop(1, '#854d0e');
    } else if (finish === 'Blue Titanium') {
      grad.addColorStop(0, '#bae6fd');
      grad.addColorStop(0.4, '#38bdf8');
      grad.addColorStop(0.8, '#0284c7');
      grad.addColorStop(1, '#075985');
    } else if (finish === 'Black Ceramic') {
      grad.addColorStop(0, '#475569');
      grad.addColorStop(0.5, '#1e293b');
      grad.addColorStop(1, '#090d16');
    } else if (finish === 'Mirror Polish') {
      grad.addColorStop(0, '#ffffff');
      grad.addColorStop(0.2, '#e2e8f0');
      grad.addColorStop(0.4, '#ffffff');
      grad.addColorStop(0.8, '#94a3b8');
      grad.addColorStop(1, '#64748b');
    } else {
      // German Satin Matte
      grad.addColorStop(0, '#f8fafc');
      grad.addColorStop(0.3, '#e2e8f0');
      grad.addColorStop(0.7, '#cbd5e1');
      grad.addColorStop(1, '#94a3b8');
    }

    ctx.fillStyle = isWireframe ? 'rgba(2, 136, 209, 0.08)' : grad;
    ctx.strokeStyle = isWireframe ? '#0288D1' : '#0B2838';
    ctx.lineWidth = isWireframe ? 1 : 1.8;

    if (modelType === 'scissors') {
      // Metzenbaum / Mayo Surgical Scissors
      // Left Blade & Shank
      ctx.save();
      ctx.translate(-explodedGap, 0);
      ctx.beginPath();
      ctx.moveTo(-2, -150);
      ctx.quadraticCurveTo(-14, -80, -4, 0);
      ctx.lineTo(-12, 110);
      ctx.arc(-22, 135, 18, 0, Math.PI * 2);
      ctx.lineTo(-2, 110);
      ctx.lineTo(0, 0);
      ctx.closePath();
      ctx.fill();
      ctx.stroke();

      // Tungsten Carbide Gold Blade Insert Tip
      if (finish === 'Tungsten Carbide Gold' && !isWireframe) {
        ctx.fillStyle = '#facc15';
        ctx.beginPath();
        ctx.moveTo(-2, -150);
        ctx.quadraticCurveTo(-10, -110, -6, -90);
        ctx.lineTo(-1, -90);
        ctx.closePath();
        ctx.fill();
      }
      ctx.restore();

      // Right Blade & Shank
      ctx.save();
      ctx.translate(explodedGap, 0);
      ctx.beginPath();
      ctx.moveTo(2, -150);
      ctx.quadraticCurveTo(14, -80, 4, 0);
      ctx.lineTo(12, 110);
      ctx.arc(22, 135, 18, 0, Math.PI * 2);
      ctx.lineTo(2, 110);
      ctx.lineTo(0, 0);
      ctx.closePath();
      ctx.fill();
      ctx.stroke();
      ctx.restore();

      // Screw / Pivot Joint
      ctx.fillStyle = '#475569';
      ctx.beginPath();
      ctx.arc(0, 0, 6, 0, Math.PI * 2);
      ctx.fill();
      ctx.stroke();
    } else if (modelType === 'scalpel') {
      // Scalpel Handle #3 / #4 with diamond textured knurling
      const bladeGrad = ctx.createLinearGradient(-15, -220, 15, -130);
      bladeGrad.addColorStop(0, '#ffffff');
      bladeGrad.addColorStop(0.5, '#e2e8f0');
      bladeGrad.addColorStop(1, '#94a3b8');

      // Flat surgical handle
      ctx.beginPath();
      ctx.roundRect(-11, -140, 22, 270, 8);
      ctx.fill();
      ctx.stroke();

      // Diamond knurled textured band
      ctx.strokeStyle = 'rgba(0,0,0,0.2)';
      ctx.lineWidth = 0.8;
      for (let i = -100; i < 80; i += 8) {
        ctx.beginPath();
        ctx.moveTo(-11, i);
        ctx.lineTo(11, i + 12);
        ctx.stroke();

        ctx.beginPath();
        ctx.moveTo(11, i);
        ctx.lineTo(-11, i + 12);
        ctx.stroke();
      }

      // Blade chuck head
      ctx.fillStyle = bladeGrad;
      ctx.beginPath();
      ctx.moveTo(-7, -140);
      ctx.lineTo(-3, -190);
      ctx.lineTo(3, -190);
      ctx.lineTo(7, -140);
      ctx.closePath();
      ctx.fill();
      ctx.stroke();

      // Blade
      ctx.fillStyle = 'rgba(255,255,255,0.9)';
      ctx.beginPath();
      ctx.moveTo(0, -190);
      ctx.lineTo(-1, -230);
      ctx.quadraticCurveTo(15, -210, 3, -190);
      ctx.closePath();
      ctx.fill();
      ctx.stroke();
    } else {
      // Forceps / Hemostat with box lock and finger rings
      // Left Arm
      ctx.save();
      ctx.translate(-explodedGap, 0);

      // Serrated Jaw
      ctx.beginPath();
      ctx.moveTo(-4, -140);
      ctx.quadraticCurveTo(-12, -70, -6, 0);
      ctx.lineTo(-2, 0);
      ctx.quadraticCurveTo(-6, -70, -2, -140);
      ctx.closePath();
      ctx.fill();
      ctx.stroke();

      // Shank and Ring
      ctx.beginPath();
      ctx.moveTo(-6, 0);
      ctx.lineTo(-14, 100);
      ctx.arc(-22, 125, 20, -Math.PI / 4, Math.PI * 1.3);
      ctx.lineTo(-8, 100);
      ctx.lineTo(-2, 0);
      ctx.closePath();
      ctx.fill();
      ctx.stroke();

      // Ratchet teeth on left ring
      ctx.beginPath();
      ctx.moveTo(-10, 110);
      ctx.lineTo(-4, 110);
      ctx.lineTo(-4, 113);
      ctx.lineTo(-10, 113);
      ctx.stroke();
      ctx.restore();

      // Right Arm
      ctx.save();
      ctx.translate(explodedGap, 0);

      ctx.beginPath();
      ctx.moveTo(4, -140);
      ctx.quadraticCurveTo(12, -70, 6, 0);
      ctx.lineTo(2, 0);
      ctx.quadraticCurveTo(6, -70, 2, -140);
      ctx.closePath();
      ctx.fill();
      ctx.stroke();

      // Shank and Ring
      ctx.beginPath();
      ctx.moveTo(6, 0);
      ctx.lineTo(14, 100);
      ctx.arc(22, 125, 20, Math.PI * 1.25, -Math.PI * 0.3, true);
      ctx.lineTo(8, 100);
      ctx.lineTo(2, 0);
      ctx.closePath();
      ctx.fill();
      ctx.stroke();

      // Ratchet teeth on right ring
      ctx.beginPath();
      ctx.moveTo(10, 110);
      ctx.lineTo(4, 110);
      ctx.lineTo(4, 113);
      ctx.lineTo(10, 113);
      ctx.stroke();
      ctx.restore();

      // Box Lock Central Pivot Rivet
      ctx.fillStyle = '#64748b';
      ctx.beginPath();
      ctx.arc(0, 0, 7, 0, Math.PI * 2);
      ctx.fill();
      ctx.stroke();

      ctx.fillStyle = '#f8fafc';
      ctx.beginPath();
      ctx.arc(-1.5, -1.5, 2.5, 0, Math.PI * 2);
      ctx.fill();
    }

    // Laser Marking on Instrument Shank
    if (laserMarkingText) {
      ctx.save();
      ctx.font = 'bold 8px monospace';
      ctx.fillStyle = 'rgba(11, 40, 56, 0.75)';
      ctx.textAlign = 'center';
      ctx.fillText(laserMarkingText, 0, 45);
      ctx.font = '6px monospace';
      ctx.fillStyle = 'rgba(11, 40, 56, 0.55)';
      ctx.fillText('AISI 420 • CE • DIN EN ISO 13485', 0, 55);
      ctx.restore();
    }

    ctx.restore(); // rotation
    ctx.restore(); // translation
  }, [rotation, zoom, finish, isWireframe, isExploded, modelType, laserMarkingText, styleConfig, viewMode]);

  const heightClasses = {
    compact: 'h-[460px]',
    standard: 'h-[560px] md:h-[620px]',
    tall: 'h-[680px] md:h-[760px]'
  };

  const getCurrentInstrumentTitle = () => {
    if (viewMode === 'cad') return productName;
    if (activeVideoUrl === '/3dslide1.mp4') return 'Halsted Mosquito Forceps (MT-HF-001)';
    if (activeVideoUrl === '/3dslide2.mp4') return 'Adson Micro Tissue Tweezers (MT-DS-019)';
    if (activeVideoUrl.includes('MT-HF-002')) return 'Metzenbaum TC Scissors (MT-SC-004)';
    if (activeVideoUrl.includes('MT-HF-001')) return 'Scalpel Knurled Handle (MT-SH-001)';
    return productName;
  };

  return (
    <div className="rounded-3xl bg-white border border-[#B3E5FC] shadow-xl overflow-hidden text-[#0B2838] transition-colors">
      {/* 1. Header Toolbar */}
      <div className="p-4 sm:p-5 border-b border-[#B3E5FC] flex flex-wrap items-center justify-between gap-3 bg-[#F4FAFD]/90 backdrop-blur-md">
        {/* Title and Model Info */}
        <div className="flex items-center gap-3">
          <div className="w-9 h-9 rounded-xl bg-[#0288D1] text-white flex items-center justify-center font-mono font-bold text-xs shadow-md shadow-[#0288D1]/25">
            360°
          </div>
          <div>
            <div className="flex items-center gap-2">
              <span className="text-[10px] font-bold uppercase tracking-[0.15em] text-[#0288D1] font-mono">
                {viewMode === 'video' ? '100% Real 360° Surgical Footage' : '3D Precision CAD Inspection'}
              </span>
              <span className="inline-flex items-center px-1.5 py-0.5 rounded text-[9px] font-mono bg-[#E1F5FE] text-[#01579B] border border-[#81D4FA]">
                FULL 360° ORBIT
              </span>
            </div>
            <p className="text-xs sm:text-sm font-bold text-[#0B2838] tracking-tight">{getCurrentInstrumentTitle()}</p>
          </div>
        </div>

        {/* Action Controls */}
        <div className="flex flex-wrap items-center gap-2">
          {/* Quick Video Switcher Pills */}
          <div className="flex items-center bg-[#E1F5FE] rounded-xl p-0.5 border border-[#81D4FA] text-xs font-mono">
            <button
              onClick={() => {
                setActiveVideoUrl('/3dslide1.mp4');
                setViewMode('video');
                setVideoPlayState(true);
              }}
              className={`px-2.5 py-1 rounded-lg transition-all flex items-center gap-1 ${
                activeVideoUrl === '/3dslide1.mp4' && viewMode === 'video'
                  ? 'bg-[#0288D1] text-white font-bold shadow-xs'
                  : 'text-[#355C75] hover:text-[#0B2838]'
              }`}
              title="Forceps 16:9 Dark Inspection (3dslide1.mp4)"
            >
              <Film className="w-3 h-3" />
              <span>Forceps (16:9)</span>
            </button>
            <button
              onClick={() => {
                setActiveVideoUrl('/3dslide2.mp4');
                setViewMode('video');
                setVideoPlayState(true);
              }}
              className={`px-2.5 py-1 rounded-lg transition-all flex items-center gap-1 ${
                activeVideoUrl === '/3dslide2.mp4' && viewMode === 'video'
                  ? 'bg-[#0288D1] text-white font-bold shadow-xs'
                  : 'text-[#355C75] hover:text-[#0B2838]'
              }`}
              title="Tweezers 16:9 Clean Podium (3dslide2.mp4)"
            >
              <Film className="w-3 h-3" />
              <span>Tweezers (16:9)</span>
            </button>
            <button
              onClick={() => {
                setActiveVideoUrl('/images/3d-models/MT-HF-002-loop.mp4');
                setViewMode('video');
                setVideoPlayState(true);
              }}
              className={`px-2.5 py-1 rounded-lg transition-all flex items-center gap-1 ${
                (activeVideoUrl.includes('MT-HF-002') || activeVideoUrl === '/MT-HF-002-loop.mp4') && viewMode === 'video'
                  ? 'bg-[#0288D1] text-white font-bold shadow-xs'
                  : 'text-[#355C75] hover:text-[#0B2838]'
              }`}
              title="Metzenbaum Scissors (9:16 Portrait Loop)"
            >
              <Film className="w-3 h-3" />
              <span>Scissors (9:16)</span>
            </button>
            <button
              onClick={() => {
                setActiveVideoUrl('/images/3d-models/MT-HF-001-loop.mp4');
                setViewMode('video');
                setVideoPlayState(true);
              }}
              className={`px-2.5 py-1 rounded-lg transition-all flex items-center gap-1 ${
                (activeVideoUrl.includes('MT-HF-001') || activeVideoUrl === '/MT-HF-001-loop.mp4') && viewMode === 'video'
                  ? 'bg-[#0288D1] text-white font-bold shadow-xs'
                  : 'text-[#355C75] hover:text-[#0B2838]'
              }`}
              title="Scalpel Knurled Handle (9:16 Portrait Loop)"
            >
              <Film className="w-3 h-3" />
              <span>Scalpel (9:16)</span>
            </button>
            <button
              onClick={() => setViewMode('cad')}
              className={`px-2.5 py-1 rounded-lg transition-all flex items-center gap-1 ${
                viewMode === 'cad'
                  ? 'bg-[#0288D1] text-white font-bold shadow-xs'
                  : 'text-[#355C75] hover:text-[#0B2838]'
              }`}
              title="Interactive 3D CAD Mesh"
            >
              <Layers className="w-3 h-3" />
              <span>CAD Mesh</span>
            </button>
          </div>

          {/* Speed & Play/Pause */}
          <div className="flex items-center bg-[#E1F5FE] rounded-xl p-0.5 border border-[#81D4FA]">
            <button
              onClick={() => {
                setRotationSpeed('2s-turbo');
                setIsAutoRotating(true);
                setVideoPlayState(true);
              }}
              title="1.5x Speed"
              className={`px-2 py-1 text-xs font-mono rounded-lg transition-all ${
                rotationSpeed === '2s-turbo' ? 'bg-[#0288D1] text-white font-bold shadow-xs' : 'text-[#355C75] hover:text-[#0B2838]'
              }`}
            >
              1.5x
            </button>
            <button
              onClick={() => {
                setRotationSpeed('10s-smooth');
                setIsAutoRotating(true);
                setVideoPlayState(true);
              }}
              title="1.0x Normal Speed"
              className={`px-2 py-1 text-xs font-mono rounded-lg transition-all ${
                rotationSpeed === '10s-smooth' ? 'bg-[#0288D1] text-white font-bold shadow-xs' : 'text-[#355C75] hover:text-[#0B2838]'
              }`}
            >
              1.0x
            </button>
            <button
              onClick={() => {
                if (viewMode === 'video') {
                  setVideoPlayState(!videoPlayState);
                } else {
                  setIsAutoRotating(!isAutoRotating);
                }
              }}
              title={viewMode === 'video' ? (videoPlayState ? 'Pause Video' : 'Play Video') : (isAutoRotating ? 'Pause Rotation' : 'Resume 3D Rotation')}
              className="p-1.5 text-[#355C75] hover:text-[#0B2838] rounded transition-colors"
            >
              {(viewMode === 'video' ? videoPlayState : isAutoRotating) ? (
                <Pause className="w-3.5 h-3.5 text-[#0288D1]" />
              ) : (
                <Play className="w-3.5 h-3.5 text-[#0288D1]" />
              )}
            </button>
          </div>

          {/* Height Adjuster */}
          <div className="hidden sm:flex items-center bg-[#E1F5FE] rounded-xl p-0.5 border border-[#81D4FA] text-[11px] font-mono">
            <button
              onClick={() => setStageHeight('compact')}
              className={`px-2 py-1 rounded-lg transition-all ${stageHeight === 'compact' ? 'bg-white font-bold text-[#0288D1] shadow-xs' : 'text-[#355C75] hover:text-[#0B2838]'}`}
            >
              460p
            </button>
            <button
              onClick={() => setStageHeight('standard')}
              className={`px-2 py-1 rounded-lg transition-all ${stageHeight === 'standard' ? 'bg-white font-bold text-[#0288D1] shadow-xs' : 'text-[#355C75] hover:text-[#0B2838]'}`}
            >
              620p
            </button>
            <button
              onClick={() => setStageHeight('tall')}
              className={`px-2 py-1 rounded-lg transition-all ${stageHeight === 'tall' ? 'bg-white font-bold text-[#0288D1] shadow-xs' : 'text-[#355C75] hover:text-[#0B2838]'}`}
            >
              760p
            </button>
          </div>

          {/* Fullscreen Button */}
          <button
            onClick={() => setIsFullScreen(true)}
            title="Full Screen Inspection"
            className="p-2 rounded-xl bg-[#E1F5FE] text-[#355C75] border border-[#81D4FA] hover:text-[#0288D1] transition-colors"
          >
            <Maximize2 className="w-3.5 h-3.5" />
          </button>
        </div>
      </div>

      {/* 2. Main Stage (Entire Instrument Fully In View) */}
      <div 
        className={`relative ${heightClasses[stageHeight]} w-full cursor-grab active:cursor-grabbing select-none flex items-center justify-center bg-gradient-to-b from-[#F0F9FF] to-[#E1F5FE] overflow-hidden`}
        onMouseDown={viewMode === 'video' ? handleVideoMouseDown : handleMouseDown}
        onMouseMove={viewMode === 'video' ? handleVideoMouseMove : handleMouseMove}
        onMouseUp={viewMode === 'video' ? handleVideoMouseUp : handleMouseUp}
        onMouseLeave={viewMode === 'video' ? handleVideoMouseUp : handleMouseUp}
      >
        {/* Ambient Studio Gradient & Floor */}
        <div className="absolute inset-0 bg-radial from-[#F4FAFD] via-[#E1F5FE] to-[#B3E5FC] opacity-80 pointer-events-none" />

        {viewMode === 'video' ? (
          /* Real Studio 360 Video View - Complete Fit with No Cropping */
          <div className="relative w-full h-full flex items-center justify-center p-3 sm:p-6 z-10">
            <video
              ref={videoRef}
              src={activeVideoUrl}
              autoPlay
              loop
              muted
              playsInline
              onTimeUpdate={handleTimeUpdate}
              className="max-h-full max-w-full object-contain rounded-2xl shadow-2xl transition-transform duration-150"
              style={{ transform: `scale(${zoom})` }}
            />

            {/* Instruction Badge */}
            <div className="absolute top-4 left-1/2 -translate-x-1/2 pointer-events-none z-20">
              <div className="px-4 py-1.5 rounded-full bg-[#0B2838]/90 text-white text-[11px] font-mono backdrop-blur-md border border-[#81D4FA]/40 flex items-center gap-2 shadow-lg">
                <RotateCw className="w-3.5 h-3.5 text-[#4FC3F7] animate-spin" />
                <span>Drag left / right to manually scrub 360° angle</span>
              </div>
            </div>

            {/* Live Status Timeline */}
            <div className="absolute bottom-4 left-4 z-20 flex items-center gap-2.5 px-3.5 py-2 rounded-xl bg-white/95 border border-[#B3E5FC] backdrop-blur-md text-xs text-[#355C75] shadow-md">
              <div className="w-2.5 h-2.5 rounded-full bg-[#0288D1] animate-ping" />
              <span className="font-mono text-[11px] text-[#0B2838] font-bold">
                360° Loop: {videoCurrentTime.toFixed(1)}s / {videoDuration.toFixed(1)}s
              </span>
              <span className="text-[#B3E5FC]">|</span>
              <span className="font-mono text-[11px] text-[#0288D1] font-extrabold">
                Angle: {Math.round((videoCurrentTime / (videoDuration || 1)) * 360)}°
              </span>
            </div>
          </div>
        ) : (
          /* Interactive CAD Canvas View */
          <div className="relative w-full h-full flex items-center justify-center z-10">
            <canvas
              ref={canvasRef}
              className="w-full h-full object-contain"
            />

            <div className="absolute bottom-4 left-4 z-20 flex items-center gap-2 px-3 py-1.5 rounded-lg bg-white/90 border border-[#B3E5FC] backdrop-blur-md text-xs text-[#355C75] shadow-sm">
              <div className="w-2 h-2 rounded-full bg-[#0288D1] animate-pulse" />
              <span className="font-mono text-[10px] text-[#0B2838]">360° CAD Mesh: {loopTime.toFixed(1)}s</span>
              <span className="text-[#B3E5FC]">|</span>
              <span className="font-mono text-[10px] text-[#0288D1] font-bold">Angle: {Math.round(rotation.y)}°</span>
            </div>
          </div>
        )}

        {/* Floating Zoom & Reset Toolbar */}
        <div className="absolute right-4 bottom-4 z-20 flex flex-col gap-1.5 bg-white/95 p-1.5 rounded-xl border border-[#B3E5FC] backdrop-blur-md shadow-md">
          <button
            onClick={() => setZoom(Math.min(1.8, zoom + 0.15))}
            title="Zoom In"
            className="p-2 text-[#355C75] hover:text-[#0288D1] hover:bg-[#F0F9FF] rounded-lg transition-colors"
          >
            <ZoomIn className="w-4 h-4" />
          </button>
          <button
            onClick={() => setZoom(Math.max(0.7, zoom - 0.15))}
            title="Zoom Out"
            className="p-2 text-[#355C75] hover:text-[#0288D1] hover:bg-[#F0F9FF] rounded-lg transition-colors"
          >
            <ZoomOut className="w-4 h-4" />
          </button>
          <button
            onClick={() => {
              setRotation({ x: 15, y: 35, z: 0 });
              setZoom(1);
              setIsExploded(false);
              setIsWireframe(false);
              const currentVideo = isFullScreen ? fullScreenVideoRef.current : videoRef.current;
              if (currentVideo) {
                currentVideo.currentTime = 0;
                setVideoCurrentTime(0);
                currentVideo.play().catch(() => {});
                setVideoPlayState(true);
              }
            }}
            title="Reset Angle & Fit"
            className="p-2 text-[#355C75] hover:text-[#0288D1] hover:bg-[#F0F9FF] rounded-lg transition-colors"
          >
            <RefreshCw className="w-4 h-4" />
          </button>
        </div>
      </div>

      {/* 3. Bottom Laser & Material Controls */}
      <div className="p-4 sm:p-5 bg-[#F4FAFD] border-t border-[#B3E5FC] flex flex-col md:flex-row items-start md:items-center justify-between gap-4">
        {/* Material Finishes */}
        <div>
          <div className="text-[10px] font-bold uppercase tracking-[0.15em] text-[#355C75] font-mono mb-1.5 flex items-center gap-1.5">
            <span>Material & Surface Finish:</span>
            <span className="text-[#0288D1] font-mono font-bold">{finish}</span>
          </div>
          <div className="flex flex-wrap items-center gap-2">
            {[
              { name: 'Satin Matte', color: 'bg-slate-300 border-slate-400', label: 'German Satin' },
              { name: 'Mirror Polish', color: 'bg-white border-slate-300', label: 'High Mirror' },
              { name: 'Tungsten Carbide Gold', color: 'bg-amber-400 border-amber-500', label: 'TC Gold' },
              { name: 'Blue Titanium', color: 'bg-sky-500 border-sky-600', label: 'Ti-Nitride' },
              { name: 'Black Ceramic', color: 'bg-slate-900 border-slate-700', label: 'Black Non-Glare' }
            ].map((f) => (
              <button
                key={f.name}
                onClick={() => setFinish(f.name)}
                className={`flex items-center gap-1.5 px-2.5 py-1 rounded-lg text-xs font-mono border transition-all ${
                  finish === f.name
                    ? 'bg-white text-[#0288D1] border-[#0288D1] shadow-xs font-bold'
                    : 'bg-white text-[#355C75] border-[#B3E5FC] hover:border-[#29B6F6] hover:text-[#0B2838]'
                }`}
              >
                <span className={`w-2.5 h-2.5 rounded-full ${f.color} border`} />
                {f.label}
              </button>
            ))}
          </div>
        </div>

        {/* Live Laser Marking Input */}
        {showCustomMarking && (
          <div className="w-full md:w-auto">
            <div className="text-[10px] font-bold uppercase tracking-[0.15em] text-[#355C75] font-mono mb-1.5 flex items-center justify-between">
              <span>Fiber-Laser Etching Preview:</span>
              <span className="text-[9px] text-[#0288D1] font-mono font-bold">OEM Free Laser</span>
            </div>
            <div className="flex items-center gap-2">
              <input
                type="text"
                value={laserMarkingText}
                onChange={(e) => setLaserMarkingText(e.target.value.toUpperCase())}
                placeholder="Hospital or Brand Name"
                maxLength={24}
                className="px-3 py-1.5 text-xs bg-white border border-[#B3E5FC] rounded-xl text-[#0B2838] font-mono focus:outline-none focus:border-[#0288D1] w-full md:w-56 shadow-xs"
              />
              <div className="text-[9px] text-[#62879F] font-mono shrink-0">
                MT-LASER-ETCH
              </div>
            </div>
          </div>
        )}
      </div>

      {/* 4. Fullscreen Modal Overlay */}
      {isFullScreen && (
        <div className="fixed inset-0 z-50 bg-[#0B2838]/95 backdrop-blur-xl flex flex-col p-4 sm:p-8 select-none">
          <div className="flex items-center justify-between pb-4 border-b border-white/20">
            <div className="flex items-center gap-3">
              <div className="w-8 h-8 rounded-lg bg-[#0288D1] text-white flex items-center justify-center font-mono font-bold text-xs">
                360°
              </div>
              <div>
                <h3 className="text-sm sm:text-base font-bold text-white">{productName}</h3>
                <p className="text-xs text-[#B3E5FC] font-mono">Full-Resolution 360° Surgical Inspection • Drag to scrub angle</p>
              </div>
            </div>

            <div className="flex items-center gap-2">
              <button
                onClick={() => setIsFullScreen(false)}
                className="px-4 py-2 rounded-xl bg-white/10 hover:bg-white/20 text-white font-mono text-xs font-bold transition-all flex items-center gap-2"
              >
                <Minimize2 className="w-4 h-4" />
                <span>Close Fullscreen</span>
              </button>
            </div>
          </div>

          <div 
            className="flex-1 flex items-center justify-center relative cursor-grab active:cursor-grabbing p-4"
            onMouseDown={handleVideoMouseDown}
            onMouseMove={handleVideoMouseMove}
            onMouseUp={handleVideoMouseUp}
            onMouseLeave={handleVideoMouseUp}
          >
            <video
              ref={fullScreenVideoRef}
              src={activeVideoUrl}
              autoPlay
              loop
              muted
              playsInline
              onTimeUpdate={handleTimeUpdate}
              className="max-h-[85vh] max-w-[90vw] object-contain rounded-2xl shadow-2xl"
              style={{ transform: `scale(${zoom})` }}
            />

            <div className="absolute bottom-6 left-1/2 -translate-x-1/2 px-4 py-2 rounded-xl bg-[#0B2838]/90 text-white border border-[#81D4FA]/40 font-mono text-xs backdrop-blur-md flex items-center gap-3">
              <RotateCw className="w-4 h-4 text-[#4FC3F7] animate-spin" />
              <span>Drag horizontally to rotate • Current Angle: {Math.round((videoCurrentTime / (videoDuration || 1)) * 360)}°</span>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
