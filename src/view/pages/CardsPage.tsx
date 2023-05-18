import React, { useEffect, useState } from 'react';
import { getRickAndMortyCharacter } from 'src/data/services/rickAndMorty.service';

interface Props {
   theme?: any
}



const CardsPage: React.FC<Props> = ({theme}) => {



    const [character, setCharacter] = useState<any>();
    const [loading, setLoading] = useState<any>();
    console.log(character);

    useEffect(() => {
        const getData = async (): Promise<any> => {
            let response;
            try {
                response = await getRickAndMortyCharacter();
            } catch (err) {
                console.log(err);
            }
            setCharacter(response.data);
        };
        getData()
            .catch(console.error);
    }, []);


    



    return <div>

        <div>{character?.name}</div>

        <img src={character?.image}></img>
    </div>;
};

export default CardsPage;
