import { NextFunction, Request, Response } from "express";
import { verifyEmailToken } from "./verification.service";

export const verifyEmail = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const { token } = req.query;

    if (!token) {
      return res.status(400).json({ message: "Token mancante" });
    }

    const user = await verifyEmailToken(token as string);
    if (!user) {
      res.status(200).json({ message: "Email verificata con successo" });
      return;
    }

    res.status(200).json({ message: "Email verificata con successo" });
  } catch (err) {
    next(err);
  }
};
