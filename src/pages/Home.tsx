import * as React from 'react'
import { Suspense, lazy } from 'react'

import GoogleMapsTemplate from '../components/map/GoogleMapsTemplate'
import GoogleMapsContainer from '../components/map/GoogleMapsContainer'
import NavTemplate from '../components/nav/NavTemplate'
import InfoTemplate from '../components/info/InfoTemplate'
import InfoListContainer from '../components/info/InfoListContainer'

import MainTemplate from '../components/common/MainTemplate'
import Loader from '../components/common/Loader'
const InfoDetailContainer = lazy(
  () => import('../components/info/InfoDetailContainer')
)
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
          <Suspense fallback={<Loader />}>
            <InfoDetailContainer />
          </Suspense>
        </InfoTemplate>
      </MainTemplate>
    </>
  )
}

export default Home
