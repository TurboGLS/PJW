import { model, Schema } from "mongoose";
import { Category } from "./category.entity";

const categorySchema = new Schema<Category>({
    categoryName: { type: String },
    categoryType: {type: String}
});

categorySchema.set('toJSON', {
    virtuals: true,
    transform: (_, ret: any) => {
        delete ret._id;
        delete ret.__v;
        return ret;
    }
});

categorySchema.set('toObject', {
    virtuals: true,
    transform: (_, ret: any) => {
        delete ret._id;
        delete ret.__v;
        return ret;
    }
});

export const CategoryModel = model<Category>('Category', categorySchema);