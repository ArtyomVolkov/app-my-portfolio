import React from "react";

import TechnologyList from "@shared/components/lists/technologies";

import TerminalIcon from "@mui/icons-material/Terminal";
import LibraryBooksIcon from "@mui/icons-material/LibraryBooks";
import BuildIcon from "@mui/icons-material/Build";
import SchoolRoundedIcon from "@mui/icons-material/SchoolRounded";
import LanguageRoundedIcon from "@mui/icons-material/LanguageRounded";
import ContactMailRoundedIcon from "@mui/icons-material/ContactMailRounded";
import ScrollView from "@shared/components/ui-kit/scroll-view";

import { LANGUAGES, TECHNOLOGIES, TOOLS } from "@pages/profile/data";

import UserImage from "@assets/images/profile-image.png";

import { mergeClassNames } from "@utils/common";

import styles from "./style.module.scss";

const Summary = () => {
  return (
    <div className={styles.summaryTab}>
      <div className={mergeClassNames([styles.card, styles.profile])}>
        <img
          src={UserImage}
          alt="user-img"
          className={styles.profileImage}
          width={250}
          height={250}
        />
        <ScrollView classes={{ content: styles.profileInfo }}>
          <p className={styles.title}>Artem Volkov</p>
          <p className={styles.subtitle}>Senior FrontEnd Software Engineer</p>
          <span className={styles.description}>
            Software Engineer (13+ years) with vast development experience of
            web applications using libs/frameworks such as: Node, Next, Next,
            React, ReactNative, Capacitor, Flutter, Angular, AngularJS,
            BackboneJS.
            <br />
            <br />
            I have experience in the backend, particularly in delivering REST
            API services and working with databases such as MongoDB and
            PostgreSQL.
            <br />
            Good experience with OOP, FP, and GoF's design patterns.
            <br />
            <br />
            Experience with Micro FrontEnd infrastructure. Knowledgeable about
            TDD and BDD development methods, performance diagnostics for
            JavaScript code, and handling complicated issues in UI development.
            Knowledgeable about the process of code review, code quality,
            estimations, and work planning.
            <br />
            <br />I have experience in leading teams of 2-5 people, mentoring
            junior developers, and conducting technical interviews.
            <br />
            <br />
            Experience with the enhancements made to Core Web Vitals metrics,
            such as LCP, FID, and CLS, and optimizing web applications to
            improve these metrics.
          </span>
        </ScrollView>
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
          <p>English: Upper Intermediate (B2+)</p>
          <p>Ukrainian: Native</p>
        </div>
        <div className={styles.card}>
          <p className={styles.title}>
            <ContactMailRoundedIcon className={styles.icon} />
            <span>Social and Contact</span>
          </p>
          <div className={styles.row}>
            <a
              target="_blank"
              rel="noopener noreferrer"
              href="https://leetcode.com/u/artyomvolkov/"
              className={styles.link}
            >
              #LeetCode
            </a>
            <a
              target="_blank"
              rel="noopener noreferrer"
              href="https://www.hackerrank.com/profile/artyom_volkow"
              className={styles.link}
            >
              #HackerRank
            </a>
            <a
              target="_blank"
              rel="noopener noreferrer"
              href="https://www.codewars.com/users/Artem.Volkov"
              className={styles.link}
            >
              #Codewars
            </a>
            <a
              target="_blank"
              rel="noopener noreferrer"
              href="https://www.linkedin.com/in/artem-volkov-909373109/"
              className={styles.link}
            >
              #LinkedIn
            </a>
            <a
              target="_blank"
              rel="noopener noreferrer"
              href="https://github.com/ArtyomVolkov"
              className={styles.link}
            >
              #GitHub
            </a>
            <a
              href="mailto:artyom.volkow@gmail.com"
              target="_blank"
              rel="noopener noreferrer"
              className={styles.link}
            >
              #Email
            </a>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Summary;
