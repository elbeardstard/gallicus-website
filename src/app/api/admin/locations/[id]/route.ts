import { NextRequest, NextResponse } from "next/server";
import { requireAdmin } from "@/lib/auth";
import { query } from "@/lib/db";
import type { DbLocation } from "@/types/db";

export async function GET(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  const denied = await requireAdmin(request);
  if (denied) return denied;

  const { id } = await params;
  const rows = await query<DbLocation>`SELECT * FROM locations WHERE id = ${id} LIMIT 1`;
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
    const { name, address, city, lat, lng, type, sort_order } = body;

    const rows = await query<DbLocation>`
      UPDATE locations SET
        name = ${name},
        address = ${address},
        city = ${city},
        lat = ${lat},
        lng = ${lng},
        type = ${type},
        sort_order = ${sort_order ?? 0},
        updated_at = now()
      WHERE id = ${id}
      RETURNING *
    `;
    if (!rows?.[0]) return NextResponse.json({ error: "Not found" }, { status: 404 });
    return NextResponse.json(rows[0]);
  } catch (error) {
    console.error("[admin/locations PUT]", error);
    return NextResponse.json({ error: "Failed to update location" }, { status: 500 });
  }
}

export async function DELETE(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  const denied = await requireAdmin(request);
  if (denied) return denied;

  const { id } = await params;
  await query`DELETE FROM locations WHERE id = ${id}`;
  return NextResponse.json({ ok: true });
}
