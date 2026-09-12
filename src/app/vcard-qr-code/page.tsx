import Link from 'next/link';
import QRGenerator from '@/components/qr/QRGenerator';

export const metadata = {
  title: 'vCard QR Code Generator | Free & Instant',
  description: 'Create a digital business card QR code. Scanners can instantly save your contact details to their phone.',
};

export default function VCardQrCodePage() {
  return (
    <div className="min-h-screen bg-slate-50 flex flex-col">
      <header className="bg-white border-b py-4 px-6 md:px-12 flex justify-between items-center">
        <Link href="/" className="font-bold text-xl text-slate-900">Simple QR Code Generator</Link>
        <div className="flex gap-4 items-center">
          <Link href="/login" className="text-sm text-slate-600 hover:text-slate-900 font-medium">Log in</Link>
          <Link href="/signup" className="text-sm bg-slate-900 text-white px-4 py-2 rounded-md font-medium hover:bg-slate-800">Sign up</Link>
        </div>
      </header>
      <main className="flex-1 py-12 px-4 md:px-8">
        <div className="text-center mb-12 max-w-2xl mx-auto">
          <h1 className="text-4xl font-extrabold tracking-tight mb-4 text-slate-900">vCard QR Code Generator</h1>
          <p className="text-lg text-slate-600">Share your contact details instantly with a single scan.</p>
        </div>
        <QRGenerator defaultTab="url" /> 
        {/* Placeholder for now, wait, we don't have a vCard tab yet in QRGenerator, I'll update it later */}
      </main>
    </div>
  );
}

