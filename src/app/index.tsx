import { BrowserRouter } from 'react-router';
import { ThemeProvider, StyledEngineProvider } from '@mui/material/styles';
import { ModalProvider } from '@shared/components/ui-kit/modal';

import AppLayout from '@app/layout';

import { useAppStore } from '@store/app';

import THEME from '@assets/theme/main';

const App = () => {
  const theme = useAppStore((state) => state.theme);
  const scheme = THEME[theme?.includes('dark') ? 'dark' : 'light'];

  return (
    <BrowserRouter>
      <StyledEngineProvider injectFirst>
        <ThemeProvider theme={scheme}>
          <ModalProvider>
            <AppLayout />
          </ModalProvider>
        </ThemeProvider>
      </StyledEngineProvider>
    </BrowserRouter>
  );
};

export default App;
