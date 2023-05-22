import React, { useState } from 'react';


import styles from './filterPicker.module.scss';
import FilterDropdown from './FilterDropdown/FilterDropdown';
import FilterSearch from './FilterSearch/FilterSearch';
import { type FilterQuery } from '../util/types/types';

interface Props {
    onSelect: (filterOptions: Record<string,string>) => void;
    filterQuery: FilterQuery;
    filterOptions: string[]
}

// TODO: allow <FilterDropdown/> and <FilterSearch/> to be passed as props and replace the one's below, if given
const FilterPicker: React.FC<Props> = ({onSelect, filterQuery, filterOptions=[]}) => {
    const [searchParam, setSearchParam] = useState<string>('name');
    const [searchValue, setsearchValue] = useState<string>('');

    // 'hack' to force MUI Autocomplete to re-render whenever value is cleared
    // apparently a known bug when using autocomplete in 'freeSolo' mode
    const [autoCompleteKey, setAutocompleteKey] = useState<number>(0);

    const handleDropdownSelect = (value: string): void => {
        setSearchParam(value);
        setsearchValue('');
        setAutocompleteKey(autoCompleteKey+1);
    };

    const handleSearch = (value: string): void => {
        setsearchValue('');
        setAutocompleteKey(autoCompleteKey+1);
        if (value !== '') {
            onSelect({...filterQuery, [searchParam]: value});
        }
    };

    return (
        <div className={styles.filterPickerContainer}>
            <FilterDropdown value={searchParam} onChange={handleDropdownSelect} filterOptions={filterOptions}></FilterDropdown>
            <FilterSearch value={searchValue} onChange={handleSearch} autocompleteKey={autoCompleteKey}></FilterSearch>
        </div>
    );
};

export default FilterPicker;
