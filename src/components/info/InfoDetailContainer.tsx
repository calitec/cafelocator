import * as React from 'react'
import useTouch from 'src/lib/hooks/useTouch'
import { useMapState } from '../../context/MapProvider'
import InfoDetailPresenter from './InfoDetailPresenter'

const InfoDetailContainer: React.FunctionComponent = () => {
  const { mapInfo, setMapInfo, onClearDirections } = useMapState()
  const { mapDetail } = mapInfo
  const { infoPosition } = useTouch()
  const { transY } = infoPosition
  const setTravel = () => setMapInfo((prev) => ({ ...prev, travel: true }))

  return (
    <>
      <InfoDetailPresenter
        mapDetail={mapDetail}
        onClearDirections={onClearDirections}
        setTravel={setTravel}
        transY={transY}
      />
    </>
  )
}

export default InfoDetailContainer
