import type { Metadata } from "next";
import { Noto_Sans_KR } from "next/font/google";
import "./globals.css";
import { cn } from "@/lib/utils";
import { NextAuthProvider } from "@/lib/nextauthProvider";

const notoSansKR = Noto_Sans_KR({ subsets: ["latin"], weight: "400" });

export const metadata: Metadata = {
  title: "중개랜드",
  description: "함께하는 공인중개사 업무, 중개랜드입니다.",
  icons: { icon: "/icon.png", shortcut: "/icon.png" },
  metadataBase: new URL("http://localhost:3000/"),
  openGraph: {
    title: "중개랜드",
    description: "함께하는 공인중개사 업무, 중개랜드입니다.",
    images: "/icon.png",
    url: "http://localhost:3000/",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="ko">
      <body className={cn("min-h-screen text-gray-900", notoSansKR.className)}>
        <NextAuthProvider>
          {children}
        </NextAuthProvider>
      </body>
    </html>
  );
}
