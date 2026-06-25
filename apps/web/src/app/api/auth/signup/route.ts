import { NextResponse } from "next/server";
import { prisma } from "@/lib/db";
import { setDevSession, upsertUserFromAuth } from "@/lib/auth";

export async function POST(request: Request) {
  const { email, password, name } = await request.json();

  if (!email || !password) {
    return NextResponse.json({ error: "Email and password required" }, { status: 400 });
  }

  const existing = await prisma.user.findUnique({ where: { email } });
  if (existing && process.env.DEV_AUTH_ENABLED !== "true") {
    return NextResponse.json({ error: "Email already registered" }, { status: 409 });
  }

  if (process.env.DEV_AUTH_ENABLED === "true") {
    const user = await upsertUserFromAuth({ email, name: name ?? email.split("@")[0] });
    await setDevSession(email);
    return NextResponse.json({ user: { id: user.id, email: user.email } });
  }

  const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL;
  const supabaseKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY;
  if (!supabaseUrl || !supabaseKey) {
    return NextResponse.json({ error: "Auth not configured" }, { status: 500 });
  }

  const { createClient } = await import("@supabase/supabase-js");
  const supabase = createClient(supabaseUrl, supabaseKey);
  const { data, error } = await supabase.auth.signUp({
    email,
    password,
    options: { data: { name } },
  });
  if (error) return NextResponse.json({ error: error.message }, { status: 400 });

  const user = await upsertUserFromAuth({
    email,
    name,
    supabaseId: data.user?.id,
  });

  return NextResponse.json({ user: { id: user.id, email: user.email } });
}
