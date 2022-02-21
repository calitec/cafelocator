import * as React from 'react'
import { useCallback } from 'react'
import GoogleMapsPresenter from './GoogleMapsPresenter'
import { useLoadScript } from '@react-google-maps/api'
import { useMapContext } from '../../context/MapProvider'
import Geocode from 'react-geocode'
import useGetDetail from '../../lib/hooks/useGetDetail'

Geocode.setApiKey(process.env.REACT_APP_API_KEY)
Geocode.enableDebug()
type Libraries =
  | 'drawing'
  | 'geometry'
  | 'localContext'
  | 'places'
  | 'visualization'
const libraries: Libraries[] = ['places']
const GoogleMapsContainer: React.FunctionComponent = () => {
  const { mapInfo, setMapInfo, getCurrentLocation } = useMapContext()
  const { mapPosition, directions } = mapInfo
  const { getMapDetail } = useGetDetail()
  const { isLoaded, loadError } = useLoadScript({
    id: 'c2e1bb32e1c03c5c',
    googleMapsApiKey: process.env.REACT_APP_API_KEY,
    libraries,
    preventGoogleFontsLoading: false,
  })

  const directionsCallback = useCallback(
    (response) => {
      if (response !== null && directions == null) {
        if (response.status === 'OK') {
          setMapInfo((prev) => ({ ...prev, directions: response }))
        }
      }
    },
    [directions]
  )

  function onPlacesChanged() {
    const mapDatas = this.getPlaces()
    setMapInfo((prev) => ({ ...prev, loading: true }))
    setMapInfo((prev) => ({ ...prev, mapDatas }))
  }

  // 디렉션 옵션
  const directionsOptions = {
    polylineOptions: {
      strokeColor: 'green',
      strokeWeight: '4',
      strokeOpacity: '0.99',
    },
    zoomControlOptions: {
      position: {
        lat: mapPosition.lat,
        lng: mapPosition.lng,
      },
    },
  }

  return (
    <>
      <GoogleMapsPresenter
        mapInfo={mapInfo}
        directionsOptions={directionsOptions}
        isLoaded={isLoaded}
        loadError={loadError}
        setMapInfo={setMapInfo}
        directionsCallback={directionsCallback}
        onPlacesChanged={onPlacesChanged}
        getMapDetail={getMapDetail}
        getCurrentLocation={getCurrentLocation}
      />
    </>
  )
}

export default GoogleMapsContainer
