'use client';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Check, QrCode } from "lucide-react";
import Link from "next/link";

export default function PricingPage() {
  const plans = [
    {
      name: "Free",
      price: "$0",
      description: "Perfect for personal use and testing.",
      features: [
        "Unlimited Static QR Codes",
        "5 Dynamic QR Codes",
        "Logo & Design Customization",
        "30-day Analytics Retention",
        "Community Support",
      ],
      cta: "Get Started",
      link: "/signup",
      popular: false,
    },
    {
      name: "Pro",
      price: "$9",
      description: "For professionals needing reliable tracking.",
      features: [
        "100 Dynamic QR Codes",
        "180-day Analytics Retention",
        "Ad-Free Experience",
        "Full Template Library",
        "Priority Email Support",
      ],
      cta: "Join Waitlist",
      link: "#",
      popular: true,
    },
    {
      name: "Business",
      price: "$39",
      description: "For teams and growing businesses.",
      features: [
        "1,000 Dynamic QR Codes",
        "365-day Analytics Retention",
        "Bulk Generation (CSV)",
        "API Access",
        "5 Team Seats",
      ],
      cta: "Join Waitlist",
      link: "#",
      popular: false,
    }
  ];

  const handleUpgradeClick = (e: React.MouseEvent, link: string) => {
    if (link === '#') {
      e.preventDefault();
      alert("Premium plans are launching very soon! We are finalizing our payment gateway. Please check back in a few days.");
    }
  };

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
            <Link href="/blog" className="text-sm text-slate-600 hover:text-slate-900 font-medium transition-colors">Blog</Link>
            <Link href="/login" className="text-sm text-slate-600 hover:text-slate-900 font-medium transition-colors">Log in</Link>
            <Link href="/signup">
              <Button className="bg-indigo-600 hover:bg-indigo-700 text-white rounded-full px-6">Sign up</Button>
            </Link>
          </div>
        </div>
      </header>

      <main className="flex-1 py-20">
        <div className="container mx-auto px-4 max-w-6xl">
          <div className="text-center mb-16">
            <h1 className="text-4xl md:text-5xl font-bold mb-4">Simple pricing, no surprises</h1>
            <p className="text-xl text-slate-600 max-w-2xl mx-auto">
              Choose the perfect plan for your needs. Always free for basic use, upgrade when you need professional features.
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-8 max-w-5xl mx-auto">
            {plans.map((plan) => (
              <Card key={plan.name} className={`relative flex flex-col ${plan.popular ? 'border-indigo-600 shadow-xl scale-105 z-10' : 'border-slate-200'}`}>
                {plan.popular && (
                  <div className="absolute top-0 left-1/2 transform -translate-x-1/2 -translate-y-1/2">
                    <span className="bg-indigo-600 text-white text-xs font-bold uppercase py-1 px-3 rounded-full">Most Popular</span>
                  </div>
                )}
                <CardHeader>
                  <CardTitle className="text-2xl">{plan.name}</CardTitle>
                  <CardDescription>{plan.description}</CardDescription>
                  <div className="mt-4 flex items-baseline text-5xl font-extrabold">
                    {plan.price}
                    <span className="ml-1 text-xl font-medium text-slate-500">/mo</span>
                  </div>
                </CardHeader>
                <CardContent className="flex-1">
                  <ul className="space-y-4">
                    {plan.features.map((feature) => (
                      <li key={feature} className="flex items-start">
                        <Check className="h-5 w-5 text-green-500 shrink-0 mr-2" />
                        <span className="text-slate-600">{feature}</span>
                      </li>
                    ))}
                  </ul>
                </CardContent>
                <CardFooter>
                  <Link href={plan.link} onClick={(e) => handleUpgradeClick(e, plan.link)} className="w-full block">
                  <Button className="w-full" variant={plan.popular ? "default" : "outline"}>
                    {plan.cta}
                  </Button>
                </Link>
                </CardFooter>
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

