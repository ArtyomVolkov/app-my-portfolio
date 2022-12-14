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

import './style.scss';

const Summary = () => {
  return (
    <div className="summary-tab">
      <div className="card profile">
        <img src={UserImage} alt="user-img" className="profile-image" />
        <section className="profile-info">
          <p className="profile-title">Artem Volkov</p>
          <p className="profile-subtitle">FrontEnd Software Engineer</p>
          <label className="profile-description">
            Software Engineer (7+ years) with vast development experience of web-applications using libs/frameworks
            such as: Backbone, Angular, Angular 2+, React, React-Native, Flutter.
            <br/>
            Good experience with OOP, FP and GOF's design patterns.
            <br/>
            <br/>
            Familiar with TDD and BDD approaches of development, performance diagnostics of JavaScript code and
            resolution of difficult issues in UI development, process of code review, code quality, estimations
            and work planning.
          </label>
        </section>
      </div>
      <div className="card">
        <p className="title">
          <TerminalIcon className="icon" />
          <label>Programming Languages</label>
        </p>
        <div className="list">
          <TechnologyList data={LANGUAGES} />
        </div>
      </div>
      <section className="cell-2">
        <div className="card">
          <p className="title">
            <LibraryBooksIcon className="icon" />
            <label>Technologies</label>
          </p>
          <TechnologyList data={TECHNOLOGIES} />
        </div>
        <div className="card">
          <p className="title">
            <BuildIcon className="icon" />
            <label>Tools</label>
          </p>
          <TechnologyList data={TOOLS} />
        </div>
      </section>
      <section className="cell-3">
        <div className="card">
          <p className="title">
            <SchoolRoundedIcon className="icon" />
            <label>Education</label>
          </p>
          <p>M.Sc. in Mechanical Engineering</p>
          <p>Donetsk National Technical University</p>
          <p>Graduated in 2011</p>
        </div>
        <div className="card">
          <p className="title">
            <LanguageRoundedIcon className="icon" />
            <label>Languages</label>
          </p>
          <p>English: Intermediate+ (B1-B2)</p>
          <p>Ukrainian: Native</p>
        </div>
        <div className="card">
          <p className="title">
            <ContactMailRoundedIcon className="icon" />
            <label>Contacts</label>
          </p>
          <p>skype: <b className="link">artyom_volkov_</b></p>
          <p>telegram: <b className="link">@artem_volkov1989</b></p>
          <p>email: <b className="link">artyom.volkow@gmail.com</b></p>
        </div>
      </section>
    </div>
  );
}

export default Summary;
