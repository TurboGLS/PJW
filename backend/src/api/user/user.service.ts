import { UserIdentityModel } from "../../lib/auth/local/user-identity.model";
import { User } from "./user.entity";
import { UserModel } from "./user.model";
import * as bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';
const JWT_EMAIL_SECRET = process.env.JWT_EMAIL_SECRET || 'my_email_verification_secret';
import { isStrongPassword } from 'class-validator';

export class EmailExistsError extends Error {
    constructor() {
        super();
        this.name = 'EmailExists';
        this.message = 'email already in use';
    }
}

export class MissingCredentialsError extends Error {
    constructor() {
        super();
        this.name = 'MissingCredentialsError';
        this.message = 'Username e Password sono obbliatori';
    }
}

export class UserService {
    async add(user: User, credentials: { username: string, password: string }): Promise<User> {
        if (!credentials.username || !credentials.password) {
            throw new MissingCredentialsError();
        }

        const existingEmail = await UserModel.findOne({ email: user.email });
        if (existingEmail) {
            throw new EmailExistsError();
        }

        const newUser = await UserModel.create(user);

        // Genero il token di verifica email
        const verificationToken = jwt.sign({ userId: newUser.id, email: newUser.email }, JWT_EMAIL_SECRET, { expiresIn: '1d' });

        // salva la scadenza: 24 ore da ora
        newUser.verificationTokenExpires = new Date(Date.now() + 24 * 60 * 60 * 1000);

        // Salvo il token nella proprietà dell'utente (aggiungi 'verificationToken' nel modello User se non c'è)
        newUser.verificationToken = verificationToken;
        await newUser.save();

        const hashedPassword = await bcrypt.hash(credentials.password, 10);

        await UserIdentityModel.create({
            provider: 'local',
            user: newUser.id,
            credentials: {
                username: credentials.username,
                hashedPassword
            }
        });

        return newUser;
    }

    async getById(userId: string): Promise<User | null> {
        const user = await UserModel.findById(userId);
        return user ? user.toObject() : null;
    }

    async patchModificaPassword(email: string, oldPassword: string, newPassword: string): Promise<User> {
        // Trovo l'utente
        const user = await UserModel.findOne({ email: email });

        if (!user) {
            throw new Error(`Nessun user trovato correlato alla email: ${email}`);
        }

        // Trovo le crendeziali correlate
        const identity = await UserIdentityModel.findOne({ user: user.id, provider: 'local' });

        if (!identity) {
            throw new Error(`Credenziali non trovate per l'utente con email: ${email}`)
        }

        const hashedPassword = identity.credentials.hashedPassword;

        // Controllo la vecchia password
        const isMatch = await bcrypt.compare(oldPassword, hashedPassword);
        if (!isMatch) {
            throw new Error('La vecchia password non corrisponde a quella impostata');
        }

        // Verifico che la nuova password sia "forte"
        if (!isStrongPassword(newPassword, {
            minLength: 8,
            minLowercase: 1,
            minUppercase: 1,
            minNumbers: 1,
            minSymbols: 1
        })) {
            throw new Error('La nuova password non è abbastanza sicura. Deve avere almeno 8 caratteri, includere maiuscole, minuscole, numeri e simboli.');
        }

        // Genero l’hash della nuova password
        const newHashedPassword = await bcrypt.hash(newPassword, 10);

        // Aggiorno le credenziali
        identity.credentials.hashedPassword = newHashedPassword;
        await identity.save();

        return user;
    }
}

export default new UserService();