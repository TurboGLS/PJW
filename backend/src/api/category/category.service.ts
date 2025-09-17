import { Category } from "./category.entity";
import { CategoryModel } from "./category.model";

export class CategoryService {
    async getAllCategoryNames(): Promise<Category[]> {
        try {
            const categories = await CategoryModel.find({}).lean()
            return categories;
        } catch (error) {
            console.error("Errore durante il recupero dei nomi di categoria:", error);
            throw error;
        }
    }
}

export default new CategoryService();