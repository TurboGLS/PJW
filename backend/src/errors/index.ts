import { validationHandler } from './validation';
import { genericHandler } from "./generic";
import { notFoundHandler } from "./not-found.error";

export const errorHandlers = [validationHandler, notFoundHandler, genericHandler];