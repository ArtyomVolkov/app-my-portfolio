import React, { useRef } from 'react';

import './style.scss';

const CubeWidget = () => {
  const cubeRef = useRef(null);
  const widgetRef = useRef(null);
  const movement = useRef({
    startX: 0,
    startY: 0,
    active: false,
    x: 0,
    y: 0,
  });

  const mouseMove = (e) => {
    if (!movement.current.active) {
      return;
    }
    const x = e.clientX - movement.current.startX ;
    const y = movement.current.startY - e.clientY;

    cubeRef.current.childNodes[0].style.transform = `rotateY(${x}deg) rotateX(${y}deg)`;
  };

  const mouseDown = (e) => {
    movement.current.active = true;
    movement.current.startX = e.clientX;
    movement.current.startY = e.clientY;
    widgetRef.current.classList.add('rotating');
  };

  const mouseUp = () => {
    widgetRef.current.classList.remove('rotating');
    movement.current.active = false;
  };

  const mouseLeave = () => {
    widgetRef.current.classList.remove('rotating');
    movement.current.active = false;
  };

  return (
    <div
      className="cube-widget"
      ref={widgetRef}
      onMouseMove={mouseMove}
      onMouseLeave={mouseLeave}
    >
      <div
        ref={cubeRef}
        className="scene"
        onMouseDown={mouseDown}
        onMouseUp={mouseUp}
      >
        <div className="cube">
          <div className="plane top">TOP</div>
          <div className="plane bottom">BOTTOM</div>
          <div className="plane right">RIGHT</div>
          <div className="plane left">LEFT</div>
          <div className="plane front">FRONT</div>
          <div className="plane back">BACK</div>
        </div>
      </div>
    </div>
  );
}

export default CubeWidget;
