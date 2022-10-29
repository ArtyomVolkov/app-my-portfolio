import React from 'react';

import Box from '@mui/material/Box';

import './style.scss';

const Main = ({ children }) => (
  <Box component="main" className="page-content">
    { children }
  </Box>
);

export default Main;