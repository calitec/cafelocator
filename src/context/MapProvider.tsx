import {
  useCallback,
  createContext,
  useState,
  useContext,
  useMemo,
  useEffect,
} from 'react'
import { IMapDatasProps, IMapDetailProps } from '../types/map'
import throttle from 'lodash'

export interface MapState {
  mapInfo: {
    currentPosition: { lat: number; lng: number }
    mapPosition: { lat: number; lng: number }
    mapDatas: IMapDatasProps[]
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
  const { mapDatas, mapPosition, travel, loading } = mapInfo

  // 맵 초기화
  useEffect(() => {
    let unsubscribe
    if (mapPosition.lat < 1) {
      const { geolocation } = navigator
      if (geolocation) {
        unsubscribe = geolocation.getCurrentPosition((position) => {
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
    return () => unsubscribe()
  }, [])

  // 로딩 리셋
  useEffect(() => {
    if (loading && mapInfo.directions !== null)
      setMapInfo((prev) => ({ ...prev, loading: false }))
  }, [mapDatas, loading])

  // 실시간 위치정보 갱신
  useEffect(() => {
    const { geolocation } = navigator
    if (geolocation && travel) {
      const id = throttle(
        geolocation.watchPosition((position) => {
          const positions = {
            lat: position.coords.latitude,
            lng: position.coords.longitude,
          }
          setMapInfo((prev) => ({
            ...prev,
            mapPosition: positions,
            currentPosition: positions,
          }))
        }),
        3500
      )
      return () => geolocation.clearWatch(id)
    }
  }, [travel])

  // 위치정보 갱신
  const getCurrentLocation = useCallback(() => {
    const { geolocation } = navigator
    setMapInfo((prev) => ({ ...prev, loading: true }))
    let unsubscribe
    if (geolocation) {
      unsubscribe = geolocation.getCurrentPosition((position) => {
        const positions = {
          lat: position.coords.latitude,
          lng: position.coords.longitude,
        }
        setMapInfo((prev) => ({
          ...prev,
          mapPosition: positions,
          currentPosition: positions,
          loading: false,
        }))
      })
    }
    return () => unsubscribe()
  }, [])

  // 경로/디테일 리셋
  const onClearDirections = useCallback(() => {
    setMapInfo((prev) => ({
      ...prev,
      mapDetail: null,
      directions: null,
      travel: false,
    }))
  }, [mapInfo])

  // Map 상태 리셋
  const onReset = useCallback(() => {
    setMapInfo((prev) => ({
      ...prev,
      mapDatas: null,
      mapDetail: null,
      directions: null,
      travel: false,
      keyword: '',
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
