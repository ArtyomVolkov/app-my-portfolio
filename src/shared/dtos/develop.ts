import { Development, Language as ELanguage, Technology as ETechnology, Tool as ETool } from '@shared/enums/develop';
import { Language as ILanguage, Technology as ITechnology, Tool as ITool } from '@shared/interfaces/develop';

export const Languages: { [key in ELanguage]: ILanguage } = {
  javascript: {
    key: ELanguage.JAVASCRIPT,
    prefix: 'JS',
    label: 'JavaScript',
    type: Development.PL,
  },
  typescript: {
    key: ELanguage.TYPESCRIPT,
    prefix: 'TS',
    label: 'TypeScript',
    type: Development.PL,
  },
  dart: {
    key: ELanguage.DART,
    prefix: 'D',
    label: 'Dart',
    type: Development.PL
  },
  java: {
    key: ELanguage.JAVA,
    prefix: 'J',
    label: 'Java (core)',
    type: Development.PL
  },
  objectiveC: {
    key: ELanguage.OBJECTIVE_C,
    prefix: 'OC',
    label: 'Objective C',
    type: Development.PL
  }
};

export const Tools: { [key in ETool]: ITool } = {
  npm: {
    key: ETool.NPM,
    label: 'Npm',
    link: '',
    type: Development.TOOL,
  },
  git: {
    key: ETool.GIT,
    label: 'Git',
    link: '',
    type: Development.TOOL,
  },
  docker: {
    key: ETool.DOCKER,
    label: 'Docker',
    link: '',
    type: Development.TOOL,
  },
  webpack: {
    key: ETool.WEBPACK,
    label: 'Webpack',
    link: '',
    type: Development.TOOL,
  },
  grunt: {
    key: ETool.GRUNT,
    label: 'Grunt',
    link: '',
    type: Development.TOOL,
  },
  webstorm: {
    key: ETool.WEBSTORM_IDEA,
    label: 'WebStorm IDEA',
    link: '',
    type: Development.TOOL,
  },
  [ETool.XCODE] : {
    key: ETool.XCODE,
    label: 'Xcode',
    link: '',
    type: Development.TOOL,
  },
  [ETool.ANDROID_STUDIO] : {
    key: ETool.ANDROID_STUDIO,
    label: 'Android Studio',
    link: '',
    type: Development.TOOL,
  },
  firebase: {
    key: ETool.FIREBASE,
    label: 'Firebase',
    link: '',
    type: Development.TOOL,
  },
  sonar: {
    key: ETool.SONAR,
    label: 'Sonar',
    link: '',
    type: Development.TOOL,
  },
  gla: {
    key: ETool.GLA,
    label: 'Google Lighthouse audit',
    link: '',
    type: Development.TOOL,
  },
  zeplin: {
    key: ETool.ZEPLIN,
    label: 'Zeplin',
    link: '',
    type: Development.TOOL,
  },
  figma: {
    key: ETool.FIGMA,
    label: 'Figma',
    link: '',
    type: Development.TOOL,
  },
  jenkins: {
    key: ETool.JENKINS,
    label: 'Jenkins',
    link: '',
    type: Development.TOOL,
  },
  aws: {
    key: ETool.AWS,
    label: 'AWS',
    link: '',
    type: Development.TOOL,
  },
  jasper: {
    key: ETool.JASPER,
    label: 'Jasper Reports',
    link: '',
    type: Development.TOOL,
  },
  jira: {
    key: ETool.JIRA,
    label: 'JIRA',
    link: '',
    type: Development.TOOL,
  },
  azure: {
    key: ETool.AZURE,
    label: 'Azure',
    link: '',
    type: Development.TOOL,
  },
};

