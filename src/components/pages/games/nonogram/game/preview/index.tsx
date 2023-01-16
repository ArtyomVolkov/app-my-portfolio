import React, { useContext, useEffect, useRef } from 'react';

import { EBoxState, GameContext, IState, TDispatch } from '@pages/games/nonogram/game/context';

interface IPreview {
  initialDraw?: boolean,
  drawBoxSize?: number,
}

const Preview: React.FC<IPreview> = ({ initialDraw = false, drawBoxSize = 5 }) => {
  const [data] = useContext<[IState, TDispatch]>(GameContext);
  const canvasRef = useRef(null);

  useEffect(() => {
    setInitialScale();

    if (initialDraw) {
      drawByModel();
    }
  }, []);

  useEffect(() => {
    if (!data.lastActive) {
      clearHolst();
      return;
    }
    draw();
  }, [data.lastActive]);

  const setInitialScale = () => {
    if (!canvasRef.current) {
      return;
    }
    const size = canvasRef.current.parentElement.clientWidth || 100;
    canvasRef.current.style.transform = `scale(${size/100})`;
  };

  const drawByModel = () => {
    const context = canvasRef.current.getContext('2d');

    data.blank.forEach((row, ri) => {
      row.forEach((cell, ci) => {
        if (cell > 0) {
          const [x, y] = [ci*drawBoxSize, ri*drawBoxSize];

          context.fillRect(x, y, drawBoxSize, drawBoxSize);
        }
      });
    });
  };

  const draw = () => {
    if (!data.lastActive) {
      return;
    }
    const { row, cell, value } = data.lastActive;
    const context = canvasRef.current.getContext('2d');

    const [x, y] = [cell*drawBoxSize, row*drawBoxSize];

    switch (value) {
      case EBoxState.Cross:
      case EBoxState.Empty: {
        context.clearRect(x, y, drawBoxSize, drawBoxSize);
        break;
      }
      case EBoxState.Filled: {
        context.fillRect(x, y,  drawBoxSize, drawBoxSize);
        break
      }
      default:
        break;
    }
  };

  const clearHolst = () => {
    const context = canvasRef.current.getContext('2d');

    context.clearRect(0, 0, canvasRef.current.width, canvasRef.current.height);
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
