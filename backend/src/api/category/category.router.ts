import { Router } from 'express';
import { getAllCategory } from './category.controller';

const router = Router();

router.get('/allCategory', getAllCategory);

export default router;