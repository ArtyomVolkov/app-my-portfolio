import React from 'react';
import { useNavigate } from 'react-router-dom';

import Button from '@mui/material/Button';

import './style.scss';

interface NavButton {
  path: string,
  icon: React.ComponentElement<any, any>,
  title: string,
}

const NavButton: React.FC<NavButton> = ({ path, title, icon }) => {
  const navigation = useNavigate();

  const navigateTo = () => {
    navigation(path);
  };

  return (
    <Button className="nav-button" onClick={navigateTo}>
      <div className="icon-box">
        { icon }
      </div>
      <p className="headline">
        { title }
      </p>
    </Button>
  );
}

export default NavButton;
