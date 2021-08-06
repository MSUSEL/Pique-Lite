import styled from "styled-components";
import { Grey, DeepKoamaru, SkyBlue} from "../../utils/color";
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
    border: 1px solid black;

    &:hover {
        background-color: ${DeepKoamaru};
        cursor: pointer;
        color: white;
    }
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

export const SubmitButton = styled.button`
    padding: 8px;
    color: white;
    margin-right: 10px;
    background-color: ${SkyBlue};

    &:hover {
        background-color: ${DeepKoamaru};
        cursor: pointer;
        color: white;
    }
`