import React, { useEffect, useRef, useState } from 'react';
import { v4 as uuid } from 'uuid';

import LoadMore from '@pages/widgets/gallery/load-more';
import ImageCard from '@pages/widgets/gallery/image-card';
import PreviewModal from '@pages/widgets/gallery/preview';

import { getImages } from '@api/pexels';

import styles from '../style.module.scss';

const GalleryGrid = () => {
  const [loading, setLoading] = useState(true);
  const [photos, setPhotos] = useState([]);
  const pagination = useRef({page: 1, perPage: 20, hasMore: false});
  const [modal, setModal] = useState({open: false, data: null});

  useEffect(() => {
    fetchImages().then();
  }, []);

  const fetchImages = async () => {
    const {page, perPage} = pagination.current;

    const data = await getImages(page, perPage);

    setLoading(false);
    pagination.current.hasMore = data.total_results > photos.length;

    if (data && data.photos) {
      setPhotos(data.photos);
    }
  };

  const onLoadMore = async () => {
    const {page, perPage} = pagination.current;

    const data = await getImages(page + 1, perPage);
    const newData = [...photos].concat(data.photos);

    pagination.current.page = page + 1;
    pagination.current.hasMore = data.total_results > newData.length;
    setPhotos(newData);
  };

  const onOpenPreview = (data) => {
    setModal({
      open: true,
      data,
    });
  };

  const onClosePreview = () => {
    setModal({open: false, data: null});
  };

  if (!photos.length && loading) {
    return <p>Loading...</p>;
  }

  if (!photos) {
    return null;
  }

  return (
    <div className={styles.galleryGrid}>
      <div className={styles.grid}>
        {
          photos.map((item) => (
            <ImageCard
              key={uuid()}
              data={item}
              onPreview={onOpenPreview}
            />
          ))
        }
      </div>
      <LoadMore
        loading={loading}
        hasMore={pagination.current.hasMore}
        onRequestLoad={onLoadMore}
      />
      <PreviewModal
        open={modal.open}
        data={modal.data}
        onClose={onClosePreview}
      />
    </div>
  )
};

export default GalleryGrid;
