import { CssBaseline } from '@mui/material';
import { ThemeProvider as MuiThemeProvider } from '@mui/material/styles';
import { ThemeProvider as StyledThemeProvider } from 'styled-components';

import Router from './Router';
import theme from './theme';
import './App.scss';

function App() {
  return (
    <MuiThemeProvider theme={theme}>
      <StyledThemeProvider theme={theme}>
        <CssBaseline />
        <Router />
      </StyledThemeProvider>
    </MuiThemeProvider>
  );
}

export default App;
