import React from 'react';

import './App.css';

import { BrowserRouter, Route, Routes } from 'react-router-dom';
import styled from 'styled-components';

import NavigationBar from './components/NavigationBar';
import ServiceContextProvider from './context/ServiceContextProvider';
import Account from './Routes/Account/Account';
import Covid from './Routes/Covid/Covid';
import Weather from './Routes/Weather/Weather';
import { Navigation_T } from './Types/GlobalTypes';

const Scroll = styled.div`
	width: 100vw;
	height: 100vh;
	overflow: scroll;
	text-align: center;
`;

function App() {
	return (
		<BrowserRouter>
			<Scroll>
				<ServiceContextProvider>
					<Routes>
						<Route path={Navigation_T.WEATHER} element={<Weather />} />

						<Route path={Navigation_T.COVID} element={<Covid />} />

						<Route path={Navigation_T.ACCOUNT} element={<Account />} />
					</Routes>
				</ServiceContextProvider>
			</Scroll>
			<NavigationBar />
		</BrowserRouter>
	);
}

export default App;
