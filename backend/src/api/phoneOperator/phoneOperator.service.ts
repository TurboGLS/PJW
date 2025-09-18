import { phoneOperator } from "./phoneOperator.entity";
import { phoneOperatorModel } from "./phoneOperator.model";

export async function getAllPhoneOperators(): Promise<phoneOperator[] | null> {
    return await phoneOperatorModel.find();
}