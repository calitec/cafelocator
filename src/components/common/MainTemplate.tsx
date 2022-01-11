import * as React from 'react'
import { css } from '@emotion/react'
import media from '../../lib/styles/media'

interface IAppLayoutProps {
  children: React.ReactNode
  nav: React.ReactNode
}

const MainTemplate: React.FunctionComponent<IAppLayoutProps> = ({
  children,
  nav,
}) => {
  return (
    <section css={MainTemplateContainer}>
      {nav}
      <main role="main">{children}</main>
    </section>
  )
}

const MainTemplateContainer = css`
  position: fixed;
  top: 50%;
  left: 150px;
  transform: translateY(-50%);
  ${media.large} {
    position: relative;
    top: auto;
    left: auto;
    transform: none;
  }
`

export default MainTemplate
