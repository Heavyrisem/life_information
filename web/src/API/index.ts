import axios from 'axios';
import { Location_T } from '../Types/WeatherType';
import { current_Response, default_Response, forecast_Request, forecast_Response } from '../../../shared/Network';
import { Location_latlon } from '../../../shared/Weather';

const instance = axios.create({
    baseURL: "http://localhost"
});

instance.interceptors.response.use(response => {
    const Response = response.data as default_Response;
    if (!Response.status) throw Response.msg;

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
    }
}
