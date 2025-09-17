export type User = {
    id?: string;
    firstName: string;
    lastName: string;
    email: string;
    password: string;
    active: boolean;
    verificationToken?: string;
    verificationTokenExpires?: Date;
}