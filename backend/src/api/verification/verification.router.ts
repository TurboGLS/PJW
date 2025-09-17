import { Router } from "express";
import { verifyEmail } from "./verfication.controller";

const router = Router();

router.get('/verify-email', verifyEmail);

export default router;