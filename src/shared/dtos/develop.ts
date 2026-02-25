import { Development, Language as ELanguage, Technology as ETechnology, Tool as ETool } from '@shared/enums/develop';

export type TechnologyType = 
  typeof Development.PL | 
  typeof Development.TOOL | 
  typeof Development.TECHNOLOGY;

export interface ITechnology {
  id: string;
  type: TechnologyType;
  label: string;
  prefix?: string;
  name?: string;
  link?: string;
}

export const Languages: { [key: string]: ITechnology } = {
  javascript: {
    id: ELanguage.JAVASCRIPT,
    prefix: 'JS',
    label: 'JavaScript',
    type: Development.PL,
  },
  typescript: {
    id: ELanguage.TYPESCRIPT,
    prefix: 'TS',
    label: 'TypeScript',
    type: Development.PL,
  },
  dart: {
    id: ELanguage.DART,
    prefix: 'D',
    label: 'Dart',
    type: Development.PL
  },
  java: {
    id: ELanguage.JAVA,
    prefix: 'J',
    label: 'Java (core)',
    type: Development.PL
  },
  objectiveC: {
    id: ELanguage.OBJECTIVE_C,
    prefix: 'OC',
    label: 'Objective C',
    type: Development.PL
  },
  python: {
    id: ELanguage.PYTHON,
    prefix: 'PY',
    label: 'Python',
    type: Development.PL
  }
};

export const Tools: { [key: string]: ITechnology } = {
  npm: {
    id: ETool.NPM,
    label: 'Npm',
    link: '',
    type: Development.TOOL,
  },
  git: {
    id: ETool.GIT,
    label: 'Git',
    link: '',
    type: Development.TOOL,
  },
  docker: {
    id: ETool.DOCKER,
    label: 'Docker',
    link: '',
    type: Development.TOOL,
  },
  webpack: {
    id: ETool.WEBPACK,
    label: 'Webpack',
    link: '',
    type: Development.TOOL,
  },
  vite: {
    id: ETool.VITE,
    label: 'Vite',
    link: '',
    type: Development.TOOL,
  },
  grunt: {
    id: ETool.GRUNT,
    label: 'Grunt',
    link: '',
    type: Development.TOOL,
  },
  webstorm: {
    id: ETool.WEBSTORM_IDEA,
    label: 'WebStorm IDEA',
    link: '',
    type: Development.TOOL,
  },
  [ETool.XCODE]: {
    id: ETool.XCODE,
    label: 'Xcode',
    link: '',
    type: Development.TOOL,
  },
  [ETool.ANDROID_STUDIO]: {
    id: ETool.ANDROID_STUDIO,
    label: 'Android Studio',
    link: '',
    type: Development.TOOL,
  },
  [ETool.FIREBASE]: {
    id: ETool.FIREBASE,
    label: 'Firebase',
    link: '',
    type: Development.TOOL,
  },
  sonar: {
    id: ETool.SONAR,
    label: 'Sonar',
    link: '',
    type: Development.TOOL,
  },
  gla: {
    id: ETool.GLA,
    label: 'Google Lighthouse audit',
    link: '',
    type: Development.TOOL,
  },
  zeplin: {
    id: ETool.ZEPLIN,
    label: 'Zeplin',
    link: '',
    type: Development.TOOL,
  },
  figma: {
    id: ETool.FIGMA,
    label: 'Figma',
    link: '',
    type: Development.TOOL,
  },
  jenkins: {
    id: ETool.JENKINS,
    label: 'Jenkins',
    link: '',
    type: Development.TOOL,
  },
  aws: {
    id: ETool.AWS,
    label: 'AWS',
    link: '',
    type: Development.TOOL,
  },
  jasper: {
    id: ETool.JASPER,
    label: 'Jasper Reports',
    link: '',
    type: Development.TOOL,
  },
  jira: {
    id: ETool.JIRA,
    label: 'JIRA',
    link: '',
    type: Development.TOOL,
  },
  azure: {
    id: ETool.AZURE,
    label: 'Azure',
    link: '',
    type: Development.TOOL,
  },
  VSCode: {
    id: ETool.VS_CODE,
    label: 'VS Code',
    link: '',
    type: Development.TOOL,
  }
};

