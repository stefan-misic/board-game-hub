import { Theme } from '@mui/material/styles';
import 'styled-components';

declare module 'styled-components' {
  export type DefaultTheme = Theme;
}