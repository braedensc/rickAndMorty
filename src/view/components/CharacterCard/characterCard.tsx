import React, { useState } from 'react';
import { Paper } from '@mui/material';
import { type Character } from 'rickmortyapi';
import classNames from 'classnames';

import styles from './characterCard.module.scss';

interface Props {
   character: Character;
}


const CharacterCard: React.FC<Props> = ({character}) => {
    // const [characters, setCharacters] = useState<any[]>([]);
    // const [loading, setLoading] = useState<boolean>(false);
    console.log(character);


    const statusClass = {
        [styles.__alive]: character.status === 'Alive',
        [styles.__dead]: character.status === 'Dead',
        [styles.__unknown]: character.status === 'unknown'
    };


    return <div className={styles.cardContiner}>
        <Paper elevation={8} sx={{
            backgroundColor: 'primary.light'
        }}>
            <div>
                <div>{character?.name}</div>
                <img src={character?.image}></img>
                <div className={classNames(styles.characterStatusText, statusClass)}>{character?.status !== undefined ? (character.status).toUpperCase() : ''}</div>
            </div>
        </Paper>


    </div>;
};

export default CharacterCard;
