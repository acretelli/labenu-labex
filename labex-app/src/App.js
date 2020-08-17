import React from 'react';
import CssBaseline from '@material-ui/core/CssBaseline';

import { theme, useStyles } from './styles';
import { ThemeProvider } from '@material-ui/styles';

import Router from './components/Router/Router';

function App() {
  const classes = useStyles();

  return (
    <ThemeProvider  theme={theme}>
      <CssBaseline />
      <Router />
    </ThemeProvider>
  );
}

export default App;
