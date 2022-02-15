import type { NextPage } from 'next'
import ShopContainer from 'components/Shop/ShopComponent/ShopContainer/';
import OnloadOverlayComponent from 'components/HOCs/OnloadOverlayComponent/';
import { theme } from 'helpers';
import { ThemeProvider } from '@mui/material/styles';

const Somepage: NextPage = () => {
  return (
    <ThemeProvider theme={theme}>
      <OnloadOverlayComponent component={ShopContainer}/>
    </ThemeProvider>
  )
}

export default Somepage;
