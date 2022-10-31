interface ItemType  {
  key: string,
  label: string,
}

interface Tools extends ItemType {
  link?: string,
}

interface Language extends ItemType {
  prefix?: string,
  color?: string | any
}

export const TOOLS: Array<Tools> = [
  {
    key: 'npm',
    label: 'NPM',
    link: '',
  },
  {
    key: 'git',
    label: 'GIT',
    link: '',
  },
  {
    key: 'webpack',
    label: 'Webpack',
    link: '',
  },
  {
    key: 'webstorm',
    label: 'WebStorm IDEA',
    link: '',
  },
  {
    key: 'firebase',
    label: 'Firebase',
    link: '',
  },
  {
    key: 'sonar',
    label: 'Sonar',
    link: '',
  },
  {
    key: 'gla',
    label: 'Google Lighthouse audit',
    link: '',
  },
  {
    key: 'zeplin',
    label: 'Zeplin',
    link: '',
  },
  {
    key: 'figma',
    label: 'Figma',
    link: '',
  },
  {
    key: 'jenkins',
    label: 'Jenkins',
    link: '',
  },
  {
    key: 'aws',
    label: 'AWS',
    link: '',
  },
  {
    key: 'jira',
    label: 'JIRA',
    link: '',
  },
  {
    key: 'azure',
    label: 'Azure',
    link: '',
  },
];

export const LANGUAGES: Array<Language> = [
  {
    key: 'javascript',
    prefix: 'JS',
    label: 'JavaScript',
    color: 'primary',
  },
  {
    key: 'typescript',
    prefix: 'TS',
    label: 'TypeScript',
    color: 'primary',
  },
  {
    key: 'dart',
    prefix: 'D',
    label: 'Dart',
    color: 'secondary',
  },
  {
    key: 'java',
    prefix: 'J',
    label: 'Java (core)',
    color: 'secondary',
  },
];

export const TECHNOLOGIES: Array<ItemType> = [
  {
    key: 'node',
    label: 'Node',
  },
  {
    key: 'express',
    label: 'Express',
  },
  {
    key: 'db',
    label: 'MySQL, PostgreSQL, Mongo',
  },
  {
    key: 'ws',
    label: 'Web-storages',
  },
  {
    key: 'rest-graph',
    label: 'Rest API, GRAPH QL',
  },
  {
    key: 'html/css',
    label: 'HTML5, CSS3',
  },
  {
    key: 'react',
    label: 'React, ReactNative',
  },
  {
    key: 'flutter',
    label: 'Flutter',
  },
  {
    key: 'angular',
    label: 'Angular 2+',
  },
  {
    key: 'ui-components-lib',
    label: 'Material UI, Semantic UI, Kendo UI',
  },
  {
    key: 'bootstrap',
    label: 'Bootstrap',
  },
  {
    key: 'oop-fp',
    label: 'OOP, FP',
  },
  {
    key: 'tests-approach',
    label: 'TDD, BDD',
  },
  {
    key: 'jest',
    label: 'Jest',
  },
  {
    key: 'data-managers',
    label: 'Redux, MobX',
  },
  {
    key: 'lodash',
    label: 'Lodash',
  },
  {
    key: 'visual-data',
    label: 'SVG, D3js, Canvas',
  },
  {
    key: 'ww',
    label: 'Web Worker',
  },
  {
    key: 'sw',
    label: 'Service Worker',
  },
  {
    key: 'jsdoc',
    label: 'JSDoc',
  },
  {
    key: 'agile',
    label: 'Scrum, Kanban, Lean, Extreme programming',
  },
];
