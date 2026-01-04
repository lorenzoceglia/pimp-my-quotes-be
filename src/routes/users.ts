import { Request, Response, Router } from 'express';
import { z } from 'zod';
import { validateRequest } from '../middleware/validate.js';
import * as usersService from '../services/users.service.js';
import { requireAuth } from '../utils/auth.js';

const userSchema = z.object({
  userId: z.string(),
});

export const usersRouter = Router();

usersRouter.delete(
  '/',
  requireAuth,
  validateRequest({ body: userSchema }),
  async (req: Request, res: Response) => {
    try {
      const { userId } = req.body;
      const status = await usersService.deleteUser(userId);

      return res.status(status).json({
        success: status === 200,
        message: status === 200 ? 'User deleted successfully' : 'Failed to delete user',
      });
    } catch (error) {
      console.error('Delete user error:', error);
      return res.status(500).json({ error: 'Internal server error while deleting user' });
    }
  },
);
