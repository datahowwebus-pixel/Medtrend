export interface Product {
  id: string;
  code: string; // e.g. "MT-HF-001"
  name: string;
  category: string; // Main Folder (e.g. "General Surgery")
  subCategory: string; // Sub Folder (e.g. "Forceps & Clamps")
  folderPath: string; // "Our Products/General Surgery/Forceps & Clamps/MT-HF-001"
  price: number;
  wholesalePriceTiers: { minQty: number; price: number }[];
  rating: number;
  reviewCount: number;
  inStock: boolean;
  leadTimeDays: number;
  
  // Technical Specifications (from PDF Specs)
  size: string; // e.g. "14 cm (5.5 in)"
  material: string; // e.g. "AISI 420 German-Forged Stainless Steel"
  hardness: string; // e.g. "HRC 48-52"
  finish: 'Satin Matte' | 'Mirror Polish' | 'Tungsten Carbide Gold' | 'Blue Titanium' | 'Black Ceramic';
  availableFinishes: string[];
  tipType: string;
  jawType: string;
  autoclavable: boolean; // Autoclavable up to 134°C (273°F)
  origin: string; // "Sialkot, Pakistan"
  
  // Visuals & 3D
  imageFolder: string;
  images: string[];
  has3DModel: boolean;
  model3DType?: 'forceps' | 'scissors' | 'needle_holder' | 'retractor' | 'scalpel' | 'bone_rongeur';
  videoLoopUrl?: string;
  
  // Descriptions
  shortDesc: string;
  fullDesc: string;
  features: string[];
  applications: string[];
  packagingInfo: string;
  complianceNotes: string;
  isBestSeller?: boolean;
  isNew?: boolean;
  isFeatured?: boolean;
}

export interface CategoryTree {
  name: string; // Main Folder
  slug: string;
  description: string;
  iconName: string;
  folderPath: string; // "Our Products/General Surgery"
  imageUrl?: string;
  itemCount?: number;
  subCategories: {
    name: string;
    slug: string;
    itemCount: number;
    folderPath: string; // "Our Products/General Surgery/Forceps & Clamps"
    imageUrl?: string;
    description?: string;
  }[];
}

export interface CartItem {
  id: string;
  product: Product;
  quantity: number;
  selectedFinish: string;
  customEngraving?: string;
  isB2BQuote?: boolean;
}

export interface QuoteRequest {
  id?: string;
  companyName: string;
  contactPerson: string;
  email: string;
  phone: string;
  targetMarket: 'USA' | 'European Union' | 'GCC' | 'Worldwide' | 'Other';
  businessType: 'Hospital / Clinic' | 'Medical Distributor' | 'Wholesale Buyer' | 'OEM / Private Label' | 'Retail Customer';
  items: { productCode: string; productName: string; quantity: number; finish: string; customMarking?: string }[];
  customServices: {
    laserEngraving: boolean;
    customPackaging: boolean;
    oemManufacturing: boolean;
    customSurgicalSets: boolean;
  };
  specialInstructions: string;
  submittedAt: string;
}

export interface HeroSlide {
  id: number;
  folderReference: string; // e.g. "images/home/home-1.jpg"
  title: string;
  subtitle: string;
  tagline: string;
  description: string;
  badge: string;
  ctaText: string;
  ctaLink: string;
  secondaryCtaText: string;
  secondaryCtaLink: string;
  accentColor: string;
  previewCode: string;
  modelType: 'forceps' | 'scissors' | 'needle_holder' | 'retractor' | 'scalpel' | 'bone_rongeur';
  imageUrl?: string;
  categoryTag?: string;
  highlights?: string[];
  specsSummary?: { label: string; value: string }[];
}

export interface OrderTrackStatus {
  orderId: string;
  customerName: string;
  destinationCountry: string;
  status: 'Forging & Stamping' | 'Precision CNC Milling' | 'Passivation & Heat Treatment' | 'Laser Engraving' | 'Cleanroom QA Inspection' | 'In Transit (DHL Express)' | 'Delivered';
  stageIndex: number; // 0 to 5
  placedDate: string;
  estimatedDelivery: string;
  carrier: string;
  trackingNumber: string;
  items: { name: string; code: string; qty: number }[];
}
