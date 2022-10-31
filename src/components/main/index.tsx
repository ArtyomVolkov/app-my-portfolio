import React from 'react';

import Box from '@mui/material/Box';

import './style.scss';

const Main = ({ children, className = null }) => (
  <Box component="main" className={className}>
    { children }
  </Box>
);

export default Main;