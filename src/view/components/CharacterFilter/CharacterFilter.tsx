import React, { useState } from 'react';
import Filter from 'src/view/widgets/Filter/Filter';
import { type FilterQuery } from 'src/view/widgets/Filter/util/types/types';
import { Box } from '@mui/material';

import styles from './characterFilter.module.scss';
import { queryDropdownOptions } from './util/constants';



interface Props {
    // updates the global character Filter by combining each indiviidual Filter's query into an array
    // filterId is the index of that specific filter's query in the overall array
    // each Filter instance manages its own state internally
    onSelect: (filterQuery: FilterQuery, filterId: number) => void;

    // global query which includes the query provided by each filter
    characterQuery: FilterQuery[];
}


const CharacterFilter: React.FC<Props> = ({onSelect, characterQuery = []}) => {

    // TODO: allow filters to be added or removed in UI dynamically, instead of hard-coding 4 of them
    const [numFilters, setNumFilters] = useState(4);

    return (
        <>
            <div className={styles.characterFiltersContainer}>
                <div className = {styles.charcterFilterContainer}>
                    <span>{`Filter #${1}`}</span>
                    <Box className={styles.characterFilter} sx={{ p: 2, border: '1px solid', borderColor:'primary.dark' }} component='div'>
                        <Filter onSelect={onSelect} filterOptions={queryDropdownOptions} filterId={0}></Filter>
                    </Box>
                </div>
                <div className = {styles.charcterFilterContainer}>
                    <span>{`Filter #${2}`}</span>
                    <Box className={styles.characterFilter} sx={{ p: 2, border: '1px solid', borderColor:'primary.dark' }} component='div'>
                        <Filter onSelect={onSelect} filterOptions={queryDropdownOptions} filterId={1}></Filter>
                    </Box>
                </div>
                <div className = {styles.charcterFilterContainer}>
                    <span>{`Filter #${3}`}</span>
                    <Box className={styles.characterFilter} sx={{ p: 2, border: '1px solid', borderColor:'primary.dark' }} component='div'>
                        <Filter onSelect={onSelect} filterOptions={queryDropdownOptions} filterId={2}></Filter>
                    </Box>
                </div>
                <div className = {styles.charcterFilterContainer}>
                    <span>{`Filter #${4}`}</span>
                    <Box className={styles.characterFilter} sx={{ p: 2, border: '1px solid', borderColor:'primary.dark' }} component='div'>
                        <Filter onSelect={onSelect} filterOptions={queryDropdownOptions} filterId={3}></Filter>
                    </Box>
                </div>

            </div>
        </>
    );
};

export default CharacterFilter;
