import axios from "axios";
import { login_Request, login_Response, refresh_Response, register_Response } from "../../shared/Network";

const instance = axios.create({
    baseURL: "http://localhost",
    withCredentials: true
});

(async() => {

    const User: login_Request = {
        ID: "test1",
        PW: "pw"
    }

    try {
        const LoginResult = await instance.post<login_Response>("/auth/login", User);
        console.log(LoginResult.data, LoginResult.headers);
    } catch (err) { console.log(err) }
})();