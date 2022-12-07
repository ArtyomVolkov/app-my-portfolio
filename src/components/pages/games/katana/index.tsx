import React from 'react';

import Main from '@components/main';
import TechnologyList from '@shared/components/lists/technologies';
import GameWidget from '@pages/games/katana/game';

import { TECHNOLOGIES } from '@pages/games/katana/game/data';

import './style.scss';

const JapaneseCrosswordsPage = () => (
  <Main className="katana-page">
    <h3>Katana</h3>
    <TechnologyList data={TECHNOLOGIES} />
    <GameWidget />
  </Main>
);

export default JapaneseCrosswordsPage;