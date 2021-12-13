import React, { useContext, useEffect } from "react";
import { WeatherData } from "../../../../shared/Weather";
import { HorizontalRangeGraph } from "../../components/HorizontalRangeGraph";
import { LinearGraph } from "../../components/LinearGraph";
import { ElementTitle, HorizontalContainer, HorizontalDivider, HorizontalElement, ScrollElement, VerticalContainer, VerticalElement } from "../../components/ScrollElement";
import { NextDayWeatherContext, NextHourWeatherContext } from "../../context/NextWeather";
import { Location_T, WeatherCondition_T } from "../../Types/WeatherType";
import { GetDay, GetHour } from "../../Utils/Date";

import { GiWaterDrop } from "react-icons/gi";
import { WiCloud, WiDaySunny, WiHail, WiHumidity } from "react-icons/wi";
import { BsFillCloudRainFill } from "react-icons/bs";


const initNextHourWeather: WeatherData[] = Array.from({length: 23}, (_, i) => ({
    temperture: {
        current: Math.floor(Math.random() * 2 * i - 5) * -1,
        min: -1,
        max: 9
    },
    humidity: Math.floor(i * (100 / 23)),
    rainProbability: Math.floor((23 - i) * (100 / 23)),
    condition: WeatherCondition_T.CLOUDY,
    location: Location_T.GYEONG_GI,
    timestamp: new Date(Date.now() + ((i) * 1000 * 60 * 60 * 1))
}));

export function NextHourWeather() {
    const { NextHourWeather, setNextHourWeather } = useContext(NextHourWeatherContext);

    useEffect(() => setNextHourWeather(initNextHourWeather), []); // DEV

    return (
        <ScrollElement hideScroll>
            {(ref: React.RefObject<HTMLDivElement>) => (
                <VerticalContainer>
                    <ElementTitle>시간별 날씨</ElementTitle>
                    <HorizontalDivider />
                    <HorizontalContainer style={{whiteSpace: 'nowrap'}}>
                    {NextHourWeather.map((Weather, i) => (

                        <HorizontalElement flex={1} style={{textAlign: 'center'}} key={i}>
                            <div style={{fontSize: '.8rem'}}>
                                {GetHour(Weather.timestamp)}
                            </div>
                            <HorizontalContainer style={{fontSize: '.5rem', width: '50%', margin: 'auto'}}>
                            </HorizontalContainer>
                        </HorizontalElement>

                    ))}
                    </HorizontalContainer>
                    <LinearGraph parent={ref} Height={50} RealHeightPercent={30} data={{
                        
                        labels: NextHourWeather.map(V => V.timestamp.getHours().toString()),
                        data: NextHourWeather.map(V => V.temperture.current)

                    }} DataUnit={"°"} ShowNumber />
                    <HorizontalContainer style={{whiteSpace: 'nowrap'}}>
                    {NextHourWeather.map((Weather, i) => (

                        <VerticalContainer style={{padding: '0 .5rem', fontSize: '.5rem', textAlign: 'center'}} key={i}>
                            <HorizontalContainer style={{padding: '.1rem', alignItems: 'center'}}>
                                <GiWaterDrop style={{padding: '0 .2rem'}} />
                                <HorizontalElement>{Weather.humidity}%</HorizontalElement>
                            </HorizontalContainer>

                            <HorizontalContainer style={{padding: '.1rem', alignItems: 'center'}}>
                                <BsFillCloudRainFill style={{padding: '0 .2rem'}} />
                                <HorizontalElement>{Weather.rainProbability}%</HorizontalElement>
                            </HorizontalContainer>
                        </VerticalContainer>

                    ))}
                    </HorizontalContainer>
                </VerticalContainer>
            )}
        </ScrollElement>
    )
}


const initNextDayWeather: WeatherData[] = Array.from({length: 10}, (_, i) => ({
    temperture: {
        current: Math.floor(Math.random() * 2 * i - 5) * -1,
        min: -1,
        max: 9
    },
    humidity: 50,
    rainProbability: 10,
    condition: WeatherCondition_T.CLOUDY,
    location: Location_T.GYEONG_GI,
    timestamp: new Date(Date.now() + ((i) * 1000 * 60 * 60 * 24))
}));

export function NextDayWeather() {
    const { NextDayWeather, setNextDayWeather } = useContext(NextDayWeatherContext);

    useEffect(() => setNextDayWeather(initNextDayWeather), []);

    const IconStyle: React.CSSProperties = {verticalAlign: 'middle', paddingRight: '.1rem'};

    return (
        <ScrollElement>
            <VerticalContainer style={{width: '100%', whiteSpace: 'nowrap'}}>
                <ElementTitle>{NextDayWeather.length}일간의 날씨 정보</ElementTitle>
                <HorizontalDivider />
                <VerticalContainer style={{fontSize: '.8rem'}}>
                    {NextDayWeather.map((Weather, i) => (

                        <>
                        <HorizontalContainer>
                            <HorizontalElement flex={.15} style={{textAlign: 'left'}}>{GetDay(Weather.timestamp)}</HorizontalElement>
                            <HorizontalElement flex={.25} ><WiCloud style={{...IconStyle, fontSize: '1rem'}} /></HorizontalElement>
                            <HorizontalElement flex={.25}><GiWaterDrop style={{...IconStyle, fontSize: '.6rem'}} />{Weather.humidity}%</HorizontalElement>

                            <HorizontalContainer style={{flex: '1', margin: '0 .5rem'}}>
                                <HorizontalElement flex={0} style={{display: 'inline'}}>{Weather.temperture.min}</HorizontalElement>
                                <HorizontalElement flex={1} style={{margin: 'auto .5rem'}}><HorizontalRangeGraph height={2} /></HorizontalElement>
                                <HorizontalElement flex={0} style={{display: 'inline'}}>{Weather.temperture.max}</HorizontalElement>
                            </HorizontalContainer>

                        </HorizontalContainer>
                        {NextDayWeather[i+1]&& <HorizontalDivider />}
                        </>
                    ))}
                </VerticalContainer>
            </VerticalContainer>
        </ScrollElement>
    )
}