import React, { useEffect, useMemo, useState } from 'react';
import logo from './logo.svg';
import './App.css';
import { Weather } from './Routes/Weather/Weather';
import styled from 'styled-components';

import { NextDayWeatherProvider, NextHourWeatherProvider, TodayWeatherProvider } from './context/WeatherContext';
import { UserLocationProvider } from './context/UserContext';
import NavigationBar from './components/NavigationBar';
import { VerticalContainer } from './components/Elements';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import { Navigation_T } from './Types/GlobalTypes';
import { Covid } from './Routes/Covid/Covid';
import { LastWeekCovidProvider, TodayCovidProvider } from './context/CovidContext';
import Test from './Routes/Account/Test';

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
					<UserLocationProvider>
					<TodayWeatherProvider>
					<NextHourWeatherProvider>
					<NextDayWeatherProvider>
					<TodayCovidProvider>
					<LastWeekCovidProvider>
	
						<Routes>

							<Route path={Navigation_T.WEATHER} element={
								<Weather />
							} />

							<Route path={Navigation_T.COVID} element={
								<Covid />
							} />

							<Route path={Navigation_T.ACCOUNT} element={
								<Test />
							} />

						</Routes>

					</LastWeekCovidProvider>
					</TodayCovidProvider>
					</NextDayWeatherProvider>
					</NextHourWeatherProvider>
					</TodayWeatherProvider>
					</UserLocationProvider>
				</Scroll>
				<NavigationBar />
			</BrowserRouter>
		</div>
	);
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