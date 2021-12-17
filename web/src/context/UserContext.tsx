import React, { useState } from "react";
import { Location_T } from "../Types/WeatherType";
import { UserLocation } from "../../../shared/Types";


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

interface UserLoginContext {
    // UserLoginData:s
}