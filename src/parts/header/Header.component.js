import React from 'react';
import AppBar from '@mui/material/AppBar';
import Toolbar from '@mui/material/Toolbar';
import { styled } from '@mui/material/styles';
import { Link } from 'react-router-dom';
import Box from '@mui/material/Box';
import pique from '../../assets/PIQUE_png.png';
import cisa from '../../assets/CISA.png';

const LogoIcon = styled('img')({
    height: '30px',
    width: 'auto',
    marginRight: '10px',
});

const PiqueIcon = styled('img')({
    height: '60px',
    width: 'auto',
    marginLeft: '10px',
});

const Header = () => {
    return (
        <AppBar position="fixed" sx={{ backgroundColor: '#D3D6DE', zIndex: (theme) => theme.zIndex.drawer + 1 }}>
            <Toolbar sx={{ justifyContent: 'center' }}>
                <Box
                    component={Link}
                    to="/"
                    sx={{
                        display: 'flex',
                        alignItems: 'center',
                        textDecoration: 'none',
                        color: 'inherit',
                    }}
                >
                    <LogoIcon src={cisa} alt="CISA Logo" />
                    <h1 style={{ margin: 0, fontFamily: 'Arial, sans-serif', color: 'black' }}>PIQUE LITE</h1>
                    <PiqueIcon src={pique} alt="Pique Logo" />
                </Box>
                {/* Uncomment this if you implement the account feature */}
                {/* <IconButton
                    edge="end"
                    aria-label="account of current user"
                    aria-haspopup="true"
                    color="inherit"
                >
                    <AccountCircle />
                </IconButton> */}
            </Toolbar>
        </AppBar>
    );
};

export default Header;
