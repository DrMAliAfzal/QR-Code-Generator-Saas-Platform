'use client';

import Link from "next/link";
import { QrCode, ChevronDown, Link as LinkIcon, Wifi, Contact, MessageCircle } from "lucide-react";
import { Button } from "@/components/ui/button";

export default function Header() {
  return (
    <header className="sticky top-0 z-50 bg-white/80 backdrop-blur-md border-b border-slate-200">
      <div className="container mx-auto px-4 md:px-12 h-16 flex items-center justify-between">
        {/* Brand */}
        <Link href="/" className="flex items-center gap-2">
          <div className="bg-indigo-600 p-2 rounded-lg">
            <QrCode className="h-5 w-5 text-white" />
          </div>
          <span className="text-xl font-bold text-slate-900 tracking-tight">Smart QR Studio</span>
        </Link>

        {/* Desktop Navigation */}
        <nav className="hidden md:flex items-center gap-6">
          {/* Dropdown Menu */}
          <div className="relative group">
            <button className="flex items-center gap-1 text-sm text-slate-600 hover:text-slate-900 font-medium transition-colors py-4">
              Products <ChevronDown className="h-4 w-4 transition-transform group-hover:rotate-180" />
            </button>
            <div className="absolute top-full left-0 mt-0 w-64 bg-white border border-slate-200 shadow-xl rounded-xl opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-200 transform translate-y-2 group-hover:translate-y-0 overflow-hidden">
              <div className="p-2 flex flex-col">
                <Link href="/url-qr-code" className="flex items-start gap-3 p-3 rounded-lg hover:bg-slate-50 transition-colors">
                  <div className="bg-indigo-50 p-2 rounded-md"><LinkIcon className="h-4 w-4 text-indigo-600" /></div>
                  <div>
                    <div className="text-sm font-semibold text-slate-900">URL QR Code</div>
                    <div className="text-xs text-slate-500">Link to any website</div>
                  </div>
                </Link>
                <Link href="/vcard-qr-code" className="flex items-start gap-3 p-3 rounded-lg hover:bg-slate-50 transition-colors">
                  <div className="bg-indigo-50 p-2 rounded-md"><Contact className="h-4 w-4 text-indigo-600" /></div>
                  <div>
                    <div className="text-sm font-semibold text-slate-900">vCard QR Code</div>
                    <div className="text-xs text-slate-500">Share contact details</div>
                  </div>
                </Link>
                <Link href="/wifi-qr-code" className="flex items-start gap-3 p-3 rounded-lg hover:bg-slate-50 transition-colors">
                  <div className="bg-indigo-50 p-2 rounded-md"><Wifi className="h-4 w-4 text-indigo-600" /></div>
                  <div>
                    <div className="text-sm font-semibold text-slate-900">WiFi QR Code</div>
                    <div className="text-xs text-slate-500">Auto-connect to networks</div>
                  </div>
                </Link>
                <Link href="/whatsapp-qr-code" className="flex items-start gap-3 p-3 rounded-lg hover:bg-slate-50 transition-colors">
                  <div className="bg-indigo-50 p-2 rounded-md"><MessageCircle className="h-4 w-4 text-indigo-600" /></div>
                  <div>
                    <div className="text-sm font-semibold text-slate-900">WhatsApp QR Code</div>
                    <div className="text-xs text-slate-500">Start a direct chat</div>
                  </div>
                </Link>
              </div>
            </div>
          </div>

          <Link href="/pricing" className="text-sm text-slate-600 hover:text-slate-900 font-medium transition-colors">Pricing</Link>
          <Link href="/blog" className="text-sm text-slate-600 hover:text-slate-900 font-medium transition-colors">Blog</Link>
        </nav>

        {/* Auth Buttons */}
        <div className="flex items-center gap-4">
          <Link href="/login" className="hidden sm:block text-sm text-slate-600 hover:text-slate-900 font-medium transition-colors">Log in</Link>
          <Link href="/signup">
            <Button className="bg-indigo-600 hover:bg-indigo-700 text-white rounded-full px-5">Sign up</Button>
          </Link>
        </div>
      </div>
    </header>
  );
}
