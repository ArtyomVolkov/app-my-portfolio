import React from "react";

import Header from "@components/header";
import SideBar from "@components/aside";
import AppRoutes from "@components/routes";

import { mergeClassNames } from "@utils/common";
import { useResizeChange } from "@shared/hooks/layout";

import { useAppStore } from "@store/app";
import { RESIZE } from "@shared/constants/layout";

import styles from "./style.module.scss";

const AppContent = () => {
  const appStore = useAppStore();

  useResizeChange((width) => {
    appStore.setFullWidth(width < RESIZE.tablet);
  });

  return (
    <div
      className={mergeClassNames([
        styles.appEntry,
        appStore.layout.fullWidth && styles.fullWidth,
      ])}
    >
      <SideBar fullWidth={appStore.layout.fullWidth} />
      <div className={styles.mainContent}>
        <Header />
        <AppRoutes />
      </div>
    </div>
  );
};

export default AppContent;
