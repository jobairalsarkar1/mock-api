import { logApiUsage, validateApiKey } from '@/lib/apiKey';
import { prisma } from '@/lib/prisma';
import { NextResponse } from 'next/server';

export async function GET(request: Request) {
  try {
    const validation = await validateApiKey(request);
    if ("error" in validation) {
      return NextResponse.json({ error: validation.error }, { status: validation.status });
    }

    const user = validation.user;
    await logApiUsage(user.id, '/api/orders', 'GET');

    const { searchParams } = new URL(request.url);
    const limit = parseInt(searchParams.get('limit') || '20');
    const page = parseInt(searchParams.get('page') || '1');
    const offset = (page - 1) * limit;

    const orders = await prisma.dummyOrder.findMany({
      skip: offset,
      take: limit,
      orderBy: { createdAt: 'desc' },
      include: { items: true }
    });

    const totalOrders = await prisma.dummyOrder.count();

    return NextResponse.json({ success: true, data: orders, page, limit, total_orders: totalOrders });
  } catch (error) {
    console.error(error);
    return NextResponse.json({ error: 'Failed to fetch orders' }, { status: 500 });
  }
}
