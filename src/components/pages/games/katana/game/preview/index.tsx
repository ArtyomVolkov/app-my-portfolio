import React, { useContext, useEffect, useRef } from 'react';

import { GameContext, IState, TDispatch } from '@pages/games/katana/game/context';

const Preview = () => {
  const [data] = useContext<[IState, TDispatch]>(GameContext);
  const canvasRef = useRef(null);

  useEffect(() => {
    setInitialScale();
  }, []);

  useEffect(() => {
    draw();
  }, [data.lastActive]);

  const setInitialScale = () => {
    if (!canvasRef.current) {
      return;
    }
    const size = canvasRef.current.parentElement.clientWidth || 100;
    canvasRef.current.style.transform = `scale(${size/100})`;
  };

  const draw = () => {
    if (!data.lastActive) {
      return;
    }
    const { row, cell, value } = data.lastActive;
    const context = canvasRef.current.getContext('2d');
    const boxSize = 5;

    // ignore draw incorrect box
    if (data.filled[row].indexOf(cell) < 0) {
      return;
    }
    const [x, y] = [cell*boxSize, row*boxSize];

    value ?
      context.fillRect(x, y,  boxSize, boxSize)
      : context.clearRect(x, y, boxSize, boxSize);
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
