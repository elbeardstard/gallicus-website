import { NextResponse } from "next/server";
import { compare } from "bcryptjs";
import { signToken, makeSessionCookie } from "@/lib/auth";

export async function POST(request: Request) {
  try {
    const { password } = await request.json();

    if (!password || typeof password !== "string") {
      return NextResponse.json({ error: "Password required" }, { status: 400 });
    }

    const hash = process.env.ADMIN_PASSWORD_HASH;
    if (!hash) {
      console.error("ADMIN_PASSWORD_HASH is not set");
      return NextResponse.json({ error: "Server misconfiguration" }, { status: 500 });
    }

    const valid = await compare(password, hash);
    if (!valid) {
      // Deliberate delay to slow brute-force
      await new Promise((r) => setTimeout(r, 500));
      return NextResponse.json({ error: "Invalid password" }, { status: 401 });
    }

    const token = await signToken({});
    const response = NextResponse.json({ ok: true });
    response.headers.set("Set-Cookie", makeSessionCookie(token));
    return response;
  } catch (error) {
    console.error("[admin/login]", error);
    return NextResponse.json({ error: "Internal server error" }, { status: 500 });
  }
}
