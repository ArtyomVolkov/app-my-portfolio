import React from "react";

import IconButton from "@mui/material/IconButton";
import MenuRoundedIcon from "@mui/icons-material/MenuRounded";
import MenuOpenRoundedIcon from "@mui/icons-material/MenuOpenRounded";

import Navigation from "@components/aside/navigation";

import { useAppStore } from "@store/app";

import styles from "./style.module.scss";

const SideBar = ({ fullWidth }) => {
  const appStore = useAppStore();

  return (
    <aside className={styles.sideBar}>
      <div className={styles.header}>
        <IconButton
          className={styles.screenResize}
          onClick={appStore.toggleFullWidth}
          name="Toggle Full Width"
        >
          {fullWidth ? (
            <MenuRoundedIcon className={styles.icon} />
          ) : (
            <MenuOpenRoundedIcon className={styles.icon} />
          )}
        </IconButton>
        <div className={styles.appLogo}>App Portfolio</div>
      </div>
      <Navigation />
    </aside>
  );
};

export default SideBar;
