import React, { useEffect, useState } from 'react';

import styles from './style.module.scss';

type TCircleParams = {
  name: string;
  size: number;
  circleColor: string;
  circleWidth: number;
  progressColor: string;
  progressWidth: number;
  progressShape: 'round'|'square'|'butt';
  dashoffset: number;
  dasharray: number;
  className?: string;
}

const ClockWidget = () => {
  const [timeValue, setTimeValue] = useState<Date>(new Date());
  const [settings] = useState({
    stroke: 24,
    progress: 20,
    gap: 8,
    shape: 'round',
    strokeColor: '#363636',
    progressColor: ["#09e709", '#f06d0f', 'rgb(176,15,240)']
  });

  useEffect(() => {
    const interval = setInterval(updateTimeValue, 500);

    return () => {
      clearInterval(interval);
    }
  }, []);

  const updateTimeValue = () => {
    setTimeValue(new Date());
  };

  const renderCircle = (params: TCircleParams) => {
    return (
      <svg
        width={params.size}
        height={params.size}
        viewBox={`-${params.size*0.125} -${params.size*0.125} ${params.size*1.25} ${params.size*1.25}`}
        version="1.1" xmlns="http://www.w3.org/2000/svg"
        className={params.className}
      >
        <circle fill="transparent"
                r={`${(params.size / 2)}`} cx={`${params.size / 2}`} cy={`${params.size / 2}`}
                stroke={params.circleColor} strokeWidth={params.circleWidth}/>
        <circle fill="transparent" r={`${(params.size / 2)}`} cx={`${params.size / 2}`} cy={`${params.size / 2}`}
                stroke={params.progressColor}
                data-name={params.name}
                className={styles.progressArc}
                strokeWidth={params.progressWidth}
                strokeLinecap={params.progressShape}
                strokeDashoffset={params.dashoffset}
                strokeDasharray={params.dasharray}
        />
      </svg>
    )
  };

  const renderHours = () => {
    const hours = new Date().getHours();
    const dasharray = 2*Math.PI*300/2;
    const offset = hours > 0 ? dasharray - (dasharray * hours / 24) : 0;

    return renderCircle({
      name: 'hours',
      size: 300,
      circleColor: settings.strokeColor,
      progressColor: settings.progressColor[0],
      dasharray: dasharray,
      dashoffset: offset,
      circleWidth: settings.stroke,
      progressShape: 'round',
      progressWidth: settings.progress,
      className: styles.circle
    });
  };

  const renderMinutes = () => {
    const minutes = new Date().getMinutes();
    const size = 300 - (Math.max(settings.stroke, settings.progress))*2 - settings.gap;
    const dasharray = 2*Math.PI*size/2;
    const offset = minutes > 0 ? dasharray - (dasharray * minutes / 60) : dasharray;

    return renderCircle({
      name: 'minutes',
      size: size,
      circleColor: settings.strokeColor,
      progressColor: settings.progressColor[1],
      dasharray: dasharray,
      dashoffset: offset,
      circleWidth: settings.stroke,
      progressShape: 'round',
      progressWidth: settings.progress,
      className: styles.circle
    });
  };

  const renderSeconds = () => {
    const seconds = new Date().getSeconds();
    const size = 300 - (Math.max(settings.stroke, settings.progress))*4 - settings.gap*2;
    const dasharray = 2*Math.PI*size/2;
    const offset = seconds > 0 ? dasharray-(dasharray*seconds/60) : dasharray;

    return renderCircle({
      name: 'seconds',
      size: size,
      circleColor: settings.strokeColor,
      progressColor: settings.progressColor[2],
      dasharray: dasharray,
      dashoffset: offset,
      circleWidth: settings.stroke,
      progressShape: 'round',
      progressWidth: settings.progress,
      className: styles.seconds,
    });
  };

  return (
    <div className={styles.clockWidget}>
      <div className={styles.clock}>
        {renderHours()}
        {renderMinutes()}
        {renderSeconds()}
        <span className={styles.timeValue}>{timeValue.toLocaleTimeString()}</span>
      </div>
    </div>
  );
};

export default ClockWidget;