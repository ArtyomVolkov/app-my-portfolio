import React from 'react';

import Main from '@components/main';
import NavButton from '@shared/components/buttons/navigation';

import CategoryIcon from '@mui/icons-material/Category';

import './style.scss';

const ComponentsPage = () => {
  return (
    <Main className="components-page">
      <NavButton
        path="/components/shapes"
        title="Shapes"
        icon={<CategoryIcon className="icon"/>}
      />
    </Main>
  );
}

export default ComponentsPage;
