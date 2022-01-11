import * as React from 'react'
import {
  useCallback,
  createContext,
  useState,
  useContext,
  useEffect,
} from 'react'
import { IMapDatasProps, IMapDetailProps } from '../types/map'
import { useCoreState } from './CoreProvider'
import axios from 'axios'

interface State {
  mapInfo: {
    initialPosition: { lat: number; lng: number }
    mapPosition: { lat: number; lng: number }
    directions: object
    travel: boolean
    mapDatas: IMapDatasProps[]
    mapDetail: IMapDetailProps
    loading: boolean
  }
  setMapInfo: (data: object) => void
  onClick: (data: object, i: number) => void
  onClearDirections: () => void
  onReset: () => void
}

export const MapStateContext = createContext<State | null>(null)

const MapProvider: React.FunctionComponent = ({ children }) => {
  const [mapInfo, setMapInfo] = useState({
    initialPosition: { lat: 0, lng: 0 },
    mapPosition: { lat: 0, lng: 0 },
    mapDatas: [],
    mapDetail: null,
    directions: null,
    travel: false,
    loading: false,
  })
  const { mapDetail } = mapInfo
  const { vision, setVision } = useCoreState()

  // 클릭 후 위치조정
  useEffect(() => {
    if (mapDetail) {
      setMapInfo({
        ...mapInfo,
        initialPosition: {
          lat: mapDetail?.geometry.location.lat,
          lng: mapDetail?.geometry.location.lng,
        },
      })
    }
  }, [mapDetail])

  // 마커/디테일 클릭/오버 api 요청
  const onClick = useCallback(
    async (data: IMapDatasProps) => {
      try {
        setVision(true)
        await axios
          .get(
            process.env.NODE_ENV !== 'production'
              ? `http://localhost:3070/google/detail?place_id=${data.place_id}`
              : `https://cafelocator-server.herokuapp.com/google/detail?place_id=${data.place_id}`
          )
          .then((res) =>
            setMapInfo((prev) => ({ ...prev, mapDetail: res.data }))
          )
          .catch((error) => console.error(error))
      } catch {
        console.log('no datas')
      }
    },
    [mapDetail, vision]
  )

  // 경로/디테일 리셋
  const onClearDirections = useCallback(() => {
    setMapInfo({
      ...mapInfo,
      mapDetail: null,
      directions: null,
      travel: false,
    })
  }, [mapInfo])

  const onReset = useCallback(() => {
    setMapInfo({
      ...mapInfo,
      mapDatas: [],
      mapDetail: null,
      directions: null,
      travel: false,
    })
  }, [mapInfo])

  return (
    <MapStateContext.Provider
      value={{ mapInfo, setMapInfo, onClick, onClearDirections, onReset }}
    >
      {children}
    </MapStateContext.Provider>
  )
}

export function useMapState() {
  const state = useContext(MapStateContext)
  if (!state) throw new Error('Cannot find MapStateContext')
  return state
}

export default MapProvider
