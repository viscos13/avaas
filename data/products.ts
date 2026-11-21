export interface ProductColor {
  name: string;
  hex: string;
  borderClass?: string;
}

export interface ProductSize {
  name: string;
  label: string;
  dimensions: string;
  dimensionsMetric: string;
  inStock: boolean;
  priceModifier: number;
}

export interface ProductReview {
  id: string;
  author: string;
  city: string;
  rating: number;
  date: string;
  title: string;
  comment: string;
  verifiedPurchase: boolean;
}

export interface Product {
  id: string;
  slug: string;
  name: string;
  subtitle: string;
  category: "bedroom" | "bath" | "living" | "dining" | "soft-furnishings" | "gifting";
  subcategory: string;
  collection: "essential" | "signature" | "reserve";
  price: number;
  originalPrice: number;
  discountPercent: number;
  rating: number;
  reviewsCount: number;
  inStock: boolean;
  badge?: string;
  isBestseller?: boolean;
  isWinterLaunch?: boolean;
  isNewSeason?: boolean;
  isFeatured?: boolean;
  images: string[];
  colors: ProductColor[];
  sizes: ProductSize[];
  fabric: string;
  threadCount?: string;
  gsm?: string;
  leadParagraph: string;
  materialCraft: string;
  specifications: Record<string, string>;
  careInstructions: string[];
  reviews: ProductReview[];
}

