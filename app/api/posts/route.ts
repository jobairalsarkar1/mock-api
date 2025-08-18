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
    await logApiUsage(user.id, "/api/posts", "GET");

    const { searchParams } = new URL(request.url);
    const limit = parseInt(searchParams.get("limit") || "20");
    const page = parseInt(searchParams.get("page") || "1");
    const offset = (page - 1) * limit;

    const posts = await prisma.dummyPost.findMany({
      skip: offset,
      take: limit,
      orderBy: { createdAt: "desc" },
    });

    const totalPosts = await prisma.dummyPost.count();

    return NextResponse.json({
      success: true,
      data: posts,
      page,
      limit,
      total_posts: totalPosts,
    });
  } catch (error) {
    console.error(error);
    return NextResponse.json(
      { success: false, error: "Failed to fetch posts" },
      { status: 500 }
    );
  }
}
