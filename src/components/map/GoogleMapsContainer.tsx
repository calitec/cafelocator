import * as React from 'react'
import { useCallback } from 'react'
import GoogleMapsPresenter from './GoogleMapsPresenter'
import { StandaloneSearchBox, useLoadScript } from '@react-google-maps/api'
import { useMapContext } from '../../context/MapProvider'
import Geocode from 'react-geocode'
import useGetDetail from '../../lib/hooks/useGetDetail'
import Nav from '../common/Nav'
import MainTemplate from '../common/MainTemplate'
import InfoTemplate from '../info/InfoTemplate'
import InfoListContainer from '../info/InfoListContainer'
import InfoDetailContainer from '../info/InfoDetailContainer'
import { Libraries } from '../../types/map'

Geocode.setApiKey(process.env.REACT_APP_API_KEY)
Geocode.enableDebug()

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
    setMapInfo((prev) => ({ ...prev, mapDatas: mapDatas, loading: true }))
  }

  function renderInfoView() {
    //@ts-ignore
    const yourLocation = new google.maps.LatLngBounds(
      //@ts-ignore
      new google.maps.LatLng(mapPosition.lat, mapPosition.lng)
    )
    return (
      <MainTemplate>
        <StandaloneSearchBox
          bounds={yourLocation}
          onPlacesChanged={onPlacesChanged}
        >
          <Nav />
        </StandaloneSearchBox>
        <InfoTemplate>
          <InfoListContainer />
          <InfoDetailContainer />
        </InfoTemplate>
      </MainTemplate>
    )
  }

  return (
    <>
      <GoogleMapsPresenter
        mapInfo={mapInfo}
        isLoaded={isLoaded}
        loadError={loadError}
        setMapInfo={setMapInfo}
        getMapDetail={getMapDetail}
        getCurrentLocation={getCurrentLocation}
        directionsCallback={directionsCallback}
        renderInfoView={renderInfoView}
      />
    </>
  )
}

export default GoogleMapsContainer
