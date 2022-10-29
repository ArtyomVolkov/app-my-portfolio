import React from 'react';

import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import AppBar from '@mui/material/AppBar';

import Navigation from '@components/app-entry/header/navigation';

const Header = () => (
  <AppBar position="fixed">
    <Toolbar>
      <Navigation />
      <Typography variant="h5">
        My Portfolio
      </Typography>
    </Toolbar>
  </AppBar>
);

export default Header;
