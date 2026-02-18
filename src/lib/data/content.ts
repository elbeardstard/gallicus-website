import { cache } from "react";
import { query } from "@/lib/db";
import type { DbSiteContent } from "@/types/db";

// ─── Fallback data ────────────────────────────────────────────────────────────
// Exact mirror of current hardcoded strings from translation files and components.

export const SITE_CONTENT_FALLBACK: Record<string, string> = {
  "about.description.fr":
    "Gallicus est une brasserie artisanale située à Gatineau, au Québec. Nous brassons des bières de caractère avec passion et créativité, en petits lots pour garantir la qualité et la fraîcheur de chaque produit.",
  "about.description.en":
    "Gallicus is a craft brewery located in Gatineau, Quebec. We brew beers with character, passion, and creativity, in small batches to ensure quality and freshness in every product.",
  "about.philosophy.fr":
    "Notre philosophie est simple : créer des bières authentiques qui reflètent notre terroir et notre amour du métier. Chaque recette est développée avec soin, utilisant des ingrédients de qualité pour offrir des saveurs uniques et mémorables.",
  "about.philosophy.en":
    "Our philosophy is simple: create authentic beers that reflect our terroir and our love of the craft. Each recipe is carefully developed using quality ingredients to deliver unique and memorable flavors.",
  "contact.email": "info@gallicus.ca",
  "contact.address.line1": "670 rue Auguste-Mondoux #4",
  "contact.address.line2": "Gatineau, QC, Canada",
  "contact.phone": "",
  "findUs.hours.fr": "Jeudi - Dimanche",
  "findUs.hours.en": "Thursday - Sunday",
  "social.instagram": "https://instagram.com/brasserie_gallicus",
  "social.untappd": "https://untappd.com/v/gallicus-brasserie-artisanale/8707258",
};

// ─── Public fetch ─────────────────────────────────────────────────────────────

export const getSiteContent = cache(async (): Promise<Record<string, string>> => {
  const rows = await query<DbSiteContent>`
    SELECT key, value FROM site_content
  `;
  // Start with fallbacks, overlay any DB values
  const result = { ...SITE_CONTENT_FALLBACK };
  if (rows) {
    for (const row of rows) {
      result[row.key] = row.value;
    }
  }
  return result;
});

// ─── Admin fetch (no cache) ───────────────────────────────────────────────────

export async function getAllContentRaw(): Promise<Record<string, string>> {
  const rows = await query<DbSiteContent>`
    SELECT key, value FROM site_content
  `;
  const result = { ...SITE_CONTENT_FALLBACK };
  if (rows) {
    for (const row of rows) {
      result[row.key] = row.value;
    }
  }
  return result;
}
