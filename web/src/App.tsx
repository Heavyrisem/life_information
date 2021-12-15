import React from 'react';
import logo from './logo.svg';
import './App.css';
import { Weather } from './Routes/Weather/Weather';
import styled from 'styled-components';

import { NextDayWeatherProvider, NextHourWeatherProvider } from './context/NextWeather';

const Scroll = styled.div`
	width: 100vw;
	height: 100vh;
	overflow: scroll;
	text-align: center;
`;

function App() {
	return (
		<Scroll>
			
            <NextHourWeatherProvider>
            <NextDayWeatherProvider>
				<Weather />
			</NextDayWeatherProvider>
			</NextHourWeatherProvider>

		</Scroll>
	);
}

export default App;
