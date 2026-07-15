
import { createTheme } from '@mui/material/styles';

import breakpoints from './breakpoints';
import overrides from './overrides';
import palette from './palette';

const theme = createTheme({
  breakpoints,
  components: overrides(),
  palette
});

export default theme;
