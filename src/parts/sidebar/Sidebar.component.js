import React, { useState } from 'react';
import { menuItemList } from './MenuItemData';
import pique from '../../assets/PIQUE_png.png';
import {
  Box,
  Typography,
  List,
  ListItem,
  ListItemIcon,
  ListItemText,
  Collapse,
  IconButton,
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
      position: 'absolute',
      display: 'flex',
      flexDirection: 'column',
      height: '100%',
      width: '65px',
      backgroundColor: '#D3D6DE',
      boxShadow: '1px 0 15px rgba(0, 0, 0, 0.07)',
      transition: 'width 0.2s linear',
      overflow: 'hidden',
      '&:hover': {
        width: '180px',
      },
    }}>
      <Box sx={{ display: 'flex', flexDirection: 'row', alignItems: 'center', mb: 2 }}>
        <IconButton component={Link} to="/" sx={{ height: '65px', width: 'auto' }}>
          <img src={pique} alt="Logo" style={{ height: '60px', width: 'auto'}} />
        </IconButton>
        <Typography variant="h5" sx={{ ml: 1, color: '#000', fontFamily: 'Titillium Web, sans-serif' }}>PIQUE</Typography>
      </Box>
      <List>
        {MenuItemJSX}
      </List>
    </Box>
  );
};

export default Sidebar;
