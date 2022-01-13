import * as React from 'react'
import { useEffect, useCallback, memo } from 'react'
import GoogleMapsPresenter from './GoogleMapsPresenter'
import { useLoadScript } from '@react-google-maps/api'
import { useMapState } from '../../context/MapProvider'
import useDeviceCheck from '../../lib/hooks/useDeviceCheck'
import useGetDatas from 'src/lib/hooks/useGetDatas'
import useSWR from 'swr'
import { fetcher } from 'src/lib/fetcher'
import Geocode from 'react-geocode'
import useGetDetail from 'src/lib/hooks/useGetDetail'

Geocode.setApiKey(process.env.REACT_APP_API_KEY)
Geocode.enableDebug()

const GoogleMapsContainer: React.FunctionComponent = () => {
  const { mapInfo, setMapInfo, getCurrentLocation } = useMapState()
  const {
    currentPosition,
    mapPosition,
    mapDetail,
    directions,
    travel,
    keyword,
  } = mapInfo
  const { onClick } = useGetDetail()
  const url = useGetDatas()
  const { data, error } = useSWR(url, fetcher)

  const { isLoaded, loadError } = useLoadScript({
    id: 'c2e1bb32e1c03c5c',
    googleMapsApiKey: process.env.REACT_APP_API_KEY,
  })

  // 디렉션 옵션
  const directionsOptions = {
    polylineOptions: {
      strokeColor: 'green',
      strokeWeight: '4',
      strokeOpacity: '1',
    },
    zoomControlOptions: {
      position: {
        lat: mapPosition.lat,
        lng: mapPosition.lng,
      },
    },
  }

  const directionsCallback = useCallback(
    (response) => {
      // console.log(response,'response')
      if (response !== null && directions == null) {
        if (response.status === 'OK') {
          setMapInfo({ ...mapInfo, directions: response })
        }
      }
    },
    [directions]
  )

  const onLoad = (map) => {
    // console.log(mapInstance, 'mapInstance')
  }

  return (
    <>
      <GoogleMapsPresenter
        currentPosition={currentPosition}
        mapPosition={mapPosition}
        mapDatas={data}
        mapDetail={mapDetail}
        keyword={keyword}
        directions={directions}
        directionsOptions={directionsOptions}
        travel={travel}
        isLoaded={isLoaded}
        loadError={loadError}
        directionsCallback={directionsCallback}
        onLoad={onLoad}
        onClick={onClick}
        getCurrentLocation={getCurrentLocation}
      />
    </>
  )
}

export default memo(GoogleMapsContainer)
