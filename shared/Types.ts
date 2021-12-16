import { Location_latlon, Location_T } from "./Weather";

export interface UserLocation {
    LocationName: Location_T
    Coords?: Location_latlon
}