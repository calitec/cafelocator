import * as React from 'react'
import { Suspense, lazy } from 'react'
import useTouch from 'src/lib/hooks/useTouch'
import { useMapState } from '../../context/MapProvider'
import Loader from '../common/Loader'
const InfoDetailPresenter = lazy(() => import('./InfoDetailPresenter'))

const InfoDetailContainer: React.FunctionComponent = ({}) => {
  const { mapInfo, setMapInfo, onClearDirections } = useMapState()
  const { mapDetail } = mapInfo
  const { infoPosition } = useTouch()
  const { transY } = infoPosition
  const setTravel = () => setMapInfo((prev) => ({ ...prev, travel: true }))

  return (
    <>
      <Suspense fallback={<Loader />}>
        <InfoDetailPresenter
          mapDetail={mapDetail}
          onClearDirections={onClearDirections}
          setTravel={setTravel}
          transY={transY}
        />
      </Suspense>
    </>
  )
}

export default InfoDetailContainer
