import { css } from '@emotion/react'
import { after, notoBigger } from '../../lib/styles/common'
import media from '../../lib/styles/media'
import Auth from '../auth/Auth'
import Input from './Input'

const NavTemplate = () => {
  return (
    <nav role="navigation" css={navTemplateContainer}>
      <h1>CAFE LOCATOR</h1>
      <div className="navWrapper">
        <div className="searchWrapper">
          <Input placeholder="주변 카페를 검색 해보세요" style={input} />
        </div>
        <Auth />
      </div>
    </nav>
  )
}

const navTemplateContainer = css`
  h1 {
    font: ${notoBigger(35)};
    font-size: 30px;
    color: #000;
    text-shadow: 1px 1px #4b4b4b;
    padding-left: 10px;
    user-select: none;
  }
  .navWrapper {
    ${after()}
    padding: 10px;
  }
  .searchWrapper {
    display: inline-block;
    position: relative;
    top: 2px;
    width: 85%;
    button {
      position: absolute;
      top: 50%;
      right: 5px;
      transform: translateY(-50%);
      border: 0;
      background-color: transparent;
      cursor: pointer;
      z-index: 2;
    }
  }
  ${media.large} {
    top: 0;
    left: 0;
    width: 100%;
    transform: none;
    h1 {
      display: none;
    }
    .navWrapper {
      position: fixed;
      top: 0;
      left: 0;
      width: 100%;
      background: #fff;
    }
  }
`
const input = css`
  background: #000024;
  color: #fff;
  line-height: 32px;
  font-weight: 500;
  border-radius: 100px;
  text-indent: 5px;
  width: 100%;
`

export default NavTemplate
