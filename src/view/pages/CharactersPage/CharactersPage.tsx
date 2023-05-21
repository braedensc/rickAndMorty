import React, { useCallback, useEffect, useState } from 'react';
import { getRickAndMortyCharacters, getRickAndMortyCharactersByQuery } from 'src/data/services/rickAndMorty.service';
import CharacterCard from 'src/view/components/CharacterCard/characterCard';
import { type Character } from 'rickmortyapi';
import { Pagination } from '@mui/material';
import CharacterFilter from 'src/view/components/CharacterFilter/CharacterFilter';
import { type FilterQuery } from 'src/view/widgets/Filter/util/types/types';

import styles from './CharactersPage.module.scss';

interface Props {
}



const CharactersPage: React.FC<Props> = () => {
    const [characters, setCharacters] = useState<Character[] | undefined>([]);
    const [loading, setLoading] = useState<boolean>(false);
    const [pageNumber, setPageNumber] = useState<number>(1);
    const [pageCount, setPageCount] = useState<number>(10);
    const [characterQuery, setCharacterQuery] = useState<FilterQuery[]>([]);
    const [resultCountByFilter, setResultCountByFilter] = useState<number[]>([]);
    console.log('all characters' , characters);


    const getData = useCallback(async () : Promise<any> => {
        let response;
        if (characterQuery.length > 0) {


            // remove empty queries
            let actualQueries: FilterQuery[]  = [];
            characterQuery.filter((query, index) => {
                // if query has no content, don't add it to search
                if (query !== undefined && !Object.values(query).every(x => x === '')) {
                    actualQueries = [...actualQueries, query];
                }
                return null;
            });
            console.log('ac queries', actualQueries);

       
            try {
                response = getRickAndMortyCharactersByQuery(actualQueries, pageNumber).then((data: any[]) => {
                    console.log('res big', data);
                    const characterResult: Character[] = [];
                    data.map((queryResult: any) => {

                        if(queryResult.value.status !== 200) {
                            return 0;
                        }
                        return (
                            characterResult.push(...queryResult.value.data.results)

                        );
                    });
                    console.log('char result', characterResult);


                    // remove duplicate characters from multiple filter searches
                    const uniqueCharacters = [...characterResult.reduce((a:any,c:any)=>{
                        a.set(c.id, c);
                        return a;
                    }, new Map()).values()];

                    // set max page number
                    let finalPage = 0;
                    data.forEach((response, index) => {
                        if (response?.value?.data?.info?.pages > finalPage) {
                            finalPage = response.value.data.info.pages;
                        }
                    });

                    // set filterResultCounts
                    const resultCountById: number[] = [];


                    setCharacters(uniqueCharacters);
                    setPageCount(finalPage);
                }

                );
       
            } catch (err) {
                console.log(err);
            }
        
        } else {
            response = await getRickAndMortyCharacters(pageNumber);
            console.log('RES',response);
            setPageCount(response?.data?.info?.pages ?? 10);
            setCharacters(response?.data?.results);
            setLoading(false);
        }

    }, [characterQuery, pageNumber]);

    console.log('chars1', characterQuery);

    
    useEffect(() => {
        getData().catch(console.error);
    }, [characterQuery, getData, pageNumber]);

    const onPageChange = (pageNumber: number): void => {
        setPageNumber(pageNumber);
    };



    const onFilterChange = (query: FilterQuery, filterId: number): void => {
        const newCharacterQuery = [...characterQuery];
        newCharacterQuery[filterId] = query;
        setCharacterQuery(newCharacterQuery);
    };

    console.log('global character query', characterQuery);

    return (
        <div className = {styles.characterPageContainer}>
            <CharacterFilter onSelect={onFilterChange} characterQuery={[]}/>
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
                        onPageChange(page);
                    }}
                ></Pagination>
            </div>
        </div>
    );
};

export default CharactersPage;
