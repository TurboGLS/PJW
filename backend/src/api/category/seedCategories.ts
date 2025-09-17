import mongoose from "mongoose";
import { CategoryModel } from "./category.model";

import dotenv from 'dotenv';
dotenv.config();


const categories = [
    { categoryName: "Apertura Conto", categoryType: "Uscita" },
    { categoryName: "Bonifico", categoryType: "Entrata" },
    { categoryName: "Bonifico", categoryType: "Uscita" },
    { categoryName: "Prelievo Contanti", categoryType: "Uscita" },
    { categoryName: "Pagamento Utenze", categoryType: "Uscita" },
    { categoryName: "Ricarica", categoryType: "Uscita" },
    { categoryName: "Versamento Bancomat", categoryType: "Entrata" },
];

(async () => {
    try {
        await mongoose.connect(process.env.MONGO_URI!);

        await CategoryModel.deleteMany({});

        await CategoryModel.insertMany(categories);

        console.log("Categorie inserite correttamente!");
        process.exit(0);
    } catch (err) {
        console.error("Errore nel seeding:", err);
        process.exit(1);
    }
})();
