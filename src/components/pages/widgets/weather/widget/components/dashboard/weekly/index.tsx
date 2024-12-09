import React, { useMemo } from 'react';
import WeatherTile from '../../../components/tiles/weather';

import styles from './style.module.scss';

const Weekly = ({ data }) => {
  const weeklyData = useMemo(() => {
    if (!data?.days) {
      return [];
    }
    return data.days.filter((item, index) => index <= 6);
  }, [data.days]);

  console.log(weeklyData);

  return (
    <section className={styles.weeklyWeather}>
      {
        weeklyData.map((item) => (
          <WeatherTile
            key={item.datetime}
            data={item}
          />
        ))
      }
    </section>
  );
};

export default Weekly;