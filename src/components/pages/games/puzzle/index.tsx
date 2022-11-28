import React from 'react';

import Main from '@components/main';
import GameWidget from '@pages/games/puzzle/game';
import TechnologyList from '@shared/components/lists/technologies';

import { PUZZLE_TAGS } from '@pages/games/puzzle/game/data';

import './style.scss';

const PuzzlePage = () => (
  <Main className="puzzle-tags">
    <h3>Puzzle tags</h3>
    <TechnologyList data={PUZZLE_TAGS.technologies} />
    <GameWidget />
  </Main>
);

export default PuzzlePage;