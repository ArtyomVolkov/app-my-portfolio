import React, { useEffect, useRef } from 'react';

import { mergeClassNames } from '@utils/common';

import styles from './style.module.scss';

interface Rotation {
  className: string,
  position?: {
    x: number,
    y: number,
  },
  children: React.ReactElement,
}

const Rotation: React.FC<Rotation> = ({position = {x: 0, y: 0}, children, className}) => {
  useEffect(() => {
    setPosition(position.x, position.y);
  }, []);

  const componentRef = useRef(null);
  const widgetRef = useRef(null);
  const rotate = useRef({
    active: false,
    startX: 0,
    startY: 0,
    x: position.x,
    y: position.y,
  });

  const setPosition = (x, y) => {
    componentRef.current.childNodes[0].style.transform = `rotateX(${y}deg) rotateY(${x}deg)`;
  };

  const mouseMove = (e) => {
    if (!rotate.current.active) {
      return;
    }
    console.log('mouse move')
    const x = e.clientX - rotate.current.startX + rotate.current.x;
    const y = rotate.current.startY - e.clientY + rotate.current.y;

    setPosition(x, y);
  };

  const mouseDown = (e) => {
    rotate.current.active = true;
    rotate.current.startX = e.clientX;
    rotate.current.startY = e.clientY;
    widgetRef.current.classList.add('rotating');
  };

  const mouseUp = (e) => {
    if (!rotate.current.active) {
      return;
    }
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
      className={mergeClassNames([styles.rotationSection, className])}
      ref={widgetRef}
      onMouseMove={mouseMove}
      onMouseLeave={mouseLeave}
      onMouseUp={mouseUp}
    >
      <div
        className="scene"
        ref={componentRef}
        onMouseDown={mouseDown}
      >
        {children}
      </div>
    </div>
  );
}

export default Rotation;
