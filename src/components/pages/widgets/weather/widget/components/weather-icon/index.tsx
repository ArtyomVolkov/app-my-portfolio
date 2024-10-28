import React, { useEffect, useState } from 'react';

import styles from './style.module.scss';

interface IWeatherIcon {
  name: string,
  size?: number
}

const WeatherIcon: React.FC<IWeatherIcon> = ({ name, size = 24 }) => {
  const [component, setComponent] = useState(null);

  useEffect(() => {
    importComponent().then();
  }, [name]);

  const importComponent = async () => {
    try {
      const module = await import(`../../icons/${name}.svg`);
      const IconComponent = module.default;

      setComponent(<IconComponent />);
    } catch (e) {
      setComponent(null);
    }
  };

  return (
    <i className={styles.weatherIcon} style={{ fontSize: size }}>
      {component}
    </i>
  );
}

export default WeatherIcon