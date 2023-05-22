import React, { useCallback, useEffect, useState } from 'react';
import CharacterCard from 'src/view/components/CharacterCard/characterCard';
import {type Character } from 'rickmortyapi';
import { Pagination } from '@mui/material';
import CharacterFilter from 'src/view/components/CharacterFilter/CharacterFilter';
import { type FilterQuery } from 'src/view/widgets/Filter/util/types/types';
import { getRickAndMortyCharactersWithoutQuery, getRickAndMortyDataByQuery } from 'src/data/providers/rickAndMortyProvider/rickAndMortyProvider';
import { type RickAndMortyDataByQueryReponse } from 'src/data/providers/rickAndMortyProvider/interface';

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


    // empty filters can be undefined, null, or empty string
    // eslint doesn't want to delete props of a 'dynamic' object, so unused properties will remain in characterQuery entries
    const removeEmptyFiltersForRequest = (): FilterQuery[] => {
        let actualQueries: FilterQuery[]  = [];
        characterQuery.filter((query, index) => {
            if (query !== undefined && !Object.values(query).every(x => x === '')) {
                actualQueries = [...actualQueries, query];
            }
            return null;
        });
        return actualQueries;
    };

    // used before sending the request to 'save' the indicies of valid characterQueries
    // useful to figure out which filter requested which data, would otherwise be lost due to removeEmptyFilters above
    const trackFilterIndices = (): Array<number | null> => {
        const resultsByFilter: Array<number | null>  = [];
        characterQuery.filter((query, index) => {
            if (query !== undefined && !Object.values(query).every(x => x === '')) {
                resultsByFilter[index] = 0;
            } else {
                resultsByFilter[index] = null;
            }
            return null;
        });
        return resultsByFilter;
    };

    const getData = useCallback(async () : Promise<void> => {
        let response;
        setLoading(true);
        if (characterQuery.length > 0) {
            // remove empty queries from characterQuery[] array, this is what we will request
            const actualQueries = removeEmptyFiltersForRequest();

            // tracks indices of which filter submits which request (so that we can assign counts for each)
            const resultsFilterIndices = trackFilterIndices();

            const data: RickAndMortyDataByQueryReponse | null = await getRickAndMortyDataByQuery(actualQueries, pageNumber, resultsFilterIndices, resultCountByFilter);
            if (data != null) {      
                setCharacters(data.newCharacters);
                setPageCount(data.finalPage);
                setResultCountByFilter(data.resultCountByFilter);
            }
  
        // in case no filters are used, just fetch all for current page
        } else {
            response = await getRickAndMortyCharactersWithoutQuery(pageNumber);
            setPageCount(response?.data?.info?.pages ?? 10);
            setCharacters(response?.data?.results);
      
        }
        setLoading(false);
    // results in infinite loop if including setResultCountByFilter like it wants...
    // should only be calling this if characterQuery or pageNumber change
    // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [characterQuery, pageNumber]);


    
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
