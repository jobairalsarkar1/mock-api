import { prisma } from "./prisma";

export type ApiValidationResult =
  | { user: TUser }
  | { error: string; status: number };

export async function validateApiKey(request: Request): Promise<ApiValidationResult> {
  const apiKey = request.headers.get('x-api-key');
  if (!apiKey) return { error: 'Missing API key', status: 401 };

  const user = await prisma.user.findUnique({ where: { apiKey } });
  if (!user) return { error: 'Invalid API key', status: 403 };

  return { user };
}

export async function logApiUsage(userId: string, endpoint: string, method: string) {
  await prisma.apiUsage.create({
    data: { userId, endpoint, method },
  });
}
