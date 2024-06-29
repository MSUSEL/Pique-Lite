import styled from 'styled-components';
import { Link } from 'react-router-dom';

export const SidenavContainer = styled.div`
    position: absolute;
    display: flex;
    flex-direction: column;
    grid-area: sidenav;
    height: 100%;
    width: 70px;
    background-color: #D3D6DE;
    box-shadow: 1px 0 15px rgba(0, 0, 0, 0.07);
    transition: width 0.2s linear;
    overflow: hidden;

    &:hover {
        width: 180px;
    }
`;

export const HeaderWrapper = styled.div`
    display: flex;
    flex-direction: row;
    align-items: center;
    margin-bottom: 20px;
`;

export const SidebarHeader = styled.h3`
    margin: 0;
    margin-left: 10px;
    color: #000; /* Changed to black */
    font-size: 24px;
    letter-spacing: 2px;
    font-family: 'Titillium Web', sans-serif;
`;

export const LogoIcon = styled.img`
    height: 65px;
    width: auto;
    color: black;
`;

export const MenuItemList = styled.ul`
    list-style: none;
    padding: 0;
    margin: 7px 0;
    color: black;
`;

export const MenuItem = styled.li`
    position: relative;
    display: block;
    width: 250px;
`;

export const MenuItemLink = styled(Link)`
    padding: 20px 20px 20px 20px;
    color: white;
    display: flex;
    flex-direction: row;
    height: 30px;
    font-size: 18px;
    margin-bottom: 5px;
    text-decoration: none;

    &:hover {
        background-color: rgba(255, 255, 255, 0.2);
        cursor: pointer;
    }
`;

export const Icon = styled.div`
    font-size: 20px;
`;

export const SidebarLabel = styled.span`
    margin-left: 15px;
`;

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

    &:hover {
        background-color: rgba(255, 255, 255, 0.2);
        cursor: pointer;
    }
`;

export const SubItemsContainer = styled.div`
    display: flex;
    flex-direction: column;
`;
