import styled from "styled-components";
import { Grey, DeepKoamaru} from "../../utils/color";
export const Container = styled.div`
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
