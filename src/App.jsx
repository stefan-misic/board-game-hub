import { CssBaseline } from '@mui/material';
import { ThemeProvider as MuiThemeProvider } from '@mui/material/styles';
import { useSelector } from 'react-redux';
import { ThemeProvider as StyledThemeProvider } from 'styled-components';

import Loader from './components/Loader/Loader';
import MessagePopup from './components/MessagePopup/MessagePopup';
import { selectCurrentUser } from './store/user.slice';
import Router from './Router';
import theme from './theme';
import './App.scss';

function App() {
  const currentUser = useSelector(selectCurrentUser);

  return (
    <MuiThemeProvider theme={theme}>
      <StyledThemeProvider theme={theme}>
        <CssBaseline />
        <Loader />
        <MessagePopup />
        <Router isUserAuthenticated={!!currentUser?.id} />
      </StyledThemeProvider>
    </MuiThemeProvider>
  );
}

export default App;
