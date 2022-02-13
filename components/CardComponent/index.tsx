import React, { useState, useCallback } from 'react';
import { Card, CardMedia, CardHeader } from "@mui/material";
import { PokemonsListResults } from "../../interfaces/pokemonListType";
import { PokeModal } from "../PokeModalComponent";
import { Styles } from "../../styles";

type CardData = {
    pokemon: PokemonsListResults
}

export const CardComponent = (props: CardData) => {
    const [open, setOpen] = useState(false);
    const handleOpen =  useCallback(() => setOpen(true), []);
    const handleClose = useCallback(() => setOpen(false), []);

    const {name, fullInfo} = props.pokemon

    return (
        <>
            <Card sx={ Styles.card } onClick={handleOpen}>
                <CardHeader sx={ Styles.pokeName } title={name[0].toUpperCase() + name.substring(1)} />
                <CardMedia
                    sx={ Styles.pokeImg }
                    component="img"
                    image={fullInfo.img}
                    alt={name}
                />
            </Card>
            <PokeModal fullInfo={fullInfo} isOpen={open} onClose={handleClose} />
        </>
    );
}