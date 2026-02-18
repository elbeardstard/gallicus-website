/**
 * Seed script — run once to populate the database with current hardcoded content.
 *
 * Usage:
 *   DATABASE_URL="your-neon-connection-string" npx tsx src/scripts/seed.ts
 *
 * It is safe to re-run: all inserts use ON CONFLICT DO NOTHING.
 *
 * Also creates the tables if they don't exist yet.
 */

import { neon } from "@neondatabase/serverless";

const DATABASE_URL = process.env.DATABASE_URL;
if (!DATABASE_URL) {
  console.error("❌  DATABASE_URL environment variable is required.");
  process.exit(1);
}

const sql = neon(DATABASE_URL);

async function createTables() {
  console.log("📦  Creating tables...");
  await sql`
    CREATE TABLE IF NOT EXISTS beers (
      id              UUID PRIMARY KEY DEFAULT gen_random_uuid(),
      name            TEXT NOT NULL,
      style_fr        TEXT NOT NULL DEFAULT '',
      style_en        TEXT NOT NULL DEFAULT '',
      abv             NUMERIC(4,1) NOT NULL,
      description_fr  TEXT NOT NULL DEFAULT '',
      description_en  TEXT NOT NULL DEFAULT '',
      tasting_notes_fr TEXT[] NOT NULL DEFAULT '{}',
      tasting_notes_en TEXT[] NOT NULL DEFAULT '{}',
      image_url       TEXT,
      is_core         BOOLEAN NOT NULL DEFAULT false,
      is_featured     BOOLEAN NOT NULL DEFAULT false,
      untappd_url     TEXT,
      sort_order      INTEGER NOT NULL DEFAULT 0,
      created_at      TIMESTAMPTZ NOT NULL DEFAULT now(),
      updated_at      TIMESTAMPTZ NOT NULL DEFAULT now()
    )
  `;
  await sql`
    CREATE TABLE IF NOT EXISTS locations (
      id          UUID PRIMARY KEY DEFAULT gen_random_uuid(),
      name        TEXT NOT NULL,
      address     TEXT NOT NULL,
      city        TEXT NOT NULL,
      lat         NUMERIC(10,7) NOT NULL,
      lng         NUMERIC(10,7) NOT NULL,
      type        TEXT NOT NULL CHECK (type IN ('brewery','bar','retail','restaurant')),
      sort_order  INTEGER NOT NULL DEFAULT 0,
      created_at  TIMESTAMPTZ NOT NULL DEFAULT now(),
      updated_at  TIMESTAMPTZ NOT NULL DEFAULT now()
    )
  `;
  await sql`
    CREATE TABLE IF NOT EXISTS site_content (
      key        TEXT PRIMARY KEY,
      value      TEXT NOT NULL DEFAULT '',
      updated_at TIMESTAMPTZ NOT NULL DEFAULT now()
    )
  `;
  console.log("✅  Tables ready.");
}

async function seedBeers() {
  console.log("🍺  Seeding beers...");

  const beers = [
    {
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
    },
    {
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
    },
    {
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
    },
    {
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
    },
  ];

  for (const b of beers) {
    await sql`
      INSERT INTO beers (
        name, style_fr, style_en, abv,
        description_fr, description_en,
        tasting_notes_fr, tasting_notes_en,
        image_url, is_core, is_featured, untappd_url, sort_order
      ) VALUES (
        ${b.name}, ${b.style_fr}, ${b.style_en}, ${b.abv},
        ${b.description_fr}, ${b.description_en},
        ${b.tasting_notes_fr}, ${b.tasting_notes_en},
        ${b.image_url}, ${b.is_core}, ${b.is_featured}, ${b.untappd_url}, ${b.sort_order}
      )
      ON CONFLICT DO NOTHING
    `;
    console.log(`   ✓ ${b.name}`);
  }
}

async function seedLocations() {
  console.log("📍  Seeding locations...");

  const locations = [
    {
      name: "Gallicus — Brasserie Artisanale",
      address: "670 rue Auguste-Mondoux #4",
      city: "Gatineau, QC",
      lat: 45.4765,
      lng: -75.7134,
      type: "brewery",
      sort_order: 0,
    },
    {
      name: "Bières & Compagnie",
      address: "135 rue Eddy",
      city: "Gatineau, QC",
      lat: 45.4271,
      lng: -75.7008,
      type: "bar",
      sort_order: 1,
    },
    {
      name: "La Barberie",
      address: "310 boul. Saint-Joseph",
      city: "Gatineau, QC",
      lat: 45.4420,
      lng: -75.7215,
      type: "retail",
      sort_order: 2,
    },
    {
      name: "Dépanneur Chez Gilles",
      address: "45 rue Laramée",
      city: "Gatineau, QC",
      lat: 45.4610,
      lng: -75.7302,
      type: "retail",
      sort_order: 3,
    },
    {
      name: "Le Troquet",
      address: "82 rue Principale",
      city: "Gatineau, QC",
      lat: 45.4380,
      lng: -75.6889,
      type: "restaurant",
      sort_order: 4,
    },
  ];

  for (const loc of locations) {
    await sql`
      INSERT INTO locations (name, address, city, lat, lng, type, sort_order)
      VALUES (${loc.name}, ${loc.address}, ${loc.city}, ${loc.lat}, ${loc.lng}, ${loc.type}, ${loc.sort_order})
      ON CONFLICT DO NOTHING
    `;
    console.log(`   ✓ ${loc.name}`);
  }
}

async function seedContent() {
  console.log("📝  Seeding site content...");

  const entries: [string, string][] = [
    [
      "about.description.fr",
      "Gallicus est une brasserie artisanale située à Gatineau, au Québec. Nous brassons des bières de caractère avec passion et créativité, en petits lots pour garantir la qualité et la fraîcheur de chaque produit.",
    ],
    [
      "about.description.en",
      "Gallicus is a craft brewery located in Gatineau, Quebec. We brew beers with character, passion, and creativity, in small batches to ensure quality and freshness in every product.",
    ],
    [
      "about.philosophy.fr",
      "Notre philosophie est simple : créer des bières authentiques qui reflètent notre terroir et notre amour du métier. Chaque recette est développée avec soin, utilisant des ingrédients de qualité pour offrir des saveurs uniques et mémorables.",
    ],
    [
      "about.philosophy.en",
      "Our philosophy is simple: create authentic beers that reflect our terroir and our love of the craft. Each recipe is carefully developed using quality ingredients to deliver unique and memorable flavors.",
    ],
    ["contact.email", "info@gallicus.ca"],
    ["contact.address.line1", "670 rue Auguste-Mondoux #4"],
    ["contact.address.line2", "Gatineau, QC, Canada"],
    ["contact.phone", ""],
    ["findUs.hours.fr", "Jeudi - Dimanche"],
    ["findUs.hours.en", "Thursday - Sunday"],
    ["social.instagram", "https://instagram.com/brasserie_gallicus"],
    [
      "social.untappd",
      "https://untappd.com/v/gallicus-brasserie-artisanale/8707258",
    ],
  ];

  for (const [key, value] of entries) {
    await sql`
      INSERT INTO site_content (key, value)
      VALUES (${key}, ${value})
      ON CONFLICT (key) DO NOTHING
    `;
    console.log(`   ✓ ${key}`);
  }
}

async function main() {
  console.log("\n🌱  Starting Gallicus database seed...\n");
  try {
    await createTables();
    await seedBeers();
    await seedLocations();
    await seedContent();
    console.log("\n🎉  Seed complete!\n");
  } catch (error) {
    console.error("\n❌  Seed failed:", error);
    process.exit(1);
  }
}

main();
