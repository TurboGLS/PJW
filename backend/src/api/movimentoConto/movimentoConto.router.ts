import { Router } from 'express';
import { MovimentoContoController } from './movimentoConto.controller'; 
import { isAuthenticated } from '../../lib/auth/auth.middlware';

const movimentoContoController = new MovimentoContoController();

const router = Router();

router.use(isAuthenticated);
router.get('/', movimentoContoController.getAllMovimentiConto);
router.get('/limited', movimentoContoController.getLimitedMovimentiConto);
router.get('/:id', movimentoContoController.getMovimentoContoById);
router.get('/by-categoria/:categoriaId', movimentoContoController.getMovimentiByCategoria);
router.post('/bonifico-uscita', movimentoContoController.postBonificoUscita)


export default router;