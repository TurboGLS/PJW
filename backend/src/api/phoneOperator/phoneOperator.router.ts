import { Router } from "express";
import { getAllOperators } from "./phoneOperator.controller";

const router = Router();

router.get('/allOperators', getAllOperators);

export default router;