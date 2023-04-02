import React from 'react';
import { shallow } from 'zustand/shallow';

import IconButton from '@mui/material/IconButton';
import PauseRounded from '@mui/icons-material/PauseRounded';
import PlayArrowRounded from '@mui/icons-material/PlayArrowRounded';
import SkipNextRoundedIcon from '@mui/icons-material/SkipNextRounded';
import SkipPreviousRoundedIcon from '@mui/icons-material/SkipPreviousRounded';
import CachedRoundedIcon from '@mui/icons-material/CachedRounded';
import ShuffleRoundedIcon from '@mui/icons-material/ShuffleRounded';

import { mergeClassNames } from '@utils/common';
import { usePlayerData } from '../../../store/player';

import styles from './style.module.scss';

interface ITrackActions {
  onPlay: () => void,
  onPlayNext: () => void,
  onPlayPrevious: () => void,
  onToggleShuffle: () => void,
  onChangeRepeat: () => void,
}

const TrackActions: React.FC<ITrackActions> = ({ onPlay, onPlayNext, onPlayPrevious, onToggleShuffle, onChangeRepeat }) => {
  const { shuffle, repeat, paused } = usePlayerData((state) => ({
    shuffle: state.shuffle,
    repeat: state.repeat,
    paused: state.paused
  }), shallow);

  return (
    <div className={styles.trackActions}>
      <div>
        <IconButton
          onClick={onToggleShuffle}
          className={mergeClassNames([styles.shuffle, shuffle && styles.active])}
        >
          <ShuffleRoundedIcon sx={{ fontSize: 20 }} />
        </IconButton>
        <IconButton onClick={onPlayPrevious}>
          <SkipPreviousRoundedIcon sx={{ fontSize: 28 }} />
        </IconButton>
        <IconButton onClick={onPlay}>
          {
            !paused
              ? <PauseRounded sx={{ fontSize: 34 }} />
              : <PlayArrowRounded sx={{ fontSize: 34 }} />
          }

        </IconButton>
        <IconButton onClick={onPlayNext}>
          <SkipNextRoundedIcon sx={{ fontSize: 28 }} />
        </IconButton>
        <IconButton
          onClick={onChangeRepeat}
          className={mergeClassNames([styles.repeat, repeat && styles.active])}
        >
          <CachedRoundedIcon sx={{ fontSize: 20 }} />
        </IconButton>
      </div>
    </div>
  );
}

export default TrackActions;
