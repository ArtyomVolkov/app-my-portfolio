import React, { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';

import IconButton from '@mui/material/IconButton';
import FavoriteBorderRoundedIcon from '@mui/icons-material/FavoriteBorderRounded';
import FavoriteRoundedIcon from '@mui/icons-material/FavoriteRounded';

import { IStore } from '../../../store';

import favoriteTracks from '../../../store/actions/favorite-tracks';

import styles from './style.module.scss';

const FavoriteButton = () => {
  const [loading, setLoading] = useState(false);
  const [isFavorite, setIsFavorite] = useState(false);
  const track = useSelector((store: IStore) => store.player?.track);

  useEffect(() => {
    onCheckIsFavorite().then();
  }, [track?.id]);

  const onCheckIsFavorite = async () => {
    if (!track?.id) {
      return;
    }
    setLoading(true);

    const favorite = await favoriteTracks.onCheckIsFavorite(track);

    setIsFavorite(favorite);
    setLoading(false);
  };

  const onToggleFavorite = async () => {
    setLoading(true);
    setIsFavorite(!isFavorite);

    const error = isFavorite
      ? await favoriteTracks.onRemoveTrackToFavorite(track)
      : await favoriteTracks.onAddTrackToFavorite(track);

    if (error) {
      setIsFavorite((state) => !state);
    }
    setLoading(false);
  };

  return (
    <IconButton disabled={loading} className={styles.favoriteButton} onClick={onToggleFavorite}>
      {
        isFavorite
          ? <FavoriteRoundedIcon sx={{ fontSize: 20 }} className={styles.favorite} />
          : <FavoriteBorderRoundedIcon sx={{ fontSize: 20 }} />
      }
    </IconButton>
  );
}

export default FavoriteButton;