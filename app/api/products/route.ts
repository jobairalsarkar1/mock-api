import { logApiUsage, validateApiKey } from '@/lib/apiKey';
import { prisma } from '@/lib/prisma';
import { NextResponse } from 'next/server';

export async function GET(request: Request) {
  try {
    const validation = await validateApiKey(request);
    if ("error" in validation) {
      return NextResponse.json({ error: validation.error }, { status: validation.status });
    }

    const user = validation.user;
    await logApiUsage(user.id, '/api/products', 'GET');

    const { searchParams } = new URL(request.url);
    const limit = parseInt(searchParams.get('limit') || '20');
    const page = parseInt(searchParams.get('page') || '1');
    const offset = (page - 1) * limit;

    const products = await prisma.dummyProduct.findMany({
      skip: offset,
      take: limit,
      orderBy: { createdAt: 'desc' },
    });

    const totalProducts = await prisma.dummyProduct.count();

    return NextResponse.json({ 
      success: true, 
      data: products, 
      page, limit, 
      total_products: totalProducts, 
      hasMore: offset + products.length < totalProducts,
      nextPage: offset + products.length < totalProducts ? page + 1 : null,
      prevPage: page > 1 ? page - 1 : null, 
    });
    
  } catch (error) {
    console.error(error);
    return NextResponse.json({ error: 'Failed to fetch products' }, { status: 500 });
  }
}

export async function POST(request: Request) {
  try {
    const validation = await validateApiKey(request);
    if ("error" in validation) {
      return NextResponse.json({ error: validation.error }, { status: validation.status });
    }

    const user = validation.user;
    await logApiUsage(user.id, '/api/products', 'POST');

    const body = await request.json();
    const product = await prisma.dummyProduct.create({
      data: {
        name: body.name,
        description: body.description,
        price: body.price,
        stock: body.stock ?? 0,
        sku: body.sku,
        category: body.category,
        image: body.image,
      },
    });

    return NextResponse.json({ success: true, data: product });
  } catch (error) {
    console.error(error);
    return NextResponse.json({ error: 'Failed to create product' }, { status: 500 });
  }
}