export const Technologies: { [key: string]: ITechnology } = {
  node: {
    id: ETechnology.NODE,
    label: 'Node',
    type: Development.TECHNOLOGY
  },
  express: {
    id: ETechnology.EXPRESS,
    label: 'Express',
    type: Development.TECHNOLOGY
  },
  mysql: {
    id: ETechnology.MYSQL,
    label: 'MySQL',
    type: Development.TECHNOLOGY
  },
  postgresql: {
    id: ETechnology.POSTGRESQL,
    label: 'PostgreSQL',
    type: Development.TECHNOLOGY
  },
  mongo: {
    id: ETechnology.MONGO,
    label: 'Mongo',
    type: Development.TECHNOLOGY
  },
  webStorages: {
    id: ETechnology.WEB_STORAGES,
    label: 'Web-storages',
    type: Development.TECHNOLOGY
  },
  rest: {
    id: ETechnology.REST,
    label: 'Rest API',
    type: Development.TECHNOLOGY
  },
  graphql: {
    id: ETechnology.GRAPHQL,
    label: 'GraphQL',
    type: Development.TECHNOLOGY
  },
  html: {
    id: ETechnology.HTML,
    label: 'HTML5',
    type: Development.TECHNOLOGY
  },
  css: {
    id: ETechnology.CSS,
    label: 'CSS3',
    type: Development.TECHNOLOGY
  },
  react: {
    id: ETechnology.REACT,
    label: 'React',
    type: Development.TECHNOLOGY
  },
  reactContext: {
    id: ETechnology.REACT_CONTEXT,
    label: 'React Context',
    type: Development.TECHNOLOGY
  },
  reactNative: {
    id: ETechnology.REACT_NATIVE,
    label: 'React Native',
    type: Development.TECHNOLOGY
  },
  flutter: {
    id: ETechnology.FLUTTER,
    label: 'Flutter',
    type: Development.TECHNOLOGY
  },
  [ETechnology.CAPACITOR]: {
    id: ETechnology.CAPACITOR,
    label: 'Capacitor',
    type: Development.TECHNOLOGY
  },
  [ETechnology.MICRO_FRONT_END]: {
    id: ETechnology.MICRO_FRONT_END,
    label: 'Micro Front-End',
    type: Development.TECHNOLOGY
  },
  angular: {
    id: ETechnology.ANGULAR,
    label: 'Angular2+',
    type: Development.TECHNOLOGY
  },
  angularjs: {
    id: ETechnology.ANGULARJS,
    label: 'Angular.js',
    type: Development.TECHNOLOGY
  },
  backbone: {
    id: ETechnology.BACKBONE,
    label: 'Backbone',
    type: Development.TECHNOLOGY
  },
  jquery: {
    id: ETechnology.JQUERY,
    label: 'jQuery',
    type: Development.TECHNOLOGY
  },
  materialUI: {
    id: ETechnology.MATERIAL_UI,
    label: 'Material UI',
    type: Development.TECHNOLOGY
  },
  antDesign: {
    id: ETechnology.ANT_DESIGN,
    label: 'Ant Design',
    type: Development.TECHNOLOGY
  },
  semanticUI: {
    id: ETechnology.SEMANTIC_UI,
    label: 'Semantic UI',
    type: Development.TECHNOLOGY
  },
  kendoUI: {
    id: ETechnology.KENDO_UI,
    label: 'Kendo UI',
    type: Development.TECHNOLOGY
  },
  bootstrap: {
    id: ETechnology.BOOTSTRAP,
    label: 'Bootstrap',
    type: Development.TECHNOLOGY
  },
  styledComponents: {
    id: ETechnology.STYLED,
    label: 'Styled Components',
    type: Development.TECHNOLOGY
  },
  oop: {
    id: ETechnology.OOP,
    label: 'OOP',
    type: Development.TECHNOLOGY
  },
  fp: {
    id: ETechnology.FP,
    label: 'FP',
    type: Development.TECHNOLOGY
  },
  tdd: {
    id: ETechnology.TDD,
    label: 'TDD',
    type: Development.TECHNOLOGY
  },
  bdd: {
    id: ETechnology.BDD,
    label: 'BDD',
    type: Development.TECHNOLOGY
  },
  redux: {
    id: ETechnology.REDUX,
    label: 'Redux',
    type: Development.TECHNOLOGY
  },
  zustand: {
    id: ETechnology.ZUSTAND,
    label: 'Zustand',
    type: Development.TECHNOLOGY
  },
  mobx: {
    id: ETechnology.MOBX,
    label: 'MobX',
    type: Development.TECHNOLOGY
  },
  rxjs: {
    id: ETechnology.RXJS,
    label: 'RxJS',
    type: Development.TECHNOLOGY
  },
  googleMaps: {
    id: ETechnology.GOOGLE_MAPS,
    label: 'Google Maps',
    type: Development.TECHNOLOGY
  },
  jest: {
    id: ETechnology.JEST,
    label: 'Jest',
    type: Development.TECHNOLOGY
  },
  cypress: {
    id: ETechnology.CYPRESS,
    label: 'Cypress',
    type: Development.TECHNOLOGY
  },
  detox: {
    id: ETechnology.DETOX,
    label: 'Detox',
    type: Development.TECHNOLOGY
  },
  jasmine: {
    id: ETechnology.JASMINE,
    label: 'Jasmine',
    type: Development.TECHNOLOGY
  },
  lodash: {
    id: ETechnology.LODASH,
    label: 'Lodash',
    type: Development.TECHNOLOGY
  },
  cryptoJS: {
    id: ETechnology.CRYPTO_JS,
    label: 'Crypto JS',
    type: Development.TECHNOLOGY
  },
  svg: {
    id: ETechnology.SVG,
    label: 'SVG',
    type: Development.TECHNOLOGY
  },
  d3js: {
    id: ETechnology.D3JS,
    label: 'D3js',
    type: Development.TECHNOLOGY
  },
  canvas: {
    id: ETechnology.CANVAS,
    label: 'Canvas',
    type: Development.TECHNOLOGY
  },
  webSocket: {
    id: ETechnology.WEB_SOCKET,
    label: 'Web Socket',
    type: Development.TECHNOLOGY
  },
  webWorker: {
    id: ETechnology.WEB_WORKER,
    label: 'Web Worker',
    type: Development.TECHNOLOGY
  },
  serviceWorker: {
    id: ETechnology.SERVICE_WORKER,
    label: 'Service Worker',
    type: Development.TECHNOLOGY
  },
  jsdoc: {
    id: ETechnology.JSDOC,
    label: 'JsDoc',
    type: Development.TECHNOLOGY
  },
  scrum: {
    id: ETechnology.SCRUM,
    label: 'Scrum',
    type: Development.TECHNOLOGY
  },
  kanban: {
    id: ETechnology.KANBAN,
    label: 'Kanban',
    type: Development.TECHNOLOGY
  },
  lean: {
    id: ETechnology.LEAN,
    label: 'Lean',
    type: Development.TECHNOLOGY
  },
  exp: {
    id: ETechnology.EXP,
    label: 'Extreme Programming',
    type: Development.TECHNOLOGY
  },
  pexels: {
    id: ETechnology.PEXELS,
    label: 'Pexels (api)',
    type: Development.TECHNOLOGY
  }
}
