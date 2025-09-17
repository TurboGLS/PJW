import { Schema, model } from 'mongoose';
import { UserIdentity } from "./user-identity.entity";

const userIdentitySchema = new Schema<UserIdentity>({
    user: { type: Schema.Types.ObjectId, ref: 'User' },
    provider: { type: String, default: 'local' },
    credentials: {
        type: {
            username: String,
            hashedPassword: String
        },
        _id: false
    },
    refreshToken: [String]
});

userIdentitySchema.pre('findOne', function (next) {
    this.populate('user');
    next();
});

export const UserIdentityModel = model<UserIdentity>('UserIdentity', userIdentitySchema);