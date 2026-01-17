import React from "react";

import Divider from "@shared/components/ui-kit/divider";
import Section from "@shared/components/section";
import Dropdown from "@shared/components/ui-kit/dropdown";

import styles from "./style.module.scss";

const OPTIONS = [
  { key: "option1", label: "Option 1", startIcon: "⭐" },
  { key: "option2", label: "Option 2", startIcon: "🔥" },
  { key: "option3", label: "Option 3", startIcon: "💧" },
  { key: "option4", label: "Option 4", startIcon: "🌟" },
  { key: "option5", label: "Option 5", startIcon: "⚡" },
  { key: "option6", label: "Option 6", startIcon: "🍀" },
  { key: "option7", label: "Option 7", startIcon: "🌈" },
];

const DropdownPreview = () => {
  const onSelect = (option) => {
    console.log("Selected option:", option);
  };

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
            <Divider title="Default" align="left" />
            <div className={styles.row}>
              <Dropdown
                placeholder="Select Option"
                options={OPTIONS}
                minWidth={200}
                onSelect={onSelect}
              />
              <Dropdown
                placeholder="Select Option"
                options={OPTIONS}
                minWidth={200}
                onSelect={onSelect}
                defaultSelected="option5"
              />
              <Dropdown
                placeholder="Select Option"
                options={OPTIONS}
                disabled
                minWidth={200}
                onSelect={onSelect}
                defaultSelected="option1"
              />
            </div>
            <Divider title="Multiple select" align="left" />
            <div className={styles.row}>
              <Dropdown
                placeholder="Select Option(s)"
                options={OPTIONS}
                minWidth={200}
                multiple
                onSelect={onSelect}
              />
              <Dropdown
                placeholder="Select Option(s)"
                options={OPTIONS}
                minWidth={200}
                multiple
                defaultSelected={["option1", "option3"]}
                onSelect={onSelect}
              />
              <Dropdown
                placeholder="Select Option(s)"
                options={OPTIONS}
                minWidth={200}
                multiple
                disabled
                defaultSelected={["option1", "option2", "option3"]}
                onSelect={onSelect}
              />
            </div>
            <Divider title="Full width" align="left" />
            <div className={styles.row}>
              <Dropdown
                placeholder="Select Option"
                options={OPTIONS}
                minWidth={200}
                onSelect={onSelect}
                fullWidth
              />
              <Dropdown
                placeholder="Select Option(s)"
                options={OPTIONS}
                minWidth={200}
                onSelect={onSelect}
                fullWidth
                multiple
              />
            </div>
            <Divider title="Sizes" align="left" />
            <div className={styles.row}>
              <Dropdown
                placeholder="Small"
                options={OPTIONS}
                minWidth={200}
                onSelect={onSelect}
                size="small"
              />
              <Dropdown
                placeholder="Medium"
                options={OPTIONS}
                minWidth={200}
                onSelect={onSelect}
                size="medium"
              />
              <Dropdown
                placeholder="Large"
                options={OPTIONS}
                minWidth={200}
                onSelect={onSelect}
                size="large"
              />
            </div>
            <Divider title="Long option name" align="left" />
            <div className={styles.row}>
              <Dropdown
                placeholder="Select option"
                options={[
                  {
                    key: "longOption",
                    label: "This is a very long option name to test width",
                    startIcon: "📝",
                  },
                  ...OPTIONS,
                ]}
                minWidth={200}
                onSelect={onSelect}
              />
              <Dropdown
                placeholder="Select option"
                options={[
                  {
                    key: "longOption",
                    label: "This is a very long option name to test width",
                    startIcon: "📝",
                  },
                  ...OPTIONS,
                ]}
                minWidth={200}
                multiple
                fullWidth
                onSelect={onSelect}
              />
            </div>
          </article>
        </Section>
      </div>
    </div>
  );
};

export default DropdownPreview;
