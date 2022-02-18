import React, { useState, useCallback } from 'react';
import { Card, CardMedia, CardHeader } from "@mui/material";
import { PokemonsListResults } from "../../../interfaces/pokemonListType";
import { PokeModal } from "../PokeModalComponent";
import { style } from "./style";
import useMediaQuery from "@mui/material/useMediaQuery";

type CardData = {
    pokemon: PokemonsListResults
}

export const CardComponent = (props: CardData) => {
    const [open, setOpen] = useState(false);
    const handleOpen =  useCallback(() => setOpen(true), []);
    const handleClose = useCallback(() => setOpen(false), []);

    const matchesSize = useMediaQuery('(min-width:400px)');

    const { fullInfo } = props.pokemon
    return (
        <>
            <Card sx={ style.card } onClick={handleOpen}>
                <CardHeader titleTypographyProps={ style.pokeName(matchesSize) }
                            title={fullInfo.name}/>
                <CardMedia
                    sx={ style.pokeImg }
                    component="img"
                    image={fullInfo.img}
                    alt={fullInfo.name}
                />
            </Card>
            <PokeModal fullInfo={fullInfo} isOpen={open} onClose={handleClose} />
        </>
    );
}
