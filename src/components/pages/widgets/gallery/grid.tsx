import React, { useEffect, useState } from 'react';

import GridItem from '@pages/widgets/gallery/grid-item';
import LoadMore from '@pages/widgets/gallery/load-more';

import { getImages } from '@api/pexels';

const GalleryGrid = () => {
  const [loading, setLoading] = useState(true);
  const [photos, setPhotos] = useState([]);

  useEffect(() => {
    fetchImages().then();
  }, []);

  const fetchImages = async () => {
    const data = await getImages();
    setLoading(false);

    if (data && data.photos) {
      setPhotos(data.photos);
    }
  };

  if (loading) {
    return <p>Loading...</p>;
  }

  if (!photos) {
    return null;
  }

  return (
    <div className="gallery-grid">
      <div className="grid">
        {
          photos.map((item) => (
            <GridItem
              key={item.id}
              data={item}
            />
          ))
        }
      </div>
      <LoadMore hasMore={true} />
    </div>
  )
};

export default GalleryGrid;
