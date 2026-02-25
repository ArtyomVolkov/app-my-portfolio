import Divider from '@shared/components/ui-kit/divider';
import Section from '@shared/components/section';

import styles from './style.module.scss';

const DividerTab = () => {
  return (
    <div className={styles.TabContent}>
      <h2 className={styles.title}>Divider</h2>
      <p className={styles.subtitle}>
        A divider is a visual element that separates content within a layout.
      </p>
      <div className={styles.examples}>
        <Section title="Divider Variants">
          <article className={styles.article}>
            <Divider />
            <span>
              Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed nonne
              merninisti licere mihi ista probare, quae sunt a te dicta? Refert
              tamen, quo modo.
            </span>
            <Divider title="Divider with Title" />
            <span>
              Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed nonne
              merninisti licere mihi ista probare, quae sunt a te dicta? Refert
              tamen, quo modo.
            </span>
            <Divider title="Right Aligned Title" align="right" />
            <span>
              Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed nonne
              merninisti licere mihi ista probare, quae sunt a te dicta? Refert
              tamen, quo modo.
            </span>
            <Divider title="Left Aligned Title" align="left" />
            <span>
              Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed nonne
              merninisti licere mihi ista probare, quae sunt a te dicta? Refert
              tamen, quo modo.
            </span>
            <Divider title="height 8px" height={8} />
            <Divider title="Dashed style" height={5} borderStyle="dashed" />
            <Divider title="Dotted style" height={5} borderStyle="dotted" />
          </article>
        </Section>
      </div>
    </div>
  );
};

export default DividerTab;
