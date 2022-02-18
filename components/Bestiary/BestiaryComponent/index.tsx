import React from "react";
import { CardComponent} from "../../Common/CardComponent";
import { Grid } from "@mui/material"
import {PokemonsList, PokemonsListResults} from "../../../interfaces/pokemonListType";


type BestiaryData = {
    pokemons: PokemonsList
}

export function BestiaryComponent( props: BestiaryData) {

    const data = props.pokemons.results.map((pokemon: PokemonsListResults) =>
        <Grid key={pokemon.name} item xs={3}>
            <CardComponent pokemon={pokemon}/>
        </Grid>)

    return <>{data}</>

}
