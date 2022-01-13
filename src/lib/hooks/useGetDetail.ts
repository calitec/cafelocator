import React from 'react'
import { useCallback } from 'react'
import { useMapState } from 'src/context/MapProvider'
import { IMapDatasProps } from 'src/types/map'
import { useCoreState } from '../../context/CoreProvider'
import axios from 'axios'
import useTouch from './useTouch'

const useGetDetail = () => {
  const { mapInfo, setMapInfo } = useMapState()
  const { mapDetail } = mapInfo
  const onClick = useCallback(
    async (data: IMapDatasProps) => {
      try {
        // setVision(true)
        setMapInfo((prev) => ({
          ...prev,
          vision: true,
        }))
        await axios
          .get(
            process.env.NODE_ENV !== 'production'
              ? `http://localhost:3070/google/detail?place_id=${data.place_id}`
              : `https://cafelocator-server.herokuapp.com/google/detail?place_id=${data.place_id}`
          )
          .then((res) =>
            setMapInfo((prev) => ({
              ...prev,
              mapDetail: res.data,
            }))
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
