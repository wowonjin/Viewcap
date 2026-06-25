import { NextRequest, NextResponse } from "next/server";
import { readLocalFile } from "@/lib/local-storage";

export async function GET(
  _request: NextRequest,
  { params }: { params: Promise<{ path: string[] }> },
) {
  const { path } = await params;
  const key = path.join("/");

  try {
    const data = await readLocalFile(key);
    const ext = key.split(".").pop()?.toLowerCase();
    const type =
      ext === "mp4"
        ? "video/mp4"
        : ext === "webm"
          ? "video/webm"
          : "application/octet-stream";

    return new NextResponse(data, {
      headers: {
        "Content-Type": type,
        "Cache-Control": "private, max-age=3600",
      },
    });
  } catch {
    return NextResponse.json({ error: "Not found" }, { status: 404 });
  }
}
