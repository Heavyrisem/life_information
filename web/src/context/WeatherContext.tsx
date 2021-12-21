/* eslint-disable react/jsx-no-constructed-context-values */
import React, { useState } from 'react';

import { WeatherData } from '../../../shared/Weather';

interface TodayWeatherContext {
	TodayWeatherData?: WeatherData;
	setTodayWeatherData: (Weathers: WeatherData) => void;
}
export const TodayWeatherContext = React.createContext<TodayWeatherContext>({
	TodayWeatherData: undefined,
	setTodayWeatherData: () => ({}),
});
export function TodayWeatherProvider({ children }: React.PropsWithChildren<React.ReactNode>) {
	const [TodayWeatherData, setWeather] = useState<WeatherData>();

	function setTodayWeatherData(Weather: WeatherData) {
		const FixedWeather = { ...Weather, timestamp: new Date(Weather.timestamp) };

		setWeather(FixedWeather);
	}

	return (
		<TodayWeatherContext.Provider value={{ TodayWeatherData, setTodayWeatherData }}>
			{children}
		</TodayWeatherContext.Provider>
	);
}

interface NextHourWeatherContext {
	NextHourWeatherData: WeatherData[];
	setNextHourWeather: (Weathers: WeatherData[]) => void;
}
export const NextHourWeatherContext = React.createContext<NextHourWeatherContext>({
	NextHourWeatherData: [],
	setNextHourWeather: () => ({}),
});
export function NextHourWeatherProvider({ children }: React.PropsWithChildren<React.ReactNode>) {
	const [NextHourWeatherData, setWeather] = useState<WeatherData[]>([]);

	function setNextHourWeather(Weathers: WeatherData[]) {
		const FixedWeathers: WeatherData[] = [];

		for (let i = 0; i < Weathers.length; i += 1) {
			FixedWeathers.push({ ...Weathers[i], timestamp: new Date(Weathers[i].timestamp) });
		}

		setWeather(FixedWeathers);
	}

	return (
		<NextHourWeatherContext.Provider value={{ NextHourWeatherData, setNextHourWeather }}>
			{children}
		</NextHourWeatherContext.Provider>
	);
}

interface NextDayWeatherData {
	max: number;
	min: number;
	data: WeatherData[];
}
interface NextDayWeatherContext {
	NextDayWeatherData: NextDayWeatherData | undefined;
	setNextDayWeather: (Weathers: WeatherData[]) => void;
}
export const NextDayWeatherContext = React.createContext<NextDayWeatherContext>({
	NextDayWeatherData: undefined,
	setNextDayWeather: () => ({}),
});
export function NextDayWeatherProvider({ children }: React.PropsWithChildren<React.ReactNode>) {
	const [NextDayWeatherData, setWeather] = useState<NextDayWeatherData>();

	function setNextDayWeather(Weathers: WeatherData[]) {
		const FixedWeathers: WeatherData[] = [];
		const [max, min] = [
			Math.max(...Weathers.map(Weather => Weather.temperture.max)),
			Math.min(...Weathers.map(Weather => Weather.temperture.min)),
		];

		for (let i = 0; i < Weathers.length; i += 1) {
			FixedWeathers.push({ ...Weathers[i], timestamp: new Date(Weathers[i].timestamp) });
		}

		setWeather({
			max,
			min,
			data: FixedWeathers,
		});
	}

	return (
		<NextDayWeatherContext.Provider value={{ NextDayWeatherData, setNextDayWeather }}>
			{children}
		</NextDayWeatherContext.Provider>
	);
}
