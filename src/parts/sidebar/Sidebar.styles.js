import styled from 'styled-components';

export const SidenavContainer = styled.div`
    position: absolute;
    display: flex;
    flex-direction: column;
    grid-area: sidenav;
    height: 100%;
    width: 55px;
    background-color: #F7F7F7;
    box-shadow: 1px 0 15px rgba(0, 0, 0, 0.07);
    transition: width 0.2s linear;
    overflow: hidden;

    &:hover {
        width: 250px;
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
    color: #134e6f;
    font-size: 24px;
    letter-spacing: 2px;
    font-family: 'Titillium Web', sans-serif;
`;

export const LogoIcon = styled.img`
    height: 65px;
    width: auto;
`;

export const MenuItemList = styled.ul`
    list-style: none;
    padding: 0;
    margin: 7px 0;
`;

export const MenuItem = styled.li`
    position: relative;
    display: block;
    width: 250px;
`;

export const MenuItemLink = styled.a`
    position: relative;
    display: table;
    width: 100%;
    text-decoration: none;
    color: #8a8a8a;
    font-size: 13px;
    font-family: 'Arial', sans-serif;
    border-top: 1px solid #f2f2f2;
    transition: all 0.14s linear;

    &:hover {
        color: #fff;
        background-color: #00bbbb;
    }
`;

export const Icon = styled.i`
    position: relative;
    display: table-cell;
    width: 55px;
    height: 36px;
    text-align: center;
    vertical-align: middle;
    font-size: 18px;
`;

export const NavText = styled.span`
    position: relative;
    display: table-cell;
    vertical-align: middle;
    width: 190px;
    font-family: 'Titillium Web', sans-serif;
`;

export const Close = styled.div`
    left: 0;
    transition: 350ms;
`;

export const Scrollbar = styled.div`
    height: 90%;
    width: 100%;
    overflow-y: hidden;

    &:hover {
        overflow-y: scroll;
    }

    &::-webkit-scrollbar-track {
        border-radius: 2px;
    }

    &::-webkit-scrollbar {
        width: 5px;
        background-color: #f7f7f7;
    }

    &::-webkit-scrollbar-thumb {
        border-radius: 10px;
        box-shadow: inset 0 0 6px rgba(0, 0, 0, 0.3);
        background-color: #bfbfbf;
    }
`;

export const Darkerli = styled(MenuItem)`
    background-color: #ededed;
    text-transform: capitalize;
`;

export const Darkerlishadow = styled(MenuItem)`
    background-color: #ededed;
    text-transform: capitalize;
    box-shadow: inset 0px 5px 5px -4px rgba(50, 50, 50, 0.55);
`;

export const Darkerlishadowdown = styled(MenuItem)`
    background-color: #ededed;
    text-transform: capitalize;
    box-shadow: inset 0px -4px 5px -4px rgba(50, 50, 50, 0.55);
`;
