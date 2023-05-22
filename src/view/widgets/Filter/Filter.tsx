import React, { useState } from 'react';


import styles from './filter.module.scss';
import FilterPicker from './FilterPicker/FilterPicker';
import FilterSelectedOption from './FilterSelectedOption/FilterSelectedOption';
import { type FilterQuery } from './util/types/types';


interface Props {
    onSelect: (filterQuery: FilterQuery, filterId: number) => void;
    filterOptions: string[];
    filterId: number;
}

// made to be as re-usable as possible
// TODO: allow custom <FilterDropdown/> and <FilterSearch/> to be passed as optional props, so that they can be extended/overwritten if needed
const Filter: React.FC<Props> = ({onSelect, filterOptions= [], filterId}) => {

    const [filterQuery, setfilterQuery] = useState<FilterQuery>({});


    const handleFilterChange = (value: FilterQuery): void => {
        setfilterQuery(value);
        onSelect(value, filterId);
    };
    return (
        <>
            <div className={styles.filterPickerContainer}>
                <FilterPicker onSelect={handleFilterChange} filterQuery={filterQuery} filterOptions={filterOptions}/>
            </div>
            <div className={styles.filterSelectedOptionContainer}>
                {
                    Object.keys(filterQuery).length > 0 ? (
                        Object.entries(filterQuery).map((filterOption) => {
                            if (filterOption[1] !== '') {
                                return (
                                    <FilterSelectedOption
                                        key={filterOption[0]}
                                        setQuery={handleFilterChange}
                                        filterQuery={filterQuery}
                                        filterTerm={filterOption[0]}
                                        filterValue={filterOption[1] }
                                    ></FilterSelectedOption>
                            
                                );}
                            return '';
                        }
                        )) : ''
                }
            </div>
        </>
    );
};

export default Filter;
