import Typography from "@shared/components/ui-kit/typography";
import Section from "@shared/components/section";
import Divider from "@shared/components/ui-kit/divider";

import styles from "./style.module.scss";

const TypographyTab = () => {
  return (
    <div className={styles.TabContent}>
      <h2 className={styles.title}>Typography</h2>
      <p className={styles.subtitle}>
        HTML typography refers to the presentation and styling of text content
        within a web page.
      </p>
      <div className={styles.examples}>
        <Section title="Typography variants">
          <Typography variant="h1">This is an H1 Heading</Typography>
          <Typography variant="h2">This is an H2 Heading</Typography>
          <Typography variant="h3">This is an H3 Heading</Typography>
          <Typography variant="h4">This is an H4 Heading</Typography>
          <Typography variant="h5">This is an H5 Heading</Typography>
          <Typography variant="h6">This is an H6 Heading</Typography>
          <Typography variant="p">This is a Paragraph</Typography>
          <Typography variant="span">This is a Span</Typography>
          <Divider title="With Long text" align="left" />
          <Typography variant="p">
            Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do
            eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim
            ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut
            aliquip ex ea commodo consequat. Duis aute irure dolor in
            reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla
            pariatur.
          </Typography>
          <Divider title="Two lines" align="left" />
          <Typography variant="p" lineNumber={2}>
            Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do
            eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim
            ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut
            aliquip ex ea commodo consequat. Duis aute irure dolor in
            reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla
            pariatur.
          </Typography>
        </Section>
      </div>
    </div>
  );
};

export default TypographyTab;
