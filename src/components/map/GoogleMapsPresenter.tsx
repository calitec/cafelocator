/* global google */
import * as React from 'react'
import { useState, useRef } from 'react'
import {
  GoogleMap,
  DirectionsService,
  DirectionsRenderer,
  StandaloneSearchBox,
} from '@react-google-maps/api'
import { IGoogleMapOptionsProps, IMapDetailProps } from '../../types/map'
import { css } from '@emotion/react'
import Spin from '../common/Spin'
import useDeviceCheck from '../../lib/hooks/useDeviceCheck'
import media from '../../lib/styles/media'
import GoogleMapsMarkers from './utils/GoogleMapsMarkers'
import Button from '../common/Button'
import InfoTemplate from '../info/InfoTemplate'
import InfoListContainer from '../info/InfoListContainer'
import InfoDetailContainer from '../info/InfoDetailContainer'
import NavTemplate from '../nav/NavTemplate'
import MainTemplate from '../../components/common/MainTemplate'
import Input from '../common/Input'
import Auth from '../auth/Auth'

interface IGoogleMapsPresenterProps {
  mapInfo: {
    mapDatas: any
    currentPosition: {
      lat: number
      lng: number
    }
    mapPosition: {
      lat: number
      lng: number
    }
    mapDetail: IMapDetailProps
    travel: boolean
    directions: {}
  }
  directionsOptions: IGoogleMapOptionsProps
  isLoaded: boolean
  loadError: Error | undefined
  setMapInfo: (v) => void
  directionsCallback: (v) => void
  onPlacesChanged: () => void
  getMapDetail: (v) => void
  getCurrentLocation: () => void
}

const GoogleMapsPresenter: React.FunctionComponent<IGoogleMapsPresenterProps> = ({
  mapInfo,
  directionsOptions,
  isLoaded,
  loadError,
  setMapInfo,
  directionsCallback,
  onPlacesChanged,
  getCurrentLocation,
}) => {
  const { screenWidth } = useDeviceCheck()
  const [zoom] = useState(13)
  const mapRef = useRef(null)
  const mapOption = {
    fullscreenControl: false,
    disableDefaultUI: screenWidth <= 414 ? true : false,
  }
  const {
    currentPosition,
    mapPosition,
    mapDetail,
    directions,
    travel,
  } = mapInfo

  const renderMap = () => {
    //@ts-ignore
    const yourLocation = new google.maps.LatLngBounds(
      //@ts-ignore
      new google.maps.LatLng(mapPosition.lat, mapPosition.lng)
    )
    return (
      <GoogleMap
        ref={mapRef}
        mapContainerStyle={{
          width: '100%',
          height: `${window.innerHeight}px`,
        }}
        center={{ lat: currentPosition.lat, lng: currentPosition.lng }}
        zoom={13}
        options={mapOption}
      >
        <MainTemplate>
          <StandaloneSearchBox
            bounds={yourLocation}
            onPlacesChanged={onPlacesChanged}
          >
            <NavTemplate>
              <div css={searchFormWrapper}>
                <Input placeholder="주변 카페를 검색 해보세요" style={input} />
              </div>
              <Auth />
            </NavTemplate>
          </StandaloneSearchBox>
          <InfoTemplate>
            <InfoListContainer />
            <InfoDetailContainer />
          </InfoTemplate>
        </MainTemplate>

        {/* Child components, such as markers, info windows, etc. */}
        <div css={googleMapsContainer}>
          <div className="currentLocation" onClick={getCurrentLocation}>
            <Button type="button" aria-label="현재위치">
              <span></span>
            </Button>
          </div>
          {/* directions */}
          {mapDetail != null && travel ? (
            <>
              <DirectionsService
                options={{
                  origin: { lat: mapPosition.lat, lng: mapPosition.lng },
                  destination: mapDetail ? mapDetail.geometry?.location : '',
                  travelMode: 'TRANSIT',
                }}
                callback={directionsCallback}
              />
              <DirectionsRenderer
                directions={directions}
                options={directionsOptions}
              />
            </>
          ) : (
            ''
          )}
          <GoogleMapsMarkers
            mapInfo={mapInfo}
            zoom={zoom}
            setMapInfo={setMapInfo}
          />
        </div>
      </GoogleMap>
    )
  }
  if (loadError) return <div>Map cannot be loaded right now, sorry.</div>
  return isLoaded ? renderMap() : <Spin />
}

const googleMapsContainer = css`
  .currentLocation {
    position: absolute;
    top: 5%;
    right: 1.1%;
    width: 29px;
    height: 29px;
    ${media.large} {
      top: 10%;
      right: 2%;
    }
    button {
      width: 29px;
      height: 29px;
      border-radius: 8px;
      background: transparent;
      background-color: #fff;
      border: 0;
      box-shadow: 0 1px 4px rgb(0 0 0 / 30%);
      padding: 0;
      cursor: pointer;
      span {
        display: block;
        width: 18px;
        height: 18px;
        background: url('//maps.gstatic.com/tactile/mylocation/mylocation-sprite-2x.png');
        background-position: 0 0;
        background-size: 180px 18px;
        position: absolute;
        top: 50%;
        left: 50%;
        transform: translate(-50%, -50%);
      }
    }
  }
`
const searchFormWrapper = css`
  display: inline-block;
  position: relative;
  top: 2px;
  width: 85%;
  button {
    position: absolute;
    top: 50%;
    right: 5px;
    transform: translateY(-50%);
    border: 0;
    background-color: transparent;
    cursor: pointer;
    z-index: 2;
  }
`
const input = css`
  background: #000024;
  color: #fff;
  line-height: 32px;
  font-weight: 500;
  border-radius: 100px;
  text-indent: 5px;
  width: 100%;
`
export default GoogleMapsPresenter
