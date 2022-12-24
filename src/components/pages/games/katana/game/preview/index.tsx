import React, { useContext, useEffect, useRef } from 'react';

import { GameContext } from '@pages/games/katana/game/context';

const Preview = () => {
  const [data] = useContext(GameContext);
  const canvasRef = useRef(null);

  useEffect(() => {
    setInitialScale();
  }, []);

  useEffect(() => {
    draw();
  }, [data.blank]);

  const setInitialScale = () => {
    if (!canvasRef.current) {
      return;
    }
    const size = canvasRef.current.parentElement.clientWidth || 100;
    canvasRef.current.style.transform = `scale(${size/100})`;
  };

  const draw = () => {
    const context = canvasRef.current.getContext('2d');
    const boxSize = 5;

    // TODO: need to optimize draw render!
    data.blank.forEach((row, i) => {
      row.forEach((cell, j) => {
        // ignore draw incorrect box
        if (data.filled[i].indexOf(j) < 0) {
          return;
        }
        const [x, y] = [j*boxSize, i*boxSize];

        cell ? context.fillRect(x, y,  boxSize, boxSize) : context.clearRect(x, y, boxSize, boxSize);
      });
    });
  };

  return (
    <div className="preview">
      <canvas
        ref={canvasRef}
        width={100}
        height={100}
      />
    </div>
  );
}

export default Preview;
