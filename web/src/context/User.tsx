import React, { useState } from "react";
import { Location_T } from "../Types/WeatherType";


interface UserLocationContext {
    UserLocation?: Location_T,
    setUserLocation: (UserLocation: Location_T) => any
}
export const UserLocationContext = React.createContext<UserLocationContext>({
    UserLocation: undefined,
    setUserLocation: () => {}
});
export function UserLocationProvider({ children }: React.PropsWithChildren<React.ReactNode>) {
    const [UserLocation, setUserLocation] = useState<Location_T>();

    return <UserLocationContext.Provider value={{ UserLocation, setUserLocation }}>{children}</UserLocationContext.Provider>
}