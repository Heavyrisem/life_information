/* eslint-disable prettier/prettier */
import React from 'react';
import { CookiesProvider } from 'react-cookie';

import { LastWeekCovidProvider, SidoCovidProvider, TodayCovidProvider } from './CovidContext';
import { UserDataProvider, UserLocationProvider } from './UserContext';
import { NextDayWeatherProvider, NextHourWeatherProvider, TodayWeatherProvider } from './WeatherContext';

export default function ServiceContextProvider({ children }: React.PropsWithChildren<React.ReactNode>) {
	return (
		<CookiesProvider>
		<UserDataProvider>
		<UserLocationProvider>
		<TodayWeatherProvider>
		<NextHourWeatherProvider>
		<NextDayWeatherProvider>
		<TodayCovidProvider>
		<LastWeekCovidProvider>
		<SidoCovidProvider>
			{children}
		</SidoCovidProvider>
		</LastWeekCovidProvider>
		</TodayCovidProvider>
		</NextDayWeatherProvider>
		</NextHourWeatherProvider>
		</TodayWeatherProvider>
		</UserLocationProvider>
		</UserDataProvider>
		</CookiesProvider>
	);
}
