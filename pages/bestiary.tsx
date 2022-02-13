import { BestiaryContainer } from "../containers/BestiaryContainer";
import { AppBarComponent } from "../components/AppBarComponent";
import { ThemeProvider } from '@mui/material/styles';
import { theme } from "../theme";

export default function bestiary() {
    return (
        <ThemeProvider theme={theme}>
            <AppBarComponent/>
            <BestiaryContainer offset={80} limit={34}/>
        </ThemeProvider>
    );
}