import { CategoryModel } from "./category.model";

export class CategoryService {
    async getAllCategoryNames(): Promise<string[]> {
        try {
            const categories = await CategoryModel.find({}).select('categoryName -_id').lean();

            const categoryNames = categories.map(category => category.categoryName);
            return categoryNames;
        } catch (error) {
            console.error("Errore durante il recupero dei nomi di categoria:", error);
            throw error;
        }
    }
}

export default new CategoryService();