import * as React from 'react'
import { Suspense, lazy } from 'react'
import MapProvider from 'src/context/MapProvider'
import { AuthProvider } from '../context/AuthProvider'
// import { CoreProvider } from '../context/CoreProvider'
import GoogleMapsTemplate from 'src/components/map/GoogleMapsTemplate'
import GoogleMapsContainer from 'src/components/map/GoogleMapsContainer'
import NavTemplate from '../components/nav/NavTemplate'
import InfoTemplate from 'src/components/info/InfoTemplate'
import InfoListContainer from 'src/components/info/InfoListContainer'
import InfoDetailContainer from 'src/components/info/InfoDetailContainer'
import MainTemplate from 'src/components/common/MainTemplate'
import Loader from '../components/common/Loader'

const Home: React.FunctionComponent = () => {
  return (
    // <CoreProvider>
    <MapProvider>
      <GoogleMapsTemplate>
        <Suspense fallback={<Loader />}>
          <GoogleMapsContainer />
        </Suspense>
      </GoogleMapsTemplate>
      <AuthProvider>
        <MainTemplate nav={<NavTemplate />}>
          <InfoTemplate>
            <Suspense fallback={<Loader />}>
              <InfoListContainer />
              <InfoDetailContainer />
            </Suspense>
          </InfoTemplate>
        </MainTemplate>
      </AuthProvider>
    </MapProvider>
    // </CoreProvider>
  )
}

export default Home
