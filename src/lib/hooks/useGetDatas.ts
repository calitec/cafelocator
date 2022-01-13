import React from 'react'
import { useMapState } from 'src/context/MapProvider'

const useGetDatas = () => {
  const { mapInfo } = useMapState()
  const { mapPosition, keyword } = mapInfo
  const url =
    process.env.NODE_ENV !== 'production'
      ? `http://localhost:3070/google/nearby?lat=${mapPosition.lat}&lng=${
          mapPosition.lng
        }&keyword=${encodeURIComponent(keyword.split(' ').join(''))}`
      : `https://cafelocator-server.herokuapp.com/google/nearby?lat=${
          mapPosition.lat
        }&lng=${mapPosition.lng}&keyword=${encodeURIComponent(
          keyword.split(' ').join('')
        )}`
  return url
}

export default useGetDatas
