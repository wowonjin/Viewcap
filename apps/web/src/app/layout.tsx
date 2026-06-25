import type { Metadata } from "next";
import localFont from "next/font/local";
import "./globals.css";

const pretendard = localFont({
  src: [
    {
      path: "../../public/fonts/PretendardVariable.woff2",
      weight: "45 920",
      style: "normal",
    },
  ],
  variable: "--font-pretendard",
  fallback: ["system-ui", "sans-serif"],
  display: "swap",
});

export const metadata: Metadata = {
  title: "ViewCap | AI 영상편집 — 영상만 올리면 편집본이 완성됩니다",
  description:
    "영상 제목, 내용, 원본 영상, 스타일만 입력하면 AI가 컷편집, 자막, 쇼츠 변환까지 자동으로 완성합니다.",
};

export default function RootLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="ko">
      <body className={`${pretendard.variable} antialiased`}>{children}</body>
    </html>
  );
}
