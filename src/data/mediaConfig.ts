/**
 * Centralized Media & Asset Folder Architecture
 * 
 * Images and videos are cleanly arranged in public folder categories:
 * - public/images/home/         -> Hero slides and main banners (home-1.jpg, home-2.jpg, home-3.jpg)
 * - public/images/products/     -> Surgical product photography (organized by SKU or Category)
 * - public/images/3d-models/    -> 360° interactive turntable videos (MT-HF-001-loop.mp4, etc.)
 * - public/images/about/        -> Sialkot facility & metallurgy photos
 */

export const MEDIA_ASSETS = {
  // Hero Carousel & Homepage Banners
  hero: {
    slide1: '/images/home/home-1.jpg',
    slide2: '/images/home/home-2.jpg',
    slide3: '/images/home/home-3.jpg',
    // Fallback if home images not available
    fallback1: '/surgical1.jpg',
    fallback2: '/surgical2.jpg',
    fallback3: '/surgical3.jpg',
  },

  // 360° Inspection Loops (Duckworth & Kent / GerMedUSA style interactive viewer)
  loops: {
    forceps16x9: '/3dslide1.mp4',
    tweezers16x9: '/3dslide2.mp4',
    scissors9x16: '/MT-HF-002-loop.mp4',
    scalpel9x16: '/MT-HF-001-loop.mp4',
  },

  // Product Catalog Photography (Fallback chain ensures zero broken images)
  products: {
    forceps: '/surgical1.jpg',
    scissors: '/surgical2.jpg',
    tweezers: '/surgical3.jpg',
    sets: '/surgical3.jpg',
    needleHolders: '/surgical1.jpg',
    retractors: '/surgical2.jpg',
    scalpels: '/surgical1.jpg',
    dental: '/surgical2.jpg',
    orthopedic: '/surgical3.jpg',
  },

  // About & Facility
  about: {
    facility1: '/images/home/home-1.jpg',
    cleanroom: '/images/home/home-2.jpg',
    metallurgy: '/images/home/home-3.jpg',
  }
};

/**
 * Safe Image Resolver: Returns valid image path with graceful fallback
 */
export const getSafeImage = (url?: string, fallback: string = '/surgical1.jpg'): string => {
  if (!url || url.trim() === '') return fallback;
  return url;
};
