import React from 'react';

import Main from '@components/main';
import PuzzleTags from '@pages/games/puzzle/puzzle-tags';
import TechnologyList from '@shared/components/lists/technologies';

import { PUZZLE_TAGS } from '@pages/games/puzzle/data';

import './style.scss';

const PuzzlePage = () => (
  <Main className="puzzle-tags">
    <h3>Puzzle tags</h3>
    <TechnologyList data={PUZZLE_TAGS.technologies} />
    <PuzzleTags />
  </Main>
);

export default PuzzlePage;