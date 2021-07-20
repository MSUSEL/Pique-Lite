import styled from 'styled-components';

export const DashboardGrid = styled.div`
    grid-area: mainview;
`

export const GroupWrapper = styled.div`
    column-count: 2;
    column-gap: 20px;
    margin-right: 20px;
    margin-left: 20px;
    
`
export const Group = styled.div`
    display: flex;
    flex-direction: column;
    align-items: center;
    width: 100%;
    margin-bottom: 10px;
    -webkit-column-break-inside: avoid;
    padding: 24px;
    box-sizing: border-box;
    
`