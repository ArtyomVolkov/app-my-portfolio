import React from "react";

import HomeRoundedIcon from "@mui/icons-material/HomeRounded";
import ClassRoundedIcon from "@mui/icons-material/ClassRounded";
import CategoryRoundedIcon from "@mui/icons-material/CategoryRounded";
import AcUnitRoundedIcon from "@mui/icons-material/AcUnitRounded";
import Divider from "@shared/components/ui-kit/divider";

import Breadcrumb from "@shared/components/ui-kit/breadcrumb";
import Section from "@shared/components/section";

import styles from "./style.module.scss";

const MORE_OPTIONS = new Array(3).fill(1).map((_, index) => ({
  label: `Option ${index + 1}`,
  icon: <AcUnitRoundedIcon />,
}));

const BREADCRUMBS = [
  {
    title: "Default",
    icon: false,
    link: false,
  },
  {
    title: "With Icons",
    icon: true,
    link: false,
  },
  {
    title: "With Links",
    icon: true,
    link: true,
  },
  {
    title: "Many Items",
    icon: true,
    link: true,
    more: MORE_OPTIONS,
  },
];

const BreadcrumbTab = () => {
  const handleSelect = (option: any, index: number) => {
    console.log("Selected option:", option, "at index:", index);
  };

  return (
    <div className={styles.TabContent}>
      <h2 className={styles.title}>Breadcrumb</h2>
      <p className={styles.subtitle}>
        A breadcrumb is a navigation element that helps users understand their
        current location within a hierarchy.
      </p>
      <div className={styles.examples}>
        <Section title="Breadcrumb Variants">
          {BREADCRUMBS.map((item) => (
            <article className={styles.article} key={item.title}>
              <Divider title={item.title} align="left" />
              <Breadcrumb
                onSelect={handleSelect}
                options={[
                  {
                    label: "Home",
                    link: item.link && "/",
                    icon: item.icon && <HomeRoundedIcon />,
                  },
                  {
                    label: "Category",
                    link: item.link && "/category",
                    icon: item.icon && <CategoryRoundedIcon />,
                  },
                  {
                    label: "Subcategory",
                    link: item.link && "/category/subcategory",
                    icon: item.icon && <ClassRoundedIcon />,
                  },
                  {
                    label: "Subcategory 1",
                    link: item.link && "/category/subcategory/item",
                    icon: item.icon && <AcUnitRoundedIcon />,
                  },
                  ...(item.more ? item.more : [])
                ]}
              />
            </article>
          ))}
        </Section>
      </div>
    </div>
  );
};

export default BreadcrumbTab;
