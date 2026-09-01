import { Product, CategoryTree } from '../types';

export const CATEGORIES_TREE: CategoryTree[] = [
  {
    name: 'General Surgery',
    slug: 'general-surgery',
    description: 'Precision forceps, scissors, needle holders, clamps, and retractors for operating theaters.',
    iconName: 'Scissors',
    folderPath: 'Our Products/General Surgery',
    imageUrl: '/surgical1.jpg',
    itemCount: 8,
    subCategories: [
      { 
        name: 'Forceps & Clamps', 
        slug: 'forceps-clamps', 
        itemCount: 4, 
        folderPath: 'Our Products/General Surgery/Forceps & Clamps',
        imageUrl: '/surgical1.jpg',
        description: 'Hemostatic Kelly, Halsted Mosquito, and Allis tissue grasping clamps with 3-step ratchets.'
      },
      { 
        name: 'Surgical Scissors', 
        slug: 'surgical-scissors', 
        itemCount: 3, 
        folderPath: 'Our Products/General Surgery/Surgical Scissors',
        imageUrl: '/surgical2.jpg',
        description: 'Metzenbaum TC dissecting scissors, heavy Mayo dissecting scissors, and fine Iris scissors.'
      },
      { 
        name: 'Needle Holders', 
        slug: 'needle-holders', 
        itemCount: 2, 
        folderPath: 'Our Products/General Surgery/Needle Holders',
        imageUrl: '/surgical3.jpg',
        description: 'Mayo-Hegar TC cross-hatched jaw needle holders and micro-ratchet drivers.'
      },
      { 
        name: 'Retractors & Speculums', 
        slug: 'retractors-speculums', 
        itemCount: 2, 
        folderPath: 'Our Products/General Surgery/Retractors & Speculums',
        imageUrl: '/surgical1.jpg',
        description: 'Weitlaner self-retaining retractors, Senn handheld hooks, and abdominal wound retractors.'
      },
      { 
        name: 'Scalpel Handles & Blades', 
        slug: 'scalpel-handles', 
        itemCount: 2, 
        folderPath: 'Our Products/General Surgery/Scalpel Handles & Blades',
        imageUrl: '/surgical2.jpg',
        description: 'Bard-Parker graduated handles #3 & #4 and precision knurled cylindrical handles.'
      }
    ]
  },
  {
    name: 'Dental Instruments',
    slug: 'dental-instruments',
    description: 'Specialized extraction forceps, root elevators, periodontal scalers, and diagnostic tools.',
    iconName: 'Sparkles',
    folderPath: 'Our Products/Dental Instruments',
    imageUrl: '/surgical2.jpg',
    itemCount: 5,
    subCategories: [
      { 
        name: 'Extraction Forceps', 
        slug: 'extraction-forceps', 
        itemCount: 2, 
        folderPath: 'Our Products/Dental Instruments/Extraction Forceps',
        imageUrl: '/surgical2.jpg',
        description: 'Universal #150 upper, #151 lower, and anatomical molar extraction forceps.'
      },
      { 
        name: 'Root Elevators & Luxators', 
        slug: 'root-elevators', 
        itemCount: 2, 
        folderPath: 'Our Products/Dental Instruments/Root Elevators & Luxators',
        imageUrl: '/surgical3.jpg',
        description: 'Cryer left/right elevators, straight 34S luxators, and apical root tip pickers.'
      },
      { 
        name: 'Scalers & Curettes', 
        slug: 'scalers-curettes', 
        itemCount: 2, 
        folderPath: 'Our Products/Dental Instruments/Scalers & Curettes',
        imageUrl: '/surgical1.jpg',
        description: 'Gracey subgingival curettes, universal H6/H7 sickle scalers, and titanium implant scalers.'
      }
    ]
  },
  {
    name: 'Orthopedic Instruments',
    slug: 'orthopedic-instruments',
    description: 'Heavy-duty bone rongeurs, osteotomes, bone holding forceps, wire cutters, and orthopedic mallets.',
    iconName: 'Activity',
    folderPath: 'Our Products/Orthopedic Instruments',
    imageUrl: '/surgical3.jpg',
    itemCount: 4,
    subCategories: [
      { 
        name: 'Bone Rongeurs', 
        slug: 'bone-rongeurs', 
        itemCount: 2, 
        folderPath: 'Our Products/Orthopedic Instruments/Bone Rongeurs',
        imageUrl: '/surgical3.jpg',
        description: 'Friedman double-action compound rongeurs and Ruskin bone nibblers.'
      },
      { 
        name: 'Osteotomes & Bone Chisels', 
        slug: 'osteotomes-chisels', 
        itemCount: 2, 
        folderPath: 'Our Products/Orthopedic Instruments/Osteotomes & Bone Chisels',
        imageUrl: '/surgical1.jpg',
        description: 'Lambotte calibrated straight/curved osteotomes and orthopedic lead-filled mallets.'
      },
      { 
        name: 'Bone Holding Forceps', 
        slug: 'bone-holding-forceps', 
        itemCount: 2, 
        folderPath: 'Our Products/Orthopedic Instruments/Bone Holding Forceps',
        imageUrl: '/surgical2.jpg',
        description: 'Verbrugge bone clamps, Kern self-centering bone forceps, and cerclage wire cutters.'
      }
    ]
  },
  {
    name: 'Gynecology & Obstetrics',
    slug: 'gynecology-obstetrics',
    description: 'Cusco & Graves vaginal speculums, uterine dressing forceps, dilators, and biopsy punches.',
    iconName: 'Shield',
    folderPath: 'Our Products/Gynecology & Obstetrics',
    imageUrl: '/surgical1.jpg',
    itemCount: 4,
    subCategories: [
      { 
        name: 'Vaginal Speculums', 
        slug: 'vaginal-speculums', 
        itemCount: 2, 
        folderPath: 'Our Products/Gynecology & Obstetrics/Vaginal Speculums',
        imageUrl: '/surgical1.jpg',
        description: 'Cusco insulated and stainless speculums and Graves adjustable bi-valve speculums.'
      },
      { 
        name: 'Uterine & Dressing Forceps', 
        slug: 'uterine-forceps', 
        itemCount: 2, 
        folderPath: 'Our Products/Gynecology & Obstetrics/Uterine & Dressing Forceps',
        imageUrl: '/surgical2.jpg',
        description: 'Bozeman S-curved uterine dressing forceps, Foerster sponge clamps, and Sims uterine sound.'
      }
    ]
  },
  {
    name: 'ENT & Ophthalmic',
    slug: 'ent-ophthalmic',
    description: 'Ultra-delicate micro instruments, Castroviejo needle holders, Hartmann ear forceps, nasal speculums.',
    iconName: 'Eye',
    folderPath: 'Our Products/ENT & Ophthalmic',
    imageUrl: '/surgical2.jpg',
    itemCount: 4,
    subCategories: [
      { 
        name: 'Micro Scissors & Forceps', 
        slug: 'micro-scissors-forceps', 
        itemCount: 2, 
        folderPath: 'Our Products/ENT & Ophthalmic/Micro Scissors & Forceps',
        imageUrl: '/surgical2.jpg',
        description: 'Castroviejo titanium needle holders, Vannas micro spring scissors, and jeweler bipolar forceps.'
      },
      { 
        name: 'Nasal & Ear Speculums', 
        slug: 'nasal-ear-speculums', 
        itemCount: 2, 
        folderPath: 'Our Products/ENT & Ophthalmic/Nasal & Ear Speculums',
        imageUrl: '/surgical3.jpg',
        description: 'Hartmann alligator ear forceps, Killian nasal speculums, and Lucae tuning forks.'
      }
    ]
  },
  {
    name: 'Surgical Sets',
    slug: 'surgical-sets',
    description: 'Comprehensive autoclave-ready surgical kits in custom stainless steel sterilization cassettes.',
    iconName: 'Box',
    folderPath: 'Our Products/Surgical Sets',
    imageUrl: '/surgical3.jpg',
    itemCount: 3,
    subCategories: [
      { 
        name: 'Minor Surgery Sets', 
        slug: 'minor-surgery-sets', 
        itemCount: 2, 
        folderPath: 'Our Products/Surgical Sets/Minor Surgery Sets',
        imageUrl: '/surgical3.jpg',
        description: '14-piece executive minor surgery kits with TC instruments in DIN silicone cassettes.'
      },
      { 
        name: 'Specialty Master Sets', 
        slug: 'specialty-master-sets', 
        itemCount: 2, 
        folderPath: 'Our Products/Surgical Sets/Specialty Master Sets',
        imageUrl: '/surgical1.jpg',
        description: 'Major laparotomy sets, orthopedic bone plating sets, and dental extraction master kits.'
      }
    ]
  },
  {
    name: 'Cardiovascular & Thoracic',
    slug: 'cardiovascular-thoracic',
    description: 'Atraumatic DeBakey vascular clamps, Satinsky vena cava clamps, and sternal retractors.',
    iconName: 'Activity',
    folderPath: 'Our Products/Cardiovascular & Thoracic',
    imageUrl: '/surgical1.jpg',
    itemCount: 3,
    subCategories: [
      { 
        name: 'Vascular Clamps', 
        slug: 'vascular-clamps', 
        itemCount: 2, 
        folderPath: 'Our Products/Cardiovascular & Thoracic/Vascular Clamps',
        imageUrl: '/surgical1.jpg',
        description: 'DeBakey multi-purpose atraumatic clamps and Satinsky tangential occlusion clamps.'
      },
      { 
        name: 'Vascular Needle Holders', 
        slug: 'vascular-needle-holders', 
        itemCount: 2, 
        folderPath: 'Our Products/Cardiovascular & Thoracic/Vascular Needle Holders',
        imageUrl: '/surgical2.jpg',
        description: 'Ryder micro vascular needle holders and Castroviejo coronary anastomosis holders.'
      }
    ]
  },
  {
    name: 'Plastic & Reconstructive Surgery',
    slug: 'plastic-surgery',
    description: 'SuperCut dissecting scissors, delicate skin hooks, Joseph nasal saws, and caliper gauges.',
    iconName: 'Sparkles',
    folderPath: 'Our Products/Plastic & Reconstructive Surgery',
    imageUrl: '/surgical2.jpg',
    itemCount: 3,
    subCategories: [
      { 
        name: 'Facelift & Dissecting Scissors', 
        slug: 'facelift-scissors', 
        itemCount: 2, 
        folderPath: 'Our Products/Plastic & Reconstructive Surgery/Facelift & Dissecting Scissors',
        imageUrl: '/surgical2.jpg',
        description: 'Gorney-Freeman TC facelift scissors and SuperCut micro-serrated dissecting scissors.'
      },
      { 
        name: 'Skin Hooks & Micro Retractors', 
        slug: 'skin-hooks', 
        itemCount: 2, 
        folderPath: 'Our Products/Plastic & Reconstructive Surgery/Skin Hooks & Micro Retractors',
        imageUrl: '/surgical3.jpg',
        description: 'Joseph double skin hooks, Converse alar retractors, and Castroviejo caliper gauges.'
      }
    ]
  }
];

