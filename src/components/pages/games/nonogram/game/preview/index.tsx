import React, { useContext, useEffect, useMemo, useRef } from 'react';

import { EBoxState, GameContext, IState, TDispatch } from '@pages/games/nonogram/game/context';

interface IPreview {
  initialDraw?: boolean,
  drawBoxSize?: number,
}

const Preview: React.FC<IPreview> = ({ initialDraw = false }) => {
  const canvasRef = useRef(null);
  const [data] = useContext<[IState, TDispatch]>(GameContext);
  const drawBox = useMemo(() => 1000 / Math.min(...data.size), [data.size]);

  useEffect(() => {
    setInitialScale();
  }, [data.size]);

  useEffect(() => {
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
    const sx = (canvasRef.current.parentElement.clientWidth || 100) / 1000;
    const sy = (canvasRef.current.parentElement.clientHeight || 100) / 1000;
    const size = Math.min(sx, sy);

    canvasRef.current.style.transform = `scale(${size})`;
  };

  const drawByModel = () => {
    const context = canvasRef.current.getContext('2d');

    data.blank.forEach((row, ri) => {
      row.forEach((cell, ci) => {
        if (cell > 0) {
          const [x, y] = [ci*drawBox, ri*drawBox];

          context.fillRect(x, y, drawBox, drawBox);
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

    const [x, y] = [cell*drawBox, row*drawBox];

    switch (value) {
      case EBoxState.Cross:
      case EBoxState.Empty: {
        context.clearRect(x, y, drawBox, drawBox);
        break;
      }
      case EBoxState.Filled: {
        context.fillRect(x, y,  drawBox, drawBox);
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
        width={1000}
        height={1000}
      />
    </div>
  );
}

export default Preview;
