import { useMapContext } from '../../context/MapProvider'
import haversine from 'haversine'
import useTouch from '../../lib/hooks/useTouch'
import InfoListPresenter from './InfoListPresenter'
import useGetDetail from '../../lib/hooks/useGetDetail'

function haversined(mapPosition, value) {
  console.log(value)
  return (
    Math.round(
      haversine(
        {
          latitude: mapPosition.lat,
          longitude: mapPosition.lng,
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
