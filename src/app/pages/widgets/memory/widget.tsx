import React, { useEffect, useMemo, useState } from 'react';

import { formatBytes } from '@utils/common';

import styles from './style.module.scss';

type MemoryWidgetProps = {
  ping?: number;
};

type Performance = {
  memory?: {
    jsHeapSizeLimit: number;
    totalJSHeapSize: number;
    usedJSHeapSize: number;
  };
};

interface IMemoryData {
  jsHeapSizeLimit: number;
  totalJSHeapSize: number;
  usedJSHeapSize: number;
}

const MemoryWidget: React.FC<MemoryWidgetProps> = ({ ping = 500 }) => {
  const [memoryData, setMemoryData] = useState<IMemoryData>({
    usedJSHeapSize: (performance as Performance).memory?.usedJSHeapSize || 0,
    jsHeapSizeLimit: (performance as Performance).memory?.jsHeapSizeLimit || 0,
    totalJSHeapSize: (performance as Performance).memory?.totalJSHeapSize || 0,
  });

  useEffect(() => {
    const intervalId = setInterval(() => {
      const memory = (performance as { memory?: IMemoryData }).memory;

      if (!memory) {
        clearInterval(intervalId);
        return;
      }

      setMemoryData({
        usedJSHeapSize: memory.usedJSHeapSize,
        jsHeapSizeLimit: memory.jsHeapSizeLimit,
        totalJSHeapSize: memory.totalJSHeapSize,
      });
    }, ping);

    return () => {
      clearInterval(intervalId);
    };
  }, [ping]);

  const progress = useMemo(() => {
    const value = memoryData.usedJSHeapSize / memoryData.jsHeapSizeLimit;

    return {
      value: value * 100,
      color: 256 - 256 * value,
      background: 135 - 135 * value,
    };
  }, [memoryData.usedJSHeapSize, memoryData.jsHeapSizeLimit]);

  return (
    <section className={styles.heapSizePill}>
      <span
        className={styles.heapSize}
        style={{
          color: `hsl(${progress.background - 180}deg 100% 50%)`,
        }}
      >
        {`${formatBytes(memoryData.usedJSHeapSize)} / ${formatBytes(
          memoryData.jsHeapSizeLimit
        )}`}
      </span>
      <span
        className={styles.progress}
        style={{
          width: `${progress.value}%`,
          background: `hsl(${progress.background}deg 100% 60%)`,
        }}
      />
    </section>
  );
};

export default MemoryWidget;
