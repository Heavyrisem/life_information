import React, { useContext } from 'react';

import { BsFillCloudRainFill } from 'react-icons/bs';
import { GiWaterDrop } from 'react-icons/gi';

import {
	ElementTitle,
	HorizontalContainer,
	HorizontalDivider,
	HorizontalElement,
	ScrollElement,
	VerticalContainer,
} from '../../components/Elements';
import HorizontalRangeGraph from '../../components/HorizontalRangeGraph';
import LinearGraph from '../../components/LinearGraph';
import { NextDayWeatherContext, NextHourWeatherContext } from '../../context/WeatherContext';
import { GetDay, GetHour } from '../../Utils/Date';

export function NextHourWeather() {
	const { NextHourWeatherData } = useContext(NextHourWeatherContext);

	return (
		<ScrollElement hideScroll>
			{ref => (
				<VerticalContainer>
					<ElementTitle>시간별 날씨</ElementTitle>
					<HorizontalDivider />
					{NextHourWeatherData.length ? (
						<>
							<HorizontalContainer style={{ whiteSpace: 'nowrap' }}>
								{NextHourWeatherData.map(Weather => (
									<HorizontalElement
										flex={1}
										style={{ textAlign: 'center' }}
										key={Weather.timestamp.toString()}
									>
										<div style={{ fontSize: '.8rem' }}>{GetHour(Weather.timestamp)}</div>
									</HorizontalElement>
								))}
							</HorizontalContainer>

							<LinearGraph
								parent={ref}
								Height={50}
								RealHeightPercent={30}
								data={{
									labels: NextHourWeatherData.map(V => V.timestamp.getHours().toString()),
									data: NextHourWeatherData.map(V => V.temperture.current),
								}}
								DataUnit="°"
								ShowNumber
							/>

							<HorizontalContainer style={{ whiteSpace: 'nowrap' }}>
								{NextHourWeatherData.map(Weather => (
									<VerticalContainer
										style={{
											padding: '0 .5rem',
											fontSize: '.5rem',
											textAlign: 'center',
											margin: 'auto',
											minWidth: 'auto',
										}}
										key={Weather.timestamp.toString()}
									>
										<HorizontalContainer style={{ textAlign: 'center', margin: 'auto' }}>
											<img
												src={`http://openweathermap.org/img/wn/${Weather.condition.icon}@2x.png`}
												style={{ width: '2rem', padding: 0 }}
												alt="날씨 아이콘"
											/>
										</HorizontalContainer>

										<HorizontalContainer style={{ padding: '.1rem', alignItems: 'center' }}>
											<GiWaterDrop style={{ padding: '0 .2rem' }} />
											<HorizontalElement>{Weather.humidity}%</HorizontalElement>
										</HorizontalContainer>

										<HorizontalContainer style={{ padding: '.1rem', alignItems: 'center' }}>
											<BsFillCloudRainFill style={{ padding: '0 .2rem' }} />
											<HorizontalElement>{Weather.rainProbability}%</HorizontalElement>
										</HorizontalContainer>
									</VerticalContainer>
								))}
							</HorizontalContainer>
						</>
					) : (
						<span>로딩 중입니다.</span>
					)}
				</VerticalContainer>
			)}
		</ScrollElement>
	);
}

export function NextDayWeather() {
	const { NextDayWeatherData } = useContext(NextDayWeatherContext);

	return (
		<ScrollElement>
			<VerticalContainer style={{ width: '100%', whiteSpace: 'nowrap' }}>
				<ElementTitle>{NextDayWeatherData && `${NextDayWeatherData.data.length}일간의`} 날씨 정보</ElementTitle>
				<HorizontalDivider />
				{NextDayWeatherData ? (
					<VerticalContainer style={{ fontSize: '.8rem', margin: '0 .5rem' }}>
						{NextDayWeatherData.data.map((Weather, i) => (
							<>
								<HorizontalContainer key={Weather.timestamp.toString()}>
									<HorizontalElement flex={0.25} style={{ textAlign: 'left' }}>
										{GetDay(Weather.timestamp)}
									</HorizontalElement>
									<HorizontalElement flex={0.35}>
										<img
											src={`http://openweathermap.org/img/wn/${Weather.condition.icon}@2x.png`}
											style={{ width: '1.2rem', padding: 0 }}
											alt="날씨 아이콘"
										/>
										{/* <WiCloud style={{ fontSize: '1rem'}} /> */}
									</HorizontalElement>
									<HorizontalElement flex={0.35}>
										<GiWaterDrop style={{ fontSize: '.6rem' }} />
										{Weather.humidity}%
									</HorizontalElement>

									<HorizontalContainer style={{ flex: '1', margin: '0 .5rem', marginLeft: '1rem' }}>
										<HorizontalElement flex={0} style={{ display: 'inline' }}>
											{Weather.temperture.min}
										</HorizontalElement>
										<HorizontalElement flex={1} style={{ margin: 'auto 1rem' }}>
											<HorizontalRangeGraph
												height={2}
												data={{
													range: { min: NextDayWeatherData.min, max: NextDayWeatherData.max },
													...Weather.temperture,
												}}
											/>
										</HorizontalElement>
										<HorizontalElement flex={0} style={{ display: 'inline' }}>
											{Weather.temperture.max}
										</HorizontalElement>
									</HorizontalContainer>
								</HorizontalContainer>
								{NextDayWeatherData.data[i + 1] && <HorizontalDivider />}
							</>
						))}
					</VerticalContainer>
				) : (
					<span>로딩 중입니다.</span>
				)}
			</VerticalContainer>
		</ScrollElement>
	);
}
