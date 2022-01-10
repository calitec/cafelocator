import * as React from 'react';
import FontAwesomeIcons from '../../../../components/common/FontAwesomeIcons';
import { css } from '@emotion/react';
import { noto } from '../../../../lib/styles/common';

interface IHoursPresenterProps {
    drop: boolean;
    setDrop: () => void;
    reproduced: {
        opening_hours: {
            weekday_text: string
        }
    }[];
}

const HoursPresenter: React.FunctionComponent<IHoursPresenterProps> = ({
    drop,
    setDrop,
    reproduced
}) => {

    // console.log('HOURS 프레젠터 렌더링')
    // useEffect(() => {
    //     console.log('HOURS 프레젠터 리렌더링')
    // }, [])

    return (
        <ul css={hoursWrapper(drop)} className='list__hours head'>
            {/* 영업시간 */}
            <span className='icon'>
                {<FontAwesomeIcons icon={'clock'} color={'black'} />}
            </span>
            {reproduced.length > 0 && reproduced.map((v, i) => {
                return (
                    <li
                        key={i}
                        onClick={i == 0 ? () => setDrop() : null}
                        className={i == 0 && drop == true
                            ? 'arrow reverse'
                            : i != 0
                                ? ''
                                : 'arrow'}
                    >
                        <span className='indent'>
                            {v}
                        </span>
                    </li>
                )
            }) || <span className='indent'>영업시간 없음</span>}
        </ul>
    );
};

const hoursWrapper = (drop) => css`
    position: relative;
    height: ${drop ? 'auto' : '25px'};
    overflow: hidden;
    li{
        position: relative;
        font: ${noto(26)};
        color: #000;
        >span{
            position: absolute;
            top: 0;
            left: 0;
        }
        input{
            margin: 7px 0 7px;
            z-index: 2;
        }
        &.arrow{
            cursor: pointer;
            &::before{
                display: block;
                content: '';
                clear: both;
                position: absolute;
                top: 10px;
                right: 5px;
                width: 8px;
                height: 2px;
                background: #000;
                transform: rotate(45deg);
            }
            &::after{
                display: block;
                content: '';
                clear: both;
                position: absolute;
                top: 10px;
                right: 0;
                width: 8px;
                height: 2px;
                background: #000;
                transform: rotate(-45deg);
            }
        }
        &.reverse{
            &::before{
                transform: rotate(-45deg);
            }
            &::after{
                transform: rotate(45deg);
            }
        }
    }
`

export default HoursPresenter;