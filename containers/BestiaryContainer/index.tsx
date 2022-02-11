import React from 'react';
import { getListFromPokeApi, createPath } from "../../api/pokeApi/getListFromPokeApi";
import { BestiaryComponent } from "../../components/BestiaryComponent";
import { Limits } from "../../interfaces/pokemonListType";
import useSWR from 'swr'


export const BestiaryContainer = (props: Limits) => {

    const { data, error } = useSWR(createPath(props.offset, props.limit), getListFromPokeApi)

    if (error) return <h2>Ошибка загрузка...</h2>
    if (!data) return <h2>Идёт загрузка...</h2>

    return <BestiaryComponent pokemons={data}/>
}