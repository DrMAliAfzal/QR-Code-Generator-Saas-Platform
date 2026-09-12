import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { createClient } from '@/lib/supabase/server';
import prisma from '@/lib/prisma';
import { redirect } from 'next/navigation';
import { QrCode, ExternalLink } from 'lucide-react';
import QRPreview from '@/components/qr/QRPreview';

export default async function DashboardPage() {
  const supabase = await createClient();
  const { data: { user } } = await supabase.auth.getUser();

  if (!user) {
    redirect('/login');
  }

  const qrCodes = await prisma.qrCode.findMany({
    where: { ownerId: user.id },
    include: { destination: true, design: true, _count: { select: { scans: true } } },
    orderBy: { createdAt: 'desc' }
  });

  return (
    <div className="flex flex-col gap-8">
      <div className="flex items-center justify-between">
        <h1 className="text-3xl font-bold tracking-tight">My QR Codes</h1>
        <Link href="/dashboard/create">
          <Button>Create QR Code</Button>
        </Link>
      </div>
      
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        <Card className="flex flex-col justify-center items-center h-48 border-dashed bg-slate-50 text-slate-500 hover:bg-slate-100 transition-colors cursor-pointer">
          <CardContent className="pt-6">
            <Link href="/dashboard/create" className="flex flex-col items-center gap-2">
              <span className="text-4xl">+</span>
              <span className="font-medium">Create New</span>
            </Link>
          </CardContent>
        </Card>

        {qrCodes.map((qr) => (
          <Card key={qr.id} className="flex flex-col overflow-hidden">
            <CardHeader className="bg-slate-50 border-b pb-4">
              <div className="flex justify-between items-start">
                <CardTitle className="text-lg font-bold flex items-center gap-2">
                  <QrCode className="w-5 h-5 text-slate-500" />
                  {qr.qrType.toUpperCase()}
                </CardTitle>
                <span className="text-xs bg-blue-100 text-blue-800 px-2 py-1 rounded-full font-medium">
                  Dynamic
                </span>
              </div>
            </CardHeader>
            <CardContent className="pt-4 flex-1 flex flex-col gap-4">
              <div className="w-full flex justify-center mb-2">
                <div className="w-32 h-32">
                  <QRPreview data={"https://qr-code-generator-saas-platform.vercel.app/r/" + qr.destination?.slug} fgColor={qr.design?.fgColor} bgColor={qr.design?.bgColor} />
                </div>
              </div>
              <div>
                <p className="text-sm text-slate-500 mb-1">Destination</p>
                <a href={qr.destination?.destinationUrl} target="_blank" rel="noreferrer" className="text-sm font-medium text-blue-600 hover:underline flex items-center gap-1 break-all line-clamp-2">
                  {qr.destination?.destinationUrl}
                  <ExternalLink className="w-3 h-3 flex-shrink-0" />
                </a>
              </div>
              <div className="mt-auto pt-4 border-t flex justify-between items-center">
                <div>
                  <p className="text-xs text-slate-500">Short Link</p>
                  <p className="text-sm font-medium">/r/{qr.destination?.slug}</p>
                </div>
                <div>
                  <p className="text-xs text-slate-500">Scans</p>
                  <p className="text-sm font-medium text-right">{qr._count.scans}</p>
                </div>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  );
}


