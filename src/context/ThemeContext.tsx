import React, { createContext, useContext, useState, useEffect, useCallback } from 'react';

export interface ThemeColors {
  primary: string;       // #195aa7 (Main Brand Blue, Nav, Headings)
  primaryDark: string;   // #12437e (Navy, Footer, Top Bar)
  accent: string;        // #eb5d0b (Christine Orange, Action Buttons, Badges)
  accentDark: string;    // #d65106 (Hover states for action buttons)
  cyan: string;          // #1ab8ec (Eastern Blue, Icons, Trust Sub-accents)
  surface: string;       // #f4f8fc (Clinical Surface, Card background)
  bodyBg: string;        // #f8fbfe (Main page background)
  border: string;        // #d4e7f5 (Card borders)
}

export interface ColorPreset {
  id: string;
  name: string;
  description: string;
  colors: ThemeColors;
}

export const DEFAULT_THEME_COLORS: ThemeColors = {
  primary: '#195aa7',
  primaryDark: '#12437e',
  accent: '#eb5d0b',
  accentDark: '#d65106',
  cyan: '#1ab8ec',
  surface: '#f4f8fc',
  bodyBg: '#f8fbfe',
  border: '#d4e7f5',
};

export const COLOR_PRESETS: ColorPreset[] = [
  {
    id: 'medtrend-classic',
    name: 'MEDTREND® Classic',
    description: 'Original Royal Blue & Christine Orange brand styling',
    colors: { ...DEFAULT_THEME_COLORS }
  },
  {
    id: 'fehling-cyan',
    name: 'Surgical Cyan (Fehling Style)',
    description: 'Medical Sky Cyan with Deep Sapphire accents',
    colors: {
      primary: '#0288d1',
      primaryDark: '#01579b',
      accent: '#eb5d0b',
      accentDark: '#c2410c',
      cyan: '#00bcd4',
      surface: '#f0f9ff',
      bodyBg: '#f8fcfe',
      border: '#bae6fd',
    }
  },
  {
    id: 'medical-emerald',
    name: 'Clinical Emerald',
    description: 'Modern hospital cleanroom green & warm amber',
    colors: {
      primary: '#047857',
      primaryDark: '#064e3b',
      accent: '#d97706',
      accentDark: '#b45309',
      cyan: '#10b981',
      surface: '#f0fdf4',
      bodyBg: '#f7fee7',
      border: '#a7f3d0',
    }
  },
  {
    id: 'surgical-violet',
    name: 'Microsurgery Violet',
    description: 'High-contrast ophthalmic purple & rose coral',
    colors: {
      primary: '#6d28d9',
      primaryDark: '#4c1d95',
      accent: '#f43f5e',
      accentDark: '#e11d48',
      cyan: '#8b5cf6',
      surface: '#f5f3ff',
      bodyBg: '#faf5ff',
      border: '#ddd6fe',
    }
  },
  {
    id: 'titanium-stealth',
    name: 'Titanium Graphite',
    description: 'Dark surgical alloy slate with electric cyan',
    colors: {
      primary: '#0f172a',
      primaryDark: '#020617',
      accent: '#0284c7',
      accentDark: '#0369a1',
      cyan: '#06b6d4',
      surface: '#f1f5f9',
      bodyBg: '#f8fafc',
      border: '#cbd5e1',
    }
  },
  {
    id: 'cardio-ruby',
    name: 'Cardiovascular Crimson',
    description: 'Deep surgical ruby red with burnished gold',
    colors: {
      primary: '#9f1239',
      primaryDark: '#881337',
      accent: '#ea580c',
      accentDark: '#c2410c',
      cyan: '#f43f5e',
      surface: '#fff1f2',
      bodyBg: '#fff5f5',
      border: '#fecdd3',
    }
  }
];

function hexToRgb(hex: string): { r: number; g: number; b: number } {
  const cleanHex = hex.replace('#', '').trim();
  if (cleanHex.length === 3) {
    const r = parseInt(cleanHex[0] + cleanHex[0], 16) || 0;
    const g = parseInt(cleanHex[1] + cleanHex[1], 16) || 0;
    const b = parseInt(cleanHex[2] + cleanHex[2], 16) || 0;
    return { r, g, b };
  }
  if (cleanHex.length === 6) {
    const r = parseInt(cleanHex.substring(0, 2), 16) || 0;
    const g = parseInt(cleanHex.substring(2, 4), 16) || 0;
    const b = parseInt(cleanHex.substring(4, 6), 16) || 0;
    return { r, g, b };
  }
  return { r: 25, g: 90, b: 167 };
}

