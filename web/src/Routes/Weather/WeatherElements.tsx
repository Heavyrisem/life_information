import React, { useContext, useEffect } from "react";
import { HorizontalRangeGraph } from "../../components/HorizontalRangeGraph";
import { LinearGraph } from "../../components/LinearGraph";
import { ElementTitle, HorizontalContainer, HorizontalDivider, HorizontalElement, ScrollElement, VerticalContainer, VerticalElement } from "../../components/Elements";
import { NextDayWeatherContext, NextHourWeatherContext } from "../../context/WeatherContext";
import { GetDay, GetHour } from "../../Utils/Date";

import { GiWaterDrop } from "react-icons/gi";
import { BsFillCloudRainFill } from "react-icons/bs";


// const initNextHourWeather: WeatherData[] = Array.from({length: 23}, (_, i) => ({
//     temperture: {
//         current: Math.floor(Math.random() * 2 * i - 5) * -1,
//         min: -1,
//         max: 9
//     },
//     humidity: Math.floor(i * (100 / 23)),
//     rainProbability: Math.floor((23 - i) * (100 / 23)),
//     condition: {
//         main: Conditions_T.Haze,
//         description: "안개"
//     },
//     location: Location_T.GYEONG_GI,
//     timestamp: new Date(Date.now() + ((i) * 1000 * 60 * 60 * 1))
// }));

export function NextHourWeather() {
    const { NextHourWeatherData } = useContext(NextHourWeatherContext);

    useEffect(() => {
        // setNextHourWeather(initNextHourWeather)
        // console.log("NextWeather");
    }, []); // DEV

    return (
        <ScrollElement hideScroll>
            {(ref) => (
                <VerticalContainer>

                    <ElementTitle>시간별 날씨</ElementTitle>
                    <HorizontalDivider />
                    {NextHourWeatherData.length? 
                        <>
                            <HorizontalContainer style={{whiteSpace: 'nowrap'}}>
                            {NextHourWeatherData.map((Weather, i) => (

                                <HorizontalElement flex={1} style={{textAlign: 'center'}} key={i}>
                                    <div style={{fontSize: '.8rem'}}>
                                        {GetHour(Weather.timestamp)}
                                    </div>
                                </HorizontalElement>

                            ))}
                            </HorizontalContainer>

                            <LinearGraph parent={ref} Height={50} RealHeightPercent={30} data={{
                                
                                labels: NextHourWeatherData.map(V => V.timestamp.getHours().toString()),
                                data: NextHourWeatherData.map(V => V.temperture.current)

                            }} DataUnit={"°"} ShowNumber />
                            
                            <HorizontalContainer style={{whiteSpace: 'nowrap'}}>
                            {NextHourWeatherData.map((Weather, i) => (

                                <VerticalContainer style={{padding: '0 .5rem', fontSize: '.5rem', textAlign: 'center', margin: 'auto', minWidth: 'auto'}} key={i}>

                                    <HorizontalContainer style={{textAlign: 'center', margin: 'auto'}}>
                                        <img src={`http://openweathermap.org/img/wn/${Weather.condition.icon}@2x.png`} style={{ width: '2rem', padding: 0}} />
                                    </HorizontalContainer>

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
                        </>:<span>로딩 중입니다.</span>
                    }
                    
                </VerticalContainer>
            )}
        </ScrollElement>
    )
}


// const initNextDayWeather: WeatherData[] = Array.from({length: 10}, (_, i) => ({
//     temperture: {
//         current: Math.floor(Math.random() * 2 * i - 5) * -1,
//         min: Math.abs(Math.floor(Math.random() * 2 * i - 5)) * -1,
//         max: Math.abs(Math.floor(Math.random() * 2 * i - 5))
//     },
//     humidity: 50,
//     rainProbability: 10,
//     condition: {
//         main: Conditions_T.Haze,
//         description: "안개"
//     },
//     location: Location_T.GYEONG_GI,
//     timestamp: new Date(Date.now() + ((i) * 1000 * 60 * 60 * 24))
// }));

export function NextDayWeather() {
    const { NextDayWeatherData, setNextDayWeather } = useContext(NextDayWeatherContext);

    // useEffect(() => setNextDayWeather(initNextDayWeather), []);

    // const IconStyle: React.CSSProperties = {paddingRight: '.1rem'};

    return (
        <ScrollElement>
            <VerticalContainer style={{width: '100%', whiteSpace: 'nowrap'}}>
                <ElementTitle>{NextDayWeatherData&& NextDayWeatherData.data.length+"일간의"} 날씨 정보</ElementTitle>
                <HorizontalDivider />
                {NextDayWeatherData?
                    <>
                        <VerticalContainer style={{fontSize: '.8rem', margin: '0 .5rem'}}>
                            {NextDayWeatherData.data.map((Weather, i) => (

                                <>
                                <HorizontalContainer key={i}>
                                    <HorizontalElement flex={.25} style={{textAlign: 'left'}}>{GetDay(Weather.timestamp)}</HorizontalElement>
                                    <HorizontalElement flex={.35} >
                                        <img src={`http://openweathermap.org/img/wn/${Weather.condition.icon}@2x.png`} style={{ width: '1.2rem', padding: 0}} />
                                        {/* <WiCloud style={{ fontSize: '1rem'}} /> */}
                                    </HorizontalElement>
                                    <HorizontalElement flex={.35}><GiWaterDrop style={{ fontSize: '.6rem'}} />{Weather.humidity}%</HorizontalElement>

                                    <HorizontalContainer style={{flex: '1', margin: '0 .5rem', marginLeft: '1rem'}}>
                                        <HorizontalElement flex={0} style={{display: 'inline'}}>{Weather.temperture.min}</HorizontalElement>
                                        <HorizontalElement flex={1} style={{margin: 'auto 1rem'}}><HorizontalRangeGraph height={2} data={{range: {min: NextDayWeatherData.min, max: NextDayWeatherData.max}, ...Weather.temperture}} /></HorizontalElement>
                                        <HorizontalElement flex={0} style={{display: 'inline'}}>{Weather.temperture.max}</HorizontalElement>
                                    </HorizontalContainer>

                                </HorizontalContainer>
                                {NextDayWeatherData.data[i+1]&& <HorizontalDivider />}
                                </>
                            ))}
                        </VerticalContainer>
                    </>:<span>로딩 중입니다.</span>
                }
            </VerticalContainer>
        </ScrollElement>
    )
}