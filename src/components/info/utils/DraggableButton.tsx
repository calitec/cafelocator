import React from 'react'
import { useCoreState } from '../../../context/CoreProvider'
import { useInfoState } from '../../../context/InfoProvider'

const DraggableButton: React.FunctionComponent = () => {
  const { vision } = useCoreState()
  const { onTouchStart, onTouchMove, onTouchEnd } = useInfoState()

  return (
    <div
      className="vision"
      onTouchStart={onTouchStart}
      onTouchMove={onTouchMove}
      onTouchEnd={onTouchEnd}
    >
      <span></span>
      {!vision ? <em>목록을 보려면 탭하세요</em> : ''}
    </div>
  )
}

export default DraggableButton
