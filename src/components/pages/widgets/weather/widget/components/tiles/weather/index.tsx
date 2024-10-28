import React from 'react';
import { format } from "date-fns";

import WeatherIcon from '../../weather-icon';

import { fahrenheitToCelsius } from '../../../helpers';

import styles from './style.module.scss';

const Weather = ({ data }) => {
  return (
    <div className={styles.weatherTile}>
      <span>{format(data.datetime, 'EEE')}</span>
      <WeatherIcon name={data.icon} size={28} />
      <span className={styles.temperature}>
        <span className={styles.max}>{fahrenheitToCelsius(data.tempmax)}</span>
        <span className={styles.min}>{fahrenheitToCelsius(data.tempmin)}</span>
      </span>
    </div>
  );
};

export default Weather;