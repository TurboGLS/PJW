import mongoose, { Schema } from "mongoose";
import { OperationLog } from "./ipTracking.entity";

const OperationLogSchema = new Schema<OperationLog>({
    userEmail: { type: String, required: true },
    ipAddress: { type: String, required: true },
    operation: { type: String, enum: ['MODIFICA_PASSWORD', 'BONIFICO', 'RICARICA'], required: true },
    status: { type: String, enum: ['SUCCESS', 'FAILED'], required: true },
    description: { type: String },
    createdAt: { type: Date, default: Date.now }
});

OperationLogSchema.set('toJSON', {
    virtuals: true,
    transform: (_, ret: any) => {
        delete ret._id;
        delete ret.__v;
        return ret;
    }
});

OperationLogSchema.set('toObject', {
    virtuals: true,
    transform: (_, ret: any) => {
        delete ret._id;
        delete ret.__v;
        return ret;
    }
});

export const OperationLogModel = mongoose.model<OperationLog>('OperationLog', OperationLogSchema);