import { createTheme } from '@mui/material/styles';

export const theme = createTheme({
    palette: {
        primary: {
            light: '#b8e6fa',
            main: '#3e9edc',
            dark: '#295a91',
            contrastText: '#fff',
        },
        secondary: {
            light: '#f6bd6e',
            main: '#dc7d3e',
            dark: '#ce6939',
            contrastText: '#000',
        },
        
    }, 
    components: {
        MuiCssBaseline: {
            styleOverrides: {
                body: {
                    backgroundColor: '#295a91',
                    backgroundImage: 'linear-gradient(19deg, #295a91 0%, #b8e6fa 100%)',
                    backgroundAttachment: 'fixed',
                },
            },
        },
    }


});
