import React from 'react';
import { useSelector } from 'react-redux';
import { selectPokemons } from 'store/shop/shopSlice';

import ShopComponent from '../ShopComponent';

type Props = {
  onclick: () => void
};

const ShopContainer: React.FC<Props> = ({ onclick }) => {
  const data = useSelector(selectPokemons);
  console.log(data);
  if (data.ids.length) {
    return (
      <ShopComponent onclick={onclick} />
    );
  }
  return <div>loading</div>;
};

export default ShopContainer;
