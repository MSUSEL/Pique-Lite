import React from 'react';
import { menuItemList } from './MenuItemData';
import pique from '../../assets/PIQUE_png.png';
import SubItem from './subItem/SubItem.component';

import { 
    SidenavContainer, 
    HeaderWrapper, 
    LogoIcon, 
    SidebarHeader, 
    MenuItemList 
} from './Sidebar.styles';

const Sidebar = () => {
    const MenuItemJSX = menuItemList.map((item, index) => {
        return (
            <SubItem item={item} key={index} />
        );
    });
    return (
        <SidenavContainer>
            <HeaderWrapper>
                <LogoIcon src={pique} />
                <SidebarHeader>PIQUE</SidebarHeader>
            </HeaderWrapper>
            <MenuItemList>
                {MenuItemJSX}
            </MenuItemList>
        </SidenavContainer>
    );
}

export default Sidebar;
