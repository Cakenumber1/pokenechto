import { createPath, getListFromPokeApi } from 'api/pokeApi/getFromPokeApi';
import React from 'react';
import useSWR from 'swr';

import ShopComponent from '../ShopComponent';

type Props = {
  onclick: () => void
};

const ShopContainer: React.FC<Props> = ({ onclick }) => {
  const { data, error } = useSWR(createPath, getListFromPokeApi);
  if (error) return <div>failed to load</div>;
  if (!data) return <div>loading...</div>;

  return (
    <ShopComponent pokemons={data} onclick={onclick} />
  );
};

export default ShopContainer;
