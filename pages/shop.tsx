import OnloadOverlayComponent from 'components/HOCs/OnloadOverlayComponent/';
import ShopContainer from 'components/Shop/ShopComponent/ShopContainer/';

import type { NextPage } from 'next';

const Shop: NextPage = () => (
    <OnloadOverlayComponent component={ShopContainer} />
);

export default Shop;
