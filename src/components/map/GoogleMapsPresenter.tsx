/* global google */
import * as React from 'react'
import { useState, memo, useMemo } from 'react'
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
import { useMapState } from '../../context/MapProvider'
import GoogleMapsMarkers from './utils/GoogleMapsMarkers'

interface IGoogleMapsPresenterProps {
  initialPosition: {
    lat: number
    lng: number
  }
  mapPosition: {
    lat: number
    lng: number
  }
  mapDatas: IMapDatasProps[]
  mapDetail: IMapDetailProps
  directions: {}
  directionsOptions: IGoogleMapOptionsProps
  directionsCallback: (v) => void
  isLoaded: boolean
  loadError: Error | undefined
  onLoad: (v) => void
  onClick: (v, i) => void
  getCurrentLocation: () => void
}

const GoogleMapsPresenter: React.FunctionComponent<
  IGoogleMapsPresenterProps
> = ({
  initialPosition,
  mapPosition,
  mapDatas,
  mapDetail,
  directions,
  directionsOptions,
  directionsCallback,
  isLoaded,
  loadError,
  onLoad,
  onClick,
  getCurrentLocation,
}) => {
  // console.log('GOOGLE MAP 프레젠터 렌더링')
  // useEffect(() => {
  //     console.log('GOOGLE MAP 프레젠터 리렌더링')
  // }, [])

  const { screenWidth } = useDeviceCheck()
  const [zoom, setZoom] = useState(13)
  const { mapInfo } = useMapState()
  const { travel } = mapInfo
  const mapOption = {
    fullscreenControl: false,
    disableDefaultUI: screenWidth <= 414 ? true : false,
  }
  function zoomChanged() {
    setZoom(this.getZoom())
  }

  // const setMarkers = () => {
  //     return mapDatas.map((v, i) => {
  //         const { lat, lng } = v.geometry.location;
  //         return (
  //             <div key={i}>
  //                 {/* current location marker*/}
  //                 <Marker
  //                     //@ts-ignore
  //                     animation={window.google.maps.Animation.BOUNCE}
  //                     position={{ lat: mapPosition.lat, lng: mapPosition.lng }}
  //                 >
  //                     <div className='effective'></div>
  //                 </Marker>
  //                 {/* cluster markers */}
  //                 {
  //                     <Marker
  //                         icon={{
  //                             url: './images/locator.png',
  //                             //@ts-ignore
  //                             size: new google.maps.Size(50, 57),
  //                             //@ts-ignore
  //                             labelOrigin: new google.maps.Point(9, 50),
  //                         }}
  //                         key={i}
  //                         clickable
  //                         onClick={() => onClick(v, i)}
  //                         position={{ lat, lng }}
  //                         label={{
  //                             className: 'markerLabels',
  //                             text: v.name,
  //                             color: 'black',
  //                             fontSize: zoom > 12 ? '12px' : '0px',
  //                             fontWeight: 'bold',
  //                             stroke: '5px white'
  //                         }}
  //                     >
  //                     </Marker>
  //                 }
  //             </div>
  //         )
  //     })
  // }

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
        center={{ lat: initialPosition.lat, lng: initialPosition.lng }}
        zoom={13}
        onZoomChanged={zoomChanged}
        onLoad={onLoad}
        options={mapOption}
      >
        {/* Child components, such as markers, info windows, etc. */}
        <div css={googleMapsContainer}>
          <div className="currentLocation" onClick={getCurrentLocation}>
            <button>
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

          {mapDatas.length > 1 && (
            <GoogleMapsMarkers
              mapDatas={mapDatas}
              mapPosition={mapPosition}
              zoom={zoom}
              onClick={onClick}
            />
          )}
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
