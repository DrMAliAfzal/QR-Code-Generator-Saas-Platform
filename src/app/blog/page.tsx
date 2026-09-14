import Link from "next/link";
import Header from "@/components/layout/Header";
import Footer from "@/components/layout/Footer";
import { Card, CardContent, CardHeader, CardTitle, CardFooter } from "@/components/ui/card";
import { ArrowRight, BookOpen, Clock } from "lucide-react";
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
    date: "September 12, 2026",
    category: "Guide",
    readTime: "5 min read"
  },
  {
    title: "How to Create a QR Code for Your Restaurant Menu",
    slug: "restaurant-menu-qr-code",
    description: "Step-by-step guide to digitizing your restaurant menu with QR codes to improve customer experience and save printing costs.",
    date: "September 10, 2026",
    category: "Tutorial",
    readTime: "4 min read"
  }
];

export default function BlogIndex() {
  return (
    <div className="flex flex-col min-h-screen bg-slate-50 font-sans">
      <Header />
      
      <main className="flex-1">
        {/* Premium Hero Section */}
        <div className="relative pt-24 pb-16 px-4 overflow-hidden">
          <div className="absolute top-0 left-1/2 -translate-x-1/2 w-full max-w-5xl h-[400px] bg-indigo-50 rounded-full blur-3xl opacity-60 -z-10 pointer-events-none"></div>
          <div className="container mx-auto max-w-4xl text-center">
            <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-indigo-100/50 border border-indigo-200 text-indigo-700 text-sm font-semibold mb-6">
              <BookOpen className="w-4 h-4" />
              Resources & Insights
            </div>
            <h1 className="text-4xl md:text-5xl font-extrabold mb-6 tracking-tight text-slate-900">QR Code Guides & Articles</h1>
            <p className="text-lg md:text-xl text-slate-600 max-w-2xl mx-auto leading-relaxed">
              Expert advice on leveraging QR technology for your business. Discover tips, tutorials, and marketing strategies.
            </p>
          </div>
        </div>

        {/* Blog Post Grid */}
        <div className="container mx-auto px-4 max-w-5xl pb-24">
          <div className="grid md:grid-cols-2 gap-8">
            {posts.map(post => (
              <Link key={post.slug} href={`/blog/${post.slug}`} className="block group">
                <Card className="h-full flex flex-col bg-white border-slate-200 !overflow-visible transition-all duration-300 group-hover:shadow-[0_0_40px_-10px_rgba(79,70,229,0.2)] group-hover:-translate-y-2 group-hover:border-indigo-300 relative z-10">
                  <CardHeader className="pb-4">
                    <div className="flex justify-between items-center mb-3">
                      <span className="text-xs font-bold uppercase tracking-wider text-indigo-600 bg-indigo-50 px-2.5 py-1 rounded-md">
                        {post.category}
                      </span>
                      <div className="flex items-center text-xs text-slate-400 gap-1 font-medium">
                        <Clock className="w-3.5 h-3.5" />
                        {post.readTime}
                      </div>
                    </div>
                    <CardTitle className="text-2xl font-bold text-slate-900 leading-tight group-hover:text-indigo-600 transition-colors">
                      {post.title}
                    </CardTitle>
                    <div className="text-sm text-slate-500 pt-2 font-medium">{post.date}</div>
                  </CardHeader>
                  <CardContent className="flex-1">
                    <p className="text-slate-600 leading-relaxed">{post.description}</p>
                  </CardContent>
                  <CardFooter className="pt-0 pb-6">
                    <div className="flex items-center text-indigo-600 font-semibold text-sm group-hover:translate-x-1 transition-transform">
                      Read Article <ArrowRight className="ml-2 w-4 h-4" />
                    </div>
                  </CardFooter>
                </Card>
              </Link>
            ))}
          </div>
        </div>
      </main>
      
      <Footer />
    </div>
  );
}
