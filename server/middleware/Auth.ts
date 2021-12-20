import { NextFunction, Request, Response } from "express";
import { default_Response, ERROR_T } from "../../shared/Network";
import JWT from "../model/JWT";
import Utils from "../model/Utils";



export default {
    AuthJWT: async (req: Request, res: Response<default_Response>, next: NextFunction) => {
        const { ID } = req.body;
        const { AccessToken, RefreshToken } = req.cookies;

        try {
            if (AccessToken) {
                if (JWT.authenticateAccessToken(AccessToken)) return next();
                else {
                    if (!RefreshToken) throw ERROR_T.AUTH_FAILD;
                    const RefreshisVaild = await JWT.authenticateRefreshToken(ID, RefreshToken);
                    
                    if (RefreshisVaild) {
                        console.log("NEW token generated");
                        res.cookie("AccessToken", JWT.generateAccessToken(ID));
                        return next();
                    } else throw ERROR_T.AUTH_EXPIRED;
                }
            } else throw ERROR_T.AUTH_FAILD;
        } catch (err) {
            console.log(err);
            res.status(401).send(Utils.ErrorResponse(err));
        }
    },
    PWhash: (req: Request<any,any,{PW?: string}>, res: Response, next: NextFunction) => {
        const { PW } = req.body;

        if (PW) req.body = { ...req.body, PW: Utils.SHA256(PW) }
        
        next();
    }
}