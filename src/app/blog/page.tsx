import Link from "next/link";
import Header from "@/components/layout/Header";
import Footer from "@/components/layout/Footer";
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
      <Header />
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
      <Footer />
    </div>
  );
}
