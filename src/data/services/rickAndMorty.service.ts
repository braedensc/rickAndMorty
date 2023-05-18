import { getCharacter } from 'rickmortyapi';


export const getRickAndMortyCharacter = async (): Promise<any> => {
    return await getCharacter(1);

};










