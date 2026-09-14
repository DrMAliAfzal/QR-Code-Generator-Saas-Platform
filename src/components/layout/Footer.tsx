import Link from "next/link";
import { QrCode } from "lucide-react";

export default function Footer() {
  return (
    <footer className="bg-white border-t border-slate-200 py-12 mt-20">
      <div className="container mx-auto px-4 md:px-12">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8 mb-8">
          <div className="md:col-span-1 flex flex-col gap-4">
            <Link href="/" className="flex items-center gap-2">
              <div className="bg-indigo-600 p-2 rounded-lg">
                <QrCode className="h-5 w-5 text-white" />
              </div>
              <span className="text-xl font-bold text-slate-900 tracking-tight">Smart QR</span>
            </Link>
            <p className="text-sm text-slate-500 leading-relaxed">
              The premium QR code generator for professionals. Create, customize, and track your QR codes instantly.
            </p>
          </div>
          
          <div>
            <h4 className="font-semibold text-slate-900 mb-4">Products</h4>
            <ul className="space-y-2 text-sm text-slate-600">
              <li><Link href="/url-qr-code" className="hover:text-indigo-600 transition-colors">URL QR Code</Link></li>
              <li><Link href="/vcard-qr-code" className="hover:text-indigo-600 transition-colors">vCard QR Code</Link></li>
              <li><Link href="/wifi-qr-code" className="hover:text-indigo-600 transition-colors">WiFi QR Code</Link></li>
              <li><Link href="/whatsapp-qr-code" className="hover:text-indigo-600 transition-colors">WhatsApp QR Code</Link></li>
            </ul>
          </div>
          
          <div>
            <h4 className="font-semibold text-slate-900 mb-4">Resources</h4>
            <ul className="space-y-2 text-sm text-slate-600">
              <li><Link href="/pricing" className="hover:text-indigo-600 transition-colors">Pricing</Link></li>
              <li><Link href="/blog" className="hover:text-indigo-600 transition-colors">Blog</Link></li>
              <li><Link href="/login" className="hover:text-indigo-600 transition-colors">Dashboard Login</Link></li>
            </ul>
          </div>
          
          <div>
            <h4 className="font-semibold text-slate-900 mb-4">Legal</h4>
            <ul className="space-y-2 text-sm text-slate-600">
              <li><Link href="/privacy-policy" className="hover:text-indigo-600 transition-colors">Privacy Policy</Link></li>
              <li><Link href="/terms-of-service" className="hover:text-indigo-600 transition-colors">Terms of Service</Link></li>
            </ul>
          </div>
        </div>
        
        <div className="pt-8 border-t border-slate-100 text-center text-sm text-slate-500 flex flex-col md:flex-row justify-between items-center gap-4">
          <p>&copy; {new Date().getFullYear()} Smart QR Studio by Al-Afzal Solutions. All rights reserved.</p>
        </div>
      </div>
    </footer>
  );
}
