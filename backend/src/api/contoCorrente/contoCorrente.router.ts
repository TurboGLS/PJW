import { Router } from 'express';
import { contoCorrenteController as ContoCorrenteController } from './contoCorrente.controller'; // Assicurati che il percorso sia corretto

const router = Router();
const contoCorrenteController = new ContoCorrenteController();

router.post('/', contoCorrenteController.createContoCorrente);
router.get('/:id', contoCorrenteController.getContoCorrenteById);

export default router;