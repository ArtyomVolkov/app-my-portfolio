import React from 'react';

import Card from '@mui/material/Card';
import Chip from '@mui/material/Chip';
import Avatar from '@mui/material/Avatar';

import TerminalIcon from '@mui/icons-material/Terminal';
import LibraryBooksIcon from '@mui/icons-material/LibraryBooks';
import BuildIcon from '@mui/icons-material/Build';

import { LANGUAGES, TECHNOLOGIES, TOOLS } from '@pages/profile/data';

import UserImage from '@assets/images/a.volkov.png';

import './style.scss';

const Summary = () => {
  return (
    <div className="summary-tab">
      <Card className="card profile"  variant="outlined">
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
      </Card>
      <Card className="card">
        <p className="title">
          <TerminalIcon className="icon" />
          <label>Programming Languages</label>
        </p>
        <div className="list">
          {
            LANGUAGES.map((item) => (
              <Chip
                key={item.key}
                color={item.color}
                avatar={<Avatar>{item.prefix}</Avatar>}
                label={item.label}
                variant="outlined"
              />
            ))
          }
        </div>
      </Card>
      <section className="tools-technologies">
        <Card className="card">
          <p className="title">
            <LibraryBooksIcon className="icon" />
            <label>Technologies</label>
          </p>
          <div className="list">
            {
              TECHNOLOGIES.map((item) => (
                <Chip
                  key={item.key}
                  label={item.label}
                  size="small"
                  variant="outlined"
                />
              ))
            }
          </div>
        </Card>
        <Card className="card">
          <p className="title">
            <BuildIcon className="icon" />
            <label>Tools</label>
          </p>
          <div className="list">
            {
              TOOLS.map((item) => (
                <Chip
                  key={item.key}
                  label={item.label}
                  size="small"
                  variant="outlined"
                />
              ))
            }
          </div>
        </Card>
      </section>
    </div>
  );
}

export default Summary;
