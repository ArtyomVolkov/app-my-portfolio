import React from 'react';

import Main from '@components/main';
import TechnologyList from '@shared/components/lists/technologies';
import GalleryGrid from '@pages/widgets/gallery/grid';

import { TECHNOLOGIES } from '@pages/widgets/gallery/data';

import styles from './style.module.scss';

const Gallery = () => {
  return (
    <Main className={styles.natureGallery}>
      <h3>Gallery</h3>
      <TechnologyList data={TECHNOLOGIES} className={styles.technologyList} />
      <GalleryGrid />
    </Main>
  );
};

export default Gallery;
