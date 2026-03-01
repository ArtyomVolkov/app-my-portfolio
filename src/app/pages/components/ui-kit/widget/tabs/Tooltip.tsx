import Divider from '@shared/components/ui-kit/divider';
import Section from '@shared/components/section';
import Button from '@shared/components/ui-kit/button';
import Tooltip, { type Placement } from '@shared/components/ui-kit/tooltip';

import styles from './style.module.scss';

const LayoutSection = {
  top: ['top-start', 'top-center', 'top-end'],
  bottom: ['bottom-start', 'bottom-center', 'bottom-end'],
  left: ['left-start', 'left-center', 'left-end'],
  right: ['right-start', 'right-center', 'right-end'],
};

const TooltipMessage = 'Tooltip with longer text to test the width of the tooltip.';

const TooltipTab = () => {
  return (
    <div className={styles.TabContent}>
      <h2 className={styles.title}>Tooltip</h2>
      <p className={styles.subtitle}>
        A tooltip is a small, interactive pop-up that provides additional
        information when users hover over or focus on an element.
      </p>
      <div className={styles.examples}>
        <Section title="Tooltip Variants">
          <article className={styles.article}>
            <Divider title="Layout" align="left" />
            <div className={styles.tooltipLayout}>
              <div className={styles.top}>
                {LayoutSection.top.map((position) => (
                  <Tooltip
                    key={position}
                    message={TooltipMessage}
                    placement={position as Placement}
                  >
                    <Button variant="dashed" className={styles.tooltipButton}>
                      {position
                        .replace('-', ' ')
                        .replace(/\b\w/g, (c) => c.toUpperCase())}
                    </Button>
                  </Tooltip>
                ))}
              </div>
              <div className={styles.row}>
                <div className={styles.left}>
                  {LayoutSection.left.map((position) => (
                    <Tooltip
                      key={position}
                      message={TooltipMessage}
                      placement={position as Placement}
                    >
                      <Button variant="dashed" className={styles.tooltipButton}>
                        {position
                          .replace('-', ' ')
                          .replace(/\b\w/g, (c) => c.toUpperCase())}
                      </Button>
                    </Tooltip>
                  ))}
                </div>
                <div className={styles.right}>
                  {LayoutSection.right.map((position) => (
                    <Tooltip
                      key={position}
                      message={TooltipMessage}
                      placement={position as Placement}
                    >
                      <Button variant="dashed" className={styles.tooltipButton}>
                        {position
                          .replace('-', ' ')
                          .replace(/\b\w/g, (c) => c.toUpperCase())}
                      </Button>
                    </Tooltip>
                  ))}
                </div>
              </div>
              <div className={styles.bottom}>
                {LayoutSection.bottom.map((position) => (
                  <Tooltip
                    key={position}
                    message={TooltipMessage}
                    placement={position as Placement}
                  >
                    <Button variant="dashed" className={styles.tooltipButton}>
                      {position
                        .replace('-', ' ')
                        .replace(/\b\w/g, (c) => c.toUpperCase())}
                    </Button>
                  </Tooltip>
                ))}
              </div>
            </div>
          </article>
        </Section>
      </div>
    </div>
  );
};

export default TooltipTab;
