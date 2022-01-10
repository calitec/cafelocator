import React from 'react';
import { Marker } from '@react-google-maps/api';
import { IMapDatasProps } from 'src/types/map';
interface IGoogleMapsMarkersProps {
    mapDatas: IMapDatasProps[];
    mapPosition: {
        lat: number;
        lng: number;
    };
    zoom: number;
    onClick: (v, i) => void;
}
const GoogleMapsMarkers: React.FunctionComponent <IGoogleMapsMarkersProps> = ({
    mapDatas, 
    mapPosition,
    zoom,
    onClick
}) => {

    return (
        <>
            {mapDatas.map((v, i) => {
            const { lat, lng } = v.geometry.location;
            return (
                <div key={i}>
                    {/* current location marker*/}
                    <Marker
                        //@ts-ignore
                        animation={window.google.maps.Animation.BOUNCE}
                        position={{ lat: mapPosition.lat, lng: mapPosition.lng }}
                    >
                        <div className='effective'></div>
                    </Marker>
                    {/* cluster markers */}
                    {
                        <Marker
                            icon={{
                                url: './images/locator.png',
                                //@ts-ignore
                                size: new google.maps.Size(50, 57),
                                //@ts-ignore
                                labelOrigin: new google.maps.Point(9, 50),
                            }}
                            key={i}
                            clickable
                            onClick={() => onClick(v, i)}
                            position={{ lat, lng }}
                            label={{
                                className: 'markerLabels',
                                text: v.name,
                                color: 'black',
                                fontSize: zoom > 12 ? '12px' : '0px',
                                fontWeight: 'bold',
                                stroke: '5px white'
                            }}
                        >
                        </Marker>
                    }
                </div>
            )
        })}
        </>
    );
};

export default GoogleMapsMarkers;