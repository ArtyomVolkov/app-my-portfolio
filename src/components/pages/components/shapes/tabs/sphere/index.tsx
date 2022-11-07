import React from 'react';

import Rotation from '@shared/components/rotation';

import './style.scss';

const Sphere = () => {
  return (
    <Rotation
      className="sphere-widget"
      position={{ x: 45, y: 65 }}
    >
      <div className="sphere">
        <div className="plane north-x" />
        <div className="plane north-east-x" />
        <div className="plane east-x" />
        <div className="plane south-east-x" />
        <div className="plane north-y" />
        <div className="plane north-east-y" />
        <div className="plane east-y" />
        <div className="plane south-east-y" />
      </div>
    </Rotation>
  );
}

export default Sphere;
