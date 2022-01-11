import React from 'react'
import { css } from '@emotion/react'
import media from 'src/lib/styles/media'
import { notoBig } from 'src/lib/styles/common'
import Skeleton from './Skeleton'
import Spin from './Spin'

const Loader: React.FunctionComponent = () => {
  return (
    <div css={ScrollViewport}>
      <ul className="infoList">
        <Spin />
        <Skeleton />
        <Skeleton />
        <Skeleton />
      </ul>
    </div>
  )
}

const ScrollViewport = css`
  display: block;
  width: 350px;
  height: 400px;
  overflow-y: 'hidden';
  z-index: 3;
  -webkit-overflow-scrolling: touch;
  ${media.large} {
    width: 100%;
    height: 350px;
  }
  .infoList__default {
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    height: 100%;
    p {
      font: ${notoBig(35)};
      font-weight: 500;
      color: #000;
      text-align: center;
    }
    span {
      display: block;
      font: ${notoBig()};
      font-weight: 700;
      color: #118806;
    }
  }
  ::-webkit-scrollbar {
    width: 2px;
  }
  ::-webkit-scrollbar-thumb {
    background: #cccccc;
  }
  ::-webkit-scrollbar-track {
    background: transparent;
  }
`

export default Loader
