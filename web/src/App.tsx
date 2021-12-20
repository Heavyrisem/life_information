import React, { useEffect, useMemo, useState } from 'react';
import logo from './logo.svg';
import './App.css';
import { Weather } from './Routes/Weather/Weather';
import styled from 'styled-components';
import { CookiesProvider } from "react-cookie";

import { NextDayWeatherProvider, NextHourWeatherProvider, TodayWeatherProvider } from './context/WeatherContext';
import { UserDataProvider, UserLocationProvider } from './context/UserContext';
import NavigationBar from './components/NavigationBar';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import { Navigation_T } from './Types/GlobalTypes';
import { Covid } from './Routes/Covid/Covid';
import { LastWeekCovidProvider, SidoCovidProvider, TodayCovidProvider } from './context/CovidContext';
import { Account } from './Routes/Account/Account';

const Scroll = styled.div`
	width: 100vw;
	height: 100vh;
	overflow: scroll;
	text-align: center;
`;

function App() {
	return (
		<div>
			<BrowserRouter>
				<Scroll>
					<ServiceContextProvider>
						<Routes>

							<Route path={Navigation_T.WEATHER} element={
								<Weather />
							} />

							<Route path={Navigation_T.COVID} element={
								<Covid />
							} />

							<Route path={Navigation_T.ACCOUNT} element={
								<Account />
							} />

						</Routes>
					</ServiceContextProvider>
				</Scroll>
				<NavigationBar />
			</BrowserRouter>
		</div>
	);
}

function ServiceContextProvider({ children }: React.PropsWithChildren<React.ReactNode>) {
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
	)
}

export default App;

// function sleep(t: number): Promise<void> {
// 	return new Promise(resolve => {
// 		setTimeout(() => {
// 			resolve();
// 		}, t);
// 	})
// }
// const Test = React.memo(function () {

// 	// const [s, ss] = useState<number>();
// 	// const s = useMemo(() => {
// 		// await sleep(1000);
// 		// return 1;
// 	// }, [])

// 	useEffect(() => {
// 		setTimeout(() => {
// 			// ss(2);
// 		}, 1000);
// 	}, []);

// 	return (
// 		<div>{}</div>
// 	)
// })