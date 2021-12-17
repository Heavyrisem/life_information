import { Router, Request, Response } from "express";
import { ERROR_T, login_Request, login_Response, refresh_Request, refresh_Response, register_Request, register_Response } from "../../shared/Network";
import { UserData } from "../../shared/Types";
import { Location_T } from "../../shared/Weather";
import DB from "../model/DB";
import JWT from "../model/JWT";

import Auth from "../middleware/Auth";

const router = Router();

router.post("/login", async (req: Request<any,any,login_Request>, res: Response<login_Response>) => {
    const { ID, PW } = req.body;
    // const { ID, PW } = { ID: 'a', PW: 'b' };

    try {
        if (ID && PW) {
            const db = await DB.GetConnection();
            
            const User = await db.collection('Users').findOne<UserData>({ ID, PW });
            // const User = true;
            if (User) {
                
                const AccessToken = JWT.generateAccessToken(ID);
                const RefreshToken = JWT.generateRefreshToken();
                await db.collection('Users').updateOne({ ID }, {$set: { "RefreshToken": RefreshToken }})
                
                res.cookie("AccessToken", AccessToken, { httpOnly: true });
                res.cookie("RefreshToken", RefreshToken, { httpOnly: true });

                res.send({
                    status: true,
                    result: true
                });
            } else throw ERROR_T.USER_NOT_FOUND;
        }
    } catch (err) {
        console.log(err);
        res.send({
            status: false,
            msg: err+""
        })
    }
})

router.post("/register", async (req: Request<any,any,register_Request>, res: Response<register_Response>) => {
    const { ID, PW } = req.body;

    try {
        if (ID && PW) {
            const db = await DB.GetConnection();

            const isAlreadyExist = await db.collection('Users').findOne({ ID });
            if (isAlreadyExist) throw ERROR_T.USER_ALREADY_Exist;
        

            const AccessToken = JWT.generateAccessToken(ID);
            const RefreshToken = JWT.generateRefreshToken();
            const User_Data: UserData = {
                ID,
                RefreshToken,
                PW,
                Setting: {
                    Location: {
                        name: Location_T.USERLOCATION
                    }
                }
            }
            
            res.cookie("AccessToken", AccessToken, { httpOnly: true });
            res.cookie("RefreshToken", RefreshToken, { httpOnly: true });

            await db.collection('Users').insertOne(User_Data);

            return res.send({
                status: true,
                result: true
            })
        }
    } catch (err) {
        console.log(err);
        res.send({
            status: false,
            msg: err+""
        })
    }
})

router.post("/refresh", async (req: Request<any,any,refresh_Request>, res: Response<refresh_Response>) => {
    const { ID } = req.body;
    console.log(req.cookies);
    const { AccessToken, RefreshToken } = req.cookies;

    try {
        if (AccessToken && RefreshToken && ID) {
            let NewAccessToken = AccessToken;
            
            const Access = JWT.authenticateAccessToken(AccessToken);
            
            if (!Access) {
                const Refresh = await JWT.authenticateRefreshToken(ID, RefreshToken);

                if (Refresh) NewAccessToken = JWT.generateAccessToken(ID);
                else throw ERROR_T.AUTH_FAILD;
            }

            console.log("New Token", NewAccessToken);
            res.cookie("AccessToken", NewAccessToken, { httpOnly: true });
            res.send({
                status: true,
                result: true
            })
        } else throw ERROR_T.INVAILD_PARAMS;
    } catch (err) {
        console.log(err);
        res.send({
            status: false,
            msg: err+""
        })
    }
});

router.post("/test", Auth.AuthJWT, (req, res) => {

    res.send({status: true, msg: "AUTHED"});

})

export default router;