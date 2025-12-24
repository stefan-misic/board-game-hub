import { CssBaseline } from '@mui/material';
import { ThemeProvider as MuiThemeProvider } from '@mui/material/styles';
import { ThemeProvider as StyledThemeProvider } from 'styled-components';

import Loader from './components/Loader/Loader';
import Router from './Router';
import theme from './theme';
import './App.scss';

function App() {
  return (
    <MuiThemeProvider theme={theme}>
      <StyledThemeProvider theme={theme}>
        <CssBaseline />
        <Loader />
        <Router />
      </StyledThemeProvider>
    </MuiThemeProvider>
  );
}

export default App;
