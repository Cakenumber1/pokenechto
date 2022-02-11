import React from "react";
import { CardComponent} from "../CardComponent";
import { Grid, Container, TextField, IconButton } from "@mui/material"
import SearchIcon from '@mui/icons-material/Search';
import { PokemonsList } from "../../api";


type BestiaryData = {
    pokemons: PokemonsList
}

export function BestiaryComponent( props: BestiaryData) {

    if (!props?.pokemons?.results) return <h2>Идёт загрузка...</h2>
    const data = props.pokemons.results.map((pokemon: any, i: number) =>
        <Grid key={i} item xs={3}>
            <CardComponent pokemon={pokemon}/>
        </Grid>)

    return (
        <Container sx={{ paddingTop: 5, paddingBottom: 5 }}>
            <div>
                <TextField id="outlined-basic" label="Search" variant="outlined" />
                <IconButton><SearchIcon fontSize="large" /></IconButton>
            </div>
            <Grid sx={{ paddingTop: 2 }} container spacing={{ xs: 3, md: 3}} columns={{ xs: 3, sm: 6, md: 12 }}>
                {data}
            </Grid>
        </Container>
    )
}

/*<form onClick={handleSubmit}>
    <Input name="username" placeholder="username"
           onChange={(e) => setUsername(e.target.value)} value={username}/>
    <br/>
    <Button color="dark" type="submit">Change</Button>
</form>*/