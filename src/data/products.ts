export interface ProductVariant {
  id: string;
  name: string;
  type: "metal" | "size" | "stone";
  price: number;
  comparePrice?: number;
  sku: string;
  stock: number;
  image?: string;
}

export interface Product {
  id: string;
  slug: string;
  name: string;
  description: string;
  shortDescription: string;
  category: string;
  subcategory: string;
  price: number;
  comparePrice?: number;
  images: string[];
  variants: ProductVariant[];
  specifications: Record<string, string>;
  badge?: "new" | "sale" | "featured" | "bestseller";
  rating: number;
  reviewCount: number;
  inStock: boolean;
  shipsIn: string;
  featured: boolean;
  createdAt: string;
}

export interface Category {
  id: string;
  slug: string;
  name: string;
  description: string;
  image: string;
  subcategories: { id: string; slug: string; name: string }[];
  productCount: number;
}

export const categories: Category[] = [
  {
    id: "cat-1",
    slug: "engagement-rings",
    name: "Engagement Rings",
    description: "Handcrafted engagement rings designed to last a lifetime",
    image: "/images/hero-ring.jpg",
    subcategories: [
      { id: "sub-1", slug: "solitaire", name: "Solitaire" },
      { id: "sub-2", slug: "halo", name: "Halo" },
      { id: "sub-3", slug: "three-stone", name: "Three Stone" },
      { id: "sub-4", slug: "vintage", name: "Vintage" },
    ],
    productCount: 24,
  },
  {
    id: "cat-2",
    slug: "wedding-bands",
    name: "Wedding Bands",
    description: "Timeless bands to symbolise your eternal bond",
    image: "/images/collection-hero.jpg",
    subcategories: [
      { id: "sub-5", slug: "classic", name: "Classic" },
      { id: "sub-6", slug: "diamond", name: "Diamond" },
      { id: "sub-7", slug: "eternity", name: "Eternity" },
    ],
    productCount: 18,
  },
  {
    id: "cat-3",
    slug: "necklaces",
    name: "Necklaces",
    description: "Elegant necklaces and pendants for every occasion",
    image: "/images/collection-hero.jpg",
    subcategories: [
      { id: "sub-8", slug: "pendants", name: "Pendants" },
      { id: "sub-9", slug: "chains", name: "Chains" },
      { id: "sub-10", slug: "layering", name: "Layering Sets" },
    ],
    productCount: 15,
  },
  {
    id: "cat-4",
    slug: "earrings",
    name: "Earrings",
    description: "From studs to statement — find your perfect pair",
    image: "/images/product-ring-1.jpg",
    subcategories: [
      { id: "sub-11", slug: "studs", name: "Studs" },
      { id: "sub-12", slug: "hoops", name: "Hoops" },
      { id: "sub-13", slug: "drops", name: "Drop Earrings" },
    ],
    productCount: 20,
  },
  {
    id: "cat-5",
    slug: "bracelets",
    name: "Bracelets",
    description: "Delicate bracelets and bangles crafted with care",
    image: "/images/collection-hero.jpg",
    subcategories: [
      { id: "sub-14", slug: "bangles", name: "Bangles" },
      { id: "sub-15", slug: "tennis", name: "Tennis Bracelets" },
      { id: "sub-16", slug: "cuffs", name: "Cuffs" },
    ],
    productCount: 12,
  },
];

