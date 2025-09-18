import { NextFunction, Request, Response } from "express";
import { getAllPhoneOperators } from "./phoneOperator.service";

export const getAllOperators = async (
    req: Request,
    res: Response,
    next: NextFunction
) => {
    try {
        const allOperators = await getAllPhoneOperators();

        if (!allOperators) {
            res.status(404).json({ message: "Nessun operatore telefonico trovato" });
            return;
        }

        res.status(200).json(allOperators);
    } catch (err) {
        next(err);
    }
}