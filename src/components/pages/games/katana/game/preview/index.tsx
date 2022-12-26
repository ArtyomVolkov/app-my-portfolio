import React, { useContext, useEffect, useRef } from 'react';

import { EBoxState, GameContext, IState, TDispatch } from '@pages/games/katana/game/context';

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

    const [x, y] = [cell*boxSize, row*boxSize];

    switch (value) {
      case EBoxState.Cross:
      case EBoxState.Empty: {
        context.clearRect(x, y, boxSize, boxSize);
        break;
      }
      case EBoxState.Filled: {
        context.fillRect(x, y,  boxSize, boxSize);
        break
      }
      default:
        break;
    }
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
