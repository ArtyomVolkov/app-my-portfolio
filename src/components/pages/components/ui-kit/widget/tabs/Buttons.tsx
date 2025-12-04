import React from "react";

import SendRoundedIcon from "@mui/icons-material/SendRounded";
import SettingsRoundedIcon from "@mui/icons-material/SettingsRounded";
import AddRoundedIcon from "@mui/icons-material/AddRounded";
import AccountBalanceRoundedIcon from "@mui/icons-material/AccountBalanceRounded";

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

const STATE = [
  {
    label: "Disabled",
    props: { disabled: true, color: "default" as Color },
  },
  {
    label: "Loading",
    props: { loading: true, color: "primary" as Color },
  },
];

const ICONS = [
  {
    label: "Start Icon",
    props: { startIcon: <SendRoundedIcon />, color: "default" as Color },
  },
  {
    label: "End Icon",
    props: { endIcon: <SettingsRoundedIcon />, color: "primary" as Color },
  },
  {
    label: "Two Icons",
    props: {
      startIcon: <AddRoundedIcon />,
      endIcon: <AccountBalanceRoundedIcon />,
      color: "secondary" as Color,
    },
  },
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
        <Section title="Colors">
          {COLORS.map((color) => (
            <article key={color} className={styles.article}>
              <span className={styles.title}>
                {color.charAt(0).toUpperCase() + color.slice(1)}
              </span>
              <div className={styles.buttons}>
                {BUTTONS.map((variant) => (
                  <Button key={variant} color={color} variant={variant}>
                    {variant.charAt(0).toUpperCase() + variant.slice(1)}
                  </Button>
                ))}
              </div>
            </article>
          ))}
        </Section>
        <Section title="States">
          {STATE.map((state) => (
            <article key={state.label} className={styles.article}>
              <span className={styles.title}>{state.label}</span>
              <div className={styles.buttons}>
                {BUTTONS.map((variant) => (
                  <Button key={variant} variant={variant} {...state.props}>
                    {variant.charAt(0).toUpperCase() + variant.slice(1)}
                  </Button>
                ))}
              </div>
            </article>
          ))}
        </Section>
        <Section title="Icons">
          {ICONS.map((state) => (
            <article key={state.label} className={styles.article}>
              <span className={styles.title}>{state.label}</span>
              <div className={styles.buttons}>
                {BUTTONS.map((variant) => (
                  <Button key={variant} variant={variant} {...state.props}>
                    {variant.charAt(0).toUpperCase() + variant.slice(1)}
                  </Button>
                ))}
              </div>
            </article>
          ))}
        </Section>
      </div>
    </div>
  );
};

export default ButtonsTab;
