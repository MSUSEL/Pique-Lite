import styled, {css} from "styled-components";
import { Grey, DeepKoamaru, SkyBlue} from "../../utils/color";

export const Input = styled.input`
    padding: 8px;
    margin-right: 10px;

`
export const Label = styled.label`
    display: inline-block;
    padding: 8px;
    cursor: pointer;
    background-color: ${SkyBlue};
    color: white;
    margin-right: 10px;
    margin-left: 10px;
    border: 1px solid black;
    font-size: 16px;

    &:hover {
        background-color: ${DeepKoamaru};
        cursor: pointer;
        color: white;
    }
`

export const LoaderWrapper = styled.div`
    display: flex;
    align-items: center;
    flex-direction: row;
    width: 100%;
    height: 50px;
    background-color: #134e6f;
    padding: 20px 5px 5px 5px;
    margin-bottom: 20px;
`
const ButtonStyle = css`
    padding: 8px;
    color: white;
    margin-right: 5px;
    &:hover {
        background-color: ${DeepKoamaru};
        cursor: pointer;
        color: white;
    }
`
export const SubmitButton = styled.button`
    background-color: ${props => props.submit ? Grey : SkyBlue} ;
    ${ButtonStyle}
`
export const ResetButton = styled.button`
    background-color: ${SkyBlue};
    ${ButtonStyle}
`