import { Router } from "express";
import authRouter from './auth/auth.router';
import userRouter from './user/user.router';
import categoryRouter from './category/category.router';
import verificationRouter from './verification/verification.router';
import contoCorrenteRouter from './contoCorrente/contoCorrente.router';
import movimentoContoRouter from './movimentoConto/movimentoConto.router';
import phoneOperatorRouter from './phoneOperator/phoneOperator.router';

const router = Router();

router.use(authRouter);
router.use('/user', userRouter);
router.use('/categoryTypes', categoryRouter);
router.use('/verification', verificationRouter);
router.use('/phoneOperators', phoneOperatorRouter);
router.use('/contoCorrente', contoCorrenteRouter);
router.use('/movimentoConto', movimentoContoRouter);

export default router;