import Snackbar from '@mui/material/Snackbar';
import styled from 'styled-components';

export const StyledSnackbar = styled(Snackbar)`
    && {
        .MuiPaper-root {
            background-color: ${({ $messageType , theme}) => {
    switch ($messageType) {
    case 'error':
      return theme.palette.error.main;
    case 'success':
      return theme.palette.success.main;
    default:
      return theme.palette.background.dark;
    }
  }};
        }
    }
`;
