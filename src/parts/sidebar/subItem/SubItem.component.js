import React from 'react';
import * as s from './SubItem.styles'
const SubItem = ({item}) => {
    const [hasSubItem, setHasSubItem] = React.useState(false);
    const showSubItem = () => setHasSubItem(!hasSubItem);

    return (
        <s.SubItemsContainer>
            <s.MenuItem to={item.path} style={{textDecoration: 'none'}} onClick={item.subItems && showSubItem}>
                <s.Icon>{item.icon}</s.Icon>
                <s.SidebarLabel>{item.title}</s.SidebarLabel>
                <s.Arrow>
                    {item.subItems && hasSubItem
                        ? item.dropdownOpened
                        : item.subItems
                        ? item.dropdownClosed
                        : null
                    } 
                </s.Arrow>
            </s.MenuItem>
                {hasSubItem && item.subItems.map((item, index) => {
                    return (
                        <s.DropdownLink to={item.path} key={index}>
                            {item.icon}
                            <s.SidebarLabel>{item.title}</s.SidebarLabel>
                        </s.DropdownLink>
                    )
                })}
           
        </s.SubItemsContainer>
    )
}

export default SubItem;