import { cache } from "react";
import { query } from "@/lib/db";
import type { DbLocation } from "@/types/db";

// ─── Fallback data ────────────────────────────────────────────────────────────
// Exact mirror of current hardcoded locations array in RetailersMap.tsx.

export const LOCATIONS_FALLBACK: DbLocation[] = [
  {
    id: "gallicus",
    name: "Gallicus — Brasserie Artisanale",
    address: "670 rue Auguste-Mondoux #4",
    city: "Gatineau, QC",
    lat: 45.4765,
    lng: -75.7134,
    type: "brewery",
    sort_order: 0,
    created_at: "",
    updated_at: "",
  },
  {
    id: "l1",
    name: "Bières & Compagnie",
    address: "135 rue Eddy",
    city: "Gatineau, QC",
    lat: 45.4271,
    lng: -75.7008,
    type: "bar",
    sort_order: 1,
    created_at: "",
    updated_at: "",
  },
  {
    id: "l2",
    name: "La Barberie",
    address: "310 boul. Saint-Joseph",
    city: "Gatineau, QC",
    lat: 45.4420,
    lng: -75.7215,
    type: "retail",
    sort_order: 2,
    created_at: "",
    updated_at: "",
  },
  {
    id: "l3",
    name: "Dépanneur Chez Gilles",
    address: "45 rue Laramée",
    city: "Gatineau, QC",
    lat: 45.4610,
    lng: -75.7302,
    type: "retail",
    sort_order: 3,
    created_at: "",
    updated_at: "",
  },
  {
    id: "l4",
    name: "Le Troquet",
    address: "82 rue Principale",
    city: "Gatineau, QC",
    lat: 45.4380,
    lng: -75.6889,
    type: "restaurant",
    sort_order: 4,
    created_at: "",
    updated_at: "",
  },
];

// ─── Coerce numeric fields returned as strings by Neon ────────────────────────

function coerce(row: DbLocation): DbLocation {
  return { ...row, lat: Number(row.lat), lng: Number(row.lng) };
}

// ─── Public fetch ─────────────────────────────────────────────────────────────

export const getLocations = cache(async (): Promise<DbLocation[]> => {
  const rows = await query<DbLocation>`
    SELECT * FROM locations ORDER BY sort_order ASC, created_at ASC
  `;
  if (!rows || rows.length === 0) return LOCATIONS_FALLBACK;
  return rows.map(coerce);
});

// ─── Admin fetch (no cache) ───────────────────────────────────────────────────

export async function getAllLocationsRaw(): Promise<DbLocation[]> {
  const rows = await query<DbLocation>`
    SELECT * FROM locations ORDER BY sort_order ASC, created_at ASC
  `;
  return rows ? rows.map(coerce) : LOCATIONS_FALLBACK;
}

export async function getLocationByIdRaw(id: string): Promise<DbLocation | null> {
  const rows = await query<DbLocation>`
    SELECT * FROM locations WHERE id = ${id} LIMIT 1
  `;
  return rows?.[0] ? coerce(rows[0]) : null;
}
