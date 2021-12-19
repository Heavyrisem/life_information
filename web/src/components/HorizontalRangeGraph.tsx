import React, { useEffect, useState } from "react";
import styled from "styled-components";

interface BackGroundBar_P { height: number }
const BackGroundBar = styled.div<BackGroundBar_P>`
    width: 100%;
    height: ${({height}) => (height*window.devicePixelRatio)+"px"};
    /* height: 3px; */

    border: none;
    border-radius: 10rem;
    background: rgba(200, 200, 200, 0.1);

    display: flex;
    overflow: hidden;
`;

interface RangeBar_P { width: number, left: number }
const RangeBar = styled.div<RangeBar_P>`
    width: ${({width}) => width+"%"};
    margin-left: ${({left}) => left+"%"};
    background: white;
    height: 100%;
    border-radius: 10rem;
`;

interface Cursor_P { left: number, size: number }
const Cursor = styled.div<Cursor_P>`
    height: ${({size}) => (size*window.devicePixelRatio)+"px"};
    width: ${({size}) => (size*window.devicePixelRatio)+"px"};
    border-radius: 10rem;
    /* border: solid 1px rgba(150, 150, 150, 0.9); */
    box-sizing: border-box;
    /* padding-left: 100%; */
    background: rgba(0, 0, 0, 0.2);
    margin-left: ${({left}) => left+"%"};
    /* padding-bottom: ${({left}) => left+"%"}; */
`;

interface HorizonTalRangeGraphData {
    min: number
    max: number
    range: {
        min: number
        max: number
    }
}

interface HorizonTalRangeGraph_P extends BackGroundBar_P {
    data: HorizonTalRangeGraphData
}
export function HorizontalRangeGraph(props: HorizonTalRangeGraph_P) {
    const { height, data, ...rest } = props;

    return (
        <BackGroundBar height={height} {...rest}>
            <RangeBar width={(data.max - data.min) / (data.range.max - data.range.min) * 100} left={Math.abs((data.range.min - data.min) / (data.range.max - data.range.min) * 100)}>
                {/* {data.current&& <Cursor left={(data.max - data.current) / (data.max - data.min) * 100} size={height} />} */}
            </RangeBar>
        </BackGroundBar>
    )
}