import { Router } from "express";
import { isAuthenticated } from "../../lib/auth/auth.middlware";
import { me, modificaPassword } from "./user.controller";

const router = Router();

router.use(isAuthenticated);
router.get('/me', me);
router.patch('/modifica-password', modificaPassword);

export default router;