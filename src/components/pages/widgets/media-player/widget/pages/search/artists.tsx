import React from 'react';
import { useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';

import MediaCard from '../../components/cards/media';
import ScrollViewGradient from '@shared/components/scroll-view/horizontal';

import { mergeClassNames } from '@utils/common';
import { IStore } from '@pages/widgets/media-player/widget/store';

import styles from './style.module.scss';

const Artists = ({ gridLayout = false }) => {
  const navigation = useNavigate();
  const artists = useSelector((store: IStore) => store.search.artists);

  const onOpenArtistPage = (id) => {
    navigation(`artist/${id}`);
  };

  if (!artists) {
    return null;
  }

  return (
    <section className={mergeClassNames([styles.artists, gridLayout && styles.gridLayout])}>
      <p className={styles.title}>Artists</p>
      <ScrollViewGradient>
        <div className={styles.cards}>
          {
            artists.map((item) => (
              <MediaCard
                key={item.id}
                image={item.image}
                title={item.name}
                subtitle={`${item.followers.toLocaleString()} followers`}
                className={styles.mediaCard}
                onPress={() => onOpenArtistPage(item.id)}
              />
            ))
          }
        </div>
      </ScrollViewGradient>
    </section>
  )
}

export default Artists;
