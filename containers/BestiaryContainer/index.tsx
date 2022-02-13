import React from 'react';
import { getListFromPokeApi, createKey } from "../../api/pokeApi/getListFromPokeApi";
import { BestiaryComponent } from "../../components/BestiaryComponent";
import { PokemonsList } from "../../interfaces/pokemonListType";

import useSWRInfinite, {SWRInfiniteResponse} from "swr/infinite";
import InfiniteScroll from 'react-swr-infinite-scroll'


export const BestiaryContainer = () => {
    const swr = useSWRInfinite(createKey, getListFromPokeApi);

    let i = 0
    return (

            <InfiniteScroll
                swr={swr}
                loadingIndicator="Loading..."
                endingIndicator="No more "
                isReachingEnd={(swr: SWRInfiniteResponse<PokemonsList>) =>
                    !swr.data || swr.data[swr.data.length - 1].next === null
                }
            >
                {(response: PokemonsList) =>
                        <BestiaryComponent key={i++} pokemons={response}/>
                }
            </InfiniteScroll>

    )
}
