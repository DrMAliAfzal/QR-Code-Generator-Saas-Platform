import { NextRequest, NextResponse } from 'next/server';
import prisma from '@/lib/prisma';

export async function GET(
  request: NextRequest,
  { params }: { params: { slug: string } }
) {
  const { slug } = params;

  try {
    const destination = await prisma.qrDestination.findUnique({
      where: { slug },
      include: { qrCode: true }
    });

    if (!destination || !destination.isActive || !destination.qrCode) {
      return new NextResponse('QR Code not found or inactive', { status: 404 });
    }

    if (destination.qrCode.status !== 'active') {
      return new NextResponse('QR Code is currently disabled', { status: 403 });
    }

    const userAgent = request.headers.get('user-agent') || '';
    const referrer = request.headers.get('referer') || '';
    const deviceType = /Mobile|Android|iP(hone|od)|IEMobile|BlackBerry|Kindle|Silk-Accelerated|(hpw|web)OS|Opera M(obi|ini)/.test(userAgent) ? 'mobile' : 'desktop';
    
    const country = request.headers.get('x-vercel-ip-country') || request.headers.get('cf-ipcountry') || 'Unknown';

    const searchParams = request.nextUrl.searchParams;

    prisma.qrScan.create({
      data: {
        qrCodeId: destination.qrCodeId,
        deviceType,
        country,
        referrer,
        utmSource: searchParams.get('utm_source'),
        utmMedium: searchParams.get('utm_medium'),
        utmCampaign: searchParams.get('utm_campaign'),
      }
    }).catch(e => console.error('Failed to log scan:', e));

    return NextResponse.redirect(destination.destinationUrl);
  } catch (error) {
    console.error('Redirect Error:', error);
    return new NextResponse('Internal Server Error', { status: 500 });
  }
}
