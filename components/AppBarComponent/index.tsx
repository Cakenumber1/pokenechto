import React from "react";
import { AppBar, Typography, Toolbar, Avatar, Link, Button, ButtonGroup } from "@mui/material";
import { appStyles } from "../../styles";

export const AppBarComponent = () => {
    return (
        <AppBar position="fixed">
            <Toolbar>
                <ButtonGroup variant="contained" color="secondary">
                    <Button>Set</Button>
                    <Button>Bestiary</Button>
                    <Button>Inventory</Button>
                </ButtonGroup>
                <Link href="https://pokeapi.co/" target="_blank" rel="noopener" sx={{marginLeft: 'auto'}}>
                    <Avatar
                    sx={appStyles.logo}
                    alt="logo"
                    src="https://www.pngall.com/wp-content/uploads/4/Pokemon-Pokeball-PNG-Image-File.png"
                />
                </Link>
                <Typography variant="h6" component="div">
                    PokeNechto
                </Typography>
            </Toolbar>
        </AppBar>)
}