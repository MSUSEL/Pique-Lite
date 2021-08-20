import styled from "styled-components";
export const Container = styled.div`
    position: absolute;
    margin-top: 20px;
    padding: 10px;
    border: 2px solid white;

`

export const InputContainer = styled.div`
    display: flex;
    background-color: blue;
    flex-direction: row;
    align-items: flex-start;
    padding: 20px 20px 20px 20px;
    max-width: 400px;
`

export const ResultContainer = styled.div`
    max-width: 350px;
    padding: 20px 20px 20px 20px;
`

export const ProjectGrid = styled.div`
     display: grid;
    grid-template-columns: 1fr 1fr;
    grid-template-areas:
    "input sorting";
    height: 100vh;
`

export const InputPart = styled.div`
    grid-area: input;
    background-color: #B9B7BD;
`

export const SortingPart = styled.div`
    grid-area: sorting;
    background-color: red;
`