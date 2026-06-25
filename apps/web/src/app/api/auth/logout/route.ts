import { NextResponse } from "next/server";
import { clearDevSession } from "@/lib/auth";

export async function GET() {
  await clearDevSession();
  return NextResponse.redirect(new URL("/login", process.env.NEXT_PUBLIC_APP_URL ?? "http://localhost:3000"));
}

export async function POST() {
  return GET();
}
