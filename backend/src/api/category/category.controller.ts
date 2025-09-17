import { NextFunction, Request, Response } from 'express';
import categorySrv from './category.service';

export const getAllCategory = async (
    req: Request,
    res: Response,
    next: NextFunction
) => {
    try {
        const categoryTypes = await categorySrv.getAllCategoryNames();

        if (!categoryTypes) {
            res.status(400).json({ error: "Nessuna Categoria trovata." });
            return;
        }

        res.status(200).json(categoryTypes);
    } catch (err) {
        next(err);
    }
}