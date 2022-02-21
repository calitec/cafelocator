import * as React from 'react'
import GoogleMapsTemplate from '../components/map/GoogleMapsTemplate'
import GoogleMapsContainer from '../components/map/GoogleMapsContainer'

const Map: React.FunctionComponent = () => {
  return (
    <>
      <GoogleMapsTemplate>
        <GoogleMapsContainer />
        <div id="map"></div>
      </GoogleMapsTemplate>
    </>
  )
}

export default Map
