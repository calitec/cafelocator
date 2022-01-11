import * as React from 'react'
import { IMapDatasProps } from '../../types/map'
import { useMapState } from '../../context/MapProvider'
import Rating from '../common/Rating'
import Skeleton from '../common/Skeleton'
import Spin from '../common/Spin'
import { css } from '@emotion/react'
import media from '../../lib/styles/media'
import { noto, notoBig } from '../..//lib/styles/common'
import useScroll from 'src/lib/hooks/useScroll'
import useTouch from 'src/lib/hooks/useTouch'

interface IInfoListPresenterProps {
  mapPosition: {
    lat: number
    lng: number
  }
  mapDatas: IMapDatasProps[]
  onClick?: (v, i) => void
  haversined: (mapPosition: object, value: any) => {}
}

const InfoListPresenter: React.FunctionComponent<IInfoListPresenterProps> = ({
  mapPosition,
  mapDatas,
  onClick,
  haversined,
}) => {
  const { infoPosition } = useTouch()
  const { transY } = infoPosition
  const { mapInfo } = useMapState()
  const { loading } = mapInfo
  const [scrollTop, ref] = useScroll()

  const totalItemCount =
    mapDatas.length > 1 && mapDatas.length <= 20 ? mapDatas.length : 20
  const itemHeight = 130
  const scrollViewPortHeight = 400
  const scrollContainerHeight = Math.max(
    scrollViewPortHeight,
    itemHeight * totalItemCount
  )
  const startIdx = Math.floor(scrollTop / itemHeight)
  const offsetY = startIdx * itemHeight
  const visibleNodes = mapDatas.slice(
    startIdx,
    startIdx + scrollViewPortHeight / itemHeight + 1
  )

  if (!loading && mapDatas.length > 1) {
    return (
      <div ref={ref} css={ScrollViewport(transY, scrollViewPortHeight)}>
        <div css={scrollContainer(scrollContainerHeight)}>
          <ul className="infoList">
            {visibleNodes.map((item, i) => (
              <li
                key={i}
                css={visibleNodesWrapper(offsetY)}
                onClick={() => {
                  onClick(item, i)
                }}
              >
                <h2>{item.name}</h2>
                <div>
                  <span>{item.rating}</span> <Rating star={item.rating} />
                </div>
                <p>현재 위치로부터 {haversined(mapPosition, item)} km</p>
              </li>
            ))}
          </ul>
        </div>
      </div>
    )
  }

  // 로딩
  if (loading) {
    return (
      <div ref={ref} css={ScrollViewport(transY, scrollViewPortHeight)}>
        <ul className="infoList">
          <Spin />
          <Skeleton />
          <Skeleton />
          <Skeleton />
        </ul>
      </div>
    )
  }

  // 디폴트
  return (
    <div ref={ref} css={ScrollViewport(transY, scrollViewPortHeight)}>
      <div className="infoList__default">
        <p>주변 카페를 검색 해보세요.</p>
        <span>ex) 스타벅스</span>
      </div>
    </div>
  )
}

const ScrollViewport = (transY, scrollViewPortHeight) => css`
  display: block;
  width: 350px;
  height: ${scrollViewPortHeight}px;
  overflow-y: ${transY > 0 || transY >= 350 ? 'hidden' : 'auto'};
  z-index: 3;
  -webkit-overflow-scrolling: touch;
  ${media.large} {
    width: 100%;
    height: ${scrollViewPortHeight - 50}px;
  }
  .infoList__default {
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    height: 100%;
    p {
      font: ${notoBig(35)};
      font-weight: 500;
      color: #000;
      text-align: center;
    }
    span {
      display: block;
      font: ${notoBig()};
      font-weight: 700;
      color: #118806;
    }
  }
  ::-webkit-scrollbar {
    width: 2px;
  }
  ::-webkit-scrollbar-thumb {
    background: #cccccc;
  }
  ::-webkit-scrollbar-track {
    background: transparent;
  }
`
const scrollContainer = (scrollContainerHeight) => css`
  position: relative;
  height: ${scrollContainerHeight}px;
  .infoList {
    li {
      display: flex;
      flex-direction: column;
      justify-content: center;
      height: 130px;
      padding-left: 30px;
      box-shadow: 0px 1px #cccccc;
      cursor: pointer;
      ${media.desktop} {
        &:hover {
          background-color: #f9f9f9;
        }
      }
      h2,
      > div,
      p {
        font: ${noto(27)};
        color: #353535;
      }
      h2 {
        font: ${notoBig(20, 500)};
        color: #000;
        text-transform: uppercase;
      }
      > div {
        span {
          display: inline-block;
          font: ${noto(24)};
          vertical-align: middle;
        }
      }
    }
  }
`
const visibleNodesWrapper = (offsetY) => css`
  position: relative;
  transform: translateY(${offsetY}px);
`

export default InfoListPresenter
