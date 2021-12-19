import { Location_latlon, Location_T } from "./Weather";

export interface UserLocation {
    LocationName: Location_T
    Coords?: Location_latlon
}


// DB
export interface UserSetting_DB {
    Location: {
        name: Location_T
        // coord: Location_latlon
    }
}
export interface UserData_DB {
    ID: string
    PW: string
    RefreshToken?: string
    Setting: UserSetting_DB
}


export interface UserData_T extends Omit<UserData_DB, "PW" | "RefreshToken"> {
}