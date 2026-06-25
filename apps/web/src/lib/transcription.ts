import type { TranscriptSegment } from "@viewcap/edl";
import OpenAI, { toFile } from "openai";
import { keyFromPublicUrl, readLocalFile } from "@/lib/local-storage";

export const MOCK_TRANSCRIPT: TranscriptSegment[] = [
  { startMs: 0, endMs: 3000, text: "안녕하세요, 오늘 강의를 시작하겠습니다." },
  { startMs: 3000, endMs: 7000, text: "핵심 개념을 빠르게 정리해 드릴게요." },
  { startMs: 7000, endMs: 12000, text: "이 부분이 시험에 자주 나옵니다." },
  { startMs: 12000, endMs: 15000, text: "다음 영상에서 이어서 설명하겠습니다." },
];

async function loadMediaBuffer(assetUrl: string): Promise<Buffer | null> {
  const key = keyFromPublicUrl(assetUrl);
  if (key) {
    try {
      return readLocalFile(key);
    } catch {
      return null;
    }
  }
  try {
    const res = await fetch(assetUrl);
    if (!res.ok) return null;
    return Buffer.from(await res.arrayBuffer());
  } catch {
    return null;
  }
}

export async function transcribeFromUrl(assetUrl: string): Promise<TranscriptSegment[]> {
  if (!process.env.OPENAI_API_KEY) return MOCK_TRANSCRIPT;

  const buffer = await loadMediaBuffer(assetUrl);
  if (!buffer) return MOCK_TRANSCRIPT;

  try {
    const openai = new OpenAI({ apiKey: process.env.OPENAI_API_KEY });
    const file = await toFile(buffer, "media.mp4", { type: "video/mp4" });
    const result = await openai.audio.transcriptions.create({
      file,
      model: "whisper-1",
      response_format: "verbose_json",
    });

    const segments = (result as { segments?: Array<{ start: number; end: number; text: string }> }).segments;
    if (segments?.length) {
      return segments.map((s) => ({
        startMs: Math.round(s.start * 1000),
        endMs: Math.round(s.end * 1000),
        text: s.text.trim(),
      }));
    }

    const text = (result as { text?: string }).text;
    if (text) return [{ startMs: 0, endMs: 15000, text: text.trim() }];
  } catch {
    // fallback below
  }

  return MOCK_TRANSCRIPT;
}
