import { create } from "zustand";

export type PackId = "solo" | "sync" | "triumph";

export interface PackTier {
  id: PackId;
  name: string;
  subLabel: string;
  tagline: string;
  /** Matches the Shopify variant option value ("Quantity") */
  variantTitle: string;
  sets: number;
  fallbackPrice: number;
  compareAt: number;
  badge?: { label: string; tone: "purple" | "gold" };
}

export const PACK_TIERS: PackTier[] = [
  {
    id: "solo",
    name: "Solo",
    subLabel: "1 Headphone Set",
    tagline: "Your daily reset",
    variantTitle: "1x High Frequency Headphones",
    sets: 1,
    fallbackPrice: 169,
    compareAt: 347,
  },
  {
    id: "sync",
    name: "Sync",
    subLabel: "2 Headphone Sets",
    tagline: "One for you. One for someone you love.",
    variantTitle: "2x High Frequency Headphones",
    sets: 2,
    fallbackPrice: 299,
    compareAt: 694,
    badge: { label: "MOST POPULAR", tone: "purple" },
  },
  {
    id: "triumph",
    name: "Triumph",
    subLabel: "3 Headphone Sets",
    tagline: "Home. Work. Car. Never without it.",
    variantTitle: "3x High Frequency Headphones",
    sets: 3,
    fallbackPrice: 444,
    compareAt: 1041,
    badge: { label: "BEST VALUE", tone: "gold" },
  },
];

interface PackState {
  selected: PackId;
  setSelected: (id: PackId) => void;
}

export const usePackStore = create<PackState>((set) => ({
  selected: "solo",
  setSelected: (id) => set({ selected: id }),
}));

export const getPackTier = (id: PackId) =>
  PACK_TIERS.find((t) => t.id === id) ?? PACK_TIERS[0];
