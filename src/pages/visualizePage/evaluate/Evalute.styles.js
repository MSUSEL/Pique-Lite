import styled, {css} from "styled-components";
import { Blue } from '../../../utils/color'

const columnsLayoutOpen = css`
    grid-template-columns: 350px 1fr;
`

const columnsLayoutClose = css`
    grid-template-columns: 0 1fr;
`

const getShowBar = props => {
        if (props.isOpen) {
        return columnsLayoutOpen
        }
    
        return columnsLayoutClose
  };
  
export const Grid = styled.div`
    grid-area: mainview;
    display: grid;
    ${getShowBar}
    grid-template-areas:
    "treeEditor treeView";
    height: 100vh;
`

export const TreeEditor = styled.div`
    grid-area: treeEditor;
    background-color: ${Blue};
`

export const TreeView = styled.div`
    grid-area: treeView;
    background-color: white;
`