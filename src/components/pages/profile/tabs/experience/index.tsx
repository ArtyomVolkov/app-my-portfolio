import React from 'react';

import Divider from '@mui/material/Divider';
import TechnologyList from '@shared/components/lists/technologies';

import { PROJECTS } from '@pages/profile/data';

import './style.scss'

const Experience = () => (
  <div className="projects-tab">
    {
      PROJECTS.map((item, index) => (
        <section className="project-card" key={index}>
          <p className="name">{ item.name }</p>
          <label className="description">{item.description}</label>
          <div className="pill-widget">
            <img
              src={`https://flagcdn.com/w40/${item.countryCode}.png`}
              loading="lazy"
              width={40}
              alt="country"
            />
            <label>{item.period}</label>
          </div>
          <TechnologyList data={item.technologies} />
          <Divider />
          <ul className="responsibilities">
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