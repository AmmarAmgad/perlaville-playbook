import { assetPath } from "@/lib/assets";

export type Category = "Hair Products" | "Body Products";

export type Product = {
  id: string;
  slug: string;
  name: string;
  category: Category;
  size: string;
  form: string;
  image: string;
  alt: string;
  description: string;
  ingredients: string[];
  benefits: string[];
  internalNotes: string[];
};

const EDA_NOTE =
  "EDA Egypt: the official product notification file (formulation, percentages, ingredient functions, artwork, shelf life) must be completed before any marketing campaign or retail placement.";

const DMDM_NOTE =
  "Contains DMDM Hydantoin (formaldehyde-releasing preservative) — flagged CRITICAL in the regulatory risk register; replacing it with an ECOCERT-type preservative system is recommended and currently pending.";

export const products: Product[] = [
  {
    id: "01",
    slug: "hair-tonic",
    name: "Hair Tonic",
    category: "Hair Products",
    size: "220 ml",
    form: "Liquid Tonic",
    image: assetPath("/images/hair-tonic.png"),
    alt: "Perlaville Hair Tonic — 220 ml liquid tonic bottle",
    description:
      "A daily scalp tonic that helps support the scalp and promotes the look of stronger, healthier hair with regular use.",
    ingredients: ["Redensyl", "Procapil", "Capixyl"],
    benefits: [
      "Helps support the scalp",
      "Promotes the appearance of stronger, healthier-looking hair",
      "Made for consistent use within a regular routine",
    ],
    internalNotes: [
      EDA_NOTE,
      DMDM_NOTE,
      "Branded-name claim flag: Procapil® and Capixyl® are Sederma (France) trademarks — on-pack use requires licensed sourcing, otherwise the names must be removed.",
    ],
  },
  {
    id: "02",
    slug: "hair-tonic-vials",
    name: "Hair Tonic Vials",
    category: "Hair Products",
    size: "5 × 10 ml",
    form: "Ampoules",
    image: assetPath("/images/hair-tonic-vials.png"),
    alt: "Perlaville Hair Tonic Vials — set of five 10 ml ampoules",
    description:
      "Concentrated ampoules that support the hair roots and enhance the appearance of density within a regular care programme.",
    ingredients: ["Redensyl", "Procapil", "Capixyl"],
    benefits: [
      "Five concentrated single-dose ampoules (5 × 10 ml)",
      "Supports the look of stronger roots and fuller, denser hair",
      "Designed to slot into a regular care programme",
    ],
    internalNotes: [
      EDA_NOTE,
      DMDM_NOTE,
      "HIGH flag: “PR2 C2” is not a recognised INCI name — define and document the real INCI names in the registration dossier and on-pack before launch.",
    ],
  },
  {
    id: "03",
    slug: "hair-serum",
    name: "Hair Serum",
    category: "Hair Products",
    size: "60 ml",
    form: "Liquid",
    image: assetPath("/images/hair-serum.png"),
    alt: "Perlaville Hair Serum — 60 ml bottle",
    description:
      "A finishing serum that adds instant shine, nourishes the hair and helps protect it from breakage.",
    ingredients: ["Argan Oil", "Vitamin E (Tocopherol)"],
    benefits: [
      "Adds instant shine",
      "Nourishes the hair fibre",
      "Helps protect hair against breakage",
    ],
    internalNotes: [
      EDA_NOTE,
      "Claims reviewed — recorded as “Clean Claims” in the claims matrix.",
    ],
  },
  {
    id: "04",
    slug: "anti-dandruff-shampoo",
    name: "Anti-Dandruff Shampoo",
    category: "Hair Products",
    size: "220 ml",
    form: "Viscous Liquid",
    image: assetPath("/images/anti-dandruff-shampoo.png"),
    alt: "Perlaville Anti-Dandruff Shampoo — 220 ml bottle",
    description:
      "A clarifying shampoo that helps reduce the visible appearance of flakes and cleanses the scalp of build-up.",
    ingredients: ["Climbazole", "Tea Tree Oil", "Piroctone Olamine", "Salicylic Acid"],
    benefits: [
      "Helps reduce the visible appearance of dandruff",
      "Cleanses the scalp and washes away build-up",
      "Combines three active anti-flake ingredients",
    ],
    internalNotes: [
      EDA_NOTE,
      DMDM_NOTE,
      "Formulation also contains SLS; “dandruff cure” positioning is not permitted — keep claims to visible-flake reduction and scalp cleansing.",
    ],
  },
  {
    id: "05",
    slug: "sulfate-free-shampoo",
    name: "Sulfate-Free Shampoo",
    category: "Hair Products",
    size: "220 ml",
    form: "Viscous Liquid",
    image: assetPath("/images/sulfate-free-shampoo.png"),
    alt: "Perlaville Sulfate-Free Shampoo — 220 ml bottle",
    description:
      "A gentle, sulfate-free shampoo that helps preserve the colour of dyed hair while keeping it soft and nourished.",
    ingredients: ["Caffeine", "Panthenol", "Yoghurt Protein"],
    benefits: [
      "Gentle, sulfate-free cleansing",
      "Helps preserve colour-treated hair",
      "Moisturises and nourishes the hair fibre",
    ],
    internalNotes: [
      EDA_NOTE,
      "HIGH flag — claim contradiction: the product is marketed as sulfate-free while containing DMDM Hydantoin; revise the claim or replace the preservative.",
    ],
  },
  {
    id: "06",
    slug: "hair-conditioner",
    name: "Hair Conditioner",
    category: "Hair Products",
    size: "220 ml",
    form: "Viscous Liquid",
    image: assetPath("/images/hair-conditioner.png"),
    alt: "Perlaville Hair Conditioner — 220 ml bottle",
    description:
      "A moisturising conditioner that helps rebalance the scalp, softens the hair and makes it easier to detangle.",
    ingredients: ["Ceramide", "Vitamin E", "Panthenol", "Argan Oil"],
    benefits: [
      "Moisturises the hair",
      "Helps rebalance the scalp",
      "Softens hair, eases detangling and helps control frizz",
    ],
    internalNotes: [EDA_NOTE, DMDM_NOTE],
  },
  {
    id: "07",
    slug: "hair-cream",
    name: "Hair Cream",
    category: "Hair Products",
    size: "200 g",
    form: "Semi-Solid",
    image: assetPath("/images/hair-cream.png"),
    alt: "Perlaville Hair Cream — 200 g jar",
    description:
      "A rich care cream that nourishes the scalp and promotes the look of healthy hair with regular use.",
    ingredients: ["Caffeine", "Rosemary", "Procapil", "Argan Oil", "Jojoba", "Shea Butter"],
    benefits: [
      "Nourishes the scalp",
      "Promotes the appearance of healthy-looking hair",
      "A plant-based care formula with argan, jojoba and shea butter",
    ],
    internalNotes: [
      EDA_NOTE,
      DMDM_NOTE,
      "Trademark flag: Procapil® (Sederma) may not appear on-pack without a licensed ingredient source.",
    ],
  },
  {
    id: "08",
    slug: "hair-mask",
    name: "Hair Mask",
    category: "Hair Products",
    size: "200 g",
    form: "Semi-Solid",
    image: assetPath("/images/hair-mask.png"),
    alt: "Perlaville Hair Mask — 200 g jar",
    description:
      "An intensive mask that deeply nourishes the hair and supports the look of strength from root to tip.",
    ingredients: ["Procapil", "Ceramide", "Vitamin E", "Argan Oil", "Jojoba", "Shea Butter"],
    benefits: [
      "Deep, intensive nourishment",
      "Supports the look of stronger hair from root to tip",
      "A weekly deep-care treatment",
    ],
    internalNotes: [
      EDA_NOTE,
      DMDM_NOTE,
      "Trademark flag: Procapil® / Capixyl® (Sederma) — verify licensing before any on-pack usage.",
    ],
  },
  {
    id: "09",
    slug: "oily-skin-cleanser",
    name: "Oily Skin Cleanser",
    category: "Body Products",
    size: "220 ml",
    form: "Gel Cleanser",
    image: assetPath("/images/oily-skin-cleanser.png"),
    alt: "Perlaville Oily Skin Cleanser — 220 ml gel cleanser bottle",
    description:
      "A gel cleanser for oily skin that helps reduce excess oil and improves the look of pores with regular use.",
    ingredients: ["Salicylic Acid", "Niacinamide", "Zinc Sulfate", "Tea Tree Oil"],
    benefits: [
      "Cleanses oily skin",
      "Helps reduce excess sebum",
      "Helps improve the look of pores and skin texture",
    ],
    internalNotes: [
      EDA_NOTE,
      DMDM_NOTE,
      "EDA-forbidden claims: “anti-acne” / “anti-pimple” are legally not permitted for cosmetics under EDA Egypt guidelines — use approved phrasing about oily skin and excess oil only.",
    ],
  },
  {
    id: "10",
    slug: "body-lotion",
    name: "Body Lotion — Urea 10%",
    category: "Body Products",
    size: "220 ml",
    form: "Body Lotion",
    image: assetPath("/images/body-lotion.png"),
    alt: "Perlaville Body Lotion with 10% urea — 220 ml bottle",
    description:
      "An intensive body moisturiser that deeply hydrates dry skin and helps smooth the feel of rough, dry areas with regular use.",
    ingredients: ["Urea 10%", "Shea Butter"],
    benefits: [
      "Intensive everyday hydration for the body",
      "Helps smooth the feel of dry, rough skin",
      "Urea 10% combined with nourishing shea butter",
    ],
    internalNotes: [
      EDA_NOTE,
      DMDM_NOTE,
      "Forbidden claims: “treats keratosis pilaris”, “anti-callus” and “anti-inflammatory” are not permitted — keep to moisturising and smoothing wording.",
    ],
  },
];

export const categories: readonly ["All Products", "Hair Products", "Body Products"] = [
  "All Products",
  "Hair Products",
  "Body Products",
];

export function getProduct(slug: string): Product | undefined {
  return products.find((p) => p.slug === slug);
}
