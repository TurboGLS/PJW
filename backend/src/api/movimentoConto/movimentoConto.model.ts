import { model, Schema } from "mongoose";
import { movimentoConto } from "./movimentoConto.entity";


const movimentoContoSchema = new Schema<movimentoConto>({
    contoCorrenteID: { type: Schema.Types.ObjectId, ref: 'contoCorrenteModel', required: true  },
    data: { type: Date },
    importo: { type: Number },
    saldo: { type: Number },
    categoriaMovimentoID: { type: Schema.Types.ObjectId, ref: 'CategoryModel', required: true  },
    descrizioneEstesa: { type: String }
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

export const movimentoContoModel = model<movimentoConto>('contoCorrente', movimentoContoSchema);

