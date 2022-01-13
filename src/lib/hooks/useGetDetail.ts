import React from 'react'
import { useCallback } from 'react'
import { useMapState } from 'src/context/MapProvider'
import { IMapDatasProps } from 'src/types/map'
import axios from 'axios'

const useGetDetail = () => {
  const { mapInfo, setMapInfo } = useMapState()
  const { mapDetail } = mapInfo
  const onClick = useCallback(
    async (data: IMapDatasProps) => {
      try {
        setMapInfo({
          ...mapInfo,
          vision: true,
        })
        await axios
          .get(
            process.env.NODE_ENV !== 'production'
              ? `http://localhost:3070/google/detail?place_id=${data.place_id}`
              : `https://cafelocator-server.herokuapp.com/google/detail?place_id=${data.place_id}`
          )
          .then((res) =>
            setMapInfo({
              ...mapInfo,
              mapDetail: res.data,
            })
          )
          .catch((error) => console.error(error))
      } catch {
        console.log('no datas')
      }
    },
    [mapDetail, mapInfo]
  )
  return { onClick }
}

export default useGetDetail
