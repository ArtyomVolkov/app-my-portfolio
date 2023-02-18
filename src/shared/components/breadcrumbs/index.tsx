import React from 'react';
import { useNavigate, useLocation } from 'react-router-dom';

import Link from '@mui/material/Link';
import MuiBreadcrumbs from '@mui/material/Breadcrumbs';

import { PATH_MAP } from '@components/aside/navigation';

import styles from './style.module.scss';

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
            <Link underline="hover" color="inherit" href="/" className={styles.link}>
              { PATH_MAP.home.icon }
              <span className={styles.pageLabel}>{ PATH_MAP.home.label }</span>
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
            className={styles.link}
          >
            { PATH_MAP[item].icon }
            <span className={styles.pageLabel}>{ PATH_MAP[item]?.label }</span>
          </Link>
        </label>
      )
    })
  };

  return (
    <MuiBreadcrumbs className={styles.breadcrumbs}>
      { renderItems() }
    </MuiBreadcrumbs>
  );
}

export default Breadcrumbs;
