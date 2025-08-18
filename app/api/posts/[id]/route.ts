import { prisma } from "@/lib/prisma";
import { validateApiKey, logApiUsage } from "@/lib/apiKey";
import { NextResponse } from "next/server";

export async function GET(
  request: Request,
  context: { params: Promise<{ id: string }> }
) {
  try {
    const validation = await validateApiKey(request);
    if ("error" in validation) {
      return NextResponse.json(
        { success: false, error: validation.error },
        { status: validation.status }
      );
    }

    const { id } = await context.params;
    const user = validation.user;

    await logApiUsage(user.id, `/api/posts/[id]`, "GET");

    const post = await prisma.dummyPost.findUnique({
      where: { id },
    });

    if (!post) {
      return NextResponse.json(
        { success: false, error: "Post not found" },
        { status: 404 }
      );
    }

    return NextResponse.json({ success: true, data: post });
  } catch (error) {
    console.error(error);
    return NextResponse.json(
      { success: false, error: "Failed to fetch post" },
      { status: 500 }
    );
  }
}
