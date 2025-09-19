import { NextFunction, Request, Response } from 'express';
import contoCorrenteSrv from './contoCorrente.service';

export const findMyContoCorrente = async (
    req: Request,
    res: Response,
    next: NextFunction
) => {
    try {
        const email = req.user?.email;

        if (!email) {
            res.status(400).json({ message: 'Email non trovato' });
            return;
        }

        const myInfo = await contoCorrenteSrv.getContoCorrenteByEmail(email);

        if (!myInfo) {
            res.status(400).json({ message: `Informazioni per l'utente con email: ${email} non trovate` });
            return;
        }

        res.status(200).json(myInfo);
    } catch (err) {
        next(err);
    }
}
