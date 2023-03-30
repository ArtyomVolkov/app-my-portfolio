import React from 'react';
import { mergeClassNames } from '@utils/common';

import styles from './style.module.scss';

interface IRipple {
  children: any,
  className?: string,
}

const Ripple: React.FC<IRipple> = ({ children, className, ...rest }) => {
  const onPress = (evt) => {
    const button = evt.currentTarget;
    const circle = document.createElement('span');
    const diameter = Math.max(button.clientWidth, button.clientHeight);
    const radius = diameter/2;
    const { top, left } = button.getBoundingClientRect();

    circle.style.width = `${diameter}px`;
    circle.style.height = `${diameter}px`;
    circle.style.left = `${evt.clientX - left - radius}px`;
    circle.style.top = `${evt.clientY - top - radius}px`;
    circle.classList.add('effect');

    const ripple = button.querySelector('.effect');

    if (ripple) {
      ripple.remove();
    }
    button.appendChild(circle);
  };

  return (
    <div
      className={mergeClassNames([styles.ripple, className])}
      onClick={onPress}
      {...rest}
    >
      { children }
    </div>
  );
}

export default Ripple;
