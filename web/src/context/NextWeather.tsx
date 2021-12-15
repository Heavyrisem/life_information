import React, { useEffect, useState } from "react";
import { WeatherData } from "../../../shared/Weather";


interface NextHourWeatherContext {
    NextHourWeatherData: WeatherData[]
    setNextHourWeather: (Weathers: WeatherData[]) => any
}
export const NextHourWeatherContext = React.createContext<NextHourWeatherContext>({
    NextHourWeatherData: [],
    setNextHourWeather: () => {}
});
export function NextHourWeatherProvider({ children }: React.PropsWithChildren<React.ReactNode>) {
    const [NextHourWeatherData, setWeather] = useState<WeatherData[]>([]);

    function setNextHourWeather(Weathers: WeatherData[]) {
        for (let i = 0; i < Weathers.length; i++) {
            Weathers[i].timestamp = new Date(Weathers[i].timestamp);
        }

        setWeather(Weathers);
    }

    return <NextHourWeatherContext.Provider value={{ NextHourWeatherData, setNextHourWeather }}>{children}</NextHourWeatherContext.Provider>
}


interface NextDayWeatherData {
    max: number
    min: number
    data: WeatherData[]
}
interface NextDayWeatherContext {
    NextDayWeatherData: NextDayWeatherData | undefined
    setNextDayWeather: (Weathers: WeatherData[]) => any
}
export const NextDayWeatherContext = React.createContext<NextDayWeatherContext>({
    NextDayWeatherData: undefined,
    setNextDayWeather: () => {}
});
export function NextDayWeatherProvider({ children }: React.PropsWithChildren<React.ReactNode>) {
    const [NextDayWeatherData, setWeather] = useState<NextDayWeatherData>();

    function setNextDayWeather(Weathers: WeatherData[]) {
        const [max, min] = [Math.max(...Weathers.map(Weather => Weather.temperture.max)), Math.min(...Weathers.map(Weather => Weather.temperture.min))];

        for (let i = 0; i < Weathers.length; i++) {
            Weathers[i].timestamp = new Date(Weathers[i].timestamp);
        }

        setWeather({
            max,
            min,
            data: Weathers
        })
    }

    return <NextDayWeatherContext.Provider value={{ NextDayWeatherData, setNextDayWeather }}>{children}</NextDayWeatherContext.Provider>
}