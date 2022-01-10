import React from 'react';
import { useInfoState } from '../../context/InfoProvider';
import DraggableButton from './utils/DraggableButton';
import { css } from '@emotion/react';
import { noto } from '../../lib/styles/common';
import media from '../../lib/styles/media';
import { useMapState } from 'src/context/MapProvider';

const InfoTemplate: React.FunctionComponent = ({ children }) => {

    const { infoPosition } = useInfoState();
    const { transY } = infoPosition;

    // console.log('INFO 템플릿 렌더링')
    // useEffect(() => {
    //     console.log('INFO 템플릿 리렌더링')
    // }, [])

    return (
        <div className='infoTemplate' css={InfoTemplateContainer(transY)}>
            <div className='infoTemplate__body'>
                <DraggableButton />
                {children}
            </div>
        </div>
    );
};

const InfoTemplateContainer = (transY) => css`
   
    .infoTemplate__body{
        position: relative;
        border-radius: 20px;
        overflow: hidden;
        background-color: #fff;
        .vision{
            display: none;
            ${media.large} {
                display: flex;
                flex-direction: column;
                text-align: center;
                padding: 15px 5px;
                span{
                    display: block;
                    margin: auto;
                    width: 25px;
                    height: 4px;
                    background-color: #353535;
                    border-radius: 10px;
                    margin: 0 auto;
                }
                em{
                    display: block;
                    font: ${noto()};
                    color: #000;
                    margin: 5% 0;
                }
            }
        }
        ${media.large}{
            position: fixed;
            top: initial;
            left: 0%;
            bottom: 0%;
            width: 100%;    
            background-color: #fff;
            border-radius: 20px 20px 0 0;
            &:hover{
                will-change: transform;
            }
            transform: translateY(${transY > 0 ? transY : 0}px);
        }
    }
`

export default InfoTemplate;