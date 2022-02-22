import { useMapContext } from '../../context/MapProvider'
import haversine from 'haversine'
import useTouch from '../../lib/hooks/useTouch'
import InfoListPresenter from './InfoListPresenter'
import useGetDetail from '../../lib/hooks/useGetDetail'

function haversined(currentPosition, value) {
  return (
    Math.round(
      haversine(
        {
          latitude: currentPosition.lat,
          longitude: currentPosition.lng,
        },
        {
          latitude: value?.geometry.location.lat(),
          longitude: value?.geometry.location.lng(),
        }
      ) * 100
    ) / 100
  )
}
const InfoListContainer: React.FunctionComponent = () => {
  const { infoPosition } = useTouch()
  const { transY } = infoPosition
  const { mapInfo } = useMapContext()
  const { getMapDetail } = useGetDetail()

  return (
    <InfoListPresenter
      mapInfo={mapInfo}
      transY={transY}
      getMapDetail={getMapDetail}
      haversined={haversined}
    />
  )
}

export default InfoListContainer
