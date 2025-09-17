import { Router } from "express";
import { isAuthenticated } from "../../lib/auth/auth.middlware";
import { me } from "./user.controller";

const router = Router();

router.use(isAuthenticated);
router.get('/me', me);

export default router;