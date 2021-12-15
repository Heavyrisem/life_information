import { Location_coords } from "./OpenWeatherAPI";
import { Location_T, Location_latlon, WeatherData } from "./Weather";


export enum ERROR_T {
    INVAILD_PARAMS = "잘못된 파라미터 입니다."
}

export interface success_Response {
    status: true
    result: any
}
export interface error_Response {
    status: false
    msg: string
}
export declare type default_Response = success_Response | error_Response



export interface weather_common_Request {
    Location: Location_T
    Position?: Location_latlon
}

export interface forecast_Request extends weather_common_Request {

}
export declare type forecast_Response = default_Response | {
    status: true
    result: WeatherData[]
}

export interface current_Request extends weather_common_Request {
    
}
export declare type current_Response = default_Response | {
    status: true
    result: WeatherData
}