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
      </ul>
    </div>
  )
}

const ScrollViewport = css`
  display: block;
  width: 350px;
  height: 400px;
  overflow-y: 'hidden';
  z-index: 1000;
  -webkit-overflow-scrolling: touch;
  ${media.large} {
    width: 100%;
    height: 350px;
  }
`

export default Loader
