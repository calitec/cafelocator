import React from 'react'
import { Marker } from '@react-google-maps/api'
import { IMapDatasProps, IMapDetailProps } from '../../../types/map'
interface IGoogleMapsMarkersProps {
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
  zoom: number
  onClick: (v, i) => void
}
const GoogleMapsMarkers: React.FunctionComponent<IGoogleMapsMarkersProps> = ({
  mapDatas,
  mapInfo,
  zoom,
  onClick,
}) => {
  const { mapDetail, mapPosition, keyword, travel } = mapInfo 
  return (
    <>
      {/* current location marker*/}
      <Marker
        //@ts-ignore
        position={{ lat: mapPosition.lat, lng: mapPosition.lng }}
      >
        <div className="effective"></div>
      </Marker>
      {mapDatas &&
        keyword.length > 1 &&
        mapDatas.map((v, i) => {
          const { lat, lng } = v.geometry.location
          if(mapDetail?.place_id === v.place_id) {
            return(
              <div key={i}>
                <Marker
                  icon={{
                    url: './images/locator.png',
                    //@ts-ignore
                    size: new google.maps.Size(50, 57),
                    //@ts-ignore
                    labelOrigin: new google.maps.Point(9, 50),
                  }}
                  //@ts-ignore
                  animation={!travel && window.google.maps.Animation.BOUNCE}
                  position={{ lat, lng }}

                  label={{
                    className: 'markerLabels',
                    text: v.name,
                    color: 'black',
                    fontSize: zoom > 12 ? '12px' : '0px',
                    fontWeight: 'bold',
                    stroke: '5px white',
                  }}
                >
                  <div className="effective"></div>
                </Marker>
              </div>
            )
          }
          return (
            <div key={i}>
              {/* cluster markers */}
              <Marker
                icon={{
                  url: './images/locator.png',
                  //@ts-ignore
                  size: new google.maps.Size(50, 57),
                  //@ts-ignore
                  labelOrigin: new google.maps.Point(9, 50),
                }}
                key={i}
                clickable
                onClick={() => onClick(v, i)}
                position={{ lat, lng }}
                label={{
                  className: 'markerLabels',
                  text: v.name,
                  color: 'black',
                  fontSize: zoom > 12 ? '12px' : '0px',
                  fontWeight: 'bold',
                  stroke: '5px white',
                }}
              ></Marker>
            </div>
          )
        })}
    </>
  )
}

export default GoogleMapsMarkers
