import { model, Schema } from "mongoose";
import { contoCorrente } from "./contoCorrente.entity";

const contoCorrenteSchema = new Schema<contoCorrente>({
    email: { type: String },
    password: { type: String },
    cognomeTitolare: { type: String },
    nomeTitolare: { type: String },
    dataApertura: { type: Date },
    iban: { type: String }
});

contoCorrenteSchema.set('toJSON', {
    virtuals: true,
    transform: (_, ret: any) => {
        delete ret._id;
        delete ret.__v;
        return ret;
    }
});

contoCorrenteSchema.set('toObject', {
    virtuals: true,
    transform: (_, ret: any) => {
        delete ret._id;
        delete ret.__v;
        return ret;
    }
});

export const contoCorrenteModel = model<contoCorrente>('contoCorrente', contoCorrenteSchema);
