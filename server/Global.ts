// import { OpenWeatherAPI } from "./model/OpenWeatherAPI";

import { OpenWeatherMap } from "owm-onecall-api";
import { CovidAPI } from "./model/CovidAPI";



class Global {
    WeatherAPI?: OpenWeatherMap
    CovidAPI?: CovidAPI
}

export default new Global();