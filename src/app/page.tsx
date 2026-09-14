import Link from 'next/link';
import Header from '@/components/layout/Header';
import Footer from '@/components/layout/Footer';
import QRGenerator from '@/components/qr/QRGenerator';
import { Shield, Zap, Palette, BarChart3, Edit3, Lock, CheckCircle2, ChevronRight } from 'lucide-react';
import { Button } from '@/components/ui/button';


export const metadata = {
  title: 'Smart QR Studio | Free & Premium QR Code Generator',
  description: 'Generate fully customized, logo-embedded, scan-safe QR codes instantly. 100% private static codes for free, or dynamic tracking for professionals.',
  openGraph: {
    title: 'Smart QR Studio | Premium QR Code Generator',
    description: 'Generate fully customized, logo-embedded, scan-safe QR codes instantly. Free static codes, fully private.',
    type: 'website',
  },
};

export default function Home() {
  // JSON-LD Schema for Software Application
  const jsonLd = {
    '@context': 'https://schema.org',
    '@type': 'WebApplication',
    name: 'Smart QR Studio',
    url: 'https://qr-code-generator-saas-platform-al-afzal-solution.vercel.app',
    applicationCategory: 'UtilityApplication',
    operatingSystem: 'Any',
    offers: {
      '@type': 'Offer',
      price: '0',
      priceCurrency: 'USD',
    },
    description: 'A professional web application for generating static and dynamic QR codes with logo embedding and analytics.',
    featureList: [
      'Static QR Code Generation',
      'Dynamic QR Code Tracking',
      'Logo Embedding',
      'Custom Colors',
      'High-Resolution PNG/SVG Export'
    ]
  };

  return (
    <div className="min-h-screen bg-slate-50 flex flex-col font-sans selection:bg-blue-100 selection:text-blue-900">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />
      {/* Header */}
      <Header />
        <style dangerouslySetInnerHTML={{ __html: 'details > summary { list-style: none; } details > summary::-webkit-details-marker { display: none; }' }} />
      
      <main className="flex-1">
        {/* Hero Section */}
        <section id="generator" className="relative pt-24 pb-32 px-4 overflow-hidden">
          <div className="absolute top-0 left-1/2 -translate-x-1/2 w-full max-w-5xl h-[500px] bg-blue-50 rounded-full blur-3xl opacity-50 -z-10 pointer-events-none"></div>
          
          <div className="text-center max-w-3xl mx-auto mb-16">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-blue-50 border border-blue-100 text-blue-700 text-xs font-semibold uppercase tracking-wider mb-6">
              <Zap className="w-3 h-3" /> No Signup Required for Static QR
            </div>
            <h1 className="text-5xl md:text-6xl font-extrabold tracking-tight mb-6 text-slate-900 leading-tight">
              Create the perfect <br/><span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-600 to-indigo-600">QR Code</span> in seconds.
            </h1>
            <p className="text-xl text-slate-600 max-w-2xl mx-auto leading-relaxed">
              Design beautiful, scan-safe QR codes with your logo and brand colors. Free forever for static codes, fully private, and generated instantly in your browser.
            </p>
          </div>
          
          {/* Interactive Generator */}
          <div className="max-w-4xl mx-auto bg-white rounded-2xl shadow-xl border border-slate-200 overflow-hidden relative z-10">
            <div className="p-1 bg-gradient-to-r from-blue-100 via-indigo-100 to-purple-100 border-b border-slate-100"></div>
            <div className="p-6 md:p-10">
              <QRGenerator isDynamic={false} />
            </div>
          </div>
        </section>

        {/* GEO: How it Works Section */}
        <section className="py-24 bg-white px-4 border-t border-slate-100">
          <div className="max-w-5xl mx-auto">
            <div className="text-center mb-16">
              <h2 className="text-3xl font-bold text-slate-900 mb-4">How to create a QR Code</h2>
              <p className="text-slate-600 max-w-2xl mx-auto">Generate a high-quality, scan-safe QR code in three simple steps.</p>
            </div>
            
            <div className="grid md:grid-cols-3 gap-8">
              <div className="bg-slate-50 rounded-2xl p-8 border border-slate-100 relative">
                <div className="absolute -top-4 -left-4 w-8 h-8 bg-blue-600 text-white rounded-full flex items-center justify-center font-bold">1</div>
                <h3 className="text-xl font-bold text-slate-900 mb-3">Choose Content</h3>
                <p className="text-slate-600">Select whether you want to share a website URL, text, a Wi-Fi password, or a digital business card (vCard).</p>
              </div>
              <div className="bg-slate-50 rounded-2xl p-8 border border-slate-100 relative">
                <div className="absolute -top-4 -left-4 w-8 h-8 bg-blue-600 text-white rounded-full flex items-center justify-center font-bold">2</div>
                <h3 className="text-xl font-bold text-slate-900 mb-3">Customize Design</h3>
                <p className="text-slate-600">Change the colors to match your brand. You can also upload your company logo to appear seamlessly in the center.</p>
              </div>
              <div className="bg-slate-50 rounded-2xl p-8 border border-slate-100 relative">
                <div className="absolute -top-4 -left-4 w-8 h-8 bg-blue-600 text-white rounded-full flex items-center justify-center font-bold">3</div>
                <h3 className="text-xl font-bold text-slate-900 mb-3">Download & Print</h3>
                <p className="text-slate-600">Click download to get a high-resolution PNG image. Our AI checks the contrast to ensure your code is perfectly scannable.</p>
              </div>
            </div>
          </div>
        </section>

        {/* Features Grid */}
        <section className="py-24 bg-slate-50 px-4 border-t border-slate-200">
          <div className="max-w-6xl mx-auto">
            <div className="text-center mb-16">
              <h2 className="text-3xl font-bold text-slate-900 mb-4">Why choose Smart QR Studio?</h2>
              <p className="text-slate-600 max-w-2xl mx-auto">Built for professionals who care about design, privacy, and reliability.</p>
            </div>

            <div className="grid md:grid-cols-3 gap-10">
              <div className="flex flex-col items-center text-center">
                <div className="w-14 h-14 bg-blue-50 text-blue-600 rounded-2xl flex items-center justify-center mb-6 shadow-sm border border-blue-100">
                  <Palette className="w-6 h-6" />
                </div>
                <h3 className="text-xl font-bold text-slate-900 mb-2">Beautiful Customization</h3>
                <p className="text-slate-600 leading-relaxed">Match your brand perfectly. Change colors, add your custom logo in the center, and ensure your QR code stands out.</p>
              </div>
              <div className="flex flex-col items-center text-center">
                <div className="w-14 h-14 bg-green-50 text-green-600 rounded-2xl flex items-center justify-center mb-6 shadow-sm border border-green-100">
                  <Shield className="w-6 h-6" />
                </div>
                <h3 className="text-xl font-bold text-slate-900 mb-2">100% Private (Static)</h3>
                <p className="text-slate-600 leading-relaxed">Your data never leaves your device. Static QR codes are generated entirely in your browser using local processing.</p>
              </div>
              <div className="flex flex-col items-center text-center">
                <div className="w-14 h-14 bg-purple-50 text-purple-600 rounded-2xl flex items-center justify-center mb-6 shadow-sm border border-purple-100">
                  <CheckCircle2 className="w-6 h-6" />
                </div>
                <h3 className="text-xl font-bold text-slate-900 mb-2">High-Resolution Export</h3>
                <p className="text-slate-600 leading-relaxed">Download crisp, print-ready HD PNGs that scan flawlessly on billboards, business cards, or screens.</p>
              </div>
            </div>
          </div>
        </section>

        {/* Static vs Dynamic Comparison */}
        <section className="py-24 bg-white px-4 border-t border-slate-100">
          <div className="max-w-5xl mx-auto">
            <div className="text-center mb-16">
              <h2 className="text-3xl font-bold text-slate-900 mb-4">Static vs. Dynamic QR Codes</h2>
              <p className="text-slate-600 max-w-2xl mx-auto">Start free instantly, or upgrade your workflow with trackable dynamic codes.</p>
            </div>

            <div className="grid md:grid-cols-2 gap-8 max-w-4xl mx-auto">
              <div className="bg-slate-50 rounded-2xl p-8 border shadow-sm">
                <div className="inline-block px-3 py-1 bg-white border text-slate-700 text-xs font-semibold uppercase tracking-wider rounded-full mb-4">Forever Free</div>
                <h3 className="text-2xl font-bold text-slate-900 mb-2">Static QR Codes</h3>
                <p className="text-slate-600 mb-6 min-h-[3rem]">Best for permanent items like printed manuals, WiFi access, or personal vCards.</p>
                <ul className="space-y-4 mb-8">
                  <li className="flex items-start gap-3">
                    <CheckCircle2 className="w-5 h-5 text-green-500 shrink-0" />
                    <span className="text-slate-700">No account required</span>
                  </li>
                  <li className="flex items-start gap-3">
                    <CheckCircle2 className="w-5 h-5 text-green-500 shrink-0" />
                    <span className="text-slate-700">Never expires</span>
                  </li>
                  <li className="flex items-start gap-3">
                    <Lock className="w-5 h-5 text-red-400 shrink-0" />
                    <span className="text-slate-500 line-through">Cannot edit link after printing</span>
                  </li>
                  <li className="flex items-start gap-3">
                    <Lock className="w-5 h-5 text-red-400 shrink-0" />
                    <span className="text-slate-500 line-through">No scan tracking</span>
                  </li>
                </ul>
                <Link href="#generator" className="block w-full"><Button className="w-full bg-white border border-slate-200 text-slate-900 hover:bg-slate-100">
                  Create Static Code
                </Button></Link>
              </div>

              <div className="bg-slate-900 text-white rounded-2xl p-8 border border-slate-800 shadow-xl relative overflow-hidden">
                <div className="absolute top-0 right-0 p-4 opacity-10">
                  <Zap className="w-32 h-32" />
                </div>
                <div className="relative z-10">
                  <div className="inline-block px-3 py-1 bg-blue-500/20 text-blue-300 text-xs font-semibold uppercase tracking-wider rounded-full mb-4 border border-blue-500/30">Pro Workflow</div>
                  <h3 className="text-2xl font-bold mb-2">Dynamic QR Codes</h3>
                  <p className="text-slate-400 mb-6 min-h-[3rem]">Best for marketing campaigns, menus, packaging, and businesses.</p>
                  <ul className="space-y-4 mb-8">
                    <li className="flex items-start gap-3">
                      <CheckCircle2 className="w-5 h-5 text-blue-400 shrink-0" />
                      <span className="text-slate-300">Edit destination URL anytime</span>
                    </li>
                    <li className="flex items-start gap-3">
                      <BarChart3 className="w-5 h-5 text-blue-400 shrink-0" />
                      <span className="text-slate-300">Track total scans in dashboard</span>
                    </li>
                    <li className="flex items-start gap-3">
                      <Edit3 className="w-5 h-5 text-blue-400 shrink-0" />
                      <span className="text-slate-300">Save & edit designs in history</span>
                    </li>
                    <li className="flex items-start gap-3">
                      <Shield className="w-5 h-5 text-blue-400 shrink-0" />
                      <span className="text-slate-300">Secure short links included</span>
                    </li>
                  </ul>
                  <Link href="/signup" className="block">
                    <Button className="w-full bg-blue-600 hover:bg-blue-500 text-white border-0">
                      Create Free Account
                    </Button>
                  </Link>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* AEO: FAQ Section */}
        <section className="py-24 bg-slate-50 px-4 border-t border-slate-200">
          <div className="max-w-3xl mx-auto">
            <div className="text-center mb-12">
              <h2 className="text-3xl font-bold text-slate-900 mb-4">Frequently Asked Questions</h2>
              <p className="text-slate-600">Got questions? We've got answers.</p>
            </div>
            
            <div className="w-full bg-white rounded-2xl border p-4 shadow-sm space-y-4">
              <details className="group border-b pb-4 last:border-0 last:pb-0">
                <summary className="flex cursor-pointer items-center justify-between font-semibold text-slate-900 hover:text-blue-600">
                  Are static QR codes really free forever?
                  <ChevronRight className="h-5 w-5 text-slate-500 transition-transform group-open:rotate-90" />
                </summary>
                <p className="mt-4 text-slate-600 leading-relaxed">
                  Yes! Static QR codes generated on our homepage do not require an account and will never expire. Because the data is encoded directly into the image itself, we don't have to host the data, meaning it works forever at no cost to you.
                </p>
              </details>
              
              <details className="group border-b pb-4 last:border-0 last:pb-0">
                <summary className="flex cursor-pointer items-center justify-between font-semibold text-slate-900 hover:text-blue-600">
                  Can I add a logo to the center of my QR code?
                  <ChevronRight className="h-5 w-5 text-slate-500 transition-transform group-open:rotate-90" />
                </summary>
                <p className="mt-4 text-slate-600 leading-relaxed">
                  Absolutely. You can upload any image (like your company logo) and our generator will automatically embed it into the center of the QR code while maintaining high scannability.
                </p>
              </details>

              <details className="group border-b pb-4 last:border-0 last:pb-0">
                <summary className="flex cursor-pointer items-center justify-between font-semibold text-slate-900 hover:text-blue-600">
                  Why is my QR code not scanning?
                  <ChevronRight className="h-5 w-5 text-slate-500 transition-transform group-open:rotate-90" />
                </summary>
                <p className="mt-4 text-slate-600 leading-relaxed">
                  The most common reason a QR code fails to scan is low contrast. Ensure your foreground color (the dots) is significantly darker than your background color. Our generator includes a built-in safety score to warn you if the colors are too similar.
                </p>
              </details>

              <details className="group border-b pb-4 last:border-0 last:pb-0">
                <summary className="flex cursor-pointer items-center justify-between font-semibold text-slate-900 hover:text-blue-600">
                  What is the difference between Static and Dynamic QR codes?
                  <ChevronRight className="h-5 w-5 text-slate-500 transition-transform group-open:rotate-90" />
                </summary>
                <p className="mt-4 text-slate-600 leading-relaxed">
                  A Static QR code encodes your final URL directly into the image and cannot be changed once printed. A Dynamic QR code encodes a short tracking link that redirects to your final URL. This allows you to change the final destination at any time without re-printing the code, and lets you track how many people scanned it.
                </p>
              </details>
            </div>
          </div>
        </section>
      </main>

      {/* Footer */}
      <Footer />
    </div>
  );
}


