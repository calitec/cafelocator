import Rating from '../common/Rating'
import media from '../../lib/styles/media'
import useScroll from '../../lib/hooks/useScroll'
import { css } from '@emotion/react'
import { noto, notoBig } from '../..//lib/styles/common'
import { IMapDatasProps, IMapDetailProps } from 'src/types/map'

interface IInfoListPresenterProps {
  mapInfo: {
    currentPosition: { lat: number; lng: number }
    mapPosition: { lat: number; lng: number }
    mapDatas: IMapDatasProps[]
    mapDetail: IMapDetailProps
    directions: object
    travel: boolean
    loading: boolean
  }
  transY: number
  getMapDetail?: (v) => void
  haversined: (mapPosition: object, value: any) => {}
}

const InfoListPresenter: React.FunctionComponent<IInfoListPresenterProps> = ({
  mapInfo,
  transY,
  getMapDetail,
  haversined,
}) => {
  const { mapDatas, currentPosition } = mapInfo

  const [scrollTop, ref] = useScroll()
  const totalItemCount =
    mapDatas?.length > 1 && mapDatas.length <= 20 ? mapDatas.length : 20
  const itemHeight = 130
  const scrollViewPortHeight = 400
  const scrollContainerHeight = Math.max(
    scrollViewPortHeight,
    itemHeight * totalItemCount
  )
  const startIdx = Math.floor(scrollTop / itemHeight)
  const offsetY = startIdx * itemHeight
  const visibleNodes = mapDatas?.slice(
    startIdx,
    startIdx + scrollViewPortHeight / itemHeight + 1
  )

  // 데이터
  if (mapDatas !== null) {
    return (
      <div ref={ref} css={ScrollViewport(transY)}>
        <div css={scrollContainer(scrollContainerHeight)}>
          <ul className="infoList">
            {visibleNodes?.map((item, i) => (
              <li
                key={i}
                css={visibleNodesWrapper(offsetY)}
                onClick={() => {
                  getMapDetail(item)
                }}
              >
                <h2>{item.name}</h2>
                <div>
                  <span>{item.rating}</span> <Rating star={item.rating} />
                </div>
                <p>현재 위치로부터 {haversined(currentPosition, item)} km</p>
              </li>
            ))}
          </ul>
        </div>
      </div>
    )
  }

  // 디폴트
  return (
    <div ref={ref} css={ScrollViewport(transY)}>
      <div className="infoList__default">
        <p>주변 카페를 검색 해보세요.</p>
        <span>ex) 스타벅스</span>
      </div>
    </div>
  )
}

const ScrollViewport = (transY) => css`
  display: block;
  width: 350px;
  height: 400px;
  overflow-y: ${transY > 0 || transY >= 350 ? 'hidden' : 'auto'};
  z-index: 3;
  -webkit-overflow-scrolling: touch;
  background: #e2e2e4;
  ${media.large} {
    width: 100%;
    height: 350px;
    background: #ffffff;
  }
  .infoList__default {
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    height: 100%;
    background: #ffffff;
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
  height: ${scrollContainerHeight + 30}px;
  ${media.large} {
    height: ${scrollContainerHeight}px;
  }
  .infoList {
    li {
      display: flex;
      flex-direction: column;
      justify-content: center;
      height: 130px;
      padding-left: 30px;
      cursor: pointer;
      background: #ffffff;
      border-radius: 6px;
      width: 95%;
      margin: 10px auto;
      box-shadow: 0px 1px rgb(0 0 0 / 50%);
      ${media.desktop} {
        &:hover {
          background-color: #f9f9f9;
        }
      }
      ${media.large} {
        width: 100%;
        border-radius: 0;
        margin: 0 auto;
        box-shadow: none;
        border-bottom: 1px #cccccc solid;
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
