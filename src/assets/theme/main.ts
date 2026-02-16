import { orange, blue } from '@mui/material/colors';
import { createTheme } from '@mui/material/styles';

const darkTheme = createTheme({
  palette: {
    mode: 'dark',
    primary: {
      main: blue[600]
    },
    secondary: {
      main: orange[600]
    },
  }
});

const lightTheme = createTheme({
  palette: {
    mode: 'light',
    primary: {
      main: blue[600]
    },
    secondary: {
      main: orange[600]
    },
  }
});

export default {
  dark: darkTheme,
  light: lightTheme,
}
