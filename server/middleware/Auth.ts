import { NextFunction, Request, Response } from "express";
import { default_Response, ERROR_T } from "../../shared/Network";
import JWT from "../model/JWT";



export default {
    AuthJWT: (req: Request, res: Response<default_Response>, next: NextFunction) => {
        const { AccessToken } = req.cookies;

        if (AccessToken) {
            if (JWT.authenticateAccessToken(AccessToken)) return next();
            else res.status(401).send({
                status: false,
                msg: ERROR_T.AUTH_EXPIRED
            })
        } else {
            res.status(401).send({
                status: false,
                msg: ERROR_T.AUTH_FAILD
            })
        }
    }
}