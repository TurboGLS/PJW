import { User } from "../../../api/user/user.entity";

export type UserIdentity = {
    id: string;
    provider: string;
    credentials: {
        username: string;
        hashedPassword: string;
    };
    user: User;
    refreshToken?: string[];
}