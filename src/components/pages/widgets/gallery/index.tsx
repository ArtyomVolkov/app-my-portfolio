import React from 'react';

import Main from '@components/main';
import TechnologyList from '@shared/components/lists/technologies';
import GalleryGrid from '@pages/widgets/gallery/grid';

import { TECHNOLOGIES } from '@pages/widgets/gallery/data';

import './style.scss';

const Gallery = () => {
  return (
    <Main className="nature-gallery">
      <h3>Gallery</h3>
      <TechnologyList data={TECHNOLOGIES} />
      <GalleryGrid />
    </Main>
  );
};

export default Gallery;
