import React, { ReactElement } from 'react';
import { createTheme, CssBaseline, ThemeProvider } from '@mui/material';
import { Provider } from 'react-redux';
import { store } from 'services';
import { MainPage } from 'pages/main';

/**
 * Main App
 * @return {ReactElement}
 */
export function App(): ReactElement {
  const theme = createTheme({
    palette: {
      mode: 'dark',
      primary: { main: '#293462' },
      secondary: { main: '#D61C4E' },
    },
  });

  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <Provider store={store}>
        <MainPage />
      </Provider>
    </ThemeProvider>
  );
}
