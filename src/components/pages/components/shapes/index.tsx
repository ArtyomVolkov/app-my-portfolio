import React from 'react';

import Main from '@components/main';
import ShapeTabs from '@pages/components/shapes/tabs';

import './style.scss';

const Shapes = () => {
  return (
    <Main className="shapes-page">
      <ShapeTabs />
    </Main>
  );
}

export default Shapes;
