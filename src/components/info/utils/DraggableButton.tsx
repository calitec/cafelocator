import { useMapState } from '../../../context/MapProvider'
import { css } from '@emotion/react'
import media from '../../../lib/styles/media'
import { noto } from '../../../lib/styles/common'
interface IDragProps {
  refs: React.MutableRefObject<any>
}
const DraggableButton: React.FunctionComponent<IDragProps> = ({ refs }) => {
  const { mapInfo } = useMapState()

  return (
    <div ref={refs} className="vision" css={DraggableButtonWrapper}>
      {!mapInfo.vision ? <em>목록을 보려면 탭하세요</em> : <span></span>}
    </div>
  )
}

const DraggableButtonWrapper = css`
  display: none;
  ${media.large} {
    display: flex;
    flex-direction: column;
    text-align: center;
    padding: 15px 5px;
    span {
      display: block;
      margin: auto;
      width: 25px;
      height: 4px;
      background-color: #353535;
      border-radius: 10px;
      margin: 0 auto;
    }
    em {
      display: block;
      font: ${noto()};
      color: #000;
      margin: 5% 0;
    }
  }
`

export default DraggableButton
