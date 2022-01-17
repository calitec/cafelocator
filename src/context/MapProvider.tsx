import * as React from 'react'
import {
  useCallback,
  createContext,
  useState,
  useContext,
  useEffect,
} from 'react'
import useDeviceCheck from 'src/lib/hooks/useDeviceCheck'
import { IMapDetailProps } from '../types/map'

interface State {
  mapInfo: {
    currentPosition: { lat: number; lng: number }
    mapPosition: { lat: number; lng: number }
    mapDetail: IMapDetailProps
    directions: object
    travel: boolean
    keyword: string
    vision: boolean
  }
  setMapInfo: (data: object) => void
  getCurrentLocation: () => void
  onClearDirections: () => void
  onReset: () => void
}

export const MapStateContext = createContext<State | null>(null)

const MapProvider: React.FunctionComponent = ({ children }) => {
  const [mapInfo, setMapInfo] = useState({
    currentPosition: { lat: 0, lng: 0 },
    mapPosition: { lat: 0, lng: 0 },
    mapDetail: null,
    directions: null,
    travel: false,
    keyword: '',
    vision: true,
  })
  const { mapDetail, mapPosition, currentPosition, keyword } = mapInfo
  const { screenHeight } = useDeviceCheck()

  // 맵 초기화
  useEffect(() => {
    if (mapPosition.lat < 1) {
      if (navigator.geolocation) {
        navigator.geolocation.getCurrentPosition((position) => {
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

  // 클릭 후 위치조정
  useEffect(() => {
    if (mapDetail) {
      setMapInfo((prev) => ({
        ...prev,
        currentPosition: {
          lat: mapDetail?.geometry.location.lat,
          lng: mapDetail?.geometry.location.lng,
        },
      }))
    }
  }, [mapInfo.mapDetail])

  // 키워드 없을 시 초기화
  useEffect(() => {
    if (keyword == '') onReset()
  }, [keyword])

  const getCurrentLocation = useCallback(() => {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition((position) => {
        setMapInfo((prev) => ({
          ...prev,
          currentPosition: {
            lat:
              screenHeight > 812
                ? position.coords.latitude
                : position.coords.latitude - 0.015,
            lng: position.coords.longitude,
          },
        }))
      })
    }
  }, [mapInfo])

  // 경로/디테일 리셋
  const onClearDirections = useCallback(() => {
    setMapInfo((prev) => ({
      ...prev,
      mapDetail: null,
      directions: null,
      travel: false,
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
    }))
  }, [mapInfo])

  return (
    <MapStateContext.Provider
      value={{
        mapInfo,
        setMapInfo,
        getCurrentLocation,
        onClearDirections,
        onReset,
      }}
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
