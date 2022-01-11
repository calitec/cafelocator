import * as React from 'react'
import { useRef } from 'react'
import { IMapDetailProps } from '../../types/map'
import FontAwesomeIcons from '../../components/common/FontAwesomeIcons'
import Rating from '../common/Rating'
import { after, noto, notoBig } from '../../lib/styles/common'
import media from '../../lib/styles/media'
import { css } from '@emotion/react'
import Hours from './utils/hours/HoursContainer'
import ReviewContainer from './utils/review/ReviewContainer'
import Slick from '../common/Slick'

interface IInfoDetailPresenterProps {
  mapDetail: IMapDetailProps
  transY: number
  onClearDirections?: () => void
  setTravel: () => void
}

const InfoDetailPresenter: React.FunctionComponent<
  IInfoDetailPresenterProps
> = ({ mapDetail, transY, onClearDirections, setTravel }) => {
  const refs = useRef()

  return (
    <>
      {transY < 1 ? (
        <div
          css={infoDetailContainer}
          className={mapDetail ? 'infoDetail activated' : 'infoDetail'}
        >
          <button onClick={onClearDirections}>
            <FontAwesomeIcons icon={'close'} color={'black'} />
          </button>
          <div className="infoDetail__wrapper" ref={refs}>
            <Slick photos={mapDetail.photos} />
            <div className="infoDetail__description">
              <h3>{mapDetail && mapDetail.name}</h3>
              <button className="travel" onClick={setTravel}>
                경로
              </button>
              <div className="rating head">
                <span className="icon">
                  <Rating star={mapDetail.rating} single={true} />
                </span>
                <span className="indent">
                  {' '}
                  {(mapDetail && mapDetail.rating) || '별점 없음'}
                </span>
              </div>
              <div className="head">
                <span className="icon">
                  <FontAwesomeIcons icon={'phone'} color={'black'} />{' '}
                </span>
                <span className="indent">
                  {(mapDetail && mapDetail.formatted_phone_number) ||
                    '전화번호 없음'}
                </span>
              </div>
              <Hours wrapperRef={refs} />
              <ReviewContainer wrapperRef={refs} />
            </div>
          </div>
        </div>
      ) : (
        ''
      )}
    </>
  )
}

const infoDetailContainer = css`
  display: none;
  position: fixed;
  bottom: 0;
  width: 350px;
  height: 400px;
  background: rgb(255, 255, 255);
  border-radius: 20px;
  z-index: -1;
  ${media.large} {
    width: 100%;
    height: 350px;
    border-radius: 10px;
    box-shadow: -1px 0px 7px rgb(0 0 0 / 20%);
  }
  @keyframes toTheRight {
    from {
      opacity: 0;
      left: 0;
    }
    to {
      opacity: 1;
      left: 360px;
    }
  }
  @keyframes fixPosition {
    from {
      opacity: 0;
    }
    to {
      opacity: 1;
      z-index: 3;
    }
  }
  &.activated {
    display: block;
    animation: toTheRight 0.5s;
    animation-fill-mode: forwards;
    ${media.large} {
      display: block;
      animation: fixPosition 0.5s;
      animation-fill-mode: forwards;
    }
  }
  ${after()}
  >button {
    float: right;
    border: 0;
    margin: 10px 10px 10px 0;
    background-color: transparent;
  }
  > div.infoDetail__wrapper {
    width: 100%;
    height: 350px;
    margin: 0 auto;
    overflow-y: auto;
    ${media.large} {
      height: 300px;
    }
    .cover {
      display: flex;
      align-items: center;
      justify-content: center;
      width: 100%;
      img {
        object-fit: cover;
        height: 100%;
        width: 100%;
      }
    }
    .infoDetail__description {
      position: relative;
      padding: 0 20px;
      .head {
        position: relative;
        font: ${noto(25)};
        color: #000;
      }
      .icon {
        position: absolute;
        top: 0;
        left: 0;
      }
      .indent {
        display: inline-block;
        position: relative;
        width: 100%;
        left: 20px;
        em {
          margin-left: 5px;
        }
        span {
          float: right;
          position: relative;
          right: 10px;
        }
      }
      h3 {
        display: inline-block;
        font: ${notoBig(16, 500)};
        color: #000;
        margin: 25px 0 10px;
        text-transform: uppercase;
      }
      .travel {
        position: absolute;
        top: 20px;
        right: 10px;
        font: ${noto(14, 500)};
        padding: 7px 14px;
        background: rgba(0, 0, 0, 0.045);
        border: 0;
        border-radius: 3px;
        &:hover {
          background: rgba(0, 0, 0, 0.08);
          transition: all 0.5s ease-in-out;
        }
      }
      .rating {
        span {
          font: ${noto()};
          font-weight: 500;
          .ratingWrapper {
          }
          &:first-of-type {
            left: -5px;
          }
        }
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
  }
`

export default InfoDetailPresenter
