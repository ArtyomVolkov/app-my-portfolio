import React from 'react';

import Main from '@components/main';
import GameWidget from '@pages/games/puzzle/game';
import TechnologyList from '@shared/components/lists/technologies';

import { PUZZLE_TAGS } from '@pages/games/puzzle/game/data';

import styles from './style.module.scss';

const PuzzlePage = () => (
  <Main className={styles.puzzleTags}>
    <h3>Puzzle tags</h3>
    <TechnologyList data={PUZZLE_TAGS.technologies} className={styles.technologyList} />
    <GameWidget />
  </Main>
);

export default PuzzlePage;