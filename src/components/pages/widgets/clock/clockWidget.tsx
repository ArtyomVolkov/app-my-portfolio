import React, { useEffect, useState } from 'react';

import ColorBox from '@shared/components/buttons/color-box';
import Divider from '@shared/components/divider';

import { mergeClassNames } from '@utils/common';

import styles from './style.module.scss';

type TShape = 'round' | 'square' | 'butt';

type TCircleParams = {
  name: string;
  size: number;
  circleColor: string;
  circleWidth: number;
  progressColor: string;
  progressWidth: number;
  shape: TShape;
  dashoffset: number;
  dasharray: number;
  className?: string;
}

const COLOR_SCHEMA = {
  colorPill: {
    default: ['black', '#eb1f68', '#0ef705', '#00b4f7'],
    primary: ['#444444', '#fede46', '#0ef705', '#ff913a'],
    secondary: ['#858585', '#c17af6', '#ff7b93', '#7af685'],
  },
}

const ClockWidget = () => {
  const [timeValue, setTimeValue] = useState<Date>(new Date());
  const [settings, setSettings] = useState({
    useAnimation: true,
    stroke: 25,
    progress: 20,
    gap: 8,
    shape: 'round',
    activeSchema: 'default',
    strokeColor: '#363636',
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

  const onUpdateSettings = (name: string, value: any) => {
    setSettings({
      ...settings,
      [name]: value,
    });
  };

  const renderCircle = (params: TCircleParams) => {
    return (
      <svg
        width={params.size}
        height={params.size}
        viewBox={`-${params.size * 0.125} -${params.size * 0.125} ${params.size * 1.25} ${params.size * 1.25}`}
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
                strokeLinecap={params.shape}
                strokeDashoffset={params.dashoffset}
                strokeDasharray={params.dasharray}
        />
      </svg>
    )
  };

  const renderHours = () => {
    const hours = new Date().getHours();
    const dasharray = 2 * Math.PI * 300 / 2;
    const offset = hours > 0 ? dasharray - (dasharray * hours / 24) : 0;
    const [circleColor, progressColor] = COLOR_SCHEMA.colorPill[settings.activeSchema];

    return renderCircle({
      name: 'hours',
      size: 300,
      circleColor,
      progressColor,
      dasharray: dasharray,
      dashoffset: offset,
      circleWidth: settings.stroke,
      shape: settings.shape as TShape,
      progressWidth: settings.progress,
      className: styles.circle,
    });
  };

  const renderMinutes = () => {
    const minutes = new Date().getMinutes();
    const size = 300 - (Math.max(settings.stroke, settings.progress)) * 2 - settings.gap;
    const dasharray = 2 * Math.PI * size / 2;
    const offset = minutes > 0 ? dasharray - (dasharray * minutes / 60) : dasharray;
    const [circleColor, , progressColor] = COLOR_SCHEMA.colorPill[settings.activeSchema];

    return renderCircle({
      name: 'minutes',
      size: size,
      circleColor,
      progressColor,
      dasharray: dasharray,
      dashoffset: offset,
      circleWidth: settings.stroke,
      shape: settings.shape as TShape,
      progressWidth: settings.progress,
      className: styles.circle,
    });
  };

  const renderSeconds = () => {
    const seconds = new Date().getSeconds();
    const size = 300 - (Math.max(settings.stroke, settings.progress)) * 4 - settings.gap * 2;
    const dasharray = 2 * Math.PI * size / 2;
    const offset = seconds > 0 ? dasharray - (dasharray * seconds / 60) : dasharray;
    const [circleColor, , , progressColor] = COLOR_SCHEMA.colorPill[settings.activeSchema];

    return renderCircle({
      name: 'seconds',
      size: size,
      circleColor,
      progressColor,
      dasharray: dasharray,
      dashoffset: offset,
      circleWidth: settings.stroke,
      shape: settings.shape as TShape,
      progressWidth: settings.progress,
      className: styles.seconds,
    });
  };

  return (
    <div className={styles.clockWidget}>
      <div className={mergeClassNames([styles.clock, settings.useAnimation && styles.useAnimation])}>
        {renderHours()}
        {renderMinutes()}
        {renderSeconds()}
        <span
          className={styles.timeValue}
          style={{
            fontSize: 12 + 35 - (Math.max(settings.stroke, settings.progress)),
          }}
        >{timeValue.toLocaleTimeString()}</span>
      </div>
      <div className={styles.settings}>
        <div className={styles.option}>
          <span className={styles.title}>Animation</span>
          <div className={styles.row}>
            <input
              type="checkbox"
              id="clock-animation-input"
              checked={settings.useAnimation}
              onChange={(e) => onUpdateSettings('useAnimation', e.target.checked)}
            />
            <label className={styles.subtitle} htmlFor="clock-animation-input">Use animation</label>
          </div>
        </div>
        <div className={styles.option}>
          <span className={styles.title}>Shape</span>
          <div className={styles.row}>
            <input
              type="radio"
              id="shape-type-round"
              name="round"
              value="round"
              checked={settings.shape === 'round'}
              onChange={(e) => onUpdateSettings('shape', e.target.value)}
            />
            <label className={styles.subtitle} htmlFor="shape-type-round">Round</label>
            <input
              type="radio"
              name="square"
              value="square"
              checked={settings.shape === 'square'}
              id="shape-type-square"
              onChange={(e) => onUpdateSettings('shape', e.target.value)}
            />
            <label className={styles.subtitle} htmlFor="shape-type-square">Square</label>
            <input
              type="radio"
              name="butt"
              value="butt"
              checked={settings.shape === 'butt'}
              id="shape-type-butt"
              onChange={(e) => onUpdateSettings('shape', e.target.value)}
            />
            <label className={styles.subtitle} htmlFor="shape-type-butt">Butt</label>
          </div>
        </div>
        <div className={styles.option}>
          <span className={styles.title}>Resize</span>
          <div className={styles.row}>
            <span className={styles.subtitle}>Stroke</span>
            <input
              type="range"
              min={3}
              max={30}
              step={0.5}
              value={settings.stroke}
              onChange={(e) => onUpdateSettings('stroke', e.target.value)}
            />
            <span className={styles.subtitle}>Progress</span>
            <input
              type="range"
              min={5}
              max={30}
              step={0.5}
              value={settings.progress}
              onChange={(e) => onUpdateSettings('progress', e.target.value)}
            />
            <span className={styles.subtitle}>Gap</span>
            <input
              type="range"
              min={0}
              max={25}
              step={0.5}
              value={settings.gap}
              onChange={(e) => onUpdateSettings('gap', e.target.value)}
            />
          </div>
        </div>
        <Divider
          title="Color schema"
          classes={{
            main: styles.divider,
            title: styles.title
          }}
        />
        <div className={styles.row}>
          <ColorBox
            name="default"
            onClick={() => onUpdateSettings('activeSchema', 'default')}
            active={settings.activeSchema === 'default'}
            colors={COLOR_SCHEMA.colorPill.default}
          />
          <ColorBox
            name="primary"
            active={settings.activeSchema === 'primary'}
            onClick={() => onUpdateSettings('activeSchema', 'primary')}
            colors={COLOR_SCHEMA.colorPill.primary}
          />
          <ColorBox
            name="secondary"
            active={settings.activeSchema === 'secondary'}
            onClick={() => onUpdateSettings('activeSchema', 'secondary')}
            colors={COLOR_SCHEMA.colorPill.secondary}
          />
        </div>
      </div>
    </div>
  );
};

export default ClockWidget;