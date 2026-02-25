import React from "react";
import { useNavigate } from "react-router";

import Button from "@mui/material/Button";

import { mergeClassNames } from "@utils/common";

import styles from "./style.module.scss";

interface NavButton {
  path: string;
  icon: React.ReactNode;
  title: string;
  className?: string;
}

const NavButton: React.FC<NavButton> = ({ path, title, icon, className }) => {
  const navigation = useNavigate();

  const navigateTo = () => {
    navigation(path);
  };

  return (
    <Button
      className={mergeClassNames([styles.navButton, className])}
      onClick={navigateTo}
      color="inherit"
    >
      <div className={styles.iconBox}>{icon}</div>
      <p className={styles.headline}>{title}</p>
    </Button>
  );
};

export default NavButton;
