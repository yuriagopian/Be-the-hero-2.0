import React from 'react';
import { ToastContainer } from 'react-toastify';
import Logon from './pages/Logon';
import { ThemeProvider } from 'styled-components';

import light from './styles/themes/light';
import dark from './styles/themes/dark';
import Context from './styles/themes/context';
import usePersistedState from './utils/usePersistedState';
import { Router } from 'react-router-dom';

import GlobalStyle from './styles/global';

import Routes from './routes';
import history from './services/history';

function App() {
  const [theme, setTheme] = usePersistedState('theme', dark);

  const toggleTheme = () => {
    setTheme(theme.title === 'light' ? dark : light);
  };
  return (
    <Context.Provider value={{ toggleTheme }}>
      <ThemeProvider theme={theme}>
        <Router history={history}>
          <Routes />
          <GlobalStyle />
          <ToastContainer autoClose={3500} />
        </Router>
      </ThemeProvider>
    </Context.Provider>
  );
}

export default App;
