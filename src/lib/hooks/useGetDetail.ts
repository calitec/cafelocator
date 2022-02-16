import { useCallback } from 'react'
import { useMapState } from '../../context/MapProvider'
import { IMapDatasProps } from '../../types/map'
import axios from 'axios'

export default function useGetDetail() {
  const { mapInfo, setMapInfo, onClearDirections } = useMapState()
  const onClick = useCallback(
    async (data: IMapDatasProps) => {
      try {
        onClearDirections()
        await axios
          .get(
            process.env.NODE_ENV !== 'production'
              ? `http://localhost:3070/google/detail?place_id=${data.place_id}`
              : `https://cafelocator-server.herokuapp.com/google/detail?place_id=${data.place_id}`
          )
          .then((res) =>
            setMapInfo((prev) => ({
              ...prev,
              vision: true,
              mapDetail: res.data,
              currentPosition: res.data.geometry.location,
            }))
          )
          .catch((error) => console.error(error))
      } catch {
        console.log('no datas')
      }
    },
    [mapInfo]
  )
  return { onClick }
}
