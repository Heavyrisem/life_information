import axios, { AxiosError, AxiosRequestHeaders } from 'axios';
import { Location_T } from '../Types/WeatherType';
import { current_Response, default_Response, error_Response, forecast_Request, forecast_Response, login_Response, logout_Response, recent_Request, recent_Response, refresh_Response, register_Request, register_Response, setting_Response, sido_Request, sido_Response, today_Response } from '../../../shared/Network';
import { Location_latlon } from '../../../shared/Weather';
import { UserSetting_DB } from '../../../shared/Types';
import crypto from "crypto";


const SHA256 = (str: string): string => crypto.createHash('sha256').update(str).digest('hex');

const instance = axios.create({
    baseURL: "http://localhost",
    withCredentials: true
});



instance.interceptors.response.use(response => {
    const Response = response.data as default_Response;
    if (!Response.status) {
        throw Response.msg;
    }

    return response;
}, error => {
    const err = error as AxiosError;


    // if (err.response && err.response.status === 401) {

    //     throw (err.response.data as error_Response).msg;

    // }

    if (err.response && err.response.data) {
        throw (err.response.data as error_Response).msg;
    }
    throw error;
});


const API = {
    weather: {
        forecast: (interval: "week" | "hour", params: { Location: Location_T, Position?: Location_latlon }): Promise<forecast_Response> => {
            return new Promise((resolve, reject) => {
                instance.post<forecast_Response>(`/weather/forecast/${interval}`, params).then(res => resolve(res.data)).catch(reject);
            })
        },
        current: (params:  { Location: Location_T, Position?: Location_latlon }): Promise<current_Response> => {
            return new Promise((resolve, reject) => {
                instance.post<current_Response>("/weather/current", params).then(res => resolve(res.data)).catch(reject);
            })
        }
    },
    covid: {
        today: (): Promise<today_Response> => {
            return new Promise((resolve, reject) => {
                instance.post<today_Response>("/covid/today").then(res => resolve(res.data)).catch(reject);
            })
        },
        lastWeek: (): Promise<recent_Response> => {
            return new Promise((resolve, reject) => {
                const params: recent_Request = {
                    start: new Date(Date.now() - 1000 * 60 * 60 * 24 * 7)
                }
                instance.post<recent_Response>("/covid/recent", params).then(res => resolve(res.data)).catch(reject);
            })
        },
        sidoTop5: (): Promise<sido_Response> => {
            return new Promise((resolve, reject) => {
                const params: sido_Request = {
                    start: new Date()
                }
                instance.post<sido_Response>("/covid/sido", params).then(res => resolve(res.data)).catch(reject);
            })
        }
    },
    account: {
        register: (ID: string, PW: string): Promise<register_Response> => {
            return new Promise((resolve, reject) => {
                instance.post<register_Response>("/account/register", { ID, PW: SHA256(PW) }).then(res => resolve(res.data)).catch(reject);
            })
        },
        login: (ID: string, PW: string): Promise<login_Response> => {
            return new Promise((resolve, reject) => {
                instance.post<login_Response>("/account/login", { ID, PW: SHA256(PW) }).then(res => resolve(res.data)).catch(reject);
            })
        },
        refreshToken: (ID: string): Promise<refresh_Response> => {
            return new Promise((resolve, reject) => {
                instance.post("/account/refresh", { ID }).then(res => {
                    resolve(res.data);
                }).catch(reject);
            })
        },
        logout: (): Promise<logout_Response> => {
            return new Promise((resolve, reject) => {
                instance.post("/account/logout").then(res => resolve(res.data)).catch(reject);
            })
        },
        updateSetting: (ID: string, setting: UserSetting_DB): Promise<setting_Response> => {
            return new Promise((resolve, reject) => {
                instance.post("/account/setting", { ID, setting }).then(res => resolve(res.data)).catch(reject);
            })
        },
        test: (ID: string): Promise<any> => {
            return new Promise((resolve, reject) => {
                instance.post("/account/test", {ID}).then(res => resolve(res.data)).catch(reject);
            })
        }
    }
}

export default API;