import styled from "styled-components";
import {DeepKoamaru, SkyBlue, GreyBlue} from "../../utils/color";

export const LoaderWrapper = styled.div`
    display: flex;
    align-items: center;
    flex-direction: row;
    width: 100%;
    height: 50px;
    background-color: ${GreyBlue};
    padding: 20px 5px 5px 5px;
    margin-bottom: 20px;
`

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
    margin-bottom: 10px;
    border: 1px solid black;
    font-size: 16px;

    &:hover {
        background-color: ${DeepKoamaru};
        cursor: pointer;
        color: white;
    }
`

export const ProgressResult = styled.div`
    height: 20px;
    font-size: x-small;
`