import axios, { AxiosError, AxiosRequestHeaders } from 'axios';
import { Location_T } from '../Types/WeatherType';
import { current_Response, default_Response, error_Response, forecast_Request, forecast_Response, login_Response, recent_Request, recent_Response, refresh_Response, register_Request, register_Response, today_Response } from '../../../shared/Network';
import { Location_latlon } from '../../../shared/Weather';
import { ERROR_T } from '../Types/GlobalTypes';

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
    // const Config = (error as AxiosError).config;
    // const response = (error as AxiosError).response;

    // console.log(JSON.parse(Config.data).ID);
    // if (error.response && error.response.status === 401 && response) {
        // if ((response.data as error_Response).msg === ERROR_T.AUTH_EXPIRED) {
        //     API.auth.refreshToken(JSON.parse(Config.data).ID).then(res => {
        //         if (res.status) Config.headers = { ...Config.headers, 'Cookie': res.result }
        //         // console.log(Config);
        //         return axios.request({
        //             method: Config.method,
        //             baseURL: Config.baseURL,
        //             data: Config.data,
        //             url: Config.url
        //         });
        //     });
        // }
    // }

    // if ((error as Error).message == "Network Error") {
    //     throw new Error(DefaultError_Enum.SERVER_OFFLINE);
    // }
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
        }
    },
    auth: {
        register: (ID: string, PW: string): Promise<register_Response> => {
            return new Promise((resolve, reject) => {
                instance.post<register_Response>("/auth/register", { ID, PW }).then(res => resolve(res.data)).catch(reject);
            })
        },
        login: (ID: string, PW: string): Promise<login_Response> => {
            return new Promise((resolve, reject) => {
                instance.post<login_Response>("/auth/login", { ID, PW }).then(res => resolve(res.data)).catch(reject);
            })
        },
        refreshToken: (ID: string): Promise<refresh_Response> => {
            return new Promise((resolve, reject) => {
                instance.post("/auth/refresh", { ID }).then(res => {
                    resolve(res.data);
                }).catch(reject);
            })
        },
        test: (ID: string): Promise<any> => {
            return new Promise((resolve, reject) => {
                instance.post("/auth/test", {ID}).then(res => resolve(res.data)).catch(reject);
            })
        }
    }
}

export default API;