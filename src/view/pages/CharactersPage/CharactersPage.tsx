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
    const [resultCountByFilter, setResultCountByFilter] = useState<Array<number | null>>([]);
    console.log('all characters' , characters);


    const getData = useCallback(async () : Promise<any> => {
        let response;
        if (characterQuery.length > 0) {
            // remove empty queries
            // also prepare for resultcountByFilter by keeping track of which queries were 'ditched'
            let actualQueries: FilterQuery[]  = [];
            const resultsByFilter: Array<number | null>  = [];
            console.log('res qu', characterQuery);
            characterQuery.filter((query, index) => {
                if (query !== undefined && !Object.values(query).every(x => x === '')) {
                    actualQueries = [...actualQueries, query];
                    resultsByFilter[index] = 0;
                } else {
                    resultsByFilter[index] = null;
                }

                return null;
            });
            console.log('res qu2', resultsByFilter);
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
                    console.log('res by fi', resultsByFilter);
                    data.forEach((response, index) => {
                        if (response?.value?.data?.info?.pages > finalPage) {
                            finalPage = response.value.data.info.pages;
                        }
                    });
                    // handle indiviudal filterCounts
                    const resultsByFilterFinal : Array<number | null>  = [];
                    let i = 0;
                    resultsByFilter.forEach((value, index) => {
                        if (value !== null) {
                            if (data[i]?.value?.data?.info?.count !== undefined) {
                                resultsByFilterFinal[index] = data[i].value.data.info.count;
                            } else {
                                // if 404 was returned, set to 0 unless we already have a result count
                                resultsByFilterFinal[index] = resultCountByFilter[index] != null ? resultCountByFilter[index]: resultsByFilterFinal[index] = 0;
                            }
                            i++;
                        }
                    });
                   
                    setCharacters(uniqueCharacters);
                    setPageCount(finalPage);
                    setResultCountByFilter(resultsByFilterFinal);
             
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

    // results in infinite loop if including setResultCountByFilter like it wants...
    // eslint-disable-next-line react-hooks/exhaustive-deps
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
        setLoading(true);
        setCharacterQuery(newCharacterQuery);
        setPageNumber(1);
        setLoading(false);
    };

    console.log('global character query', characterQuery);

    return (
        <div className = {styles.characterPageContainer}>
            <CharacterFilter onSelect={onFilterChange} characterQuery={[]} resultCountByFilter={resultCountByFilter}/>
            <div className={styles.characterGridContainer}>
                {/* TODO: should use an actual loading icon here, currently laods fast enough so not needed */}
                {
                    !loading ? 
                        characters?.map((char: Character) => {
                            return (
                                <CharacterCard key={char.id} character={char}/>
                            );
                        }) : <div>Loading</div>
            
                }
            </div>
            <div className={styles.paginationContainer}>
                <Pagination 
                    count={pageCount}  
                    color="standard"
                    size='large' 
                    page={pageNumber}
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
