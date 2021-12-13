import React, { useEffect, useState } from "react";
import { WeatherData } from "../../../shared/Weather";


interface NextHourWeatherContext {
    NextHourWeather: WeatherData[]
    setNextHourWeather: React.Dispatch<React.SetStateAction<WeatherData[]>>
}
export const NextHourWeatherContext = React.createContext<NextHourWeatherContext>({
    NextHourWeather: [],
    setNextHourWeather: () => {}
});
export function NextHourWeatherProvider({ children }: React.PropsWithChildren<React.ReactNode>) {
    const [NextHourWeather, setNextHourWeather] = useState<WeatherData[]>([]);
    return <NextHourWeatherContext.Provider value={{ NextHourWeather, setNextHourWeather }}>{children}</NextHourWeatherContext.Provider>
}


interface NextDayWeatherContext {
    NextDayWeather: WeatherData[]
    setNextDayWeather: React.Dispatch<React.SetStateAction<WeatherData[]>>
}
export const NextDayWeatherContext = React.createContext<NextDayWeatherContext>({
    NextDayWeather: [],
    setNextDayWeather: () => {}
});
export function NextDayWeatherProvider({ children }: React.PropsWithChildren<React.ReactNode>) {
    const [NextDayWeather, setNextDayWeather] = useState<WeatherData[]>([]);
    useEffect(() => console.log(NextDayWeather), [NextDayWeather]);
    return <NextDayWeatherContext.Provider value={{ NextDayWeather, setNextDayWeather }}>{children}</NextDayWeatherContext.Provider>
}