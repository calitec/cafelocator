import * as React from 'react';
import { css } from '@emotion/react';
import { noto } from '../../lib/styles/common';

type InputProps = React.DetailedHTMLProps<
    React.InputHTMLAttributes<HTMLInputElement>,
    HTMLInputElement
>;

export interface IInputProps extends InputProps {
    placeholder?: string;
    name?: string;
    value?: string;
    onChange?: React.ChangeEventHandler;
    style: any;
}

const Input: React.FunctionComponent<IInputProps> = ({
    name,
    value,
    placeholder,
    onChange,
    style,
    ...rest
}) => {

    return (
        <input
            css={inputWrapper(style)}
            name={name}
            value={value}
            placeholder={placeholder}
            onChange={onChange}
            {...rest}
        />
    );
};

const inputWrapper = (style) => css`
        box-sizing: border-box;
        border: 1px solid transparent;
        width: 100%;
        height: 32px;
        padding: 0 12px;
        font: ${noto()};
        outline: none;
        text-overflow: ellipsis;
        ${style}
`

export default Input;