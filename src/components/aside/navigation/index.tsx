import React from 'react';
import { useLocation, useNavigate } from 'react-router-dom';

import ListItemText from '@mui/material/ListItemText';
import ListItemIcon from '@mui/material/ListItemIcon';

import List from '@mui/material/List';
import ListItem from '@mui/material/ListItemButton';

import AccountBoxIcon from '@mui/icons-material/AccountBox';
import DashboardCustomizeIcon from '@mui/icons-material/DashboardCustomize';
import WidgetsIcon from '@mui/icons-material/Widgets';
import GameIcon from '@mui/icons-material/SportsEsports';

import './style.scss';

interface NavOption {
  path: string,
  label: string,
  icon: React.ReactElement,
}

export const NAV_OPTIONS: Array<NavOption> = [
  {
    path: '/profile',
    label: 'My Profile',
    icon: <AccountBoxIcon />
  },
  {
    path: '/components',
    label: 'Components',
    icon: <DashboardCustomizeIcon />
  },
  {
    path: '/widgets',
    label: 'Widgets',
    icon: <WidgetsIcon />
  },
  {
    path: '/games',
    label: 'Games',
    icon: <GameIcon />
  },
];

const Navigation = () => {
  const navigate = useNavigate();
  const location = useLocation();

  const navigateTo = (path) => {
    navigate(path);
  };

  const renderNavItem = ({ path, label, icon }) => {
    return (
      <ListItem
        key={path}
        className="nav-item"
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
    <nav>
      <List className="nav-list">
        {
          NAV_OPTIONS.map(renderNavItem)
        }
      </List>
    </nav>
  );
}

export default Navigation;
