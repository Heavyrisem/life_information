import React from 'react';

import {
	RiAccountCircleFill,
	RiAccountCircleLine,
	RiCloudFill,
	RiCloudLine,
	RiSurgicalMaskFill,
	RiSurgicalMaskLine,
} from 'react-icons/ri';
import { Link, useLocation } from 'react-router-dom';
import styled from 'styled-components';

import { Navigation_T } from '../Types/GlobalTypes';

const StyledNavigationBar = styled.div`
	width: 100vw;

	display: flex;
	background: white;

	position: sticky;
	padding: 0.3rem 1rem;
	box-sizing: border-box;
	bottom: 0rem;
	z-index: 999;
`;

const Href = styled(Link)`
	color: black;
	font-size: 2rem;
	margin: auto;
	display: flex;
`;

function NavigationBar() {
	const CurrentLocation = useLocation();

	return (
		<StyledNavigationBar>
			<Href to="/">{CurrentLocation.pathname === Navigation_T.WEATHER ? <RiCloudFill /> : <RiCloudLine />}</Href>
			<Href to="/covid">
				{CurrentLocation.pathname === Navigation_T.COVID ? <RiSurgicalMaskFill /> : <RiSurgicalMaskLine />}
			</Href>
			<Href to="/account">
				{CurrentLocation.pathname === Navigation_T.ACCOUNT ? <RiAccountCircleFill /> : <RiAccountCircleLine />}
			</Href>
		</StyledNavigationBar>
	);
}

export default NavigationBar;
