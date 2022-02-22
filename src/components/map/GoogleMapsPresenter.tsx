/* global google */
import * as React from 'react'
import { useState, useRef } from 'react'
import {
  GoogleMap,
  DirectionsService,
  DirectionsRenderer,
} from '@react-google-maps/api'
import { IMapDatasProps, IMapDetailProps } from '../../types/map'
import { css } from '@emotion/react'
import Spin from '../common/Spin'
import useDeviceCheck from '../../lib/hooks/useDeviceCheck'
import media from '../../lib/styles/media'
import GoogleMapsMarkers from './GoogleMapsMarkers'
import Button from '../common/Button'

interface IGoogleMapsPresenterProps {
  mapInfo: {
    mapDatas: IMapDatasProps[]
    currentPosition: {
      lat: number
      lng: number
    }
    mapPosition: {
      lat: number
      lng: number
    }
    mapDetail: IMapDetailProps
    directions: object
    travel: boolean
    loading: boolean
  }
  isLoaded: boolean
  loadError: Error | undefined
  setMapInfo: (v) => void
  directionsCallback: (v) => void
  getMapDetail: (v) => void
  getCurrentLocation: () => void
  renderInfoView: () => void
}

const GoogleMapsPresenter: React.FunctionComponent<IGoogleMapsPresenterProps> = ({
  mapInfo,
  isLoaded,
  loadError,
  setMapInfo,
  directionsCallback,
  getCurrentLocation,
  renderInfoView,
}) => {
  const {
    mapPosition,
    mapDetail,
    directions,
    travel,
    currentPosition,
    loading,
  } = mapInfo

  const { screenWidth } = useDeviceCheck()
  const [zoom] = useState(13)
  const mapRef = useRef(null)

  // 맵 옵션
  const mapOption = {
    fullscreenControl: false,
    disableDefaultUI: screenWidth <= 414 ? true : false,
  }

  // 맵 컨테이너 스타일
  const mapContainerStyle = {
    width: '100%',
    height: `${window.innerHeight}px`,
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

  const renderMap = () => {
    return (
      <GoogleMap
        ref={mapRef}
        mapContainerStyle={mapContainerStyle}
        center={{ lat: mapPosition.lat, lng: mapPosition.lng }}
        options={mapOption}
        zoom={13}
      >
        {/* 인포메이션 뷰 */}
        {renderInfoView()}

        {/* Child components, such as markers, info windows, etc. */}
        <div css={googleMapsContainer}>
          <div className="currentLocation" onClick={getCurrentLocation}>
            {loading ? (
              <Spin />
            ) : (
              <Button type="button" aria-label="현재위치">
                <span></span>
              </Button>
            )}
          </div>

          {/* directions */}
          {mapDetail !== null && travel && (
            <>
              <DirectionsService
                options={{
                  origin: {
                    lat: currentPosition.lat,
                    lng: currentPosition.lng,
                  },
                  destination: mapDetail?.geometry?.location,
                  travelMode: 'TRANSIT',
                }}
                callback={directionsCallback}
              />
              <DirectionsRenderer
                directions={directions}
                options={directionsOptions}
              />
            </>
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

export default GoogleMapsPresenter
