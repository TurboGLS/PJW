import { NextFunction, Request, Response } from "express";
import userSrv from './user.service';
import operationLogSrv from "../ipTracking/ipTracking.service";

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
        // per i log
        const ipAddressRaw = req.headers['x-forwarded-for'] || req.socket.remoteAddress;
        const ipAddress = Array.isArray(ipAddressRaw) ? ipAddressRaw[0] : (ipAddressRaw || 'UNKNOWN');

        const { oldPassword, newPassword } = req.body;
        const email = req.user?.email;

        if (!email) {
            res.status(400).json({ message: 'Email non trovata' });
            await operationLogSrv.createLog(
                email!,
                ipAddress,
                'MODIFICA_PASSWORD',
                'SUCCESS',
                'Email non trovata'
            );
            return;
        }

        if (!oldPassword || !newPassword) {
            res.status(400).json({ message: 'Vecchia e nuova password mancanti' });
            await operationLogSrv.createLog(
                email!,
                ipAddress,
                'MODIFICA_PASSWORD',
                'SUCCESS',
                'Vecchia e nuova password mancanti'
            );
            return;
        }

        // Check se le password sono uguali
        if (oldPassword === newPassword) {
            await operationLogSrv.createLog(
                email,
                ipAddress,
                'MODIFICA_PASSWORD',
                'FAILED',
                'Vecchia e nuova password non possono essere uguali'
            );
            return res.status(400).json({ message: 'Vecchia e nuova password non possono essere uguali' });
        }

        // Log di successo
        await operationLogSrv.createLog(
            email,
            ipAddress,
            'MODIFICA_PASSWORD',
            'SUCCESS',
            'Password modificata correttamente'
        );

        const updateUser = await userSrv.patchModificaPassword(email, oldPassword, newPassword);

        res.status(200).json({ message: `Password aggiornata con successo`, user: updateUser });
    } catch (err: any) {
        // Log di errore
        const email = req.user?.email;
        const ipAddressRaw = req.headers['x-forwarded-for'] || req.socket.remoteAddress;
        const ipAddress = Array.isArray(ipAddressRaw) ? ipAddressRaw[0] : (ipAddressRaw || 'UNKNOWN');

        if (email) {
            await operationLogSrv.createLog(
                email,
                ipAddress,
                'MODIFICA_PASSWORD',
                'FAILED',
                err.message
            );
        }
        res.status(400).json({ message: err.message });
    }
}