import React, { useEffect, useState } from "react";
import { Map as KakaoMap, Marker } from "react-kakao-maps";
import styled from "styled-components";


interface MapContainer_P { height: number }
const MapContainer = styled.div<MapContainer_P>`
    height: ${({height}) => height+"rem"};
    overflow: hidden;
    border-radius: 1rem;
`;

interface Map_P extends MapContainer_P {
    
}

export function Map(props: Map_P) {
    const { ...rest } = props;

    const [UserLatLon, setUserLatLon] = useState<daum.maps.LatLng>();

    useEffect(() => {
        const watchID = navigator.geolocation.watchPosition(Pos => {
            setUserLatLon(new daum.maps.LatLng(Pos.coords.latitude, Pos.coords.longitude));
            console.log(Pos.coords.latitude, Pos.coords.longitude);
        });

        return () => {
            navigator.geolocation.clearWatch(watchID);
        }
    }, []);

    return (
        <>
        {UserLatLon?
            <MapContainer {...rest}>
                <KakaoMap options={{center: UserLatLon, disableDoubleClick: true, disableDoubleClickZoom: true}}>
                    <Marker options={{position: UserLatLon}} />
                </KakaoMap>
            </MapContainer>:
            <span>위치를 찾을 수 없습니다.</span>
        }
        </>
    )
}