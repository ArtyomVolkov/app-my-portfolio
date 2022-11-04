import React, { useRef } from 'react';

import './style.scss';

const CubeWidget = () => {
  const cubeRef = useRef(null);
  const widgetRef = useRef(null);
  const rotate = useRef({
    active: false,
    startX: 0,
    startY: 0,
    x: -45,
    y: -45,
  });

  const mouseMove = (e) => {
    if (!rotate.current.active) {
      return;
    }
    const x = e.clientX - rotate.current.startX + rotate.current.x;
    const y = rotate.current.startY - e.clientY + rotate.current.y;

    cubeRef.current.childNodes[0].style.transform = `rotateX(${y}deg) rotateY(${x}deg)`;
  };

  const mouseDown = (e) => {
    rotate.current.active = true;
    rotate.current.startX = e.clientX;
    rotate.current.startY = e.clientY;
    widgetRef.current.classList.add('rotating');
  };

  const mouseUp = (e) => {
    rotate.current.active = false;
    rotate.current.x = e.clientX - rotate.current.startX + rotate.current.x;
    rotate.current.y = rotate.current.startY - e.clientY + rotate.current.y;
    widgetRef.current.classList.remove('rotating');
  };

  const mouseLeave = () => {
    widgetRef.current.classList.remove('rotating');
    rotate.current.active = false;
  };

  return (
    <div
      className="cube-widget"
      ref={widgetRef}
      onMouseMove={mouseMove}
      onMouseLeave={mouseLeave}
      onMouseUp={mouseUp}
    >
      <div
        ref={cubeRef}
        className="scene"
        onMouseDown={mouseDown}
      >
        <div
          className="cube"
          style={{ transform: `rotateX(${rotate.current.x}deg) rotateY(${rotate.current.y}deg)` }}
        >
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
