import { css } from '@emotion/react'
import media from '../../lib/styles/media'
interface IModalProps {
  children: any
  onClose: () => void
}
const ModalPhoto: React.FunctionComponent<IModalProps> = ({
  children,
  onClose,
}) => {
  return (
    <div css={modalPhotoWrapper}>
      <div className="overlay" onClick={onClose}></div>
      <button onClick={onClose}></button>
      {children}
    </div>
  )
}

const modalPhotoWrapper = css`
  z-index: 3;
  .overlay {
    background: rgba(0, 0, 0, 0.1);
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    overflow: hidden;
  }
  button {
    position: absolute;
    top: 25px;
    right: 25px;
    background: none;
    border: none;
    cursor: pointer;
    width: 25px;
    height: 25px;
    padding: 0;
    z-index: 3;
    &::before,
    &::after {
      position: absolute;
      display: block;
      content: '';
      clear: both;
      width: 100%;
      height: 1px;
      background: #fff;
      transform: rotate(45deg);
    }
    &::after {
      transform: rotate(-45deg);
    }
    &:hover {
      &::before,
      &::after {
        background: #999999;
      }
    }
  }
  img {
    position: fixed;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
    z-index: 3;
    width: 80%;
    ${media.large} {
      width: 100%;
    }
  }
`

export default ModalPhoto
