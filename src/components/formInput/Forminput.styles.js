import styled, {css} from 'styled-components';

const shrinkLabelStyles = css`
    top: -10px;
    font-size: 14px;
    color: white;
`
export const FormInputContainer = styled.div`
    position: relative;
    width: 285px;
    input[type='text'] {
        letter-spacing: none;
  }
`

export const InputContainer = styled.input`
    background: none;
    background-color: white;
    color: #B9B7BD;
    font-size: 18px;
    padding: 5px 5px 5px 5px;
    display: block;
    width: 100%;
    border: none;
    border-bottom: 1px solid black;
    border-radius: 0;
    margin: 15px 0;
    &:focus {
        outline: none;
    }
    &:focus ~ label {
        ${shrinkLabelStyles}
    }
`

export const InputLabel = styled.label`
    color: #B9B7BD;
    font-size: 16px;
    font-weight: normal;
    position: absolute;
    pointer-events: none;
    left: 10px;
    top: 20px;
    transition: 300ms ease all;
    &.shrink {
        ${shrinkLabelStyles}
    }
`