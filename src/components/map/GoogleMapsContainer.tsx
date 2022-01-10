import * as React from 'react';
import { useEffect, useCallback, memo } from 'react';
import Geocode from "react-geocode";
import GoogleMapsPresenter from './GoogleMapsPresenter';
import { useLoadScript } from '@react-google-maps/api';
import { useMapState } from '../../context/MapProvider';
import useDeviceCheck from '../../lib/hooks/useDeviceCheck';

Geocode.setApiKey(process.env.REACT_APP_API_KEY);
Geocode.enableDebug();

const GoogleMapsContainer: React.FunctionComponent = () => {

    const {
        mapInfo,
        setMapInfo,
        onClick
    } = useMapState();
    const {
        initialPosition,
        mapPosition,
        mapDatas,
        mapDetail,
        directions,
     } = mapInfo
    const setInitialPosition = (value) => setMapInfo(prev => ({...prev, initialPosition: value }));
    const setMapPosition = (value) => setMapInfo(prev => ({...prev, mapPosition: value }));
    const setDirections = (value) => setMapInfo(prev => ({...prev,  directions: value }));
    const { screenHeight } = useDeviceCheck();

    // console.log('GOOGLE MAP 컨테이너 렌더링')
    // useEffect(() => {
    //     console.log('GOOGLE MAP 컨테이너 리렌더링')
    // }, [])

    // 맵 초기화
    useEffect(() => {
        if (mapPosition.lat < 1) {
            if (navigator.geolocation) {
                navigator.geolocation.getCurrentPosition(position => {
                    setInitialPosition({
                        lat: position.coords.latitude,
                        lng: position.coords.longitude
                    })
                    setMapPosition({
                        lat: position.coords.latitude,
                        lng: position.coords.longitude
                    })
                })
            }
        }

    }, [initialPosition, mapPosition])

    const getCurrentLocation = useCallback(() => {
        if (navigator.geolocation) {
            navigator.geolocation.getCurrentPosition(position => {
                setInitialPosition({
                    lat: screenHeight > 812
                        ? position.coords.latitude
                        : position.coords.latitude - 0.0150,
                    lng: position.coords.longitude
                })
            })
        }
    }, [initialPosition])

    // 디렉션 옵션
    const directionsOptions = {
        polylineOptions: {
            strokeColor: "green",
            strokeWeight: "4",
            strokeOpacity: "1"
        },
        zoomControlOptions: {
            position: {
                lat: mapPosition.lat,
                lng: mapPosition.lng
            }
        }
    }

    const { isLoaded, loadError } = useLoadScript({
        id: 'c2e1bb32e1c03c5c',
        googleMapsApiKey: process.env.REACT_APP_API_KEY,
    })

    const onLoad = useCallback((map) => {
        // console.log(mapInstance, 'mapInstance')
    }, [])

    const directionsCallback = useCallback((response) => {
        // console.log(response,'response')
        if (response !== null && directions == null) {
            if (response.status === 'OK') {
                setDirections(response);
            }
        }
    }, [directions])

    return (
        <>
            <GoogleMapsPresenter
                initialPosition={initialPosition}
                mapPosition={mapPosition}
                mapDatas={mapDatas}
                mapDetail={mapDetail}
                directions={directions}
                directionsOptions={directionsOptions}
                directionsCallback={directionsCallback}
                isLoaded={isLoaded}
                loadError={loadError}
                onLoad={onLoad}
                onClick={onClick}
                getCurrentLocation={getCurrentLocation}
            />
        </>
    );
};


export default memo(GoogleMapsContainer);