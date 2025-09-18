import { Router } from 'express';
import { MovimentoContoController } from './movimentoConto.controller'; 
import { isAuthenticated } from '../../lib/auth/auth.middlware';

const movimentoContoController = new MovimentoContoController();

const router = Router();

router.use(isAuthenticated);
router.post('/', movimentoContoController.createMovimentoConto);
router.get('/', movimentoContoController.getAllMovimentiConto);
router.get('/limited', movimentoContoController.getLimitedMovimentiConto);
router.get('/:id', movimentoContoController.getMovimentoContoById);
router.get('/by-categoria/:categoriaId', movimentoContoController.getMovimentiByCategoria);


export default router;