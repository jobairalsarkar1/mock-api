import { logApiUsage, validateApiKey } from '@/lib/apiKey';
import { prisma } from '@/lib/prisma';
import { NextResponse } from 'next/server';

export async function GET(request: Request) {
  try {
    const validation = await validateApiKey(request);
    if ('error' in validation) {
      return NextResponse.json({ success: false, error: validation.error }, { status: validation.status });
    }

    const { searchParams } = new URL(request.url);
    const limit = parseInt(searchParams.get('limit') || '20');
    const page = parseInt(searchParams.get('page') || '1');
    const offset = (page - 1) * limit;

    const carts = await prisma.dummyCart.findMany({
      skip: offset,
      take: limit,
      orderBy: { createdAt: 'desc' },
      include: { items: true }
    });

    const totalCarts = await prisma.dummyCart.count();

    await logApiUsage(validation.user.id, '/api/cart', 'GET');

    return NextResponse.json({ success: true, data: carts, page, limit, total_carts: totalCarts });
  } catch (error) {
    console.error(error);
    return NextResponse.json({ success: false, error: 'Failed to fetch carts' }, { status: 500 });
  }
}
