// import axios, { AxiosInstance } from "axios";
// import { WeatherForecastAPI_Response, WeatherInformation_Response } from "../../../shared/OpenWeatherAPI";

// interface defaultParams {
//     [index: string]: string | number | undefined
//     lat?: number
//     lon?: number
// }

// export class OpenWeatherAPI {
//     instance: AxiosInstance;

//     constructor(KEY: string, Language: string|undefined = "KR", Units: string|undefined = "metric") {
//         this.instance = axios.create({
//             baseURL: "https://api.openweathermap.org/data/2.5",
//             params: {
//                 appid: KEY,
//                 lang: Language,
//                 units: Units
//             }
//         });
//     }

//     getCurrentForecast(params: defaultParams) {
//         return this.instance.get<WeatherInformation_Response>("/weather", { params });
//     }
    
//     getForecast(params: defaultParams) {
//         return this.instance.get<WeatherForecastAPI_Response>("/forecast", { params });
//     }
    
//     getNow(params: defaultParams) {
//         return this.instance.get("/onecall", { params });
//     }
// }