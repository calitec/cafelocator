import * as React from 'react'
import { useState } from 'react'
import Slider from 'react-slick'
import { css } from '@emotion/react'
import Portal from '../common/Portal'
import media from '../../lib/styles/media'
import ModalPhoto from './ModalPhoto'
import FontAwesomeIcons from './FontAwesomeIcons'

interface IImagesProps {
  photos: {
    photo_reference: string
  }[]
}

const Slick: React.FunctionComponent<IImagesProps> = ({ photos }) => {
  const [active, setActive] = useState({
    boolean: false,
    index: null,
  })

  const settings = {
    arrows: false,
    dots: false,
    dotsClass: 'slick-dots slick-thumb',
    infinite: true,
    autoplay: true,
    autoplaySpeed: 3800,
    speed: 500,
    slidesToShow: 1,
    slidesToScroll: 1,
    swipe: active.boolean ? false : true,
  }

  const onZoom = (e, i) => {
    e.stopPropagation()
    e.preventDefault()
    setActive((prev) => ({
      ...prev,
      boolean: true,
      index: i,
    }))
  }

  const onClose = () => {
    setActive((prev) => ({
      ...prev,
      boolean: false,
      index: null,
    }))
  }

  if (photos && photos.length > 1) {
    return (
      <div css={slickWrapper(active)}>
        <Slider {...settings}>
          {photos.map((v, i) => {
            return (
              <div key={v.photo_reference}>
                <div className="cover">
                  <img
                    key={i}
                    src={`https://maps.googleapis.com/maps/api/place/photo?maxwidth=400&photoreference=${v?.photo_reference}&sensor=false&key=${process.env.REACT_APP_API_KEY}`}
                    alt="이미지"
                  />
                  <div className="zoom" onClick={(e) => onZoom(e, i)}>
                    <FontAwesomeIcons icon={'searchPlus'} color={'white'} />
                  </div>
                </div>
                {active.boolean ? (
                  <Portal>
                    <ModalPhoto onClose={onClose}>
                      <img
                        key={i}
                        src={`https://maps.googleapis.com/maps/api/place/photo?maxwidth=400&photoreference=${
                          photos[active.index]?.photo_reference
                        }&sensor=false&key=${process.env.REACT_APP_API_KEY}`}
                        alt="이미지"
                      />
                    </ModalPhoto>
                  </Portal>
                ) : (
                  ''
                )}
              </div>
            )
          })}
        </Slider>
      </div>
    )
  }
  return (
    <div css={slickWrapper(active)}>
      <Slider {...settings}>
        {photos != undefined ? (
          <div className="cover">
            <img
              src={`https://maps.googleapis.com/maps/api/place/photo?maxwidth=400&photoreference=${photos[0]?.photo_reference}&sensor=false&key=${process.env.REACT_APP_API_KEY}`}
              alt="이미지"
            />
          </div>
        ) : (
          ''
        )}
      </Slider>
    </div>
  )
}

const slickWrapper = (active) => css`
  .cover {
    position: relative;
    img {
      width: 100%;
    }
    .zoom {
      position: absolute;
      top: 15px;
      right: 15px;
      width: 10px;
      height: 10px;
      cursor: pointer;
    }
  }
  .slick-list {
    height: 200px;
    ${media.large} {
      height: 150px;
    }
    .slick-track {
      .slick-slide {
      }
    }
  }
`
export default Slick
