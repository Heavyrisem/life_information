import React, { useContext, useEffect, useRef, useState } from "react";
import styled from "styled-components";
import { ScrollElement, Emphasis, ScrollView } from "../../components/Elements";

import { LocationArray, Location_T } from "../../Types/WeatherType";
import { NextDayWeatherContext, NextHourWeatherContext, TodayWeatherContext } from "../../context/WeatherContext";
import { NextDayWeather, NextHourWeather } from "./WeatherElements";
import { Map } from "../../components/Map";
import API from "../../API";
import { UserDataContext, UserLocationContext } from "../../context/UserContext";



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


export function Weather() {
    const { TodayWeatherData, setTodayWeatherData } = useContext(TodayWeatherContext);
    const { setNextHourWeather } = useContext(NextHourWeatherContext);
    const { setNextDayWeather } = useContext(NextDayWeatherContext);
    const { UserLocation, setUserLocation } = useContext(UserLocationContext);
    const { UserData } = useContext(UserDataContext);
    
    useEffect(() => {

        if (!UserLocation) {
            navigator.geolocation.getCurrentPosition(Pos => {
                setUserLocation({
                    LocationName: (UserData)? UserData.Setting.Location.name:Location_T.USERLOCATION,
                    Coords: { lat: Pos.coords.latitude, lon: Pos.coords.longitude }
                });
                console.log(Pos.coords.latitude, Pos.coords.longitude);
                // UpdateWeathers();
            });
        }
        


        // setUserLocation({ LocationName: Location_T.USERLOCATION });
    }, []);

    useEffect(() => {
        if (UserLocation && TodayWeatherData?.location != UserLocation.LocationName) {
            console.log("UserLocation.LocationName", UserLocation.LocationName);
            UpdateWeathers();
        }
    }, [UserLocation?.LocationName]);

    function UpdateWeathers() {

        if (!UserLocation) return;
        if (UserLocation.LocationName === Location_T.USERLOCATION && !UserLocation.Coords) return;
        
        console.log(UserLocation);

        const Request = {
            Location: UserLocation.LocationName,
            Position: (UserLocation.LocationName === Location_T.USERLOCATION)? UserLocation.Coords : undefined
        }

        API.weather.current({ ...Request }).then(res => {
            if (res.status) setTodayWeatherData(res.result);
            if (res.status) console.log(res.result);
        }).catch(err => console.log(err));


        API.weather.forecast("hour", { ...Request }).then(res => {
            if (res.status) setNextHourWeather(res.result);
        }).catch(err => console.log(err));

        API.weather.forecast("week", { ...Request }).then(res => {
            if (res.status) setNextDayWeather(res.result);
        }).catch(err => console.log(err));

    }

    function LocationSelectHandler(e: React.ChangeEvent<HTMLSelectElement>) {
        if (e.target.value) {
            setUserLocation({
                ...UserLocation,
                LocationName: e.target.value as Location_T
            })
        }
    }

    return (
        <ScrollView>

            <Emphasis>
                    {TodayWeatherData?
                        <>
                            <LocationSelection onChange={LocationSelectHandler}>
                                {LocationArray.map(K => <option selected={TodayWeatherData&& Location_T[K]===TodayWeatherData.location} value={Location_T[K]} key={K}>{Location_T[K]}</option>)}
                            </LocationSelection>
                            <Degree>{TodayWeatherData.temperture.current}°</Degree>
                            <div>{TodayWeatherData.condition.description}</div>
                            <div>최고:{TodayWeatherData.temperture.max}° 최저:{TodayWeatherData.temperture.min}°</div>
                        </>:
                        <div>불러오는 중</div>
                    }
            </Emphasis>


            <NextHourWeather />
            <NextDayWeather />

            <ScrollElement style={{padding: '1rem'}}>
                {UserLocation&&UserLocation.Coords&& <Map height={10} center={{...UserLocation.Coords}} />}
            </ScrollElement>

        </ScrollView>
    )
}