function injectDynamicThemeCSS(colors: ThemeColors) {
  const p = hexToRgb(colors.primary);
  const pd = hexToRgb(colors.primaryDark);
  const a = hexToRgb(colors.accent);
  const c = hexToRgb(colors.cyan);

  const css = `
    :root {
      --medtrend-primary: ${colors.primary};
      --medtrend-primary-rgb: ${p.r}, ${p.g}, ${p.b};
      --medtrend-primary-dark: ${colors.primaryDark};
      --medtrend-accent: ${colors.accent};
      --medtrend-accent-rgb: ${a.r}, ${a.g}, ${a.b};
      --medtrend-accent-dark: ${colors.accentDark};
      --medtrend-cyan: ${colors.cyan};
      --medtrend-cyan-rgb: ${c.r}, ${c.g}, ${c.b};
      --medtrend-surface: ${colors.surface};
      --medtrend-body-bg: ${colors.bodyBg};
      --medtrend-border: ${colors.border};

      --color-fun-blue: ${colors.primary} !important;
      --color-fun-blue-dark: ${colors.primaryDark} !important;
      --color-christine: ${colors.accent} !important;
      --color-christine-dark: ${colors.accentDark} !important;
      --color-eastern-blue: ${colors.cyan} !important;
      --color-clinical-surface: ${colors.surface} !important;
      --color-clinical-border: ${colors.border} !important;
    }

    /* 1. Primary Blue Overrides (#195aa7) */
    [class*="bg-[#195aa7]"] { background-color: ${colors.primary} !important; }
    [class*="bg-[#195aa7]/"] { background-color: rgba(${p.r}, ${p.g}, ${p.b}, 0.12) !important; }
    [class*="text-[#195aa7]"] { color: ${colors.primary} !important; }
    [class*="border-[#195aa7]"] { border-color: ${colors.primary} !important; }
    [class*="border-[#195aa7]/"] { border-color: rgba(${p.r}, ${p.g}, ${p.b}, 0.3) !important; }
    [class*="ring-[#195aa7]"] { --tw-ring-color: ${colors.primary} !important; }

    /* 2. Primary Dark / Footer Overrides (#12437e) */
    [class*="bg-[#12437e]"] { background-color: ${colors.primaryDark} !important; }
    [class*="text-[#12437e]"] { color: ${colors.primaryDark} !important; }
    [class*="border-[#12437e]"] { border-color: ${colors.primaryDark} !important; }

    /* 3. Accent Orange Overrides (#eb5d0b) */
    [class*="bg-[#eb5d0b]"] { background-color: ${colors.accent} !important; }
    [class*="bg-[#eb5d0b]/"] { background-color: rgba(${a.r}, ${a.g}, ${a.b}, 0.12) !important; }
    [class*="text-[#eb5d0b]"] { color: ${colors.accent} !important; }
    [class*="border-[#eb5d0b]"] { border-color: ${colors.accent} !important; }
    [class*="border-[#eb5d0b]/"] { border-color: rgba(${a.r}, ${a.g}, ${a.b}, 0.3) !important; }
    [class*="ring-[#eb5d0b]"] { --tw-ring-color: ${colors.accent} !important; }

    /* 4. Accent Dark / Hover Overrides (#d65106) */
    [class*="bg-[#d65106]"] { background-color: ${colors.accentDark} !important; }
    [class*="hover:bg-[#d65106]"]:hover { background-color: ${colors.accentDark} !important; }

    /* 5. Cyan / Eastern Blue Overrides (#1ab8ec) */
    [class*="bg-[#1ab8ec]"] { background-color: ${colors.cyan} !important; }
    [class*="bg-[#1ab8ec]/"] { background-color: rgba(${c.r}, ${c.g}, ${c.b}, 0.16) !important; }
    [class*="text-[#1ab8ec]"] { color: ${colors.cyan} !important; }
    [class*="border-[#1ab8ec]"] { border-color: ${colors.cyan} !important; }
    [class*="border-[#1ab8ec]/"] { border-color: rgba(${c.r}, ${c.g}, ${c.b}, 0.35) !important; }

    /* 6. Surface & Background Overrides (#f4f8fc, #f8fbfe) */
    [class*="bg-[#f4f8fc]"] { background-color: ${colors.surface} !important; }
    [class*="bg-[#f8fbfe]"] { background-color: ${colors.bodyBg} !important; }
    body { background-color: ${colors.bodyBg} !important; }

    /* 7. Named Helper Classes */
    .bg-fun-blue { background-color: ${colors.primary} !important; }
    .text-fun-blue { color: ${colors.primary} !important; }
    .border-fun-blue { border-color: ${colors.primary} !important; }
    .bg-christine { background-color: ${colors.accent} !important; }
    .text-christine { color: ${colors.accent} !important; }
    .border-christine { border-color: ${colors.accent} !important; }
    .bg-eastern-blue { background-color: ${colors.cyan} !important; }
    .text-eastern-blue { color: ${colors.cyan} !important; }
    .border-eastern-blue { border-color: ${colors.cyan} !important; }

    /* 8. Headings & Highlights */
    h1, h2, h3, h4, .font-display { color: ${colors.primary}; }
    
    /* 9. Gradients */
    [class*="from-[#195aa7]"] { --tw-gradient-from: ${colors.primary} var(--tw-gradient-from-position, ) !important; }
    [class*="via-[#144988]"] { --tw-gradient-via-stops: var(--tw-gradient-from) 0%, ${colors.primaryDark} 50%, var(--tw-gradient-to) 100% !important; }
    [class*="to-[#195aa7]"] { --tw-gradient-to: ${colors.primary} var(--tw-gradient-to-position, ) !important; }

    /* Scrollbar */
    ::-webkit-scrollbar-thumb { background: ${colors.cyan} !important; }
    ::-webkit-scrollbar-thumb:hover { background: ${colors.primary} !important; }
  `;

  let styleEl = document.getElementById('medtrend-theme-overrides');
  if (!styleEl) {
    styleEl = document.createElement('style');
    styleEl.id = 'medtrend-theme-overrides';
    document.head.appendChild(styleEl);
  }
  styleEl.innerHTML = css;
}

