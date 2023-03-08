import React from 'react';

import Track from './track';

import styles from './style.module.scss';

const TrackList = ({ data }) => {
  if (!data) {
    return null;
  }
  return (
    <div className={styles.trackList}>
      {
        data.map((item, index) => (
          <Track
            key={item.id}
            track={item}
            index={index}
          />
        ))
      }
    </div>
  );
}

export default TrackList;
