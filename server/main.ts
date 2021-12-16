import express from 'express';
import Global from './Global';
import Weather from "./routes/Weather";
import Covid from "./routes/Covid";

import cors from 'cors';
import { Language, OpenWeatherMap, Units } from 'owm-onecall-api';
import { CovidAPI } from './model/CovidAPI';

const PORT = 80;
const App = express();

App.use(cors());
App.use(express.json());


App.use("/weather", Weather);
App.use("/covid", Covid);

App.listen(PORT, () => {
    // Global.WeatherAPI = new OpenWeatherMap("21d5ef6432edd2d558243d66466ee62d", { lang: Language.Korean, units: Units.Metric });
    Global.WeatherAPI = new OpenWeatherMap("458bad37714b04968d3b022911e2fd70", { lang: Language.Korean, units: Units.Metric });
    Global.CovidAPI = new CovidAPI("qZROU8a65Qg61gcpCNbiF8qSlva%2BjIT%2BunGeegk5cAlERCnjPYcMosujUQ49F7ZWt2TfOJdgy8Lowjinys6%2BeQ%3D%3D");
    
    console.log("Life_Information Server Online");
});