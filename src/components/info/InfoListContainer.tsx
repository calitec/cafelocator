import { useMapState } from '../../context/MapProvider'
import haversine from 'haversine'
import useTouch from '../../lib/hooks/useTouch'
import useSWR from 'swr'
import { fetcher } from '../../lib/fetcher'
import InfoListPresenter from './InfoListPresenter'
import useGetDatas from '../../lib/hooks/useGetDatas'
import useGetDetail from '../../lib/hooks/useGetDetail'

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
const InfoListContainer: React.FunctionComponent = () => {
  const { infoPosition } = useTouch()
  const { transY } = infoPosition
  const { mapInfo } = useMapState()
  const { mapPosition, keyword } = mapInfo
  const url = useGetDatas()
  const { onClick } = useGetDetail()
  const { data } = useSWR(url, fetcher, { suspense: true })

  return (
    <InfoListPresenter
      mapPosition={mapPosition}
      mapDatas={data}
      keyword={keyword}
      transY={transY}
      onClick={onClick}
      haversined={haversined}
    />
  )
}

export default InfoListContainer
