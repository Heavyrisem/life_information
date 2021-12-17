import jwt, { JsonWebTokenError } from "jsonwebtoken";
import DB from "../DB";

import { ERROR_T } from "../../../shared/Network";
import { UserData } from "../../../shared/Types";

import Config from "./Config.json";


export default {
    generateAccessToken: (id: string) => {
        return jwt.sign({ id }, Config.ACCESS_TOKEN_SECRET, {
            expiresIn: "20s"
        })
    },
    generateRefreshToken: () => {
        return jwt.sign({ }, Config.REFRESH_TOKEN_SECRET, {
            expiresIn: "1m"
        })
    },
    authenticateAccessToken: (token: string): boolean => {
        try {
            const Result = jwt.verify(token, Config.ACCESS_TOKEN_SECRET);
            console.log(Result);
            return Boolean(Result);
        } catch (err) {
            const message = (err as JsonWebTokenError).message;
            if (message === 'jwt expired') {
                // throw ERROR_T.AUTH_EXPIRED;
                return false;
            } else throw ERROR_T.AUTH_FAILD
        }
    },
    authenticateRefreshToken: async (ID: string, token: string): Promise<boolean> => {
        try {
            const db = await DB.GetConnection();

            const User = await db.collection('Users').findOne<UserData>({ ID });

            if (User && User.RefreshToken === token) {
                const Result = jwt.verify(token, Config.REFRESH_TOKEN_SECRET);
                console.log(Result);
                return Boolean(Result);
            } return false;
        } catch (err) {
            const message = (err as JsonWebTokenError).message;
            if (message === 'jwt expired') {
                // throw ERROR_T.AUTH_EXPIRED;
                return false;
            } else throw ERROR_T.AUTH_FAILD
        }
    }
}