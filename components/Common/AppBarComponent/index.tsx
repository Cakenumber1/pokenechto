import React from "react";
import { AppBar, Typography, Toolbar, Avatar, Link, Button, ButtonGroup } from "@mui/material";
import { style } from './style'
import useMediaQuery from '@mui/material/useMediaQuery';

export const AppBarComponent = () => {
    const matchesInscription = useMediaQuery('(min-width:470px)');
    const matchesLogo = useMediaQuery('(min-width:354px)');
    const currentStyle = style(matchesLogo, matchesInscription)

    return (
        <AppBar position="sticky">
            <Toolbar>
                <ButtonGroup variant="contained" color="secondary">
                    <Button>Set</Button>
                    <Button>Bestiary</Button>
                    <Button>Inventory</Button>
                </ButtonGroup>
                <Link href="https://pokeapi.co/" target="_blank" rel="noopener" sx={{ml: 'auto'}}>
                    <Avatar
                    sx={currentStyle.logo}
                    alt="logo"
                    src="https://www.pngall.com/wp-content/uploads/4/Pokemon-Pokeball-PNG-Image-File.png"
                />
                </Link>
                <Typography variant="h6" sx={currentStyle.inscription} component="div">
                    PokeNechto
                </Typography>
            </Toolbar>
        </AppBar>)
}