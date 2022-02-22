import * as React from 'react'
import { Marker } from '@react-google-maps/api'
import { IMapDetailProps } from '../../types/map'
import { useVisionContext } from 'src/context/VisionProvider'
import useGetDetail from 'src/lib/hooks/useGetDetail'
interface IGoogleMapsMarkersProps {
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
  zoom: number
  setMapInfo: (v) => void
}
const GoogleMapsMarkers: React.FunctionComponent<IGoogleMapsMarkersProps> = ({
  mapInfo,
  zoom,
}) => {
  const { mapDatas, mapDetail, currentPosition, travel } = mapInfo
  const { setVision } = useVisionContext()
  const { getMapDetail } = useGetDetail()

  return (
    <>
      {/* current location marker*/}
      <Marker position={{ lat: currentPosition.lat, lng: currentPosition.lng }}>
        <div className="effective"></div>
      </Marker>

      {/* markers */}
      {mapDatas?.map((v, i) => {
        const { lat, lng } = v.geometry.location
        if (mapDetail?.place_id === v.place_id) {
          return (
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
                animation={!travel && google.maps.Animation.BOUNCE}
                position={{ lat: lat(), lng: lng() }}
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
              onClick={() => {
                setVision(true)
                getMapDetail(v)
              }}
              position={{ lat: lat(), lng: lng() }}
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
