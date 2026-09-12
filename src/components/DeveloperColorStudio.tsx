import React, { useState } from 'react';
import { 
  Palette, X, RotateCcw, Check, Copy, Sliders, 
  Sparkles, Eye, ShieldAlert, ChevronDown, ChevronUp, Layers, HelpCircle
} from 'lucide-react';
import { useTheme, COLOR_PRESETS, ThemeColors } from '../context/ThemeContext';

interface ColorFieldMeta {
  key: keyof ThemeColors;
  labelEn: string;
  labelUr: string;
  description: string;
  elements: string;
  defaultHex: string;
}

const COLOR_FIELDS: ColorFieldMeta[] = [
  {
    key: 'primary',
    labelEn: 'Primary Brand Blue',
    labelUr: 'بنیادی برانڈ کا رنگ',
    description: 'Main identity color across the website',
    elements: 'Header top bar, main headings, primary tabs & borders',
    defaultHex: '#195aa7'
  },
  {
    key: 'primaryDark',
    labelEn: 'Primary Dark / Deep Navy',
    labelUr: 'گہرا نیلا رنگ (Footer)',
    description: 'High-contrast dark panels and footer bar',
    elements: 'Website footer background, utility accents, deep gradients',
    defaultHex: '#12437e'
  },
  {
    key: 'accent',
    labelEn: 'Action Accent (Orange/Christine)',
    labelUr: 'ایکشن اور بٹن کا رنگ',
    description: 'High-visibility action and CTA color',
    elements: 'Add to Cart, Buy Now, discount tags, VIP badges, highlights',
    defaultHex: '#eb5d0b'
  },
  {
    key: 'cyan',
    labelEn: 'Highlight Cyan (Eastern Blue)',
    labelUr: 'سیکنڈری ہائی لائٹ اور آئیکونز',
    description: 'Vibrant technical highlight color',
    elements: 'Trust badges, 360° lab borders, spec pills, technical icons',
    defaultHex: '#1ab8ec'
  },
  {
    key: 'surface',
    labelEn: 'Clinical Surface / Card Panels',
    labelUr: 'کارڈز کا بیک گراؤنڈ',
    description: 'Soft background for featured boxes and cards',
    elements: 'Section containers, guarantee boxes, product highlight panels',
    defaultHex: '#f4f8fc'
  },
  {
    key: 'bodyBg',
    labelEn: 'Page Background',
    labelUr: 'پوری ویب سائٹ کا بیک گراؤنڈ',
    description: 'Base document background tone',
    elements: 'Body background, page spacing canvas',
    defaultHex: '#f8fbfe'
  },
  {
    key: 'border',
    labelEn: 'Card Border Accent',
    labelUr: 'بارڈرز اور لکیریں',
    description: 'Clean demarcation line color for instrument cards',
    elements: 'Product cards border, divider lines, technical tables',
    defaultHex: '#d4e7f5'
  }
];

