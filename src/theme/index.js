
import { createTheme } from '@mui/material/styles';

import overrides from './overrides';
import palette from './palette';

const theme = createTheme({
  components: overrides(),
  palette
});

export default theme;
