import * as React from 'react';
import { memo } from 'react';
import { css } from '@emotion/react';

interface IStarprops {
    star: number;
    single?: boolean;
}

const Rating: React.FunctionComponent<IStarprops> = ({
    star,
    single
}) => {

    return (
        <div css={ratingWrapper} className='ratingWrapper'>
            {
                single == false || single == null ?
                    [1, 2, 3, 4, 5].map((v) => {
                        if (star < v) {
                            return <img src="/images/star_bg.png" alt="" key={v} />
                        }
                        return (
                            <img src="/images/star.png" alt="" key={v} />
                        )
                    })
                    :
                    <img src="/images/star.png" alt="" />
            }
        </div>
    );
};

const ratingWrapper = css`
    display: inline-block;
    img{
        vertical-align: middle;
        width: 25px;
        height: 25px;
    }
`

export default memo(Rating);