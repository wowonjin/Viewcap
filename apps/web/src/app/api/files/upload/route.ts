import { NextRequest, NextResponse } from "next/server";
import { readLocalFile, resolveStorageKey, saveLocalFile } from "@/lib/local-storage";

export async function PUT(request: NextRequest) {
  const key = request.nextUrl.searchParams.get("key");
  if (!key) {
    return NextResponse.json({ error: "key required" }, { status: 400 });
  }

  const body = Buffer.from(await request.arrayBuffer());
  const publicUrl = await saveLocalFile(key, body);
  return NextResponse.json({ ok: true, publicUrl });
}

export async function POST(request: NextRequest) {
  return PUT(request);
}

export async function GET(
  _request: NextRequest,
  { params }: { params: Promise<{ path: string[] }> },
) {
  const { path } = await params;
  const key = path.join("/");

  try {
    const filePath = resolveStorageKey(key);
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
        "Content-Disposition": `inline; filename="${filePath.split(/[/\\]/).pop()}"`,
      },
    });
  } catch {
    return NextResponse.json({ error: "Not found" }, { status: 404 });
  }
}
