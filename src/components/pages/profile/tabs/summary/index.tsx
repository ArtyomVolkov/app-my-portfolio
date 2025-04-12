import React from 'react';

import TechnologyList from '@shared/components/lists/technologies';

import TerminalIcon from '@mui/icons-material/Terminal';
import LibraryBooksIcon from '@mui/icons-material/LibraryBooks';
import BuildIcon from '@mui/icons-material/Build';
import SchoolRoundedIcon from '@mui/icons-material/SchoolRounded';
import LanguageRoundedIcon from '@mui/icons-material/LanguageRounded';
import ContactMailRoundedIcon from '@mui/icons-material/ContactMailRounded';

import { LANGUAGES, TECHNOLOGIES, TOOLS } from '@pages/profile/data';

import UserImage from '@assets/images/a.volkov.png';

import { mergeClassNames } from '@utils/common';

import styles from './style.module.scss';

const Summary = () => {
  return (
    <div className={styles.summaryTab}>
      <div className={mergeClassNames([styles.card, styles.profile])}>
        <img src={UserImage} alt="user-img" className={styles.profileImage} width={250} height={250} />
        <section className={styles.profileInfo}>
          <p className={styles.title}>Artem Volkov</p>
          <p className={styles.subtitle}>Senior FrontEnd Software Engineer</p>
          <span className={styles.description}>
            Software Engineer (11+ years) with vast development experience of web-applications using libs/frameworks
            such as: React, React-Native, Capacitor, Flutter, Angular, AngularJs, BackboneJs.
            <br/>
            Good experience with OOP, FP and GoF's design patterns.
            <br/>
             Experience with Micro FrontEnd infrastructure.
            <br/>
            Familiar with TDD and BDD approaches of development, performance diagnostics of JavaScript code and
            resolution of difficult issues in UI development, process of code review, code quality, estimations
            and work planning.
          </span>
        </section>
      </div>
      <div className={styles.card}>
        <p className={styles.title}>
          <TerminalIcon className={styles.icon} />
          <span>Programming Languages</span>
        </p>
        <TechnologyList data={LANGUAGES} />
      </div>
      <section className={styles.cell2}>
        <div className={styles.card}>
          <p className={styles.title}>
            <LibraryBooksIcon className={styles.icon} />
            <span>Technologies</span>
          </p>
          <TechnologyList data={TECHNOLOGIES} />
        </div>
        <div className={styles.card}>
          <p className={styles.title}>
            <BuildIcon className={styles.icon} />
            <span>Tools</span>
          </p>
          <TechnologyList data={TOOLS} />
        </div>
      </section>
      <section className={styles.cell3}>
        <div className={styles.card}>
          <p className={styles.title}>
            <SchoolRoundedIcon className={styles.icon} />
            <span>Education</span>
          </p>
          <p>M.Sc. in Mechanical Engineering</p>
          <p>Donetsk National Technical University</p>
          <p>Graduated in 2011</p>
        </div>
        <div className={styles.card}>
          <p className={styles.title}>
            <LanguageRoundedIcon className={styles.icon} />
            <span>Languages</span>
          </p>
          <p>English: Upper Intermediate (B2)</p>
          <p>Ukrainian: Native</p>
        </div>
        <div className={styles.card}>
          <p className={styles.title}>
            <ContactMailRoundedIcon className={styles.icon} />
            <span>Contacts</span>
          </p>
          <p>skype: <b className={styles.link}>artyom_volkov_</b></p>
          <p>telegram: <b className={styles.link}>@artem_volkov1989</b></p>
          <p>email: <b className={styles.link}>artyom.volkow@gmail.com</b></p>
        </div>
      </section>
    </div>
  );
}

export default Summary;
