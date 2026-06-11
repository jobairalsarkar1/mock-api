import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import { validateApiKey } from "@/lib/apiKey";

export async function GET(request: Request) {
  try {
    const validation = await validateApiKey(request);
    if ("error" in validation) {
      return NextResponse.json(
        { success: false, error: validation.error },
        { status: validation.status },
      );
    }

    const user = validation.user;
    const { searchParams } = new URL(request.url);
    const cursor = searchParams.get("cursor") || undefined;
    const requestedLimit = Number(searchParams.get("limit") || "20");
    const limit = Math.min(Math.max(requestedLimit || 20, 1), 50);

    const now = new Date();
    const monthStart = new Date(now.getFullYear(), now.getMonth(), 1);
    const nextMonthStart = new Date(now.getFullYear(), now.getMonth() + 1, 1);

    // Fetch the current paginated chunk of logs
    const apiUsages = await prisma.apiUsage.findMany({
      where: { userId: user.id },
      orderBy: [{ createdAt: "desc" }, { id: "desc" }],
      take: limit + 1,
      ...(cursor
        ? {
            cursor: { id: cursor },
            skip: 1,
          }
        : {}),
    });

    const pageItems = apiUsages.slice(0, limit);
    const hasMore = apiUsages.length > limit;
    const nextCursor = hasMore ? pageItems[pageItems.length - 1]?.id : null;

    // Fetch total and monthly statistics concurrently
    const [totalRequests, monthlyRequests, monthlyUsageDates] =
      await Promise.all([
        prisma.apiUsage.count({ where: { userId: user.id } }),
        prisma.apiUsage.count({
          where: {
            userId: user.id,
            createdAt: {
              gte: monthStart,
              lt: nextMonthStart,
            },
          },
        }),
        prisma.apiUsage.findMany({
          where: {
            userId: user.id,
            createdAt: {
              gte: monthStart,
              lt: nextMonthStart,
            },
          },
          select: { createdAt: true },
          orderBy: { createdAt: "asc" },
        }),
      ]);

    // Format usage grouped by day for the chart component
    const usageByDay = monthlyUsageDates.reduce<Record<string, number>>(
      (acc, item) => {
        const day = item.createdAt.getDate().toString();
        acc[day] = (acc[day] || 0) + 1;
        return acc;
      },
      {},
    );

    const dailyUsage = Object.entries(usageByDay).map(([day, requests]) => ({
      day,
      requests,
    }));

    return NextResponse.json({
      success: true,
      data: pageItems,
      pagination: {
        limit,
        hasMore,
        nextCursor,
      },
      summary: {
        totalRequests,
        monthlyRequests,
        dailyUsage,
      },
    });
  } catch (error) {
    console.error(error);
    return NextResponse.json(
      { success: false, error: "Failed to fetch API usage" },
      { status: 500 },
    );
  }
}
