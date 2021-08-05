import styled from "styled-components";
import { Grey, DeepKoamaru} from "../../utils/color";
export const Content = styled.div`
    position: absolute;
    margin-top: 20px;
    padding: 10px;
    border: 2px solid white;
    background-color: ${Grey};
`
export const Close = styled.div`
    color: white ;
    float: right;
    font-size: 30px;
    font-weight: 800;
    margin-left: 5px;

    &:hover {
        color: ${DeepKoamaru};
        cursor: pointer;
    }
`

export const UploadContent = styled.div`
    margin: 20px 20px 20px 20px;
    padding-left: 10px;
    border: dashed 1px ${DeepKoamaru};
    display: flex;
    flex-direction: column;
    align-items: flex-start;
`

export const Input = styled.input`

`

export const Label = styled.label`
    display: inline-block;
    padding: 6px 12px;
    cursor: pointer;
    background-color: ${DeepKoamaru};
    color: white;
    padding: 0.5rem;
    border: 1px solid ${DeepKoamaru};
    border-radius: 15px;
`

export const FilePreview = styled.div`
    margin: 0 10px;
    background-color: white;
    color: black;
`

export const LoaderWrapper = styled.div`
    display: flex;
    align-items: center;
`

export const ButtonGroupContainer = styled.div`
    margin-top: 10px;
    display: flex;
    flex-direction: row;
`