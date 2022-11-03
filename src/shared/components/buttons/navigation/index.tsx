import React from 'react';
import { useNavigate } from 'react-router-dom';

import Avatar from '@mui/material/Avatar';
import Button from '@mui/material/Button';
import KeyboardArrowRightRoundedIcon from '@mui/icons-material/KeyboardArrowRightRounded';

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
      <Avatar className="avatar">
        { icon }
      </Avatar>
      <p className="headline">
        { title }
      </p>
      <KeyboardArrowRightRoundedIcon className="arrow-icon"/>
    </Button>
  );
}

export default NavButton;
