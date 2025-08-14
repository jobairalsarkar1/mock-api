import { NextResponse } from "next/server";
import { auth } from "@/auth";
import { prisma } from "@/lib/prisma";
import { generateApiKey } from "@/lib/generateAPIKey";

export async function POST() {
  try {
    const session = await auth();

    if (!session?.user?.email) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    const newKey = generateApiKey();

    await prisma.user.update({
      where: { email: session.user.email },
      data: { apiKey: newKey },
    });

    return NextResponse.json({ apiKey: newKey });
  } catch (error) {
    console.error("Failed to regenerate API key:", error);
    return NextResponse.json(
      { error: "Failed to regenerate API key. Please try again." },
      { status: 500 }
    );
  }
}
