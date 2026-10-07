import Snackbar from '@mui/material/Snackbar';
import { Theme } from '@mui/material/styles';
import styled from 'styled-components';

interface StyledSnackbarProps {
  $messageType?: 'error' | 'success' | 'info' | string;
}

export const StyledSnackbar = styled(Snackbar)<StyledSnackbarProps>`
    && {
        .MuiPaper-root {
            background-color: ${(props) => {
    const muiTheme = props.theme as Theme;

    switch (props.$messageType) {
    case 'error':
      return muiTheme.palette.error.main;
    case 'success':
      return muiTheme.palette.success.main;
    default:
      return muiTheme.palette.background.dark;
    }
  }};
        }
    }
`;
