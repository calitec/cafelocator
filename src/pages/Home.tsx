import * as React from 'react'
import { Suspense, lazy } from 'react'

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
    <>
      <GoogleMapsTemplate>
        <GoogleMapsContainer />
      </GoogleMapsTemplate>
      <MainTemplate nav={<NavTemplate />}>
        <InfoTemplate>
          <Suspense fallback={<Loader />}>
            <InfoListContainer />
          </Suspense>
          <InfoDetailContainer />
        </InfoTemplate>
      </MainTemplate>
    </>
  )
}

export default Home
