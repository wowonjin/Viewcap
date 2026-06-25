import { NextResponse } from "next/server";
import { setDevSession, upsertUserFromAuth } from "@/lib/auth";

export async function POST(request: Request) {
  const { email, password } = await request.json();

  if (!email || !password) {
    return NextResponse.json({ error: "Email and password required" }, { status: 400 });
  }

  if (process.env.DEV_AUTH_ENABLED === "true") {
    const user = await upsertUserFromAuth({ email, name: email.split("@")[0] });
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
  const { data, error } = await supabase.auth.signInWithPassword({ email, password });
  if (error) return NextResponse.json({ error: error.message }, { status: 401 });

  const user = await upsertUserFromAuth({
    email,
    supabaseId: data.user?.id,
    name: data.user?.user_metadata?.name,
  });

  return NextResponse.json({ user: { id: user.id, email: user.email } });
}
