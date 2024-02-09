import React, { useState } from 'react';

import styles from './style.module.scss';

const pointsCount = 10;
const smoothing = 0.15;
const maxValue = 200;
const offsets = {
  top: 15,
  right: 15,
  bottom: 35,
  left: 40
};
const stepX = 40; // step by x axis
const stepY = 50; // depends on point values

const chartPoints = Array(pointsCount).fill(0).map(() => Math.round(Math.random()*maxValue));

const pointsData = chartPoints.map((item, index) => [index*stepX+offsets.left, maxValue-item+offsets.top]);

const InlineChart = () => {
  const [settings] = useState({
    zoom: 1,
    viewBox: {
      width: 360 + offsets.left + offsets.right,
      height: 200 + offsets.top + offsets.bottom,
    },
    chartBox: {
      width: 360,
      height: 200
    }
  });

  const inlinePath = (point) => `L ${point[0]} ${point[1]}`;

  const line = (pointA, pointB) => {
    const lengthX = pointB[0] - pointA[0]
    const lengthY = pointB[1] - pointA[1]
    return {
      length: Math.sqrt(Math.pow(lengthX, 2) + Math.pow(lengthY, 2)),
      angle: Math.atan2(lengthY, lengthX)
    }
  };

  const controlPoint = (current, previous, next, reverse = false) => {
    const p = previous || current;
    const n = next || current;
    const o = line(p, n);
    const angle = o.angle + (reverse ? Math.PI : 0);
    const length = o.length * smoothing;
    const x = current[0] + Math.cos(angle) * length;
    const y = current[1] + Math.sin(angle) * length;

    return [x, y];
  };

  const bezierPath = (point, i, a) => {
    const cps = controlPoint(a[i - 1], a[i - 2], point);
    const cpe = controlPoint(point, a[i - 1], a[i + 1], true);

    return `C ${cps[0]},${cps[1]} ${cpe[0]},${cpe[1]} ${point[0]},${point[1]}`;
  };

  const getSvgPath = (points, command) => {
    return points.reduce((acc, point, i, a) => i === 0
      ? `M ${point[0]},${point[1]}`
      : `${acc} ${command(point, i, a)}`, '')
  };

  const renderXAxis = () => {
    const [x1, y1] = [offsets.left, offsets.top];
    const [x2, y2] = [offsets.left+settings.chartBox.width, offsets.top];
    const tx = offsets.left/2;

    return Array(maxValue/stepX).fill(1).map((item ,index) => {
      return (
        <React.Fragment key={index}>
          <text x={tx} y={y1+(index*stepY)} className={styles.axisLabel} dominantBaseline="middle" textAnchor="middle">
            { maxValue - (index*stepY)}
          </text>
          <line x1={x1} y1={y1+(index*stepY)} x2={x2} y2={y2+(index*stepY)} strokeWidth={1} className={styles.axisLine} />
        </React.Fragment>
      )
    });
  };

  const renderYAxis = () => {
    const [x1, y1] = [offsets.left, offsets.top];
    const [x2, y2] = [offsets.left, offsets.top+settings.chartBox.height];
    const ty = settings.chartBox.height + offsets.top + (offsets.bottom/2);

    return chartPoints.map((item ,index) => {
      return (
        <React.Fragment key={index}>
          <text x={offsets.left+(index*stepX)} y={ty} className={styles.axisLabel} dominantBaseline="middle" textAnchor="middle">
            { `P${index+1}` }
          </text>
          <line x1={x1+(index*stepX)} y1={y1} x2={x2+(index*stepX)} y2={y2} strokeWidth={1} className={styles.axisLine} />
        </React.Fragment>
      )
    });
  };

  const renderCirclePoints = () => {
    return pointsData.map(([x, y], index) => (
      <circle cx={x} cy={y} r={5} key={index} className={styles.circlePoint} />
    ));
  };

  return (
    <section className={styles.chartWidget}>
      <svg
        xmlns="http://www.w3.org/2000/svg"
        width={`${settings.viewBox.width * settings.zoom}px`}
        height={`${settings.viewBox.height * settings.zoom}px`}
        viewBox={`0 0 ${settings.viewBox.width} ${settings.viewBox.height}`}
      >
        {/*<rect width={settings.viewBox.width} height={settings.viewBox.height} fill="none" stroke="black" strokeWidth={1} />*/}
        <g className={styles.xAxisLines}>{renderXAxis()}</g>
        <g className={styles.yAxisLines}>{renderYAxis()}</g>
        <g className={styles.chartBox}>
          {/*<path*/}
          {/*  d={getSvgPath(pointsData, inlinePath)}*/}
          {/*  stroke="black"*/}
          {/*  strokeWidth="2"*/}
          {/*  fill="none"*/}
          {/*/>*/}
          <path
            d={getSvgPath(pointsData, bezierPath)}
            className={styles.strokeLine}
            strokeWidth="2"
            fill="none"
          />
          {
            renderCirclePoints()
          }
        </g>
      </svg>
    </section>
  );
};

export default InlineChart;