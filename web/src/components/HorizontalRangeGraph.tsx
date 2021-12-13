import React from "react";
import styled from "styled-components";

interface BackGroundBar_P { height: number }
const BackGroundBar = styled.div<BackGroundBar_P>`
    width: 100%;
    height: ${({height}) => (height*window.devicePixelRatio)+"px"};
    /* height: 3px; */

    border: none;
    border-radius: 10rem;
    background: rgba(150, 150, 150, 0.5);

    display: flex;
    overflow: hidden;
`;

const RangeBar = styled.div`
    background: black;
    width: 50%;
    height: 100%;
    border-radius: 10rem;
`;

interface HorizonTalRangeGraph_P extends BackGroundBar_P {
    
}
export function HorizontalRangeGraph(props: HorizonTalRangeGraph_P) {
    const { ...rest } = props;

    return (
        <BackGroundBar {...rest}>
            <RangeBar />
        </BackGroundBar>
    )
}