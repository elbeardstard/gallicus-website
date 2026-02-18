import { NextRequest, NextResponse } from "next/server";
import { requireAdmin } from "@/lib/auth";
import { query } from "@/lib/db";
import { put } from "@vercel/blob";

const ALLOWED_TYPES = ["image/jpeg", "image/png", "image/webp", "image/avif"];
const MAX_SIZE_BYTES = 4 * 1024 * 1024; // 4 MB

export async function POST(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  const denied = await requireAdmin(request);
  if (denied) return denied;

  const { id } = await params;

  try {
    const formData = await request.formData();
    const file = formData.get("file") as File | null;

    if (!file) {
      return NextResponse.json({ error: "No file provided" }, { status: 400 });
    }
    if (!ALLOWED_TYPES.includes(file.type)) {
      return NextResponse.json(
        { error: "File must be JPEG, PNG, WebP, or AVIF" },
        { status: 400 }
      );
    }
    if (file.size > MAX_SIZE_BYTES) {
      return NextResponse.json({ error: "File must be under 4 MB" }, { status: 400 });
    }

    const extension = file.name.split(".").pop() ?? "jpg";
    const filename = `beers/${id}/${Date.now()}.${extension}`;

    const blob = await put(filename, file, { access: "public" });

    await query`
      UPDATE beers SET image_url = ${blob.url}, updated_at = now()
      WHERE id = ${id}
    `;

    return NextResponse.json({ url: blob.url });
  } catch (error) {
    console.error("[admin/beers/image POST]", error);
    return NextResponse.json({ error: "Failed to upload image" }, { status: 500 });
  }
}
