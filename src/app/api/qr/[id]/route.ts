import { NextResponse, NextRequest } from 'next/server';
import { createClient } from '@/lib/supabase/server';
import prisma from '@/lib/prisma';

export async function DELETE(req: NextRequest, { params }: { params: Promise<{ id: string }> }) {
  try {
    const { id } = await params;
    const supabase = await createClient();
    const { data: { user } } = await supabase.auth.getUser();

    if (!user) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }

    const qrCode = await prisma.qrCode.findUnique({
      where: { id: id }
    });

    if (!qrCode || qrCode.ownerId !== user.id) {
      return NextResponse.json({ error: 'Not found or unauthorized' }, { status: 404 });
    }

    await prisma.qrCode.delete({
      where: { id: id }
    });

    return NextResponse.json({ success: true });
  } catch (error: unknown) {
    return NextResponse.json({ error: error instanceof Error ? error.message : 'Unknown error' }, { status: 500 });
  }
}

export async function PUT(req: NextRequest, { params }: { params: Promise<{ id: string }> }) {
  try {
    const { id } = await params;
    const supabase = await createClient();
    const { data: { user } } = await supabase.auth.getUser();

    if (!user) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }

    const body = await req.json();
    const { destinationUrl, designData } = body;

    const qrCode = await prisma.qrCode.findUnique({
      where: { id: id },
      include: { destination: true, design: true, logo: true }
    });

    if (!qrCode || qrCode.ownerId !== user.id) {
      return NextResponse.json({ error: 'Not found or unauthorized' }, { status: 404 });
    }

    if (destinationUrl) {
      await prisma.qrDestination.update({
        where: { qrCodeId: id },
        data: { destinationUrl: destinationUrl }
      });
    }

    if (designData) {
      await prisma.qrDesign.upsert({
        where: { qrCodeId: id },
        create: {
          qrCodeId: id,
          fgColor: designData.fgColor || '#000000',
          bgColor: designData.bgColor || '#ffffff',
        },
        update: {
          fgColor: designData.fgColor,
          bgColor: designData.bgColor,
        }
      });

      if (designData.logoImg) {
        await prisma.qrLogo.upsert({
          where: { qrCodeId: id },
          create: {
            qrCodeId: id,
            storageKey: designData.logoImg,
          },
          update: {
            storageKey: designData.logoImg,
          }
        });
      } else if (designData.logoImg === null) {
        if (qrCode.logo) {
          await prisma.qrLogo.delete({ where: { qrCodeId: id } });
        }
      }
    }

    return NextResponse.json({ success: true, slug: qrCode.destination?.slug });
  } catch (error: unknown) {
    return NextResponse.json({ error: error instanceof Error ? error.message : 'Unknown error' }, { status: 500 });
  }
}
