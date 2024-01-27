import React from 'react';

import Divider from '@mui/material/Divider';
import TechnologyList from '@shared/components/lists/technologies';

import { PROJECTS } from '@pages/profile/data';

import styles from './style.module.scss';

const Experience = () => (
  <div className={styles.projectsTab}>
    {
      PROJECTS.map((item, index) => (
        <section className={styles.projectCard} key={index}>
          <p className={styles.name}>{ item.name }</p>
          <span className={styles.description}>{item.description}</span>
          <div className={styles.pillWidget}>
            <img
              src={`https://flagcdn.com/w40/${item.countryCode}.png`}
              loading="lazy"
              width={40}
              alt="country"
            />
            <span>{item.period}</span>
          </div>
          <TechnologyList data={item.technologies} className={styles.technologyList} />
          <Divider />
          <ul className={styles.responsibilities}>
            {
              item.responsibilities.map((item, index) => (
                <li key={index}>{item}</li>
              ))
            }
          </ul>
        </section>
      ))
    }
  </div>
);

export default Experience;