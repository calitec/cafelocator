import * as React from 'react'
import { forwardRef } from 'react'
import { css } from '@emotion/react'
import { noto } from '../../lib/styles/common'

type ButtonProps = React.DetailedHTMLProps<
  React.ButtonHTMLAttributes<HTMLButtonElement>,
  HTMLButtonElement
>

export interface IButtonProps extends ButtonProps {}

const Button: React.FunctionComponent<IButtonProps> = forwardRef(
  ({ children, ...rest }, enterRef) => {
    return (
      <button
        ref={enterRef}
        css={buttonWrapper}
        className="custom-button"
        type="button"
        role="button"
        {...rest}
      >
        {children}
      </button>
    )
  }
)

export const buttonWrapper = css`
  font: ${noto()};
  outline: 0;
  background-color: transparent;
  touch-action: manipulation;
  white-space: nowrap;
  transition: all 0.2s;
  cursor: pointer;
  -webkit-appearance: button;
  vertical-align: middle;
  a {
    color: inherit;
  }
`

export default Button
