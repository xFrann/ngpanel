export const themeOptions = {
    palette: {
      type: 'dark',
      primary: {
        main: '#008080',
      },
      secondary: {
        main: '#ffbe94',
      },
      error: {
        main: '#fd5a61',
      },
      divider: 'rgba(255,255,255,0.67)',
    },
    components: {
      MuiDrawer: {
        styleOverrides: {
          paper: {
            background: 'linear-gradient(45deg, rgba(0,128,128,1) 0%, rgba(95,255,148,1) 100%);',

          }
        }
      },
    },
  };