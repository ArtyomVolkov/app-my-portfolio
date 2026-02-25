import Main from "@app/layout/main";
import TechnologyList from "@shared/components/lists/technologies";
import MemoryWidget from "@pages/widgets/memory/widget";
import WebWorkerWidget from "@pages/widgets/memory/worker-widget";

import { TECHNOLOGIES } from "@pages/widgets/memory/data";

import styles from "./style.module.scss";

const Memory = () => {
  return (
    <Main className={styles.memoryWidgets}>
      <h3>Memory</h3>
      <TechnologyList data={TECHNOLOGIES} className={styles.technologyList} />
      <p>
        Pretty simple heap size component for display measure of browser memory
      </p>
      <MemoryWidget ping={1000} />
      <WebWorkerWidget />
    </Main>
  );
};

export default Memory;
