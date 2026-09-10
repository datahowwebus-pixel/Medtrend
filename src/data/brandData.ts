import { HeroSlide } from '../types';

export const BRAND_CONFIG = {
  companyName: 'Medtrend Pvt. Ltd.',
  brandName: 'MEDTREND®',
  fullLegalName: 'Medtrend Pvt. Ltd. Surgical & Medical Instruments',
  origin: 'Sialkot, Pakistan',
  primaryMarkets: ['United States', 'European Union', 'GCC Countries', 'Worldwide'],
  taglines: {
    primary: 'Precision You Can Trust.',
    alternatives: [
      'Precision in Every Instrument',
      'Crafted for Precision. Built for Care.',
      'Precision Instruments. Global Confidence.',
      'Engineering Surgical Precision',
      'From Sialkot to the World'
    ]
  },
  positioningStatement: 'MEDTREND® is a Pakistan-based surgical and medical instruments brand delivering professionally manufactured instruments from Sialkot to customers worldwide. Combining skilled manufacturing, precision-focused production and modern global commerce, Medtrend serves healthcare professionals, institutions, distributors, retailers and OEM partners across international markets.',
  pillars: [
    { title: 'Sialkot Craftsmanship', desc: 'Over a century of world-renowned metallurgical heritage and hand-finished craftsmanship.' },
    { title: 'Engineering Precision', desc: 'CNC tolerances within ±0.02mm, German-grade forging dies, and Rockwell HRC 48-52 heat treatment.' },
    { title: 'Dual Commerce Model', desc: 'Seamless retail e-commerce for individual surgeons and scalable supply for global B2B hospital distributors.' },
    { title: 'OEM & Private Label', desc: 'Custom laser etching, bespoke surgical set configurations, and certified private labeling.' }
  ],
  colors: {
    primarySky: '#0288D1',
    lightCyan: '#B3E5FC',
    deepNavy: '#0B2838',
    softIceBlue: '#F8FCFE',
    vibrantBlue: '#29B6F6',
    deepSapphire: '#01579B'
  },
  folderStructureGuide: {
    description: 'Medtrend uses a strict hierarchical folder architecture for website assets and product inventory images.',
    rootDirectories: [
      {
        folder: 'public/images/home/',
        purpose: 'Hero slides and home page banners',
        namingConvention: 'home-1.jpg, home-2.jpg, home-3.jpg',
        resolution: '1920x1080 (WebP / Compressed JPG)',
        howToChange: 'Replace the files inside /images/home/ with the same names or use the interactive Image Manager in the top navbar to toggle custom URLs.'
      },
      {
        folder: 'public/images/about/',
        purpose: 'About page, Sialkot factory heritage, metallurgy and cleanroom photos',
        namingConvention: 'about-1.jpg, about-2.jpg, about-3.jpg',
        resolution: '1440x900',
        howToChange: 'Drop replacement images inside /images/about/ with matching sequential filenames.'
      },
      {
        folder: 'public/images/products/Our Products/',
        purpose: 'Main catalog structure. Any main folder here automatically acts as a Main Category, and sub-folders act as Sub-Categories.',
        namingConvention: 'Our Products/[Main Category]/[Sub Category]/[product-code].jpg',
        examples: [
          'Our Products/General Surgery/Forceps & Clamps/MT-HF-001.jpg',
          'Our Products/General Surgery/Surgical Scissors/MT-SC-004.jpg',
          'Our Products/Dental Instruments/Extraction Forceps/MT-DS-019.jpg',
          'Our Products/Orthopedic Instruments/Bone Ronguers/MT-OR-022.jpg'
        ],
        howToChange: 'Add or modify images inside the corresponding category and subcategory folder paths.'
      },
      {
        folder: 'public/images/3d-models/',
        purpose: '3D interactive CAD turntable textures and 2-10 second looping video clips',
        namingConvention: 'forceps-loop.mp4, scissors-3d.glb, retractor-360.webp',
        resolution: '60fps WebM/MP4 video loop or 360-degree image sequence'
      }
    ]
  }
};

