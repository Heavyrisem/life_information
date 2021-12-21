import React, { useCallback, useContext, useEffect, useMemo } from 'react';
import styled from 'styled-components';

import API from '../../API';
import Map from '../../components/Map';
import { ScrollElement, Emphasis, ScrollContainer } from '../../components/ScrollElements';

import { UserDataContext, UserLocationContext } from '../../context/UserContext';
import { NextDayWeatherContext, NextHourWeatherContext, TodayWeatherContext } from '../../context/WeatherContext';
import useError from '../../hooks/useError';
import { LocationArray, Location_T } from '../../Types/WeatherType';
import { NextDayWeather, NextHourWeather } from './WeatherElements';

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

export default function Weather() {
	const ErrorHandler = useError();
	const { TodayWeatherData, setTodayWeatherData } = useContext(TodayWeatherContext);
	const { setNextHourWeather } = useContext(NextHourWeatherContext);
	const { setNextDayWeather } = useContext(NextDayWeatherContext);
	const { UserLocation, setUserLocation } = useContext(UserLocationContext);
	const { UserData } = useContext(UserDataContext);

	function UpdateUserCoords() {
		if (!UserLocation.Coords) {
			navigator.geolocation.getCurrentPosition(
				Pos => {
					setUserLocation({
						LocationName: UserData ? UserData.Setting.Location.name : UserLocation.LocationName,
						Coords: { lat: Pos.coords.latitude, lon: Pos.coords.longitude },
					});
					// console.log(Pos.coords.latitude, Pos.coords.longitude);
					// UpdateWeathers();
				},
				err => {
					if (err.code === err.PERMISSION_DENIED) ErrorHandler('사용자 위치 정보 접근 권한이 없습니다.');
					else ErrorHandler('위치 정보를 얻는데 실패했습니다.');
				}
			);
		}
	}

	const UpdateWeathers = useCallback(() => {
		if (!UserLocation) return;
		if (UserLocation.LocationName === Location_T.USERLOCATION && !UserLocation.Coords) return;

		// console.log(UserLocation);

		const Request = {
			Location: UserLocation.LocationName,
			Position: UserLocation.LocationName === Location_T.USERLOCATION ? UserLocation.Coords : undefined,
		};

		API.weather
			.current({ ...Request })
			.then(res => res.status && setTodayWeatherData(res.result))
			.catch(ErrorHandler);

		API.weather
			.forecast('hour', { ...Request })
			.then(res => res.status && setNextHourWeather(res.result))
			.catch(ErrorHandler);

		API.weather
			.forecast('week', { ...Request })
			.then(res => res.status && setNextDayWeather(res.result))
			.catch(ErrorHandler);
	}, [ErrorHandler, UserLocation, setNextDayWeather, setNextHourWeather, setTodayWeatherData]);

	useEffect(() => {
		UpdateUserCoords();

		if (UserData && UserLocation.LocationName !== UserData.Setting.Location.name) {
			setUserLocation(prevState => ({
				...prevState,
				LocationName: UserData.Setting.Location.name,
			}));
		}

		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, []);

	useEffect(() => {
		if (TodayWeatherData?.location !== UserLocation.LocationName) {
			// console.log('UserLocation.LocationName', UserLocation.LocationName);
			UpdateWeathers();
		}
	}, [TodayWeatherData?.location, UpdateWeathers, UserLocation.LocationName]);

	const LocationSelectHandler = useCallback(
		(e: React.ChangeEvent<HTMLSelectElement>) => {
			if (e.target.value) {
				setUserLocation({
					...UserLocation,
					LocationName: e.target.value as Location_T,
				});
			}
		},
		[setUserLocation, UserLocation]
	);

	const WeatherSummary = useMemo(() => {
		if (TodayWeatherData) {
			return (
				<>
					<LocationSelection onChange={LocationSelectHandler} value={TodayWeatherData.location}>
						{LocationArray.map(K => (
							<option value={Location_T[K]} key={K}>
								{Location_T[K]}
							</option>
						))}
					</LocationSelection>
					<Degree>{TodayWeatherData.temperture.current}°</Degree>
					<div>{TodayWeatherData.condition.description}</div>
					<div>
						최고:
						{TodayWeatherData.temperture.max}° 최저:
						{TodayWeatherData.temperture.min}°
					</div>
				</>
			);
		}
		return <div>불러오는 중</div>;
	}, [LocationSelectHandler, TodayWeatherData]);

	return (
		<ScrollContainer>
			<Emphasis>{WeatherSummary}</Emphasis>

			<NextHourWeather />
			<NextDayWeather />

			<ScrollElement style={{ padding: '1rem' }}>
				{UserLocation.Coords ? (
					<Map height={10} center={{ ...UserLocation.Coords }} />
				) : (
					'사용자 위치 정보를 가져올 수 없습니다.'
				)}
			</ScrollElement>
		</ScrollContainer>
	);
}