export const Technologies: {[key in ETechnology]: ITechnology } = {
  node: {
    key: ETechnology.NODE,
    label: 'Node',
    type: Development.TECHNOLOGY
  },
  express: {
    key: ETechnology.EXPRESS,
    label: 'Express',
    type: Development.TECHNOLOGY
  },
  mysql: {
    key: ETechnology.MYSQL,
    label: 'MySQL',
    type: Development.TECHNOLOGY
  },
  postgresql: {
    key: ETechnology.POSTGRESQL,
    label: 'PostgreSQL',
    type: Development.TECHNOLOGY
  },
  mongo: {
    key: ETechnology.MONGO,
    label: 'Mongo',
    type: Development.TECHNOLOGY
  },
  webStorages: {
    key: ETechnology.WEB_STORAGES,
    label: 'Web-storages',
    type: Development.TECHNOLOGY
  },
  rest: {
    key: ETechnology.REST,
    label: 'Rest API',
    type: Development.TECHNOLOGY
  },
  graphql: {
    key: ETechnology.GRAPHQL,
    label: 'GraphQL',
    type: Development.TECHNOLOGY
  },
  html: {
    key: ETechnology.HTML,
    label: 'HTML5',
    type: Development.TECHNOLOGY
  },
  css: {
    key: ETechnology.CSS,
    label: 'CSS3',
    type: Development.TECHNOLOGY
  },
  react: {
    key: ETechnology.REACT,
    label: 'React',
    type: Development.TECHNOLOGY
  },
  reactContext: {
    key: ETechnology.REACT_CONTEXT,
    label: 'React Context',
    type: Development.TECHNOLOGY
  },
  reactNative: {
    key: ETechnology.REACT_NATIVE,
    label: 'React Native',
    type: Development.TECHNOLOGY
  },
  flutter: {
    key: ETechnology.FLUTTER,
    label: 'Flutter',
    type: Development.TECHNOLOGY
  },
  [ETechnology.CAPACITOR]: {
    key: ETechnology.CAPACITOR,
    label: 'Capacitor',
    type: Development.TECHNOLOGY
  },
  [ETechnology.MICRO_FRONT_END]: {
    key: ETechnology.MICRO_FRONT_END,
    label: 'Micro Front-End',
    type: Development.TECHNOLOGY
  },
  angular: {
    key: ETechnology.ANGULAR,
    label: 'Angular2+',
    type: Development.TECHNOLOGY
  },
  angularjs: {
    key: ETechnology.ANGULARJS,
    label: 'Angular.js',
    type: Development.TECHNOLOGY
  },
  backbone: {
    key: ETechnology.BACKBONE,
    label: 'Backbone',
    type: Development.TECHNOLOGY
  },
  jquery: {
    key: ETechnology.JQUERY,
    label: 'jQuery',
    type: Development.TECHNOLOGY
  },
  materialUI: {
    key: ETechnology.MATERIAL_UI,
    label: 'Material UI',
    type: Development.TECHNOLOGY
  },
  semanticUI: {
    key: ETechnology.SEMANTIC_UI,
    label: 'Semantic UI',
    type: Development.TECHNOLOGY
  },
  kendoUI: {
    key: ETechnology.KENDO_UI,
    label: 'Kendo UI',
    type: Development.TECHNOLOGY
  },
  bootstrap: {
    key: ETechnology.BOOTSTRAP,
    label: 'Bootstrap',
    type: Development.TECHNOLOGY
  },
  styledComponents: {
    key: ETechnology.STYLED,
    label: 'Styled Components',
    type: Development.TECHNOLOGY
  },
  oop: {
    key: ETechnology.OOP,
    label: 'OOP',
    type: Development.TECHNOLOGY
  },
  fp: {
    key: ETechnology.FP,
    label: 'FP',
    type: Development.TECHNOLOGY
  },
  tdd: {
    key: ETechnology.TDD,
    label: 'TDD',
    type: Development.TECHNOLOGY
  },
  bdd: {
    key: ETechnology.BDD,
    label: 'BDD',
    type: Development.TECHNOLOGY
  },
  redux: {
    key: ETechnology.REDUX,
    label: 'Redux',
    type: Development.TECHNOLOGY
  },
  mobx: {
    key: ETechnology.MOBX,
    label: 'MobX',
    type: Development.TECHNOLOGY
  },
  rxjs: {
    key: ETechnology.RXJS,
    label: 'RxJS',
    type: Development.TECHNOLOGY
  },
  googleMaps: {
    key: ETechnology.GOOGLE_MAPS,
    label: 'Google Maps',
    type: Development.TECHNOLOGY
  },
  jest: {
    key: ETechnology.JEST,
    label: 'Jest',
    type: Development.TECHNOLOGY
  },
  jasmine: {
    key: ETechnology.JASMINE,
    label: 'Jasmine',
    type: Development.TECHNOLOGY
  },
  lodash: {
    key: ETechnology.LODASH,
    label: 'Lodash',
    type: Development.TECHNOLOGY
  },
  cryptoJS: {
    key: ETechnology.CRYPTO_JS,
    label: 'Crypto JS',
    type: Development.TECHNOLOGY
  },
  svg: {
    key: ETechnology.SVG,
    label: 'SVG',
    type: Development.TECHNOLOGY
  },
  d3js: {
    key: ETechnology.D3JS,
    label: 'D3js',
    type: Development.TECHNOLOGY
  },
  canvas: {
    key: ETechnology.CANVAS,
    label: 'Canvas',
    type: Development.TECHNOLOGY
  },
  webSocket: {
    key: ETechnology.WEB_SOCKET,
    label: 'Web Socket',
    type: Development.TECHNOLOGY
  },
  webWorker: {
    key: ETechnology.WEB_WORKER,
    label: 'Web Worker',
    type: Development.TECHNOLOGY
  },
  serviceWorker: {
    key: ETechnology.SERVICE_WORKER,
    label: 'Service Worker',
    type: Development.TECHNOLOGY
  },
  jsdoc: {
    key: ETechnology.JSDOC,
    label: 'JsDoc',
    type: Development.TECHNOLOGY
  },
  scrum: {
    key: ETechnology.SCRUM,
    label: 'Scrum',
    type: Development.TECHNOLOGY
  },
  kanban: {
    key: ETechnology.KANBAN,
    label: 'Kanban',
    type: Development.TECHNOLOGY
  },
  lean: {
    key: ETechnology.LEAN,
    label: 'Lean',
    type: Development.TECHNOLOGY
  },
  exp: {
    key: ETechnology.EXP,
    label: 'Extreme Programming',
    type: Development.TECHNOLOGY
  },
  pexels: {
    key: ETechnology.PEXELS,
    label: 'Pexels (api)',
    type: Development.TECHNOLOGY
  }
}