export const products: Product[] = [
  {
    id: "prod-1",
    slug: "aurora-solitaire-ring",
    name: "Aurora Solitaire Ring",
    description:
      "A breathtaking solitaire engagement ring featuring a brilliant round-cut diamond set in a six-prong 18k yellow gold setting. The tapered band catches the light from every angle, creating a mesmerising sparkle. Each diamond is hand-selected for exceptional clarity and fire. The Aurora is our signature piece — designed for the moment that changes everything.",
    shortDescription: "Brilliant round diamond in 18k yellow gold six-prong setting",
    category: "engagement-rings",
    subcategory: "solitaire",
    price: 185000,
    comparePrice: 210000,
    images: ["/images/hero-ring.jpg", "/images/product-ring-1.jpg", "/images/hero-ring.jpg"],
    variants: [
      { id: "v1", name: "18K Yellow Gold", type: "metal", price: 185000, comparePrice: 210000, sku: "AUR-YG-001", stock: 5 },
      { id: "v2", name: "18K White Gold", type: "metal", price: 185000, comparePrice: 210000, sku: "AUR-WG-001", stock: 3 },
      { id: "v3", name: "18K Rose Gold", type: "metal", price: 190000, comparePrice: 215000, sku: "AUR-RG-001", stock: 4 },
      { id: "v4", name: "Platinum", type: "metal", price: 225000, comparePrice: 250000, sku: "AUR-PT-001", stock: 2 },
    ],
    specifications: {
      "Center Stone": "Lab-grown Diamond, 1.0 ct, VS1, E colour",
      Cut: "Ideal Round Brilliant",
      Metal: "18K Gold / Platinum",
      "Band Width": "2.0 mm",
      "Setting Type": "Six-Prong",
      Certification: "IGI Certified",
    },
    badge: "bestseller",
    rating: 4.9,
    reviewCount: 127,
    inStock: true,
    shipsIn: "Ships in 24 hours",
    featured: true,
    createdAt: "2024-01-15",
  },
  {
    id: "prod-2",
    slug: "celestine-halo-ring",
    name: "Celestine Halo Ring",
    description:
      "The Celestine Halo Ring surrounds a stunning cushion-cut center stone with a delicate halo of smaller diamonds. Set in rose gold, it exudes warmth and romance. The pavé-set band adds an extra layer of brilliance, ensuring this ring sparkles from every direction.",
    shortDescription: "Cushion-cut diamond with pavé halo in rose gold",
    category: "engagement-rings",
    subcategory: "halo",
    price: 225000,
    images: ["/images/product-ring-1.jpg", "/images/hero-ring.jpg"],
    variants: [
      { id: "v5", name: "18K Rose Gold", type: "metal", price: 225000, sku: "CEL-RG-001", stock: 3 },
      { id: "v6", name: "18K White Gold", type: "metal", price: 225000, sku: "CEL-WG-001", stock: 4 },
      { id: "v7", name: "Platinum", type: "metal", price: 265000, sku: "CEL-PT-001", stock: 1 },
    ],
    specifications: {
      "Center Stone": "Lab-grown Diamond, 1.2 ct, VS2, F colour",
      Cut: "Cushion Brilliant",
      Metal: "18K Rose Gold / Platinum",
      "Band Width": "1.8 mm",
      "Setting Type": "Pavé Halo",
      Certification: "IGI Certified",
    },
    badge: "new",
    rating: 4.8,
    reviewCount: 43,
    inStock: true,
    shipsIn: "Ships in 24 hours",
    featured: true,
    createdAt: "2024-06-01",
  },
  {
    id: "prod-3",
    slug: "eternal-classic-band",
    name: "Eternal Classic Band",
    description:
      "A timeless 18k gold wedding band with a gently domed profile and a polished mirror finish. Comfort-fit inner band ensures it's as comfortable as it is beautiful. This is the band that says forever — simply and perfectly.",
    shortDescription: "Comfort-fit polished 18k gold wedding band",
    category: "wedding-bands",
    subcategory: "classic",
    price: 42000,
    comparePrice: 48000,
    images: ["/images/hero-ring.jpg", "/images/collection-hero.jpg"],
    variants: [
      { id: "v8", name: "18K Yellow Gold", type: "metal", price: 42000, comparePrice: 48000, sku: "ETR-YG-001", stock: 12 },
      { id: "v9", name: "18K White Gold", type: "metal", price: 42000, comparePrice: 48000, sku: "ETR-WG-001", stock: 8 },
      { id: "v10", name: "18K Rose Gold", type: "metal", price: 44000, comparePrice: 50000, sku: "ETR-RG-001", stock: 6 },
    ],
    specifications: {
      Metal: "18K Gold",
      "Band Width": "4.0 mm",
      Profile: "Comfort Fit, Domed",
      Finish: "High Polish",
      Weight: "~5.2g (size 10)",
    },
    badge: "sale",
    rating: 4.7,
    reviewCount: 89,
    inStock: true,
    shipsIn: "Ships in 24 hours",
    featured: true,
    createdAt: "2024-02-10",
  },
  {
    id: "prod-4",
    slug: "lumiere-pendant-necklace",
    name: "Lumière Pendant Necklace",
    description:
      "A single brilliant-cut diamond floats on a whisper-thin 18k gold chain. The bezel setting protects the stone while maximising light entry, creating an ethereal glow against the skin. Adjustable chain length from 16 to 18 inches.",
    shortDescription: "Bezel-set diamond pendant on delicate 18k gold chain",
    category: "necklaces",
    subcategory: "pendants",
    price: 68000,
    images: ["/images/collection-hero.jpg", "/images/hero-ring.jpg"],
    variants: [
      { id: "v11", name: "18K Yellow Gold", type: "metal", price: 68000, sku: "LUM-YG-001", stock: 7 },
      { id: "v12", name: "18K White Gold", type: "metal", price: 68000, sku: "LUM-WG-001", stock: 5 },
      { id: "v13", name: "18K Rose Gold", type: "metal", price: 70000, sku: "LUM-RG-001", stock: 4 },
    ],
    specifications: {
      Stone: "Lab-grown Diamond, 0.3 ct, VS1",
      Setting: "Bezel",
      Chain: "Cable, adjustable 16–18 inches",
      Metal: "18K Gold",
      Clasp: "Lobster Claw",
    },
    badge: "featured",
    rating: 4.9,
    reviewCount: 64,
    inStock: true,
    shipsIn: "Ships in 24 hours",
    featured: true,
    createdAt: "2024-03-20",
  },
  {
    id: "prod-5",
    slug: "aria-diamond-studs",
    name: "Aria Diamond Studs",
    description:
      "Classic round brilliant diamond stud earrings in a secure four-prong basket setting. These versatile studs transition effortlessly from boardroom to evening. Fitted with push-back closures for everyday comfort.",
    shortDescription: "Round brilliant diamond studs in four-prong basket setting",
    category: "earrings",
    subcategory: "studs",
    price: 52000,
    images: ["/images/collection-hero.jpg", "/images/product-ring-1.jpg"],
    variants: [
      { id: "v14", name: "18K Yellow Gold", type: "metal", price: 52000, sku: "ARI-YG-001", stock: 10 },
      { id: "v15", name: "18K White Gold", type: "metal", price: 52000, sku: "ARI-WG-001", stock: 8 },
      { id: "v16", name: "Platinum", type: "metal", price: 62000, sku: "ARI-PT-001", stock: 3 },
    ],
    specifications: {
      Stones: "2 × Lab-grown Diamond, 0.25 ct each, VS1",
      "Total Carat Weight": "0.50 ct",
      Setting: "Four-Prong Basket",
      Metal: "18K Gold / Platinum",
      Closure: "Push-Back",
    },
    badge: "bestseller",
    rating: 4.8,
    reviewCount: 156,
    inStock: true,
    shipsIn: "Ships in 24 hours",
    featured: true,
    createdAt: "2024-01-05",
  },
  {
    id: "prod-6",
    slug: "seraphina-tennis-bracelet",
    name: "Seraphina Tennis Bracelet",
    description:
      "A continuous line of round brilliant diamonds set in shared prongs, creating an uninterrupted river of light around your wrist. The flexible articulated links ensure a comfortable, secure fit. A true icon of understated luxury.",
    shortDescription: "Continuous diamond tennis bracelet in 18k white gold",
    category: "bracelets",
    subcategory: "tennis",
    price: 320000,
    images: ["/images/collection-hero.jpg", "/images/hero-ring.jpg"],
    variants: [
      { id: "v17", name: "18K White Gold", type: "metal", price: 320000, sku: "SER-WG-001", stock: 2 },
      { id: "v18", name: "18K Yellow Gold", type: "metal", price: 320000, sku: "SER-YG-001", stock: 2 },
      { id: "v19", name: "Platinum", type: "metal", price: 380000, sku: "SER-PT-001", stock: 1 },
    ],
    specifications: {
      Stones: "38 × Lab-grown Diamond, Round Brilliant",
      "Total Carat Weight": "3.80 ct",
      Setting: "Shared Prong",
      Metal: "18K Gold / Platinum",
      Length: "7 inches",
      Clasp: "Double Safety Clasp",
    },
    badge: "featured",
    rating: 5.0,
    reviewCount: 22,
    inStock: true,
    shipsIn: "Made to order — ships in 5–7 days",
    featured: false,
    createdAt: "2024-04-01",
  },
  {
    id: "prod-7",
    slug: "nova-three-stone-ring",
    name: "Nova Three-Stone Ring",
    description:
      "Past, present, and future — the Nova Three-Stone Ring features a stunning emerald-cut center diamond flanked by two trilliant side stones. Set in platinum for maximum brilliance and durability.",
    shortDescription: "Emerald-cut with trilliant side stones in platinum",
    category: "engagement-rings",
    subcategory: "three-stone",
    price: 385000,
    images: ["/images/hero-ring.jpg", "/images/product-ring-1.jpg"],
    variants: [
      { id: "v20", name: "Platinum", type: "metal", price: 385000, sku: "NOV-PT-001", stock: 2 },
      { id: "v21", name: "18K White Gold", type: "metal", price: 345000, sku: "NOV-WG-001", stock: 3 },
    ],
    specifications: {
      "Center Stone": "Lab-grown Diamond, 1.5 ct, Emerald Cut, VVS2, D colour",
      "Side Stones": "2 × Trilliant, 0.40 ct each",
      Metal: "Platinum / 18K White Gold",
      "Band Width": "2.2 mm",
      Certification: "IGI Certified",
    },
    rating: 4.9,
    reviewCount: 31,
    inStock: true,
    shipsIn: "Made to order — ships in 5–7 days",
    featured: false,
    createdAt: "2024-05-15",
  },
  {
    id: "prod-8",
    slug: "grace-eternity-band",
    name: "Grace Eternity Band",
    description:
      "An unbroken circle of perfectly matched round diamonds, channel-set in 18k white gold. The Grace Eternity Band symbolises never-ending love and pairs beautifully with any engagement ring.",
    shortDescription: "Full eternity band with channel-set diamonds",
    category: "wedding-bands",
    subcategory: "eternity",
    price: 155000,
    images: ["/images/product-ring-1.jpg", "/images/hero-ring.jpg"],
    variants: [
      { id: "v22", name: "18K White Gold", type: "metal", price: 155000, sku: "GRA-WG-001", stock: 4 },
      { id: "v23", name: "18K Yellow Gold", type: "metal", price: 155000, sku: "GRA-YG-001", stock: 3 },
      { id: "v24", name: "Platinum", type: "metal", price: 185000, sku: "GRA-PT-001", stock: 2 },
    ],
    specifications: {
      Stones: "28 × Lab-grown Diamond, Round Brilliant",
      "Total Carat Weight": "1.40 ct",
      Setting: "Channel Set",
      Metal: "18K Gold / Platinum",
      "Band Width": "2.5 mm",
    },
    badge: "new",
    rating: 4.7,
    reviewCount: 38,
    inStock: true,
    shipsIn: "Ships in 24 hours",
    featured: false,
    createdAt: "2024-07-01",
  },
];

