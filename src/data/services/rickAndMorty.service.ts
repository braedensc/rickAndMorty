import { type ApiResponse, type Character, type Info, getCharacter, getCharacters } from 'rickmortyapi';
import { type FilterQuery } from 'src/view/widgets/Filter/util/types/types';


export const getRickAndMortyCharacters = async (page: number = 1): Promise<ApiResponse<Info<Character[]>>> => {
    return await getCharacters({page});

};


export const getRickAndMortyCharactersByQuery =async (queries: FilterQuery[], page: number = 1): Promise<Array<ApiResponse<Info<Character[]>>>> => {
    console.log('preparning to fech chars', queries);

    const promises = [];
    if (queries.length === 0) {
        const term = {page};
        console.log('term', term);
        promises.push(getCharacters(term));
    } else {
        for (let i = 0; i < queries.length; i++) {
            const term = {...queries[i], page};
            console.log('term', term);
            promises.push(getCharacters(term));
        }
    }


    const res: any = Promise.allSettled(promises)
        .then((response) => {
            console.log('pormises all res',response);
            return response;
        })
        .catch((error)  => {
            console.log(error);
        });
    return res;

};










