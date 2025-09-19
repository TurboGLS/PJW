import { NextFunction, Request, Response } from "express";
import userSrv from './user.service';

export const me = async (
    req: Request,
    res: Response,
    next: NextFunction
) => {
    res.json(req.user);
}

export const modificaPassword = async (
    req: Request,
    res: Response,
    next: NextFunction
) => {
    try {
        const{ oldPassword, newPassword } = req.body;
        const email = req.user?.email;

        if (!email) {
            res.status(400).json({ message: 'Email non trovata' });
            return;
        }

        if (!oldPassword || !newPassword) {
            res.status(400).json({ message: 'Vecchia e nuova password mancanti' });
            return;
        }

        const updateUser = await userSrv.patchModificaPassword(email, oldPassword, newPassword);

        res.status(200).json({ message: `Password aggiornata con successo`, user: updateUser});
    } catch (err: any) {
        res.status(400).json({ message: err.message });
    }
}