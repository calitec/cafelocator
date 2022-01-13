import React from 'react'
import { useMapState } from 'src/context/MapProvider'
import useTouch from 'src/lib/hooks/useTouch'
import { useCoreState } from '../../../context/CoreProvider'

interface IDragProps {
  refs: React.MutableRefObject<any>
}
const DraggableButton: React.FunctionComponent<IDragProps> = ({ refs }) => {
  const { mapInfo } = useMapState()

  return (
    <div ref={refs} className="vision">
      {!mapInfo.vision ? <em>목록을 보려면 탭하세요</em> : <span></span>}
    </div>
  )
}

export default DraggableButton
