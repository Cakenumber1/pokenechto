import { BestiaryContainer } from "../containers/BestiaryContainer";
import { AppBarComponent } from "../components/AppBarComponent";
import { ThemeProvider } from '@mui/material/styles';
import { Container } from "@mui/material"
import { theme } from "../theme";
import { IconButton, TextField } from "@mui/material";
import SearchIcon from "@mui/icons-material/Search";
import React from "react";

export default function bestiary() {
    return (
        <ThemeProvider theme={theme}>
            <AppBarComponent/>
            <Container sx={{ py: '2%' }}>
                <div>
                    <TextField id="outlined-basic" label="Search" variant="outlined" />
                    <IconButton><SearchIcon fontSize="large" /></IconButton>
                </div>
                <BestiaryContainer/>
            </Container>
        </ThemeProvider>
    );
}