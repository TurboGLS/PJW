import { model, Schema } from "mongoose";
import { movimentoConto } from "./movimentoConto.entity";

const movimentoContoSchema = new Schema<movimentoConto>({
    contoCorrenteID: { type: String },
    data: { type: Date },
    importo: { type: Number },
    saldo: { type: Number },
    categoriaMovimentoID: { type: String },
    descrizioneEstesa: { type: String}
});

movimentoContoSchema.set('toJSON', {
    virtuals: true,
    transform: (_, ret: any) => {
        delete ret._id;
        delete ret.__v;
        return ret;
    }
});

movimentoContoSchema.set('toObject', {
    virtuals: true,
    transform: (_, ret: any) => {
        delete ret._id;
        delete ret.__v;
        return ret;
    }
});

export const movimentoContoModel = model<movimentoConto>('movimentoConto', movimentoContoSchema);

