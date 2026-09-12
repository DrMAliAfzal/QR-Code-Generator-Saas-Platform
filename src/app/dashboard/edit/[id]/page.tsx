import QRGenerator from "@/components/qr/QRGenerator";
import { createClient } from '@/lib/supabase/server';
import prisma from '@/lib/prisma';
import { redirect, notFound } from 'next/navigation';

export default async function EditQRCodePage({ params }: { params: Promise<{ id: string }> }) {
  const { id } = await params;
  const supabase = await createClient();
  const { data: { user } } = await supabase.auth.getUser();

  if (!user) {
    redirect('/login');
  }

  const qrCode = await prisma.qrCode.findUnique({
    where: { id: id },
    include: { destination: true, design: true, logo: true }
  });

  if (!qrCode || qrCode.ownerId !== user.id) {
    notFound();
  }

  return (
    <div className="flex flex-col gap-8 w-full max-w-6xl mx-auto">
      <div className="flex flex-col gap-2">
        <h1 className="text-3xl font-bold tracking-tight">Edit QR Code</h1>
        <p className="text-slate-500">Update your QR code's content, colors, and logo.</p>
      </div>
      
      <div className="-mt-4">
        <QRGenerator 
          isDynamic={true} 
          editMode={true}
          qrId={qrCode.id}
          initialData={qrCode}
        />
      </div>
    </div>
  );
}
