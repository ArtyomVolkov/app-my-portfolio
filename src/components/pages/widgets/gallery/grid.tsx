import React, { useEffect, useRef, useState } from 'react';
import { v4 as uuid } from 'uuid';

import GridItem from '@pages/widgets/gallery/grid-item';
import LoadMore from '@pages/widgets/gallery/load-more';

import { getImages } from '@api/pexels';

const GalleryGrid = () => {
  const [loading, setLoading] = useState(true);
  const [photos, setPhotos] = useState([]);
  const pagination = useRef({ page: 1, perPage: 20, hasMore: false });

  useEffect(() => {
    fetchImages().then();
  }, []);

  const fetchImages = async () => {
    const { page, perPage } = pagination.current;

    const data = await getImages(page, perPage);

    setLoading(false);
    pagination.current.hasMore = data.total_results > photos.length;

    if (data && data.photos) {
      setPhotos(data.photos);
    }
  };

  const onLoadMore = async () => {
    const { page, perPage } = pagination.current;

    setLoading(true);

    const data = await getImages(page+1, perPage);
    const newData = [...photos].concat(data.photos);

    pagination.current.page = page+1;
    pagination.current.hasMore = data.total_results > newData.length;

    setLoading(false);
    setPhotos(newData);
  };

  if (!photos.length && loading) {
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
              key={uuid()}
              data={item}
            />
          ))
        }
      </div>
      <LoadMore
        hasMore={true}
        loading={loading}
        onRequestLoad={onLoadMore}
      />
    </div>
  )
};

export default GalleryGrid;
