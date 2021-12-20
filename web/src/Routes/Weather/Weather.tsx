import React, { useContext, useEffect, useRef, useState } from "react";
import styled from "styled-components";
import { ScrollElement, Emphasis, ScrollView } from "../../components/Elements";

import { LocationArray, Location_T } from "../../Types/WeatherType";
import { NextDayWeatherContext, NextHourWeatherContext, TodayWeatherContext } from "../../context/WeatherContext";
import { NextDayWeather, NextHourWeather } from "./WeatherElements";
import { Map } from "../../components/Map";
import API from "../../API";
import { UserDataContext, UserLocationContext } from "../../context/UserContext";
import useError from "../../hooks/useError";



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
    const ErrorHandler = useError();
    const { TodayWeatherData, setTodayWeatherData } = useContext(TodayWeatherContext);
    const { setNextHourWeather } = useContext(NextHourWeatherContext);
    const { setNextDayWeather } = useContext(NextDayWeatherContext);
    const { UserLocation, setUserLocation } = useContext(UserLocationContext);
    const { UserData } = useContext(UserDataContext);
    
    useEffect(() => {

        if (!UserLocation.Coords) {
            navigator.geolocation.getCurrentPosition(Pos => {
                setUserLocation({
                    LocationName: (UserData)? UserData.Setting.Location.name:UserLocation.LocationName,
                    Coords: { lat: Pos.coords.latitude, lon: Pos.coords.longitude }
                });
                console.log(Pos.coords.latitude, Pos.coords.longitude);
                // UpdateWeathers();
            }, (err) => {
                if (err.code === err.PERMISSION_DENIED) ErrorHandler("사용자 위치 정보 접근 권한이 없습니다.");
                else ErrorHandler("위치 정보를 얻는데 실패했습니다.");
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

        API.weather.current({ ...Request }).then(res => res.status&& setTodayWeatherData(res.result)).catch(ErrorHandler);

        API.weather.forecast("hour", { ...Request }).then(res => res.status&& setNextHourWeather(res.result)).catch(ErrorHandler);

        API.weather.forecast("week", { ...Request }).then(res => res.status&& setNextDayWeather(res.result)).catch(ErrorHandler);

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
                            <LocationSelection onChange={LocationSelectHandler} value={TodayWeatherData.location}>
                                {LocationArray.map(K => <option value={Location_T[K]} key={K}>{Location_T[K]}</option>)}
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
                {UserLocation.Coords? <Map height={10} center={{...UserLocation.Coords}} />:"사용자 위치 정보를 가져올 수 없습니다."}
            </ScrollElement>

        </ScrollView>
    )
}