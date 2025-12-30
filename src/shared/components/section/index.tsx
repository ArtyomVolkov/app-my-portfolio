import React from "react";

import { mergeClassNames } from "@utils/common";

import styles from "./style.module.scss";

type SectionProps = {
  title: string;
  children?: React.ReactNode;
  classes?: {
    root?: string;
    title?: string;
    content?: string;
  };
};

const Section: React.FC<SectionProps> = ({ title, children, classes }) => {
  return (
    <section className={mergeClassNames([styles.Section, classes?.root])}>
      <span className={mergeClassNames([styles.title, classes?.title])}>
        {title}
      </span>
      <div className={mergeClassNames([styles.content, classes?.content])}>
        {children}
      </div>
    </section>
  );
};

export default Section;
