import { Router } from 'express';
import { MovimentoContoController } from './movimentoConto.controller'; 

const movimentoContoController = new MovimentoContoController();


const router = Router();

router.post('/', movimentoContoController.createMovimentoConto);
router.get('/', movimentoContoController.getAllMovimentiConto);
router.get('/limited', movimentoContoController.getLimitedMovimentiConto);
router.get('/:id', movimentoContoController.getMovimentoContoById);
router.get('/by-categoria/:categoriaId', movimentoContoController.getMovimentiByCategoria);


export { router as movimentoContoRoutes };