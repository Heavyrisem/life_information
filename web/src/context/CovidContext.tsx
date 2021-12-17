import React, { useState } from "react";
import { CovidData } from "../../../shared/CovidAPI";


interface TodayCovidContext {
    TodayCovidData?: CovidData
    setTodayCovidData: (data: CovidData) => any
}
export const TodayCovidContext = React.createContext<TodayCovidContext>({
    TodayCovidData: undefined,
    setTodayCovidData: () => {}
});
export function TodayCovidProvider({ children }: React.PropsWithChildren<React.ReactNode>) {
    const [TodayCovidData, setCovidData] = useState<CovidData>();

    function setTodayCovidData(data: CovidData) {
        data.createDt = new Date(data.createDt);
        if (data.updateDt) data.updateDt = new Date(data.updateDt);
        
        setCovidData(data);
    }

    return <TodayCovidContext.Provider value={{ TodayCovidData, setTodayCovidData }}>{children}</TodayCovidContext.Provider>
}

interface LastWeekCovidContext {
    LastWeekCovidData: CovidData[]
    setLastWeekCovidData: (data: CovidData[]) => any
}
export const LastWeekCovidContext = React.createContext<LastWeekCovidContext>({
    LastWeekCovidData: [],
    setLastWeekCovidData: () => {}
});
export function LastWeekCovidProvider({ children }: React.PropsWithChildren<React.ReactNode>) {
    const [LastWeekCovidData, setCovidData] = useState<CovidData[]>([]);

    function setLastWeekCovidData(data: CovidData[]) {

        for (let i = 0; i < data.length; i++) {
            const Data = data[i];
            Data.createDt = new Date(Data.createDt);
            if (Data.updateDt) Data.updateDt = new Date(Data.updateDt);
            data[i] = Data;
        }

        data.sort((a, b) => (a.createDt as Date).getTime() - (b.createDt as Date).getTime());

        setCovidData(data);
    }

    return <LastWeekCovidContext.Provider value={{ LastWeekCovidData, setLastWeekCovidData }}>{children}</LastWeekCovidContext.Provider>
}