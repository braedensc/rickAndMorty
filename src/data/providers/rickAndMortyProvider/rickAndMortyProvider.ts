import { arrayFindUniqueEntries } from 'src/utils/arrayFindUniqueEntries';
import { type FilterQuery } from 'src/view/widgets/Filter/util/types/types';
import { type ApiResponse, type Info, type Character } from 'rickmortyapi';

import { getRickAndMortyCharacters, getRickAndMortyCharactersByQuery } from '../../services/rickAndMorty.service';
import { type RickAndMortyDataByQueryReponse } from './interface';


// TODO: handle promise reject/success here and use type casting to fix ts error
// then fix Promise<any> and data: any type
const formatCharacterDataFromResponse = (data: any): Character[] => {
    const result : Character[] = [];
    data.map((queryResult: any) => {
        if(queryResult.value.status !== 200) {
            return 0;
        }
        return (
            result.push(...queryResult.value.data.results)
        );
    });
    return result;
};



// helper for getRickAndMortyDataByQuery
// finds which response had th emost results, in order to us proper pagination count
const findMaxPageNumber = (data: any): number => {
    let finalPage = 0;
    data.forEach((response: any) => {
        if (response?.value?.data?.info?.pages > finalPage) {
            finalPage = response.value.data.info.pages;
        }
    });
    return finalPage;
};


// helper for getRickAndMortyDataByQuery
// used for assigning a total coutn for each filter
// needed because each Filter component does not know about the response, it only keeps track of its own internal state for rendering
const assignFilterTotalCounts = (data: any, resultsFilterIndices:Array<number | null>, resultsCountByFilter: Array<number | null>):Array<number | null> => {
    const newResultCountByFilter : Array<number | null>  = [];
    let i = 0;
    resultsFilterIndices.forEach((value, index) => {
        if (value !== null) {
            if (data[i]?.value?.data?.info?.count !== undefined) {
                newResultCountByFilter[index] = data[i].value.data.info.count;
            } else {
                // if 404 was returned, set to 0 unless we already have a result count
                newResultCountByFilter[index] = resultsCountByFilter[index] != null ? resultsCountByFilter[index]: newResultCountByFilter[index] = 0;
            }
            i++;
        }
    });
    return newResultCountByFilter;
};


// retrieves paginated character data from RickAndMorty Service
// takes in an array of queries and concatenates the results from each data retrieval, so multiple filters can be used together
export const getRickAndMortyDataByQuery = async (queries: FilterQuery[], pageNumber: number, resultsFilterIndices:Array<number | null>, resultsCountByFilter: Array<number | null>): Promise<RickAndMortyDataByQueryReponse| null> => {
    try {
        // using correct type on data causes ts errors since it doesn't know whether fulfilled or rejected type
        // we have undefined checks below to handle errors instead
        const data: any = await getRickAndMortyCharactersByQuery(queries, pageNumber);
        const characterResult: Character[] = formatCharacterDataFromResponse(data);
        const newCharacters = arrayFindUniqueEntries([...characterResult]);
        const finalPage = findMaxPageNumber(data);

        // handle each fitlter's totalCount
        const resultCountByFilter : Array<number | null>  = assignFilterTotalCounts(data, resultsFilterIndices, resultsCountByFilter);

        return {
            newCharacters,
            finalPage,
            resultCountByFilter
        };
    } catch (err) {
        console.log(err);
        return null;
    }
};

export const getRickAndMortyCharactersWithoutQuery = async (pageNumber: number = 1): Promise<ApiResponse<Info<Character[]>>> => {
    return await getRickAndMortyCharacters(pageNumber);
};

