import { NextFunction, Request, Response } from "express";
import { TypedRequest } from "../../lib/typed-request.interface";
import { AddUserDTO } from "./user.dto";
import { User } from "../user/user.entity";
import { omit, pick } from "lodash";
import userSrv, { EmailExistsError, MissingCredentialsError } from "../user/user.service"
import passport from "passport";
import tokenSrv from "../../lib/auth/token.service";
import jwt from 'jsonwebtoken';
import { JWT_SECRET } from "../../lib/auth/jwt/jwt-strategy";
import { sendVerificationEmail } from "../verification/verification.service";
import contoSrv from '../contoCorrente/contoCorrente.service';

export const add = async (
    req: TypedRequest<AddUserDTO>,
    res: Response,
    next: NextFunction
) => {
    try {
        const userData = {
            firstName: req.body.firstName,
            lastName: req.body.lastName,
            email: req.body.email
        } as User;

        const credentialsData = {
            username: req.body.email,
            password: req.body.password
        };

        const newUser = await userSrv.add(userData, credentialsData);

        // Invio Email
        const verifyUrl = `${process.env.FRONTEND_URL}/verify-email?token=${newUser.verificationToken}`;
        await sendVerificationEmail(newUser.email, verifyUrl);

        // apertura conto corrente
        const aperturaDate = new Date();

        // Generazione conto corrente automatico
        const randomIban = "IT" + Math.floor(Math.random() * 1_000_000_000_000_0000);

        const newContoData = {
            email: newUser.email,
            password: newUser.password,
            cognomeTitolare: newUser.lastName,
            nomeTitolare: newUser.firstName,
            dataApertura: aperturaDate,
            iban: randomIban
        }

        const newConto = await contoSrv.addContoCorrente(newContoData);

        res.status(201).json({ 
            message: "Registrazione completata. Controlla la tua email per attivare l'account.",
            user: newUser,
            contoCorrente: newConto
        });
    } catch (err) {
        if (err instanceof EmailExistsError || err instanceof MissingCredentialsError) {
            res.status(400).json({ err: err.name, message: err.message });
        }
        next(err);
    }
}

export const login = async (
    req: Request,
    res: Response,
    next: NextFunction
) => {
    passport.authenticate('local', { session: false },
        async (err, user, info) => {
            try {
                if (err) {
                    next(err);
                    return;
                }

                if (!user) {
                    res.status(401).json({
                        error: 'LoginError',
                        message: info.message
                    });
                    return;
                }

                const { token, refreshToken } = await tokenSrv.generateTokenPair(user.id);

                res.status(200).json({
                    user,
                    token,
                    refreshToken
                });
            } catch (err) {
                next(err);
            }
        }
    )(req, res, next);
}

export const refresh = async (
    req: Request,
    res: Response,
    next: NextFunction
) => {
    try {
        const { refreshToken } = req.body;

        let payload: User;

        try {
            payload = jwt.verify(refreshToken, JWT_SECRET) as User;
        } catch (verifyErr) {
            res.status(401).json({ error: 'RefreshTokenError', message: 'InvalidToken' });
            return;
        }

        const match = await tokenSrv.verifyMatch(payload.id!, refreshToken);
        if (!match) {
            tokenSrv.removeToken(payload.id!);
            res.status(401).json({ error: 'RefreshTokenError', message: 'Invalid Token' });
            return;
        }

        const newToken = await tokenSrv.generateTokenPair(payload.id!);

        res.status(200).json(newToken);
    } catch (err) {
        next(err);
    }
}