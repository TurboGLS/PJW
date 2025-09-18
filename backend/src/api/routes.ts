import { Router } from "express";
import authRouter from './auth/auth.router';
import userRouter from './user/user.router';
import categoryRouter from './category/category.router';
import verificationRouter from './verification/verification.router';
<<<<<<< HEAD
import contoCorrenteRouter from './contoCorrente/contoCorrente.router';
import movimentoContoRouter from './movimentoConto/movimentoConto.router';
=======
import phoneOperatorRouter from './phoneOperator/phoneOperator.router';
>>>>>>> f87326eb8a56a8a20d089403a6b162c8bf237fa3

const router = Router();

router.use(authRouter);
router.use('/user', userRouter);
router.use('/categoryTypes', categoryRouter);
router.use('/verification', verificationRouter);
<<<<<<< HEAD
router.use('/contoCorrente', contoCorrenteRouter);
router.use('/movimentoConto', movimentoContoRouter);
=======
router.use('/phoneOperators', phoneOperatorRouter);
>>>>>>> f87326eb8a56a8a20d089403a6b162c8bf237fa3

export default router;