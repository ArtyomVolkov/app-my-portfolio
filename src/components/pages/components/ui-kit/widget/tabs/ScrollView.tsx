import React, { useEffect, useState } from "react";

import Divider from "@shared/components/ui-kit/divider";
import ScrollView from "@shared/components/ui-kit/scroll-view";
import Section from "@shared/components/section";

import { getLoremIpsum } from "@shared/api/commons";

import styles from "./style.module.scss";

const ScrollViewTab = () => {
  const [loading, setLoading] = useState(true);
  const [data, setData] = useState<string[]>([]);

  useEffect(() => {
    const fetchData = async () => {
      const resp = await getLoremIpsum(5);
      setData(resp);
      setLoading(false);
    };
    fetchData();
  }, []);

  console.log(data);

  return (
    <div className={styles.TabContent}>
      <h2 className={styles.title}>Scroll View</h2>
      <p className={styles.subtitle}>
        A scroll view is a container that allows users to scroll through content
        that overflows the visible area.
      </p>
      <div className={styles.examples}>
        <Section title="Scroll View Variants">
          <article className={styles.article}>
            <Divider title="Vertical" align="left" />
            <ScrollView className={styles.verticalScrollView}>
              {loading ? (
                <p>Loading...</p>
              ) : (
                data.map((paragraph, index) => <p key={index}>{paragraph}</p>)
              )}
            </ScrollView>
            <Divider title="Horizontal" align="left" />
            {/* <ScrollView horizontal>
              <span>
                Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed
                nonne merninisti licere mihi ista probare, quae sunt a te dicta?
                Refert tamen, quo modo.
              </span>
            </ScrollView> */}
          </article>
        </Section>
      </div>
    </div>
  );
};

export default ScrollViewTab;
