import { useMapState } from '../../../context/MapProvider'
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
