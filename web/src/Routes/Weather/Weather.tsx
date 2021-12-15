import React, { useContext, useEffect, useRef, useState } from "react";
import styled from "styled-components";
import { ScrollView } from "../../components/ScrollView";
import { ScrollElement, Emphasis } from "../../components/ScrollElement";

import { WeatherData } from "../../../../shared/Weather";
import { LocationArray, Location_T, Conditions_T } from "../../Types/WeatherType";
import { NextDayWeatherContext, NextHourWeatherContext } from "../../context/NextWeather";
import { NextDayWeather, NextHourWeather } from "./NextWeather";
import { Map } from "../../components/Map";
import API from "../../API";



const LocationSelection = styled.select`
    border: none;
    display: inline-block;
    font-size: 1.5rem;

    -webkit-appearance: none;
    background: none;

    outline: none;
    text-align: center;
    color: white;
`;

const Degree = styled.div`
    font-size: 6rem;
`;

// DEV
// const initWeather: WeatherData = {
//     temperture: {
//         current: 6,
//         min: -1,
//         max: 9
//     },
//     humidity: 50,
//     rainProbability: 10,
//     condition: {
//         main: Conditions_T.Haze,
//         description: "안개"
//     },
//     location: Location_T.GYEONG_GI,
//     timestamp: new Date()
// }

export function Weather() {
    const [CurrentWeather, setCurrentWeather] = useState<WeatherData>();
    const { setNextHourWeather } = useContext(NextHourWeatherContext);
    const { setNextDayWeather } = useContext(NextDayWeatherContext);
    
    // useEffect(() => {
    //     for (const Weather of NextWeather) console.log(Weather.timestamp);
    // }, [NextWeather]);

    useEffect(() => {

        API.weather.current({ Location: Location_T.GYEONG_GI }).then(res => {
            if (res.status) setCurrentWeather(res.result);
        }).catch(err => console.log(err));


        API.weather.forecast("hour", { Location: Location_T.GYEONG_GI }).then(res => {
            if (res.status) setNextHourWeather(res.result);
        }).catch(err => console.log(err));

        API.weather.forecast("week", { Location: Location_T.GYEONG_GI }).then(res => {
            if (res.status) setNextDayWeather(res.result);
        }).catch(err => console.log(err));
    }, []);

    return (
        <ScrollView>

            <Emphasis>
                {CurrentWeather&&
                    <>
                        <LocationSelection>
                            {LocationArray.map(K => <option selected={Location_T[K]===CurrentWeather.location} value={K} key={K}>{Location_T[K]}</option>)}
                        </LocationSelection>
                        <Degree>{CurrentWeather.temperture.current}°</Degree>
                        <div>{CurrentWeather.condition.description}</div>
                        <div>최고:{CurrentWeather.temperture.max}° 최저:{CurrentWeather.temperture.min}°</div>
                    </>
                }
            </Emphasis>


            <NextHourWeather />
            <NextDayWeather />

            <ScrollElement style={{padding: '1rem'}}>
                <Map height={10} />
            </ScrollElement>

        </ScrollView>
    )
}