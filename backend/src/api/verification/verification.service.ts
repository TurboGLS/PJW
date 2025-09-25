import { UserModel } from "../user/user.model";
import nodemailer from 'nodemailer';
import { UserIdentityModel } from "../../lib/auth/local/user-identity.model";

export async function verifyEmailToken(token: string) {
    const user = await UserModel.findOne({ verificationToken: token });

    if (!user) {
        return null;
    }

    const now = new Date();

    // Controllo qui la scadenza del token
    if (!user.verificationTokenExpires || user.verificationTokenExpires < now) {
        // Cancella utente da users
        await UserModel.deleteOne({ _id: user._id });

        // Cancella utente da useridentities
        await UserIdentityModel.deleteOne({ userId: user._id });

        return null;
    }

    user.active = true;
    user.verificationToken = undefined;
    user.verificationTokenExpires = undefined;

    await user.save();
    return user;
}

export async function sendVerificationEmail(to: string, url: string) {
    const transporter = nodemailer.createTransport({
        host: 'smtp.gmail.com',
        port: 465,
        secure: true, // SSL
        auth: {
            user: process.env.EMAIL_USER,
            pass: process.env.EMAIL_PASS
        }
    });

    await transporter.sendMail({
        from: `"Intesa Mario Volpato" <${process.env.EMAIL_USER}>`,
        to,
        subject: 'Verifica la tua email',
        html: `
            <p>Grazie per la registrazione! Clicca qui per attivare il tuo account:</p>
            <p><a href="${url}">${url}</a></p>
        `
    });
}