import React, { type SyntheticEvent, useState } from 'react';
import { InputLabel, MenuItem, Select, TextField, type SelectChangeEvent, Autocomplete, Chip, type AutocompleteInputChangeReason } from '@mui/material';
import { capitalizeFirstLetter } from 'src/utils/uppercasefirstLetter';

import styles from './filterSearch.module.scss';




interface Props {
    value: string;
    onChange: (value: string) => void;
    options?: string[];
    autocompleteKey: number;
}


const FilterSearch: React.FC<Props> = ({value, onChange, options=[], autocompleteKey = 0}) => {



    const handleChange = (event: SyntheticEvent<Element, Event>, value: string | null): void => {
        onChange(value ?? '');
    };


    console.log('auto value', autocompleteKey);
    return (
        <div className={styles.filterSearchContainer}>
            <Autocomplete
                key={autocompleteKey}
                id="tags-outlined"
                freeSolo
                options={options}
                fullWidth
                renderInput={(params) => (
                    <TextField
                        {...params}
                        label="Search"
                    />
                )}
                onChange={handleChange}
                value={value}
 
            />
        </div>
    );
};

export default FilterSearch;
