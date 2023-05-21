import React, { useState } from 'react';
import { Chip } from '@mui/material';
import { capitalizeFirstLetter } from 'src/utils/uppercasefirstLetter';

import styles from './filterSelectedOption.module.scss';
import { type FilterQuery } from '../util/types/types';



interface Props {
    setQuery: (filterOptions: any) => void;
    filterQuery: FilterQuery;
    filterTerm: string;
    filterValue: string;
}


const FilterSelectedOption: React.FC<Props> = ({setQuery, filterQuery, filterTerm, filterValue}) => {
 

    const handleDelete = (_event: any): void => {
        console.log('removing...', filterTerm);
        setQuery({...filterQuery, [filterTerm]: ''});
        
    };

    return (
        <div className={styles.filterPickerContainer}>
            <Chip label={`${capitalizeFirstLetter(filterTerm)}: ${filterValue}`} onDelete={handleDelete} />
        </div>
    );
};

export default FilterSelectedOption;
