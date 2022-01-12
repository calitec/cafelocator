import React from 'react'
import { css } from '@emotion/react'
import media from 'src/lib/styles/media'
import Spin from './Spin'

const Loader: React.FunctionComponent = () => {
  return (
    <div css={LoaderWrapper}>
      <ul className="infoList">
        <Spin />
      </ul>
    </div>
  )
}

const LoaderWrapper = css`
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
