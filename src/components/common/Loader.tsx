import { css } from '@emotion/react'
import media from '../../lib/styles/media'
import Spin from './Spin'
import Skeleton from './Skeleton'

const Loader: React.FunctionComponent = () => {
  return (
    <div css={LoaderWrapper}>
      <ul className="infoList">
        <Spin />
        <Skeleton />
        <Skeleton />
        <Skeleton />
      </ul>
    </div>
  )
}

const LoaderWrapper = css`
  display: block;
  width: 350px;
  height: 400px;
  overflow-y: auto;
  z-index: 1000;
  ${media.large} {
    width: 100%;
    height: 350px;
  }
`

export default Loader
