import { Grid, Modal, Paper, Typography } from "@mui/material";
import { style } from "./style";
import React from "react";
import { Pokemon } from "../../../interfaces";


type ModalData = {
    fullInfo: Pokemon,
    isOpen: boolean,
    onClose: () => void,
}

export const PokeModal = (props: ModalData) => {

    const { fullInfo, isOpen, onClose: handleClose } = props

    return (
        <Modal open={isOpen} onClose={handleClose} sx={style}>
            <Grid container justifyContent="center" alignItems="center">
                <Grid item lg={8} md={6} sm={4} >
                    <Paper sx={ { p: '5%' } }>
                        <Typography variant="h6" component="h2">
                            Full information
                        </Typography>
                        <Typography id="modal-modal-description" sx={{ mt: 2 }}>
                            {JSON.stringify(fullInfo)}
                        </Typography>
                    </Paper>
                </Grid>
            </Grid>
        </Modal>
    );
}
