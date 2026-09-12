/* eslint-disable react-hooks/set-state-in-effect */
/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable react-hooks/exhaustive-deps */
"use client";

import { useState, useEffect, useRef } from 'react';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
import { Badge } from "@/components/ui/badge";
import { formatWifi, formatVCard, formatWhatsApp } from '@/lib/qr-engine/payload-formatters';

export default function QRGenerator({ isDynamic = false, defaultTab = 'url' }: { isDynamic?: boolean, defaultTab?: string }) {
  const [activeTab, setActiveTab] = useState(defaultTab);
  
  const [url, setUrl] = useState('https://example.com');
  const [text, setText] = useState('Hello World');
  const [wifiSsid, setWifiSsid] = useState('');
  const [wifiPass, setWifiPass] = useState('');
  
  const [fgColor, setFgColor] = useState('#000000');
  const [bgColor, setBgColor] = useState('#ffffff');
  const [margin, setMargin] = useState(10);
  
  const [logoImg, setLogoImg] = useState<string | undefined>();
  
  const qrRef = useRef<HTMLDivElement>(null);
  const [qrCodeStyling, setQrCodeStyling] = useState<any>(null);
  const [safetyScore, setSafetyScore] = useState<'Excellent' | 'Warning' | 'Unsafe'>('Excellent');
  const [safetyIssues, setSafetyIssues] = useState<string[]>([]);

  useEffect(() => {
    import('qr-code-styling').then((module) => {
      const QRCodeStyling = module.default;
      const qr = new QRCodeStyling({
        width: 1000, height: 1000,
        margin: margin,
        qrOptions: { errorCorrectionLevel: 'H' },
        imageOptions: { hideBackgroundDots: true, imageSize: 0.4, margin: 5 }
      });
      setQrCodeStyling(qr);
      if (qrRef.current) {
        qr.append(qrRef.current);
      }
    });
  }, []);

  const getPayloadData = () => {
    switch (activeTab) {
      case 'url': return url;
      case 'text': return text;
      case 'wifi': return formatWifi(wifiSsid, wifiPass);
      default: return url;
    }
  };

  useEffect(() => {
    if (!qrCodeStyling) return;
    
    const issues: string[] = [];
    let score: 'Excellent' | 'Warning' | 'Unsafe' = 'Excellent';
    
    const fgRgb = hexToRgb(fgColor);
    const bgRgb = hexToRgb(bgColor);
    if (fgRgb && bgRgb) {
      const contrast = getContrastRatio(fgRgb, bgRgb);
      if (contrast < 3) {
        issues.push('Contrast ratio is dangerously low.');
        score = 'Unsafe';
      } else if (contrast < 4.5) {
        issues.push('Contrast ratio is slightly low.');
        score = 'Warning';
      }
    }
    
    if (margin < 5) {
      issues.push('The quiet zone (margin) is too small.');
      score = score === 'Unsafe' ? 'Unsafe' : 'Warning';
    }
    
    setSafetyScore(score);
    setSafetyIssues(issues);

    qrCodeStyling.update({
      data: getPayloadData(),
      margin: margin,
      dotsOptions: { color: fgColor, type: 'square' },
      backgroundOptions: { color: bgColor },
      image: logoImg,
    });
  }, [activeTab, url, text, wifiSsid, wifiPass, fgColor, bgColor, margin, logoImg, qrCodeStyling]);

  const handleDownload = () => {
    if (!qrCodeStyling) return;
    qrCodeStyling.download({ name: 'qr-code', extension: 'png' });
  };

  const handleLogoUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = (ev) => {
        setLogoImg(ev.target?.result as string);
      };
      reader.readAsDataURL(file);
    } else {
      setLogoImg(undefined);
    }
  };

  const [isSaving, setIsSaving] = useState(false);

  const handleSaveDynamic = async () => {
    setIsSaving(true);
    try {
      const response = await fetch('/api/qr/save', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          destinationUrl: getPayloadData(),
          qrType: activeTab,
          designData: { fgColor, bgColor, margin, logoImg }
        })
      });
      const data = await response.json();
      if (data.success) {
        const dynamicUrl = `${window.location.origin}/r/${data.slug}`;
        qrCodeStyling.update({ data: dynamicUrl });
        setTimeout(() => {
          qrCodeStyling.download({ name: 'dynamic-qr-code', extension: 'png' });
          setIsSaving(false);
          alert('Dynamic QR Code saved! You can view it in your dashboard.');
        }, 500);
      } else {
        alert(data.error || 'Failed to save');
        setIsSaving(false);
      }
    } catch (e) {
      alert('Network error');
      setIsSaving(false);
    }
  };

  return (
    <div className="flex flex-col lg:flex-row gap-8 w-full max-w-6xl mx-auto">
      <div className="w-full lg:w-2/3 flex flex-col gap-6">
        <Tabs defaultValue="content" className="w-full">
          <TabsList className="grid w-full grid-cols-3 mb-6">
            <TabsTrigger value="content">1. Content</TabsTrigger>
            <TabsTrigger value="design">2. Design</TabsTrigger>
            <TabsTrigger value="logo">3. Logo</TabsTrigger>
          </TabsList>
          
          <TabsContent value="content">
            <Card>
              <CardHeader>
                <CardTitle>QR Content</CardTitle>
                <CardDescription>Select the type of QR code you want to generate.</CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
                  <TabsList className="flex flex-wrap h-auto gap-2 p-1 bg-transparent">
                    <TabsTrigger value="url" className="border rounded-md px-4 py-2 data-[state=active]:bg-primary data-[state=active]:text-primary-foreground">URL</TabsTrigger>
                    <TabsTrigger value="text" className="border rounded-md px-4 py-2 data-[state=active]:bg-primary data-[state=active]:text-primary-foreground">Text</TabsTrigger>
                    <TabsTrigger value="wifi" className="border rounded-md px-4 py-2 data-[state=active]:bg-primary data-[state=active]:text-primary-foreground">Wi-Fi</TabsTrigger>
                  </TabsList>
                  
                  <div className="mt-6 border-t pt-4">
                    {activeTab === 'url' && (
                      <div className="space-y-2">
                        <Label>Website URL</Label>
                        <Input value={url} onChange={(e) => setUrl(e.target.value)} placeholder="https://..." />
                      </div>
                    )}
                    {activeTab === 'text' && (
                      <div className="space-y-2">
                        <Label>Plain Text</Label>
                        <Input value={text} onChange={(e) => setText(e.target.value)} placeholder="Type something..." />
                      </div>
                    )}
                    {activeTab === 'wifi' && (
                      <div className="space-y-4">
                        <div className="space-y-2">
                          <Label>Network Name (SSID)</Label>
                          <Input value={wifiSsid} onChange={(e) => setWifiSsid(e.target.value)} placeholder="MyWiFi" />
                        </div>
                        <div className="space-y-2">
                          <Label>Password</Label>
                          <Input value={wifiPass} onChange={(e) => setWifiPass(e.target.value)} type="password" />
                        </div>
                      </div>
                    )}
                  </div>
                </Tabs>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="design">
            <Card>
              <CardHeader>
                <CardTitle>Colors & Shapes</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="grid grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label>QR Color</Label>
                    <div className="flex gap-2">
                      <Input type="color" value={fgColor} onChange={(e) => setFgColor(e.target.value)} className="w-12 h-10 p-1" />
                      <Input value={fgColor} onChange={(e) => setFgColor(e.target.value)} className="flex-1" />
                    </div>
                  </div>
                  <div className="space-y-2">
                    <Label>Background Color</Label>
                    <div className="flex gap-2">
                      <Input type="color" value={bgColor} onChange={(e) => setBgColor(e.target.value)} className="w-12 h-10 p-1" />
                      <Input value={bgColor} onChange={(e) => setBgColor(e.target.value)} className="flex-1" />
                    </div>
                  </div>
                </div>
                <div className="space-y-2 pt-4">
                  <Label>Margin (Quiet Zone): {margin}px</Label>
                  <Input type="range" min="0" max="40" value={margin} onChange={(e) => setMargin(Number(e.target.value))} className="w-full" />
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="logo">
            <Card>
              <CardHeader>
                <CardTitle>Upload Logo</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <Input type="file" accept="image/png, image/jpeg, image/svg+xml" onChange={handleLogoUpload} />
                {logoImg && (
                  <Button variant="outline" onClick={() => setLogoImg(undefined)}>Remove Logo</Button>
                )}
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </div>

      <div className="w-full lg:w-1/3">
        <div className="sticky top-6 flex flex-col gap-6">
          <Card>
            <CardHeader className="pb-4 border-b">
              <div className="flex items-center justify-between">
                <CardTitle className="text-lg">Live Preview</CardTitle>
                <Badge variant="outline" className={
                  safetyScore === 'Excellent' ? 'bg-green-100 text-green-800 border-green-200' :
                  safetyScore === 'Warning' ? 'bg-yellow-100 text-yellow-800 border-yellow-200' :
                  'bg-red-100 text-red-800 border-red-200'
                }>
                  {safetyScore}
                </Badge>
              </div>
            </CardHeader>
            <CardContent className="flex flex-col items-center gap-6 pt-6">
              <div ref={qrRef} className="rounded-lg overflow-hidden border shadow-sm flex items-center justify-center bg-white w-[300px] h-[300px] [&>canvas]:!w-full [&>canvas]:!h-full [&>svg]:!w-full [&>svg]:!h-full"></div>
              
              <div className="flex w-full gap-2">
                {isDynamic ? (
                  <Button className="w-full" size="lg" onClick={handleSaveDynamic} disabled={safetyScore === 'Unsafe' || isSaving}>
                    {isSaving ? 'Saving...' : 'Save & Download'}
                  </Button>
                ) : (
                  <Button className="w-full" size="lg" onClick={handleDownload} disabled={safetyScore === 'Unsafe'}>
                    Download PNG
                  </Button>
                )}
              </div>
            </CardContent>
          </Card>
          
          <Alert className={
            safetyScore === 'Excellent' ? 'border-green-200 bg-green-50' :
            safetyScore === 'Warning' ? 'border-yellow-200 bg-yellow-50' :
            'border-red-200 bg-red-50'
          }>
            <AlertTitle className="font-semibold mb-2">Scan Safety Score: {safetyScore}</AlertTitle>
            <AlertDescription className="text-sm">
              {safetyIssues.length > 0 ? (
                <ul className="list-disc pl-4 space-y-1">
                  {safetyIssues.map((i, idx) => <li key={idx}>{i}</li>)}
                </ul>
              ) : "Your QR code is highly scannable and safe to print."}
            </AlertDescription>
          </Alert>
        </div>
      </div>
    </div>
  );
}

function hexToRgb(hex: string) {
  const result = /^#?([a-f\d]{2})([a-f\d]{2})([a-f\d]{2})$/i.exec(hex);
  return result ? {
    r: parseInt(result[1], 16),
    g: parseInt(result[2], 16),
    b: parseInt(result[3], 16)
  } : null;
}
function getLuminance(r: number, g: number, b: number) {
  const a = [r, g, b].map(function (v) {
    v /= 255;
    return v <= 0.03928 ? v / 12.92 : Math.pow((v + 0.055) / 1.055, 2.4);
  });
  return a[0] * 0.2126 + a[1] * 0.7152 + a[2] * 0.0722;
}
function getContrastRatio(rgb1: any, rgb2: any) {
  const lum1 = getLuminance(rgb1.r, rgb1.g, rgb1.b);
  const lum2 = getLuminance(rgb2.r, rgb2.g, rgb2.b);
  const brightest = Math.max(lum1, lum2);
  const darkest = Math.min(lum1, lum2);
  return (brightest + 0.05) / (darkest + 0.05);
}




