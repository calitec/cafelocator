/* global google */
import * as React from 'react'
import { useState, memo } from 'react'
import {
  GoogleMap,
  DirectionsService,
  DirectionsRenderer,
} from '@react-google-maps/api'
import {
  IGoogleMapOptionsProps,
  IMapDatasProps,
  IMapDetailProps,
} from '../../types/map'
import { css } from '@emotion/react'
import Spin from '../common/Spin'
import useDeviceCheck from '../../lib/hooks/useDeviceCheck'
import media from '../../lib/styles/media'
import GoogleMapsMarkers from './utils/GoogleMapsMarkers'

interface IGoogleMapsPresenterProps {
  mapDatas: IMapDatasProps[]
  mapInfo: {
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
    keyword: string
    directions: {}
  }
  directionsOptions: IGoogleMapOptionsProps
  isLoaded: boolean
  loadError: Error | undefined
  directionsCallback: (v) => void
  onLoad: (v) => void
  onClick: (v, i) => void
  getCurrentLocation: () => void
}

const GoogleMapsPresenter: React.FunctionComponent<
  IGoogleMapsPresenterProps
> = ({
  mapDatas,
  mapInfo,
  directionsOptions,
  isLoaded,
  loadError,
  directionsCallback,
  onLoad,
  onClick,
  getCurrentLocation,
}) => {
  const { screenWidth } = useDeviceCheck()
  const [zoom, setZoom] = useState(13)
  const mapOption = {
    fullscreenControl: false,
    disableDefaultUI: screenWidth <= 414 ? true : false,
  }
  const { currentPosition, mapPosition, mapDetail, directions, travel } =
    mapInfo

  function zoomChanged() {
    setZoom(this.getZoom())
  }

  const renderMap = () => {
    // wrapping to a function is useful in case you want to access `window.google`
    // to eg. setup options or create latLng object, it won't be available otherwise
    // feel free to render directly if you don't need that

    return (
      <GoogleMap
        mapContainerStyle={{
          width: '100%',
          height: `${window.innerHeight}px`,
        }}
        center={{ lat: currentPosition.lat, lng: currentPosition.lng }}
        zoom={13}
        onZoomChanged={zoomChanged}
        onLoad={onLoad}
        options={mapOption}
      >
        {/* Child components, such as markers, info windows, etc. */}
        <div css={googleMapsContainer}>
          <div className="currentLocation" onClick={getCurrentLocation}>
            <button type="button">
              <span></span>
            </button>
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
            mapDatas={mapDatas}
            mapInfo={mapInfo}
            zoom={zoom}
            onClick={onClick}
          />
        </div>
      </GoogleMap>
    )
  }
  if (loadError) {
    return <div>Map cannot be loaded right now, sorry.</div>
  }
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

export default memo(GoogleMapsPresenter)
