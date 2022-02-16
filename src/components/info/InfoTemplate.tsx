import DraggableButton from './utils/DraggableButton'
import useTouch from '../../lib/hooks/useTouch'
import media from '../../lib/styles/media'
import { css } from '@emotion/react'

const InfoTemplate: React.FunctionComponent = ({ children }) => {
  const { ref, infoPosition } = useTouch()
  const { vision, transY } = infoPosition

  return (
    <div className="infoTemplate" css={InfoTemplateContainer(transY)}>
      <div className="infoTemplate__body">
        <DraggableButton refs={ref} vision={vision} />
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

export default InfoTemplate
