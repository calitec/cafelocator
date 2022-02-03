import { Spinner as Spins } from 'react-bootstrap'
import { css } from '@emotion/react'

const Spin = () => {
  return (
    <div css={spinnerWrapper}>
      <Spins animation="border" variant="success" />
    </div>
  )
}

const spinnerWrapper = css`
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  z-index: 2;
`

export default Spin