export const DEFAULT_HERO_SLIDES: HeroSlide[] = [
  {
    id: 1,
    folderReference: 'images/home/home-1.jpg',
    imageUrl: '/images/home/home-1.jpg',
    categoryTag: 'Direct Sialkot Forge Access',
    title: 'We Not Only Sell, But Also MANUFACTURE Our Surgical Instruments',
    subtitle: 'Direct German Stainless Steel Forge to Operating Room',
    tagline: 'Direct Forge Pricing • Zero Middlemen',
    description: 'Eliminate broker and distributor markups. Order precision surgical instruments engineered from medical-grade German AISI 420 martensitic steel directly from our master Sialkot forge with ISO 13485 & CE certification.',
    badge: 'DIRECT FORGE MANUFACTURER • ISO 13485 & CE',
    ctaText: 'Shop Surgical Instruments',
    ctaLink: '/products',
    secondaryCtaText: 'Explore Specialty Sets',
    secondaryCtaLink: '/products',
    accentColor: '#0288D1',
    previewCode: 'MT-HF-002',
    modelType: 'forceps',
    highlights: [
      'Drop-forged German AISI 420 martensitic surgical steel',
      'Direct forge pricing — Save up to 45% vs traditional distributors',
      '100% steam autoclave compliant (134°C sterilization)'
    ],
    specsSummary: [
      { label: 'Hardness', value: 'HRC 54 ± 2' },
      { label: 'Tolerance', value: '±0.02 mm' },
      { label: 'Dispatch', value: '24-48h DHL' }
    ]
  },
  {
    id: 2,
    folderReference: 'images/home/home-2.jpg',
    imageUrl: '/images/home/home-2.jpg',
    categoryTag: 'Custom Modifications & OEM Blueprints',
    title: 'Custom Surgical Instrument Manufacturing',
    subtitle: 'Have an Instrument in Mind? Let\'s Start the Project.',
    tagline: 'Bespoke Blueprints • Custom Curvatures & Jaws',
    description: 'Need modified jaw angles, specialized micro tips, titanium alloys, or custom laser engraving? Our master instrument artisans bring your surgical concept from technical drawing to sterile OR deployment.',
    badge: 'CUSTOM DESIGN & OEM • RAPID PROTOTYPING',
    ctaText: 'Start Custom Project',
    ctaLink: '/b2b-wholesale',
    secondaryCtaText: 'Request Custom Quote',
    secondaryCtaLink: '/b2b-wholesale',
    accentColor: '#eb5d0b',
    previewCode: 'MT-SC-004',
    modelType: 'scissors',
    highlights: [
      'Custom jaw angles, lengths, curvatures & micro tips',
      'Complimentary high-precision fiber laser logo & serial marking',
      'Rapid CAD technical prototyping & expedited sample dispatch'
    ],
    specsSummary: [
      { label: 'Custom CAD', value: '24-48 Hours' },
      { label: 'Laser Etch', value: 'Complimentary' },
      { label: 'Prototype MOQ', value: 'From 1 Unit' }
    ]
  },
  {
    id: 3,
    folderReference: 'images/home/home-3.jpg',
    imageUrl: '/images/home/home-3.jpg',
    categoryTag: 'Cardiovascular • Orthopedic • Ophthalmic • ENT',
    title: 'Over 15,000+ Specialty Surgical Instruments',
    subtitle: 'Turnkey Procedure Trays for Operating Rooms & Clinics',
    tagline: 'Precision You Can Trust In The OR',
    description: 'Complete procedure instrument sets forged for cardiovascular, orthopedic trauma, spinal, microsurgery, and general surgery suites. Ergonomically balanced to eliminate surgeon hand fatigue.',
    badge: '15,000+ SKUS • COMPLETE PROCEDURE TRAYS',
    ctaText: 'View Specialty Sets',
    ctaLink: '/products',
    secondaryCtaText: 'Download Catalog (PDF)',
    secondaryCtaLink: '/catalog-datasheets',
    accentColor: '#1ab8ec',
    previewCode: 'MT-TF-005',
    modelType: 'forceps',
    highlights: [
      'Gold-ring Tungsten Carbide inlays for 5x extended cutting edge life',
      'Atraumatic micro-serrations protecting delicate tissue and vasculature',
      'Pre-configured hospital procedure trays ready to ship immediately'
    ],
    specsSummary: [
      { label: 'Inlays', value: 'Tungsten Carbide' },
      { label: 'Cycles', value: '1,000+ Autoclave' },
      { label: 'Catalog SKUs', value: '15,000+ Ready' }
    ]
  },
  {
    id: 4,
    folderReference: 'images/home/home-1.jpg',
    imageUrl: '/images/home/home-1.jpg',
    categoryTag: 'Uncompromising Quality & Standards',
    title: '5-Year Warranty & Lifetime Guarantee Against Defects',
    subtitle: 'Tested Under Real-World Surgical Rigor',
    tagline: 'ASTM F899 Medical Metallurgy • 100% Passivated',
    description: 'Every instrument undergoes 100% optical inspection, microscopic edge honing, ultrasonic passivation, and rigorous corrosion resistance validation according to ASTM F899 standards.',
    badge: 'LIFETIME GUARANTEE • 100% PASSIVATED',
    ctaText: 'Browse Best Sellers',
    ctaLink: '/products',
    secondaryCtaText: '360° Inspection Lab',
    secondaryCtaLink: '/showcase-3d',
    accentColor: '#059669',
    previewCode: 'MT-NH-012',
    modelType: 'needle_holder',
    highlights: [
      'Calibrated Rockwell hardness HRC 54±2 for optimal elasticity & strength',
      'Ultrasonic chemical passivation for lifetime corrosion immunity',
      'Risk-free 30-day trial for hospital surgical committees'
    ],
    specsSummary: [
      { label: 'Warranty', value: '5-Year & Lifetime' },
      { label: 'Passivation', value: 'ASTM A967' },
      { label: 'Returns', value: '30-Day Risk Free' }
    ]
  }
];

