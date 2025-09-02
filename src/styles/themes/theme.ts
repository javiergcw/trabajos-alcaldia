import { createTheme } from '@mui/material/styles';

export const theme = createTheme({
  palette: {
    primary: {
      main: '#007AFF',
      light: '#4DA3FF',
      dark: '#0056CC',
    },
    secondary: {
      main: '#5856D6',
      light: '#7B7AFF',
      dark: '#3E3C99',
    },
    background: {
      default: '#F8F9FA',
      paper: '#FFFFFF',
    },
    text: {
      primary: '#1C1C1E',
      secondary: '#6C6C70',
    },
    grey: {
      50: '#FAFAFA',
      100: '#F5F5F5',
      200: '#E9E9EB',
      300: '#DEDEDE',
      400: '#C7C7CC',
      500: '#AEAEB2',
      600: '#8E8E93',
      700: '#636366',
      800: '#48484A',
      900: '#1C1C1E',
    },
    success: {
      main: '#34C759',
      light: '#5CD675',
      dark: '#28A745',
    },
  },
  typography: {
    fontFamily: '"SF Pro Display", -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif',
    h1: {
      fontSize: '3.5rem',
      fontWeight: 700,
      letterSpacing: '-0.02em',
      lineHeight: 1.1,
    },
    h2: {
      fontSize: '2.5rem',
      fontWeight: 600,
      letterSpacing: '-0.01em',
    },
    h3: {
      fontSize: '2rem',
      fontWeight: 600,
      letterSpacing: '-0.01em',
    },
    h4: {
      fontSize: '1.5rem',
      fontWeight: 600,
      letterSpacing: '-0.01em',
    },
    h5: {
      fontSize: '1.25rem',
      fontWeight: 600,
      letterSpacing: '-0.01em',
    },
    h6: {
      fontSize: '1.125rem',
      fontWeight: 600,
      letterSpacing: '-0.01em',
    },
    body1: {
      fontSize: '1rem',
      lineHeight: 1.5,
      letterSpacing: '0.01em',
    },
    body2: {
      fontSize: '0.875rem',
      lineHeight: 1.4,
      letterSpacing: '0.01em',
    },
  },
  shape: {
    borderRadius: 8,
  },
  components: {
    MuiButton: {
      styleOverrides: {
        root: {
          textTransform: 'none',
          borderRadius: 6,
          fontWeight: 600,
          fontSize: '0.875rem',
          padding: '10px 20px',
          boxShadow: 'none',
          '&:hover': {
            boxShadow: '0 2px 8px rgba(0, 122, 255, 0.12)',
          },
        },
        contained: {
          background: 'linear-gradient(135deg, #007AFF 0%, #4DA3FF 100%)',
          '&:hover': {
            background: 'linear-gradient(135deg, #0056CC 0%, #1976D2 100%)',
          },
        },
        outlined: {
          borderWidth: '1px',
          '&:hover': {
            borderWidth: '1px',
            background: 'rgba(0, 122, 255, 0.04)',
          },
        },
      },
    },
    MuiCard: {
      styleOverrides: {
        root: {
          borderRadius: 8,
          boxShadow: '0 1px 3px rgba(0, 0, 0, 0.08)',
          border: '1px solid rgba(0, 0, 0, 0.06)',
          transition: 'all 0.2s ease-in-out',
          '&:hover': {
            boxShadow: '0 4px 12px rgba(0, 0, 0, 0.12)',
            transform: 'translateY(-1px)',
          },
        },
      },
    },
    MuiPaper: {
      styleOverrides: {
        root: {
          borderRadius: 8,
          boxShadow: '0 1px 2px rgba(0, 0, 0, 0.06)',
          border: '1px solid rgba(0, 0, 0, 0.08)',
        },
        elevation1: {
          boxShadow: '0 1px 2px rgba(0, 0, 0, 0.06)',
        },
        elevation2: {
          boxShadow: '0 2px 4px rgba(0, 0, 0, 0.08)',
        },
        elevation8: {
          boxShadow: '0 4px 8px rgba(0, 0, 0, 0.1)',
        },
      },
    },
    MuiTextField: {
      styleOverrides: {
        root: {
          '& .MuiOutlinedInput-root': {
            borderRadius: 6,
            '& fieldset': {
              borderColor: 'rgba(0, 0, 0, 0.12)',
              borderWidth: '1px',
            },
            '&:hover fieldset': {
              borderColor: 'rgba(0, 122, 255, 0.25)',
            },
            '&.Mui-focused fieldset': {
              borderColor: '#007AFF',
              borderWidth: '1px',
            },
          },
        },
      },
    },
    MuiChip: {
      styleOverrides: {
        root: {
          borderRadius: 6,
          fontWeight: 500,
          fontSize: '0.75rem',
        },
        outlined: {
          borderColor: 'rgba(0, 0, 0, 0.12)',
          borderWidth: '1px',
        },
      },
    },
    MuiTabs: {
      styleOverrides: {
        root: {
          '& .MuiTab-root': {
            textTransform: 'none',
            fontWeight: 600,
            fontSize: '0.875rem',
            minHeight: 40,
            color: 'text.secondary',
            '&.Mui-selected': {
              color: 'text.primary',
              fontWeight: 700,
              background: 'rgba(0, 0, 0, 0.03)',
              borderRadius: '6px 6px 0 0',
            },
          },
          '& .MuiTabs-indicator': {
            height: '2px',
            backgroundColor: 'text.primary',
          },
        },
      },
    },
    MuiAccordion: {
      styleOverrides: {
        root: {
          borderRadius: 6,
          boxShadow: 'none',
          border: '1px solid rgba(0, 0, 0, 0.06)',
          '&:before': {
            display: 'none',
          },
          '&.Mui-expanded': {
            margin: '4px 0',
          },
        },
      },
    },
    MuiCheckbox: {
      styleOverrides: {
        root: {
          '&.Mui-checked': {
            color: '#007AFF',
          },
        },
      },
    },
  },
});
