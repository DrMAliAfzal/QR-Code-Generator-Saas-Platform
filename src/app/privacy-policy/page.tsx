import Link from "next/link";
import Header from "@/components/layout/Header";
import Footer from "@/components/layout/Footer";
import { ArrowLeft, ShieldCheck, Lock, EyeOff } from "lucide-react";

export const metadata = {
  title: "Privacy Policy | Smart QR Studio",
  description: "Read how Smart QR Studio protects your data. We offer 100% private static QR codes generated in your browser and transparent data practices for dynamic tracking.",
};

export default function PrivacyPolicyPage() {
  return (
    <div className="min-h-screen bg-slate-50 font-sans selection:bg-blue-100 selection:text-blue-900 pb-24">
      {/* Premium Minimalist Header */}
      <Header />

      <main className="max-w-3xl mx-auto px-4 pt-16">
        <div className="text-center mb-12">
          <h1 className="text-4xl md:text-5xl font-extrabold tracking-tight text-slate-900 mb-4">Privacy Policy</h1>
          <p className="text-slate-500">Effective Date: September 12, 2026</p>
        </div>

        {/* TL;DR AEO/GEO Optimized Summary */}
        <div className="bg-blue-50 border border-blue-100 rounded-2xl p-6 md:p-8 mb-12 shadow-sm">
          <div className="flex items-center gap-3 mb-4">
            <ShieldCheck className="w-6 h-6 text-blue-600" />
            <h2 className="text-xl font-bold text-slate-900">Quick Summary (TL;DR)</h2>
          </div>
          <ul className="space-y-3 text-slate-700">
            <li className="flex items-start gap-2">
              <Lock className="w-5 h-5 text-slate-400 shrink-0 mt-0.5" />
              <span><strong>Static QR Codes are 100% Private:</strong> If you generate a Static QR code, your data is processed entirely in your web browser. We do not see, store, or transmit your URLs, Wi-Fi passwords, or vCard details.</span>
            </li>
            <li className="flex items-start gap-2">
              <EyeOff className="w-5 h-5 text-slate-400 shrink-0 mt-0.5" />
              <span><strong>No Ads, No Selling Data:</strong> We do not sell your personal information or scan data to third parties. Our business model relies on premium subscriptions, not advertising.</span>
            </li>
            <li className="flex items-start gap-2">
              <ShieldCheck className="w-5 h-5 text-slate-400 shrink-0 mt-0.5" />
              <span><strong>Dynamic Tracking Transparency:</strong> If you use Dynamic QR codes, we collect basic, anonymized scan analytics (like device type and rough geographic region) solely to display in your personal dashboard.</span>
            </li>
          </ul>
        </div>

        {/* Detailed Sections - GEO Optimized Headings */}
        <div className="space-y-10 text-slate-700 leading-relaxed">
          
          <section>
            <h2 className="text-2xl font-bold text-slate-900 mb-4">What data do we collect when you generate a QR code?</h2>
            <p className="mb-4">The data we collect depends entirely on the type of QR code you choose to create:</p>
            <h3 className="text-lg font-bold text-slate-900 mb-2 mt-6">1. Free Static QR Codes</h3>
            <p className="mb-4">When you generate a Static QR code on our homepage without an account, <strong>we collect absolutely zero data</strong>. The generation process utilizes advanced web technologies to create the QR code image locally on your device (in your browser). The text, links, or contact details you enter are never sent to our servers.</p>
            
            <h3 className="text-lg font-bold text-slate-900 mb-2 mt-6">2. Premium Dynamic QR Codes</h3>
            <p>If you create an account to use Dynamic QR codes, we store the destination URL and any design choices (colors, logos) securely in our database. This is technically required so we can redirect users and allow you to edit the destination link later.</p>
          </section>

          <section>
            <h2 className="text-2xl font-bold text-slate-900 mb-4">What happens when someone scans your Dynamic QR code?</h2>
            <p className="mb-4">To provide you with analytics in your dashboard, our servers temporarily process the scan request before redirecting the user to your final URL. During this micro-second process, we log:</p>
            <ul className="list-disc pl-6 space-y-2 mb-4">
              <li><strong>Device Category:</strong> Whether the scan came from a mobile or desktop device.</li>
              <li><strong>General Location:</strong> The country derived from the IP address (the IP address itself is immediately discarded and never stored).</li>
              <li><strong>Scan Time:</strong> To show you daily and monthly trends.</li>
            </ul>
            <p>We <strong>do not</strong> use cookies or tracking pixels to track the individual who scanned your QR code across the internet.</p>
          </section>

          <section>
            <h2 className="text-2xl font-bold text-slate-900 mb-4">How do we secure your account information?</h2>
            <p className="mb-4">If you create an account, we ask for your email address to authenticate you. We use industry-leading secure infrastructure (Supabase) to handle authentication and database storage. Your passwords are cryptographically hashed and never visible to our team.</p>
          </section>

          <section>
            <h2 className="text-2xl font-bold text-slate-900 mb-4">Who do we share your data with?</h2>
            <p className="mb-4">We do not sell, rent, or trade your personal data. We only share necessary technical data with trusted infrastructure providers required to operate the service:</p>
            <ul className="list-disc pl-6 space-y-2 mb-4">
              <li><strong>Vercel:</strong> For hosting our web application and edge routing.</li>
              <li><strong>Supabase:</strong> For secure database hosting and user authentication.</li>
            </ul>
          </section>

          <section>
            <h2 className="text-2xl font-bold text-slate-900 mb-4">How can you delete your data?</h2>
            <p className="mb-4">You own your data. You can delete individual QR codes directly from your dashboard at any time. When you delete a Dynamic QR code, all associated scan analytics and design assets are permanently erased from our active databases. To delete your entire account, please contact our support team.</p>
          </section>

        </div>
      </main>
    </div>
  );
}
