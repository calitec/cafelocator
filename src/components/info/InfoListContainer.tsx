import * as React from 'react'
import { Suspense, lazy } from 'react'
import { useMapState } from '../../context/MapProvider'
import haversine from 'haversine'
import Loader from '../common/Loader'
const InfoListPresenter = lazy(() => import('./InfoListPresenter'))

const InfoListContainer: React.FunctionComponent = () => {
  const { mapInfo, onClick } = useMapState()
  const { mapPosition, mapDatas } = mapInfo

  function haversined(mapPosition, value) {
    return (
      Math.round(
        haversine(
          {
            latitude: mapPosition.lat,
            longitude: mapPosition.lng,
          },
          {
            latitude: value?.geometry.location.lat,
            longitude: value?.geometry.location.lng,
          }
        ) * 100
      ) / 100
    )
  }

  return (
    <Suspense fallback={<Loader />}>
      <InfoListPresenter
        mapPosition={mapPosition}
        mapDatas={mapDatas}
        onClick={onClick}
        haversined={haversined}
      />
    </Suspense>
  )
}

export default InfoListContainer