export const PRODUCTS: Product[] = [
  // 1. Winter '26-27 Reserve Mink Blanket
  {
    id: "nordic-luxury-ultra-plush-mink-blanket",
    slug: "nordic-luxury-ultra-plush-mink-blanket",
    name: "Nordic Luxury Ultra-Plush Mink Blanket",
    subtitle: "Winter '26–27 Reserve Edition | 680 GSM Cloud Micro-Mink",
    category: "bedroom",
    subcategory: "Blankets & Mink",
    collection: "reserve",
    price: 4899,
    originalPrice: 7499,
    discountPercent: 35,
    rating: 4.9,
    reviewsCount: 142,
    inStock: true,
    badge: "Reserve Edition",
    isBestseller: true,
    isWinterLaunch: true,
    isFeatured: true,
    images: [
      "https://images.unsplash.com/photo-1584100936595-c0654b55a2e2?q=85&w=1200&auto=format&fit=crop",
      "https://images.unsplash.com/photo-1616486338812-3dadae4b4ace?q=85&w=1200&auto=format&fit=crop",
      "https://images.unsplash.com/photo-1505693416388-ac5ce068fe85?q=85&w=1200&auto=format&fit=crop",
    ],
    colors: [
      { name: "Oatmeal Stone", hex: "#D9D0C3" },
      { name: "Espresso Charcoal", hex: "#2A2523" },
      { name: "Terracotta Heather", hex: "#A85D45" },
      { name: "Olive Moss", hex: "#555E46" },
    ],
    sizes: [
      { name: "Queen", label: "Queen (86\" × 94\")", dimensions: "86\" × 94\"", dimensionsMetric: "220 cm × 240 cm", inStock: true, priceModifier: 0 },
      { name: "King", label: "King (94\" × 102\")", dimensions: "94\" × 102\"", dimensionsMetric: "240 cm × 260 cm", inStock: true, priceModifier: 600 },
      { name: "Single", label: "Single (60\" × 90\")", dimensions: "60\" × 90\"", dimensionsMetric: "152 cm × 228 cm", inStock: true, priceModifier: -900 },
    ],
    fabric: "100% Micro-Thermal Mink Weave",
    gsm: "680 GSM",
    leadParagraph: "A pinnacle of Panipat thermal engineering. Crafted with ultra-dense 680 GSM filament yarns, this double-sided mink blanket wraps you in weightless warmth with a decadent cashmere-like sheen.",
    materialCraft: "Woven on advanced high-gauge circular raschel looms at KT International's Panipat facility. Features a 2-ply high-filament micro-mink pile with sheared velvet borders and anti-shedding lock technology.",
    specifications: {
      "GSM": "680 GSM Ultra-Dense Double Ply",
      "Weave Technique": "Raschel Warp-Knit Micro-Filament",
      "Edge Finish": "4-inch Satin Suede Hem with Double-Needle Stitch",
      "Allergen Friendly": "Hypoallergenic, Oeko-Tex Standard 100 Certified",
      "Package Contents": "1 Luxury Mink Blanket in Signature Storage Trunk",
      "Manufactured By": "KT International, Panipat, Haryana, India",
    },
    careInstructions: [
      "Machine wash gentle cycle in cold water with mild liquid detergent",
      "Tumble dry low or air dry in shade to maintain plush pile",
      "Do not bleach or iron directly",
    ],
    reviews: [
      {
        id: "rev-1",
        author: "Meera Singhal",
        city: "Chandigarh",
        rating: 5,
        date: "14 Nov 2026",
        title: "Unbelievable softness and zero shedding",
        comment: "Northern winters demand real warmth. This blanket feels twice as rich as imported Korean mink blankets I previously owned. The Oatmeal Stone shade matches our lime-wash bedroom perfectly.",
        verifiedPurchase: true,
      },
    ],
  },

  // 2. Winter '26-27 Kashmir Cloud Mink
  {
    id: "kashmir-cloud-embossed-mink-blanket",
    slug: "kashmir-cloud-embossed-mink-blanket",
    name: "Kashmir Cloud Embossed Mink Blanket",
    subtitle: "Winter '26–27 Signature | 550 GSM Sculpted Geometric Weave",
    category: "bedroom",
    subcategory: "Blankets & Mink",
    collection: "signature",
    price: 2499,
    originalPrice: 3999,
    discountPercent: 38,
    rating: 4.8,
    reviewsCount: 98,
    inStock: true,
    badge: "Signature Weave",
    isBestseller: true,
    isWinterLaunch: true,
    images: [
      "https://images.unsplash.com/photo-1595526114035-0d45ed16cfbf?q=85&w=1200&auto=format&fit=crop",
      "https://images.unsplash.com/photo-1584100936595-c0654b55a2e2?q=85&w=1200&auto=format&fit=crop",
    ],
    colors: [
      { name: "Warm Linen Ivory", hex: "#EBE3D7" },
      { name: "Smoky Taupe", hex: "#7D746D" },
      { name: "Earthy Terracotta", hex: "#B95D41" },
    ],
    sizes: [
      { name: "Queen", label: "Queen (84\" × 90\")", dimensions: "84\" × 90\"", dimensionsMetric: "213 cm × 228 cm", inStock: true, priceModifier: 0 },
      { name: "King", label: "King (90\" × 100\")", dimensions: "90\" × 100\"", dimensionsMetric: "228 cm × 254 cm", inStock: true, priceModifier: 500 },
      { name: "Single", label: "Single (60\" × 90\")", dimensions: "60\" × 90\"", dimensionsMetric: "152 cm × 228 cm", inStock: true, priceModifier: -600 },
    ],
    fabric: "550 GSM Thermal Micro-Mink",
    gsm: "550 GSM",
    leadParagraph: "A modern homage to Kashmiri trellis motifs. Intricately embossed with thermal carving technology for multidimensional depth and cozy warmth throughout Indian winter nights.",
    materialCraft: "Constructed with hollow-core thermal fibers that trap warm air pockets while letting moisture escape.",
    specifications: {
      "GSM": "550 GSM Embossed Thermal Weave",
      "Texture": "High-Definition 3D Embossed Pattern",
      "Border": "Reinforced 3-inch Velvet Hem",
      "Country of Origin": "India (Crafted in Panipat by KT International)",
    },
    careInstructions: ["Gentle machine wash with cold water", "Spin dry low, do not wring"],
    reviews: [
      {
        id: "rev-3",
        author: "Devendra Verma",
        city: "Gurugram",
        rating: 5,
        date: "08 Nov 2026",
        title: "Subtle pattern and very warm",
        comment: "Does not look tacky like old-style loud blankets. Very tasteful beige tone.",
        verifiedPurchase: true,
      },
    ],
  },

  // 3. Winter '26-27 Polar Fleece
  {
    id: "dual-tone-alpine-polar-fleece-blanket",
    slug: "dual-tone-alpine-polar-fleece-blanket",
    name: "Dual-Tone Alpine Polar Fleece Blanket",
    subtitle: "Winter '26–27 Signature | Reversible Micro-Polar & Brushed Sherpa",
    category: "bedroom",
    subcategory: "Blankets & Mink",
    collection: "signature",
    price: 2199,
    originalPrice: 3299,
    discountPercent: 33,
    rating: 4.8,
    reviewsCount: 76,
    inStock: true,
    badge: "Reversible",
    isBestseller: false,
    isWinterLaunch: true,
    images: [
      "https://images.unsplash.com/photo-1582533561751-ef6f6ab93a2e?q=85&w=1200&auto=format&fit=crop",
      "https://images.unsplash.com/photo-1595526114035-0d45ed16cfbf?q=85&w=1200&auto=format&fit=crop",
    ],
    colors: [
      { name: "Slate & Sandstone", hex: "#7B756C" },
      { name: "Clay & Cream", hex: "#9E604F" },
      { name: "Olive & Almond", hex: "#5C654D" },
    ],
    sizes: [
      { name: "Queen", label: "Queen (85\" × 95\")", dimensions: "85\" × 95\"", dimensionsMetric: "216 cm × 241 cm", inStock: true, priceModifier: 0 },
      { name: "Single", label: "Single (60\" × 90\")", dimensions: "60\" × 90\"", dimensionsMetric: "152 cm × 228 cm", inStock: true, priceModifier: -500 },
      { name: "King", label: "King (95\" × 105\")", dimensions: "95\" × 105\"", dimensionsMetric: "241 cm × 267 cm", inStock: true, priceModifier: 500 },
    ],
    fabric: "Anti-Pill Polar Fleece + Brushed Sherpa Back",
    gsm: "460 GSM Composite",
    leadParagraph: "Two distinct tactile sensations in one blanket. One side features velvety smooth anti-pill micro-fleece in contemporary hues, reversing to butter-soft brushed sherpa.",
    materialCraft: "Hydro-entangled microfibers engineered for zero pilling even after 50 home washes.",
    specifications: {
      "Construction": "Dual-Sided Reversible Bonding",
      "Side A": "Anti-Pill Polar Fleece",
      "Side B": "Brushed Cloud Sherpa",
      "Origin": "Panipat, India",
    },
    careInstructions: ["Machine wash separately on gentle cycle", "Tumble dry low"],
    reviews: [
      {
        id: "rev-4",
        author: "Kavita Rao",
        city: "Bengaluru",
        rating: 5,
        date: "12 Oct 2026",
        title: "Perfect for moderate winter nights",
        comment: "Reversible color palette lets you switch bedroom mood instantly.",
        verifiedPurchase: true,
      },
    ],
  },

  // 4. Winter '26-27 Chamonix Reversible Sherpa (Completing 8 winter items)
  {
    id: "chamonix-reversible-sherpa-fleece",
    slug: "chamonix-reversible-sherpa-fleece",
    name: "Chamonix Reversible Sherpa Fleece Throw",
    subtitle: "Winter '26–27 Signature | 500 GSM Double-Faced Heavy Blanket",
    category: "bedroom",
    subcategory: "Blankets & Mink",
    collection: "signature",
    price: 2799,
    originalPrice: 4299,
    discountPercent: 35,
    rating: 4.9,
    reviewsCount: 68,
    inStock: true,
    badge: "Dual Texture",
    isBestseller: false,
    isWinterLaunch: true,
    images: [
      "https://images.unsplash.com/photo-1586023492125-27b2c045efd7?q=85&w=1200&auto=format&fit=crop",
      "https://images.unsplash.com/photo-1582533561751-ef6f6ab93a2e?q=85&w=1200&auto=format&fit=crop",
    ],
    colors: [
      { name: "Oat & Natural", hex: "#DDD6CB" },
      { name: "Taupe Stone", hex: "#8C8379" },
    ],
    sizes: [
      { name: "Queen", label: "Queen (85\" × 95\")", dimensions: "85\" × 95\"", dimensionsMetric: "216 cm × 241 cm", inStock: true, priceModifier: 0 },
      { name: "King", label: "King (95\" × 105\")", dimensions: "95\" × 105\"", dimensionsMetric: "241 cm × 267 cm", inStock: true, priceModifier: 600 },
    ],
    fabric: "High-Density Sherpa + Micro-Velour",
    gsm: "500 GSM",
    leadParagraph: "A tactile shelter against frosty evenings. Lush sheared fleece bonded with textured cloud sherpa, offering deep insulation and a relaxed mountain-lodge drape.",
    materialCraft: "Precision edge-bound with double-turn mitred velvet borders at Panipat works.",
    specifications: {
      "GSM": "500 GSM Dual Faced",
      "Finish": "Anti-Static & Non-Pilling",
      "Origin": "Panipat, Haryana",
    },
    careInstructions: ["Machine wash gentle cold", "Air dry flat"],
    reviews: [
      {
        id: "rev-ch1",
        author: "Manish K.",
        city: "Shimla",
        rating: 5,
        date: "16 Nov 2026",
        title: "Incredible warmth in Shimla temperatures",
        comment: "Weight is just right and keeps the bed warm through the coldest nights.",
        verifiedPurchase: true,
      },
    ],
  },

  // 5. Winter '26-27 Royal Velvet Flange Comforter
  {
    id: "royal-velvet-flange-down-alternative-comforter",
    slug: "royal-velvet-flange-down-alternative-comforter",
    name: "Royal Velvet-Flange Down-Alternative Comforter Set",
    subtitle: "Winter '26–27 Reserve | 450 GSM Micro-Loft Fill with 2 Pillow Shams",
    category: "bedroom",
    subcategory: "Comforters",
    collection: "reserve",
    price: 4299,
    originalPrice: 6899,
    discountPercent: 37,
    rating: 4.9,
    reviewsCount: 110,
    inStock: true,
    badge: "Reserve Edition",
    isBestseller: true,
    isWinterLaunch: true,
    isFeatured: true,
    images: [
      "https://images.unsplash.com/photo-1578683010236-d716f9a3f461?q=85&w=1200&auto=format&fit=crop",
      "https://images.unsplash.com/photo-1616486338812-3dadae4b4ace?q=85&w=1200&auto=format&fit=crop",
    ],
    colors: [
      { name: "Alabaster White", hex: "#F5F2EB" },
      { name: "Mineral Sage", hex: "#7E8C78" },
      { name: "Cinder Grey", hex: "#3F3C3A" },
    ],
    sizes: [
      { name: "King", label: "King (100\" × 108\") + 2 Shams", dimensions: "100\" × 108\"", dimensionsMetric: "254 cm × 274 cm", inStock: true, priceModifier: 600 },
      { name: "Queen", label: "Queen (90\" × 100\") + 2 Shams", dimensions: "90\" × 100\"", dimensionsMetric: "228 cm × 254 cm", inStock: true, priceModifier: 0 },
      { name: "Single", label: "Single (60\" × 90\") + 1 Sham", dimensions: "60\" × 90\"", dimensionsMetric: "152 cm × 228 cm", inStock: true, priceModifier: -800 },
    ],
    fabric: "600TC Micro-Sateen Shell + Virgin Micro-Loft Fill",
    gsm: "450 GSM Heavy Loft",
    leadParagraph: "A statement piece designed to replicate the sumptuous loft of European goose down without cruelty. Accented with an architectural 1.5-inch tailored velvet flange border.",
    materialCraft: "Individually box-stitched at KT International's automated Panipat quilting division to eliminate fiber clumping or shifting.",
    specifications: {
      "Fill": "100% Virgin Siliconised Down-Alternative Fiber",
      "Outer Shell": "Silky-smooth 600TC Peach-Finish Micro-Sateen",
      "Quilting Pattern": "Architectural 14\" Box Baffle Grid",
      "Included": "1 Comforter + 2 Matching Flanged Pillow Shams",
      "Origin": "Crafted in Panipat, Haryana",
    },
    careInstructions: ["Machine wash warm on gentle cycle", "Tumble dry low"],
    reviews: [
      {
        id: "rev-5",
        author: "Rohit Malhotra",
        city: "New Delhi",
        rating: 5,
        date: "05 Nov 2026",
        title: "Pure five-star luxury feel",
        comment: "Feels like staying at a luxury suite every night. The velvet flange detail makes the bed look opulent.",
        verifiedPurchase: true,
      },
    ],
  },

  // 6. Winter '26-27 All-Weather Comforter
  {
    id: "panipat-heritage-all-weather-microfiber-comforter",
    slug: "panipat-heritage-all-weather-microfiber-comforter",
    name: "Panipat Heritage All-Weather Microfiber Comforter",
    subtitle: "Winter '26–27 Essential | 300 GSM Diamond Stitched Everyday Duvet",
    category: "bedroom",
    subcategory: "Comforters",
    collection: "essential",
    price: 2299,
    originalPrice: 3499,
    discountPercent: 34,
    rating: 4.7,
    reviewsCount: 89,
    inStock: true,
    badge: "Essential",
    isBestseller: true,
    isWinterLaunch: true,
    images: [
      "https://images.unsplash.com/photo-1522771739844-6a9f6d5f14af?q=85&w=1200&auto=format&fit=crop",
      "https://images.unsplash.com/photo-1578683010236-d716f9a3f461?q=85&w=1200&auto=format&fit=crop",
    ],
    colors: [
      { name: "Pebble Grey & Chalk", hex: "#9E9892" },
      { name: "Deep Navy & Dove", hex: "#263238" },
      { name: "Sand & Linen", hex: "#D6CCC2" },
    ],
    sizes: [
      { name: "Queen", label: "Queen (88\" × 96\")", dimensions: "88\" × 96\"", dimensionsMetric: "224 cm × 244 cm", inStock: true, priceModifier: 0 },
      { name: "King", label: "King (96\" × 104\")", dimensions: "96\" × 104\"", dimensionsMetric: "244 cm × 264 cm", inStock: true, priceModifier: 400 },
      { name: "Single", label: "Single (60\" × 90\")", dimensions: "60\" × 90\"", dimensionsMetric: "152 cm × 228 cm", inStock: true, priceModifier: -500 },
    ],
    fabric: "Brushed Micro-Poly Outer + Hollow Siliconised Fill",
    gsm: "300 GSM",
    leadParagraph: "The workhorse comforter of modern Indian apartments. Ideal for year-round AC use and moderate winter months, featuring reversible colorways and machine-washable resilience.",
    materialCraft: "Precision diamond-quilting ensures uniform heat distribution. Lint-free performance.",
    specifications: {
      "GSM": "300 GSM All-Weather Loft",
      "Stitch": "Diamond Box Quilted with Piped Edge",
      "Origin": "Panipat, Haryana",
    },
    careInstructions: ["Machine wash cold, air dry"],
    reviews: [
      {
        id: "rev-6",
        author: "Shreya Sen",
        city: "Kolkata",
        rating: 5,
        date: "28 Oct 2026",
        title: "Light yet surprisingly warm",
        comment: "Great quality for the price. Survives regular wash cycles with no clumping.",
        verifiedPurchase: true,
      },
    ],
  },

  // 7. Winter '26-27 Malmal Pure Cotton Dohar
  {
    id: "malmal-pure-cotton-reversible-dohar",
    slug: "malmal-pure-cotton-reversible-dohar",
    name: "Malmal Pure Cotton Reversible Dohar",
    subtitle: "Winter '26–27 Essential | 3-Layer Falalen Pure Cotton Blanket",
    category: "bedroom",
    subcategory: "Dohars",
    collection: "essential",
    price: 1699,
    originalPrice: 2499,
    discountPercent: 32,
    rating: 4.9,
    reviewsCount: 164,
    inStock: true,
    badge: "Artisan Weave",
    isBestseller: true,
    isWinterLaunch: true,
    images: [
      "https://images.unsplash.com/photo-1598928506311-c55ded91a20c?q=85&w=1200&auto=format&fit=crop",
      "https://images.unsplash.com/photo-1522771739844-6a9f6d5f14af?q=85&w=1200&auto=format&fit=crop",
    ],
    colors: [
      { name: "Ivory & Charcoal Stripe", hex: "#EAE6DF" },
      { name: "Clay Motif", hex: "#B86751" },
      { name: "Sage Foliage", hex: "#637059" },
    ],
    sizes: [
      { name: "Double", label: "Double / Queen (88\" × 96\")", dimensions: "88\" × 96\"", dimensionsMetric: "224 cm × 244 cm", inStock: true, priceModifier: 0 },
      { name: "Single", label: "Single (60\" × 90\")", dimensions: "60\" × 90\"", dimensionsMetric: "152 cm × 228 cm", inStock: true, priceModifier: -400 },
      { name: "King", label: "King (96\" × 104\")", dimensions: "96\" × 104\"", dimensionsMetric: "244 cm × 264 cm", inStock: true, priceModifier: 300 },
    ],
    fabric: "100% Breathable Malmal Cotton + Pure Cotton Flannel Core",
    leadParagraph: "A quintessential Indian heirloom reinvented. Two layers of ethereal gossamer malmal encase a soft middle layer of 100% brushed cotton falalen, providing natural climate regulation.",
    materialCraft: "Finished with delicate needle-piped borders. Hypoallergenic and gets softer with every wash.",
    specifications: {
      "Structure": "Traditional 3-Layer Indian Dohar Weave",
      "Shell": "100% Mulmul Cotton (60s yarn count)",
      "Core": "Brushed Cotton Falalen Sheet",
      "Origin": "Panipat, Haryana",
    },
    careInstructions: ["Gentle hand or machine wash in cold water with mild detergent"],
    reviews: [
      {
        id: "rev-7",
        author: "Pooja Hegde",
        city: "Hyderabad",
        rating: 5,
        date: "01 Nov 2026",
        title: "Pure nostalgia with modern elegance",
        comment: "Reminds me of traditional dohars, but the styling is so minimal and chic.",
        verifiedPurchase: true,
      },
    ],
  },

  // 8. Winter '26-27 Signature Falalen Dohar
  {
    id: "signature-yarn-dyed-falalen-3-layer-dohar",
    slug: "signature-yarn-dyed-falalen-3-layer-dohar",
    name: "Signature Yarn-Dyed 3-Layer Falalen Dohar",
    subtitle: "Winter '26–27 Signature | Yarn-Dyed Textured Sateen Border",
    category: "bedroom",
    subcategory: "Dohars",
    collection: "signature",
    price: 2399,
    originalPrice: 3699,
    discountPercent: 35,
    rating: 4.9,
    reviewsCount: 71,
    inStock: true,
    badge: "Signature",
    isBestseller: false,
    isWinterLaunch: true,
    images: [
      "https://images.unsplash.com/photo-1583847268964-b28dc8f51f92?q=85&w=1200&auto=format&fit=crop",
      "https://images.unsplash.com/photo-1598928506311-c55ded91a20c?q=85&w=1200&auto=format&fit=crop",
    ],
    colors: [
      { name: "Pinstripe Linen Grey", hex: "#7E7873" },
      { name: "Earthy Terracotta Weave", hex: "#AB563C" },
    ],
    sizes: [
      { name: "Queen", label: "Queen (88\" × 98\")", dimensions: "88\" × 98\"", dimensionsMetric: "224 cm × 249 cm", inStock: true, priceModifier: 0 },
      { name: "King", label: "King (96\" × 106\")", dimensions: "96\" × 106\"", dimensionsMetric: "244 cm × 269 cm", inStock: true, priceModifier: 400 },
      { name: "Single", label: "Single (60\" × 90\")", dimensions: "60\" × 90\"", dimensionsMetric: "152 cm × 228 cm", inStock: true, priceModifier: -500 },
    ],
    fabric: "Yarn-Dyed 400TC Cotton Shell + Brushed Falalen Flannel",
    leadParagraph: "A heavier weight dohar tailored for early winter transitions and conditioned air. Crafted with yarn-dyed organic yarns that resist fading and create a sophisticated tactile weave.",
    materialCraft: "Finished with a 2-inch double-fold mitred sateen border.",
    specifications: {
      "GSM": "280 GSM Total Weight",
      "Origin": "Panipat, Haryana",
    },
    careInstructions: ["Machine wash cold, line dry in shade"],
    reviews: [
      {
        id: "rev-8",
        author: "Arjun Nair",
        city: "Mumbai",
        rating: 5,
        date: "20 Oct 2026",
        title: "Understated luxury",
        comment: "Subtle pinstriping looks very European. Feels wonderfully substantial.",
        verifiedPurchase: true,
      },
    ],
  },

  // 9. Core Bedsheet: Aura 400TC Supima Cotton Sateen
  {
    id: "aura-400tc-supima-cotton-sateen-bedsheet",
    slug: "aura-400tc-supima-cotton-sateen-bedsheet",
    name: "Aura 400TC Supima Cotton Sateen Bedsheet Set",
    subtitle: "Signature Collection | 1 King Bedsheet + 2 Flanged Pillowcases",
    category: "bedroom",
    subcategory: "Bedsheets",
    collection: "signature",
    price: 2199,
    originalPrice: 3299,
    discountPercent: 33,
    rating: 4.9,
    reviewsCount: 312,
    inStock: true,
    badge: "Bestseller",
    isBestseller: true,
    isFeatured: true,
    images: [
      "https://images.unsplash.com/photo-1505693416388-ac5ce068fe85?q=85&w=1200&auto=format&fit=crop",
      "https://images.unsplash.com/photo-1616486338812-3dadae4b4ace?q=85&w=1200&auto=format&fit=crop",
    ],
    colors: [
      { name: "Warm Linen Off-White", hex: "#F3EDE4" },
      { name: "Pale Sandstone", hex: "#DDD5CA" },
      { name: "Smoky Charcoal", hex: "#2E2A28" },
      { name: "Muted Terracotta", hex: "#B86751" },
    ],
    sizes: [
      { name: "King", label: "King (108\" × 108\") + 2 Pillowcases", dimensions: "108\" × 108\"", dimensionsMetric: "274 cm × 274 cm", inStock: true, priceModifier: 0 },
      { name: "Queen", label: "Queen (90\" × 108\") + 2 Pillowcases", dimensions: "90\" × 108\"", dimensionsMetric: "228 cm × 274 cm", inStock: true, priceModifier: -300 },
      { name: "Single", label: "Single (60\" × 90\") + 1 Pillowcase", dimensions: "60\" × 90\"", dimensionsMetric: "152 cm × 228 cm", inStock: true, priceModifier: -600 },
    ],
    fabric: "100% Long-Staple Supima Cotton Sateen",
    threadCount: "400 TC",
    leadParagraph: "The defining signature of AAVAAS sleeping comfort. Woven with authentic long-staple Supima yarns into an elevated 4-over-1 sateen weave, yielding pearlescent luster, breathability, and generous 108\" × 108\" tuck-in dimensions.",
    materialCraft: "Spun from combed extra-long staple fibers at KT International's Panipat facility. Calendered under high pressure for natural drape.",
    specifications: {
      "Thread Count": "400 Thread Count Long-Staple Sateen",
      "Set Includes": "1 Flat Bed Sheet (108\" × 108\") + 2 Flanged Pillowcases (18\" × 27\")",
      "Fit": "Generous deep tuck-in for mattresses up to 14\" height",
      "Origin": "Panipat, Haryana, India",
    },
    careInstructions: ["Machine wash warm with mild detergent", "Line dry in shade or tumble dry low"],
    reviews: [
      {
        id: "rev-9",
        author: "Dr. Sunita Varma",
        city: "New Delhi",
        rating: 5,
        date: "11 Nov 2026",
        title: "Finally, a bedsheet that actually stays tucked in!",
        comment: "Our 12-inch memory foam mattress always pulled normal bedsheets out. The 108x108 inch size is an absolute blessing.",
        verifiedPurchase: true,
      },
    ],
  },

  // 10. Core Bedsheet: Loom-Woven Washed Linen Percale
  {
    id: "loom-woven-washed-linen-percale-bedsheet",
    slug: "loom-woven-washed-linen-percale-bedsheet",
    name: "Loom-Woven Washed Linen & Percale Bedsheet",
    subtitle: "Reserve Collection | Belgian Flax Blend with Hand-Embroidered Hem",
    category: "bedroom",
    subcategory: "Bedsheets",
    collection: "reserve",
    price: 2499,
    originalPrice: 3899,
    discountPercent: 36,
    rating: 4.9,
    reviewsCount: 184,
    inStock: true,
    badge: "Reserve",
    isBestseller: true,
    isFeatured: true,
    images: [
      "https://images.unsplash.com/photo-1615873968403-89e068629265?q=85&w=1200&auto=format&fit=crop",
      "https://images.unsplash.com/photo-1505693416388-ac5ce068fe85?q=85&w=1200&auto=format&fit=crop",
    ],
    colors: [
      { name: "Natural Flax", hex: "#D7CEBE" },
      { name: "Chalk Off-White", hex: "#F5F3EC" },
      { name: "Olive Tint", hex: "#696E58" },
    ],
    sizes: [
      { name: "King", label: "King (108\" × 108\") + 2 Pillowcases", dimensions: "108\" × 108\"", dimensionsMetric: "274 cm × 274 cm", inStock: true, priceModifier: 0 },
      { name: "Queen", label: "Queen (90\" × 108\") + 2 Pillowcases", dimensions: "90\" × 108\"", dimensionsMetric: "228 cm × 274 cm", inStock: true, priceModifier: -300 },
    ],
    fabric: "55% Belgian Linen + 45% Combed Percale Cotton",
    leadParagraph: "A tactile reverie for lovers of natural textures. Combining the airy breathability and relaxed slub of genuine European flax with the supple softness of combed cotton percale.",
    materialCraft: "Garment washed in stone drums for lived-in comfort right out of the box.",
    specifications: {
      "Composition": "55% Flax Linen / 45% Combed Cotton Percale",
      "Set Includes": "1 King Bed Sheet + 2 Tailored Pillow Covers",
      "Origin": "Panipat, Haryana",
    },
    careInstructions: ["Machine wash cool, tumble dry low, embrace natural linen texture"],
    reviews: [
      {
        id: "rev-11",
        author: "Natasha Roy",
        city: "Bengaluru",
        rating: 5,
        date: "06 Nov 2026",
        title: "Wabi-sabi perfection",
        comment: "The earthy texture and breathability are unmatched.",
        verifiedPurchase: true,
      },
    ],
  },

  // 11. Core Bedsheet: Serene 300TC Crisp Matte Percale Fitted Sheet
  {
    id: "serene-300tc-matte-percale-fitted-sheet",
    slug: "serene-300tc-matte-percale-fitted-sheet",
    name: "Serene 300TC Crisp Matte Percale Fitted Sheet Set",
    subtitle: "Essential Collection | 360° Elasticized Grip with Deep 15\" Pockets",
    category: "bedroom",
    subcategory: "Bedsheets",
    collection: "essential",
    price: 1799,
    originalPrice: 2699,
    discountPercent: 33,
    rating: 4.8,
    reviewsCount: 240,
    inStock: true,
    badge: "Essential",
    isBestseller: true,
    images: [
      "https://images.unsplash.com/photo-1616594039964-ae9021a400a0?q=85&w=1200&auto=format&fit=crop",
      "https://images.unsplash.com/photo-1522771739844-6a9f6d5f14af?q=85&w=1200&auto=format&fit=crop",
    ],
    colors: [
      { name: "Linen Pure White", hex: "#FCFAF6" },
      { name: "Cool Stone Grey", hex: "#B0AAA1" },
      { name: "Soft Clay", hex: "#C7826F" },
    ],
    sizes: [
      { name: "Queen", label: "Queen (78\" × 60\" + 15\" Deep Pocket)", dimensions: "78\" × 60\" + 15\"", dimensionsMetric: "198 cm × 152 cm", inStock: true, priceModifier: 0 },
      { name: "King", label: "King (78\" × 72\" + 15\" Deep Pocket)", dimensions: "78\" × 72\" + 15\"", dimensionsMetric: "198 cm × 183 cm", inStock: true, priceModifier: 300 },
      { name: "Single", label: "Single (78\" × 36\" + 12\" Deep Pocket)", dimensions: "78\" × 36\" + 12\"", dimensionsMetric: "198 cm × 91 cm", inStock: true, priceModifier: -400 },
    ],
    fabric: "100% Breathable Long-Staple Cotton Percale",
    threadCount: "300 TC Matte Weave",
    leadParagraph: "Crisp, cool, and matte. Modeled after the snappy, freshly pressed cotton sheets of luxury heritage hotels. Fitted with a heavy-duty continuous 360° elastic hem that grips the mattress firmly.",
    materialCraft: "Traditional 1-under-1-over percale weave allows high airflow. No slippery feel.",
    specifications: {
      "Grip System": "360-degree reinforced elastic band",
      "Pocket Depth": "Accommodates up to 15\" mattress depth",
      "Contents": "1 Fitted Sheet + 2 Pillowcases",
      "Origin": "Panipat, Haryana",
    },
    careInstructions: ["Machine wash normal cycle, medium dry"],
    reviews: [
      {
        id: "rev-12",
        author: "Vikram Sethi",
        city: "Jaipur",
        rating: 5,
        date: "09 Nov 2026",
        title: "Snug fit and doesn't budge",
        comment: "Finally no more messy unmade bed every morning. Crisp cool feel.",
        verifiedPurchase: true,
      },
    ],
  },

  // 12. Core Bedsheet: Ivory Heritage Hand-Block Motif
  {
    id: "ivory-heritage-hand-block-motif-bedsheet",
    slug: "ivory-heritage-hand-block-motif-bedsheet",
    name: "Ivory Heritage Hand-Block Motif King Bedsheet",
    subtitle: "Signature Collection | Hand-Drawn Minimalist Indian Arch Motif",
    category: "bedroom",
    subcategory: "Bedsheets",
    collection: "signature",
    price: 1999,
    originalPrice: 2999,
    discountPercent: 33,
    rating: 4.8,
    reviewsCount: 153,
    inStock: true,
    badge: "Heritage Motif",
    isBestseller: true,
    images: [
      "https://images.unsplash.com/photo-1616046229478-9901c5536a45?q=85&w=1200&auto=format&fit=crop",
      "https://images.unsplash.com/photo-1598928506311-c55ded91a20c?q=85&w=1200&auto=format&fit=crop",
    ],
    colors: [
      { name: "Ivory & Charcoal", hex: "#FAF7F2" },
      { name: "Ivory & Deep Indigo", hex: "#2C394B" },
      { name: "Ivory & Ochre", hex: "#B8860B" },
    ],
    sizes: [
      { name: "King", label: "King (108\" × 108\") + 2 Pillowcases", dimensions: "108\" × 108\"", dimensionsMetric: "274 cm × 274 cm", inStock: true, priceModifier: 0 },
      { name: "Queen", label: "Queen (90\" × 108\") + 2 Pillowcases", dimensions: "90\" × 108\"", dimensionsMetric: "228 cm × 274 cm", inStock: true, priceModifier: -300 },
    ],
    fabric: "100% Fine Combed Sateen Cotton (350 TC)",
    leadParagraph: "A bridge between ancient Indian architectural motifs and minimalist modern interiors. Subtle geometric jali and arch silhouettes printed with eco-friendly water-based pigments.",
    materialCraft: "Screen-crafted with precision alignment at KT International's printing facility in Panipat.",
    specifications: {
      "Dyes": "AZO-Free Eco Inks",
      "Contents": "1 Bedsheet (108\" × 108\") + 2 Pillowcases",
      "Origin": "Panipat, Haryana",
    },
    careInstructions: ["Machine wash gentle with cold water, inside out"],
    reviews: [
      {
        id: "rev-13",
        author: "Priyanka Sen",
        city: "Kolkata",
        rating: 5,
        date: "25 Oct 2026",
        title: "Subtle elegance without being loud",
        comment: "Serene restraint and wonderfully soft.",
        verifiedPurchase: true,
      },
    ],
  },

  // 13. Bath: Zero-Twist Turkish Combed Bath Sheet Set
  {
    id: "zero-twist-turkish-combed-bath-sheet-set",
    slug: "zero-twist-turkish-combed-bath-sheet-set",
    name: "Zero-Twist Combed Turkish Bath Sheet Set (Set of 2)",
    subtitle: "Signature Collection | 700 GSM Spa-Density Ultra-Absorbent Terry",
    category: "bath",
    subcategory: "Bath Towels",
    collection: "signature",
    price: 1899,
    originalPrice: 2899,
    discountPercent: 34,
    rating: 4.9,
    reviewsCount: 167,
    inStock: true,
    badge: "Spa Quality",
    isBestseller: true,
    isFeatured: true,
    images: [
      "https://images.unsplash.com/photo-1617806118233-18e1de247200?q=85&w=1200&auto=format&fit=crop",
      "https://images.unsplash.com/photo-1563298723-dcfebaa392e3?q=85&w=1200&auto=format&fit=crop",
    ],
    colors: [
      { name: "Warm Stone", hex: "#DDD5CA" },
      { name: "Mineral Sage", hex: "#7E8C78" },
      { name: "Charcoal Slate", hex: "#35322F" },
    ],
    sizes: [
      { name: "Bath Sheet Pair", label: "2 Jumbo Bath Sheets (35\" × 70\")", dimensions: "35\" × 70\"", dimensionsMetric: "90 cm × 178 cm", inStock: true, priceModifier: 0 },
      { name: "Complete 4-Piece Set", label: "2 Bath Sheets + 2 Hand Towels", dimensions: "Multi-Pack", dimensionsMetric: "Various", inStock: true, priceModifier: 700 },
    ],
    fabric: "100% Combed Turkish Staple Cotton (Zero-Twist Loops)",
    gsm: "700 GSM",
    leadParagraph: "Heavy, cloud-like, and rapidly absorbent. Woven with un-twisted cotton yarns that leave microscopic air chambers within every loop, blotting moisture instantly while staying supple wash after wash.",
    materialCraft: "Panipat terry loom precision. Features ribbed dobby headers and reinforced double-lock side hems.",
    specifications: {
      "GSM": "700 GSM High-Density Pile",
      "Contents": "Set of 2 Jumbo Bath Sheets",
      "Origin": "Panipat, Haryana",
    },
    careInstructions: ["Machine wash warm, avoid fabric softener to preserve absorbency"],
    reviews: [
      {
        id: "rev-14",
        author: "Rohan Kapoor",
        city: "Mumbai",
        rating: 5,
        date: "07 Nov 2026",
        title: "Legit hotel quality",
        comment: "Dries your body in one touch. The generous 35x70 size wraps around completely.",
        verifiedPurchase: true,
      },
    ],
  },

  // 14. Living: Panipat Hand-Tufted Boucle Cushion Cover Pair
  {
    id: "panipat-hand-tufted-boucle-cushion-cover-pair",
    slug: "panipat-hand-tufted-boucle-cushion-cover-pair",
    name: "Panipat Hand-Tufted Bouclé Cushion Cover (Set of 2)",
    subtitle: "Signature Collection | Tactile Wool & Cotton Architectural Relief",
    category: "living",
    subcategory: "Cushions & Covers",
    collection: "signature",
    price: 1499,
    originalPrice: 2299,
    discountPercent: 35,
    rating: 4.8,
    reviewsCount: 88,
    inStock: true,
    badge: "Handloom",
    isBestseller: true,
    images: [
      "https://images.unsplash.com/photo-1618221195710-dd6b41faaea6?q=85&w=1200&auto=format&fit=crop",
      "https://images.unsplash.com/photo-1582533561751-ef6f6ab93a2e?q=85&w=1200&auto=format&fit=crop",
    ],
    colors: [
      { name: "Raw Ecru & Taupe", hex: "#EBE3D5" },
      { name: "Terracotta & Dune", hex: "#B05B43" },
      { name: "Forest Moss", hex: "#4B543D" },
    ],
    sizes: [
      { name: "18\" × 18\"", label: "Set of 2 (18\" × 18\")", dimensions: "18\" × 18\"", dimensionsMetric: "45 cm × 45 cm", inStock: true, priceModifier: 0 },
      { name: "20\" × 20\"", label: "Set of 2 (20\" × 20\")", dimensions: "20\" × 20\"", dimensionsMetric: "50 cm × 50 cm", inStock: true, priceModifier: 300 },
    ],
    fabric: "70% Wool-Bouclé Loop + 30% Cotton Slub Canvas",
    leadParagraph: "A tactile centerpiece for sofa and lounge seating. Tufted with organic bouclé loops on sturdy handloom cotton backing, closed with a concealed brass zipper.",
    materialCraft: "Individually tufted by skilled artisans in Panipat, Haryana.",
    specifications: {
      "Closure": "Concealed heavy-duty zipper",
      "Contents": "Pair of 2 Cushion Covers",
      "Origin": "Panipat, Haryana",
    },
    careInstructions: ["Spot clean or gentle dry clean only"],
    reviews: [
      {
        id: "rev-15",
        author: "Alia Merchant",
        city: "New Delhi",
        rating: 5,
        date: "03 Nov 2026",
        title: "Looks straight out of an architectural shoot",
        comment: "Heavy, rich texture. Elevates our sofa immediately.",
        verifiedPurchase: true,
      },
    ],
  },

  // 15. Dining: Belgian-Finish Washed Linen Table Runner
  {
    id: "belgian-finish-washed-linen-table-runner-set",
    slug: "belgian-finish-washed-linen-table-runner-set",
    name: "Belgian-Finish Washed Linen Table Runner & Napkin Suite",
    subtitle: "Signature Collection | 1 Runner (14\" × 90\") + 6 Hemstitched Napkins",
    category: "dining",
    subcategory: "Table Runners",
    collection: "signature",
    price: 1699,
    originalPrice: 2499,
    discountPercent: 32,
    rating: 4.8,
    reviewsCount: 62,
    inStock: true,
    badge: "Artisanal Linen",
    images: [
      "https://images.unsplash.com/photo-1615066390971-03e4e1c36ddf?q=85&w=1200&auto=format&fit=crop",
      "https://images.unsplash.com/photo-1513885535751-8b9238bd345a?q=85&w=1200&auto=format&fit=crop",
    ],
    colors: [
      { name: "Oatmeal Natural", hex: "#D9CFBE" },
      { name: "Clay Rust", hex: "#A8533D" },
      { name: "Sage Olive", hex: "#5C674E" },
    ],
    sizes: [
      { name: "6-Seater Set", label: "Runner (14\" × 90\") + 6 Napkins", dimensions: "14\" × 90\"", dimensionsMetric: "36 cm × 228 cm", inStock: true, priceModifier: 0 },
      { name: "8-Seater Set", label: "Runner (14\" × 108\") + 8 Napkins", dimensions: "14\" × 108\"", dimensionsMetric: "36 cm × 274 cm", inStock: true, priceModifier: 400 },
    ],
    fabric: "100% Washed Linen-Cotton Slub",
    leadParagraph: "Understated drama for everyday dinners and festive celebrations. Softly rumpled linen drape with classic 1-inch mitered corners.",
    materialCraft: "Yarn-dyed and enzyme washed in Panipat.",
    specifications: {
      "Contents": "1 Table Runner + 6 Matching Hemstitched Napkins (18\" × 18\")",
      "Origin": "Panipat, Haryana",
    },
    careInstructions: ["Machine wash cold, line dry"],
    reviews: [
      {
        id: "rev-16",
        author: "Siddharth Jain",
        city: "Jaipur",
        rating: 5,
        date: "29 Oct 2026",
        title: "Elevates our teak dining table",
        comment: "Drapes gracefully and washes very easily.",
        verifiedPurchase: true,
      },
    ],
  },

  // 16. Gifting: Noor Heirloom Wedding Gift Suite (Verified Neutral Kraft/Linen ribbon - NO PINK)
  {
    id: "noor-heirloom-wedding-gift-hamper",
    slug: "noor-heirloom-wedding-gift-hamper",
    name: "The Noor Heirloom Wedding & Festive Gift Suite",
    subtitle: "Reserve Collection | 1 600TC King Sheet Set + 2 Falalen Dohars + Linen Trunk",
    category: "gifting",
    subcategory: "Wedding Hampers",
    collection: "reserve",
    price: 6499,
    originalPrice: 9999,
    discountPercent: 35,
    rating: 5.0,
    reviewsCount: 54,
    inStock: true,
    badge: "Reserve Heirloom",
    isBestseller: true,
    isFeatured: true,
    images: [
      "https://images.unsplash.com/photo-1513885535751-8b9238bd345a?q=85&w=1200&auto=format&fit=crop",
      "https://images.unsplash.com/photo-1544816155-12df9643f363?q=85&w=1200&auto=format&fit=crop",
      "https://images.unsplash.com/photo-1505693416388-ac5ce068fe85?q=85&w=1200&auto=format&fit=crop",
    ],
    colors: [
      { name: "Ivory & Champagne", hex: "#EFE8DC" },
      { name: "Terracotta Earth", hex: "#B96D57" },
    ],
    sizes: [
      { name: "Grand Suite", label: "King Bed Set + 2 AC Dohars + Trunk", dimensions: "Luxury Box Set", dimensionsMetric: "Bespoke", inStock: true, priceModifier: 0 },
    ],
    fabric: "600TC Egyptian Sateen + Malmal Falalen",
    leadParagraph: "A celebratory tribute to new beginnings. Enclosed inside a handcrafted rigid keepsake trunk wrapped in natural linen with brass clasps, this curated gift suite brings together AAVAAS's finest bedding.",
    materialCraft: "Includes customized personalized calligraphy gift card and embossed warranty seal from KT International.",
    specifications: {
      "Included Products": "1 Reserve 600TC King Bedsheet + 2 Pillowcases + 2 Malmal Flannel Dohars + 1 Linen Scented Candle",
      "Packaging": "Handmade Linen Wrapped Wooden Trunk with Brass Clasp",
      "Origin": "Panipat, Haryana",
    },
    careInstructions: ["Care cards included inside trunk"],
    reviews: [
      {
        id: "rev-17",
        author: "Vikramaditya Singhania",
        city: "Jaipur",
        rating: 5,
        date: "10 Nov 2026",
        title: "The most appreciated wedding gift we sent this year",
        comment: "The presentation in the linen trunk is unmatched. Truly feels like an heirloom trousseau gift.",
        verifiedPurchase: true,
      },
    ],
  },

  // 17. Soft Furnishings: Sheer Belgian Flax Drapes
  {
    id: "sheer-belgian-flax-linen-curtains-pair",
    slug: "sheer-belgian-flax-linen-curtains-pair",
    name: "Sheer Belgian-Flax Light-Filtering Drapes (Set of 2)",
    subtitle: "Soft Furnishings | 9ft Tailored Panels with 3-in-1 Dual Pocket & Back Tabs",
    category: "soft-furnishings",
    subcategory: "Linen Curtains",
    collection: "signature",
    price: 2699,
    originalPrice: 3999,
    discountPercent: 32,
    rating: 4.8,
    reviewsCount: 94,
    inStock: true,
    badge: "Light Filtering",
    images: [
      "https://images.unsplash.com/photo-1513694203232-719a280e022f?q=85&w=1200&auto=format&fit=crop",
      "https://images.unsplash.com/photo-1618221195710-dd6b41faaea6?q=85&w=1200&auto=format&fit=crop",
    ],
    colors: [
      { name: "Chalk White", hex: "#FAF8F5" },
      { name: "Warm Natural Flax", hex: "#DDD6C7" },
      { name: "Smoky Greige", hex: "#9E978D" },
    ],
    sizes: [
      { name: "9 Feet", label: "Set of 2 Panels (54\" W × 108\" L / 9 ft)", dimensions: "54\" × 108\"", dimensionsMetric: "137 cm × 274 cm", inStock: true, priceModifier: 0 },
      { name: "7 Feet", label: "Set of 2 Panels (54\" W × 84\" L / 7 ft)", dimensions: "54\" × 84\"", dimensionsMetric: "137 cm × 213 cm", inStock: true, priceModifier: -300 },
      { name: "10 Feet", label: "Set of 2 Panels (54\" W × 120\" L / 10 ft)", dimensions: "54\" × 120\"", dimensionsMetric: "137 cm × 305 cm", inStock: true, priceModifier: 400 },
    ],
    fabric: "Pure Flax Linen Blend with Textured Slub",
    leadParagraph: "Softens harsh daylight into a glowing, ethereal ambiance. Woven with authentic textured slub threads that drape fluidly and pool gently at the floor.",
    materialCraft: "Features weighted corner hems to prevent flaring in cross breezes.",
    specifications: {
      "Opacity": "Light-filtering semi-sheer",
      "Quantity": "Pair of 2 Drapes with Weighted Hems",
      "Origin": "Panipat, Haryana",
    },
    careInstructions: ["Machine wash gentle in laundry mesh bag, line dry"],
    reviews: [
      {
        id: "rev-18",
        author: "Nandini Mathur",
        city: "Gurugram",
        rating: 5,
        date: "06 Nov 2026",
        title: "Magnificent drape and airy quality",
        comment: "Transformed our windows. Diffuses the bright sun into a warm glow.",
        verifiedPurchase: true,
      },
    ],
  },
];
