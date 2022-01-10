import * as React from 'react';
import GoogleMapsTemplate from 'src/components/map/GoogleMapsTemplate';
import GoogleMapsContainer from 'src/components/map/GoogleMapsContainer';
import InfoTemplate from 'src/components/info/InfoTemplate';
import InfoListContainer from 'src/components/info/InfoListContainer';
import InfoDetailContainer from 'src/components/info/InfoDetailContainer';
import MapProvider from 'src/context/MapProvider';
import { AuthProvider } from '../context/AuthProvider';
import { CoreProvider } from '../context/CoreProvider';

import MainTemplate from 'src/components/common/MainTemplate';
import NavTemplate from '../components/nav/NavTemplate';

const Home: React.FunctionComponent = () => {
    return (
        <CoreProvider>
            <MapProvider>
                <GoogleMapsTemplate>
                    <GoogleMapsContainer />
                </GoogleMapsTemplate>
                <AuthProvider>
                    <MainTemplate nav={<NavTemplate />}>
                        <InfoTemplate>
                            <InfoListContainer />
                            <InfoDetailContainer />
                        </InfoTemplate>
                    </MainTemplate>
                </AuthProvider>
            </MapProvider>
        </CoreProvider>
    )
};



export default Home;