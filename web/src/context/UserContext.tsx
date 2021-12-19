import React, { useEffect, useState } from "react";
import { useCookies } from "react-cookie";

import { Location_T } from "../Types/WeatherType";
import { UserData_T, UserLocation } from "../../../shared/Types";


interface UserLocationContext {
    UserLocation?: UserLocation,
    setUserLocation: React.Dispatch<React.SetStateAction<UserLocation|undefined>>
}
export const UserLocationContext = React.createContext<UserLocationContext>({
    UserLocation: undefined,
    setUserLocation: () => {}
});
export function UserLocationProvider({ children }: React.PropsWithChildren<React.ReactNode>) {
    const [UserLocation, setUserLocation] = useState<UserLocation>();

    return <UserLocationContext.Provider value={{ UserLocation, setUserLocation }}>{children}</UserLocationContext.Provider>
}

interface UserDataContext {
    UserData?: UserData_T,
    setUserData: (Data: UserData_T|undefined) => any
}
export const UserDataContext = React.createContext<UserDataContext>({
    UserData: undefined,
    setUserData: () => {}
});
export function UserDataProvider({ children }: React.PropsWithChildren<React.ReactNode>) {
    const [cookies, setCookie] = useCookies<"UserData", {"UserData"?: UserData_T}>(["UserData"]);
    const [UserData, setData] = useState<UserData_T|undefined>(cookies.UserData);
    
    function setUserData(Data?: UserData_T) {
        setData(Data);
        setCookie("UserData", Data);
        console.log(Data);
    }

    return <UserDataContext.Provider value={{ UserData, setUserData }}>{children}</UserDataContext.Provider>
}