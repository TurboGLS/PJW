import { NextFunction, Response } from "express";
import { TypedRequest } from "../../lib/typed-request.interface";
import { AddUserDTO } from "./user.dto";
import { User } from "../user/user.entity";
import { omit, pick } from "lodash";

export const add = async (
    req: TypedRequest<AddUserDTO>,
    res: Response,
    next: NextFunction
) => {
    try {
        const userData = omit(req.body, 'username', 'password') as User;
        const credentialsUser = pick(req.body, 'username', 'password');

        const 
    }
}