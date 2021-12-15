import express from 'express';
import Global from './Global';
import Weather from "./routes/Weather";

import cors from 'cors';
import { Language, OpenWeatherMap, Units } from 'owm-onecall-api';

const PORT = 80;
const App = express();

App.use(cors());
App.use(express.json());


App.use("/weather", Weather);

App.listen(PORT, () => {
    Global.WeatherAPI = new OpenWeatherMap("21d5ef6432edd2d558243d66466ee62d", { lang: Language.Korean, units: Units.Metric });

    console.log("Life_Information Server Online");
});