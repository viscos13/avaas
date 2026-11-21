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
  // Winter '26-27 Mink Blankets & Polar Fleece
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
    badge: "Winter '26–27 Reserve",
    isBestseller: true,
    isWinterLaunch: true,
    isFeatured: true,
    images: [
      "https://images.unsplash.com/photo-1540518614846-7ede433c4ef7?q=80&w=1200&auto=format&fit=crop",
      "https://images.unsplash.com/photo-1505693416388-ac5ce068fe85?q=80&w=1200&auto=format&fit=crop",
      "https://images.unsplash.com/photo-1584100936595-c0654b55a2e2?q=80&w=1200&auto=format&fit=crop",
      "https://images.unsplash.com/photo-1616486338812-3dadae4b4ace?q=80&w=1200&auto=format&fit=crop",
    ],
    colors: [
      { name: "Oatmeal Stone", hex: "#E3DAC9" },
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
      "Dry clean recommended for first seasonal wash",
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
      {
        id: "rev-2",
        author: "Ananya Deshmukh",
        city: "Pune",
        rating: 5,
        date: "02 Nov 2026",
        title: "The stitching and weight are pure five-star hotel grade",
        comment: "KT International's Panipat heritage clearly shows in the precision edging. Delivered in 2 days to Pune with luxury linen packaging.",
        verifiedPurchase: true,
      },
    ],
  },

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
    badge: "Winter '26–27 Signature",
    isBestseller: true,
    isWinterLaunch: true,
    images: [
      "https://images.unsplash.com/photo-1584100936595-c0654b55a2e2?q=80&w=1200&auto=format&fit=crop",
      "https://images.unsplash.com/photo-1540518614846-7ede433c4ef7?q=80&w=1200&auto=format&fit=crop",
      "https://images.unsplash.com/photo-1522771739844-6a9f6d5f14af?q=80&w=1200&auto=format&fit=crop",
    ],
    colors: [
      { name: "Warm Linen Ivory", hex: "#F3EDE2" },
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
    leadParagraph: "A modern homage to Kashmiri trellis motifs. Intricately embossed with thermal carving technology for multidimensional depth and cozy, breathable warmth throughout Indian winter nights.",
    materialCraft: "Constructed with hollow-core thermal fibers that trap warm air pockets while letting moisture escape. Finished with matched silk-matte binding.",
    specifications: {
      "GSM": "550 GSM Embossed Thermal Weave",
      "Texture": "High-Definition 3D Embossed Pattern",
      "Border": "Reinforced 3-inch Velvet Hem",
      "Weight": "Approx. 2.9 kg (Queen)",
      "Country of Origin": "India (Crafted in Panipat by KT International)",
    },
    careInstructions: [
      "Gentle machine wash with cold water",
      "Spin dry low, do not wring",
      "Keep away from direct heat sources",
    ],
    reviews: [
      {
        id: "rev-3",
        author: "Devendra Verma",
        city: "Gurugram",
        rating: 5,
        date: "08 Nov 2026",
        title: "Subtle pattern and very warm",
        comment: "Does not look tacky like old-style loud blankets. Very tasteful beige tone and kept us cozy without AC heating.",
        verifiedPurchase: true,
      },
    ],
  },

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
    badge: "Reversible Design",
    isBestseller: false,
    isWinterLaunch: true,
    images: [
      "https://images.unsplash.com/photo-1598928506311-c55ded91a20c?q=80&w=1200&auto=format&fit=crop",
      "https://images.unsplash.com/photo-1540518614846-7ede433c4ef7?q=80&w=1200&auto=format&fit=crop",
      "https://images.unsplash.com/photo-1618221195710-dd6b41faaea6?q=80&w=1200&auto=format&fit=crop",
    ],
    colors: [
      { name: "Slate & Sandstone", hex: "#4E5452" },
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
    leadParagraph: "Two distinct tactile sensations in one blanket. One side features velvety smooth anti-pill micro-fleece in contemporary hues, reversing to butter-soft brushed sherpa for deep winter comfort.",
    materialCraft: "Hydro-entangled microfibers engineered for zero pilling even after 50 home washes. Thermal efficiency without heavy bulk.",
    specifications: {
      "Construction": "Dual-Sided Reversible Bonding",
      "Side A": "Anti-Pill High-Density Polar Fleece",
      "Side B": "Ultra-Warm Brushed Cloud Sherpa",
      "Safety": "Non-Toxic Dyes, Zero Formaldehyde",
      "Origin": "Panipat, India",
    },
    careInstructions: [
      "Machine wash separately on gentle cycle",
      "Tumble dry with no heat or low heat",
    ],
    reviews: [
      {
        id: "rev-4",
        author: "Kavita Rao",
        city: "Bengaluru",
        rating: 5,
        date: "12 Oct 2026",
        title: "Perfect for Bengaluru AC and mild winters",
        comment: "Reversible color palette lets you switch bedroom mood instantly. Light enough to drape over yourself on the couch too.",
        verifiedPurchase: true,
      },
    ],
  },

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
    badge: "Reserve Bestseller",
    isBestseller: true,
    isWinterLaunch: true,
    isFeatured: true,
    images: [
      "https://images.unsplash.com/photo-1505693416388-ac5ce068fe85?q=80&w=1200&auto=format&fit=crop",
      "https://images.unsplash.com/photo-1540518614846-7ede433c4ef7?q=80&w=1200&auto=format&fit=crop",
      "https://images.unsplash.com/photo-1616486338812-3dadae4b4ace?q=80&w=1200&auto=format&fit=crop",
    ],
    colors: [
      { name: "Alabaster White", hex: "#F8F6F0" },
      { name: "Mineral Sage", hex: "#7E8C78" },
      { name: "Cinder Grey", hex: "#3F3C3A" },
    ],
    sizes: [
      { name: "King", label: "King (100\" × 108\") + 2 Shams", dimensions: "100\" × 108\"", dimensionsMetric: "254 cm × 274 cm", inStock: true, priceModifier: 600 },
      { name: "Queen", label: "Queen (90\" × 100\") + 2 Shams", dimensions: "90\" × 100\"", dimensionsMetric: "228 cm × 254 cm", inStock: true, priceModifier: 0 },
      { name: "Single", label: "Single (60\" × 90\") + 1 Sham", dimensions: "60\" × 90\"", dimensionsMetric: "152 cm × 228 cm", inStock: true, priceModifier: -800 },
    ],
    fabric: "600TC Micro-Sateen Shell + Virgin Micro-Loft Fill",
    gsm: "450 GSM All-Season Heavy Loft",
    leadParagraph: "A statement piece designed to replicate the sumptuous loft of European goose down without cruelty. Accented with an architectural 1.5-inch tailored velvet flange border.",
    materialCraft: "Individually box-stitched at KT International's automated Panipat quilting division to eliminate fiber clumping or shifting. 8 corner loops allow seamless duvet insertion.",
    specifications: {
      "Fill": "100% Virgin Siliconised Down-Alternative Fiber",
      "Outer Shell": "Silky-smooth 600TC Peach-Finish Micro-Sateen",
      "Quilting Pattern": "Architectural 14\" Box Baffle Grid",
      "Included": "1 Comforter + 2 Matching Flanged Pillow Shams",
      "Origin": "Crafted in Panipat, Haryana",
    },
    careInstructions: [
      "Machine wash warm on gentle cycle",
      "Tumble dry low with wool dryer balls to restore loft",
    ],
    reviews: [
      {
        id: "rev-5",
        author: "Rohit Malhotra",
        city: "New Delhi",
        rating: 5,
        date: "05 Nov 2026",
        title: "Pure five-star luxury feeling",
        comment: "Feels like staying at the Oberoi or Taj every night. The velvet flange detail makes the bed look professionally made up.",
        verifiedPurchase: true,
      },
    ],
  },

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
    badge: "Everyday Classic",
    isBestseller: true,
    isWinterLaunch: true,
    images: [
      "https://images.unsplash.com/photo-1522771739844-6a9f6d5f14af?q=80&w=1200&auto=format&fit=crop",
      "https://images.unsplash.com/photo-1540518614846-7ede433c4ef7?q=80&w=1200&auto=format&fit=crop",
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
    materialCraft: "Precision diamond-quilting ensures uniform heat distribution. Designed for zero maintenance and lint-free performance.",
    specifications: {
      "GSM": "300 GSM All-Weather Loft",
      "Stitch": "Diamond Box Quilted with Piped Edge",
      "Loops": "Corner and Side Duvet Ties",
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
        comment: "Great quality for the price. Survives regular wash cycles without lumpiness.",
        verifiedPurchase: true,
      },
    ],
  },

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
      "https://images.unsplash.com/photo-1598928506311-c55ded91a20c?q=80&w=1200&auto=format&fit=crop",
      "https://images.unsplash.com/photo-1540518614846-7ede433c4ef7?q=80&w=1200&auto=format&fit=crop",
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
    leadParagraph: "A quintessential Indian heirloom reinvented. Two layers of ethereal gossamer malmal encase a soft middle layer of 100% brushed cotton falalen, providing natural, non-sweating climate regulation.",
    materialCraft: "Hand-printed block designs framed by delicate needle-piped borders. Breathable, hypoallergenic, and gets progressively softer with each wash.",
    specifications: {
      "Structure": "Traditional 3-Layer Indian Dohar Weave",
      "Shell": "100% Mulmul Cotton (60s yarn count)",
      "Core": "Brushed Cotton Falalen Sheet",
      "Origin": "Panipat, Haryana",
    },
    careInstructions: ["Gentle hand or machine wash in cold water with liquid soap"],
    reviews: [
      {
        id: "rev-7",
        author: "Pooja Hegde",
        city: "Hyderabad",
        rating: 5,
        date: "01 Nov 2026",
        title: "Pure nostalgia with modern elegance",
        comment: "Reminds me of the dohars my grandmother used to pack, but the styling is so minimal and chic for our apartment.",
        verifiedPurchase: true,
      },
    ],
  },

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
    badge: "Signature Craft",
    isBestseller: false,
    isWinterLaunch: true,
    images: [
      "https://images.unsplash.com/photo-1540518614846-7ede433c4ef7?q=80&w=1200&auto=format&fit=crop",
      "https://images.unsplash.com/photo-1522771739844-6a9f6d5f14af?q=80&w=1200&auto=format&fit=crop",
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

  // Core Bedsheets (Indicative Range ₹1,500 – ₹2,500)
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
    badge: "Core Bestseller",
    isBestseller: true,
    isFeatured: true,
    images: [
      "https://images.unsplash.com/photo-1522771739844-6a9f6d5f14af?q=80&w=1200&auto=format&fit=crop",
      "https://images.unsplash.com/photo-1540518614846-7ede433c4ef7?q=80&w=1200&auto=format&fit=crop",
      "https://images.unsplash.com/photo-1598928506311-c55ded91a20c?q=80&w=1200&auto=format&fit=crop",
      "https://images.unsplash.com/photo-1505693416388-ac5ce068fe85?q=80&w=1200&auto=format&fit=crop",
    ],
    colors: [
      { name: "Warm Linen Off-White", hex: "#F7F4EE" },
      { name: "Pale Sandstone", hex: "#E5DDD3" },
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
    leadParagraph: "The defining signature of AAVAAS sleeping comfort. Woven with authentic long-staple Supima yarns into an elevated 4-over-1 sateen weave, yielding a pearlescent luster, feather-light breathability, and deep 108\" × 108\" tuck-in dimensions for thick Indian mattresses.",
    materialCraft: "Spun from combed extra-long staple fibers at KT International's Panipat spinning lines. Calendered under high pressure for a natural silk-like drape without synthetic coatings.",
    specifications: {
      "Thread Count": "400 Thread Count Long-Staple Sateen",
      "Yarn Quality": "100% Combed Compact Cotton (60s Single Ply)",
      "Set Includes": "1 Flat Bed Sheet (108\" × 108\") + 2 Flanged Pillowcases (18\" × 27\")",
      "Fit": "Generous deep tuck-in for mattresses up to 14\" height",
      "Eco Certification": "Oeko-Tex Standard 100 Class 1",
      "Origin": "Panipat, Haryana, India",
    },
    careInstructions: [
      "Machine wash warm with mild plant-based detergent",
      "Do not use chlorine bleach or optical brighteners",
      "Line dry in shade or tumble dry low",
      "Warm iron if desired for that crisp boutique hotel press",
    ],
    reviews: [
      {
        id: "rev-9",
        author: "Dr. Sunita Varma",
        city: "New Delhi",
        rating: 5,
        date: "11 Nov 2026",
        title: "Finally, a bedsheet that actually stays tucked in!",
        comment: "Our 12-inch memory foam mattress always pulled normal bedsheets out. The 108x108 inch size of AAVAAS is an absolute blessing. Silky smooth, breathable, and no wrinkles.",
        verifiedPurchase: true,
      },
      {
        id: "rev-10",
        author: "Karan Johar Oberoi",
        city: "Mumbai",
        rating: 5,
        date: "04 Nov 2026",
        title: "The tactile feel is identical to luxury European brands",
        comment: "I usually bought sheets from Zara Home or West Elm at 3x the price. AAVAAS proves Indian manufacturing in Panipat can match or exceed European finishes.",
        verifiedPurchase: true,
      },
    ],
  },

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
    badge: "Reserve Masterpiece",
    isBestseller: true,
    isFeatured: true,
    images: [
      "https://images.unsplash.com/photo-1505693416388-ac5ce068fe85?q=80&w=1200&auto=format&fit=crop",
      "https://images.unsplash.com/photo-1540518614846-7ede433c4ef7?q=80&w=1200&auto=format&fit=crop",
      "https://images.unsplash.com/photo-1522771739844-6a9f6d5f14af?q=80&w=1200&auto=format&fit=crop",
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
    materialCraft: "Garment washed in stone drums for lived-in comfort right out of the box. Finished with a subtle tone-on-tone hemstitch border.",
    specifications: {
      "Composition": "55% Flax Linen / 45% Combed Cotton Percale",
      "Finish": "Pre-Washed Enzyme Tumbled Soft Finish",
      "Set Includes": "1 King Bed Sheet + 2 Tailored Pillow Covers",
      "Origin": "Panipat, Haryana",
    },
    careInstructions: ["Machine wash cool, tumble dry low, embrace natural linen wrinkles"],
    reviews: [
      {
        id: "rev-11",
        author: "Natasha Roy",
        city: "Bengaluru",
        rating: 5,
        date: "06 Nov 2026",
        title: "Wabi-sabi perfection",
        comment: "The earthy texture and breathability are unmatched. Keeps you cool and comfortable all night.",
        verifiedPurchase: true,
      },
    ],
  },

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
    badge: "Essential Value",
    isBestseller: true,
    images: [
      "https://images.unsplash.com/photo-1540518614846-7ede433c4ef7?q=80&w=1200&auto=format&fit=crop",
      "https://images.unsplash.com/photo-1522771739844-6a9f6d5f14af?q=80&w=1200&auto=format&fit=crop",
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
    materialCraft: "Traditional 1-under-1-over percale weave allows high airflow. No slippery feel, no bunching.",
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
        comment: "Finally no more messy unmade bed every morning. Crisp cool feel that gets better after wash.",
        verifiedPurchase: true,
      },
    ],
  },

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
    badge: "Heritage Print",
    isBestseller: true,
    images: [
      "https://images.unsplash.com/photo-1598928506311-c55ded91a20c?q=80&w=1200&auto=format&fit=crop",
      "https://images.unsplash.com/photo-1540518614846-7ede433c4ef7?q=80&w=1200&auto=format&fit=crop",
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
    leadParagraph: "A bridge between ancient Indian architectural motifs and minimalist Scandinavian interiors. Subtle geometric jali and arch silhouettes printed with eco-friendly water-based pigments.",
    materialCraft: "Screen-crafted with precision alignment at KT International's specialized printing house in Panipat.",
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
        comment: "Most Indian printed sheets have too much going on. This design has serene restraint.",
        verifiedPurchase: true,
      },
    ],
  },

  // Bath, Living, Dining, Soft Furnishings, Gifting Products
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
      "https://images.unsplash.com/photo-1616486338812-3dadae4b4ace?q=80&w=1200&auto=format&fit=crop",
      "https://images.unsplash.com/photo-1584100936595-c0654b55a2e2?q=80&w=1200&auto=format&fit=crop",
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
      "Yarn Structure": "Zero-Twist Turkish Combed Cotton",
      "Contents": "Set of 2 Jumbo Bath Sheets",
      "Origin": "Panipat, Haryana",
    },
    careInstructions: ["Machine wash warm, do not use fabric softener to preserve absorbency"],
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
    badge: "Handloom Textured",
    isBestseller: true,
    images: [
      "https://images.unsplash.com/photo-1618221195710-dd6b41faaea6?q=80&w=1200&auto=format&fit=crop",
      "https://images.unsplash.com/photo-1540518614846-7ede433c4ef7?q=80&w=1200&auto=format&fit=crop",
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
    leadParagraph: "A tactile centerpiece for sofa and lounge seating. Tufted with organic bouclé loops on sturdy handloom cotton backing, closed with a concealed YKK brass zipper.",
    materialCraft: "Individually tufted by skilled artisans in Panipat, Haryana.",
    specifications: {
      "Closure": "Concealed heavy-duty zipper",
      "Contents": "Pair of 2 Cushion Covers (Inserts sold separately)",
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
        title: "Looks straight out of an Architectural Digest shoot",
        comment: "Heavy, rich texture. Elevates our grey sofa immediately.",
        verifiedPurchase: true,
      },
    ],
  },

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
    badge: "Dinner Party Essential",
    images: [
      "https://images.unsplash.com/photo-1615066390971-03e4e1c36ddf?q=80&w=1200&auto=format&fit=crop",
      "https://images.unsplash.com/photo-1549465220-1a8b9238cd48?q=80&w=1200&auto=format&fit=crop",
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
        comment: "Drapes gracefully and washes very easily. Great gift idea as well.",
        verifiedPurchase: true,
      },
    ],
  },

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
    badge: "Heirloom Gifting",
    isBestseller: true,
    isFeatured: true,
    images: [
      "https://images.unsplash.com/photo-1549465220-1a8b9238cd48?q=80&w=1200&auto=format&fit=crop",
      "https://images.unsplash.com/photo-1505693416388-ac5ce068fe85?q=80&w=1200&auto=format&fit=crop",
      "https://images.unsplash.com/photo-1540518614846-7ede433c4ef7?q=80&w=1200&auto=format&fit=crop",
    ],
    colors: [
      { name: "Ivory & Champagne Gold", hex: "#EFE8DC" },
      { name: "Terracotta Rose", hex: "#B96D57" },
    ],
    sizes: [
      { name: "Grand Suite", label: "King Bed Set + 2 AC Dohars + Trunk", dimensions: "Luxury Box Set", dimensionsMetric: "Bespoke", inStock: true, priceModifier: 0 },
    ],
    fabric: "600TC Egyptian Sateen + Malmal Falalen",
    leadParagraph: "A celebratory tribute to new beginnings. Enclosed inside a handcrafted rigid keepsake trunk wrapped in natural linen with brass clasps, this curated gift suite brings together AAVAAS's finest bedding.",
    materialCraft: "Includes customized personalized calligraphy gift card and embossed gold foil warranty seal from KT International.",
    specifications: {
      "Included Products": "1 Reserve 600TC King Bedsheet + 2 Pillowcases + 2 Malmal Flannel Dohars + 1 Scented Soy Wax Linen Candle",
      "Packaging": "Handmade Linen Wrapped Wooden Trunk with Brass Lock",
      "Corporate Gifting": "Custom logo embossing available for orders above 25 units",
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
      "https://images.unsplash.com/photo-1513694203232-719a280e022f?q=80&w=1200&auto=format&fit=crop",
      "https://images.unsplash.com/photo-1618221195710-dd6b41faaea6?q=80&w=1200&auto=format&fit=crop",
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
    leadParagraph: "Softens harsh Indian daylight into a glowing, ethereal ambiance. Woven with authentic textured slub threads that drape fluidly and pool gently at the floor.",
    materialCraft: "Features weighted corner hems to prevent flaring in cross breezes. 3-in-1 hanging construction accommodates rod pockets, back tabs, and ring hooks.",
    specifications: {
      "Opacity": "Light-filtering semi-sheer (approx. 45% light filtration)",
      "Hanging Style": "Back Tab, Rod Pocket, or Curtain Ring Pleats",
      "Quantity": "Pair of 2 Drapes with Weighted Hems",
      "Origin": "Panipat, Haryana",
    },
    careInstructions: ["Machine wash gentle in laundry mesh bag, line dry immediately"],
    reviews: [
      {
        id: "rev-18",
        author: "Nandini Mathur",
        city: "Gurugram",
        rating: 5,
        date: "06 Nov 2026",
        title: "Magnificent drape and airy quality",
        comment: "Transformed our drawing room windows. Diffuses the bright afternoon sun into a warm golden glow.",
        verifiedPurchase: true,
      },
    ],
  },
];
