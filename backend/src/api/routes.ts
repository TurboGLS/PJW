import { Router } from "express";
import authRouter from './auth/auth.router';
import userRouter from './user/user.router';
import categoryRouter from './category/category.router';

const router = Router();

router.use(authRouter);
router.use('/user', userRouter);
router.use('/categoryTypes', categoryRouter);

export default router;