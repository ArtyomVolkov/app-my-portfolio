import React from 'react';

import Main from '@components/main';
import NavButton from '@shared/components/buttons/navigation';

import ExtensionRoundedIcon from '@mui/icons-material/ExtensionRounded';
import AppRegistrationIcon from '@mui/icons-material/AppRegistration';
import GridOnRoundedIcon from '@mui/icons-material/GridOnRounded';

import styles from './style.module.scss';

const GamesPage = () => {
  return (
    <Main className={styles.gamesPage}>
      <NavButton
        path="/games/puzzle"
        title="Puzzle"
        icon={<ExtensionRoundedIcon className="icon"/>}
      />
      <NavButton
        path="/games/sudoku"
        title="Sudoku"
        icon={<AppRegistrationIcon className="icon"/>}
      />
      <NavButton
        path="/games/nonogram"
        title="Nonogram"
        icon={<GridOnRoundedIcon className="icon"/>}
      />
    </Main>
  );
}

export default GamesPage;
