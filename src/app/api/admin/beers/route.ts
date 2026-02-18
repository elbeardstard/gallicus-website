import { NextRequest, NextResponse } from "next/server";
import { requireAdmin } from "@/lib/auth";
import { query } from "@/lib/db";
import type { DbBeer } from "@/types/db";

export async function GET(request: NextRequest) {
  const denied = await requireAdmin(request);
  if (denied) return denied;

  const rows = await query<DbBeer>`
    SELECT * FROM beers ORDER BY sort_order ASC, created_at ASC
  `;
  return NextResponse.json(rows ?? []);
}

export async function POST(request: NextRequest) {
  const denied = await requireAdmin(request);
  if (denied) return denied;

  try {
    const body = await request.json();
    const {
      name, style_fr, style_en, abv,
      description_fr, description_en,
      tasting_notes_fr, tasting_notes_en,
      image_url, is_core, is_featured,
      untappd_url, sort_order,
    } = body;

    if (!name || !abv) {
      return NextResponse.json({ error: "name and abv are required" }, { status: 400 });
    }

    const rows = await query<DbBeer>`
      INSERT INTO beers (
        name, style_fr, style_en, abv,
        description_fr, description_en,
        tasting_notes_fr, tasting_notes_en,
        image_url, is_core, is_featured,
        untappd_url, sort_order
      ) VALUES (
        ${name}, ${style_fr ?? ""}, ${style_en ?? ""}, ${abv},
        ${description_fr ?? ""}, ${description_en ?? ""},
        ${tasting_notes_fr ?? []}, ${tasting_notes_en ?? []},
        ${image_url ?? null}, ${is_core ?? false}, ${is_featured ?? false},
        ${untappd_url ?? null}, ${sort_order ?? 0}
      )
      RETURNING *
    `;
    return NextResponse.json(rows?.[0], { status: 201 });
  } catch (error) {
    console.error("[admin/beers POST]", error);
    return NextResponse.json({ error: "Failed to create beer" }, { status: 500 });
  }
}
