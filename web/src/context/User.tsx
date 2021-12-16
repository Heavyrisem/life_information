import React, { useState } from "react";
import { Location_T } from "../Types/WeatherType";
import { UserLocation } from "../../../shared/Types";


const initUserLocation: UserLocation = { LocationName: Location_T.USERLOCATION }
interface UserLocationContext {
    UserLocation: UserLocation,
    setUserLocation: React.Dispatch<React.SetStateAction<UserLocation>>
}
export const UserLocationContext = React.createContext<UserLocationContext>({
    UserLocation: initUserLocation,
    setUserLocation: () => {}
});
export function UserLocationProvider({ children }: React.PropsWithChildren<React.ReactNode>) {
    const [UserLocation, setUserLocation] = useState<UserLocation>(initUserLocation);

    return <UserLocationContext.Provider value={{ UserLocation, setUserLocation }}>{children}</UserLocationContext.Provider>
}