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
  const { mapDetail, mapPosition, currentPosition } = mapInfo
  const { screenHeight } = useDeviceCheck()

  // 맵 초기화
  useEffect(() => {
    if (mapPosition.lat < 1) {
      if (navigator.geolocation) {
        navigator.geolocation.getCurrentPosition((position) => {
          const initPosition = {
            lat: position.coords.latitude,
            lng: position.coords.longitude,
          }
          const mapPosition = {
            lat: position.coords.latitude,
            lng: position.coords.longitude,
          }
          setMapInfo({
            ...mapInfo,
            currentPosition: initPosition,
            mapPosition: mapPosition,
          })
        })
      }
    }
  }, [currentPosition, mapPosition])

  // 클릭 후 위치조정
  useEffect(() => {
    if (mapDetail) {
      setMapInfo({
        ...mapInfo,
        currentPosition: {
          lat: mapDetail?.geometry.location.lat,
          lng: mapDetail?.geometry.location.lng,
        },
      })
    }
  }, [mapDetail])

  const getCurrentLocation = useCallback(() => {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition((position) => {
        setMapInfo({
          ...mapInfo,
          currentPosition: {
            lat:
              screenHeight > 812
                ? position.coords.latitude
                : position.coords.latitude - 0.015,
            lng: position.coords.longitude,
          },
        })
      })
    }
  }, [currentPosition])

  // 경로/디테일 리셋
  const onClearDirections = useCallback(() => {
    setMapInfo({
      ...mapInfo,
      mapDetail: null,
      directions: null,
      travel: false,
    })
  }, [mapInfo])

  // 앱 리셋
  const onReset = useCallback(() => {
    setMapInfo({
      ...mapInfo,
      mapDetail: null,
      directions: null,
      travel: false,
      keyword: '',
    })
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
