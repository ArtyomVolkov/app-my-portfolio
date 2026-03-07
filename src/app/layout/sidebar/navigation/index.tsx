import { useLocation, useNavigate } from 'react-router';

import ListItemText from '@mui/material/ListItemText';
import ListItemIcon from '@mui/material/ListItemIcon';

import List from '@mui/material/List';
import ListItem from '@mui/material/ListItemButton';

import { PATH_MAP, NAV_OPTIONS } from '@shared/constants/navigation';

import styles from './style.module.scss';

type NavigationProps = {
  onNavigate?: (path: string) => void;
};

const Navigation: React.FC<NavigationProps> = ({ onNavigate }) => {
  const navigate = useNavigate();
  const location = useLocation();

  const navigateTo = (path: string) => {
    navigate(path);

    if (onNavigate) {
      onNavigate(path);
    }
  };

  const renderNavItem = (item: string) => {
    return (
      <ListItem
        key={item}
        component="li"
        className={styles.navItem}
        onClick={() => navigateTo(item)}
        selected={location.pathname.includes(item)}
        classes={{
          selected: styles.selected,
        }}
      >
        <ListItemIcon className={styles.icon}>
          {PATH_MAP[item]?.icon}
        </ListItemIcon>
        <ListItemText primary={PATH_MAP[item]?.label} className={styles.text} />
      </ListItem>
    );
  };

  return (
    <nav>
      <List className={styles.navList}>{NAV_OPTIONS.map(renderNavItem)}</List>
    </nav>
  );
};

export default Navigation;
