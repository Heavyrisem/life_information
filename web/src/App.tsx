import React from 'react';
import logo from './logo.svg';
import './App.css';
import { Weather } from './Routes/Weather/Weather';
import styled from 'styled-components';

import { NextDayWeatherProvider, NextHourWeatherProvider } from './context/NextWeather';
import { UserLocationProvider } from './context/User';
import NavigationBar from './components/NavigationBar';
import { VerticalContainer } from './components/Elements';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import { Navigation_T } from './Types/GlobalTypes';

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
	
						<Routes>

							<Route path={Navigation_T.WEATHER} element={
								<NextHourWeatherProvider>
								<NextDayWeatherProvider>
									<Weather />
								</NextDayWeatherProvider>
								</NextHourWeatherProvider>
							}>
							</Route>

							

						</Routes>
	
					</UserLocationProvider>
				</Scroll>
				<NavigationBar />
			</BrowserRouter>
		</div>
	);
}

export default App;
