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
import { Crown, X } from 'lucide-react';
import { formatWifi, formatVCard, formatWhatsApp } from '@/lib/qr-engine/payload-formatters';

export default function QRGenerator({ 
  isDynamic = false, 
  defaultTab = 'url',
  editMode = false,
  qrId = '',
  initialData = null 
}: { 
  isDynamic?: boolean, 
  defaultTab?: string,
  editMode?: boolean,
  qrId?: string,
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  initialData?: any 
}) {
  const [activeTab, setActiveTab] = useState(initialData?.qrType || defaultTab);
  
  const [url, setUrl] = useState(initialData?.destination?.destinationUrl || 'https://example.com');
  const [text, setText] = useState('Hello World');
  const [wifiSsid, setWifiSsid] = useState('');
  const [wifiPass, setWifiPass] = useState('');
  
  const [fgColor, setFgColor] = useState(initialData?.design?.fgColor || '#000000');
  const [bgColor, setBgColor] = useState(initialData?.design?.bgColor || '#ffffff');
  const [margin, setMargin] = useState(10);
  
  const [logoImg, setLogoImg] = useState<string | undefined>(initialData?.logo?.storageKey || undefined);
  const [qrMode, setQrMode] = useState<'dynamic' | 'static'>(initialData?.type || 'dynamic');
  const qrRef = useRef<HTMLDivElement>(null);
  const [qrCodeStyling, setQrCodeStyling] = useState<any>(null);
  const [safetyScore, setSafetyScore] = useState<'Excellent' | 'Warning' | 'Unsafe'>('Excellent');
  const [safetyIssues, setSafetyIssues] = useState<string[]>([]);
  
  // WhatsApp State
  const [waPhone, setWaPhone] = useState('');
  const [waText, setWaText] = useState('');
  
  // vCard State
  const [vcName, setVcName] = useState('');
  const [vcPhone, setVcPhone] = useState('');
  const [vcEmail, setVcEmail] = useState('');
  const [vcOrg, setVcOrg] = useState('');
  const [vcTitle, setVcTitle] = useState('');
  const [vcUrl, setVcUrl] = useState('');


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
      case 'whatsapp': return formatWhatsApp(waPhone, waText);
      case 'vcard': return formatVCard({ name: vcName, phone: vcPhone, email: vcEmail, org: vcOrg, title: vcTitle, url: vcUrl });
      default: return url;
    }
  };

  useEffect(() => {
    if (!qrCodeStyling) return;
    
    const issues: string[] = [];
    let score: 'Excellent' | 'Warning' | 'Unsafe' = 'Excellent';
      const payload = getPayloadData();
      if (!payload || payload.trim() === '') {
        issues.push('Content is empty. Please enter a URL or text.');
        score = 'Unsafe';
      } else if (payload.length > 250) {
        issues.push('Content is very long. The QR code will be dense and hard to scan.');
        score = 'Warning';
      }
    
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
    
    // Check free limit
    const limitKey = 'smart_qr_usage';
    let usage = { week_start: Date.now(), counts: {} as Record<string, number> };
    try {
      const stored = localStorage.getItem(limitKey);
      if (stored) {
        usage = JSON.parse(stored);
      }
    } catch (e) {}

    // Reset if 7 days passed
    const SEVEN_DAYS = 7 * 24 * 60 * 60 * 1000;
    if (Date.now() - usage.week_start > SEVEN_DAYS) {
      usage = { week_start: Date.now(), counts: {} };
    }

    const count = usage.counts[activeTab] || 0;
    if (count >= 5) {
      const timeRemaining = (usage.week_start + SEVEN_DAYS) - Date.now();
      const daysLeft = Math.floor(timeRemaining / (1000 * 60 * 60 * 24));
      const hoursLeft = Math.floor((timeRemaining % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
      const timeString = daysLeft > 0 ? `${daysLeft} days and ${hoursLeft} hours` : `${hoursLeft} hours`;
      
      setLimitTime(timeString);
      setShowLimitModal(true);
      return;
    }

    // Increment count
    usage.counts[activeTab] = count + 1;
    localStorage.setItem(limitKey, JSON.stringify(usage));

    qrCodeStyling.download({ name: 'Smart-QR-Studio', extension: 'png' });
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
  const [showLimitModal, setShowLimitModal] = useState(false);
  const [limitTime, setLimitTime] = useState('');

  const handleSaveDynamic = async () => {
    setIsSaving(true);
    try {
      const endpoint = editMode ? '/api/qr/' + qrId : '/api/qr/save';const method = editMode ? 'PUT' : 'POST';const response = await fetch(endpoint, {  method: method,  headers: { 'Content-Type': 'application/json' },  body: JSON.stringify({
    destinationUrl: getPayloadData(),    qrType: activeTab,    designData: { fgColor, bgColor, margin, logoImg: logoImg || null }  ,
mode: qrMode
})});
      const data = await response.json();
      if (data.success) {
        const finalUrl = qrMode === 'dynamic' ? `${window.location.origin}/r/${data.slug}` : getPayloadData();
        qrCodeStyling.update({ data: finalUrl });
        setTimeout(() => {
          qrCodeStyling.download({ name: qrMode === 'dynamic' ? 'Smart-QR-Dynamic' : 'Smart-QR-Static', extension: 'png' });
          setIsSaving(false);
          alert(qrMode === 'dynamic' ? 'Dynamic QR Code saved!' : 'Static QR Code saved (History tracked)!');
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
        
        {isDynamic && !editMode && (
          <Card className="mb-6 bg-slate-50 border-blue-100">
            <CardContent className="p-4">
              <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
                <div>
                  <h3 className="font-bold text-sm">QR Code Type</h3>
                  <p className="text-xs text-slate-500">Dynamic codes track scans and can be edited. Static codes cannot be edited later.</p>
                </div>
                <div className="flex bg-slate-200 p-1 rounded-lg">
                  <button type="button" onClick={() => setQrMode('dynamic')} className={`px-3 py-1.5 text-xs font-medium rounded-md ${qrMode === 'dynamic' ? 'bg-white shadow-sm text-blue-600' : 'text-slate-600'}`}>Dynamic</button>
                  <button type="button" onClick={() => setQrMode('static')} className={`px-3 py-1.5 text-xs font-medium rounded-md ${qrMode === 'static' ? 'bg-white shadow-sm text-slate-800' : 'text-slate-600'}`}>Static</button>
                </div>
              </div>
            </CardContent>
          </Card>
        )}
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
                      <TabsTrigger value="whatsapp" className="border rounded-md px-4 py-2 data-[state=active]:bg-primary data-[state=active]:text-primary-foreground">WhatsApp</TabsTrigger>
                      <TabsTrigger value="vcard" className="border rounded-md px-4 py-2 data-[state=active]:bg-primary data-[state=active]:text-primary-foreground">vCard</TabsTrigger>
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
                      {activeTab === 'whatsapp' && (
                        <div className="space-y-4">
                          <div className="space-y-2">
                            <Label>WhatsApp Number (with country code)</Label>
                            <Input value={waPhone} onChange={(e) => setWaPhone(e.target.value)} placeholder="+1234567890" />
                          </div>
                          <div className="space-y-2">
                            <Label>Pre-filled Message (Optional)</Label>
                            <Input value={waText} onChange={(e) => setWaText(e.target.value)} placeholder="Hello! I'm interested..." />
                          </div>
                        </div>
                      )}
                      {activeTab === 'vcard' && (
                        <div className="space-y-4">
                          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                            <div className="space-y-2">
                              <Label>Full Name</Label>
                              <Input value={vcName} onChange={(e) => setVcName(e.target.value)} placeholder="John Doe" />
                            </div>
                            <div className="space-y-2">
                              <Label>Email</Label>
                              <Input value={vcEmail} onChange={(e) => setVcEmail(e.target.value)} placeholder="john@example.com" type="email" />
                            </div>
                            <div className="space-y-2">
                              <Label>Phone Number</Label>
                              <Input value={vcPhone} onChange={(e) => setVcPhone(e.target.value)} placeholder="+1234567890" />
                            </div>
                            <div className="space-y-2">
                              <Label>Organization / Company</Label>
                              <Input value={vcOrg} onChange={(e) => setVcOrg(e.target.value)} placeholder="Acme Corp" />
                            </div>
                            <div className="space-y-2">
                              <Label>Job Title</Label>
                              <Input value={vcTitle} onChange={(e) => setVcTitle(e.target.value)} placeholder="CEO" />
                            </div>
                            <div className="space-y-2">
                              <Label>Website URL</Label>
                              <Input value={vcUrl} onChange={(e) => setVcUrl(e.target.value)} placeholder="https://..." />
                            </div>
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
                    {isSaving ? 'Saving...' : (editMode ? 'Update & Download' : 'Save & Download')}
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
    
      {showLimitModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/60 backdrop-blur-sm">
          <div className="bg-white rounded-2xl shadow-2xl max-w-md w-full p-8 relative animate-in fade-in zoom-in duration-200">
            <button onClick={() => setShowLimitModal(false)} className="absolute top-4 right-4 text-slate-400 hover:text-slate-600 transition-colors">
              <X className="w-5 h-5" />
            </button>
            <div className="mx-auto w-16 h-16 bg-indigo-50 rounded-full flex items-center justify-center mb-6">
              <Crown className="w-8 h-8 text-indigo-600" />
            </div>
            <h3 className="text-2xl font-bold text-center text-slate-900 mb-2">Limit Reached</h3>
            <p className="text-slate-600 text-center mb-6">
              You have reached your free weekly limit of 5 downloads for this tool.
            </p>
            <div className="bg-slate-50 border border-slate-100 rounded-lg p-4 mb-8 text-center">
              <span className="block text-sm font-medium text-slate-500 mb-1">Limit resets in</span>
              <span className="block text-lg font-bold text-indigo-600">{limitTime}</span>
            </div>
            <div className="space-y-3">
              <Button onClick={() => window.location.href = '/pricing'} className="w-full bg-indigo-600 hover:bg-indigo-700 text-white font-medium text-lg py-6 shadow-lg shadow-indigo-200 hover:-translate-y-0.5 transition-all">
                View Premium Plans
              </Button>
              <Button onClick={() => setShowLimitModal(false)} variant="ghost" className="w-full text-slate-500 hover:text-slate-700">
                Maybe Later
              </Button>
            </div>
          </div>
        </div>
      )}
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










