import { prisma } from "@/lib/prisma";
import { validateApiKey, logApiUsage } from "@/lib/apiKey";
import { NextResponse } from "next/server";

export async function GET(request: Request) {
  try {
    const validation = await validateApiKey(request);
    if ("error" in validation) {
      return NextResponse.json(
        { success: false, error: validation.error },
        { status: validation.status }
      );
    }

    const user = validation.user;
    await logApiUsage(user.id, "/api/reviews", "GET");

    const { searchParams } = new URL(request.url);
    const limit = parseInt(searchParams.get("limit") || "20");
    const page = parseInt(searchParams.get("page") || "1");
    const offset = (page - 1) * limit;

    const reviews = await prisma.dummyReview.findMany({
      skip: offset,
      take: limit,
      orderBy: { createdAt: "desc" },
    });

    const totalReviews = await prisma.dummyReview.count();

    return NextResponse.json({
      success: true,
      data: reviews,
      page,
      limit,
      total_reviews: totalReviews,
      hasMore: offset + reviews.length < totalReviews,
      nextPage: offset + reviews.length < totalReviews ? page + 1 : null,
      prevPage: page > 1 ? page - 1 : null, 
    });
    
  } catch (error) {
    console.error(error);
    return NextResponse.json(
      { success: false, error: "Failed to fetch reviews" },
      { status: 500 }
    );
  }
}
