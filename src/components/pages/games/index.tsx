import React from 'react';

import Main from '@components/main';
import Puzzle from '@pages/games/puzzle';

const GamesPage = () => {
  return (
    <Main>
      <Puzzle
        defaultLevel={3}
        cellSize={40}
      />
    </Main>
  );
}

export default GamesPage;