export const DeveloperColorStudio: React.FC = () => {
  const { 
    colors, 
    updateColor, 
    applyPreset, 
    resetToDefaults, 
    isDevModeOpen, 
    setIsDevModeOpen 
  } = useTheme();

  const [copiedKey, setCopiedKey] = useState<string | null>(null);
  const [copiedAll, setCopiedAll] = useState<boolean>(false);
  const [showHelp, setShowHelp] = useState<boolean>(false);
  const [isMinimized, setIsMinimized] = useState<boolean>(false);

  const handleCopySingle = (key: string, val: string) => {
    navigator.clipboard.writeText(val);
    setCopiedKey(key);
    setTimeout(() => setCopiedKey(null), 1800);
  };

  const handleCopyAll = () => {
    const jsonStr = JSON.stringify(colors, null, 2);
    navigator.clipboard.writeText(jsonStr);
    setCopiedAll(true);
    setTimeout(() => setCopiedAll(false), 2000);
  };

  const isValidHex = (hex: string) => {
    return /^#([0-9A-Fa-f]{3}|[0-9A-Fa-f]{6})$/.test(hex.trim());
  };

  return (
    <>
      {/* 1. Floating Trigger Button (Bottom Right) */}
      <div className="fixed bottom-5 right-5 z-50 flex flex-col items-end gap-2 print:hidden">
        {!isDevModeOpen && (
          <button
            onClick={() => setIsDevModeOpen(true)}
            aria-label="Open Developer Mode Color Studio"
            className="group flex items-center gap-2.5 bg-slate-900 hover:bg-black text-white px-4 py-3 rounded-2xl shadow-2xl border-2 border-emerald-400/80 hover:border-emerald-300 transition-all duration-300 transform hover:scale-105 active:scale-95 cursor-pointer"
          >
            <div className="relative flex items-center justify-center">
              <span className="absolute -top-1 -right-1 w-2.5 h-2.5 bg-emerald-400 rounded-full animate-ping" />
              <span className="w-2.5 h-2.5 bg-emerald-400 rounded-full" />
            </div>
            
            <div className="w-7 h-7 rounded-lg bg-gradient-to-tr from-[#195aa7] via-[#1ab8ec] to-[#eb5d0b] flex items-center justify-center text-white shadow-inner">
              <Palette className="w-4 h-4 text-white" />
            </div>

            <div className="text-left font-sans">
              <p className="text-[11px] font-black uppercase tracking-wider text-emerald-400 leading-none">
                Developer Mode
              </p>
              <p className="text-xs font-bold text-white leading-tight">
                Live Color Studio
              </p>
            </div>
          </button>
        )}
      </div>

      {/* 2. Developer Mode Slide-Over / Floating Modal */}
      {isDevModeOpen && (
        <div className="fixed bottom-4 right-4 z-50 w-[95vw] sm:w-[460px] max-h-[92vh] bg-white rounded-3xl shadow-2xl border-2 border-slate-300 flex flex-col overflow-hidden animate-in fade-in slide-in-from-bottom-5 duration-200">
          
          {/* Header Bar */}
          <div className="bg-slate-900 text-white p-4 sm:p-5 flex items-center justify-between border-b border-slate-800 shrink-0">
            <div className="flex items-center gap-3">
              <div className="w-9 h-9 rounded-xl bg-gradient-to-tr from-[#195aa7] via-[#1ab8ec] to-[#eb5d0b] flex items-center justify-center text-white shadow-md">
                <Palette className="w-5 h-5" />
              </div>
              <div>
                <div className="flex items-center gap-2">
                  <h3 className="text-sm sm:text-base font-black text-white tracking-tight">
                    Developer Mode: Colors
                  </h3>
                  <span className="flex items-center gap-1 px-2 py-0.5 rounded-full bg-emerald-500/20 text-emerald-300 border border-emerald-500/30 text-[10px] font-mono font-bold">
                    <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse" />
                    LIVE SYNC
                  </span>
                </div>
                <p className="text-[11px] text-slate-400 font-sans">
                  پورے ویب سائٹ کے تمام رنگ اسی وقت تبدیل کریں
                </p>
              </div>
            </div>

            <div className="flex items-center gap-1.5">
              <button
                onClick={() => setShowHelp(!showHelp)}
                title="How it works"
                className="p-1.5 text-slate-400 hover:text-white rounded-lg hover:bg-slate-800 transition-colors"
              >
                <HelpCircle className="w-4 h-4" />
              </button>
              <button
                onClick={() => setIsMinimized(!isMinimized)}
                title={isMinimized ? "Expand" : "Minimize"}
                className="p-1.5 text-slate-400 hover:text-white rounded-lg hover:bg-slate-800 transition-colors"
              >
                {isMinimized ? <ChevronUp className="w-4 h-4" /> : <ChevronDown className="w-4 h-4" />}
              </button>
              <button
                onClick={() => setIsDevModeOpen(false)}
                title="Close"
                className="p-1.5 text-slate-400 hover:text-red-400 rounded-lg hover:bg-slate-800 transition-colors"
              >
                <X className="w-5 h-5" />
              </button>
            </div>
          </div>

          {!isMinimized && (
            <div className="overflow-y-auto p-4 sm:p-5 space-y-5 divide-y divide-slate-100 flex-1">
              
              {/* Help Banner if toggled */}
              {showHelp && (
                <div className="bg-amber-50 border border-amber-200 rounded-2xl p-3.5 text-xs text-amber-900 space-y-1.5">
                  <p className="font-bold flex items-center gap-1 text-amber-800">
                    <Sparkles className="w-3.5 h-3.5 text-amber-600" />
                    رہنمائی / How to Use:
                  </p>
                  <p className="leading-relaxed">
                    1. <strong>Color Picker</strong> پر کلک کر کے اپنی مرضی کا کوئی بھی رنگ سلیکٹ کریں۔
                  </p>
                  <p className="leading-relaxed">
                    2. یا ٹیکسٹ باکس میں براہ راست ہیکس نمبر (مثلاً <code>#0288D1</code> یا <code>#10B981</code>) لکھیں۔
                  </p>
                  <p className="leading-relaxed text-emerald-800 font-semibold">
                    ہر تبدیلی اسی وقت پوری ویب سائٹ پر بغیر پیج ریفریش کیے لاگو ہو جاتی ہے اور براؤزر میں خود بخود سیو رہتی ہے!
                  </p>
                </div>
              )}

              {/* 1-Click Color Presets */}
              <div className="space-y-2.5 pt-1">
                <div className="flex items-center justify-between">
                  <span className="text-xs font-black uppercase tracking-wider text-slate-700 flex items-center gap-1.5">
                    <Sparkles className="w-3.5 h-3.5 text-amber-500" />
                    1-Click Themes (تیار کردہ کلر سیٹس)
                  </span>
                  <span className="text-[11px] text-slate-400 font-mono">6 presets</span>
                </div>

                <div className="grid grid-cols-2 sm:grid-cols-3 gap-2">
                  {COLOR_PRESETS.map((preset) => (
                    <button
                      key={preset.id}
                      onClick={() => applyPreset(preset.id)}
                      className="p-2.5 rounded-xl border border-slate-200 hover:border-slate-400 bg-slate-50 hover:bg-white text-left transition-all group flex flex-col justify-between gap-2 cursor-pointer shadow-xs hover:shadow-sm"
                    >
                      <div className="flex items-center gap-1.5">
                        <span 
                          className="w-4 h-4 rounded-full border border-black/10 shadow-xs shrink-0" 
                          style={{ backgroundColor: preset.colors.primary }}
                        />
                        <span 
                          className="w-4 h-4 rounded-full border border-black/10 shadow-xs shrink-0" 
                          style={{ backgroundColor: preset.colors.accent }}
                        />
                        <span 
                          className="w-4 h-4 rounded-full border border-black/10 shadow-xs shrink-0" 
                          style={{ backgroundColor: preset.colors.cyan }}
                        />
                      </div>
                      <div>
                        <p className="text-xs font-bold text-slate-800 leading-tight group-hover:text-[#195aa7] transition-colors">
                          {preset.name}
                        </p>
                      </div>
                    </button>
                  ))}
                </div>
              </div>

              {/* Individual Colors Editor */}
              <div className="space-y-3.5 pt-4">
                <div className="flex items-center justify-between">
                  <span className="text-xs font-black uppercase tracking-wider text-slate-700 flex items-center gap-1.5">
                    <Sliders className="w-3.5 h-3.5 text-[#195aa7]" />
                    Color Palette (کلر پکر اور نمبر ان پٹ)
                  </span>
                  <span className="text-[11px] text-slate-500 font-sans">
                    Live Real-Time
                  </span>
                </div>

                <div className="space-y-3">
                  {COLOR_FIELDS.map((field) => {
                    const currentColor = colors[field.key];
                    const isValid = isValidHex(currentColor);

                    return (
                      <div 
                        key={field.key} 
                        className="bg-slate-50 p-3 rounded-2xl border border-slate-200 hover:border-slate-300 transition-colors space-y-2"
                      >
                        <div className="flex items-start justify-between gap-2">
                          <div>
                            <div className="flex items-center gap-2">
                              <h4 className="text-xs font-bold text-slate-900 font-sans">
                                {field.labelEn}
                              </h4>
                              <span className="text-[10px] text-slate-500 font-mono">
                                ({field.labelUr})
                              </span>
                            </div>
                            <p className="text-[11px] text-slate-500 leading-tight mt-0.5">
                              {field.elements}
                            </p>
                          </div>

                          <span 
                            className="w-4 h-4 rounded-full border border-black/10 shrink-0 mt-0.5 shadow-xs"
                            style={{ backgroundColor: currentColor }}
                          />
                        </div>

                        {/* Dual Controls: Color Picker + Text Number Input */}
                        <div className="flex items-center gap-2.5">
                          
                          {/* 1. Visual Native Color Picker Input */}
                          <div className="relative shrink-0 flex items-center">
                            <input
                              type="color"
                              id={`picker-${field.key}`}
                              value={isValid ? currentColor : field.defaultHex}
                              onChange={(e) => updateColor(field.key, e.target.value)}
                              className="w-10 h-10 rounded-xl cursor-pointer border-2 border-slate-300 bg-white p-0.5 shadow-xs hover:scale-105 transition-transform"
                              title={`Choose visual color for ${field.labelEn}`}
                            />
                          </div>

                          {/* 2. Hex Code Input Field with '#' Prefix */}
                          <div className="relative flex-1">
                            <span className="absolute left-3 top-1/2 -translate-y-1/2 font-mono text-xs font-bold text-slate-400 select-none">
                              #
                            </span>
                            <input
                              type="text"
                              maxLength={7}
                              value={currentColor.startsWith('#') ? currentColor.slice(1) : currentColor}
                              onChange={(e) => {
                                const val = e.target.value.trim();
                                updateColor(field.key, val ? '#' + val : '#');
                              }}
                              placeholder="195aa7"
                              className={`w-full bg-white border ${
                                isValid ? 'border-slate-300 focus:border-[#195aa7]' : 'border-red-400 focus:border-red-500'
                              } rounded-xl pl-7 pr-8 py-2 text-xs sm:text-sm font-mono font-bold text-slate-800 uppercase focus:outline-none focus:ring-2 focus:ring-[#195aa7]/20 shadow-xs transition-colors`}
                            />
                            
                            {/* Copy button */}
                            <button
                              onClick={() => handleCopySingle(field.key, currentColor)}
                              title="Copy Hex Number"
                              className="absolute right-2.5 top-1/2 -translate-y-1/2 text-slate-400 hover:text-slate-700 p-1"
                            >
                              {copiedKey === field.key ? (
                                <Check className="w-3.5 h-3.5 text-emerald-600" />
                              ) : (
                                <Copy className="w-3.5 h-3.5" />
                              )}
                            </button>
                          </div>

                          {/* Reset this single color back to default */}
                          <button
                            onClick={() => updateColor(field.key, field.defaultHex)}
                            title={`Reset to default (${field.defaultHex})`}
                            className="text-[11px] font-mono text-slate-400 hover:text-slate-700 px-2 py-1.5 rounded-lg hover:bg-slate-200 transition-colors"
                          >
                            Default
                          </button>
                        </div>
                      </div>
                    );
                  })}
                </div>
              </div>

              {/* Bottom Utility Bar */}
              <div className="pt-4 flex flex-col sm:flex-row items-center justify-between gap-3">
                <button
                  onClick={resetToDefaults}
                  className="w-full sm:w-auto flex items-center justify-center gap-1.5 px-4 py-2.5 rounded-xl border-2 border-slate-300 hover:border-slate-400 bg-white hover:bg-slate-50 text-slate-700 font-bold text-xs uppercase tracking-wider transition-colors cursor-pointer"
                >
                  <RotateCcw className="w-3.5 h-3.5 text-slate-500" />
                  Reset Defaults (اصل رنگ بحال کریں)
                </button>

                <button
                  onClick={handleCopyAll}
                  className="w-full sm:w-auto flex items-center justify-center gap-1.5 px-4 py-2.5 rounded-xl bg-slate-900 hover:bg-black text-white font-bold text-xs uppercase tracking-wider transition-colors cursor-pointer shadow-sm"
                >
                  {copiedAll ? (
                    <>
                      <Check className="w-3.5 h-3.5 text-emerald-400" />
                      Copied JSON!
                    </>
                  ) : (
                    <>
                      <Copy className="w-3.5 h-3.5" />
                      Copy Palette JSON
                    </>
                  )}
                </button>
              </div>

            </div>
          )}

          {/* Collapsed view indicator */}
          {isMinimized && (
            <div className="p-3 bg-slate-50 text-center flex items-center justify-between px-5">
              <span className="text-xs text-slate-600 font-semibold flex items-center gap-2">
                <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse" />
                Color Studio Minimized (Colors are active)
              </span>
              <button
                onClick={() => setIsMinimized(false)}
                className="text-xs font-bold text-[#195aa7] hover:underline"
              >
                Expand Panel ↑
              </button>
            </div>
          )}

          {/* Footer note */}
          <div className="bg-slate-100 px-4 py-2 text-[10px] text-slate-500 font-mono text-center border-t border-slate-200">
            Medtrend Dev Studio • Real-Time CSS Injection • Auto-persisted in LocalStorage
          </div>

        </div>
      )}
    </>
  );
};
