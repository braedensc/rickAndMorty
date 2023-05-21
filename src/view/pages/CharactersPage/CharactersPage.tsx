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
    const [pageCount, setPageCount] = useState<number>(10);
    console.log('all characters' , characters);

   

    useEffect(() => {
        onPageChange(1)
            .catch(console.error);
    }, []);

    const onPageChange = async (pageNumber: number): Promise<void> => {
        let response;
        try {
            response = await getRickAndMortyCharacters(pageNumber);
        } catch (err) {
            console.log(err);
        }
        console.log('RES',response);
        setPageCount(response?.data?.info?.pages ?? 10);
        setCharacters(response?.data?.results);
        setLoading(false);
    };



    return (
        <div className = {styles.characterPageContainer}>
           
            <div className={styles.characterGridContainer}>
                {characters?.map((char: Character) => {
                    return (
                        <CharacterCard key={char.id} character={char}/>
                    );
                })}
            </div>
            <div className={styles.paginationContainer}>
                <Pagination 
                    count={pageCount}  
                    color="standard"
                    size='large' 
                    sx={{
                        button:{color: '#ffffff'}
                    }}
                    onChange={(_event: React.ChangeEvent<unknown>, page: number)  => {
                        onPageChange(page).catch(console.error);
                    }}
                ></Pagination>
            </div>

        </div>
    );
};

export default CharactersPage;
