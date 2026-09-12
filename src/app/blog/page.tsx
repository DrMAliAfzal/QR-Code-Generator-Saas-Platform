import Link from "next/link";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { QrCode } from "lucide-react";
import { Button } from "@/components/ui/button";

export const metadata = {
  title: 'Blog & Guides | Smart QR Studio',
  description: 'Learn everything about generating, tracking, and optimizing QR codes for your business.',
};

const posts = [
  {
    title: "Dynamic vs Static QR Codes: Which Should You Use?",
    slug: "dynamic-vs-static-qr-codes",
    description: "Understand the key differences between dynamic and static QR codes and choose the right one for your marketing campaigns.",
    date: "September 12, 2026"
  },
  {
    title: "How to Create a QR Code for Your Restaurant Menu",
    slug: "restaurant-menu-qr-code",
    description: "Step-by-step guide to digitizing your restaurant menu with QR codes to improve customer experience and save printing costs.",
    date: "September 10, 2026"
  }
];

export default function BlogIndex() {
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
        <div className="container mx-auto px-4 max-w-4xl">
          <h1 className="text-4xl font-bold mb-8">QR Code Guides & Articles</h1>
          <p className="text-xl text-slate-600 mb-12">Expert advice on leveraging QR technology for your business.</p>
          
          <div className="grid gap-6">
            {posts.map(post => (
              <Card key={post.slug} className="hover:shadow-md transition-shadow">
                <CardHeader>
                  <CardTitle>
                    <Link href={`/blog/${post.slug}`} className="text-indigo-600 hover:underline">
                      {post.title}
                    </Link>
                  </CardTitle>
                  <div className="text-sm text-slate-500">{post.date}</div>
                </CardHeader>
                <CardContent>
                  <p className="text-slate-700">{post.description}</p>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </main>
      <footer className="py-8 bg-white border-t border-slate-200 mt-20">
        <div className="container mx-auto px-4 text-center">
          <p className="text-sm text-slate-500">&copy; 2026 Smart QR Studio by Al-Afzal Solutions. All rights reserved.</p>
        </div>
      </footer>
    </div>
  );
}
