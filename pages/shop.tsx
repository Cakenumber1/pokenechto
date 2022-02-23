import withOverlay from 'components/HOCs/OnloadOverlayComponent';
import ShopContainer from 'components/Shop/ShopComponent/ShopContainer/';
import type { NextPage } from 'next';

const OnloadOverlayComponent = withOverlay(ShopContainer);

const Shop: NextPage = () => (<OnloadOverlayComponent />);

export default Shop;
