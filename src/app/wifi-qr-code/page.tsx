import Link from 'next/link';
import Header from "@/components/layout/Header";
import Footer from "@/components/layout/Footer";
import QRGenerator from '@/components/qr/QRGenerator';

export const metadata = {
  title: 'Wi-Fi QR Code Generator | Free & Instant',
  description: 'Create a custom QR code for your Wi-Fi network. Let guests connect instantly without typing a password.',
};

export default function WifiQrCodePage() {
  return (
    <div className="min-h-screen bg-slate-50 flex flex-col">
      <Header />
      <main className="flex-1 py-12 px-4 md:px-8">
        <div className="text-center mb-12 max-w-2xl mx-auto">
          <h1 className="text-4xl font-extrabold tracking-tight mb-4 text-slate-900">Wi-Fi QR Code Generator</h1>
          <p className="text-lg text-slate-600">Let your guests connect to your Wi-Fi instantly by scanning a code.</p>
        </div>
        <QRGenerator defaultTab="wifi" />
        <section className="mt-24 max-w-4xl mx-auto prose prose-slate px-4 pb-12">
          <h2 className="text-2xl font-bold">Is it safe to make a Wi-Fi QR Code here?</h2>
          <p className="mt-2 text-slate-600">Yes! This generator works entirely in your browser. Your Wi-Fi password is never sent to our servers, keeping your network 100% secure.</p>
        </section>
      </main>
      <Footer />
    </div>
  );
}

