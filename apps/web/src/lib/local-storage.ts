import { mkdir, readFile, writeFile } from "node:fs/promises";
import { dirname, join, normalize } from "node:path";

const STORAGE_ROOT = join(process.cwd(), "storage", "uploads");

export function isLocalStorage() {
  return process.env.LOCAL_STORAGE === "true" || !process.env.S3_ENDPOINT;
}

export function getLocalStorageRoot() {
  return STORAGE_ROOT;
}

export function resolveStorageKey(key: string) {
  const normalized = normalize(key).replace(/^(\.\.(\/|\\|$))+/, "");
  return join(STORAGE_ROOT, normalized);
}

export async function saveLocalFile(key: string, body: Buffer) {
  const filePath = resolveStorageKey(key);
  await mkdir(dirname(filePath), { recursive: true });
  await writeFile(filePath, body);
  return getLocalPublicUrl(key);
}

export async function readLocalFile(key: string) {
  const filePath = resolveStorageKey(key);
  return readFile(filePath);
}

export function getLocalPublicUrl(key: string) {
  const base = process.env.NEXT_PUBLIC_APP_URL ?? "http://localhost:3000";
  return `${base}/api/files/${key.split("/").map(encodeURIComponent).join("/")}`;
}

export function keyFromPublicUrl(url: string): string | null {
  try {
    const u = new URL(url);
    const prefix = "/api/files/";
    if (u.pathname.startsWith(prefix)) {
      return decodeURIComponent(u.pathname.slice(prefix.length));
    }
  } catch {
    return null;
  }
  return null;
}
