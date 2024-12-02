import React from 'react';
import { AppBar, Toolbar, IconButton, Typography } from '@mui/material';
import MenuIcon from '@mui/icons-material/Menu';

const Header = ({ toggleDrawer }) => {
  return (
    <AppBar position="fixed">
      <Toolbar>
        <IconButton
          edge="start"
          color="inherit"
          aria-label="menu"
          onClick={toggleDrawer} // Toggle drawer visibility
        >
          <MenuIcon />
        </IconButton>
        <Typography variant="h6">Dashboard</Typography>
      </Toolbar>
    </AppBar>
  );
};

export default Header;
