import styled, { css } from 'styled-components';

const columnsLayoutOpen = css`
    grid-template-columns: 300px 1fr;
`;

const columnsLayoutClose = css`
    grid-template-columns: 0 1fr;
`;

export const Grid = styled.div`
    grid-area: mainview;
    display: grid;
    grid-template-areas:
    "treeEditor treeView";
    height: 100vh;
    width: 200vw;
    margin-left: -20vh;
    margin-top: -5vh;
`;

export const TreeEditor = styled.div`
    grid-area: treeEditor;
    background-color: white;
`;

export const ToggleButton = styled.button`
    position: absolute;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
    background-color: #007bff;
    color: white;
    padding: 10px 20px;
    border: none;
    border-radius: 4px;
    cursor: pointer;
    z-index: 10;
`;
