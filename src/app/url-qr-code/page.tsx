import Link from 'next/link';
import Header from "@/components/layout/Header";
import Footer from "@/components/layout/Footer";
import QRGenerator from '@/components/qr/QRGenerator';

export const metadata = {
  title: 'URL QR Code Generator | Free & Instant',
  description: 'Create a custom QR code for your website link. Fast, secure, and generated entirely in your browser with no tracking.',
};

export default function UrlQrCodePage() {
  return (
    <div className="min-h-screen bg-slate-50 flex flex-col">
      <Header />
      <main className="flex-1 py-12 px-4 md:px-8">
        <div className="text-center mb-12 max-w-2xl mx-auto">
          <h1 className="text-4xl font-extrabold tracking-tight mb-4 text-slate-900">URL QR Code Generator</h1>
          <p className="text-lg text-slate-600">Turn any link into a scannable QR code in seconds.</p>
        </div>
        <QRGenerator defaultTab="url" />
        <section className="mt-24 max-w-4xl mx-auto prose prose-slate px-4 pb-12">
          <h2 className="text-2xl font-bold">How to make a URL QR Code?</h2>
          <p className="mt-2 text-slate-600">Simply copy the URL of the webpage you want to share and paste it into the URL field above. The QR code will update instantly.</p>
        </section>
      </main>
      <Footer />
    </div>
  );
}

