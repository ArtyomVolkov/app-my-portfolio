import React from "react";

import Section from "@shared/components/section";
import ColorPalette from "@shared/components/ui-kit/color-palette";
import Divider from "@shared/components/ui-kit/divider";

import { useAppStore } from "@store/app";

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
              <ColorPalette
                name="Default Light"
                outlineColor="#a5a5a5"
                textColor="#333333"
                active={appStore.theme === "light"}
                onSelect={() => appStore.setTheme('light')}
                backgroundColor="#ffffff"
                colors={[
                  { name: "Background", hex: "#ffffff" },
                  { name: "Paper", hex: "#ebebeb" },
                  { name: "Border", hex: "#a5a5a5" },
                  { name: "Text", hex: "#333333" },
                  { name: "Primary", hex: "#007bff" },
                  { name: "Secondary", hex: "#fb8c00" },
                  { name: "Success", hex: "#28a745" },
                  { name: "Danger", hex: "#dc3545" },
                ]}
              />
              <ColorPalette
                name="Light Grey"
                outlineColor="#bebebeff"
                active={appStore.theme === "light-grey"}
                onSelect={() => appStore.setTheme('light-grey')}
                textColor="#676767ff"
                backgroundColor="#ecececff"
                colors={[
                  { name: "Background", hex: "#ffffff" },
                  { name: "Paper", hex: "#fefaf6" },
                  { name: "Border", hex: "#dbd6ce" },
                  { name: "Text", hex: "#000000" },
                  { name: "Primary", hex: "#9c27b0" },
                  { name: "Secondary", hex: "#00bcd4" },
                  { name: "Success", hex: "#8bc34a" },
                  { name: "Danger", hex: "#ff5722" },
                ]}
              />
            </div>
          </article>
          <Divider title="Dark Themes" align="left" />
          <article className={styles.article}>
            <div className={styles.row}>
              <ColorPalette
                name="Default Dark"
                outlineColor="#555555"
                textColor="#f0f0f0"
                active={appStore.theme === "dark"}
                onSelect={() => appStore.setTheme('dark')}
                backgroundColor="#1a1a1a"
                colors={[
                  { name: "Background", hex: "#19192b" },
                  { name: "Paper", hex: "#29293f" },
                  { name: "Border", hex: "#494966" },
                  { name: "Text", hex: "#f0f0f0" },
                  { name: "Primary", hex: "#a8a7f1" },
                  { name: "Secondary", hex: "#f5d299" },
                  { name: "Success", hex: "#93e493" },
                  { name: "Danger", hex: "#ff5722" },
                ]}
              />
              <ColorPalette
                name="Dark Gray"
                outlineColor="#4a4a4aff"
                textColor="#ebebeb"
                active={appStore.theme === "dark-grey"}
                onSelect={() => appStore.setTheme('dark-grey')}
                backgroundColor="#121212ff"
                colors={[
                  { name: "Background", hex: "#121212ff" },
                  { name: "Paper", hex: "#2c2c2cff" },
                  { name: "Border", hex: "#4a4a4aff" },
                  { name: "Text", hex: "#ebebeb" },
                  { name: "Primary", hex: "#41f2ff" },
                  { name: "Secondary", hex: "#eed47b" },
                  { name: "Success", hex: "#50de08ff" },
                  { name: "Danger", hex: "#eb4353ff" },
                ]}
              />
            </div>
          </article>
        </Section>
      </div>
    </div>
  );
};

export default ThemingTab;
