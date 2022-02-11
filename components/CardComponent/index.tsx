import React, {useState, useCallback} from 'react';
import {Card, CardMedia, CardContent, Modal, Typography, Box} from "@mui/material";
import { PokemonsListResults } from "../../api";

type CardData = {
    pokemon: Required<PokemonsListResults>
}

export const CardComponent = (props: CardData) => {
    const [open, setOpen] = useState(false);
    const handleOpen =  useCallback(() => setOpen(true), []);
    const handleClose = useCallback(() => setOpen(false), []);


    const style = {
        position: 'absolute',
        top: '50%',
        left: '50%',
        transform: 'translate(-50%, -50%)',
        width:'400',
        bgcolor: 'background.paper',
        border: '2px solid #000',
        boxShadow: 24,
        overflow: 'scroll',
        p: 4,
    };

    const {name, fullInfo} = props.pokemon


    return (
        <>
            <Card onClick={handleOpen}>
                <CardMedia
                    sx={{ maxWidth: 155, margin: "auto", paddingTop: 2 }}
                    component="img"
                    image={fullInfo.img}
                    alt={name}
                />
                <CardContent>
                    Name: {name}
                </CardContent>
            </Card>
            <Modal

                open={open}
                onClose={handleClose}
                aria-labelledby="modal-modal-title"
                aria-describedby="modal-modal-description"
            >
                <Box sx={style}>
                    <Typography id="modal-modal-title" variant="h6" component="h2">
                        Full information
                    </Typography>
                    <Typography id="modal-modal-description" sx={{ mt: 2 }}>
                        {JSON.stringify(fullInfo)}
                    </Typography>
                </Box>
            </Modal>
        </>
    );
}