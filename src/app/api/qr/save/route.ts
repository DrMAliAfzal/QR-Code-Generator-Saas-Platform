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
    const cookieStore = await cookies();
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

    await prisma.user.upsert({
      where: { id: user.id },
      update: {},
      create: {
        id: user.id,
        email: user.email || '',
        name: user.email?.split('@')[0] || 'User',
      }
    });

    let org = await prisma.organization.findFirst({
      where: { ownerId: user.id }
    });

    if (!org) {
      org = await prisma.organization.create({
        data: {
          name: 'My Workspace',
          ownerId: user.id
        }
      });
    }

    const body = await req.json();
    const { destinationUrl, qrType, designData } = body;

    const slug = generateSlug(8);

    const qrCode = await prisma.qrCode.create({
      data: {
        ownerId: user.id,
        orgId: org.id,
        type: 'dynamic',
        qrType: qrType || 'url',
        status: 'active',
        destination: {
          create: {
            destinationUrl: destinationUrl || 'https://example.com',
            slug: slug,
            isActive: true,
          }
        },
        design: {
          create: {
            fgColor: designData?.fgColor || '#000000',
            bgColor: designData?.bgColor || '#ffffff',
          }
        }
      },
      include: {
        destination: true,
        design: true
      }
    });

    return NextResponse.json({ success: true, slug: slug, qrCode });
  } catch (error: any) {
    console.error('Error saving QR code:', error);
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}
