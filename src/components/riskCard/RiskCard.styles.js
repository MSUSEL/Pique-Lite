import styled from 'styled-components';
export const CardWrapper = styled.div`
    display: flex;
    align-items: center;
    justify-content: space-between;
    padding: 20px;
    background-color: ${p => p.color};
    color: black
`

export const ScoreWrapper = styled.span`
    margin-right: 15px;
    font-size: 20px;
`

export const Icon = styled.span`
    color: black;
    font-size: 40px;
    margin-left: 20px;
`