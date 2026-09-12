import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: {
    template: '%s | Smart QR Studio',
    default: 'Smart QR Studio | Free & Premium QR Code Generator',
  },
  description: "Generate fully customized, logo-embedded, scan-safe QR codes instantly. 100% private static codes for free, or dynamic tracking for professionals.",
  openGraph: {
    title: 'Smart QR Studio',
    description: 'Generate fully customized, logo-embedded, scan-safe QR codes instantly.',
    url: 'https://qr-code-generator-saas-platform-al-afzal-solution.vercel.app',
    siteName: 'Smart QR Studio',
    locale: 'en_US',
    type: 'website',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Smart QR Studio',
    description: 'Generate fully customized, logo-embedded, scan-safe QR codes instantly.',
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className={`${geistSans.variable} ${geistMono.variable} h-full antialiased`}>
      <body className="min-h-full flex flex-col">{children}</body>
    </html>
  );
}
