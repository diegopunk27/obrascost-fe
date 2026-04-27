import { createTheme } from '@mui/material/styles';

/**
 * Paleta de marca de ObrasCost: slate oscuro (#1E2835) + ámbar terroso (#BA7517).
 * Slate evoca industria/trabajo profesional; ámbar remite a materiales de construcción.
 */
export const appTheme = createTheme({
  palette: {
    mode: 'light',
    primary: {
      main: '#1E2835',
      light: '#3a4a5c',
      dark: '#0f1620',
      contrastText: '#ffffff',
    },
    secondary: {
      main: '#BA7517',
      light: '#d49144',
      dark: '#8a5410',
      contrastText: '#ffffff',
    },
    background: {
      default: '#F5F2ED',
      paper: '#ffffff',
    },
    text: {
      primary: '#1E2835',
      secondary: '#5a6573',
    },
  },
  typography: {
    fontFamily: "'Source Sans 3', 'Source Sans Pro', sans-serif",
    h1: { fontWeight: 600 },
    h2: { fontWeight: 600 },
    h3: { fontWeight: 600 },
    h4: { fontWeight: 600 },
    h5: { fontWeight: 600 },
    h6: { fontWeight: 600 },
    button: { textTransform: 'none' },
  },
  components: {
    MuiButton: {
      styleOverrides: {
        root: {
          borderRadius: 8,
        },
      },
    },
  },
});
