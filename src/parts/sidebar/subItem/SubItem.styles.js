import styled from 'styled-components';
import {Link} from 'react-router-dom';

export const SubItemsContainer = styled.div`
  display: flex;
  flex-direction: column;
`
export const Icon = styled.div`
  font-size: 20px;
`
export const SidebarLabel = styled.span`
  margin-left: 15px;
`;

export const MenuItem = styled(Link)`
    padding: 20px 20px 20px 20px;
    color: white;
    display: flex;
    flex-direction: row;
    height: 30px;
    font-size: 18px;
    margin-bottom: 5px;

    &:hover{
        background-color: rgba(255, 255, 255, 0.2);
        cursor: pointer;
    }
`

export const Arrow = styled.div`
    margin-left: 15px;
    font-size: 20px;
`;

export const DropdownLink = styled(Link)`
    padding: 10px 10px 10px 20px;
    margin-left: 40px;
    color: white;
    display: flex;
    flex-direction: row;
    font-size: 14px;
    text-decoration: none;
    background-color: #132D72;
    border-bottom: 1px solid white;
    &:hover{
        background-color: rgba(255, 255, 255, 0.2);
        cursor: pointer;
    }
`;