export const PRODUCTS: Product[] = [
  // General Surgery -> Forceps & Clamps
  {
    id: 'prod-mt-hf-001',
    code: 'MT-HF-001',
    name: 'Kelly Hemostatic Forceps Curved',
    category: 'General Surgery',
    subCategory: 'Forceps & Clamps',
    folderPath: 'Our Products/General Surgery/Forceps & Clamps/MT-HF-001',
    price: 34.50,
    wholesalePriceTiers: [
      { minQty: 10, price: 24.00 },
      { minQty: 50, price: 18.50 },
      { minQty: 200, price: 14.20 },
      { minQty: 1000, price: 11.00 }
    ],
    rating: 4.9,
    reviewCount: 48,
    inStock: true,
    leadTimeDays: 2,
    size: '14.0 cm (5.5 in)',
    material: 'AISI 420 German-Forged Stainless Steel',
    hardness: 'HRC 50-52',
    finish: 'Satin Matte',
    availableFinishes: ['Satin Matte', 'Mirror Polish', 'Blue Titanium', 'Black Ceramic'],
    tipType: 'Curved Serrated Jaws (Half-length)',
    jawType: 'Precision Interlocking Ratchet Box-Lock',
    autoclavable: true,
    origin: 'Sialkot, Pakistan',
    imageFolder: 'images/products/Our Products/General Surgery/Forceps & Clamps/MT-HF-001/',
    images: [
      '/surgical1.jpg',
      '/surgical2.jpg',
      '/surgical3.jpg'
    ],
    has3DModel: true,
    model3DType: 'forceps',
    videoLoopUrl: '/images/3d-models/MT-HF-002-loop.mp4',
    shortDesc: 'Precision-curved hemostatic forceps for occluding small-to-medium blood vessels with non-slip grip.',
    fullDesc: 'MEDTREND® Kelly Hemostatic Forceps (MT-HF-001) are hot-drop forged in Sialkot from certified German stainless steel. Features a 3-position positive-locking ratchet and cross-serrated inner jaws engineered for definitive vessel occlusion without traumatic vessel slippage. Ultrasonic passivated for maximum corrosion resistance.',
    features: [
      'Hot drop-forged from premium surgical stainless steel',
      'Smooth 3-step locking ratchet mechanism',
      'Precision machined transverse serrations',
      'Autoclavable up to 134°C (273°F)',
      'Laser-marked with brand and batch traceability'
    ],
    applications: ['General surgery', 'Laparotomy', 'Vascular clamping', 'Veterinary procedures'],
    packagingInfo: 'Individually sealed in medical-grade anti-corrosion VCI pouch with protective tip guard and barcode.',
    complianceNotes: 'Manufactured in accordance with ISO 13485 and CE Medical Devices technical file specifications.',
    isBestSeller: true,
    isFeatured: true
  },
  {
    id: 'prod-mt-sh-001',
    code: 'MT-SH-001',
    name: 'Precision Surgical Scalpel Handle No. 3 (Round Knurled Grip)',
    category: 'General Surgery',
    subCategory: 'Scalpel Handles & Blades',
    folderPath: 'Our Products/General Surgery/Scalpel Handles & Blades/MT-SH-001',
    price: 26.50,
    wholesalePriceTiers: [
      { minQty: 10, price: 18.00 },
      { minQty: 50, price: 14.50 },
      { minQty: 200, price: 11.20 },
      { minQty: 1000, price: 8.50 }
    ],
    rating: 5.0,
    reviewCount: 52,
    inStock: true,
    leadTimeDays: 2,
    size: '12.5 cm (5.0 in)',
    material: 'AISI 316L Solid Surgical Stainless Steel',
    hardness: 'HRC 46-48',
    finish: 'Satin Matte',
    availableFinishes: ['Satin Matte', 'Mirror Polish', 'Blue Titanium', 'Black Ceramic'],
    tipType: 'Precision Chuck Fit for Blades #10, #11, #12, #15',
    jawType: 'Ergonomic Diamond Knurled Round Handle',
    autoclavable: true,
    origin: 'Sialkot, Pakistan',
    imageFolder: 'images/products/Our Products/General Surgery/Scalpel Handles & Blades/MT-SH-001/',
    images: [
      '/surgical2.jpg',
      '/surgical3.jpg',
      '/surgical1.jpg'
    ],
    has3DModel: true,
    model3DType: 'scalpel',
    videoLoopUrl: '/images/3d-models/MT-HF-001-loop.mp4',
    shortDesc: 'Solid cylindrical surgical scalpel handle with non-slip diamond knurling and precision blade fitting.',
    fullDesc: 'MEDTREND® MT-SH-001 Precision Surgical Scalpel Handle is CNC machined from solid medical-grade stainless steel in Sialkot. Engineered with cross-hatched tactile knurling for ultimate micro-surgical fingertip control during delicate incisions.',
    features: [
      'CNC milled diamond-knurled barrel for maximum grip security',
      'Compatible with standard surgical blade sizes #10, #11, #12, #15',
      'Autoclavable up to 134°C (273°F)',
      'Balanced center of gravity for surgical precision'
    ],
    applications: ['Plastic surgery', 'Ophthalmic surgery', 'Microsurgery', 'General incisions'],
    packagingInfo: 'Individually boxed with tip protector and batch certificate.',
    complianceNotes: 'ISO 13485 & CE marked medical device.',
    isBestSeller: true,
    isFeatured: true
  },
  {
    id: 'prod-mt-hf-002',
    code: 'MT-HF-002',
    name: 'Halsted Mosquito Forceps Straight',
    category: 'General Surgery',
    subCategory: 'Forceps & Clamps',
    folderPath: 'Our Products/General Surgery/Forceps & Clamps/MT-HF-002',
    price: 28.00,
    wholesalePriceTiers: [
      { minQty: 10, price: 19.50 },
      { minQty: 50, price: 15.00 },
      { minQty: 200, price: 11.50 }
    ],
    rating: 4.8,
    reviewCount: 32,
    inStock: true,
    leadTimeDays: 2,
    size: '12.5 cm (5.0 in)',
    material: 'AISI 420 German-Forged Stainless Steel',
    hardness: 'HRC 49-51',
    finish: 'Satin Matte',
    availableFinishes: ['Satin Matte', 'Mirror Polish', 'Blue Titanium'],
    tipType: 'Straight Ultra-Fine Jaws',
    jawType: 'Full-length Serrated Ratchet',
    autoclavable: true,
    origin: 'Sialkot, Pakistan',
    imageFolder: 'images/products/Our Products/General Surgery/Forceps & Clamps/MT-HF-002/',
    images: [
      '/surgical3.jpg',
      '/surgical1.jpg',
      '/surgical2.jpg'
    ],
    has3DModel: true,
    model3DType: 'forceps',
    videoLoopUrl: '/images/3d-models/MT-HF-002-loop.mp4',
    shortDesc: 'Ultra-fine mosquito forceps for delicate capillary bleeding control in plastic, pediatric, and general surgery.',
    fullDesc: 'The MT-HF-002 Mosquito Forceps feature delicately tapered tips designed for precise grasping in constricted surgical fields. Drop-forged and handcrafted in Sialkot with an effortless spring-action box lock.',
    features: [
      'Fine 1.5mm tip profile for delicate microsurgical grasps',
      'Multi-stage locking ratchet for controlled pressure',
      'Non-glare satin finish reduces operating light glare',
      'Autoclave and ethylene oxide sterilizable'
    ],
    applications: ['Plastic surgery', 'Pediatric surgery', 'Minor wound care', 'Ophthalmic surgery'],
    packagingInfo: 'Individually packed in sterile barrier blister pouch with lot number.',
    complianceNotes: 'Full material test reports and certificate of conformity available on request.',
    isFeatured: true
  },
  {
    id: 'prod-mt-tc-003',
    code: 'MT-TC-003',
    name: 'Allis Tissue Forceps 5x6 Teeth',
    category: 'General Surgery',
    subCategory: 'Forceps & Clamps',
    folderPath: 'Our Products/General Surgery/Forceps & Clamps/MT-TC-003',
    price: 38.00,
    wholesalePriceTiers: [
      { minQty: 10, price: 26.00 },
      { minQty: 50, price: 20.00 },
      { minQty: 200, price: 15.80 }
    ],
    rating: 4.7,
    reviewCount: 19,
    inStock: true,
    leadTimeDays: 3,
    size: '15.0 cm (6.0 in)',
    material: 'AISI 420 Stainless Steel',
    hardness: 'HRC 48-50',
    finish: 'Satin Matte',
    availableFinishes: ['Satin Matte', 'Mirror Polish'],
    tipType: '5x6 Interlocking Teeth',
    jawType: 'Box Lock with Ratchet',
    autoclavable: true,
    origin: 'Sialkot, Pakistan',
    imageFolder: 'images/products/Our Products/General Surgery/Forceps & Clamps/MT-TC-003/',
    images: [
      '/surgical1.jpg',
      '/surgical3.jpg',
      '/surgical2.jpg'
    ],
    has3DModel: true,
    model3DType: 'forceps',
    shortDesc: 'Atraumatic yet firm grip for fascial and subcutaneous tissue retraction.',
    fullDesc: 'Designed for securely holding thick, slippery tissues or organ structures without excessive crushing.',
    features: ['5x6 fine interlocking teeth', 'Finger ring handles for ergonomic comfort', 'Durable corrosion-resistant alloy'],
    applications: ['General surgery', 'Gynecology', 'Hernia repair'],
    packagingInfo: 'Standard export boxed pack of 10 or single blister.',
    complianceNotes: 'ISO 13485 compliant manufacturing.'
  },

  // General Surgery -> Surgical Scissors
  {
    id: 'prod-mt-sc-004',
    code: 'MT-SC-004',
    name: 'Metzenbaum Dissecting Scissors Curved (Tungsten Carbide)',
    category: 'General Surgery',
    subCategory: 'Surgical Scissors',
    folderPath: 'Our Products/General Surgery/Surgical Scissors/MT-SC-004',
    price: 64.00,
    wholesalePriceTiers: [
      { minQty: 10, price: 44.00 },
      { minQty: 50, price: 35.00 },
      { minQty: 200, price: 27.50 },
      { minQty: 1000, price: 21.00 }
    ],
    rating: 5.0,
    reviewCount: 64,
    inStock: true,
    leadTimeDays: 2,
    size: '18.0 cm (7.0 in)',
    material: 'AISI 440 High-Carbon German Steel with Tungsten Carbide Inserts',
    hardness: 'HRC 58-60 (Cutting Edge)',
    finish: 'Tungsten Carbide Gold',
    availableFinishes: ['Tungsten Carbide Gold', 'Satin Matte', 'Blue Titanium', 'Black Ceramic'],
    tipType: 'Blunt/Blunt Delicate Curved Blades',
    jawType: 'Vacuum-brazed TC Inserts with Micro-Beveled Edge',
    autoclavable: true,
    origin: 'Sialkot, Pakistan',
    imageFolder: 'images/products/Our Products/General Surgery/Surgical Scissors/MT-SC-004/',
    images: [
      '/surgical1.jpg',
      '/surgical2.jpg',
      '/surgical3.jpg'
    ],
    has3DModel: true,
    model3DType: 'scissors',
    shortDesc: 'Gold-ringed Tungsten Carbide Metzenbaum scissors for effortless anatomical tissue dissection.',
    fullDesc: 'MEDTREND® Metzenbaum TC Scissors are engineered with sintered Tungsten Carbide blade inserts seamlessly bonded to a flexible surgical stainless steel shank. Gold-plated finger rings signify superior edge retention that stays razor-sharp up to 5x longer than standard scissors.',
    features: [
      'Sintered Tungsten Carbide cutting edges for extreme durability',
      'Gold-plated ergonomic ring handles',
      'Curved profile for enhanced visibility in deep cavities',
      'Ultra-fine blade balance prevents tissue drag'
    ],
    applications: ['Deep tissue dissection', 'Thoracic surgery', 'Plastic & reconstructive surgery'],
    packagingInfo: 'Packaged in a rigid magnetic presentation case with silicone edge guard and inspection certificate.',
    complianceNotes: 'Tested according to German DIN EN ISO 7153-1 metallurgical guidelines.',
    isBestSeller: true,
    isFeatured: true
  },
  {
    id: 'prod-mt-sc-005',
    code: 'MT-SC-005',
    name: 'Mayo Dissecting Scissors Straight',
    category: 'General Surgery',
    subCategory: 'Surgical Scissors',
    folderPath: 'Our Products/General Surgery/Surgical Scissors/MT-SC-005',
    price: 36.00,
    wholesalePriceTiers: [
      { minQty: 10, price: 25.00 },
      { minQty: 50, price: 19.50 },
      { minQty: 200, price: 15.00 }
    ],
    rating: 4.8,
    reviewCount: 29,
    inStock: true,
    leadTimeDays: 2,
    size: '15.0 cm (6.0 in)',
    material: 'AISI 420 German Forged Stainless Steel',
    hardness: 'HRC 52-54',
    finish: 'Satin Matte',
    availableFinishes: ['Satin Matte', 'Mirror Polish', 'Tungsten Carbide Gold'],
    tipType: 'Beveled Heavy Duty Straight Blades',
    jawType: 'Precision Pivot Screw with Uniform Action',
    autoclavable: true,
    origin: 'Sialkot, Pakistan',
    imageFolder: 'images/products/Our Products/General Surgery/Surgical Scissors/MT-SC-005/',
    images: [
      '/surgical2.jpg',
      '/surgical3.jpg'
    ],
    has3DModel: true,
    model3DType: 'scissors',
    shortDesc: 'Heavy-duty Mayo scissors for cutting dense connective fascia, sutures, and surgical drapes.',
    fullDesc: 'Hand-finished in Sialkot, the MT-SC-005 Mayo scissors provide unmatched cutting power with minimal hand fatigue.',
    features: ['Strong blades for tough tissue and fascia', 'Reinforced pivot screw', 'Non-reflective satin surface'],
    applications: ['Fascial incision', 'Suture cutting', 'General operating room'],
    packagingInfo: 'Pouch with protective tip sleeve.',
    complianceNotes: 'Certified surgical grade.'
  },

  // General Surgery -> Needle Holders
  {
    id: 'prod-mt-nh-012',
    code: 'MT-NH-012',
    name: 'Mayo-Hegar Needle Holder (TC Inserts)',
    category: 'General Surgery',
    subCategory: 'Needle Holders',
    folderPath: 'Our Products/General Surgery/Needle Holders/MT-NH-012',
    price: 58.00,
    wholesalePriceTiers: [
      { minQty: 10, price: 39.00 },
      { minQty: 50, price: 31.00 },
      { minQty: 200, price: 24.50 },
      { minQty: 1000, price: 18.50 }
    ],
    rating: 4.9,
    reviewCount: 51,
    inStock: true,
    leadTimeDays: 2,
    size: '16.0 cm (6.25 in)',
    material: 'AISI 420 Stainless Steel with TC Pyramidal Jaws',
    hardness: 'HRC 60+ (Jaws)',
    finish: 'Tungsten Carbide Gold',
    availableFinishes: ['Tungsten Carbide Gold', 'Satin Matte', 'Blue Titanium'],
    tipType: 'Cross-Hatched 0.4mm Pitch TC Inserts',
    jawType: 'Precision Box-Lock with Micro-Ratchet',
    autoclavable: true,
    origin: 'Sialkot, Pakistan',
    imageFolder: 'images/products/Our Products/General Surgery/Needle Holders/MT-NH-012/',
    images: [
      '/surgical3.jpg',
      '/surgical1.jpg'
    ],
    has3DModel: true,
    model3DType: 'needle_holder',
    shortDesc: 'Gold-handle Mayo-Hegar needle holder with cross-hatched Tungsten Carbide jaws for rock-solid needle grip without twisting.',
    fullDesc: 'Engineered specifically to prevent needle rotation during delicate suturing. The cross-serrated tungsten carbide inserts feature a micro-pyramid pattern that grips suture needles firmly without bending or scoring.',
    features: [
      'Diamond-cut TC cross-hatched jaws for zero-slip needle retention',
      'Gold-plated finger rings for quick TC visual identification',
      'Smooth-gliding ratchet with multi-stage tension settings',
      'Handles needles from 3-0 to 6-0 sutures'
    ],
    applications: ['Deep suturing', 'Wound closure', 'Cardiovascular & general surgery'],
    packagingInfo: 'Individually boxed with foam insert and calibration report.',
    complianceNotes: 'FDA-registered facility standard, CE mark compliant.',
    isBestSeller: true,
    isFeatured: true
  },
  {
    id: 'prod-mt-nh-015',
    code: 'MT-NH-015',
    name: 'Castroviejo Micro Needle Holder Straight',
    category: 'ENT & Ophthalmic',
    subCategory: 'Micro Scissors & Forceps',
    folderPath: 'Our Products/ENT & Ophthalmic/Micro Scissors & Forceps/MT-NH-015',
    price: 89.00,
    wholesalePriceTiers: [
      { minQty: 10, price: 62.00 },
      { minQty: 50, price: 49.00 },
      { minQty: 200, price: 39.00 }
    ],
    rating: 5.0,
    reviewCount: 38,
    inStock: true,
    leadTimeDays: 3,
    size: '14.0 cm (5.5 in)',
    material: 'AISI 440 Micro Stainless Steel with Fine TC Jaws',
    hardness: 'HRC 62',
    finish: 'Blue Titanium',
    availableFinishes: ['Blue Titanium', 'Satin Matte', 'Tungsten Carbide Gold'],
    tipType: 'Ultra-Fine 0.8mm Jaws with Catch Ratchet',
    jawType: 'Flat Spring Action with Light Tactile Feedback',
    autoclavable: true,
    origin: 'Sialkot, Pakistan',
    imageFolder: 'images/products/Our Products/ENT & Ophthalmic/Micro Scissors & Forceps/MT-NH-015/',
    images: [
      '/surgical1.jpg',
      '/surgical2.jpg'
    ],
    has3DModel: true,
    model3DType: 'needle_holder',
    shortDesc: 'Titanium-coated micro needle holder for ophthalmic, plastic, and microvascular anastomosis with 7-0 to 10-0 sutures.',
    fullDesc: 'Ultra-lightweight micro needle holder providing surgical tactile sensitivity. Blue titanium nitride coating reduces glare under operating microscopes and increases surface hardness.',
    features: [
      'Micro-jaw profile for 7-0 to 10-0 microsutures',
      'Titanium Nitride anti-glare scratch-resistant coating',
      'Sensitive spring latch for single-handed lock/release'
    ],
    applications: ['Ophthalmology', 'Microvascular surgery', 'Neurosurgery', 'Plastic reconstruction'],
    packagingInfo: 'Delivered in a hard-shell protective micro-instrument case.',
    complianceNotes: 'DIN ISO 13485 surgical grade.',
    isNew: true,
    isFeatured: true
  },

  // General Surgery -> Retractors
  {
    id: 'prod-mt-rt-008',
    code: 'MT-RT-008',
    name: 'Weitlaner Self-Retaining Retractor 3x4 Sharp Prongs',
    category: 'General Surgery',
    subCategory: 'Retractors & Speculums',
    folderPath: 'Our Products/General Surgery/Retractors & Speculums/MT-RT-008',
    price: 72.00,
    wholesalePriceTiers: [
      { minQty: 10, price: 52.00 },
      { minQty: 50, price: 42.00 },
      { minQty: 200, price: 33.00 }
    ],
    rating: 4.9,
    reviewCount: 22,
    inStock: true,
    leadTimeDays: 2,
    size: '16.5 cm (6.5 in)',
    material: 'AISI 420 German-Forged Stainless Steel',
    hardness: 'HRC 48-50',
    finish: 'Satin Matte',
    availableFinishes: ['Satin Matte', 'Mirror Polish'],
    tipType: '3x4 Sharp Prongs (Curved Outward)',
    jawType: 'Self-Retaining Cam-Action Ratchet',
    autoclavable: true,
    origin: 'Sialkot, Pakistan',
    imageFolder: 'images/products/Our Products/General Surgery/Retractors & Speculums/MT-RT-008/',
    images: [
      '/surgical2.jpg',
      '/surgical3.jpg'
    ],
    has3DModel: true,
    model3DType: 'retractor',
    shortDesc: 'Self-retaining retractor with 3x4 sharp prongs for hands-free surgical wound exposure.',
    fullDesc: 'The Medtrend Weitlaner Retractor holds back tissues securely, freeing up the surgeon and assistants. Features a smoothly calibrated self-retaining ratchet mechanism.',
    features: [
      'Self-retaining automatic lock frees hands',
      'Sharp prongs grip deep fascial margins',
      'Durable forged hinge with zero lateral wobble'
    ],
    applications: ['Spine surgery', 'Orthopedic exposure', 'Groin and vascular dissection'],
    packagingInfo: 'Sterile protective case with silicone prong covers.',
    complianceNotes: 'Full medical device documentation included.'
  },

  // Orthopedic -> Bone Rongeurs
  {
    id: 'prod-mt-or-022',
    code: 'MT-OR-022',
    name: 'Friedman Bone Rongeur Double Action',
    category: 'Orthopedic Instruments',
    subCategory: 'Bone Rongeurs',
    folderPath: 'Our Products/Orthopedic Instruments/Bone Rongeurs/MT-OR-022',
    price: 115.00,
    wholesalePriceTiers: [
      { minQty: 10, price: 82.00 },
      { minQty: 50, price: 65.00 },
      { minQty: 200, price: 52.00 }
    ],
    rating: 4.9,
    reviewCount: 31,
    inStock: true,
    leadTimeDays: 3,
    size: '22.0 cm (8.75 in)',
    material: 'AISI 440 German Forged High-Carbon Steel',
    hardness: 'HRC 54-56',
    finish: 'Satin Matte',
    availableFinishes: ['Satin Matte', 'Mirror Polish'],
    tipType: '4.0 mm Curved Scoop Jaws',
    jawType: 'Double-Action Compound Leverage Hinge',
    autoclavable: true,
    origin: 'Sialkot, Pakistan',
    imageFolder: 'images/products/Our Products/Orthopedic Instruments/Bone Rongeurs/MT-OR-022/',
    images: [
      '/surgical3.jpg',
      '/surgical1.jpg'
    ],
    has3DModel: true,
    model3DType: 'bone_rongeur',
    shortDesc: 'Double-action compound leverage bone rongeur for resecting tough cortical bone and cartilage with minimal surgeon hand strain.',
    fullDesc: 'Double compound joints multiply squeezing force by over 300%, cleanly biting through bone margins without slippage.',
    features: [
      'Compound double-action hinge for 3x gripping force',
      'Induction-hardened scoop cutting cups',
      'Heavy-duty leaf spring return mechanism'
    ],
    applications: ['Orthopedic surgery', 'Spine laminectomy', 'Joint reconstruction'],
    packagingInfo: 'Individually boxed in padded heavy-duty case.',
    complianceNotes: 'High tensile orthopedic alloy certified.'
  },

  // Scalpel & Handles
  {
    id: 'prod-mt-bp-002',
    code: 'MT-BP-002',
    name: 'Bard-Parker Scalpel Handle #3 with Metric Graduations',
    category: 'General Surgery',
    subCategory: 'Surgical Scissors',
    folderPath: 'Our Products/General Surgery/Surgical Scissors/MT-BP-002',
    price: 16.50,
    wholesalePriceTiers: [
      { minQty: 10, price: 11.00 },
      { minQty: 50, price: 8.50 },
      { minQty: 200, price: 6.20 },
      { minQty: 1000, price: 4.80 }
    ],
    rating: 4.8,
    reviewCount: 42,
    inStock: true,
    leadTimeDays: 1,
    size: '12.5 cm (5.0 in)',
    material: 'AISI 316 Surgical Grade Stainless Steel',
    hardness: 'HRC 45-48',
    finish: 'Satin Matte',
    availableFinishes: ['Satin Matte', 'Mirror Polish', 'Blue Titanium'],
    tipType: 'Fits Blade Sizes #10, #11, #12, #15',
    jawType: 'Precision Blade Keyhole Slot',
    autoclavable: true,
    origin: 'Sialkot, Pakistan',
    imageFolder: 'images/products/Our Products/General Surgery/Surgical Scissors/MT-BP-002/',
    images: [
      '/surgical1.jpg',
      '/surgical2.jpg'
    ],
    has3DModel: true,
    model3DType: 'scalpel',
    shortDesc: 'Solid stainless steel scalpel handle with laser-etched 5cm metric ruler and secure blade lock.',
    fullDesc: 'A foundational surgical instrument engineered with balanced weight distribution for precise tactile incisions.',
    features: [
      'Laser-engraved 5cm millimeter graduation scale',
      'Fits standard surgical blade sizes #10 through #15',
      'Textured finger rest for anti-slip control'
    ],
    applications: ['Dermatology', 'General incisions', 'Dissection', 'Biopsy'],
    packagingInfo: 'Box of 10 or single blister pouch.',
    complianceNotes: 'Fully passivated surgical stainless steel.'
  },

  // Dental Instruments -> Extraction Forceps
  {
    id: 'prod-mt-ds-019',
    code: 'MT-DS-019',
    name: 'Universal Dental Extraction Forceps #150 Upper',
    category: 'Dental Instruments',
    subCategory: 'Extraction Forceps',
    folderPath: 'Our Products/Dental Instruments/Extraction Forceps/MT-DS-019',
    price: 48.00,
    wholesalePriceTiers: [
      { minQty: 10, price: 34.00 },
      { minQty: 50, price: 27.00 },
      { minQty: 200, price: 21.00 }
    ],
    rating: 4.9,
    reviewCount: 35,
    inStock: true,
    leadTimeDays: 2,
    size: '17.5 cm (7.0 in)',
    material: 'AISI 420 High Strength Stainless Steel',
    hardness: 'HRC 50-52',
    finish: 'Satin Matte',
    availableFinishes: ['Satin Matte', 'Mirror Polish', 'Blue Titanium'],
    tipType: 'Anatomically Contoured Beaks for Maxillary Incisors & Bicuspids',
    jawType: 'Serrated Diamond Beak Texture',
    autoclavable: true,
    origin: 'Sialkot, Pakistan',
    imageFolder: 'images/products/Our Products/Dental Instruments/Extraction Forceps/MT-DS-019/',
    images: [
      '/surgical2.jpg',
      '/surgical3.jpg',
      '/surgical1.jpg'
    ],
    has3DModel: true,
    model3DType: 'forceps',
    shortDesc: 'Anatomically contoured extraction forceps for upper incisors, cuspids, and premolars.',
    fullDesc: 'Engineered in Sialkot with knurled ergonomic handles that ensure firm crown engagement without slippage.',
    features: ['Anatomical beak geometry', 'Heavy-duty forged hinge', 'Autoclavable 134°C'],
    applications: ['Oral surgery', 'Exodontia', 'Dental clinic'],
    packagingInfo: 'Dental blister with batch traceability tag.',
    complianceNotes: 'ISO 13485 & CE certified.'
  },

  // Surgical Sets -> Minor Surgery Set
  {
    id: 'prod-mt-set-101',
    code: 'MT-SET-101',
    name: 'Executive Minor Surgery Set 14-Pieces in Stainless Cassette',
    category: 'Surgical Sets',
    subCategory: 'Minor Surgery Sets',
    folderPath: 'Our Products/Surgical Sets/Minor Surgery Sets/MT-SET-101',
    price: 245.00,
    wholesalePriceTiers: [
      { minQty: 5, price: 185.00 },
      { minQty: 20, price: 145.00 },
      { minQty: 100, price: 115.00 }
    ],
    rating: 5.0,
    reviewCount: 42,
    inStock: true,
    leadTimeDays: 4,
    size: 'Cassette: 28 x 18 x 4 cm',
    material: 'Full German-Forged AISI 420 / 440 Stainless Steel in DIN Sterilization Tray',
    hardness: 'HRC 48-56',
    finish: 'Satin Matte',
    availableFinishes: ['Satin Matte', 'Blue Titanium', 'Black Ceramic'],
    tipType: 'Complete Set (Forceps, Scissors, Needle Holders, Scalpel, Retractor, Probes)',
    jawType: 'Includes TC Upgrades on Metzenbaum & Mayo-Hegar',
    autoclavable: true,
    origin: 'Sialkot, Pakistan',
    imageFolder: 'images/products/Our Products/Surgical Sets/Minor Surgery Sets/MT-SET-101/',
    images: [
      '/surgical1.jpg',
      '/surgical2.jpg',
      '/surgical3.jpg'
    ],
    has3DModel: true,
    model3DType: 'forceps',
    shortDesc: 'Complete 14-piece German-standard minor surgical set in a laser-slotted autoclavable stainless steel tray.',
    fullDesc: 'The definitive turn-key kit for emergency departments, outpatient clinics, and military field hospitals. Contains MT-HF-001, MT-HF-002, MT-SC-004 TC, MT-SC-005, MT-NH-012 TC, MT-BP-002, Adson tissue forceps, sponge clamps, and probes inside an electropolished silicone-cushioned sterilization cassette.',
    features: [
      '14 premium surgical instruments for minor operative procedures',
      'Includes Tungsten Carbide upgrades on scissors and needle holders',
      'Supplied in autoclavable heavy-gauge DIN wire cassette',
      'Custom laser engraving of clinic name included on request'
    ],
    applications: ['Emergency rooms', 'Ambulatory surgical centers', 'Outpatient clinics', 'Military medical kits'],
    packagingInfo: 'Heavy-duty corrugated master export carton with silicone tray locks.',
    complianceNotes: 'FDA device master listing, CE marked, ISO 13485 certified batch.',
    isBestSeller: true,
    isFeatured: true
  },

  // Dental Instruments -> Root Elevators & Scalers
  {
    id: 'prod-mt-de-021',
    code: 'MT-DE-021',
    name: 'Cryer Root Elevator Pair (Left & Right #30/31)',
    category: 'Dental Instruments',
    subCategory: 'Root Elevators & Luxators',
    folderPath: 'Our Products/Dental Instruments/Root Elevators & Luxators/MT-DE-021',
    price: 38.00,
    wholesalePriceTiers: [
      { minQty: 10, price: 26.00 },
      { minQty: 50, price: 20.00 },
      { minQty: 200, price: 15.50 }
    ],
    rating: 4.9,
    reviewCount: 28,
    inStock: true,
    leadTimeDays: 2,
    size: '15.5 cm (6.1 in)',
    material: 'AISI 420 Martensitic High-Torque Stainless Steel',
    hardness: 'HRC 52-54',
    finish: 'Satin Matte',
    availableFinishes: ['Satin Matte', 'Mirror Polish'],
    tipType: 'Triangular Pointed Sharp Bevel',
    jawType: 'Ergonomic Hexagonal Handle for Maximum Rotational Torque',
    autoclavable: true,
    origin: 'Sialkot, Pakistan',
    imageFolder: 'images/products/Our Products/Dental Instruments/Root Elevators & Luxators/MT-DE-021/',
    images: [
      '/surgical2.jpg',
      '/surgical3.jpg'
    ],
    has3DModel: false,
    shortDesc: 'Cryer triangular elevators engineered for effortless fractured root tip luxation and socket expansion.',
    fullDesc: 'Manufactured from heat-treated martensitic steel in Sialkot with an ergonomic fluted handle providing optimal leverage without slipping.',
    features: ['Precision-ground triangular beveled blade', 'Full stainless one-piece forging', 'High-temperature autoclavable'],
    applications: ['Exodontia', 'Oral surgery', 'Root extraction'],
    packagingInfo: 'Individually pouch-packed with silicone blade cap.',
    complianceNotes: 'ISO 13485 & CE certified.'
  },
  {
    id: 'prod-mt-ds-035',
    code: 'MT-DS-035',
    name: 'Gracey Periodontal Curette Set 1/2, 7/8, 11/12, 13/14',
    category: 'Dental Instruments',
    subCategory: 'Scalers & Curettes',
    folderPath: 'Our Products/Dental Instruments/Scalers & Curettes/MT-DS-035',
    price: 52.00,
    wholesalePriceTiers: [
      { minQty: 10, price: 36.00 },
      { minQty: 50, price: 28.00 },
      { minQty: 200, price: 22.00 }
    ],
    rating: 5.0,
    reviewCount: 39,
    inStock: true,
    leadTimeDays: 2,
    size: '17.0 cm (6.7 in)',
    material: 'High-Carbon Martensitic Stainless Steel',
    hardness: 'HRC 54-56',
    finish: 'Satin Matte',
    availableFinishes: ['Satin Matte', 'Blue Titanium'],
    tipType: 'Area-Specific Offset Cutting Edge',
    jawType: 'Ultra-Light 9.5mm Hollow Ergonomic Handle',
    autoclavable: true,
    origin: 'Sialkot, Pakistan',
    imageFolder: 'images/products/Our Products/Dental Instruments/Scalers & Curettes/MT-DS-035/',
    images: [
      '/surgical3.jpg',
      '/surgical1.jpg'
    ],
    has3DModel: false,
    shortDesc: 'Precision-ground Gracey curettes for subgingival scaling and root planing with tactile ergonomic handles.',
    fullDesc: 'Ultra-sharp cutting edges hand-honed by master craftsmen in Sialkot. The hollow lightweight handle prevents hand fatigue during long periodontal procedures.',
    features: ['70-degree blade offset angle', 'Color-coded identification rings', 'Resists repeated ultrasonic cleaning'],
    applications: ['Periodontics', 'Deep scaling', 'Dental prophylaxis'],
    packagingInfo: 'Pack of 4 in autoclavable silicone clip tray.',
    complianceNotes: 'CE mark compliant.'
  },

  // Gynecology & Obstetrics
  {
    id: 'prod-mt-gy-011',
    code: 'MT-GY-011',
    name: 'Cusco Vaginal Speculum Center-Screw Stainless Steel',
    category: 'Gynecology & Obstetrics',
    subCategory: 'Vaginal Speculums',
    folderPath: 'Our Products/Gynecology & Obstetrics/Vaginal Speculums/MT-GY-011',
    price: 44.00,
    wholesalePriceTiers: [
      { minQty: 10, price: 31.00 },
      { minQty: 50, price: 24.00 },
      { minQty: 200, price: 18.50 }
    ],
    rating: 4.8,
    reviewCount: 34,
    inStock: true,
    leadTimeDays: 2,
    size: 'Medium 80 x 32 mm Blades',
    material: 'AISI 304 High Polish Surgical Stainless Steel',
    hardness: 'HRC 44-46',
    finish: 'Mirror Polish',
    availableFinishes: ['Mirror Polish', 'Satin Matte', 'Insulated Electrosurgical'],
    tipType: 'Smooth Rounded Atraumatic Duckbill Blades',
    jawType: 'Quick-Release Central Locking Screw Mechanism',
    autoclavable: true,
    origin: 'Sialkot, Pakistan',
    imageFolder: 'images/products/Our Products/Gynecology & Obstetrics/Vaginal Speculums/MT-GY-011/',
    images: [
      '/surgical1.jpg',
      '/surgical2.jpg'
    ],
    has3DModel: false,
    shortDesc: 'Atraumatic bi-valve Cusco vaginal speculum with precision center-screw mechanism and electro-polished satin edges.',
    fullDesc: 'Engineered for smooth insertion and maximum patient comfort. Electro-polished bevels prevent mucosal abrasion during clinical examinations and colposcopy.',
    features: ['Central thumb screw for steady multi-position locking', 'High luster electro-polished stainless steel', '134°C autoclave sterilizable'],
    applications: ['Gynecological examination', 'Pap smear cytology', 'Colposcopy'],
    packagingInfo: 'Individually boxed with protective barrier wrap.',
    complianceNotes: 'ISO 13485 certified production.'
  },
  {
    id: 'prod-mt-gy-024',
    code: 'MT-GY-024',
    name: 'Bozeman Uterine Dressing Forceps Double Curved',
    category: 'Gynecology & Obstetrics',
    subCategory: 'Uterine & Dressing Forceps',
    folderPath: 'Our Products/Gynecology & Obstetrics/Uterine & Dressing Forceps/MT-GY-024',
    price: 42.00,
    wholesalePriceTiers: [
      { minQty: 10, price: 29.50 },
      { minQty: 50, price: 23.00 },
      { minQty: 200, price: 17.80 }
    ],
    rating: 4.9,
    reviewCount: 22,
    inStock: true,
    leadTimeDays: 2,
    size: '26.0 cm (10.25 in)',
    material: 'AISI 420 Surgical Stainless Steel',
    hardness: 'HRC 48-50',
    finish: 'Satin Matte',
    availableFinishes: ['Satin Matte', 'Mirror Polish'],
    tipType: 'Double Curved S-Shape Serrated Jaws',
    jawType: 'Box Lock with 3-Step Ratchet',
    autoclavable: true,
    origin: 'Sialkot, Pakistan',
    imageFolder: 'images/products/Our Products/Gynecology & Obstetrics/Uterine & Dressing Forceps/MT-GY-024/',
    images: [
      '/surgical2.jpg',
      '/surgical3.jpg'
    ],
    has3DModel: false,
    shortDesc: 'Double-curved S-shape Bozeman forceps for swab placement and deep intra-uterine packing.',
    fullDesc: 'Double S-curvature keeps the surgeon hand outside the visual field, facilitating clear direct line of sight into the cervical canal.',
    features: ['S-curved shaft maintains clear visibility', 'Transverse inner jaw serrations for gauze grip', 'Smooth box-lock hinge'],
    applications: ['Obstetrics', 'Postpartum care', 'Gynecological surgery'],
    packagingInfo: 'Individually pouch-packed with batch serial.',
    complianceNotes: 'CE mark registered.'
  },

  // ENT & Ophthalmic
  {
    id: 'prod-mt-ent-018',
    code: 'MT-ENT-018',
    name: 'Hartmann Alligator Ear Forceps Fine Serrated',
    category: 'ENT & Ophthalmic',
    subCategory: 'Nasal & Ear Speculums',
    folderPath: 'Our Products/ENT & Ophthalmic/Nasal & Ear Speculums/MT-ENT-018',
    price: 46.00,
    wholesalePriceTiers: [
      { minQty: 10, price: 32.00 },
      { minQty: 50, price: 25.00 },
      { minQty: 200, price: 19.50 }
    ],
    rating: 4.9,
    reviewCount: 37,
    inStock: true,
    leadTimeDays: 2,
    size: '8.5 cm Shaft (14.0 cm Total)',
    material: 'AISI 420 Fine Surgical Stainless Steel',
    hardness: 'HRC 50-52',
    finish: 'Satin Matte',
    availableFinishes: ['Satin Matte', 'Black Ceramic'],
    tipType: 'Micro Alligator Jaws (1x4 mm)',
    jawType: 'Precision Wire-Action Pivot Shaft',
    autoclavable: true,
    origin: 'Sialkot, Pakistan',
    imageFolder: 'images/products/Our Products/ENT & Ophthalmic/Nasal & Ear Speculums/MT-ENT-018/',
    images: [
      '/surgical3.jpg',
      '/surgical1.jpg'
    ],
    has3DModel: false,
    shortDesc: 'Fine alligator ear forceps for foreign body extraction, myringotomy tube placement, and ear canal debridement.',
    fullDesc: 'Ultra-thin shaft allows unobstructed viewing through operating otoscopes. Handcrafted in Sialkot with microscopic tolerances.',
    features: ['Narrow 1.2mm tubular shaft', 'Micro serrated jaws prevent slippage', 'Zero backlash hinge'],
    applications: ['Otology', 'Foreign body removal', 'Ear surgery'],
    packagingInfo: 'Protective tip sheath and sterile pouch.',
    complianceNotes: 'ISO 13485 surgical grade.'
  },

  // Cardiovascular & Thoracic
  {
    id: 'prod-mt-cv-009',
    code: 'MT-CV-009',
    name: 'DeBakey Atraumatic Aortic Vascular Clamp Curved',
    category: 'Cardiovascular & Thoracic',
    subCategory: 'Vascular Clamps',
    folderPath: 'Our Products/Cardiovascular & Thoracic/Vascular Clamps/MT-CV-009',
    price: 88.00,
    wholesalePriceTiers: [
      { minQty: 10, price: 62.00 },
      { minQty: 50, price: 48.00 },
      { minQty: 200, price: 38.00 }
    ],
    rating: 5.0,
    reviewCount: 44,
    inStock: true,
    leadTimeDays: 3,
    size: '20.0 cm (8.0 in)',
    material: 'AISI 420 High-Purity Surgical Alloy',
    hardness: 'HRC 49-51',
    finish: 'Satin Matte',
    availableFinishes: ['Satin Matte', 'Blue Titanium'],
    tipType: 'DeBakey 1x2 Atraumatic Interlocking Serrations',
    jawType: 'Precision Box-Lock with Spring-Tension Ratchet',
    autoclavable: true,
    origin: 'Sialkot, Pakistan',
    imageFolder: 'images/products/Our Products/Cardiovascular & Thoracic/Vascular Clamps/MT-CV-009/',
    images: [
      '/surgical1.jpg',
      '/surgical2.jpg'
    ],
    has3DModel: false,
    shortDesc: 'Atraumatic DeBakey vascular clamp designed for safe, non-crushing temporary occlusion of major blood vessels.',
    fullDesc: 'Engineered with patented DeBakey non-crushing tooth rows that grip vascular adventitia firmly without damaging the delicate endothelial intima.',
    features: ['Atraumatic DeBakey teeth pattern', 'Gentle calibrated clamping pressure', 'Non-glare satin finish'],
    applications: ['Cardiovascular surgery', 'Vascular bypass', 'Thoracic operations'],
    packagingInfo: 'Rigid presentation case with foam padding.',
    complianceNotes: 'Certified for cardiovascular implant procedures.'
  },

  // Plastic & Reconstructive Surgery
  {
    id: 'prod-mt-ps-014',
    code: 'MT-PS-014',
    name: 'Gorney-Freeman Facelift Scissors Curved (SuperCut & TC)',
    category: 'Plastic & Reconstructive Surgery',
    subCategory: 'Facelift & Dissecting Scissors',
    folderPath: 'Our Products/Plastic & Reconstructive Surgery/Facelift & Dissecting Scissors/MT-PS-014',
    price: 78.00,
    wholesalePriceTiers: [
      { minQty: 10, price: 54.00 },
      { minQty: 50, price: 42.00 },
      { minQty: 200, price: 34.00 }
    ],
    rating: 5.0,
    reviewCount: 39,
    inStock: true,
    leadTimeDays: 2,
    size: '19.0 cm (7.5 in)',
    material: 'AISI 440 High-Carbon German Steel with Tungsten Carbide Inserts',
    hardness: 'HRC 58-60',
    finish: 'Tungsten Carbide Gold',
    availableFinishes: ['Tungsten Carbide Gold', 'Satin Matte', 'Black Ceramic'],
    tipType: 'Semi-Sharp Curved Dissecting Blades with Micro-Serration',
    jawType: 'SuperCut Razor Edge One Side, Micro-Serrated Other Side',
    autoclavable: true,
    origin: 'Sialkot, Pakistan',
    imageFolder: 'images/products/Our Products/Plastic & Reconstructive Surgery/Facelift & Dissecting Scissors/MT-PS-014/',
    images: [
      '/surgical2.jpg',
      '/surgical3.jpg',
      '/surgical1.jpg'
    ],
    has3DModel: true,
    model3DType: 'scissors',
    shortDesc: 'SuperCut TC Gorney-Freeman facelift scissors for extensive subcutaneous undermining and clean tissue glides.',
    fullDesc: 'Features one razor-sharp cutting blade paired with a micro-serrated opposing blade that holds slippery subcutaneous tissue firmly in place during dissection.',
    features: ['SuperCut razor cutting technology', 'Tungsten Carbide bonded inserts', 'Sabre curved profile for facial contours'],
    applications: ['Rhytidectomy (Facelift)', 'Blepharoplasty', 'Cosmetic surgery'],
    packagingInfo: 'Deluxe magnetic presentation case with blade guard.',
    complianceNotes: 'DIN EN ISO 7153-1 compliant.'
  }
];
