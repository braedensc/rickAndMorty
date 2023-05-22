import { type Character } from 'rickmortyapi';

export interface RickAndMortyDataByQueryReponse {
    newCharacters: Character[];
    finalPage: number;
    resultCountByFilter: Array<number | null>;

}