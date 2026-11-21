export interface CollectionTier {
  id: "essential" | "signature" | "reserve";
  name: string;
  tagline: string;
  philosophy: string;
  description: string;
  image: string;
  priceRange: string;
  materials: string[];
}

export const COLLECTIONS: CollectionTier[] = [
  {
    id: "essential",
    name: "Essential",
    tagline: "Everyday, functional, and value-focused comfort for daily living.",
    philosophy: "Mindfully calibrated for daily resilience. Crisp 300TC breathable cottons, easy-care double dohars, and minimalist tones.",
    description: "Designed for the unpretentious rhythm of everyday Indian homes. Durable, easy-launder fabrics with a gentle touch.",
    image: "https://images.unsplash.com/photo-1522771739844-6a9f6d5f14af?q=85&w=1200&auto=format&fit=crop",
    priceRange: "₹1,299 – ₹2,499",
    materials: ["300TC Pure Long-Staple Cotton", "Breathable Falalen Flannel", "Micro-loft Fibers"],
  },
  {
    id: "signature",
    name: "Signature",
    tagline: "Our core range featuring distinctive designs and elevated detailing.",
    philosophy: "Where Panipat's weaving lineage meets refined modern geometries. Lustrous 400TC–600TC cotton sateen and tailored hems.",
    description: "The core heartbeat of AAVAAS. Subtly sophisticated motifs, generous tuck-ins, and cloud-soft hand-feel for discerning bedrooms.",
    image: "https://images.unsplash.com/photo-1598928506311-c55ded91a20c?q=85&w=1200&auto=format&fit=crop",
    priceRange: "₹2,299 – ₹4,499",
    materials: ["400–600TC Combed Sateen", "Zero-Twist Turkish Terry", "Thermal Polar Weaves"],
  },
  {
    id: "reserve",
    name: "Reserve",
    tagline: "Select premium pieces and limited seasonal editions.",
    philosophy: "An uncompromising homage to luxury textile art. Limited releases featuring 800TC Giza cotton and cloud mink fleece.",
    description: "Indulgence redefined. Weighty, tactile, and bespoke heirlooms woven in small batches at KT International's master Panipat looms.",
    image: "https://images.unsplash.com/photo-1505693416388-ac5ce068fe85?q=85&w=1200&auto=format&fit=crop",
    priceRange: "₹4,999 – ₹9,999",
    materials: ["800TC Giza Egyptian Cotton", "Ultra-Plush Feather Mink", "Pure Linen Slub"],
  },
];
