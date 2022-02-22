import { useCallback } from 'react'
import { IMapDetailProps } from 'src/types/map'
import { useMapContext } from '../../context/MapProvider'

export default function useGetDetail() {
  const { mapInfo, setMapInfo, onClearDirections } = useMapContext()

  const getMapDetail = useCallback(
    (mapDetail: IMapDetailProps) => {
      onClearDirections()
      try {
        //@ts-ignore
        const map = new google.maps.Map(document.getElementById('map'), {
          center: {
            lat: mapInfo.mapPosition.lat,
            lng: mapInfo.mapPosition.lng,
          },
        })
        //@ts-ignore
        const request = {
          placeId: mapDetail.place_id,
          fields: [
            'types',
            'name',
            'place_id',
            'geometry',
            'formatted_address',
            'formatted_phone_number',
            'opening_hours',
            'rating',
            'photos',
          ],
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
            setMapInfo((prev) => ({
              ...prev,
              mapDetail: place,
              mapPosition: {
                lat: place.geometry.location.lat(),
                lng: place.geometry.location.lng(),
              },
            }))
          }
        })
      } catch {
        console.log('no datas')
      }
    },
    [mapInfo.mapDetail, mapInfo.mapPosition]
  )

  return { getMapDetail }
}
