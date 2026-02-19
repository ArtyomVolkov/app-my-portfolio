import React from "react";

import Divider from "@shared/components/ui-kit/divider";
import Typography from "@shared/components/ui-kit/typography";
import TechnologyList from "@shared/components/lists/technologies";

import { PROJECTS } from "@pages/profile/data";

import styles from "./style.module.scss";

const Experience = () => (
  <div className={styles.projectsTab}>
    {PROJECTS.map((item, index) => (
      <section className={styles.projectCard} key={index}>
        <Typography className={styles.name}>{item.name}</Typography>
        <Typography variant="p" className={styles.description} lineBreak>
          {item.description}
        </Typography>
        <div className={styles.pillWidget}>
          <img
            src={`https://flagcdn.com/w40/${item.countryCode}.png`}
            loading="lazy"
            width={40}
            alt="country"
          />
          <span>{item.period}</span>
        </div>
        <Divider align="left" title="Technologies and Tools" />
        <TechnologyList
          data={item.technologies}
          className={styles.technologyList}
        />
        <Divider align="left" title="Responsibilities" />
        <ul className={styles.responsibilities}>
          {item.responsibilities.map((item, index) => (
            <li key={index}>{item}</li>
          ))}
        </ul>
      </section>
    ))}
  </div>
);

export default Experience;
