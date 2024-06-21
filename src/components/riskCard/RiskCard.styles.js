import styled from 'styled-components';

export const CardWrapper = styled.div`
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    font-size: 10px;
    padding: 5px; 
    background-color: ${p => p.color};
    width: 75px; 
    height: 75px; 
    border-radius: 8px; 
    box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1); 
    text-align: center; 
`;

export const ScoreWrapper = styled.span`
    font-size: 10px;
    margin-top: 8px; 
`;

export const Icon = styled.span`
    display: block;
    color: black;
    font-size: 20px;
    padding-top: 12px;
`;
