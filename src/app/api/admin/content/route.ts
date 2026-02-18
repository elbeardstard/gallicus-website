import { NextRequest, NextResponse } from "next/server";
import { requireAdmin } from "@/lib/auth";
import { query } from "@/lib/db";
import { getAllContentRaw } from "@/lib/data/content";

export async function GET(request: NextRequest) {
  const denied = await requireAdmin(request);
  if (denied) return denied;

  const content = await getAllContentRaw();
  return NextResponse.json(content);
}

export async function PATCH(request: NextRequest) {
  const denied = await requireAdmin(request);
  if (denied) return denied;

  try {
    const body = await request.json();

    // Accept either a single { key, value } or an array of { key, value }
    const entries: { key: string; value: string }[] = Array.isArray(body) ? body : [body];

    for (const { key, value } of entries) {
      if (typeof key !== "string" || typeof value !== "string") {
        return NextResponse.json({ error: "key and value must be strings" }, { status: 400 });
      }
      await query`
        INSERT INTO site_content (key, value)
        VALUES (${key}, ${value})
        ON CONFLICT (key) DO UPDATE SET value = EXCLUDED.value, updated_at = now()
      `;
    }

    return NextResponse.json({ ok: true });
  } catch (error) {
    console.error("[admin/content PATCH]", error);
    return NextResponse.json({ error: "Failed to update content" }, { status: 500 });
  }
}
