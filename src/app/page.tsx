import Link from 'next/link';
import QRGenerator from '@/components/qr/QRGenerator';

export const metadata = {
  title: 'Free QR Code Generator | Simple & Secure',
  description: 'Generate fully customized, logo-embedded, scan-safe QR codes instantly. No login required, and your data never leaves your browser.',
};

export default function Home() {
  return (
    <div className="min-h-screen bg-slate-50 flex flex-col">
      <header className="bg-white border-b py-4 px-6 md:px-12 flex justify-between items-center">
        <div className="font-bold text-xl text-slate-900">Simple QR Code Generator</div>
        <div className="flex gap-4 items-center">
          <Link href="/login" className="text-sm text-slate-600 hover:text-slate-900 font-medium">Log in</Link>
          <Link href="/signup" className="text-sm bg-slate-900 text-white px-4 py-2 rounded-md font-medium hover:bg-slate-800">Sign up</Link>
        </div>
      </header>
      
      <main className="flex-1 py-12 px-4 md:px-8">
        <div className="text-center mb-12 max-w-2xl mx-auto">
          <h1 className="text-4xl font-extrabold tracking-tight mb-4 text-slate-900">Create Your Free QR Code</h1>
          <p className="text-lg text-slate-600">Customize your design, add a logo, and download a scan-safe QR code instantly. No signup required.</p>
        </div>
        
        <QRGenerator />
        
        <section className="mt-24 max-w-4xl mx-auto prose prose-slate px-4">
          <h2 className="text-2xl font-bold">Why use our Simple QR Code Generator?</h2>
          <p className="mt-2 text-slate-600">Unlike other tools, our generator creates your static QR codes entirely inside your browser. This means your URLs, Wi-Fi passwords, and contact details are never sent to our servers. It&apos;s 100% private and instantly fast.</p>
          
          <h3 className="text-xl font-bold mt-8">Static vs Dynamic QR Codes</h3>
          <p className="mt-2 text-slate-600"><strong>Static QR Codes (Free)</strong> encode your data directly into the pattern. They are permanent and can never be changed once printed.</p>
          <p className="mt-2 text-slate-600"><strong>Dynamic QR Codes (Requires Account)</strong> encode a short link that redirects to your final destination. You can update the link anytime and track how many people scanned it.</p>
        </section>
      </main>
    </div>
  );
}

