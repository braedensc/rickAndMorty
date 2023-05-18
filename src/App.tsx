import React from 'react';

import styles from './app.module.scss';
import { CardsPage } from './view/pages';

function App(): any {
    return (
        <div className={styles.App}>
            <CardsPage></CardsPage>
        </div>
    );
}

export default App;
