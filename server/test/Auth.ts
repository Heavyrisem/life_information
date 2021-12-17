import axios from "axios";
import { default_Response, login_Request, login_Response, refresh_Response, register_Response } from "../../shared/Network";

const instance = axios.create({
    baseURL: "http://localhost",
    withCredentials: true
});

(async() => {

    const User: login_Request = {
        ID: "test1",
        PW: "pw"
    }

    // try {
    //     const RegisterResult = await instance.post<register_Response>("/auth/register", User);
    //     console.log(RegisterResult.data, RegisterResult.headers);
    // } catch (err) { console.log(err) }

    // try {
    //     const LoginResult = await instance.post<login_Response>("/auth/login", User);
    //     console.log(LoginResult.headers);
    // } catch (err) { console.log(err) }

    // try {
    //     const RefreshResult = await instance.post<refresh_Response>("/auth/refresh", User, {
    //         headers: {
    //             Cookie: "AccessToken=eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6InRlc3QxIiwiaWF0IjoxNjM5NzIxNTE1LCJleHAiOjE2Mzk3MjE1NDV9.N6RjLDffXYbbIdX9AotqLSHRsDGdcDrdVvyCe4SfRcY;RefreshToken=eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpYXQiOjE2Mzk3MjE1MTUsImV4cCI6MTYzOTcyMTY5NX0.V1bUCESuZcdYSQYDe8VZE3J_0gRNWZf_laD7-ATaXzo;"
    //         }
    //     });
    //     console.log(RefreshResult.data, RefreshResult.headers);
    // } catch (err) { console.log(err) }
    
    const AccessToken = "AccessToken=eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6InRlc3QxIiwiaWF0IjoxNjM5NzIxOTU3LCJleHAiOjE2Mzk3MjE5ODd9.v-qDMpUt2_ldb9upDBzvldpYsKBqfokzLxxhkudYiNI;";
    const RefreshToken = "RefreshToken=eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpYXQiOjE2Mzk3MjE3NzksImV4cCI6MTYzOTcyMTk1OX0.IbN8NyPiR_RusTdai4GVWoVAEM4zDxGWVf9ETkydd-I;";

    const Cookie = AccessToken + RefreshToken;

    try {
        const TestResult = await instance.post<default_Response>("/auth/test", User, {
            headers: {
                Cookie
            }
        });
        console.log(TestResult.data);
        if (!TestResult.data.status) {
            const RefreshResult = await instance.post<refresh_Response>("/auth/refresh", User, {
                headers: {
                    Cookie
                }
            });
            console.log(RefreshResult.data, RefreshResult.headers);
        }
    } catch (err) { console.log(err) }

})();