import { cache } from "react";
import { query } from "@/lib/db";
import type { DbBeer } from "@/types/db";
import type { Beer } from "@/types";

// ─── Fallback data ────────────────────────────────────────────────────────────
// Exact mirror of current hardcoded beerBase + fr/en JSON descriptions.
// Used when DB is unavailable or empty.

const BEERS_FALLBACK: DbBeer[] = [
  {
    id: "1",
    name: "Double Aura",
    style_fr: "IPA - New England / Hazy",
    style_en: "IPA - New England / Hazy",
    abv: 7.8,
    description_fr:
      "Double NEIPA houblonnée avec Amarillo, Simcoe, Chinook et Idaho 7. Une belle complexité aromatique de fruits tropicaux.",
    description_en:
      "Double NEIPA hopped with Amarillo, Simcoe, Chinook and Idaho 7. A beautiful aromatic complexity of tropical fruits.",
    tasting_notes_fr: ["Tropical", "Mangue", "Fruits de la passion", "Doux"],
    tasting_notes_en: ["Tropical", "Mango", "Passion Fruit", "Smooth"],
    image_url:
      "https://assets.untappd.com/site/beer_logos/beer-3683191_cf7dc_sm.jpeg",
    is_core: true,
    is_featured: true,
    untappd_url:
      "https://untappd.com/b/brasserie-artisanale-gallicus-double-aura/3683191",
    sort_order: 0,
    created_at: "",
    updated_at: "",
  },
  {
    id: "2",
    name: "Lucha Libre",
    style_fr: "Lager - Mexicaine",
    style_en: "Lager - Mexican",
    abv: 4.0,
    description_fr:
      "Notre lager mexicaine légère et rafraîchissante. Parfaite pour les journées chaudes ou pour accompagner vos tacos.",
    description_en:
      "Our light and refreshing Mexican lager. Perfect for hot days or to pair with tacos.",
    tasting_notes_fr: ["Céréale", "Citron", "Légère", "Rafraîchissante"],
    tasting_notes_en: ["Grain", "Lemon", "Light", "Refreshing"],
    image_url: null,
    is_core: true,
    is_featured: false,
    untappd_url:
      "https://untappd.com/b/brasserie-artisanale-gallicus-lucha-libre/5377460",
    sort_order: 1,
    created_at: "",
    updated_at: "",
  },
  {
    id: "3",
    name: "Syn",
    style_fr: "West Coast IPA",
    style_en: "West Coast IPA",
    abv: 6.5,
    description_fr:
      "West Coast IPA houblonnée au Mosaic, Centennial, Columbus et Nugget. Sèche avec des arômes fruités et résineux.",
    description_en:
      "West Coast IPA hopped with Mosaic, Centennial, Columbus and Nugget. Dry with fruity and resinous aromas.",
    tasting_notes_fr: ["Résineux", "Agrumes", "Pin", "Amer"],
    tasting_notes_en: ["Resinous", "Citrus", "Pine", "Bitter"],
    image_url: "/images/labels/syn.png",
    is_core: true,
    is_featured: true,
    untappd_url:
      "https://untappd.com/b/brasserie-artisanale-gallicus-syn-bleue-west-coast-ipa/3953337",
    sort_order: 2,
    created_at: "",
    updated_at: "",
  },
  {
    id: "4",
    name: "IPA",
    style_fr: "IPA Nord-Américaine",
    style_en: "North American IPA",
    abv: 6.5,
    description_fr:
      "Notre IPA signature aux notes tropicales et résineuses. Une amertume bien balancée avec une finale sèche.",
    description_en:
      "Our signature IPA with tropical and resinous notes. Well-balanced bitterness with a dry finish.",
    tasting_notes_fr: ["Tropical", "Résineux", "Floral", "Amer"],
    tasting_notes_en: ["Tropical", "Resinous", "Floral", "Bitter"],
    image_url: "/images/labels/ipa.png",
    is_core: true,
    is_featured: true,
    untappd_url: "https://untappd.com/Gallicusadmin/beer",
    sort_order: 3,
    created_at: "",
    updated_at: "",
  },
];

// ─── Mapper ───────────────────────────────────────────────────────────────────

function dbRowToBeer(row: DbBeer, locale: "fr" | "en"): Beer {
  return {
    id: row.id,
    name: row.name,
    style: locale === "fr" ? row.style_fr : row.style_en,
    abv: Number(row.abv),
    description: locale === "fr" ? row.description_fr : row.description_en,
    image: row.image_url ?? "",
    isCore: row.is_core,
    isFeatured: row.is_featured,
    untappdUrl: row.untappd_url ?? undefined,
    tastingNotes:
      locale === "fr" ? row.tasting_notes_fr : row.tasting_notes_en,
  };
}

// ─── Public fetch ─────────────────────────────────────────────────────────────

export const getBeers = cache(async (locale: "fr" | "en"): Promise<Beer[]> => {
  const rows = await query<DbBeer>`
    SELECT * FROM beers ORDER BY sort_order ASC, created_at ASC
  `;
  if (!rows || rows.length === 0) {
    return BEERS_FALLBACK.map((r) => dbRowToBeer(r, locale));
  }
  return rows.map((r) => dbRowToBeer(r, locale));
});

// ─── Admin fetch (no cache — always fresh) ────────────────────────────────────

export async function getAllBeersRaw(): Promise<DbBeer[]> {
  const rows = await query<DbBeer>`
    SELECT * FROM beers ORDER BY sort_order ASC, created_at ASC
  `;
  return rows ?? BEERS_FALLBACK;
}

export async function getBeerByIdRaw(id: string): Promise<DbBeer | null> {
  const rows = await query<DbBeer>`
    SELECT * FROM beers WHERE id = ${id} LIMIT 1
  `;
  return rows?.[0] ?? null;
}
