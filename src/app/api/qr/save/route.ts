import { NextResponse, NextRequest } from 'next/server';
import { createServerClient } from '@supabase/ssr';
import { cookies } from 'next/headers';
import prisma from '@/lib/prisma';

// Helper to generate short slugs
function generateSlug(length = 8) {
  const chars = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
  let result = '';
  for (let i = 0; i < length; i++) {
    result += chars.charAt(Math.floor(Math.random() * chars.length));
  }
  return result;
}

export async function POST(req: NextRequest) {
  try {
    const cookieStore = cookies();
    const supabase = createServerClient(
      process.env.NEXT_PUBLIC_SUPABASE_URL!,
      process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!,
      {
        cookies: {
          getAll() {
            return cookieStore.getAll()
          },
        },
      }
    );

    const { data: { user } } = await supabase.auth.getUser();
    if (!user) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }

    const body = await req.json();
    const { destinationUrl, qrType, designData } = body;

    const slug = generateSlug(8);

    const qrCode = await prisma.qrCode.create({
      data: {
        userId: user.id,
        name: `Dynamic QR - ${new Date().toLocaleDateString()}`,
        status: 'active',
        isDynamic: true,
        designData: designData || {},
        qrDestinations: {
          create: {
            destinationUrl: destinationUrl || 'https://example.com',
            type: qrType || 'url',
            slug: slug,
            isActive: true,
          }
        }
      },
      include: {
        qrDestinations: true
      }
    });

    return NextResponse.json({ success: true, slug: slug, qrCode });
  } catch (error: any) {
    console.error('Error saving QR code:', error);
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}
