import React, { useState } from 'react';
import AppBar from '@mui/material/AppBar';
import Toolbar from '@mui/material/Toolbar';
import IconButton from '@mui/material/IconButton';
import Menu from '@mui/material/Menu';
import MenuItem from '@mui/material/MenuItem';
import AccountCircleIcon from '@mui/icons-material/AccountCircle';
import LogoutIcon from '@mui/icons-material/Logout';
import { styled } from '@mui/material/styles';
import { useAuth } from '../../contexts/authContext';

const NavbarContainer = styled('div')({
  flexGrow: 1,
});

const AppTitle = styled('h1')({
  fontSize: '1.5rem',
  fontWeight: 'bold',
  marginRight: 'auto',
  color: '#fff',
  textDecoration: 'none',
  cursor: 'pointer',
  '&:hover': {
    textDecoration: 'underline',
  },
});

const UserMenuIcon = styled(AccountCircleIcon)({
  color: '#fff',
  fontSize: '2rem',
  cursor: 'pointer',
  '&:hover': {
    fontSize: '2.2rem',
  },
});

export default function Navbar() {
  const [anchorEl, setAnchorEl] = useState(null);
  const isMenuOpen = Boolean(anchorEl);
  const [searchTerm, setSearchTerm] = useState('');

  const { user, logout } = useAuth();

  const handleProfileMenuOpen = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleMenuClose = () => {
    setAnchorEl(null);
  };

  const menuId = 'primary-search-account-menu';

  const handleSearch = (event) => {
    setSearchTerm(event.target.value);
    console.log(searchTerm)
  };

  return (
    <NavbarContainer>
      <AppBar position="static">
        <Toolbar>
          <AppTitle onClick={() => console.log('Logo Clicked')}>EATS</AppTitle>
          <div>
            {/* <input
              type="text"
              placeholder="Search stores, dishes, products..."
              value={searchTerm}
              onChange={handleSearch}
              style={{ marginRight: '1rem', padding: '0.5rem' }} // Style the search input
            /> */}
            <IconButton
              aria-label="account of current user"
              aria-controls={menuId}
              aria-haspopup="true"
              onClick={handleProfileMenuOpen}
              color="inherit"
            >
              <UserMenuIcon />
            </IconButton>
          </div>
        </Toolbar>
      </AppBar>
      <Menu
        anchorEl={anchorEl}
        anchorOrigin={{ vertical: 'top', horizontal: 'right' }}
        id={menuId}
        keepMounted
        transformOrigin={{ vertical: 'top', horizontal: 'right' }}
        open={isMenuOpen}
        onClose={handleMenuClose}
      >
        <MenuItem onClick={handleMenuClose}>
          <AccountCircleIcon fontSize="small" style={{ marginRight: '0.5rem' }} />
          Profile
        </MenuItem>
        <MenuItem onClick={logout}>
          <LogoutIcon fontSize="small" style={{ marginRight: '0.5rem' }} />
          Logout
        </MenuItem>
      </Menu>
    </NavbarContainer>
  );
}
