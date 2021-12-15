// import { LocationID_T, LocationIDArray, Location_coords } from "../../shared/OpenWeatherAPI";
import { Language, OpenWeatherMap, Units } from "owm-onecall-api";
import { Location_coords } from "../../shared/OpenWeatherAPI";
import { LocationArray, Location_T } from "../../shared/Weather";
// import { OpenWeatherAPI } from "../model/OpenWeatherAPI";

const API = new OpenWeatherMap("21d5ef6432edd2d558243d66466ee62d", { lang: Language.Korean, units: Units.Metric });
// const API = new OpenWeatherAPI("21d5ef6432edd2d558243d66466ee62d");

// API.getCurrentForecastByID({id: LocationID_T.GYEONG_GI}).then(v => console.log(v.data))
// console.log(LocationArray.map(K => Location_T[K]));
// console.log(LocationID_T[""])
// (LocationArray).map(K => console.log(LocationID_T[K as any], K))
// const Location = Location_T.GYEONG_GI;

// LocationArray.map(K => {
//     if (Location_T[K] === Location) {
//         console.log(LocationID_T[K as any], K);
//     }
// })
const Location: string = Location_T.GYEONG_GI;


for (let i = 0; i < LocationArray.length; i++) {
    const KEY = LocationArray[i];
    if (Location_T[KEY] === Location) {
        const Coord = Location_coords[KEY];
        
        API.week(Coord.lat, Coord.lon).then(V => console.log(V.daily.shift()));
        
        // API.getNow({...Coord}).then(V => {return console.log(V.data)}).catch(err => console.log("err", err));
        // console.log(Coord);
    }
}