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
    await logApiUsage(user.id, `/api/products/${id}`, "GET");

    const product = await prisma.dummyProduct.findUnique({ where: { id } });
    if (!product) {
      return NextResponse.json({ success: false, error: "Product not found" }, { status: 404 });
    }

    return NextResponse.json({ success: true, data: product });
  } catch (error) {
    console.error(error);
    return NextResponse.json({ success: false, error: "Failed to fetch product" }, { status: 500 });
  }
}

export async function PATCH(request: Request, context: { params: Promise<{ id: string }> }) {
  try {
    const validation = await validateApiKey(request);
    if ("error" in validation) {
      return NextResponse.json({ success: false, error: validation.error }, { status: validation.status });
    }

    const { id } = await context.params;
    const user = validation.user;
    await logApiUsage(user.id, `/api/products/${id}`, "PATCH");

    const body = await request.json();
    const patchedProduct = { id, ...body, updatedAt: new Date() };

    return NextResponse.json({
      success: true,
      message: "Product updated successfully",
      data: patchedProduct,
    });
  } catch (error) {
    console.error(error);
    return NextResponse.json({ success: false, error: "Failed to update product" }, { status: 500 });
  }
}

export async function DELETE(request: Request, context: { params: Promise<{ id: string }> }) {
  try {
    const validation = await validateApiKey(request);
    if ("error" in validation) {
      return NextResponse.json({ success: false, error: validation.error }, { status: validation.status });
    }

    const { id } = await context.params;
    const user = validation.user;
    await logApiUsage(user.id, `/api/products/${id}`, "DELETE");

    return NextResponse.json({
      success: true,
      message: `Product ${id} deleted successfully`,
    });
  } catch (error) {
    console.error(error);
    return NextResponse.json({ success: false, error: "Failed to delete product" }, { status: 500 });
  }
}
