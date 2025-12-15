import React from "react";

import Divider from "@shared/components/ui-kit/divider";
import Section from "@shared/components/section";
import Dropdown from "@shared/components/ui-kit/dropdown";

import styles from "./style.module.scss";

const OPTIONS = [
  { key: "option1", label: "Option 1" },
  { key: "option2", label: "Option 2" },
  { key: "option3", label: "Option 3" },
];

const DropdownPreview = () => {
  return (
    <div className={styles.TabContent}>
      <h2 className={styles.title}>Dropdown</h2>
      <p className={styles.subtitle}>
        Dropdowns provide a way to select an option from a list of choices,
        helping to conserve space and improve user experience by hiding less
        frequently used options until needed.
      </p>
      <div className={styles.examples}>
        <Section title="Dropdown Variants">
          <article className={styles.article}>
            <Divider title="Horizontal tabs" align="left" />
            <Dropdown placeholder="Select Option" options={OPTIONS} />
          </article>
        </Section>
      </div>
    </div>
  );
};

export default DropdownPreview;
