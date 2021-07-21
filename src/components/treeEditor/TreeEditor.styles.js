import styled from 'styled-components';
export const Container = styled.div`
    background-color: #226192;
    display: flex;
    flex-direction: column;
    align-items: start;
    width: 200px;
    color: white;
    padding: 20px;
    margin-left: 40px;
    
`

export const Select = styled.select`
  width: 100%;
  height: 35px;
  background: white;
  color: gray;
  padding-left: 5px;
  font-size: 14px;
  border: 1px solid black;
  margin-left: 10px;
  margin-top: 20px;
  option {
    color: black;
    background: white;
    display: flex;
    white-space: pre;
    min-height: 20px;
    padding: 0px 2px 1px;
    margin-bottom: 20px;
  }
`;

export const ButtonGroupContainer = styled.div`
    margin-top: 20px;
    display: flex;
    justify-content: center;
`

export const Span = styled.span`
  margin-top: 20px;
`