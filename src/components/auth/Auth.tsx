import * as React from 'react'
import { useAuthState } from '../../context/AuthProvider'
import { css } from '@emotion/react'
import { noto } from '../../lib/styles/common'

const Auth: React.FunctionComponent = () => {
  const { user, onLogin, onLogout } = useAuthState()

  return (
    <div css={authContainer}>
      <form action="">
        {user == null ? (
          <button onClick={onLogin} type="submit">
            <img
              src="//maps.gstatic.com/mapfiles/maps_lite/images/2x/signinphoto_96dp.png"
              alt=""
            />
          </button>
        ) : (
          <button onClick={onLogout}>
            <img src={user ? user?.user?.photoURL : ''} alt="" />
          </button>
        )}
      </form>
    </div>
  )
}

const authContainer = css`
  float: right;
  span {
    display: inline-block;
    font: ${noto()};
    font-weight: 700;
    color: #000;
    margin-left: 10px;
  }
  button {
    font: ${noto()};
    font-weight: 700;
    color: #000;
    background: none;
    border: 0;
    border-radius: 44%;
    width: 35px;
    height: 35px;
    overflow: hidden;
    position: relative;
    box-shadow: 1.5px 1.5px 4px rgba(0, 0, 0, 0.8);
    img {
      position: absolute;
      top: 0;
      left: 0;
      right: 0;
      bottom: 0;
      object-fit: contain;
      width: 100%;
    }
  }
`

export default Auth
