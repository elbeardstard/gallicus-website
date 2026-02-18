import { NextRequest, NextResponse } from "next/server";
import { requireAdmin } from "@/lib/auth";
import { query } from "@/lib/db";
import type { DbLocation } from "@/types/db";

export async function GET(request: NextRequest) {
  const denied = await requireAdmin(request);
  if (denied) return denied;

  const rows = await query<DbLocation>`
    SELECT * FROM locations ORDER BY sort_order ASC, created_at ASC
  `;
  return NextResponse.json(rows ?? []);
}

export async function POST(request: NextRequest) {
  const denied = await requireAdmin(request);
  if (denied) return denied;

  try {
    const body = await request.json();
    const { name, address, city, lat, lng, type, sort_order } = body;

    if (!name || !address || !city || lat === undefined || lng === undefined || !type) {
      return NextResponse.json({ error: "Missing required fields" }, { status: 400 });
    }

    const VALID_TYPES = ["brewery", "bar", "retail", "restaurant"];
    if (!VALID_TYPES.includes(type)) {
      return NextResponse.json({ error: "Invalid location type" }, { status: 400 });
    }

    const rows = await query<DbLocation>`
      INSERT INTO locations (name, address, city, lat, lng, type, sort_order)
      VALUES (${name}, ${address}, ${city}, ${lat}, ${lng}, ${type}, ${sort_order ?? 0})
      RETURNING *
    `;
    return NextResponse.json(rows?.[0], { status: 201 });
  } catch (error) {
    console.error("[admin/locations POST]", error);
    return NextResponse.json({ error: "Failed to create location" }, { status: 500 });
  }
}
