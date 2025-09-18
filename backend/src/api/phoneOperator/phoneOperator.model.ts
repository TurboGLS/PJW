import { model, Schema } from "mongoose";
import { phoneOperator } from "./phoneOperator.entity";

const phoneOperatorSchema = new Schema<phoneOperator>({
    name: { type: String }
});

phoneOperatorSchema.set('toJSON', {
    virtuals: true,
    transform: (_, ret: any) => {
        delete ret._id;
        delete ret.__v;
        return ret;
    }
});

phoneOperatorSchema.set('toObject', {
    virtuals: true,
    transform: (_, ret: any) => {
        delete ret._id;
        delete ret.__v;
        return ret;
    }
});

export const phoneOperatorModel = model<phoneOperator>('PhoneOperator', phoneOperatorSchema);