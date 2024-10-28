import React, { useEffect, useState } from 'react';

import WeatherIcon from './components/weather-icon';
import Weekly from './components/weekly';

import { fetchForecastData } from './api';

import { fahrenheitToCelsius, getPercentage, getWindDirection } from '@pages/widgets/weather/widget/helpers';

import styles from './style.module.scss';

const WeatherWidget = () => {
  const [forecast, setForecast] = useState(null);

  useEffect(() => {
    fetchData().then();
  }, []);

  const fetchData = async () => {
    const data = await fetchForecastData();
    console.log(data);
    setForecast(data);
  };

  const renderContent = () => {
    if (!forecast) {
      return null;
    }
    return (
      <>
        <div className={styles.mainPanel}>
          <span className={styles.location}>{forecast.resolvedAddress || forecast.address}</span>
          <WeatherIcon name={forecast.currentConditions.icon} size={150} />
          <span className={styles.temperature}>{fahrenheitToCelsius(forecast.currentConditions.temp)}</span>
          <span className={styles.dateTime}>
            {new Date(forecast.currentConditions.datetimeEpoch*1000).toDateString()}
          </span>
          {/*<span className={styles.divider} />*/}
          {/*<span className={styles.condition}>*/}
          {/*  <WeatherIcon name="clear-day" size={25} />*/}
          {/*  <span>Sunrise</span>*/}
          {/*  <span>{forecast.currentConditions.sunrise}</span>*/}
          {/*</span>*/}
          {/*<span className={styles.condition}>*/}
          {/*  <WeatherIcon name="clear-night" size={25} />*/}
          {/*  <span>Sunset</span>*/}
          {/*  <span>{forecast.currentConditions.sunset}</span>*/}
          {/*</span>*/}
          <span className={styles.divider} />
          <span className={styles.condition}>
            <WeatherIcon name="cloudy" size={25} />
            <span>Cloud Cover</span>
            <span>{getPercentage(forecast.currentConditions.cloudcover)}</span>
          </span>
          <span className={styles.condition}>
            <WeatherIcon name="wind" size={25} />
            <span>Wind speed</span>
            <span>{`${forecast.currentConditions.windspeed} MPH`}</span>
          </span>

          <span className={styles.condition}>
            <WeatherIcon name="wind-dir" size={25} />
            <span>Wind direction</span>
            <span>{getWindDirection(forecast.currentConditions.winddir)}</span>
          </span>
        </div>
        <div className={styles.dashboard}>
          <Weekly data={forecast} />
        </div>
      </>
    );
  }

  return (
    <section className={styles.weatherWidget}>
      {renderContent()}
    </section>
  );
};

export default WeatherWidget;