export const reviews = [
  {
    id: "r1",
    productId: "prod-1",
    author: "Priya M.",
    rating: 5,
    title: "Absolutely stunning",
    comment: "My fiancé was in tears. The ring is even more beautiful in person. The lab-grown diamond sparkles like crazy and the gold work is flawless.",
    date: "2024-08-15",
    verified: true,
  },
  {
    id: "r2",
    productId: "prod-1",
    author: "Rahul K.",
    rating: 5,
    title: "Worth every penny",
    comment: "Exceptional quality and the customer service was top-notch. They helped me choose the perfect size and the packaging felt so premium.",
    date: "2024-07-22",
    verified: true,
  },
  {
    id: "r3",
    productId: "prod-5",
    author: "Anjali S.",
    rating: 5,
    title: "My everyday luxury",
    comment: "These studs go with literally everything. I wear them to work, to dinner, even to the gym. The quality is incredible for the price.",
    date: "2024-09-01",
    verified: true,
  },
  {
    id: "r4",
    productId: "prod-4",
    author: "Meera R.",
    rating: 5,
    title: "Delicate perfection",
    comment: "The Lumière pendant is exactly what I was looking for. Simple, elegant, and the diamond catches light beautifully. Got so many compliments.",
    date: "2024-08-28",
    verified: true,
  },
  {
    id: "r5",
    productId: "prod-2",
    author: "Vikram P.",
    rating: 4,
    title: "Beautiful ring, slightly delayed",
    comment: "The ring itself is gorgeous — my partner loves it. Shipping took an extra day but the quality makes up for it completely.",
    date: "2024-09-10",
    verified: true,
  },
];

export function getProductBySlug(slug: string): Product | undefined {
  return products.find((p) => p.slug === slug);
}

export function getProductsByCategory(categorySlug: string): Product[] {
  return products.filter((p) => p.category === categorySlug);
}

export function getFeaturedProducts(): Product[] {
  return products.filter((p) => p.featured);
}

export function formatPrice(price: number): string {
  return new Intl.NumberFormat("en-IN", {
    style: "currency",
    currency: "INR",
    maximumFractionDigits: 0,
  }).format(price);
}
