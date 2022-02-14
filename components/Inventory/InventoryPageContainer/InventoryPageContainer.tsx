import axios from 'axios';
import useSWR from 'swr';

import {LinearProgress} from '@mui/material';
import {InventoryComponent} from '../InventoryComponent';

type InventoryPageContainerProps = {
  page: number;
};

const fetcher = async (url: string) => axios(url);

export const InventoryPageContainer = ({page}: InventoryPageContainerProps) => {
  const {data: swrData, error} = useSWR(`/api/inventory/${page}`, fetcher);

  if (error) return <div>Error</div>;
  if (!swrData) return <LinearProgress />;

  const pokemonCollection = swrData.data.data;

  return <InventoryComponent pokemonCollection={pokemonCollection} />;
};
