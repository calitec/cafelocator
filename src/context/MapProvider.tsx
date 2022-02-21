import {
  useCallback,
  createContext,
  useState,
  useContext,
  useEffect,
  useMemo,
} from 'react'
import { IMapDetailProps } from '../types/map'

export interface MapState {
  mapInfo: {
    currentPosition: { lat: number; lng: number }
    mapPosition: { lat: number; lng: number }
    mapDatas: object
    mapDetail: IMapDetailProps
    directions: object
    travel: boolean
    loading: boolean
  }
  setMapInfo: (data: object) => void
  getCurrentLocation: () => void
  onClearDirections: () => void
  onReset: () => void
}

export const initialState = {
  mapInfo: {
    currentPosition: { lat: 0, lng: 0 },
    mapPosition: { lat: 0, lng: 0 },
    mapDatas: null,
    mapDetail: null,
    directions: null,
    travel: false,
    loading: false,
  },
  setMapInfo: null,
  getCurrentLocation: null,
  onClearDirections: null,
  onReset: null,
}

export const MapContext = createContext<MapState | null>(null)

const MapProvider: React.FunctionComponent = ({ children }) => {
  const [mapInfo, setMapInfo] = useState(initialState.mapInfo)
  const { mapPosition, currentPosition } = mapInfo

  // 맵 초기화
  useEffect(() => {
    const { geolocation } = navigator
    if (mapPosition.lat < 1) {
      if (geolocation) {
        geolocation.getCurrentPosition((position) => {
          const positions = {
            lat: position.coords.latitude,
            lng: position.coords.longitude,
          }
          setMapInfo((prev) => ({
            ...prev,
            currentPosition: positions,
            mapPosition: positions,
          }))
        })
      }
    }
  }, [currentPosition, mapPosition])

  useEffect(() => {
    if (mapInfo.mapDatas !== null)
      setMapInfo((prev) => ({ ...prev, loading: false }))
  }, [mapInfo.mapDatas])

  // 위치정보 갱신
  // useEffect(() => {
  //   const { geolocation } = navigator
  //   if (geolocation) {
  //     const id = geolocation.watchPosition((position) => {
  //       const positions = {
  //         lat: position.coords.latitude,
  //         lng: position.coords.longitude,
  //       }
  //       setMapInfo((prev) => ({
  //         ...prev,
  //         mapPosition: positions,
  //         currentPosition: positions,
  //       }))
  //     })
  //     return () => geolocation.clearWatch(id)
  //   }
  // }, [])

  const getCurrentLocation = useCallback(() => {
    setMapInfo((prev) => ({
      ...prev,
      currentPosition: mapPosition,
    }))
  }, [mapInfo])

  // 경로/디테일 리셋
  const onClearDirections = useCallback(() => {
    setMapInfo((prev) => ({
      ...prev,
      mapDetail: null,
      directions: null,
      travel: false,
      currentPosition: mapPosition,
    }))
  }, [mapInfo])

  // 앱 리셋
  const onReset = useCallback(() => {
    setMapInfo((prev) => ({
      ...prev,
      mapDetail: null,
      directions: null,
      travel: false,
      keyword: '',
      currentPosition: mapPosition,
    }))
  }, [mapInfo])

  const value = useMemo(
    () => ({
      mapInfo,
      setMapInfo,
      getCurrentLocation,
      onClearDirections,
      onReset,
    }),
    [mapInfo]
  )

  return <MapContext.Provider value={value}>{children}</MapContext.Provider>
}

export function useMapContext() {
  const state = useContext(MapContext)
  if (!state) throw new Error('Cannot find MapContext')
  return state
}

export default MapProvider
