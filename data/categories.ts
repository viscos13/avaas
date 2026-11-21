export interface Category {
  id: string;
  name: string;
  slug: string;
  tagline: string;
  description: string;
  image: string;
  subcategories: string[];
  itemCount: number;
  featured: boolean;
}

export const CATEGORIES: Category[] = [
  {
    id: "bedroom",
    name: "Bedroom",
    slug: "bedroom",
    tagline: "Sanctuary of restful repose",
    description: "Bedsheets, comforters, dohars, mink blankets, quilts, bed covers, pillow covers, and mattress protectors woven with heritage craftsmanship.",
    image: "https://images.unsplash.com/photo-1540518614846-7ede433c4ef7?q=80&w=1200&auto=format&fit=crop",
    subcategories: [
      "Bedsheets",
      "Comforters",
      "Dohars",
      "Blankets & Mink",
      "Quilts & Bed Covers",
      "Pillow Covers",
      "Mattress Protectors",
    ],
    itemCount: 24,
    featured: true,
  },
  {
    id: "bath",
    name: "Bath",
    slug: "bath",
    tagline: "Spa-grade organic cotton indulgences",
    description: "Plush Zero-Twist towels, waffle-weave bath sheets, ribbed floor mats, and combed cotton robes designed for effortless everyday pampering.",
    image: "https://images.unsplash.com/photo-1616486338812-3dadae4b4ace?q=80&w=1200&auto=format&fit=crop",
    subcategories: [
      "Bath Towels",
      "Hand Towels",
      "Face Towels",
      "Bath Mats",
      "Bathrobes",
    ],
    itemCount: 16,
    featured: true,
  },
  {
    id: "living",
    name: "Living",
    slug: "living",
    tagline: "Architectural warmth and tactile comfort",
    description: "Sculpted textured cushion covers, heavy handloom throws, dhurries, and Panipat-tufted rugs that anchor your living spaces.",
    image: "https://images.unsplash.com/photo-1618221195710-dd6b41faaea6?q=80&w=1200&auto=format&fit=crop",
    subcategories: [
      "Cushions & Covers",
      "Throws & Throws Blankets",
      "Rugs & Dhurries",
      "Carpets",
    ],
    itemCount: 18,
    featured: true,
  },
  {
    id: "dining",
    name: "Dining",
    slug: "dining",
    tagline: "Subtle elegance for intimate gatherings",
    description: "Pure Belgian-finish washed linen and yarn-dyed cotton table cloths, runners, hemstitched napkins, and artisanal placemats.",
    image: "https://images.unsplash.com/photo-1615066390971-03e4e1c36ddf?q=80&w=1200&auto=format&fit=crop",
    subcategories: [
      "Table Covers",
      "Table Runners",
      "Placemats",
      "Fabric Napkins",
    ],
    itemCount: 12,
    featured: true,
  },
  {
    id: "soft-furnishings",
    name: "Soft Furnishings",
    slug: "soft-furnishings",
    tagline: "Tailored drapery with timeless light play",
    description: "Bespoke linen curtains, light-filtering sheers, and room-darkening slub cotton drapery designed with effortless drape.",
    image: "https://images.unsplash.com/photo-1513694203232-719a280e022f?q=80&w=1200&auto=format&fit=crop",
    subcategories: [
      "Linen Curtains",
      "Window Panels",
      "Sheer Drapes",
      "Blackout Panels",
    ],
    itemCount: 10,
    featured: true,
  },
  {
    id: "gifting",
    name: "Gifting",
    slug: "gifting",
    tagline: "Heirlooms presented with quiet luxury",
    description: "Curated wedding hampers, Diwali & festive gift suites, housewarming essentials, and corporate gift solutions packaged in bespoke linen boxes.",
    image: "https://images.unsplash.com/photo-1549465220-1a8b9238cd48?q=80&w=1200&auto=format&fit=crop",
    subcategories: [
      "Wedding Hampers",
      "Festive Gifting",
      "Housewarming Sets",
      "Corporate Gifting",
    ],
    itemCount: 14,
    featured: true,
  },
];
