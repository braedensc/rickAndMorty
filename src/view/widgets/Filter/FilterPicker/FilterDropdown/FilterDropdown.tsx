import React, { useState } from 'react';
import { InputLabel, MenuItem, Select, type SelectChangeEvent } from '@mui/material';
import { capitalizeFirstLetter } from 'src/utils/uppercasefirstLetter';

import styles from './filterDropdown.module.scss';
import { queryDropdownOptions } from '../../../../components/CharacterFilter/util/constants';



interface Props {
   value: string;
   onChange: (value: string) => void;
   filterOptions: string[];
}


const FilterDropdown: React.FC<Props> = ({value, onChange, filterOptions = []}) => {
    const handleChange = (event: SelectChangeEvent<string>): void => {
        onChange(event.target.value);
    };

    return (
        <div className={styles.filterDropdownContainer}>
            <InputLabel id="simple-select-label">Category</InputLabel>
            <Select
                labelId="simple-select-label"
                id="simple-select"
                value={value}
                label="Search Parameter"
                onChange={handleChange}
                fullWidth
                variant='standard'
            >
                {filterOptions.map((option: string) => <MenuItem key={option} value={option}  sx={{
                }} >{capitalizeFirstLetter(option)}</MenuItem>)}
            </Select>
        </div>
    );
};

export default FilterDropdown;
