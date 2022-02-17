import useTouch from '../../lib/hooks/useTouch'
import media from '../../lib/styles/media'
import { css } from '@emotion/react'
import { noto } from 'src/lib/styles/common'
import { useVisionContext } from 'src/context/VisionProvider'

const InfoTemplate: React.FunctionComponent = ({ children }) => {
  const { ref, infoPosition } = useTouch()
  const { transY } = infoPosition
  const { vision } = useVisionContext()

  return (
    <div className="infoTemplate" css={InfoTemplateContainer(transY)}>
      <div className="infoTemplate__body">
        <div ref={ref} className="vision" css={DraggableButtonWrapper}>
          {!vision ? <em>목록을 보려면 탭하세요</em> : <span></span>}
        </div>
        {children}
      </div>
    </div>
  )
}

const InfoTemplateContainer = (transY) => css`
  .infoTemplate__body {
    position: relative;
    overflow: hidden;
    border-radius: 20px;
    ${media.large} {
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

export default InfoTemplate
