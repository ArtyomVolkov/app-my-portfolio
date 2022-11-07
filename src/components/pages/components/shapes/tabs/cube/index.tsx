import React from 'react';

import Rotation from '@shared/components/rotation';

import './style.scss';

const CubeWidget = () => {
  return (
    <Rotation
      className="cube-widget"
      position={{ x: -45, y: -45 }}
    >
      <div className="cube">
        <div className="plane top">TOP</div>
        <div className="plane bottom">BOTTOM</div>
        <div className="plane right">RIGHT</div>
        <div className="plane left">LEFT</div>
        <div className="plane front">FRONT</div>
        <div className="plane back">BACK</div>
      </div>
    </Rotation>
  );
}

export default CubeWidget;
