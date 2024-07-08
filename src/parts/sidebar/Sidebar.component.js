import React, { useState } from 'react';
import { menuItemList } from './MenuItemData';
import {
  Box,
  List,
  ListItem,
  ListItemIcon,
  ListItemText,
  Collapse,
} from '@mui/material';
import { ExpandLess, ExpandMore } from '@mui/icons-material';
import { Link } from 'react-router-dom';

const Sidebar = () => {
  const [openSubItemIndex, setOpenSubItemIndex] = useState(null);

  const handleSubItemClick = (index) => {
    setOpenSubItemIndex(openSubItemIndex === index ? null : index);
  };

  const MenuItemJSX = menuItemList.map((item, index) => (
    <Box key={index}>
      <ListItem button component={Link} to={item.path} onClick={item.subItems ? () => handleSubItemClick(index) : null}>
        <ListItemIcon>{item.icon}</ListItemIcon>
        <ListItemText primary={item.title} />
        {item.subItems && (openSubItemIndex === index ? <ExpandLess /> : <ExpandMore />)}
      </ListItem>
      {item.subItems && (
        <Collapse in={openSubItemIndex === index} timeout="auto" unmountOnExit>
          <List component="div" disablePadding>
            {item.subItems.map((subItem, subIndex) => (
              <ListItem button key={subIndex} component={Link} to={subItem.path} sx={{ pl: 4 }}>
                <ListItemIcon>{subItem.icon}</ListItemIcon>
                <ListItemText primary={subItem.title} />
              </ListItem>
            ))}
          </List>
        </Collapse>
      )}
    </Box>
  ));

  return (
    <Box sx={{
      position: 'fixed',
      top: '64px', // Assuming header height is 64px
      display: 'flex',
      flexDirection: 'column',
      height: 'calc(100% - 64px)', // Full height minus header height
      width: '65px',
      backgroundColor: '#D3D6DE',
      boxShadow: '1px 0 15px rgba(0, 0, 0, 0.07)',
      transition: 'width 0.2s linear',
      overflow: 'hidden',
      '&:hover': {
        width: '180px',
      },
    }}>
      <List>
        {MenuItemJSX}
      </List>
    </Box>
  );
};

export default Sidebar;
