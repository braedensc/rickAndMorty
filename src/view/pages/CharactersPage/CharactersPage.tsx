import React, { useEffect, useState } from 'react';
import { getRickAndMortyCharacters } from 'src/data/services/rickAndMorty.service';
import CharacterCard from 'src/view/components/CharacterCard/characterCard';
import { type Character } from 'rickmortyapi';
import { Pagination } from '@mui/material';

import styles from './CharactersPage.module.scss';

interface Props {
}



const CharactersPage: React.FC<Props> = () => {



    const [characters, setCharacters] = useState<Character[] | undefined>([]);
    const [loading, setLoading] = useState<boolean>(false);
    console.log(characters);

    useEffect(() => {
        const getData = async (): Promise<Character[] | undefined> => {
            let response;
            try {
                response = await getRickAndMortyCharacters();
            } catch (err) {
                console.log(err);
            }
            console.log(response);

            setCharacters(response?.data?.results);
            setLoading(false);
            return response?.data?.results;
        };
        setLoading(true);
        getData()
            .catch(console.error);
    }, []);


    return (
        <div className = {styles.characterPageContainer}>
            <div className={styles.paginationContainer}>
                <Pagination count={10}  color="standard" size='large' sx={{
                    button:{color: '#ffffff'}
                }}></Pagination>
            </div>
            <div className={styles.characterGridContainer}>
                {characters?.map((char: Character) => {
                    return (
                        <CharacterCard key={char.id} character={char}/>
                    );
                })}
            </div>

        </div>
    );
};

export default CharactersPage;
