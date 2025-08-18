import { logApiUsage, validateApiKey } from '@/lib/apiKey';
import { prisma } from '@/lib/prisma';
import { NextResponse } from 'next/server';

export async function GET(request: Request, context: { params: Promise<{ id: string }> }) {
  try {
    const validation = await validateApiKey(request);
    if ("error" in validation) {
      return NextResponse.json({ success: false, error: validation.error }, { status: validation.status });
    }

    const { id } = await context.params;
    const user = validation.user;
    await logApiUsage(user.id, `/api/orders/[id]`, "GET");

    const order = await prisma.dummyOrder.findUnique({
      where: { id },
      include: { items: true }
    });

    if (!order) {
      return NextResponse.json({ success: false, error: "Order not found" }, { status: 404 });
    }

    return NextResponse.json({ success: true, data: order });
  } catch (error) {
    console.error(error);
    return NextResponse.json({ success: false, error: "Failed to fetch order" }, { status: 500 });
  }
}