export const INITIAL_HERO_SLIDES = DEFAULT_HERO_SLIDES;

export interface BrandGuidelineSection {
  sectionNumber: number;
  category: string;
  title: string;
  points: string[];
}

export const BRAND_GUIDELINES_SECTIONS: BrandGuidelineSection[] = [
  {
    sectionNumber: 1,
    category: 'Brand Foundations',
    title: 'Brand Identity & Legal Name',
    points: [
      'Brand Name: MEDTREND® (Medtrend Pvt. Ltd.)',
      'Origin: Sialkot, Pakistan — the global capital of surgical manufacturing',
      'Target Markets: United States, European Union, GCC countries & Worldwide'
    ]
  },
  {
    sectionNumber: 2,
    category: 'Brand Foundations',
    title: 'Taglines & Brand Promises',
    points: [
      'Primary Tagline: "Precision You Can Trust."',
      'Alternative: "Crafted for Precision. Built for Care."',
      'Alternative: "Engineering Surgical Precision"',
      'Alternative: "From Sialkot to the World"'
    ]
  },
  {
    sectionNumber: 3,
    category: 'Commercial Architecture',
    title: 'Dual Commerce Structure (B2B + B2C)',
    points: [
      'B2C: Individual retail purchases for clinics and surgeons with instant cart checkout',
      'B2B: Multi-tier institutional volume pricing (50+, 100+, 500+, 1,000+ units)',
      'Direct RFQ generator with instant customized PDF specs'
    ]
  },
  {
    sectionNumber: 4,
    category: 'Asset & Directory System',
    title: 'Hierarchical Folder Architecture',
    points: [
      'Home Page: public/images/home/home-1.jpg, home-2.jpg, home-3.jpg',
      'About Page: public/images/about/about-1.jpg, about-2.jpg, about-3.jpg',
      'Catalog: public/images/products/Our Products/[Category]/[Sub Category]/[SKU].jpg',
      'Automatic folder-to-taxonomy mapping for instant category generation'
    ]
  },
  {
    sectionNumber: 5,
    category: 'Interactive 3D & Video Loops',
    title: 'Next-Gen 3D Simulation & 10s Loops',
    points: [
      'Interactive 360° rotation with full mouse and touch dragging controls',
      'Continuous 2-second turbo loops and 10-second ultra-smooth video showcases',
      'Live metallurgy finish switcher: Satin Matte, Mirror Polish, TC Gold, Blue Ti, Ceramic',
      'Real-time laser engraving preview on instrument shank'
    ]
  },
  {
    sectionNumber: 6,
    category: 'Engineering & Metallurgy',
    title: 'German DIN Metallurgy & Heat Treatment',
    points: [
      'AISI 420 & 440 German-forged surgical stainless steel',
      'Rockwell Hardness: HRC 48-52 (Cutting blades) / HRC 68+ (Tungsten Carbide inserts)',
      'ASTM A967 chemical passivation creating corrosion-resistant chromium-oxide barrier'
    ]
  },
  {
    sectionNumber: 7,
    category: 'OEM & Customization',
    title: 'Private Label & Laser Customization',
    points: [
      'Free custom fiber-laser marking for hospitals and clinics (up to 20 chars)',
      'Custom color-coded silicone handle rings and sterilization cassettes',
      'Turnkey private labeling with custom blister packs and barcoded boxes'
    ]
  },
  {
    sectionNumber: 8,
    category: 'Regulatory & Quality Space',
    title: 'Regulatory Transparency & Standards Space',
    points: [
      'ISO 13485:2016 Medical Devices Quality Management System',
      'CE Mark Declaration space conforming to EU MDR 2017/745 Class I reusable standards',
      'Autoclave tested up to 134°C (273°F) for 1,000+ steam sterilization cycles'
    ]
  }
];

export const SIALKOT_MANUFACTURING_STORY = {
  heading: 'The Sialkot Heritage & German Precision Metallurgy',
  paragraphs: [
    'For generations, Sialkot, Pakistan has stood as the undisputed global capital of surgical instrument craftsmanship, supplying over 70% of the world’s hand-held medical instruments.',
    'MEDTREND® unites this revered artisan heritage with state-of-the-art CNC micro-milling, robotic forging dies, and German DIN-standard medical metallurgy (AISI 410, 420, and 440 stainless steel grades).',
    'Every single instrument undergoes a rigorous 7-stage quality protocol: raw material spectrometric analysis, precision drop-forging, CNC jaw profiling, vacuum heat treatment, ultrasonic chemical passivation, fiber-laser marking, and microscope-guided blade tensioning.'
  ],
  stats: [
    { label: 'Export Markets', value: '38+ Countries' },
    { label: 'Tolerances', value: '±0.02 mm' },
    { label: 'Autoclave Cycles', value: '1,000+ Cycles' },
    { label: 'Catalog SKUs', value: '1,200+ Codes' }
  ]
};
