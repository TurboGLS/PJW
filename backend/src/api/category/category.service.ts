import { UserIdentityModel } from "../../lib/auth/local/user-identity.model";
import { Category } from "./category.entity";
import { CategoryModel } from "./category.model";
import * as bcrypt from 'bcrypt';


export class categoryService {
    constructor() {
    }


    async getCategoryById(categoryId: string): Promise<Category | null> {
        const category = await CategoryModel.findById(categoryId); 
        return category ? category.toObject() : null;
    }

    async getAllCategoryTypes(): Promise<string[]> {
        try {
            const categories = await CategoryModel.find({}).select('categoryType').lean();
            const categoryTypes = categories.map(category => category.categoryType);
            return categoryTypes;
        } catch (error) {
            console.error("Errore durante il recupero dei tipi di categoria:", error);
            throw error;
        }
    }
}

export default new categoryService();