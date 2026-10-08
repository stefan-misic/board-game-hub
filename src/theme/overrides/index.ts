import { Components } from '@mui/material/styles';

import MuiButton from './MuiButton';
import MuiFormControl from './MuiFormControl';
import MuiTextField from './MuiTextField';

const overrides = (): Components => ({
  MuiButton,
  MuiFormControl,
  MuiTextField
});

export default overrides;
