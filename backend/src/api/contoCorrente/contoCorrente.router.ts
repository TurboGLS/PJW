import { Router } from 'express';
import { contoCorrenteController as ContoCorrenteController } from './contoCorrente.controller'; // Assicurati che il percorso sia corretto
import { isAuthenticated } from '../../lib/auth/auth.middlware';

const router = Router();
const contoCorrenteController = new ContoCorrenteController();

router.use(isAuthenticated);

export default router;