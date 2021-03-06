import { Conditions_T } from "./OpenWeatherAPI";

export enum Location_T {
    SEOUL = "서울특별시",
    BUSAN = "부산광역시",
    DAEGU = "대구광역시",
    INCHEON = "인천광역시",
    GWANGJU = "광주광역시",
    DAEJEON = "대전광역시",
    ULSAN = "울산광역시",
    SEJONG = "세종특별자치시",
    GYEONG_GI = "경기도",
    GANG_WON = "강원도",
    CHUNGBUK = "충청북도",
    CHUNGNAM = "충청남도",
    JEONBUK = "전라북도",
    JEONNAM = "전라남도",
    GYEONGBUK = "경상북도",
    GYEONGNAM = "경상남도",
    JEJU = "제주특별자치시",
    USERLOCATION = "사용자의 위치"
}

export interface WeatherData {
    temperture: {
        current: number
        min: number
        max: number
    }
    humidity: number
    rainProbability: number
    condition: {
        main: Conditions_T
        description: string
        icon: string
    }
    location: Location_T
    timestamp: Date
}

export interface Location_latlon { lat: number, lon: number }

export const LocationArray = enumKeys(Location_T);

function enumKeys<E>(e: E): (keyof E)[] {
    return Object.keys(e) as (keyof E)[];
}