import { prisma } from "@/lib/prisma";
import { generateApiKey } from "./generateAPIKey";

export async function generateUniqueApiKey(): Promise<string> {
  let unique = false;
  let apiKey: string;

  while (!unique) {
    apiKey = generateApiKey();

    const existing = await prisma.user.findUnique({
      where: { apiKey },
    });

    if (!existing) {
      unique = true;
    }
  }

  return apiKey!;
}
