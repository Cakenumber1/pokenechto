import React from "react";
import { CardComponent} from "../CardComponent";
import { Grid, Container, TextField, IconButton } from "@mui/material"
import SearchIcon from '@mui/icons-material/Search';
import { PokemonsList } from "../../interfaces/pokemonListType";
import { ThemeProvider } from '@mui/material/styles';
import { theme } from "../../theme";


type BestiaryData = {
    pokemons: PokemonsList
}

export function BestiaryComponent( props: BestiaryData) {

    const data = props.pokemons.results.map((pokemon: any, i: number) =>
        <Grid key={i} item xs={3}>
            <CardComponent pokemon={pokemon}/>
        </Grid>)

    return (
        <ThemeProvider theme={theme}>
            <Container sx={{ bgcolor: "text.disabled", paddingTop: 5, paddingBottom: 5 }}>
                <div>
                    <TextField id="outlined-basic" label="Search" variant="outlined" />
                    <IconButton><SearchIcon fontSize="large" /></IconButton>
                </div>
                <Grid sx={{ paddingTop: 2 }} container spacing={4}
                      columns={{ sm: 6, md: 9, lg: 12 }}>
                    {data}
                </Grid>
            </Container>
        </ThemeProvider>
    )
}
