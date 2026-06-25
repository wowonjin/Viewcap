import { NextResponse } from "next/server";
import { clearDevSession, getSessionUser } from "@/lib/auth";

export async function GET() {
  const user = await getSessionUser();
  if (!user) return NextResponse.json({ user: null });
  return NextResponse.json({
    user: {
      id: user.id,
      email: user.email,
      name: user.name,
      creditBalance: user.creditBalance,
      planId: user.planId,
    },
  });
}

export async function POST(request: Request) {
  const body = await request.json();
  const { action } = body;

  if (action === "logout") {
    await clearDevSession();
    return NextResponse.json({ ok: true });
  }

  return NextResponse.json({ error: "Invalid action" }, { status: 400 });
}
