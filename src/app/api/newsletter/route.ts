import { NextResponse } from 'next/server';
import { z } from 'zod';
import { prisma } from '@/lib/prisma';

const newsletterSchema = z.object({
  email: z.string().trim().email().max(180),
  locale: z.enum(['fr', 'en']).default('fr'),
  source: z.string().trim().max(80).default('footer')
});

export async function POST(request: Request) {
  try {
    const payload = newsletterSchema.parse(await request.json());
    await prisma.newsletterSubscriber.upsert({
      where: { email: payload.email.toLowerCase() },
      update: { locale: payload.locale, source: payload.source, isActive: true },
      create: { email: payload.email.toLowerCase(), locale: payload.locale, source: payload.source }
    });
    return NextResponse.json({ ok: true });
  } catch (error) {
    return NextResponse.json({ error: 'Invalid email.' }, { status: 400 });
  }
}
