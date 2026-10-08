import { Components } from '@mui/material/styles';

const MuiButton: Components['MuiButton'] = {
  styleOverrides: {
    root: {
      textTransform: 'none'
    }
  }
};

export default MuiButton;
