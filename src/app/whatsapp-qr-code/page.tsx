import Link from 'next/link';
import Header from "@/components/layout/Header";
import Footer from "@/components/layout/Footer";
import QRGenerator from '@/components/qr/QRGenerator';

export const metadata = {
  title: 'WhatsApp QR Code Generator | Free & Instant',
  description: 'Create a WhatsApp QR code to let customers chat with you instantly without saving your number.',
};

export default function WhatsAppQrCodePage() {
  return (
    <div className="min-h-screen bg-slate-50 flex flex-col">
      <Header />
      <main className="flex-1 py-12 px-4 md:px-8">
        <div className="text-center mb-12 max-w-2xl mx-auto">
          <h1 className="text-4xl font-extrabold tracking-tight mb-4 text-slate-900">WhatsApp QR Code Generator</h1>
          <p className="text-lg text-slate-600">Let customers chat with you instantly by scanning a code.</p>
        </div>
        <QRGenerator defaultTab="url" />
      </main>
      <Footer />
    </div>
  );
}

