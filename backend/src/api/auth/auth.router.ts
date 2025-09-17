import { Router } from "express";
import { add, login, refresh } from "./auth.controller";
import { AddUserDTO } from "./user.dto";
import { validate } from "../../lib/validation-middleware";

const router = Router();

router.post('/register', validate(AddUserDTO), add);
router.post('/login', login);
router.post('/refresh', refresh);

export default router;