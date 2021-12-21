import express from 'express';
import Global from './Global';
import Weather from "./routes/Weather";
import Covid from "./routes/Covid";
import Account from "./routes/Account";
import "./model/DB";

import cors from 'cors';
import cookieParser from 'cookie-parser';
import { Language, OpenWeatherMap, Units } from 'owm-onecall-api';
import { CovidAPI } from './model/CovidAPI';

import Config from './Config.json';

const PORT = 80;
const App = express();

// App.use(cors());
App.use(cors({origin: ["*", "http://localhost:3000", "http://192.168.1.208:3000", "http://localhost:3001"], credentials: true}));
App.use(express.json());
App.use(cookieParser());


App.use("/weather", Weather);
App.use("/covid", Covid);
App.use("/account", Account);

App.listen(PORT, () => {
    // Global.WeatherAPI = new OpenWeatherMap("21d5ef6432edd2d558243d66466ee62d", { lang: Language.Korean, units: Units.Metric });
    Global.WeatherAPI = new OpenWeatherMap(Config.APIKEY.Weather, { lang: Language.Korean, units: Units.Metric });
    Global.CovidAPI = new CovidAPI(Config.APIKEY.Covid);
    
    console.log("Life_Information Server Online");
});