interface ThemeContextType {
  colors: ThemeColors;
  updateColor: (key: keyof ThemeColors, value: string) => void;
  applyPreset: (presetId: string) => void;
  resetToDefaults: () => void;
  isDevModeOpen: boolean;
  setIsDevModeOpen: (open: boolean) => void;
  toggleDevMode: () => void;
}

const ThemeContext = createContext<ThemeContextType | undefined>(undefined);

export const ThemeProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [colors, setColors] = useState<ThemeColors>(() => {
    try {
      const saved = localStorage.getItem('medtrend_custom_colors');
      if (saved) {
        const parsed = JSON.parse(saved);
        return { ...DEFAULT_THEME_COLORS, ...parsed };
      }
    } catch (e) {
      console.error('Error loading saved colors:', e);
    }
    return DEFAULT_THEME_COLORS;
  });

  const [isDevModeOpen, setIsDevModeOpen] = useState<boolean>(false);

  // Apply colors live to the document on every change
  useEffect(() => {
    injectDynamicThemeCSS(colors);
    try {
      localStorage.setItem('medtrend_custom_colors', JSON.stringify(colors));
    } catch (e) {
      console.error(e);
    }
  }, [colors]);

  const updateColor = useCallback((key: keyof ThemeColors, value: string) => {
    let cleanVal = value.trim();
    if (!cleanVal.startsWith('#') && /^[0-9a-fA-F]{3,6}$/.test(cleanVal)) {
      cleanVal = '#' + cleanVal;
    }
    setColors(prev => {
      const next = { ...prev, [key]: cleanVal };
      // Auto-compute accentDark if accent was modified
      if (key === 'accent') {
        // If it's a valid 6-char hex, darken slightly for hover
        const rgb = hexToRgb(cleanVal);
        const darkR = Math.max(0, Math.floor(rgb.r * 0.85));
        const darkG = Math.max(0, Math.floor(rgb.g * 0.85));
        const darkB = Math.max(0, Math.floor(rgb.b * 0.85));
        next.accentDark = `#${darkR.toString(16).padStart(2, '0')}${darkG.toString(16).padStart(2, '0')}${darkB.toString(16).padStart(2, '0')}`;
      }
      return next;
    });
  }, []);

  const applyPreset = useCallback((presetId: string) => {
    const preset = COLOR_PRESETS.find(p => p.id === presetId);
    if (preset) {
      setColors(preset.colors);
    }
  }, []);

  const resetToDefaults = useCallback(() => {
    setColors({ ...DEFAULT_THEME_COLORS });
    try {
      localStorage.removeItem('medtrend_custom_colors');
    } catch (e) {
      console.error(e);
    }
  }, []);

  const toggleDevMode = useCallback(() => {
    setIsDevModeOpen(prev => !prev);
  }, []);

  return (
    <ThemeContext.Provider
      value={{
        colors,
        updateColor,
        applyPreset,
        resetToDefaults,
        isDevModeOpen,
        setIsDevModeOpen,
        toggleDevMode
      }}
    >
      {children}
    </ThemeContext.Provider>
  );
};

export const useTheme = () => {
  const context = useContext(ThemeContext);
  if (!context) {
    throw new Error('useTheme must be used within a ThemeProvider');
  }
  return context;
};
