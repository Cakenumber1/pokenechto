import { ThemeProvider } from '@mui/material/styles';
import OnloadOverlayComponent from 'components/HOCs/OnloadOverlayComponent/';
import ShopContainer from 'components/Shop/ShopComponent/ShopContainer/';
import { theme } from 'helpers';
import type { NextPage } from 'next';

const Shop: NextPage = () => (
  <ThemeProvider theme={theme}>
    <OnloadOverlayComponent component={ShopContainer} />
  </ThemeProvider>
);

export default Shop;
