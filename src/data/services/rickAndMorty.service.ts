import { type ApiResponse, type Character, type Info, getCharacter, getCharacters } from 'rickmortyapi';
import { type FilterQuery } from 'src/view/widgets/Filter/util/types/types';


export const getRickAndMortyCharacters = async (page: number = 1): Promise<ApiResponse<Info<Character[]>>> => {
    return await getCharacters({page});

};


export const getRickAndMortyCharactersByQuery = async (queries: FilterQuery[], page: number = 1):  Promise<Array<PromiseSettledResult<Awaited<ApiResponse<Info<Character[]>>>>>> => {

    const promises = [];
    if (queries.length === 0) {
        const term = {page};
        promises.push(getCharacters(term));
    } else { 
        for (let i = 0; i < queries.length; i++) {
            // below removes queries that are just empty strings, otherwise they mess up the request
            // shamelessly stolen from the internet
            const querySanitized: FilterQuery = Object.fromEntries(Object.entries(queries[i]).filter(([_, v]) => v !== ''));  
            const term = {...querySanitized, page};
            promises.push(getCharacters(term));
        }
    }


    const res: Promise<Array<PromiseSettledResult<Awaited<ApiResponse<Info<Character[]>>>>>> = Promise.allSettled(promises)
        .then((response) => {
            return response;
        })
        .catch((error)  => {
            console.log(error);
            return error;
        });
    return await res;

};










