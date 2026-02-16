import React from "react";

import Section from "@shared/components/section";
import ColorPalette from "@shared/components/ui-kit/color-palette";
import Divider from "@shared/components/ui-kit/divider";
import { LightThemes, DarkThemes } from "@shared/components/ui-kit/themes";
import { useAppStore, type Theme } from "@store/app";

import styles from "./style.module.scss";

const ThemingTab = () => {
  const appStore = useAppStore();

  return (
    <div className={styles.TabContent}>
      <h2 className={styles.title}>Themes</h2>
      <p className={styles.subtitle}>
        Theming in UI design refers to the process of creating a consistent
        visual style for a user interface by defining a set of colors,
        typography, spacing, and other design elements that can be applied
        across an application or website. It allows designers and developers to
        maintain a cohesive look and feel while providing flexibility for
        customization.
      </p>
      <div className={styles.examples}>
        <Section title="Theme variants">
          <Divider title="Light Themes" align="left" />
          <article className={styles.article}>
            <div className={styles.row}>
              {LightThemes.map((theme) => (
                <ColorPalette
                  key={theme.key}
                  name={theme.name}
                  outlineColor={theme.outlineColor}
                  textColor={theme.textColor}
                  active={appStore.theme === theme.key}
                  onSelect={() => appStore.setTheme(theme.key as Theme)}
                  backgroundColor={theme.backgroundColor}
                  colors={theme.palette}
                />
              ))}
            </div>
          </article>
          <Divider title="Dark Themes" align="left" />
          <article className={styles.article}>
            <div className={styles.row}>
              {DarkThemes.map((theme) => (
                <ColorPalette
                  key={theme.key}
                  name={theme.name}
                  outlineColor={theme.outlineColor}
                  textColor={theme.textColor}
                  active={appStore.theme === theme.key}
                  onSelect={() => appStore.setTheme(theme.key as Theme)}
                  backgroundColor={theme.backgroundColor}
                  colors={theme.palette}
                />
              ))}
            </div>
          </article>
        </Section>
      </div>
    </div>
  );
};

export default ThemingTab;
