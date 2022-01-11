import React from 'react';
import DraggableButton from './utils/DraggableButton';
import { css } from '@emotion/react';
import { noto } from '../../lib/styles/common';
import media from '../../lib/styles/media';
import useTouch from 'src/lib/hooks/useTouch';

const InfoTemplate: React.FunctionComponent = ({ children }) => {

    const { ref, infoPosition } = useTouch();
    const { transY } = infoPosition;

    return (
        <div className='infoTemplate' css={InfoTemplateContainer(transY)}>
            <div className='infoTemplate__body'>
                <DraggableButton refs={ref}/>
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
            transform: translateY(${transY > 0 ? transY : 0}px);
        }
    }
`

export default InfoTemplate;