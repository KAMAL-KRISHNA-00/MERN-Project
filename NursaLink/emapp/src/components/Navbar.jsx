import React, { useState } from 'react';
import {
  AppBar,
  Box,
  Toolbar,
  Typography,
  IconButton,
  Menu,
  MenuItem
} from '@mui/material';
import ListIcon from '@mui/icons-material/List';
import rawLogo from '../assets/raw.jpg';
import { Link, useNavigate } from 'react-router-dom';

const Navbar = () => {
  const [anchorEl, setAnchorEl] = useState(null);
  const navigate = useNavigate();

  const handleMenuOpen = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleMenuClose = (path) => {
    setAnchorEl(null);
    if (path) navigate(path);
  };

  return (
    <div >
      <AppBar sx={{background: 'linear-gradient(135deg, #d81b60, #ffca28)', 
          boxShadow: '0 4px 12px rgba(0,0,0,0.2)',}}>
        <Toolbar sx={{ display: 'flex', justifyContent: 'space-between' }}>
         
          <IconButton
            color="inherit"
            onClick={handleMenuOpen}
            sx={{ mr: 2 }}
          >
            <ListIcon sx={{ fontSize: 30 }} />
          </IconButton>

         
          <Menu
            anchorEl={anchorEl}
            open={Boolean(anchorEl)}
            onClose={() => handleMenuClose()}
          >
            <MenuItem onClick={() => handleMenuClose('/home')}>Home</MenuItem>
            <MenuItem onClick={() => handleMenuClose('/contact')}>Contact Us</MenuItem>
            <MenuItem onClick={() => handleMenuClose('/feedback')}>Feedback</MenuItem>
            <MenuItem onClick={() => handleMenuClose('/login')}>Login</MenuItem>
          </Menu>

         
          <Box sx={{ display: 'flex', alignItems: 'center', flexGrow: 1, justifyContent: 'center' }}>
            <img
              src={rawLogo}
              alt="Logo"
              style={{
                width: '40px',
                height: '40px',
                objectFit: 'cover',
                marginRight: '10px',
                borderRadius: '50%',
              }}
            />
            <Link to="/home" style={{ textDecoration: 'none', color: 'white' }}>
              <Typography
                variant="h6"
                sx={{
                  fontFamily: 'Orbitron, sans-serif',
                  fontWeight: 700,
                  letterSpacing: '2px'
                }}
              >
                NURSALINK
              </Typography>
            </Link>
          </Box>
        </Toolbar>
      </AppBar>

      <Toolbar /> 
    </div>
  );
};

export default Navbar;
