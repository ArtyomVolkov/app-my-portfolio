import React from 'react';
import { useNavigate, useLocation } from 'react-router-dom';

import Link from '@mui/material/Link';
import MuiBreadcrumbs from '@mui/material/Breadcrumbs';

import { PATH_MAP } from '@components/aside/navigation';

import './style.scss';

const Breadcrumbs = () => {
  const navigation = useNavigate();
  const location = useLocation();

  const navigateTo = (event: React.MouseEvent<HTMLLabelElement>, pathname) => {
    event.preventDefault();
    navigation(pathname);
  };

  const renderItems = () => {
    const paths = location.pathname.length === 1 ? [''] : location.pathname.split('/');

    return paths.map((item, index) => {
      if (!item) {
        return (
          <label key={index} onClick={(e) => navigateTo(e, '/')}>
            <Link underline="hover" color="inherit" href="/" className="link">
              { PATH_MAP.home.icon }
              { PATH_MAP.home.label }
            </Link>
          </label>
        );
      }

      if (!PATH_MAP[item]) {
        return null;
      }
      const path = paths.slice(0, (index+1)).join('/');

      return (
        <label key={item} onClick={(e) => navigateTo(e, path)}>
          <Link
            underline="hover"
            color="inherit"
            href={path}
            className="link"
          >
            { PATH_MAP[item].icon }
            { PATH_MAP[item].label }
          </Link>
        </label>
      )
    })
  };

  return (
    <MuiBreadcrumbs className="mui-breadcrumbs">
      { renderItems() }
    </MuiBreadcrumbs>
  );
}

export default Breadcrumbs;
