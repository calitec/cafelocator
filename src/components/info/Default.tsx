import React, { forwardRef } from 'react'
import useScroll from 'src/lib/hooks/useScroll'
interface IDefaultProps {
  ref: any
  style: any
}
const Default: React.FunctionComponent<IDefaultProps> = ({ style, ref }) => {
  return (
    ref && (
      <div ref={ref} css={style}>
        <div className="info__list__default">
          <p>주변 카페를 검색 해보세요.</p>
          <span>ex) 스타벅스</span>
        </div>
      </div>
    )
  )
}

export default Default
