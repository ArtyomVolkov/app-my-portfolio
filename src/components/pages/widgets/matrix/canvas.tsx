import React, { useEffect, useRef, useState } from 'react';

import Button from '@mui/material/Button';
import FullscreenExitOutlinedIcon from '@mui/icons-material/FullscreenExitOutlined';
import FullscreenOutlinedIcon from '@mui/icons-material/FullscreenOutlined';

import { mergeClassNames } from '@utils/common';

import styles from './style.module.scss';

const MatrixCanvas = () => {
  const [fullscreen, setFullscreen] = useState(false);
  const canvasRef = useRef<HTMLCanvasElement>();
  const intervalRef = useRef(null);

  useEffect(() => {
    initialize();

    return () => {
      clearInterval(intervalRef.current);
    }
  }, []);

  const initialize = () => {
    if (!canvasRef.current) {
      return;
    }

    const canvas = canvasRef.current;
    const ctx = canvas.getContext('2d');
    const w = canvas.width = document.body.offsetWidth;
    const h = canvas.height = document.body.offsetHeight;
    const cols = Math.floor(w / 20) + 1;
    const yAxisPos = Array(cols).fill(0);

    ctx.fillRect(0, 0, w, h);

    intervalRef.current = setInterval(() => {
      draw(ctx, w, h, yAxisPos);
    }, 50);
  };

  const draw = (ctx, w, h, yAxisPos) => {
    ctx.fillStyle = '#0001';
    ctx.fillRect(0, 0, w, h);

    ctx.fillStyle = '#09e709';
    ctx.font = '14pt monospace';

    yAxisPos.forEach((y, ind) => {
      const text = String.fromCharCode(Math.random() * 128);
      const x = ind * 20;

      ctx.fillText(text, x, y);
      yAxisPos[ind] = (y > 100 + Math.random() * 10000) ? 0 : y + 20;
    });
  };

  return (
    <div className={mergeClassNames([styles.canvas, fullscreen && styles.fullscreen])}>
      <canvas ref={canvasRef}/>
      <Button
        variant="contained"
        color="inherit"
        className={styles.fullscreenButton}
        onClick={() => setFullscreen(!fullscreen)}
      >
        {
          fullscreen ? <FullscreenExitOutlinedIcon/> : <FullscreenOutlinedIcon/>
        }
      </Button>
    </div>
  );
};

export default MatrixCanvas;