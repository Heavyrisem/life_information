import { Request, Response, Router } from "express";
import Weather from "../middleware/Weather";

import { current_Request, current_Response, ERROR_T, forecast_Request, forecast_Response } from "../../shared/Network";
import Global from "../Global";
import { DailyDataBlock } from "owm-onecall-api";

const router = Router();

router.use(Weather.TransformLocation);


router.post("/forecast/hour", async (req: Request<any,any,forecast_Request>, res: Response<forecast_Response>) => {
    const { Location, Position } = req.body;
    let Response: forecast_Response;

    try {
        if (Location && Position && Global.WeatherAPI) {
            const WeatherResult = await Global.WeatherAPI.day(Position.lat, Position.lon);
            
            Response = {
                status: true,
                result: WeatherResult.hourly.map(Weather => ({
                    temperture: {
                        current: Math.round(Weather.temp),
                        max: 0,
                        min: 0
                    },
                    humidity: Weather.humidity,
                    rainProbability: Math.round(Weather.pop * 100),
                    condition: {
                        main: Weather.weather[0],
                        description: Weather.weather[0].description,
                        icon: Weather.weather[0].icon
                    },
                    location: Location,
                    timestamp: new Date(Weather.dt * 1000)
                }))
            }

            return res.send(Response);
        } throw ERROR_T.INVAILD_PARAMS;
    } catch (err) {
        console.log(err);
        return res.send({
            status: false,
            msg: err+""
        })
    }
});

router.post("/forecast/week", async (req: Request<any,any,forecast_Request>, res: Response<forecast_Response>) => {
    const { Location, Position } = req.body;
    let Response: forecast_Response;

    try {
        if (Location && Position && Global.WeatherAPI) {
            const WeatherResult = await Global.WeatherAPI.week(Position.lat, Position.lon);
    
            Response = {
                status: true,
                result: WeatherResult.daily.map(Weather => ({
                    temperture: {
                        current: Math.round(Weather.temp.day),
                        max: Math.round(Weather.temp.max),
                        min: Math.round(Weather.temp.min)
                    },
                    humidity: Weather.humidity,
                    rainProbability: Math.round(Weather.pop * 100),
                    condition: {
                        main: Weather.weather[0],
                        description: Weather.weather[0].description,
                        icon: Weather.weather[0].icon
                    },
                    location: Location,
                    timestamp: new Date(Weather.dt * 1000)
                }))
            }

            return res.send(Response);
        } throw ERROR_T.INVAILD_PARAMS;
    } catch (err) {
        console.log(err);
        return res.send({
            status: false,
            msg: err+""
        })
    }
});


router.post("/current", async (req: Request<any,any,current_Request>, res: Response<current_Response>) => {
    const { Location, Position } = req.body;
    let Response: current_Response;

    try {
        if (Location && Position && Global.WeatherAPI) {
            let WeatherResult = await Global.WeatherAPI.current(Position.lat, Position.lon);
            let TodayWeather = await (await Global.WeatherAPI.week(Position.lat, Position.lon)).daily.shift() as DailyDataBlock;

            Response = {
                status: true,
                result: {
                    temperture: {
                        current: Math.round(WeatherResult.current.temp),
                        max: Math.round(TodayWeather.temp.max),
                        min: Math.round(TodayWeather.temp.min)
                    },
                    humidity: WeatherResult.current.humidity,
                    rainProbability: Math.round(TodayWeather.pop * 100),
                    condition: {
                        main: WeatherResult.current.weather[0].main,
                        description: WeatherResult.current.weather[0].description
                    },
                    location: Location,
                    timestamp: new Date(WeatherResult.current.dt * 1000)
                }
            }

            return res.send(Response);
        } throw ERROR_T.INVAILD_PARAMS;
    } catch (err) {
        console.log(err);
        return res.send({
            status: false,
            msg: err+""
        })
    }
})

export default router;