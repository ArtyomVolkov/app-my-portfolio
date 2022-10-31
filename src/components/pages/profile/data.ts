interface Technology  {
  key: string,
  label: string,
}

interface Tool extends Technology {
  link?: string,
}

interface Language extends Technology {
  prefix?: string,
  color?: string | any
}

interface Project {
  name: string,
  description: string,
  technologies: Array<Tool|Language|Technology>,
  responsibilities: Array<string>,
  countryCode: string,
  period: string,
}

export const TOOLS: Array<Tool> = [
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

export const TECHNOLOGIES: Array<Technology> = [
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
    key: 'socket',
    label: 'Web Socket',
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

export const PROJECTS: Array<Project> = [
  {
    name: 'Wineshipping',
    description: `The most comprehensive alcohol logistics network in the U.S. Fast and reliable service, warehouses near your customers, personalized support, and the innovative technology that powers our network…`,
    technologies: [
      {
        key: 'typescript',
        prefix: 'TS',
        label: 'TypeScript',
        color: 'primary',
      },
      {
        key: 'react',
        label: 'React',
      },
      {
        key: 'redux',
        label: 'Redux',
      },
      {
        key: 'webpack',
        label: 'Webpack',
        link: '',
      },
      {
        key: 'socket',
        label: 'Web Socket',
      },
      {
        key: 'material-ui',
        label: 'Material UI',
      },
      {
        key: 'visual-data',
        label: 'SVG',
      },
      {
        key: 'lodash',
        label: 'Lodash',
      },
      {
        key: 'jest',
        label: 'Jest',
      },
      {
        key: 'figma',
        label: 'Figma',
        link: '',
      },
      {
        key: 'azure',
        label: 'Azure',
        link: '',
      },
    ],
    responsibilities: [
      'Develop, manage application pages, UI components, animations, optimization',
      'Conduct regular code reviews to improve code quality.',
      'Collaborate with BA on defining User Stories',
      'Mentoring of junior developer',
      'Lighthouse optimization',
      'Bug fixing'
    ],
    countryCode: 'us',
    period: '10 months'
  },
  {
    name: 'goScore',
    description: `goScore is an app built with both NFL fans and bettors in mind, though the app's main market is those who would place a bet on a game but don't know how to or aren't aware of exactly what's on offer to them. With attractive visuals and unique data manipulations, goScore's selection of tools offers an insight into the game that can't be found elsewhere.`,
    technologies: [
      {
        key: 'typescript',
        prefix: 'TS',
        label: 'TypeScript',
        color: 'primary',
      },
      {
        key: 'objective-c',
        prefix: 'OC',
        label: 'ObjectiveC',
        color: 'secondary',
      },
      {
        key: 'react-native',
        label: 'ReactNative',
      },
      {
        key: 'redux',
        label: 'Redux',
      },
      {
        key: 'socket',
        label: 'Web Socket',
      },
      {
        key: 'visual-data',
        label: 'SVG',
      },
      {
        key: 'crypto-js',
        label: 'CryptoJS',
      },
      {
        key: 'gm',
        label: 'Google Maps',
      },
      {
        key: 'lodash',
        label: 'Lodash',
      },
      {
        key: 'zeplin',
        label: 'Zeplin',
        link: '',
      },
      {
        key: 'jira',
        label: 'JIRA',
        link: '',
      },
    ],
    responsibilities: [
      'Develop, manage application pages, UI components, animations, optimization, analytics',
      'Conduct regular code reviews to improve code quality.',
      'Collaborate with Product Owners on defining User Stories for team',
      'Provide regular build to App Store, Google Play (TestFlight updates).',
      'Implementation of non standard animation transitions, interpolations.',
      'Huge optimization of component rendering model, performance analysis.',
      'Bug fixing'
    ],
    countryCode: 'gb',
    period: '2 years'
  },
  {
    name: 'Colligo',
    description: 'A healthcare company which collaborates with a wide range of occupational categories in healthcare and specialize in nursing and medical care.',
    technologies: [
      {
        key: 'javascript',
        prefix: 'JS',
        label: 'JavaScript',
        color: 'primary',
      },
      {
        key: 'react',
        label: 'React',
      },
      {
        key: 'redux',
        label: 'Redux',
      },
      {
        key: 'webpack',
        label: 'Webpack',
        link: '',
      },
      {
        key: 'aws',
        label: 'AWS',
        link: '',
      },
      {
        key: 'material-ui',
        label: 'Material UI',
      },
      {
        key: 'gm',
        label: 'Google Maps',
      },
      {
        key: 'zeplin',
        label: 'Zeplin',
        link: '',
      },
      {
        key: 'jira',
        label: 'JIRA',
        link: '',
      },
    ],
    responsibilities: [
      'SPA, Application architecture design, developing UI components (Component model  React + Redux), Unit tests',
      'Collaboration with the customer, improvements and suggestions',
      'Integration with other REST API services: (Google APIs)',
      'Lighthouse optimization',
      'Bug-fixing'
    ],
    countryCode: 'se',
    period: '11 months'
  },
  {
    name: 'Think Research Corporation',
    description: 'Healthcare Software Company developing knowledge-based tools that empower clinicians to deliver the best evidence-based care to patients, driving better patient outcomes.',
    technologies: [
      {
        key: 'javascript',
        prefix: 'JS',
        label: 'JavaScript',
        color: 'primary',
      },
      {
        key: 'react',
        label: 'React',
      },
      {
        key: 'redux',
        label: 'Redux',
      },
      {
        key: 'webpack',
        label: 'Webpack',
        link: '',
      },
      {
        key: 'semantic-ui',
        label: 'Semantic UI',
      },
      {
        key: 'styled-c',
        label: 'Styled Components',
      },
      {
        key: 'jest',
        label: 'Jest',
      },
      {
        key: 'gm',
        label: 'Google Maps',
      },
      {
        key: 'zeplin',
        label: 'Zeplin',
        link: '',
      },
      {
        key: 'jira',
        label: 'JIRA',
        link: '',
      },
    ],
    responsibilities: [
      'Development of graphical interfaces',
      'Task estimation',
      'Conduct regular code reviews to improve code quality.',
      'Code refactoring and optimization',
      'Writing unit test',
      'Bug-fixing'
    ],
    countryCode: 'ca',
    period: '7 months'
  }
];

