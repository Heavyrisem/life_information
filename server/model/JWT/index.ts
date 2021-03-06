import jwt, { JsonWebTokenError } from "jsonwebtoken";
import DB from "../DB";

import { ERROR_T } from "../../../shared/Network";
import { UserData_DB } from "../../../shared/Types";

import Config from '../../Config.json';

export default {
    generateAccessToken: (id: string) => {
        return jwt.sign({ id }, Config.JWT.ACCESS_TOKEN_SECRET, {
            expiresIn: Config.JWT.AccessExpireIn
        })
    },
    generateRefreshToken: () => {
        return jwt.sign({ }, Config.JWT.REFRESH_TOKEN_SECRET, {
            expiresIn: Config.JWT.RefreshExpireIn
        })
    },
    authenticateAccessToken: (token: string): boolean => {
        try {
            const Result = jwt.verify(token, Config.JWT.ACCESS_TOKEN_SECRET);
            console.log(Result);
            return Boolean(Result);
        } catch (err) {
            const message = (err as JsonWebTokenError).message;
            if (message === 'jwt expired') {
                return false;
            } else throw ERROR_T.AUTH_FAILD
        }
    },
    authenticateRefreshToken: async (ID: string, token: string): Promise<boolean> => {
        try {
            const db = await DB.GetConnection();

            const User = await db.collection('Users').findOne<UserData_DB>({ ID });

            if (User && User.RefreshToken === token) {
                const Result = jwt.verify(token, Config.JWT.REFRESH_TOKEN_SECRET);
                console.log(Result);
                return Boolean(Result);
            } return false;
        } catch (err) {
            const message = (err as JsonWebTokenError).message;
            if (message === 'jwt expired') {
                return false;
            } else throw ERROR_T.AUTH_FAILD
        }
    }
}