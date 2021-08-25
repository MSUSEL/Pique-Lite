import styled, {css} from "styled-components";
import { Grey } from "../../utils/color";

export const Content = styled.div`
    margin-top: 20px;
    padding: 10px 10px 10px 10px;
    border: 2px solid white;
    background-color: ${Grey};
    display: flex;
    flex-direction: row;
`

export const InputContainer = styled.div`
    display: flex;
    flex-direction: column;
    background-color: lightblue;
    color: black;
    align-items: flex-start;
    padding-left: 10px;
    padding-bottom: 10px;
    padding-right: 10px;
`
export const Input = styled.input`
    width: 250px;
    height: 25px;
    background: white;
    color: black;
    padding-left: 5px;
    font-size: 14px;
    border: 1px solid black;
    cursor: pointer;
    align-items: center;
`;
export const Title = styled.h3`
    color: black;
`

export const ButtonGroupContainer = styled.div`
    margin-top: 10px;
    display: flex;
    flex-direction: row;
`

/////////////////////////////////////////////////
export const BranchContainer = styled.div`
    display: flex;
    flex-direction: column;
    background-color: lightgreen;
    color: black;
    align-items: flex-start;
    padding-left: 10px;
    padding-bottom: 10px;
    padding-right: 10px;
`

/////////////////////////////////////////////
export const CommitContainer = styled.div`
    display: flex;
    flex-direction: column;
    background-color: lightgoldenrodyellow;
    color: black;
    align-items: flex-start;
    padding-left: 10px;
    padding-bottom: 10px;
    padding-right: 10px;
`