export enum Location_T {
    SEOUL = "서울",
    BUSAN = "부산",
    DAEGU = "대구",
    INCHEON = "인천",
    GWANGJU = "광주",
    DAEJON = "대전",
    ULSAN = "울산",
    SEJONG = "세종",
    GYEONG_GI = "경기",
    GANG_WON = "강원",
    CHUNGBUG = "충북",
    CHUNGNAM = "충남",
    JEONBUG = "전북",
    JEONNAM = "전남",
    GYEONGBUG = "경북",
    GYEONGNAM = "경남",
    JEJU = "제주",
    // USERLOCATION = "사용자의 위치"
}

export enum WeatherCondition_T {
    CLOUDY = "흐림",
    RAIN = "비",
    SNOW = "눈",
    SUNNY = "화창함"
}

export const LocationArray = enumKeys(Location_T);

function enumKeys<E>(e: E): (keyof E)[] {
    return Object.keys(e) as (keyof E)[];
}