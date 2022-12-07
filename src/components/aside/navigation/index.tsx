import React from 'react';
import { useLocation, useNavigate } from 'react-router-dom';

import ListItemText from '@mui/material/ListItemText';
import ListItemIcon from '@mui/material/ListItemIcon';

import List from '@mui/material/List';
import ListItem from '@mui/material/ListItemButton';

import HomeIcon from '@mui/icons-material/Home';
import AccountIcon from '@mui/icons-material/AccountBox';
import ComponentsIcon from '@mui/icons-material/DashboardCustomize';
import WidgetsIcon from '@mui/icons-material/Widgets';
import GameIcon from '@mui/icons-material/SportsEsports';
import CategoryIcon from '@mui/icons-material/Category';
import ExtensionRoundedIcon from '@mui/icons-material/ExtensionRounded';
import HistoryRoundedIcon from '@mui/icons-material/HistoryRounded';
import AppRegistrationIcon from '@mui/icons-material/AppRegistration';
import GridOnRoundedIcon from '@mui/icons-material/GridOnRounded';

import './style.scss';

export const PATH_MAP: {[key: string]: { label: string, icon: React.ReactElement }} = {
  home: {
    label: 'Home',
    icon: <HomeIcon />,
  },
  profile: {
    label: 'My Profile',
    icon: <AccountIcon />,
  },
  components: {
    label: 'Components',
    icon: <ComponentsIcon />,
  },
  shapes: {
    label: '3D Shapes',
    icon: <CategoryIcon />,
  },
  widgets: {
    label: 'Widgets',
    icon: <WidgetsIcon />,
  },
  games: {
    label: 'Games',
    icon: <GameIcon />,
  },
  puzzle: {
    label: 'Puzzle',
    icon: <ExtensionRoundedIcon />
  },
  sudoku: {
    label: 'Sudoku',
    icon: <AppRegistrationIcon />
  },
  history: {
    label: 'History',
    icon: <HistoryRoundedIcon />
  },
  katana: {
    label: 'Katana',
    icon: <GridOnRoundedIcon />,
  }
};

export const NAV_OPTIONS: Array<string> = [
  'profile',
  'components',
  'widgets',
  'games',
];

const Navigation = () => {
  const navigate = useNavigate();
  const location = useLocation();

  const navigateTo = (path) => {
    navigate(path);
  };

  const renderNavItem = (item) => {
    return (
      <ListItem
        key={item}
        className="nav-item"
        onClick={() => navigateTo(item)}
        selected={location.pathname.includes(item)}
      >
        <ListItemIcon>
          { PATH_MAP[item]?.icon }
        </ListItemIcon>
        <ListItemText primary={PATH_MAP[item]?.label} />
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
