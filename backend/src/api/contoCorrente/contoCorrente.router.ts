import { Router } from 'express';
import { isAuthenticated } from '../../lib/auth/auth.middlware';
import { findMyContoCorrente } from './contoCorrente.controller';

const router = Router();

router.use(isAuthenticated);
router.get('/myInfoConto', findMyContoCorrente);

export default router;