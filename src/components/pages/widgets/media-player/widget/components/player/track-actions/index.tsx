import React, { useState } from 'react';

import IconButton from '@mui/material/IconButton';
import PauseRounded from '@mui/icons-material/PauseRounded';
import PlayArrowRounded from '@mui/icons-material/PlayArrowRounded';
import SkipNextRoundedIcon from '@mui/icons-material/SkipNextRounded';
import SkipPreviousRoundedIcon from '@mui/icons-material/SkipPreviousRounded';
import CachedRoundedIcon from '@mui/icons-material/CachedRounded';
import ShuffleRoundedIcon from '@mui/icons-material/ShuffleRounded';

import { mergeClassNames } from '@utils/common';

import styles from './style.module.scss';

interface ITrackActions {
  onPlay: () => void,
  onPlayNext: () => void,
  onPlayPrevious: () => void,
}
const TrackActions: React.FC<ITrackActions> = ({ onPlay, onPlayNext, onPlayPrevious }) => {
  const [play, setPlay] = useState(false);
  const [shuffle, setShuffle] = useState(false);
  const [repeat, setRepeat] = useState(false);

  const onTogglePlay = () => {
    setPlay(!play);
    onPlay();
  };

  const onToggleShuffle = () => {
    setShuffle(!shuffle);
  };

  const onToggleRepeat = () => {
    setRepeat(!repeat);
  };

  return (
    <div className={styles.trackActions}>
      <div>
        <IconButton onClick={onToggleShuffle}>
          <ShuffleRoundedIcon sx={{ fontSize: 20 }} />
        </IconButton>
        <IconButton onClick={onPlayPrevious}>
          <SkipPreviousRoundedIcon sx={{ fontSize: 28 }} />
        </IconButton>
        <IconButton onClick={onTogglePlay}>
          {
            play
              ? <PauseRounded sx={{ fontSize: 34 }} />
              : <PlayArrowRounded sx={{ fontSize: 34 }} />
          }

        </IconButton>
        <IconButton onClick={onPlayNext}>
          <SkipNextRoundedIcon sx={{ fontSize: 28 }} />
        </IconButton>
        <IconButton
          onClick={onToggleRepeat}
          className={mergeClassNames([repeat && styles.activeRepeat])}
        >
          <CachedRoundedIcon sx={{ fontSize: 20 }} />
        </IconButton>
      </div>
    </div>
  );
}

export default TrackActions;
