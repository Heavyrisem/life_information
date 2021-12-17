import axios from 'axios';
import { Location_T } from '../Types/WeatherType';
import { current_Response, default_Response, forecast_Request, forecast_Response, recent_Request, recent_Response, today_Response } from '../../../shared/Network';
import { Location_latlon } from '../../../shared/Weather';
import { ERROR_T } from '../Types/GlobalTypes';

const instance = axios.create({
    baseURL: "http://localhost",
    withCredentials: true
});



instance.interceptors.response.use(response => {
    const Response = response.data as default_Response;
    if (!Response.status) {

        if (Response.msg === ERROR_T.AUTH_EXPIRED) {

        }

        throw Response.msg;
    }

    return response;
}, error => {
    // if (error.response && error.response.status === 401) {
    //     throw new Error(DefaultError_Enum.NOT_AUTHED);
    // }

    // if ((error as Error).message == "Network Error") {
    //     throw new Error(DefaultError_Enum.SERVER_OFFLINE);
    // }
    throw error;
});


export default {
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
    // auth: {
    //     refreshToken: ()
    // }
}
