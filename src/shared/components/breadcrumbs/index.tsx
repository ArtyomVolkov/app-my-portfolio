import React from 'react';
import { useNavigate, useLocation } from 'react-router-dom';

import Link from '@mui/material/Link';
import MuiBreadcrumbs from '@mui/material/Breadcrumbs';
import HomeIcon from '@mui/icons-material/Home';

import { NAV_OPTIONS } from '@components/aside/navigation';

import './style.scss';

const Breadcrumbs = () => {
  const navigation = useNavigate();
  const location = useLocation();

  const navigateTo = (event: React.MouseEvent<HTMLLabelElement>, pathname) => {
    event.preventDefault();
    navigation(pathname);
  };

  const renderItems = () => {
    const item = NAV_OPTIONS.find((item) => item.path.includes(location.pathname));

    if (!item) {
      return null;
    }

    return (
      <label onClick={(e) => navigateTo(e, item.path)}>
        <Link
          underline="hover"
          color="inherit"
          href={item.path}
          className="link"
        >
          { item.icon }
          { item.label }
        </Link>
      </label>
    );
  };

  return (
    <MuiBreadcrumbs className="mui-breadcrumbs">
      <label onClick={(e) => navigateTo(e, '/')}>
        <Link underline="hover" color="inherit" href="/" className="link">
          <HomeIcon />
          Home
        </Link>
      </label>
      {
        renderItems()
      }
    </MuiBreadcrumbs>
  );
}

export default Breadcrumbs;
