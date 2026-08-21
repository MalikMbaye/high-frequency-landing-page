import { create } from "zustand";

export type PackId = "solo" | "sync";

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
];

interface PackState {
  selected: PackId;
  quantity: number;
  setSelected: (id: PackId) => void;
  setQuantity: (quantity: number) => void;
  incrementQuantity: () => void;
  decrementQuantity: () => void;
}

export const usePackStore = create<PackState>((set) => ({
  selected: "solo",
  quantity: 1,
  setSelected: (id) => set({ selected: id, quantity: 1 }),
  setQuantity: (quantity) => set({ quantity: Math.max(1, Math.min(10, quantity)) }),
  incrementQuantity: () => set((state) => ({ quantity: Math.min(10, state.quantity + 1) })),
  decrementQuantity: () => set((state) => ({ quantity: Math.max(1, state.quantity - 1) })),
}));

export const getPackTier = (id: PackId) =>
  PACK_TIERS.find((t) => t.id === id) ?? PACK_TIERS[0];

