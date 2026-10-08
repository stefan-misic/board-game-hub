import '@mui/material/styles';

declare module '@mui/material/styles' {
  interface Palette {
    border?: string;
    icon?: {
      orange: string;
      red: string;
      yellow: string;
    };
  }

  interface PaletteOptions {
    border?: string;
    icon?: {
      orange: string;
      red: string;
      yellow: string;
    };
  }

  interface TypeBackground {
    dark?: string;
    main?: string;
  }

  interface TypeText {
    contrast?: string;
    label?: string;
  }
}
