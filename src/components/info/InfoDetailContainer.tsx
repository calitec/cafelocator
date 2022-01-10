import * as React from 'react';
import useTouch from 'src/lib/hooks/useTouch';
import { useMapState } from '../../context/MapProvider';
import InfoDetailPresenter from './InfoDetailPresenter';

const InfoDetailContainer: React.FunctionComponent = ({
}) => {

    // console.log('INFO DETAIL 컨테이너 렌더링')
    // useEffect(() => {
    //     console.log('INFO DETAIL 컨테이너 리렌더링')
    // }, [])

    const { mapInfo, setMapInfo, onClearDirections } = useMapState();
    const { mapDetail } = mapInfo;
    const { infoPosition } = useTouch();
    const { transY } = infoPosition;
    const setTravel = () => setMapInfo(prev => ({...prev, travel: true }));

    return (
        <>
            {mapDetail &&
                <InfoDetailPresenter
                    mapDetail={mapDetail}
                    onClearDirections={onClearDirections}
                    setTravel={setTravel}
                    transY={transY}
                />
            }
        </>
    );
};

export default InfoDetailContainer;