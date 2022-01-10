import * as React from 'react';
import { css } from '@emotion/react';
interface ISkeletonProps {
    anim?: string
}
const Skeleton: React.FunctionComponent<ISkeletonProps> = ({
    anim
}) => {
    return (
        <div css={skeletonWrapper(anim)}>
            <p></p>
            <div></div>
            <div></div>
        </div>
    );
};

const skeletonWrapper = (anim) => css`
    position: relative;
    height: 130px;
    box-shadow: #ccc 0px 1px;
    cursor: pointer;
    @-webkit-keyframes skeleton-gradient {
        0% {
            background-color: rgba(165, 165, 165, 0.1);
        }

        50% {
            background-color: rgba(165, 165, 165, 0.3);
        }

        100% {
            background-color: rgba(165, 165, 165, 0.1);
        }
    }
    @keyframes skeleton-gradient {
        0% {
            background-color: rgba(165, 165, 165, 0.1);
        }

        50% {
            background-color: rgba(165, 165, 165, 0.3);
        }

        100% {
            background-color: rgba(165, 165, 165, 0.1);
        }
    }
    p, div{
        position: absolute;
        left: 30px;
        -webkit-animation: ${anim != 'bg' ? 'skeleton-gradient 1.8s infinite ease-in-out' : ''};
        animation: ${anim != 'bg' ? 'skeleton-gradient 1.8s infinite ease-in-out' : ''};
        background-color: ${anim == 'bg' ? 'rgba(165, 165, 165, 0.1)' : ''};
    }
    p{
        width: 150px;
        height: 15px;
        top: 27px;
    }
    div{
        width: 140px;
        height: 15px;
        top: 53px;
        &:nth-of-type(2){
            top: 80px;
            width: 170px;
        }
    }
`

export default Skeleton;