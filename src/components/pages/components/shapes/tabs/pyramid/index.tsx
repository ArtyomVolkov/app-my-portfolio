import React from 'react';

import Rotation from '@shared/components/rotation';

import './style.scss';

const Pyramid = () => {
  return (
    <Rotation
      className="pyramid-widget"
      position={{x: 0, y: -36 }}
    >
      <div className="pyramid">
        <div className="plane front"></div>
        <div className="plane back"></div>
        <div className="plane left"></div>
        <div className="plane right"></div>
        <div className="plane bottom"></div>
      </div>
    </Rotation>
  );
}

export default Pyramid;
