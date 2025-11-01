import React from "react";

import Button, { Color, Variant } from "@shared/components/ui-kit/button";
import Section from "@shared/components/section";

import styles from "./style.module.scss";

const BUTTONS: Variant[] = ["solid", "outlined", "dashed", "text", "link"];
const COLORS: Color[] = [
  "default",
  "primary",
  "secondary",
  "danger",
  "warning",
  "info",
  "success",
];

const ButtonsTab = () => {
  return (
    <div className={styles.TabContent}>
      <h2 className={styles.title}>Buttons</h2>
      <p className={styles.subtitle}>
        Buttons are interactive elements that allow users to trigger actions or
        events.
      </p>
      <div className={styles.examples}>
        <Section title="Button Colors">
          {COLORS.map((color) => (
            <div className={styles.buttons} key={color}>
              {BUTTONS.map((variant) => (
                <Button key={variant} color={color} variant={variant}>
                  {variant.charAt(0).toUpperCase() + variant.slice(1)}
                </Button>
              ))}
            </div>
          ))}
        </Section>
      </div>
    </div>
  );
};

export default ButtonsTab;
