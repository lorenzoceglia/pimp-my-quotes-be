import { validateRequest } from '@/middleware/validate.js';
import { createQuote, getQuotes } from '@/services/quotes.service.js';
import { requireAuth } from '@/utils/auth.js';
import axios from 'axios';
import { Request, Response, Router } from 'express';
import { z } from 'zod';

const dailyQuoteSchema = z.object({
  quote: z.string(),
  author: z.string(),
});

export const quotesRouter = Router();

quotesRouter.get('/', requireAuth, async (req: Request, res: Response) => {
  try {
    const userQuotes = await getQuotes(req.user!.id);
    return res.status(200).json(userQuotes);
  } catch (_error) {
    return res.status(500).json({ error: 'Failed to get user quotes' });
  }
});

quotesRouter.post(
  '/',
  requireAuth,
  validateRequest({ body: dailyQuoteSchema }),
  async (req: Request, res: Response) => {
    try {
      const { quote, author } = req.body;

      if (!quote || typeof quote !== 'string' || quote.trim() === '') {
        return res.status(400).json({ error: 'Quote text is required' });
      }

      const newQuote = await createQuote(req.user!.id, quote.trim(), author ?? null);

      return res.status(201).json(newQuote);
    } catch (_error) {
      console.error(_error);
      return res.status(500).json({ error: 'Failed to create quote' });
    }
  },
);

quotesRouter.get('/daily', requireAuth, async (_req: Request, res: Response) => {
  try {
    const { data } = await axios.get('https://type.fit/api/quotes');
    return res.status(200).json(data[Math.floor(Math.random() * 5)]);
  } catch (_error) {
    return res.status(500).json({ error: 'Failed to get daily quote' });
  }
});
