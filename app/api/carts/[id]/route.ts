import { logApiUsage, validateApiKey } from '@/lib/apiKey';
import { prisma } from '@/lib/prisma';
import { NextResponse } from 'next/server';

export async function GET(request: Request, context: { params: Promise<{ id: string }> }) {
  try {
    const validation = await validateApiKey(request);
    if ('error' in validation) {
      return NextResponse.json({ success: false, error: validation.error }, { status: validation.status });
    }

    const { id } = await context.params;

    const cart = await prisma.dummyCart.findUnique({
      where: { id },
      include: { items: true }
    });

    if (!cart) {
      return NextResponse.json({ success: false, error: 'Cart not found' }, { status: 404 });
    }

    await logApiUsage(validation.user.id, `/api/cart/[id]`, 'GET');

    return NextResponse.json({ success: true, data: cart });
  } catch (error) {
    console.error(error);
    return NextResponse.json({ success: false, error: 'Failed to fetch cart' }, { status: 500 });
  }
}
