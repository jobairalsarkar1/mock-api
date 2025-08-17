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
    await logApiUsage(user.id, '/api/users', 'GET');

    const { searchParams } = new URL(request.url);
    const limit = parseInt(searchParams.get('limit') || '20');
    const page = parseInt(searchParams.get('page') || '1');
    const offset = (page - 1) * limit;

    const users = await prisma.dummyUser.findMany({
      skip: offset,
      take: limit,
      orderBy: { createdAt: 'asc' },
    });

    const totalUsers = await prisma.dummyUser.count();

    return NextResponse.json({ success: true, data: users, page, limit, total_users: totalUsers});
  } catch (error) {
    console.error(error);
    return NextResponse.json({ error: 'Failed to fetch users' }, { status: 500 });
  }
}

export async function POST(request: Request) {
  try {
    const validation = await validateApiKey(request);
    if ("error" in validation) {
      return NextResponse.json({ error: validation.error }, { status: validation.status });
    }

    const user = validation.user;
    await logApiUsage(user.id, '/api/users', 'POST');

    const body = await request.json();
    const newUser = {
      id: `dummy_${Math.floor(Math.random() * 10000)}`,
      name: body.name || 'John Doe',
      username: body.username || 'johndoe',
      email: body.email || `johndoe${Math.floor(Math.random() * 1000)}@example.com`,
      avatar: body.avatar || 'https://dummyapi.dev/avatars/1.png',
      role: body.role || 'user',
      bio: body.bio || 'This is a dummy bio for testing.',
      website: body.website || 'https://example.com',
      location: body.location || 'Earth',
      twitter: body.twitter || `https://twitter.com/${body.username || 'johndoe'}`,
      github: body.github || `https://github.com/${body.username || 'johndoe'}`,
      createdAt: new Date(),
      updatedAt: new Date(),
    };

    return NextResponse.json({ success: true, message: "Dummy user created successfully", data: newUser }, { status: 201 });
  } catch (error) {
    console.error(error);
    return NextResponse.json({ error: 'Failed to create user' }, { status: 500 });
  }
}
