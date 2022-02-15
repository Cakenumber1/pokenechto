import React from 'react';
import { createPath, getListFromPokeApi } from 'api/pokeApi/getFromPokeApi';
import ShopComponent from '../ShopComponent';
import useSWR from 'swr'

const ShopContainer: React.FC = () => {
  const { data, error } = useSWR(createPath, getListFromPokeApi)
  if (error) return <div>failed to load</div>
  if (!data) return <div>loading...</div>

  return (
    <ShopComponent pokemons={data}/>
  )
}

export default ShopContainer;
