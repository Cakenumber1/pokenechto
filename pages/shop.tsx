import withOverlay from 'components/HOCs/OnloadOverlayComponent';
import ShopContainer from 'components/Shop/ShopComponent/ShopContainer/';
import type { NextPage } from 'next';
import { useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { fetchPokemonsThunk } from 'store/shop/shopThunk';

const OnloadOverlayComponent = withOverlay(ShopContainer);

const Shop: NextPage = () => {
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(fetchPokemonsThunk());
  }, []);
  return (<OnloadOverlayComponent />);
};

export default Shop;
