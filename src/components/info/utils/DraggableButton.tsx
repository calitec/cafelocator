import React from 'react'
import { useCoreState } from '../../../context/CoreProvider'

interface IDragProps {
  refs: React.MutableRefObject<any>;
}
const DraggableButton: React.FunctionComponent<IDragProps> = ({ refs }) => {
  const { vision } = useCoreState()

  return (
    <div
      ref={refs}
      className="vision"
    >
      <span></span>
      {!vision ? <em>목록을 보려면 탭하세요</em> : ''}
    </div>
  )
}

export default DraggableButton
