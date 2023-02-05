import React, { useEffect, useState } from 'react';

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
      {
        photos.map((item) => (
          <section key={item.id} className="card">
            <img alt={item.alt} src={item.src.large} />
          </section>
        ))
      }
    </div>
  )
};

export default GalleryGrid;
