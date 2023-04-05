import React, { useEffect, useState } from 'react';

import IconButton from '@mui/material/IconButton';
import FavoriteBorderRoundedIcon from '@mui/icons-material/FavoriteBorderRounded';
import FavoriteRoundedIcon from '@mui/icons-material/FavoriteRounded';

import { usePlayerData } from '../../../store/player';
import { isFavoriteTrack } from '../../../api/tracks';
import { useFavoriteTracksActions } from '../../../store/actions/tracks';

import styles from './style.module.scss';

const FavoriteButton = () => {
  const [loading, setLoading] = useState(false);
  const [isFavorite, setIsFavorite] = useState(false);
  const trackUri = usePlayerData((state) => state.track.uri);
  const useFavActions = useFavoriteTracksActions();

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