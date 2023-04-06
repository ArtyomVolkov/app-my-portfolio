import React, { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';

import IconButton from '@mui/material/IconButton';
import FavoriteBorderRoundedIcon from '@mui/icons-material/FavoriteBorderRounded';
import FavoriteRoundedIcon from '@mui/icons-material/FavoriteRounded';

import { IStore } from '../../../store';
import { isFavoriteTrack } from '../../../api/tracks';

import styles from './style.module.scss';

const FavoriteButton = () => {
  const [loading, setLoading] = useState(false);
  const [isFavorite, setIsFavorite] = useState(false);
  const trackUri = useSelector((store: IStore) => store.player?.track?.uri);

  useEffect(() => {
    onCheckIsFavorite().then();
  }, [trackUri]);

  const onCheckIsFavorite = async () => {
    if (!trackUri) {
      return;
    }
    setLoading(true);

    const trackId = trackUri.replaceAll('spotify:track:', '');
    const { data } = await isFavoriteTrack([trackId]);

    setIsFavorite(data[0]);
    setLoading(false);
  };

  return (
    <IconButton disabled={loading} className={styles.favoriteButton}>
      {
        isFavorite
          ? <FavoriteRoundedIcon sx={{ fontSize: 20 }} className={styles.favorite} />
          : <FavoriteBorderRoundedIcon sx={{ fontSize: 20 }} />
      }
    </IconButton>
  );
}

export default FavoriteButton;