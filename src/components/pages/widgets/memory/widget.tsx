import React, { useEffect, useMemo, useState } from 'react';

import { formatBytes } from '@utils/common';

import styles from './style.module.scss';

interface IMemoryData {
  memory: {
    jsHeapSizeLimit: number;
    totalJSHeapSize: number;
    usedJSHeapSize: number
  }
}

const MemoryWidget = () => {
  const [memoryData, setMemoryData] = useState<IMemoryData>(window.performance as any);

  useEffect(() => {
    const intervalId = setInterval(() => {
      setMemoryData(window.performance as any);
    }, 500);

    return () => {
      clearInterval(intervalId);
    }
  }, []);

  const progress = useMemo(() => {
    const value = memoryData.memory.usedJSHeapSize/memoryData.memory.jsHeapSizeLimit;

    return {
      value: value * 100,
      color: 256 - (256 * value),
      background: 135 - (135 * value),
    }
  }, [memoryData.memory.usedJSHeapSize, memoryData.memory.jsHeapSizeLimit]);

  return (
    <section className={styles.heapSizePill}>
      <span
        className={styles.heapSize}
        style={{
          color: `rgb(${progress.color}, ${progress.color}, ${progress.color})`,
        }}
      >
        {
          `${formatBytes(memoryData.memory.usedJSHeapSize)} / ${formatBytes(memoryData.memory.jsHeapSizeLimit)}`
        }
      </span>
      <span
        className={styles.progress}
        style={{
          width: `${progress.value}%`,
          background: `hsl(${progress.background}deg 100% 60%)`,
        }}
      />
    </section>
  )
};

export default MemoryWidget;