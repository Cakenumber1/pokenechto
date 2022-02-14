import React from "react";
import { CardComponent} from "../CardComponent";
import { Grid } from "@mui/material"
import {PokemonsList, PokemonsListResults} from "../../interfaces/pokemonListType";


type BestiaryData = {
    pokemons: PokemonsList
}

export function BestiaryComponent( props: BestiaryData) {

    const data = props.pokemons.results.map((pokemon: PokemonsListResults, i: number) =>
        <Grid key={i} item xs={3}>
            <CardComponent pokemon={pokemon}/>
        </Grid>)

    return (

                <Grid sx={{ pt: 2 }} container spacing={4}
                      columns={{ sm: 6, md: 9, lg: 12 }}>
                    {data}
                </Grid>

    )
}
