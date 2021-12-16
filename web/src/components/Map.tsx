import React, { useEffect, useState } from "react";
import { Map as KakaoMap, Marker } from "react-kakao-maps";
import styled from "styled-components";
import { Location_latlon } from "../../../shared/Weather";


interface MapContainer_P { height: number }
const MapContainer = styled.div<MapContainer_P>`
    height: ${({height}) => height+"rem"};
    overflow: hidden;
    border-radius: 1rem;
`;

interface Map_P extends MapContainer_P {
    center: Location_latlon
}

export function Map(props: Map_P) {
    const { center, ...rest } = props;
    const [CenterCoords, setCenterCoords] = useState<daum.maps.LatLng>();

    useEffect(() => {
        setCenterCoords(new daum.maps.LatLng(center.lat, center.lon));
    }, []);

    return (
        <>
        {CenterCoords?
            <MapContainer {...rest}>
                <KakaoMap options={{center: CenterCoords, disableDoubleClick: true, disableDoubleClickZoom: true}}>
                    <Marker options={{position: CenterCoords}} />
                </KakaoMap>
            </MapContainer>:
            <span>위치를 찾을 수 없습니다.</span>
        }
        </>
    )
}