import { Router } from 'express';
import { CategoryController } from './category.controller'; // Assicurati che il percorso sia corretto

// Crea un'istanza del controller
const categoryController = new CategoryController();

// Crea un nuovo router di Express
const router = Router();

// Definisci le route per le categorie

// GET /api/categories/types - Restituisce tutti i tipi di categoria
router.get('/types', categoryController.getAllCategoryTypes);

// GET /api/categories/:categoryId - Restituisce una categoria per ID
router.get('/:categoryId', categoryController.getCategoryById);

// Esporta il router per usarlo nel tuo file principale (es. app.ts)
export { router as categoryRoutes }; 