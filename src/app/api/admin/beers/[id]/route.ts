import { NextRequest, NextResponse } from "next/server";
import { requireAdmin } from "@/lib/auth";
import { query } from "@/lib/db";
import type { DbBeer } from "@/types/db";

export async function GET(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  const denied = await requireAdmin(request);
  if (denied) return denied;

  const { id } = await params;
  const rows = await query<DbBeer>`SELECT * FROM beers WHERE id = ${id} LIMIT 1`;
  if (!rows?.[0]) return NextResponse.json({ error: "Not found" }, { status: 404 });
  return NextResponse.json(rows[0]);
}

export async function PUT(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  const denied = await requireAdmin(request);
  if (denied) return denied;

  const { id } = await params;
  try {
    const body = await request.json();
    const {
      name, style_fr, style_en, abv,
      description_fr, description_en,
      tasting_notes_fr, tasting_notes_en,
      image_url, is_core, is_featured,
      untappd_url, sort_order,
    } = body;

    const rows = await query<DbBeer>`
      UPDATE beers SET
        name = ${name},
        style_fr = ${style_fr ?? ""},
        style_en = ${style_en ?? ""},
        abv = ${abv},
        description_fr = ${description_fr ?? ""},
        description_en = ${description_en ?? ""},
        tasting_notes_fr = ${tasting_notes_fr ?? []},
        tasting_notes_en = ${tasting_notes_en ?? []},
        image_url = ${image_url ?? null},
        is_core = ${is_core ?? false},
        is_featured = ${is_featured ?? false},
        untappd_url = ${untappd_url ?? null},
        sort_order = ${sort_order ?? 0},
        updated_at = now()
      WHERE id = ${id}
      RETURNING *
    `;
    if (!rows?.[0]) return NextResponse.json({ error: "Not found" }, { status: 404 });
    return NextResponse.json(rows[0]);
  } catch (error) {
    console.error("[admin/beers PUT]", error);
    return NextResponse.json({ error: "Failed to update beer" }, { status: 500 });
  }
}

export async function DELETE(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  const denied = await requireAdmin(request);
  if (denied) return denied;

  const { id } = await params;
  // Get image URL before deleting (for Blob cleanup if needed)
  const rows = await query<DbBeer>`SELECT image_url FROM beers WHERE id = ${id}`;
  if (!rows?.[0]) return NextResponse.json({ error: "Not found" }, { status: 404 });

  // Delete Vercel Blob image if it's a blob URL
  const imageUrl = rows[0].image_url;
  if (imageUrl?.includes("blob.vercel-storage.com")) {
    try {
      const { del } = await import("@vercel/blob");
      await del(imageUrl);
    } catch (e) {
      console.warn("[admin/beers DELETE] Could not delete blob:", e);
    }
  }

  await query`DELETE FROM beers WHERE id = ${id}`;
  return NextResponse.json({ ok: true });
}
