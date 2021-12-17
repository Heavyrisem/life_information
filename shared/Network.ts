import { CovidData } from "./CovidAPI";
import { Location_coords } from "./OpenWeatherAPI";
import { Location_T, Location_latlon, WeatherData } from "./Weather";


export enum ERROR_T {
    INVAILD_PARAMS = "잘못된 파라미터 입니다.",
    AUTH_EXPIRED = "인증이 만료되었습니다.",
    AUTH_FAILD = "인증에 실패했습니다.",
    USER_NOT_FOUND = "사용자를 찾을 수 없습니다.",
    USER_ALREADY_Exist = "사용자가 이미 존재합니다."
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


// Covid
export interface today_Request {

}
export declare type today_Response = default_Response | {
    status: true
    result: CovidData
}

export interface recent_Request {
    start: Date
}
export declare type recent_Response = default_Response | {
    status: true
    result: CovidData[]
}


// Weather
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


// Auth

export interface login_Request {
    ID: string
    PW: string
}
export declare type login_Response = default_Response | {
    status: true
    result: boolean
}

export interface register_Request {
    ID: string
    PW: string
}
export declare type register_Response = default_Response | {
    status: true
    result: boolean
}

export interface refresh_Request {
    ID: string
}
export declare type refresh_Response = default_Response | {
    status: true
    result: boolean
}