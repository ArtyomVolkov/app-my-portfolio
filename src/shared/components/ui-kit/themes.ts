export const genPaletteCSS = (theme: Theme) => {
  const css = [
    `/* ${theme.name} Theme */`,
    `color-scheme: ${theme.key.includes('dark') ? 'dark' : 'light'};`,
  ];
  theme.palette.forEach((color) => {
    css.push(`${color.variableName}: ${color.hex};`);
  });
  return css.join('\n');
};

type Theme = {
  key: string;
  name: string;
  outlineColor: string;
  textColor: string;
  backgroundColor: string;
  palette: Pallette[];
};

type Pallette = {
  name: string;
  hex: string;
  variableName: string;
};

export const LightThemes: Array<Theme> = [
  {
    key: 'light',
    name: 'Default Light',
    outlineColor: '#a5a5a5',
    textColor: '#2a4aff',
    backgroundColor: '#ffffff',
    palette: [
      { name: 'Background', hex: '#ffffff', variableName: '--bg-color' },
      { name: 'Paper', hex: '#f7f7f7', variableName: '--bg-paper' },
      { name: 'Border', hex: '#a5a5a5', variableName: '--border-color' },
      { name: 'Text', hex: '#333333', variableName: '--text-color' },
      { name: 'Primary', hex: '#072bfa', variableName: '--primary-color' },
      { name: 'Secondary', hex: '#5e05cf', variableName: '--secondary-color' },
      { name: 'Success', hex: '#28a745', variableName: '--success-color' },
      { name: 'Warning', hex: '#ffc107', variableName: '--warning-color' },
      { name: 'Info', hex: '#008697', variableName: '--info-color' },
      { name: 'Danger', hex: '#dc3545', variableName: '--danger-color' },
    ],
  },
  {
    key: 'light-purple',
    name: 'Light Purple',
    outlineColor: '#bebebeff',
    textColor: '#6313f0',
    backgroundColor: '#ecececff',
    palette: [
      { name: 'Background', hex: '#ffffff', variableName: '--bg-color' },
      { name: 'Paper', hex: '#fefaf6', variableName: '--bg-paper' },
      { name: 'Border', hex: '#dbd6ce', variableName: '--border-color' },
      { name: 'Text', hex: '#000000', variableName: '--text-color' },
      { name: 'Primary', hex: '#6313f0', variableName: '--primary-color' },
      { name: 'Secondary', hex: '#00bcd4', variableName: '--secondary-color' },
      { name: 'Success', hex: '#8bc34a', variableName: '--success-color' },
      { name: 'Warning', hex: '#ffc107', variableName: '--warning-color' },
      { name: 'Info', hex: '#17a2b8', variableName: '--info-color' },
      { name: 'Danger', hex: '#ff5722', variableName: '--danger-color' },
    ],
  },
  {
    key: 'light-green',
    name: 'Light Green',
    outlineColor: '#a5d6a7ff',
    textColor: '#4caf50ff',
    backgroundColor: '#f2fcf2',
    palette: [
      { name: 'Background', hex: '#f2fcf2', variableName: '--bg-color' },
      { name: 'Paper', hex: '#c8e6c9ff', variableName: '--bg-paper' },
      { name: 'Border', hex: '#86cb88', variableName: '--border-color' },
      { name: 'Text', hex: '#323232', variableName: '--text-color' },
      { name: 'Primary', hex: '#4caf50ff', variableName: '--primary-color' },
      {
        name: 'Secondary',
        hex: '#ff9800ff',
        variableName: '--secondary-color',
      },
      { name: 'Success', hex: '#8bc34aff', variableName: '--success-color' },
      { name: 'Warning', hex: '#ffc107', variableName: '--warning-color' },
      { name: 'Info', hex: '#0c7686', variableName: '--info-color' },
      { name: 'Danger', hex: '#f44336ff', variableName: '--danger-color' },
    ],
  },
];

export const DarkThemes: Array<Theme> = [
  {
    key: 'dark',
    name: 'Default Dark',
    outlineColor: '#555555',
    textColor: '#a8a7f1',
    backgroundColor: '#1a1a1a',
    palette: [
      { name: 'Background', hex: '#19192b', variableName: '--bg-color' },
      { name: 'Paper', hex: '#29293f', variableName: '--bg-paper' },
      { name: 'Border', hex: '#494966', variableName: '--border-color' },
      { name: 'Text', hex: '#f0f0f0', variableName: '--text-color' },
      { name: 'Primary', hex: '#a8a7f1', variableName: '--primary-color' },
      { name: 'Secondary', hex: '#f5d299', variableName: '--secondary-color' },
      { name: 'Success', hex: '#93e493', variableName: '--success-color' },
      { name: 'Warning', hex: '#ffc107', variableName: '--warning-color' },
      { name: 'Info', hex: '#93db3e', variableName: '--info-color' },
      { name: 'Danger', hex: '#ff5722', variableName: '--danger-color' },
    ],
  },
  {
    key: 'dark-azure',
    name: 'Dark Azure',
    outlineColor: '#4a4a4aff',
    textColor: '#41f2ff',
    backgroundColor: '#121212ff',
    palette: [
      { name: 'Background', hex: '#121212ff', variableName: '--bg-color' },
      { name: 'Paper', hex: '#2c2c2cff', variableName: '--bg-paper' },
      { name: 'Border', hex: '#4a4a4aff', variableName: '--border-color' },
      { name: 'Text', hex: '#ebebeb', variableName: '--text-color' },
      { name: 'Primary', hex: '#41f2ff', variableName: '--primary-color' },
      { name: 'Secondary', hex: '#eed47b', variableName: '--secondary-color' },
      { name: 'Success', hex: '#50de08ff', variableName: '--success-color' },
      { name: 'Warning', hex: '#ffc107', variableName: '--warning-color' },
      { name: 'Info', hex: '#17a2b8', variableName: '--info-color' },
      { name: 'Danger', hex: '#eb4353ff', variableName: '--danger-color' },
    ],
  },
  {
    key: 'dark-red',
    name: 'Dark Red',
    outlineColor: '#7b1a1aff',
    textColor: '#e9231e',
    backgroundColor: '#1a1616',
    palette: [
      { name: 'Background', hex: '#1a1616', variableName: '--bg-color' },
      { name: 'Paper', hex: '#272727', variableName: '--bg-paper' },
      { name: 'Border', hex: '#4e4e4e', variableName: '--border-color' },
      { name: 'Text', hex: '#d4d4d4', variableName: '--text-color' },
      { name: 'Primary', hex: '#e9231e', variableName: '--primary-color' },
      { name: 'Secondary', hex: '#16c71e', variableName: '--secondary-color' },
      { name: 'Success', hex: '#8bc34aff', variableName: '--success-color' },
      { name: 'Warning', hex: '#ffc107', variableName: '--warning-color' },
      { name: 'Info', hex: '#1dd5f1', variableName: '--info-color' },
      { name: 'Danger', hex: '#dc3545', variableName: '--danger-color' },
    ],
  },
];

export default {};
