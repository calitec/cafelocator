export interface IGoogleMapOptionsProps {
  polylineOptions: {
    strokeColor: string
    strokeWeight: string
    strokeOpacity: string
  }
  zoomControlOptions: {
    position: {
      lat: number
      lng: number
    }
  }
}
export interface IMapDatasProps {
  name: string
  rating: number
  length: number
  vicinity: string
  place_id: string
  geometry: {
    location: {
      lat: number
      lng: number
    }
  }
}
export interface IMapDetailProps {
  name: string
  rating: number
  length: number
  place_id: string
  photos: {
    getUrl: () => string
  }[]
  formatted_phone_number: number
  opening_hours: {
    weekday_text: string[]
  }
  geometry: {
    location: {
      lat: () => number
      lng: () => number
    }
  }
}
export interface IDirectionsProps {
  geocoded_waypoints: {
    geocoder_status: string
    place_id: string
  }[]
  request: {
    destination: {
      location: {
        lat: () => void
        lng: () => void
      }
    }
    origin: {
      location: {
        lat: () => void
        lng: () => void
      }
      travelMode: string
    }
  }
  routes: any[]
  status: string
}
