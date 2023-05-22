import React from 'react';
import { AppBar, CssBaseline, ThemeProvider } from '@mui/material';

import styles from './app.module.scss';
import { CharactersPage } from './view/pages';
import { theme } from './view/theme/theme';
import mainImage from './rick-and-morty-cover.png';


function App(): any {
    return (
        <ThemeProvider theme={theme}>
            <CssBaseline />
            <div className={styles.App}>
                <AppBar position='static'>
                    <div> {'I'} <span role="img" aria-label="arrow">❤️</span>{'Rick And Morty'} </div>
                </AppBar>
                <img className={styles.mainImage} height={165}  width={165} src={mainImage} alt={''}></img>
                <CharactersPage></CharactersPage>
            </div>
        </ThemeProvider>
    );
}
export default App;
