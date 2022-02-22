import { useMemo, useState } from 'react'
import useToggle from '../../../../lib/hooks/useToggle'
import { useMapContext } from '../../../../context/MapProvider'
import HoursPresenter from './HoursPresenter'
import useScrollTo from '../../../../lib/hooks/useScrollTo'

interface IHoursContainerProps {
  wrapperRef: any
}

const HoursContainer: React.FunctionComponent<IHoursContainerProps> = ({
  wrapperRef,
}) => {
  const { mapInfo } = useMapContext()
  const { mapDetail } = mapInfo
  const [realignment, setRealignment] = useState([])
  const [drop, setDrop] = useToggle(false)

  useScrollTo(wrapperRef, drop)

  // 영업시간 재가공
  useMemo(() => {
    try {
      const { weekday_text } = mapDetail.opening_hours
      doRealignment(weekday_text)
      return () => doRealignment(weekday_text)
    } catch {
      console.log('no opening_hours')
    }
  }, [])

  function doRealignment(opening: string[]) {
    if (realignment.length < 1) {
      const getDay = new Date().getDay()
      if (getDay === 0) {
        // 일요일~
        const sortedSundayFirst = [opening[opening.length - 1], ...opening]
        setRealignment(realignment.concat(sortedSundayFirst.slice(0, 7)))
        return
      } else if (getDay === 1) {
        // 월요일~
        setRealignment(realignment.concat(opening))
        return
      } else {
        // rest
        const prevDays = opening?.filter((v, i) => i < getDay - 1)
        const nextDays = opening?.filter((v, i) => i > getDay - 2)
        const result = nextDays.concat(prevDays)
        setRealignment(realignment.concat(result))
        return
      }
    }
  }

  return (
    <HoursPresenter drop={drop} setDrop={setDrop} realignment={realignment} />
  )
}

export default HoursContainer
