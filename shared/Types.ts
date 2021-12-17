import { Location_latlon, Location_T } from "./Weather";

export interface UserLocation {
    LocationName: Location_T
    Coords?: Location_latlon
}


// DB
export interface UserData {
    ID: string
    PW: string
    Setting: {
        Location: {
            name: Location_T
            // coord: Location_latlon
        }
    }
    RefreshToken?: string
}