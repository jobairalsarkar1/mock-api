import { logApiUsage, validateApiKey } from '@/lib/apiKey';
import { prisma } from '@/lib/prisma';
import { NextResponse } from 'next/server';

export async function GET(request: Request, { params }: { params: { id: string } }) {
  try {
    const validation = await validateApiKey(request);
    if ("error" in validation) {
      return NextResponse.json({ success: false, error: validation.error }, { status: validation.status });
    }

    const user = validation.user;
    await logApiUsage(user.id, `/api/users/${params.id}`, 'GET');

    const userData = await prisma.dummyUser.findUnique({ where: { id: params.id } });
    if (!userData) {
      return NextResponse.json({ success: false, error: 'User not found' }, { status: 404 });
    }

    return NextResponse.json({ success: true, data: userData });
  } catch (error) {
    console.error(error);
    return NextResponse.json({ success: false, error: 'Failed to fetch user' }, { status: 500 });
  }
}

export async function PATCH(request: Request, { params }: { params: { id: string } }) {
  try {
    const validation = await validateApiKey(request);
    if ("error" in validation) {
      return NextResponse.json({ success: false, error: validation.error }, { status: validation.status });
    }

    const user = validation.user;
    await logApiUsage(user.id, `/api/users/${params.id}`, 'PATCH');

    const body = await request.json();
    const patchedUser = { id: params.id, ...body, updatedAt: new Date() };

    return NextResponse.json({ success: true, message: 'User updated successfully', data: patchedUser });
  } catch (error) {
    console.error(error);
    return NextResponse.json({ success: false, error: 'Failed to update user' }, { status: 500 });
  }
}

export async function DELETE(request: Request, { params }: { params: { id: string } }) {
  try {
    const validation = await validateApiKey(request);
    if ("error" in validation) {
      return NextResponse.json({ success: false, error: validation.error }, { status: validation.status });
    }

    const user = validation.user;
    await logApiUsage(user.id, `/api/users/${params.id}`, 'DELETE');

    return NextResponse.json({ success: true, message: `User ${params.id} deleted successfully` });
  } catch (error) {
    console.error(error);
    return NextResponse.json({ success: false, error: 'Failed to delete user' }, { status: 500 });
  }
}
