import { Location_latlon } from "./Weather";


interface CurrentWeather {
    dt: number,
    sunrise: number,
    sunset: number,
    temp: number,
    feels_like: number,
    pressure: number,
    humidity: number,
    dew_point: number,
    uvi: number,
    clouds: number,
    visibility: number,
    wind_speed: number,
    wind_deg: number,
    wind_gust: number,
    weather: Weather[]
}

// interface minutely

interface Weather {
    id: number
    main: Conditions_T
    description: string
    icon: string
}

                     

export interface WeatherForecastAPI_Response {
    cod: number
    message: number
    cnt: number
    list: WeatherForecast[]
    city: {
        id: number
        name: string
        coord: {
        lat: number
        lon: number
        }
        country: string
        timezone: number
        sunrise: number
        sunset: number
    }
}
                       




export interface WeatherForecast {
    dt: number
    main: {
        temp: number
        feels_like: number
        temp_min: number
        temp_max: number
        pressure: number
        sea_level: number
        grnd_level: number
        humidity: number
        temp_kf: number
    }
    weather: Weather[]
    clouds: {
        all: number
    }
    wind: {
        speed: number
        deg: number
        gust: number
    }
    visibility: number
    pop: number
    rain?: {
        "1h"?: number
        "3h"?: number
    }
    sys: {
        pod: string
    }
    dt_txt: string
}


export interface WeatherInformation_Response {
    coord: { lon: number, lat: number }
    weather: Weather[]
    base: string
    main: {
        temp: number
        feels_like: number
        temp_min: number
        temp_max: number
        pressure: number
        humidity: number
        sea_level: number
        grnd_level: number
    }
    visibility: number
    wind: {
        speed: number
        deg: number
        gust: number
    }
    clouds: { all: number }
    dt: number
    sys: {
        type: number
        id: number
        country: string
        sunrise: number
        sunset: number
    }
    rain?: {
        "1h"?: number
        "3h"?: number
    }
    timezone: number
    id: number
    name: string
    cod: number
}


export const Location_coords: {[index: string]: Location_latlon} = {
    SEOUL: { lat: 37.56826, lon: 126.977829 },
    BUSAN: { lat: 35.133331, lon: 129.050003 },
    DAEGU: { lat: 35.799999, lon: 128.550003 },
    INCHEON:{ lat: 37.450001, lon: 126.416107 },
    GWANGJU: { lat: 35.166672, lon: 126.916672 },
    DAEJEON: { lat: 36.333328, lon: 127.416672 },
    ULSAN: { lat: 35.566669, lon: 129.266663 },
    SEJONG: { lat: 36.455559, lon: 127.124718 },
    GYEONG_GI: { lat: 37.599998, lon: 127.25 },
    GANG_WON: { lat: 37.75, lon: 128.25 },
    CHUNGBUK: { lat: 36.75, lon: 128.0 },
    CHUNGNAM: { lat: 36.5, lon: 127.0 },
    JEONNAM: { lat: 34.75, lon: 127.0 },
    JEONBUK: { lat: 35.75, lon: 127.25 },
    GYEONGNAM: { lat: 35.25, lon: 128.25 },
    GYEONGBUK: { lat: 36.333328, lon: 128.75 },
    JEJU: { lat: 33.416672, lon: 126.5 }
}

export enum Conditions_T {
    Thunderstorm = "Thunderstorm",
    Drizzle = "Drizzle",
    Rain = "Rain",
    Snow = "Snow",
    Mist = "Mist",
    Smoke = "Smoke",
    Haze = "Haze",
    Dust = "Dust",
    Fog = "Fog",
    Sand = "Sand",
    Ash = "Ash",
    Squall = "Squall",
    Tornado = "Tornado",
    Clear = "Clear",
    Clouds = "Clouds"
}