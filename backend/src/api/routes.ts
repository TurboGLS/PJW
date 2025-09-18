import { Router } from "express";
import authRouter from './auth/auth.router';
import userRouter from './user/user.router';
import categoryRouter from './category/category.router';
import verificationRouter from './verification/verification.router';

const router = Router();

router.use(authRouter);
router.use('/user', userRouter);
router.use('/categoryTypes', categoryRouter);
router.use('/verification', verificationRouter);

export default router;