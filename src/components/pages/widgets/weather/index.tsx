import React from 'react';

import Main from '@components/main';
import TechnologyList from '@shared/components/lists/technologies';
import WeatherWidget from '@pages/widgets/weather/widget';

import { TECHNOLOGIES } from '@pages/widgets/weather/data';

import styles from './style.module.scss';

const Weather = () => {
  return (
    <Main className={styles.weather}>
      <h3 className={styles.title}>Weather</h3>
      <TechnologyList data={TECHNOLOGIES} className={styles.technologyList} />
      <WeatherWidget />
    </Main>
  );
};

export default Weather;
