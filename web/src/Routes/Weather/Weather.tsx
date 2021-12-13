import React, { useContext, useEffect, useRef, useState } from "react";
import styled from "styled-components";
import { ScrollView } from "../../components/ScrollView";
import { ScrollElement, Emphasis, VerticalElement, HorizontalContainer, HorizontalElement, VerticalContainer, ElementTitle, HorizontalDivider } from "../../components/ScrollElement";

import { WeatherData } from "../../../../shared/Weather";
import { LocationArray, Location_T, WeatherCondition_T } from "../../Types/WeatherType";
import { LinearGraph } from "../../components/LinearGraph";
import { GetHour } from "../../Utils/Date";
import { NextDayWeatherProvider, NextHourWeatherContext, NextHourWeatherProvider } from "../../context/NextWeather";
import { NextDayWeather, NextHourWeather } from "./NextWeather";



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
const initWeather: WeatherData = {
    temperture: {
        current: 6,
        min: -1,
        max: 9
    },
    humidity: 50,
    rainProbability: 10,
    condition: WeatherCondition_T.CLOUDY,
    location: Location_T.GYEONG_GI,
    timestamp: new Date()
}

export function Weather() {
    const [CurrentWeather, setCurrentWeather] = useState<WeatherData>(initWeather);
    
    // useEffect(() => {
    //     for (const Weather of NextWeather) console.log(Weather.timestamp);
    // }, [NextWeather]);

    return (
        <ScrollView>
            <NextHourWeatherProvider>
            <NextDayWeatherProvider>

            <Emphasis>
                <LocationSelection>
                    {LocationArray.map(K => <option selected={Location_T[K]===CurrentWeather.location} value={K} key={K}>{Location_T[K]}</option>)}
                </LocationSelection>
                <Degree>{CurrentWeather.temperture.current}°</Degree>
                <div>{CurrentWeather.condition}</div>
                <div>최고:{CurrentWeather.temperture.max}° 최저:{CurrentWeather.temperture.min}°</div>
            </Emphasis>

            <NextHourWeather />

            <NextDayWeather />
            <ScrollElement>asdf</ScrollElement>
            <ScrollElement>asdf</ScrollElement>
            <ScrollElement>asdf</ScrollElement>
            <ScrollElement>asdf</ScrollElement>
            <ScrollElement>asdf</ScrollElement>
            <ScrollElement>asdf</ScrollElement>
            <ScrollElement>asdf</ScrollElement>
            <ScrollElement>asdf</ScrollElement>
            <ScrollElement>asdf</ScrollElement>
            <ScrollElement>asdf</ScrollElement>
            <ScrollElement>asdf</ScrollElement>
            <ScrollElement>asdf</ScrollElement>
            <ScrollElement>asdf</ScrollElement>
            <ScrollElement>asdf</ScrollElement>
            <ScrollElement>asdf</ScrollElement>
            <ScrollElement>asdf</ScrollElement>
            <ScrollElement>asdf</ScrollElement>
            <ScrollElement>asdf</ScrollElement>
                
            </NextDayWeatherProvider>
            </NextHourWeatherProvider>
        </ScrollView>
    )
}