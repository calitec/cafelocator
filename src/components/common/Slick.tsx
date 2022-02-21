import { useEffect, useState } from 'react'
import Slider from 'react-slick'
import { css } from '@emotion/react'
import Portal from '../common/Portal'
import media from '../../lib/styles/media'
import ModalPhoto from './ModalPhoto'
import FontAwesomeIcons from './FontAwesomeIcons'

interface IImagesProps {
  photos: {
    getUrl: () => string
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
    setActive({
      ...active,
      boolean: true,
      index: i,
    })
  }

  const onClose = () => {
    setActive({
      ...active,
      boolean: false,
      index: null,
    })
  }

  if (photos && photos.length > 1) {
    return (
      <div css={slickWrapper(active)}>
        <Slider {...settings}>
          {photos.map((v, i) => {
            return (
              <div key={v.getUrl()}>
                <div className="cover">
                  <img key={i} src={v.getUrl()} alt="이미지" />
                  <div className="zoom" onClick={(e) => onZoom(e, i)}>
                    <FontAwesomeIcons icon={'searchPlus'} color={'white'} />
                  </div>
                </div>
                {active.boolean ? (
                  <Portal>
                    <ModalPhoto onClose={onClose}>
                      <img
                        key={i}
                        src={photos[active.index]?.getUrl()}
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
        {photos !== undefined ? (
          <div className="cover">
            <img src={photos[0].getUrl()} alt="이미지" />
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
