import { blueGrey, green, grey, red } from '@mui/material/colors';

const black = '#000000';
const white = '#FFFFFF';

export default {
  background: {
    dark: black,
    main: blueGrey[100]
  },
  border: grey[500],
  error: {
    main: red[500]
  },
  success: {
    main: green[500]
  },
  text: {
    contrast: white
  }
};
