import React from "react";

import Button from "@shared/components/ui-kit/button";
import Input from "@shared/components/ui-kit/input";
import WebWorkerService from "@services/web-worker";
import Typography from "@shared/components/ui-kit/typography";
import Divider from "@shared/components/ui-kit/divider";

import styles from "./style.module.scss";

const MAX_RANDOM = 8;

const complexOperation = (n: number, maxRandom: number) => {
  const list = new Array(n)
    .fill(0)
    .map(() => Math.round(Math.random() * maxRandom));

  return list.reduce((acc, val) => acc + val, 0);
};

const WebWorkerWidget = () => {
  const [inputValue, setInputValue] = React.useState<number>(100000000);
  const [result, setResult] = React.useState<number | null>(null);
  const [loading, setLoading] = React.useState({
    worker: false,
    mainThread: false,
  });
  const [executionTime, setExecutionTime] = React.useState<number | null>(null);

  const onCalculateWithWorker = async () => {
    const startTime = performance.now();
    const worker = new WebWorkerService();

    setResult(null);
    setExecutionTime(null);
    setLoading((prev) => ({ ...prev, worker: true }));

    const result = await worker.invokeFunction(
      complexOperation,
      inputValue,
      MAX_RANDOM
    );
    const endTime = performance.now();

    setResult(result as number);
    setExecutionTime(endTime - startTime);
    setLoading((prev) => ({ ...prev, worker: false }));
  };

  const onCalculateWithMainThread = () => {
    const startTime = performance.now();
    setResult(null);
    setExecutionTime(null);
    setLoading((prev) => ({ ...prev, mainThread: true }));

    setTimeout(() => {
      const result = complexOperation(inputValue, MAX_RANDOM);
      const endTime = performance.now();
      setResult(result);
      setExecutionTime(endTime - startTime);
      setLoading((prev) => ({ ...prev, mainThread: false }));
    }, 0);
  };

  return (
    <section className={styles.factorialWidget}>
      <Typography variant="h4" className={styles.title}>
        Web Worker example
      </Typography>
      <Typography variant="h6" className={styles.description}>
        {`Sum of random numbers in range 0-${MAX_RANDOM} for array of (n) items.`}
      </Typography>
      <Divider title="Calculation" align="left" />
      <Input
        type="number"
        fullWidth
        placeholder="Enter a number"
        disabled={loading.worker || loading.mainThread}
        value={inputValue}
        onChange={(e) => setInputValue(Number(e.target.value))}
      />
      <div className={styles.actions}>
        <Button
          variant="solid"
          color="primary"
          disabled={inputValue <= 0 || loading.worker || loading.mainThread}
          loading={loading.worker}
          onClick={onCalculateWithWorker}
        >
          Calculate with Web Worker
        </Button>
        <Button
          variant="outlined"
          color="primary"
          disabled={inputValue <= 0 || loading.worker || loading.mainThread}
          loading={loading.mainThread}
          onClick={onCalculateWithMainThread}
        >
          Calculate with Main Thread
        </Button>
      </div>
      <Divider title="Metrics" align="left" />
      <div className={styles.metrics}>
        <Typography variant="p" className={styles.result}>
          {`Result of sum: `}
          {result !== null ? new Intl.NumberFormat().format(result) : "-"}
        </Typography>
        <Typography variant="p" className={styles.executionTime}>
          Execution time:{" "}
          {executionTime !== null ? `${executionTime.toFixed(2)} ms` : "-"}
        </Typography>
      </div>
    </section>
  );
};

export default WebWorkerWidget;
