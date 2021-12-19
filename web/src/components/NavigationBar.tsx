import React from "react";
import styled from "styled-components";

import { TiWeatherCloudy } from "react-icons/ti";
import { RiAccountCircleFill, RiAccountCircleLine, RiCloudFill, RiCloudLine, RiSurgicalMaskFill, RiSurgicalMaskLine } from "react-icons/ri";
import { Link, useNavigate } from "react-router-dom";
import { Navigation_T } from "../Types/GlobalTypes";

const StyledNavigationBar = styled.div`
    width: 100vw;
    /* height: 5rem; */

    display: flex;
    background: white;

    /* border-radius: 10rem; */
    /* margin: auto; */
    /* margin-bottom: 1rem; */

    position: sticky;
    padding: .3rem 1rem;
    box-sizing: border-box;
    bottom: 0rem;
    z-index: 999;
`;

function NavigationBar() {
    const navigate = useNavigate();
    const IconStyle: React.CSSProperties = {
        color: 'black',
        fontSize: '2rem',
        margin: 'auto',
        display: 'flex'
    }

    return (
        <StyledNavigationBar>
            <Link to="/" style={IconStyle}>
                {window.location.pathname===Navigation_T.WEATHER?
                    <RiCloudFill />:
                    <RiCloudLine />
                }
            </Link>
            <Link to="/covid" style={IconStyle}>
                {window.location.pathname===Navigation_T.COVID?
                    <RiSurgicalMaskFill />:
                    <RiSurgicalMaskLine />
                }
            </Link>
            <Link to="/account" style={IconStyle}>
                {window.location.pathname===Navigation_T.ACCOUNT?
                    <RiAccountCircleFill />:
                    <RiAccountCircleLine />
                }
            </Link>
        </StyledNavigationBar>
    )
}

export default NavigationBar;