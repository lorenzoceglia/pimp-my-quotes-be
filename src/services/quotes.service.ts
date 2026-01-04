import { PrismaClient } from '@prisma/client';
import {Quote} from "@/types/index.js";

const prisma = new PrismaClient();

export async function getQuotes(userId: string): Promise<Quote[]> {
  return await prisma.quotes.findMany({
    where: { userId },
    orderBy: { createdAt: 'desc' },
  });
}

export async function createQuote(
    userId: string,
    quote: string,
    author: string | null = null
): Promise<Quote> {
  return await prisma.quotes.create({
    data: {
      userId,
      quote,
      author,
    },
  });
}
