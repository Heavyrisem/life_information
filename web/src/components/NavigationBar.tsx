import React from 'react';

import {
	RiAccountCircleFill,
	RiAccountCircleLine,
	RiCloudFill,
	RiCloudLine,
	RiSurgicalMaskFill,
	RiSurgicalMaskLine,
} from 'react-icons/ri';
import { Link } from 'react-router-dom';
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

function NavigationBar() {
	const IconStyle: React.CSSProperties = {
		color: 'black',
		fontSize: '2rem',
		margin: 'auto',
		display: 'flex',
	};

	return (
		<StyledNavigationBar>
			<Link to="/" style={IconStyle}>
				{window.location.pathname === Navigation_T.WEATHER ? <RiCloudFill /> : <RiCloudLine />}
			</Link>
			<Link to="/covid" style={IconStyle}>
				{window.location.pathname === Navigation_T.COVID ? <RiSurgicalMaskFill /> : <RiSurgicalMaskLine />}
			</Link>
			<Link to="/account" style={IconStyle}>
				{window.location.pathname === Navigation_T.ACCOUNT ? <RiAccountCircleFill /> : <RiAccountCircleLine />}
			</Link>
		</StyledNavigationBar>
	);
}

export default NavigationBar;
