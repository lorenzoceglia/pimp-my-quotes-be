import { Router } from 'express';
import {quotesRouter} from "@/routes/quotes.js";
import {usersRouter} from "@/routes/users.js";

export const router = Router();

router.use('/quotes', quotesRouter);
router.use('/users', usersRouter);
