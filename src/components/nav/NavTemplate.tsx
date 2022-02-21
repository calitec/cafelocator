import { css } from '@emotion/react'
import { after, notoBigger } from '../../lib/styles/common'
import media from '../../lib/styles/media'

const NavTemplate = ({ children }) => {
  return (
    <nav role="navigation" css={navTemplateContainer}>
      <h1>CAFE LOCATOR</h1>
      <div className="infoTemplate__head">{children}</div>
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
  .infoTemplate__head {
    ${after()}
    padding: 10px;
  }
  ${media.large} {
    top: 0;
    left: 0;
    width: 100%;
    transform: none;
    h1 {
      display: none;
    }
    .infoTemplate__head {
      position: fixed;
      top: 0;
      left: 0;
      width: 100%;
      background: #fff;
    }
  }
`

export default NavTemplate
