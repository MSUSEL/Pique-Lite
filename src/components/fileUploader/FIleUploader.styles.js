import styled from "styled-components";

export const FileUploaderContainer = styled.div`
    width: 500px;
    height: 100%;
    position: relative;
    background-color: #B9B7BD;
    color: black;
    box-sizing: border-box;
    border: 1px black solid;
    border-radius: 2px;
    box-shadow: 0 2px 4px rgba(black, .35), 0 3px 6px rgba(black, .65); ;
    margin-left: 20px ;
    padding: 1.5em 1em;
`
export const Input = styled.input`
    width: 250px;
    height: 35px;
    background: white;
    color: black;
    padding-left: 5px;
    font-size: 14px;
    border: 1px solid black;
    margin-left: 10px;
    margin-top: 20px;
    cursor: pointer;
    align-items: center;
    padding-top: 10px;
`;

export const ButtonGroupContainer = styled.div`
    margin-top: 10px;
    display: flex;
    flex-direction: row;
`