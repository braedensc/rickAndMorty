import { type ApiResponse, type Character, type Info, getCharacter, getCharacters } from 'rickmortyapi';


export const getRickAndMortyCharacters = async (page: number = 1): Promise<ApiResponse<Info<Character[]>>> => {
    return await getCharacters({page});

};










