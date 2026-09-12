import AdUnit from "@/components/AdUnit";
import { notFound } from "next/navigation";
import Link from "next/link";
import { QrCode } from "lucide-react";
import { Button } from "@/components/ui/button";

export const generateMetadata = ({ params }: { params: { slug: string } }) => {
  return {
    title: `${params.slug.replace(/-/g, ' ')} | Smart QR Studio`,
  };
};

export default function BlogPost({ params }: { params: { slug: string } }) {
  if (params.slug !== 'dynamic-vs-static-qr-codes' && params.slug !== 'restaurant-menu-qr-code') {
    notFound();
  }

  return (
    <div className="flex flex-col min-h-screen bg-slate-50 font-sans">
      <header className="sticky top-0 z-50 bg-white/80 backdrop-blur-md border-b border-slate-200">
        <div className="container mx-auto px-4 h-16 flex items-center justify-between">
          <Link href="/" className="flex items-center gap-2">
            <div className="bg-indigo-600 p-2 rounded-lg">
              <QrCode className="h-5 w-5 text-white" />
            </div>
            <span className="text-xl font-bold text-slate-900 tracking-tight">Smart QR Studio</span>
          </Link>
          <div className="flex items-center gap-4">
            <Link href="/pricing" className="text-sm text-slate-600 hover:text-slate-900 font-medium transition-colors">Pricing</Link>
            <Link href="/login" className="text-sm text-slate-600 hover:text-slate-900 font-medium transition-colors">Log in</Link>
            <Link href="/signup">
              <Button className="bg-indigo-600 hover:bg-indigo-700 text-white rounded-full px-6">Sign up</Button>
            </Link>
          </div>
        </div>
      </header>
      
      <main className="flex-1 py-16">
        <article className="container mx-auto px-4 max-w-3xl prose lg:prose-lg bg-white p-8 rounded-2xl shadow-sm border border-slate-100">
          <h1 className="capitalize font-bold text-4xl mb-4">{params.slug.replace(/-/g, ' ')}</h1>
          <p className="text-slate-500 mb-8">Published on September 12, 2026</p>
          
          <AdUnit slotId="top-content-slot" />
          
          <p>
            Welcome to this comprehensive guide on QR codes. In the modern digital landscape, 
            bridging the offline and online worlds is critical. QR codes serve as the perfect 
            bridge, allowing users to scan a physical code and immediately access digital content.
          </p>
          
          <h2>What is a Static QR Code?</h2>
          <p>
            A static QR code encodes your data directly into the pattern of the code itself. 
            This means the destination URL or text cannot be changed once the code is generated 
            and printed. They are excellent for permanent links, vCards, or simple text messages.
          </p>
          
          <AdUnit slotId="mid-content-slot" />

          <h2>What is a Dynamic QR Code?</h2>
          <p>
            A dynamic QR code encodes a short redirect URL, which then forwards the user to 
            your actual destination. Because the destination is not hardcoded into the image, 
            you can change it at any time without reprinting the QR code. Furthermore, you can 
            track scan analytics, locations, and device types.
          </p>
          
          <h3>Why upgrade to Pro?</h3>
          <p>
            If you are running a marketing campaign, you absolutely need dynamic QR codes. 
            Smart QR Studio offers up to 5 dynamic codes for free, but professionals typically 
            upgrade to our Pro plan to unlock 100 codes and advanced analytics retention.
          </p>
        </article>
      </main>
      <footer className="py-8 bg-white border-t border-slate-200 mt-20">
        <div className="container mx-auto px-4 text-center">
          <p className="text-sm text-slate-500">&copy; 2026 Smart QR Studio by Al-Afzal Solutions. All rights reserved.</p>
        </div>
      </footer>
    </div>
  );
}
