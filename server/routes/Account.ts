import { Router, Request, Response } from "express";
import { ERROR_T, login_Request, login_Response, logout_Request, logout_Response, refresh_Request, refresh_Response, register_Request, register_Response, setting_Request, setting_Response } from "../../shared/Network";
import { UserData_DB, UserData_T } from "../../shared/Types";
import { Location_T } from "../../shared/Weather";
import DB from "../model/DB";
import JWT from "../model/JWT";
import Utils from "../model/Utils";

import Auth from "../middleware/Auth";

const router = Router();

router.post("/login", Auth.PWhash, async (req: Request<any,any,login_Request>, res: Response<login_Response>) => {
    const { ID, PW } = req.body;
    // const { ID, PW } = { ID: 'a', PW: 'b' };

    try {
        if (ID && PW) {
            const db = await DB.GetConnection();
            
            const User = await db.collection('Users').findOne<UserData_DB>({ ID, PW });
            // const User = true;
            if (User) {
                
                const AccessToken = JWT.generateAccessToken(ID);
                const RefreshToken = JWT.generateRefreshToken();
                await db.collection('Users').updateOne({ ID }, {$set: { "RefreshToken": RefreshToken }})
                
                res.cookie("AccessToken", AccessToken, { httpOnly: true });
                res.cookie("RefreshToken", RefreshToken, { httpOnly: true });
                const FrontUserData: UserData_T = {
                    ID: User.ID,
                    Setting: User.Setting
                }
                console.log(FrontUserData);
                res.cookie("UserData", JSON.stringify(FrontUserData));

                res.send({
                    status: true,
                    result: FrontUserData
                });
            } else throw ERROR_T.USER_NOT_FOUND;
        }
    } catch (err) {
        console.log(err);
        res.send(Utils.ErrorResponse(err));
    }
})

router.post("/register", Auth.PWhash, async (req: Request<any,any,register_Request>, res: Response<register_Response>) => {
    const { ID, PW } = req.body;

    try {
        if (ID && PW) {
            const db = await DB.GetConnection();

            const isAlreadyExist = await db.collection('Users').findOne({ ID });
            if (isAlreadyExist) throw ERROR_T.USER_ALREADY_EXIST;
        

            const AccessToken = JWT.generateAccessToken(ID);
            const RefreshToken = JWT.generateRefreshToken();
            const User_Data: UserData_DB = {
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
            const FrontUserData: UserData_T = {
                ID: User_Data.ID,
                Setting: User_Data.Setting
            }
            console.log(FrontUserData);
            res.cookie("UserData", JSON.stringify(FrontUserData));

            await db.collection('Users').insertOne(User_Data);

            return res.send({
                status: true,
                result: FrontUserData
            })
        }
    } catch (err) {
        console.log(err);
        res.send(Utils.ErrorResponse(err));
    }
})

router.post("/logout", (req: Request<any,any,logout_Request>, res: Response<logout_Response>) => {

    res.cookie("AccessToken", "", { maxAge: 0 });
    res.cookie("RefreshToken", "", { maxAge: 0 });
    res.cookie("UserData", "", { maxAge: 0 });

    return res.send({
        status: true,
        result: true
    })
})

router.post("/setting", Auth.AuthJWT, async (req: Request<any,any,setting_Request>, res: Response<setting_Response>) => {
    const { ID, setting } = req.body;

    try {
        if (setting) {
            const db = await DB.GetConnection();

            const isUserExist = await db.collection('Users').findOne<UserData_DB>({ ID });
            if (!isUserExist) throw ERROR_T.USER_NOT_FOUND;
            
            await db.collection('Users').updateOne({ ID }, {$set: { "Setting": setting }});

            return res.send({
                status: true,
                result: true
            })
        } throw ERROR_T.INVAILD_PARAMS;
    } catch (err) {
        console.log(err);
        res.send(Utils.ErrorResponse(err));
    }

})

router.post("/test", Auth.AuthJWT, (req, res) => {

    res.send({status: true, msg: "AUTHED"});

})

export default router;