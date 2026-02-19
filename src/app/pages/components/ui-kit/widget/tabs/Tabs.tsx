import React from "react";

import Divider from "@shared/components/ui-kit/divider";
import Section from "@shared/components/section";
import Tabs from "@shared/components/ui-kit/tabs";

import styles from "./style.module.scss";

const DEFAULT_TABS = [
  {
    key: "tab1",
    label: "Tab 1",
    icon: "🔥",
    component: <div className={styles.tabContentPreview}>Content for Tab 1</div>,
  },
  {
    key: "tab2",
    icon: "💧",
    label: "Tab 2",
    component: <div className={styles.tabContentPreview}>Content for Tab 2</div>,
  },
  {
    key: "tab3",
    icon: "🌳",
    label: "Tab 3",
    component: <div className={styles.tabContentPreview}>Content for Tab 3</div>,
  },
];

const TabVariants = {
  horizontal: [
    ...DEFAULT_TABS,
    {
      key: "tab4",
      icon: "⚡",
      label: "Tab 4",
      disabled: true,
      component: <div className={styles.tabContentPreview}>Content for Tab 4</div>,
    },
  ],
  vertical: [
    ...DEFAULT_TABS,
    {
      key: "tab4",
      icon: "⚡",
      label: "Tab 4",
      disabled: true,
      component: <div className={styles.tabContentPreview}>Content for Tab 4</div>,
    },
    {
      key: "tab5",
      icon: "🌟",
      label: "Tab 5",
      component: <div className={styles.tabContentPreview}>Content for Tab 5</div>,
    },
  ],
};

const TabsPreview = () => {
  return (
    <div className={styles.TabContent}>
      <h2 className={styles.title}>Tabs</h2>
      <p className={styles.subtitle}>
        Tabs are a user interface (UI) component that allows users to navigate
        between different sections or views within the same context.
      </p>
      <div className={styles.examples}>
        <Section title="Tabs Variants">
          <article className={styles.article}>
            <Divider title="Horizontal tabs" align="left" />
            <Tabs items={TabVariants.horizontal} />
            <Divider title="Vertical tabs" align="left" />
            <Tabs items={TabVariants.vertical} vertical />
          </article>
        </Section>
      </div>
    </div>
  );
};

export default TabsPreview;
