import { createClient } from '@supabase/supabase-js';
import { NextFunction, Request, Response } from 'express';
import { configObject } from '../config/index.js';
import { User } from '../types/index.js';

const supabase = createClient(configObject.supabase.url!, configObject.supabase.anonKey!);

export const requireAuth = async (req: Request, res: Response, next: NextFunction) => {
  const authHeader = req.headers.authorization;
  if (!authHeader?.startsWith('Bearer ')) {
    return res.status(401).json({ error: 'Missing authorization header' });
  }

  const token = authHeader.split(' ')[1];
  try {
    const {
      data: { user },
      error,
    } = await supabase.auth.getUser(token);
    if (error || !user) {
      return res.status(401).json({ error: 'Invalid token' });
    }

    // Add user to request
    req.user = {
      id: user.id,
      email: user.email || '',
    } as User;

    next();
  } catch (_error) {
    return res.status(401).json({ error: 'Invalid token' });
  }
};
