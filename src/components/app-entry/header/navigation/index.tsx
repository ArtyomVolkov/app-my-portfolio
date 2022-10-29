import React, { useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';

import Drawer from '@mui/material/Drawer';
import ListItemText from '@mui/material/ListItemText';
import ListItemIcon from '@mui/material/ListItemIcon';

import List from '@mui/material/List';
import ListItem from '@mui/material/ListItemButton';
import IconButton from '@mui/material/IconButton';
import MenuIcon from '@mui/icons-material/Menu';

import DashboardIcon from '@mui/icons-material/Dashboard';
import AccountBoxIcon from '@mui/icons-material/AccountBox';
import AnalyticsIcon from '@mui/icons-material/Analytics';

import './style.scss';

const NAV_OPTIONS = [
  {
    path: '/dashboard',
    label: 'Dashboard',
    icon: <DashboardIcon />
  },
  {
    path: '/account',
    label: 'Account',
    icon: <AccountBoxIcon />
  },
  {
    path: '/analytics',
    label: 'Analytics',
    icon: <AnalyticsIcon />
  },
];

const Navigation = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const [openDrawer, setOpenDrawer] = useState(false);

  const onToggleDrawer = () => {
    setOpenDrawer(!openDrawer)
  };

  const navigateTo = (path) => {
    setOpenDrawer(false);
    navigate(path);
  };

  const renderNavItem = ({ path, label, icon }) => {
    return (
      <ListItem
        key={path}
        onClick={() => navigateTo(path)}
        selected={location.pathname.includes(path)}
      >
        <ListItemIcon>
          { icon }
        </ListItemIcon>
        <ListItemText primary={label} />
      </ListItem>
    );
  }

  return (
    <>
      <IconButton
        size="large"
        edge="start"
        color="inherit"
        aria-label="menu"
        sx={{ mr: 2 }}
        onClick={onToggleDrawer}
      >
        <MenuIcon />
      </IconButton>
      <Drawer open={openDrawer} onClose={onToggleDrawer} className="nav-bar-drawer">
        <List className="nav-list">
          {
            NAV_OPTIONS.map(renderNavItem)
          }
        </List>
      </Drawer>
    </>
  );
}

export default Navigation;
