import { prisma } from "@/lib/prisma";
import { validateApiKey, logApiUsage } from "@/lib/apiKey";
import { NextResponse } from "next/server";

export async function GET(request: Request, context: { params: Promise<{ id: string }> }) {
  try {
    const validation = await validateApiKey(request);
    if ("error" in validation) {
      return NextResponse.json({ success: false, error: validation.error }, { status: validation.status });
    }

    const { id } = await context.params;

    const user = validation.user;
    await logApiUsage(user.id, `/api/payments/[id]`, "GET");

    const payment = await prisma.dummyPayment.findUnique({
      where: { id },
      include: { items: true },
    });

    if (!payment) {
      return NextResponse.json({ success: false, error: "Payment not found" }, { status: 404 });
    }

    return NextResponse.json({ success: true, data: payment });
  } catch (error) {
    console.error(error);
    return NextResponse.json({ success: false, error: "Failed to fetch payment" }, { status: 500 });
  }
}
