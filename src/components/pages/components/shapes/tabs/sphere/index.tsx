import React, { useRef } from 'react';

import './style.scss';

const Triangle = () => {
  const sphereRef = useRef(null);
  const widgetRef = useRef(null);
  const rotate = useRef({
    active: false,
    startX: 0,
    startY: 0,
    x: 45,
    y: 65,
  });

  const mouseMove = (e) => {
    if (!rotate.current.active) {
      return;
    }
    const x = e.clientX - rotate.current.startX + rotate.current.x;
    const y = rotate.current.startY - e.clientY + rotate.current.y;

    sphereRef.current.childNodes[0].style.transform = `rotateX(${y}deg) rotateY(${x}deg)`;
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
      className="sphere-widget"
      ref={widgetRef}
      onMouseMove={mouseMove}
      onMouseLeave={mouseLeave}
      onMouseUp={mouseUp}
    >
      <div
        className="scene"
        ref={sphereRef}
        onMouseDown={mouseDown}
      >
       <div
         className="sphere"
         style={{ transform: `rotateX(${rotate.current.x}deg) rotateY(${rotate.current.y}deg)` }}
       >
         <div className="plane north-x" />
         <div className="plane north-east-x" />
         <div className="plane east-x" />
         <div className="plane south-east-x" />
         <div className="plane north-y" />
         <div className="plane north-east-y" />
         <div className="plane east-y" />
         <div className="plane south-east-y" />
       </div>
      </div>
    </div>
  );
}

export default Triangle;
