import React, { useEffect, useMemo, useState } from "react";

import { formatBytes } from "@utils/common";

import styles from "./style.module.scss";

type MemoryWidgetProps = {
  ping?: number;
};

interface IMemoryData {
  jsHeapSizeLimit: number;
  totalJSHeapSize: number;
  usedJSHeapSize: number;
}

const MemoryWidget: React.FC<MemoryWidgetProps> = ({ ping = 500 }) => {
  const [memoryData, setMemoryData] = useState<IMemoryData>({
    usedJSHeapSize: 0,
    jsHeapSizeLimit: 0,
    totalJSHeapSize: 0,
  });

  useEffect(() => {
    const intervalId = setInterval(() => {
      setMemoryData({
        usedJSHeapSize: performance['memory'].usedJSHeapSize,
        jsHeapSizeLimit: performance['memory'].jsHeapSizeLimit,
        totalJSHeapSize: performance['memory'].totalJSHeapSize,
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
          color: `rgb(${progress.color}, ${progress.color}, ${progress.color})`,
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
