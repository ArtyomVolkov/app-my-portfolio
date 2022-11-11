import React from 'react';

import Main from '@components/main';
import NavButton from '@shared/components/buttons/navigation';

import ExtensionRoundedIcon from '@mui/icons-material/ExtensionRounded';

const GamesPage = () => {
  return (
    <Main>
      <NavButton
        path="/games/puzzle"
        title="Puzzle"
        icon={<ExtensionRoundedIcon className="icon"/>}
      />
    </Main>
  );
}

export default GamesPage;
