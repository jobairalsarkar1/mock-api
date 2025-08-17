import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import { validateApiKey } from "@/lib/apiKey";

export async function DELETE(request: Request) {
  try {
    const validation = await validateApiKey(request);
    if ("error" in validation) {
      return NextResponse.json(
        { success: false, error: validation.error },
        { status: validation.status }
      );
    }

    const user = validation.user;

    await prisma.user.delete({
      where: { id: user.id },
    });

    return NextResponse.json(
      { success: true, message: "User deleted successfully" },
      { status: 200 }
    );
  } catch (error: unknown) {
    console.error("Delete User API error:", error);

    if (typeof error === "object" && error !== null && "code" in error) {
      const prismaError = error as { code?: string };
      if (prismaError.code === "P2025") {
        return NextResponse.json(
          { success: false, error: "User not found" },
          { status: 404 }
        );
      }
    }

    return NextResponse.json(
      { success: false, error: "Something went wrong while deleting user" },
      { status: 500 }
    );
  }
}
