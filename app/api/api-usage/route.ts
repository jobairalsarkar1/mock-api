import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import { validateApiKey } from "@/lib/apiKey";

export async function GET(request: Request) {
  try {
    const validation = await validateApiKey(request);
    if ("error" in validation) {
      return NextResponse.json({ success: false, error: validation.error }, { status: validation.status });
    }

    const user = validation.user;

    const apiUsages = await prisma.apiUsage.findMany({
      where: { userId: user.id },
      orderBy: { createdAt: "desc" },
    });

    return NextResponse.json({ success: true, data: apiUsages });
  } catch (error) {
    console.error(error);
    return NextResponse.json({ success: false, error: "Failed to fetch API usage" }, { status: 500 });
  }
}
