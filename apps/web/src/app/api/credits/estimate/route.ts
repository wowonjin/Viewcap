import { NextResponse } from "next/server";
import { requireUser } from "@/lib/auth";
import { estimateRenderCredits, CREDIT_RATES } from "@/lib/credits";

export async function POST(request: Request) {
  await requireUser();
  const { durationMs, resolution, includeAnalysis } = await request.json();
  const renderCredits = estimateRenderCredits(durationMs ?? 60000, resolution ?? "1080p");
  const analysisCredits = includeAnalysis ? CREDIT_RATES.ANALYSIS : 0;
  return NextResponse.json({
    estimated: renderCredits + analysisCredits,
    renderCredits,
    analysisCredits,
  });
}
