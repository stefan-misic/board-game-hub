import {
  green,
  grey,
  orange,
  red,
  yellow
} from '@mui/material/colors';

const black = '#000000';
const white = '#FFFFFF';

export default {
  background: {
    dark: black,
    main: green[400]
  },
  border: grey[500],
  error: {
    main: red[500]
  },
  icon: {
    orange: orange[600],
    red: red[600],
    yellow: yellow[600]
  },
  success: {
    main: green[500]
  },
  text: {
    contrast: white,
    label: grey[600]
  }
};
