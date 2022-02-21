import { useCallback } from 'react'
import { useMapContext } from '../../context/MapProvider'

export default function useGetDetail() {
  const { mapInfo, setMapInfo, onClearDirections } = useMapContext()

  const getMapDetail = useCallback(
    (mapDetail) => {
      onClearDirections()
      try {
        //@ts-ignore
        const map = new google.maps.Map(document.getElementById('map'), {
          center: {
            lat: mapInfo.currentPosition.lat,
            lng: mapInfo.currentPosition.lng,
          },
          zoom: 15,
        })
        //@ts-ignore
        const request = {
          placeId: mapDetail.place_id,
        }
        //@ts-ignore
        const service = new google.maps.places.PlacesService(map)
        service.getDetails(request, (place, status) => {
          if (
            //@ts-ignore
            status === google.maps.places.PlacesServiceStatus.OK &&
            place &&
            place.geometry &&
            place.geometry.location
          ) {
            setMapInfo((prev) => ({ ...prev, mapDetail: place }))
          }
        })
      } catch {
        console.log('no datas')
      }
    },
    [mapInfo]
  )

  return { getMapDetail }
}
