import React from 'react';
import { AppBarComponent} from "../AppBarComponent";
import { ThemeProvider } from '@mui/material/styles';
import { Container } from "@mui/material"
import { theme } from "../../../theme";
import { SearchComponent } from "../SearchComponent";


export const FrameComponent = (props: { children: JSX.Element }) => {
    const { children } = props

    return (<ThemeProvider theme={theme}>
        <AppBarComponent/>
        <Container sx={{ py: '2%' }}>
            <SearchComponent/>
                {children}
        </Container>
    </ThemeProvider>)
}
