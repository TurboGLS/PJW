import { Router } from "express";
import authRouter from './auth/auth.router';
import userRouter from './user/user.router';

const router = Router();

router.use(authRouter);
router.use('/user', userRouter);

export default router;