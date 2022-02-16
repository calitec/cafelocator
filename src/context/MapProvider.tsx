import {
  useCallback,
  createContext,
  useState,
  useContext,
  useEffect,
} from 'react'
import useDeviceCheck from '../lib/hooks/useDeviceCheck'
import { IMapDetailProps } from '../types/map'

interface State {
  mapInfo: {
    currentPosition: { lat: number; lng: number }
    mapPosition: { lat: number; lng: number }
    mapDetail: IMapDetailProps
    directions: object
    travel: boolean
    keyword: string
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
    mapDetail: null,
    directions: null,
    travel: false,
    keyword: '',
  },
  setMapInfo: null,
  getCurrentLocation: null,
  onClearDirections: null,
  onReset: null,
}

export const MapStateContext = createContext<State | null>(null)

const MapProvider: React.FunctionComponent = ({ children }) => {
  const [mapInfo, setMapInfo] = useState(initialState.mapInfo)
  const { mapPosition, currentPosition } = mapInfo

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

  const getCurrentLocation = useCallback(() => {
    setMapInfo((prev) => ({
      ...prev,
      currentPosition: mapPosition,
    }))
  }, [mapInfo])

  useEffect(() => {
    if (navigator.geolocation) {
      const geo = navigator.geolocation
      const id = geo.watchPosition((position) => {
        setMapInfo((prev) => ({
          ...prev,
          currentPosition: {
            lat: position.coords.latitude,
            lng: position.coords.longitude,
          },
        }))
      })
      return () => navigator.geolocation.clearWatch(id)
    }
  }, [])

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
