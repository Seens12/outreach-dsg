import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import { Toaster } from "@/components/ui/sonner";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "OutreachAI — AI-Powered Outreach Platform",
  description: "Управление outreach-кампаниями с помощью AI. Автоматизация cold outreach, аналитика, AI-ассистент.",
  icons: {
    icon: "data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 100 100'%3E%3Crect width='100' height='100' rx='20' fill='%230d0d0d'/%3E%3Cpath d='M55 15L25 55h20l-5 30 30-40H50l5-30z' fill='white'/%3E%3C/svg%3E",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="ru" suppressHydrationWarning>
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased bg-white text-[#171717]`}
        style={{ fontFamily: "'Geist', -apple-system, BlinkMacSystemFont, sans-serif" }}
      >
        {children}
        <Toaster />
      </body>
    </html>
  );
}
