import React from 'react';
import { useNavigate } from 'react-router-dom';
import Rating from '@mui/material/Rating';

import { TWine } from '@pages/apps/wine-collection/app/dto';

import styles from './style.module.scss';

interface IWineTile {
  wine: TWine
}

const WineTile: React.FC<IWineTile> = ({ wine }) => {
  const navigate = useNavigate();
  const toFiveRate = (value) => value/10*5;

  const openDetailsPage = () => {
    navigate(`wine-list/${wine.id}`);
  };

  return (
    <li className={styles.wineAppWineTile} onClick={openDetailsPage}>
      <img src={wine.imageURL} alt={wine.fullName} className={styles.wineImage} />
      <div className={styles.details}>
        <Rating
          value={toFiveRate(wine.rate)}
          size="small"
          max={5}
          precision={0.5}
          readOnly
        />
        <span className={styles.title}>{wine.brand}</span>
        <span className={styles.subtitle}>
          {wine.fullName}
          {` • ${wine.year} `}
          {` • ${wine.alcohol}`}
        </span>
        <span className={styles.country}>{wine.country}</span>
      </div>
      <div className={styles.moreInfo}>
        <span className={styles.grape}>{wine.grape}</span>
        <span className={styles.match}>{wine.match}</span>
        <span className={styles.aroma}>{wine.aroma}</span>
        <span className={styles.taste}>{wine.taste}</span>
      </div>
    </li>
  );
};

export default WineTile;