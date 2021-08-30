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
    flex-direction: row;
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
    flex-direction: row;
    background-color: lightgoldenrodyellow;
    color: black;
    align-items: flex-start;
    padding-left: 10px;
    padding-bottom: 10px;
    padding-right: 10px;
`

export const List = styled.ul`
  list-style: none;
  padding: 0px 20px;
  background-color: #fff;
  border-bottom-left-radius: 4px;
  border-bottom-right-radius: 4px;
  border-top: 3px solid black;
  box-shadow: 0 3px 5px 0 rgba(0, 0, 0, 0.16);
`;

export const ListItem = styled.li`
  display: flex;
  flex-direction: column;
  padding: 10px 0px;
  border-top: 1px solid green;
`

export const WithButtonContainer = styled.div`
    display: flex;
    flex-direction: row;
    background-color: red;
    align-items: center;
`