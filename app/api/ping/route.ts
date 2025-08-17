import { logApiUsage, validateApiKey } from "@/lib/apiKey";
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

    await logApiUsage(user.id, "/api/ping", "GET");

    return NextResponse.json(
      {
        success: true,
        message: "Users API is working fine",
      },
      { status: 200 }
    );
  } catch (error) {
    console.error("Ping API error:", error);
    return NextResponse.json(
      { success: false, error: "Failed to ping API" },
      { status: 500 }
    );
  }
}
