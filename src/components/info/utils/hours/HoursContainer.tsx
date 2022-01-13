import * as React from 'react'
import { useEffect, useState, useMemo } from 'react'
import useToggle from '../../../../lib/hooks/useToggle'
import { useMapState } from '../../../../context/MapProvider'
import HoursPresenter from './HoursPresenter'
import useScrollTo from '../../../../lib/hooks/useScrollTo'

interface IHoursContainerProps {
  wrapperRef: any
}

const HoursContainer: React.FunctionComponent<IHoursContainerProps> = ({
  wrapperRef,
}) => {
  const { mapInfo } = useMapState()
  const { mapDetail } = mapInfo
  const [reproduced, setReproduced] = useState([])
  const [drop, setDrop] = useToggle(false)

  useScrollTo(wrapperRef, drop)

  // 영업시간 재가공
  useEffect(() => {
    reproduce(mapDetail.opening_hours?.weekday_text)
  }, [])

  const reproduce = useMemo(
    () => (opening) => {
      try {
        if (reproduced.length < 1) {
          const getDay = new Date().getDay()
          if (getDay == 0) {
            const filterd = [opening[opening.length - 1], ...opening]
            setReproduced(reproduced.concat(filterd.slice(0, 7)))
            return
          } else if (getDay == 1) {
            return setReproduced(reproduced.concat(opening))
          } else {
            const prevDay = opening?.filter((v, i) => i < getDay - 1)
            const filtered = opening?.filter((v, i) => i > getDay - 2)
            const result = filtered.concat(prevDay)
            setReproduced(reproduced.concat(result))
          }
        }
      } catch {
        console.log('no datas')
      }
    },
    [mapDetail.opening_hours?.weekday_text]
  )

  return (
    <HoursPresenter drop={drop} setDrop={setDrop} reproduced={reproduced} />
  )
}

export default HoursContainer
