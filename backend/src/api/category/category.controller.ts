import { Request, Response } from 'express'; // Se usi Express.js
import { categoryService as CategoryService } from './category.service'; // Assicurati che il percorso sia corretto

// Crea un'istanza del tuo CategoryService
const categoryService = new CategoryService();

export class CategoryController {

    /**
     * Gestisce la richiesta per ottenere tutti i tipi di categoria.
     * @param req L'oggetto Request di Express.
     * @param res L'oggetto Response di Express.
     */
    public async getAllCategoryTypes(req: Request, res: Response): Promise<void> {
        try {
            const categoryTypes = await categoryService.getAllCategoryTypes();
            
            // Se tutto va bene, restituisci i tipi di categoria con uno status 200 OK
            res.status(200).json(categoryTypes);
        } catch (error) {
            console.error("Errore nel controller getAllCategoryTypes:", error);
            // In caso di errore, restituisci uno status 500 Internal Server Error
            // e un messaggio di errore.
            res.status(500).json({ 
                message: "Errore durante il recupero dei tipi di categoria.", 
                error: error instanceof Error ? error.message : String(error) 
            });
        }
    }

    // Puoi aggiungere altri metodi del controller qui, ad esempio per getCategoryById
    public async getCategoryById(req: Request, res: Response): Promise<void> {
        try {
            const { categoryId } = req.params; // Assumi che l'ID sia passato come parametro nell'URL
            const category = await categoryService.getCategoryById(categoryId);

            if (category) {
                res.status(200).json(category);
            } else {
                res.status(404).json({ message: "Categoria non trovata." });
            }
        } catch (error) {
            console.error("Errore nel controller getCategoryById:", error);
            res.status(500).json({ 
                message: "Errore durante il recupero della categoria.", 
                error: error instanceof Error ? error.message : String(error) 
            });
        }
    }
}

// Se preferisci esportare direttamente le funzioni invece di una classe:
/*
export const getAllCategoryTypes = async (req: Request, res: Response): Promise<void> => {
    try {
        const categoryTypes = await categoryService.getAllCategoryTypes();
        res.status(200).json(categoryTypes);
    } catch (error) {
        console.error("Errore nel controller getAllCategoryTypes:", error);
        res.status(500).json({ message: "Errore durante il recupero dei tipi di categoria.", error: error.message });
    }
};

export const getCategoryById = async (req: Request, res: Response): Promise<void> => {
    // ... (stessa logica di cui sopra)
};
*/