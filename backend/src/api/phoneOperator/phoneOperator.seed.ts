import mongoose from "mongoose";
import { phoneOperatorModel } from "./phoneOperator.model";

import dotenv from 'dotenv';
dotenv.config();


const categories = [
    { name: 'Illiad' },
    { name: 'Vodafon' },
    { name: 'WindTre' },
    { name: 'Tim' },
    { name: 'FastWeb' },
    { name: 'PosteMobile' },
    { name: 'ho. Mobile' },
];

(async () => {
    try {
        await mongoose.connect(process.env.MONGO_URI!);

        await phoneOperatorModel.deleteMany({});

        await phoneOperatorModel.insertMany(categories);

        console.log("Categorie inserite correttamente!");
        process.exit(0);
    } catch (err) {
        console.error("Errore nel seeding:", err);
        process.exit(1);
    }
})();
